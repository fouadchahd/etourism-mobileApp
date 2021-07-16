import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

import { IMLocalized } from "config/IMLocalized";
import countries from "res/countries";
import AuthContext from "../../contexts/AuthContext";
import colors from "res/colors";
import { Searchbar } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { updateNationalityToDB } from "services/account.service";
import { setCredentials } from "services/credentials";

const EditNationalityScreen = ({ navigation, route }) => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  const [hasUnsavedChanges, sethasUnsavedChanges] = useState(false);
  const [forcedToGoBack, setforcedToGoBack] = useState(false);

  let oldNationality = route?.params?.nationality
    ? route.params.nationality
    : null;
  let oldCountryName = route?.params?.countryName
    ? route.params.countryName
    : null;
  const [query, setQuery] = useState(oldCountryName);
  const [displayedCountries, setDisplayedCountries] = useState([
    ...countries.slice(0, 30),
  ]);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState(oldNationality);
  const onChangeSearch = (query) => setQuery(query);

  React.useEffect(() => {
    filterWithName(query);
  }, [query]);

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
    [navigation, forcedToGoBack, hasUnsavedChanges]
  );
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
  const filterWithName = (foo) => {
    if (foo.length === 0) {
      setDisplayedCountries([...countries.slice(0, 30)]);
    } else {
      let vDisplayedCountries = [];
      vDisplayedCountries = countries.filter((country) =>
        country.name.includes(foo)
      );
      setDisplayedCountries([...vDisplayedCountries]);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableWithoutFeedback onPress={updateAuthTokenNationality}>
            {isLoading ? (
              <ActivityIndicator
                color={colors.ActivityIndicatorColor}
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
                {IMLocalized("done")}
              </Text>
            )}
          </TouchableWithoutFeedback>
        );
      },
    });
  }, [navigation, selectedCountryCode, isLoading, hasUnsavedChanges]);

  const updateAuthTokenNationality = async () => {
    let newInfo = authToken.data;
    setisLoading(true);
    let result = await updateNationalityToDB(
      authToken.data.id,
      selectedCountryCode
    ).catch((err) => {
      displayErrorToast();
    });
    if (result?.status === 200) {
      newInfo.nationality = selectedCountryCode;
      let Ok = await setCredentials({ ...authToken, data: newInfo });
      if (Ok === true) {
        setforcedToGoBack(true);
      }
    }
    setisLoading(false);
  };
  React.useEffect(() => {
    if (forcedToGoBack === true) navigation.goBack();
  }, [forcedToGoBack]);
  return (
    <View style={[{ flex: 1 }]} bounces={false}>
      <View style={styles.header}></View>
      <View style={styles.searchBar}>
        <Searchbar
          style={{
            marginHorizontal: 10,
            shadowOpacity: 0,
            borderRadius: 10,
            color: colors.primaryBlue,
            fontSize: 22,
          }}
          placeholder={IMLocalized("searchBoxPlaceholder")}
          fontSize={22}
          onChangeText={onChangeSearch}
          color={colors.primaryBlue}
          value={query}
        ></Searchbar>
      </View>
      <ScrollView bounces={true}>
        {displayedCountries &&
          displayedCountries.map((country, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setSelectedCountryCode(country.code);
                  sethasUnsavedChanges(true);
                }}
              >
                <View
                  key={country.name}
                  style={
                    country.code === selectedCountryCode
                      ? styles.selectedCard
                      : styles.countryCard
                  }
                >
                  <Text style={styles.cardText}>{country.name}</Text>
                  <Image
                    style={styles.stretch}
                    source={{
                      uri:
                        "https://www.countryflags.io/" +
                        country.code +
                        "/flat/64.png",
                    }}
                  ></Image>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default EditNationalityScreen;

const styles = StyleSheet.create({
  stretch: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
    borderRadius: 40,
  },
  header: {
    marginTop: 8,
    marginHorizontal: 10,
  },
  cardText: {
    fontWeight: "500",
    fontSize: 16,
  },
  countryCard: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.11,
    shadowRadius: 2,
    shadowOffset: { height: 2, width: 0 },
    backgroundColor: "white",
  },
  searchBar: {
    marginBottom: 8,
  },
  selectedCard: {
    marginHorizontal: 10,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.11,
    shadowRadius: 2,
    shadowOffset: { height: 2, width: 0 },
    backgroundColor: colors.greenGradientColorStart,
    opacity: 0.9,
  },
  headersmallText: {
    alignSelf: "flex-end",
    fontSize: 22,
    fontWeight: "500",
    color: colors.lightGray,
    marginBottom: 20,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
  },
  smallFlagIcon: {
    width: 30,
    height: 28,
    resizeMode: "stretch",
    borderRadius: 0,
    alignSelf: "center",
  },
  rightBtn: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 15,
  },
});
