import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TextInput,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

import colors from "res/colors";
import { IMLocalized } from "config/IMLocalized";
import AuthContext from "../../contexts/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { setCredentials } from "services/credentials";
import { updateBioToDB } from "services/account.service";
const EditBioScreen = ({ navigation, route }) => {
  let oldbio = route?.params?.bio ? route.params.bio : null;
  const [newbio, setNewbio] = useState(oldbio);
  const [hasUnsavedChanges, sethasUnsavedChanges] = useState(false);
  const [forcedToGoBack, setForcedToGoBack] = useState(false);
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (forcedToGoBack === true) navigation.goBack();
  }, [forcedToGoBack]);

  const updateAuthTokenbio = async () => {
    let newInfo = authToken.data;
    setisLoading(true);
    let result = await updateBioToDB(authToken.data.id, newbio).catch((err) => {
      displayErrorToast();
    });
    if (result?.status === 200) {
      let Ok = await setCredentials({ ...authToken, data: newInfo });
      if (Ok === true) {
        setForcedToGoBack(true);
        newInfo.bio = newbio;
      }
    }
    setisLoading(false);
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
    setNewbio(text);
    if (text !== oldbio) {
      sethasUnsavedChanges(true);
    } else {
      sethasUnsavedChanges(false);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableWithoutFeedback onPress={updateAuthTokenbio}>
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
  }, [navigation, newbio, isLoading, hasUnsavedChanges]);
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
        value={newbio}
        multiline
        onSubmitEditing={() =>
          console.log("submited", Boolean(hasUnsavedChanges))
        }
        onChangeText={handlechange}
        numberOfLines={5}
        maxLength={200}
        style={{
          minHeight: 40,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          color: colors.facebookColor,
          opacity: 0.8,
          fontSize: 15,
        }}
        placeholder={IMLocalized("defaultBio")}
      ></TextInput>
    </View>
  );
};

export default EditBioScreen;

const styles = StyleSheet.create({
  rightBtn: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
  },
});
