import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import { IMLocalized } from "config/IMLocalized";
import countries from "res/countries";
import palettes from "res/palettes";
import colors from "res/colors";
import { Searchbar } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
const NationalityPickerScreen = ({ navigation, route }) => {
  let gender = null;
  let profilePicture = null;
  if (route && route.params) {
    if (route.params.gender) gender = route.params.gender;
    if (route.params.profilePicture)
      profilePicture = route.params.profilePicture;
  }
  const [query, setQuery] = useState("");
  const [displayedCountries, setDisplayedCountries] = useState([
    ...countries.slice(0, 30),
  ]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const onChangeSearch = (query) => setQuery(query);
  React.useEffect(() => {
    filterWithName(query);
  }, [query]);
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
  const stepSkipped = () => {
    navigation.navigate("RegisterScreen", {
      gender,
      profilePicture,
      selectedCountryCode: null,
    });
  };
  const submitNationality = () => {
    if (selectedCountryCode !== null) {
      navigation.navigate("RegisterScreen", {
        gender,
        profilePicture,
        selectedCountryCode,
      });
      console.log("selected country code is ", selectedCountryCode);
    } else {
      console.log("to continue you must pick a nationality");
    }
  };
  return (
    <View style={[palettes.screen, {}]} bounces={false}>
      <View style={styles.header}>
        <Text onPress={stepSkipped} style={styles.headersmallText}>
          {IMLocalized("skip")}
        </Text>
        <Text style={palettes.headerText}>
          {IMLocalized("selectNationalityPickerScreenTitle")}
        </Text>
      </View>
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
      {selectedCountryCode && (
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            position: "absolute",
            bottom: 50,
          }}
        >
          <TouchableWithoutFeedback onPress={submitNationality}>
            <LinearGradient
              style={{
                height: 64,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: {
                  height: 15,
                  width: 15,
                },
              }}
              colors={["#edf2f4", "#e5e5e5"]}
              end={[0, 0]}
              start={[0, 1]}
            >
              <Text style={[styles.textButton, { color: "#212529" }]}>
                {IMLocalized("continue")}
              </Text>
              <Image
                style={styles.smallFlagIcon}
                source={{
                  uri:
                    "https://www.countryflags.io/" +
                    selectedCountryCode +
                    "/flat/64.png",
                }}
              ></Image>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default NationalityPickerScreen;

const styles = StyleSheet.create({
  stretch: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
    borderRadius: 40,
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  cardText: {
    fontWeight: "500",
    fontSize: 16,
  },
  countryCard: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
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
    borderRadius: 10,
    marginBottom: 10,
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
});
