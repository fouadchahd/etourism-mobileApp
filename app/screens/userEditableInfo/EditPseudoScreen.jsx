import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

import colors from "res/colors";
import { IMLocalized } from "config/IMLocalized";
import AuthContext from "../../contexts/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { setCredentials } from "services/credentials";
import {
  updatePseudoToDB,
  isPseudoAlreadyUsed,
} from "services/account.service";

const EditPseudoScreen = ({ navigation, route }) => {
  let oldPseudo = route?.params?.pseudo ? route.params.pseudo : null;
  const firstName = route?.params?.firstName ? route.params.firstName : null;
  const lastName = route?.params?.lastName ? route.params.lastName : null;
  const [newPseudo, setNewPseudo] = useState(oldPseudo);
  const [hasUnsavedChanges, sethasUnsavedChanges] = useState(false);
  const [forcedToGoBack, setForcedToGoBack] = useState(false);
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  const [pseudoAlreadyUsed, setPseudoAlreadyUsed] = useState(false);
  useEffect(() => {
    if (forcedToGoBack === true) navigation.goBack();
  }, [forcedToGoBack]);

  const updateAuthTokenPseudo = async () => {
    setisLoading(true);
    let alreadyUsed = await isPseudoAlreadyUsed(newPseudo);
    if (alreadyUsed) {
      setPseudoAlreadyUsed(true);
    } else {
      let result = await updatePseudoToDB(authToken.data.id, newPseudo).catch(
        (err) => {
          displayErrorToast();
        }
      );
      if (result?.status === 200) {
        let newInfo = authToken.data;
        newInfo.pseudo = newPseudo;

        let Ok = await setCredentials({ ...authToken, data: newInfo });
        if (Ok === true) {
          setForcedToGoBack(true);
        }
      }
    }
    setisLoading(false);
  };
  const validateUserNameOnSubmitingText = async () => {
    setPseudoAlreadyUsed(false);
    try {
      let alreadyUsed = await isPseudoAlreadyUsed(newPseudo);
      if (alreadyUsed === true) {
        setPseudoAlreadyUsed(true);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const displayErrorToast = () => {
    setisLoading(false);
    Toast.show({
      type: "error",
      position: "bottom",
      visibilityTime: 2000,
      autoHide: true,
      bottomOffset: 95,
      text1: IMLocalized("invalidRegisteringMessage"),
      text2: "",
    });
  };

  const handlechange = (text) => {
    setNewPseudo(text);
    if (text.toLowerCase() !== oldPseudo.toLowerCase()) {
      sethasUnsavedChanges(true);
    } else {
      sethasUnsavedChanges(false);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableWithoutFeedback onPress={updateAuthTokenPseudo}>
            {isLoading ? (
              <ActivityIndicator
                color="##999999"
                marginRight={20}
                size="small"
              />
            ) : (
              <Text
                style={[
                  styles.rightBtn,
                  {
                    color: hasUnsavedChanges
                      ? colors.skyblue
                      : colors.underlayColor,
                  },
                ]}
              >
                Done
              </Text>
            )}
          </TouchableWithoutFeedback>
        );
      },
    });
  }, [navigation, newPseudo, isLoading, hasUnsavedChanges]);
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges || (hasUnsavedChanges && forcedToGoBack)) {
          // If we don't have unsaved changes, then we don't need to do anything
          //forcedToGoBack means that we submited the new value before going back
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          IMLocalized("alertDiscardChangesTitle"),
          IMLocalized("alertDiscardChangesText"),
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Leave",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
              //              onPress: () => navigation.navigate("EditProfileScreen"),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges, forcedToGoBack]
  );
  return (
    <View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
      <Text style={{ fontWeight: "700", color: colors.black }}>
        {IMLocalized("newValue")} :
      </Text>
      <TextInput
        value={newPseudo}
        onSubmitEditing={validateUserNameOnSubmitingText}
        onChangeText={handlechange}
        numberOfLines={1}
        maxLength={50}
        style={{
          minHeight: 40,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          color: colors.facebookColor,
          fontStyle: "italic",
          opacity: 0.8,
          fontSize: 15,
        }}
        placeholder={IMLocalized("pseudoLabel")}
      ></TextInput>
      {pseudoAlreadyUsed === true && (
        <Text style={styles.errorText}>{IMLocalized("pseudoAleadyUser")}</Text>
      )}
    </View>
  );
};

export default EditPseudoScreen;

const styles = StyleSheet.create({
  rightBtn: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
  },
  errorText: {
    color: colors.errorTextColor,
    marginTop: 4,
  },
});
