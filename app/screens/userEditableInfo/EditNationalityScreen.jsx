import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
} from "react-native";
import { IMLocalized } from "config/IMLocalized";
import countries from "res/countries";
import AuthContext from "../../contexts/AuthContext";
import colors from "res/colors";
import { Searchbar } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { updateNationalityToDB } from "services/account.service";
import { setCredentials } from "services/credentials";

const EditNationalityScreen = ({ navigation, route }) => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

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

  const updateAuthTokenNationality = async () => {
    let newInfo = authToken.data;
    newInfo.nationality = selectedCountryCode;
    setisLoading(true);
    let Ok = await setCredentials({ ...authToken, data: newInfo });
    let result = await updateNationalityToDB(
      authToken.data.id,
      selectedCountryCode
    );
    if (result.status === 200 && Ok === true) {
      navigation.goBack();
    }
    setisLoading(false);
  };
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
      {selectedCountryCode !== oldNationality && (
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            position: "absolute",
            bottom: 100,
          }}
        >
          <TouchableWithoutFeedback onPress={updateAuthTokenNationality}>
            <LinearGradient
              style={{
                height: 60,
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
              {isLoading ? (
                <ActivityIndicator color={colors.ActivityIndicatorColor} />
              ) : (
                <>
                  <Text style={[styles.textButton, { color: "#212529" }]}>
                    {IMLocalized("done")}
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
                </>
              )}
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      )}
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
});
