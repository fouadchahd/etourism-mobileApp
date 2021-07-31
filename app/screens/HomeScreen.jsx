import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IMLocalized } from "config/IMLocalized";
import colors from "res/colors";
import Constants from "expo-constants";
import { SharedElement } from "react-navigation-shared-element";
const ITEM_WIDTH = Dimensions.get("window").width * 0.6;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;
const SPACING = 12;
const RADIUS = 20;
const FULL_SIZE = ITEM_WIDTH + SPACING * 2;
const VERTICAL_SPACING = 10;
const VERTICAL_ITEM_WIDTH = Dimensions.get("window").width * 0.95;
const VERTICAL_ITEM_HEIGHT = VERTICAL_ITEM_WIDTH * 1.2;
const VERTICAL_FULL_SIZE = ITEM_HEIGHT + VERTICAL_SPACING * 2;
const HomeScreen = ({ navigation }) => {
  console.log("HOMESCREEN");
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const handleScrollView = (event) => {
    //   console.log("old ScrollY=", lastScrollY);
    // console.log("new ScrollY=", event.nativeEvent.contentOffset.y);
    //setLastScrollY(event.nativeEvent.contentOffset.y);
  };
  const cities = [
    { name: "Rabat", id: 4 },
    { name: "Sale", id: 5 },
    { name: "Kenitra", id: 6 },
  ];
  const data = [
    {
      id: "1",
      name: "Tour name ",
      cover:
        "https://images.unsplash.com/photo-1519594445471-0e5f86b3fb09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
    {
      id: "11",
      name: "Madina Tour",
      cover:
        "https://images.unsplash.com/photo-1528657249085-c569d3c869e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=281&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
    {
      id: "12",
      name: "Oudaya Tour",
      cover:
        "https://images.unsplash.com/photo-1519594445471-0e5f86b3fb09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
    {
      id: "13",
      name: "Kayak Tour",
      cover:
        "https://images.unsplash.com/photo-1598257904735-269f389d2fa2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
    {
      id: "14",
      name: "Hassan ",
      cover:
        "https://images.unsplash.com/photo-1598022124758-26d09adcb7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
    {
      id: "15",
      name: "Bab l7ed",
      cover:
        "https://images.unsplash.com/photo-1531217985308-655381b6be66?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
    {
      id: "16",
      name: "Centre ville",
      cover:
        "https://images.unsplash.com/photo-1614779171249-c79205580b9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1576&q=80",
      numberOfSights: 1 + Math.floor(Math.random() * 10),
    },
  ];
  const PoiData = [
    {
      id: "7",
      name: "Hassan",
      createdAt: "2021-06-05T15:27:17+00:00",
      updatedAt: null,
      description: [
        {
          content: "desc for test",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      audio: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiAudios%2F%23fran%C3%A7ais_1622906829088_Tinder_notificacion_sound_effect.mp3?alt=media&token=597f7c52-2506-4569-8a46-7cd074bd8b64",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      photo: [
        {
          url: "https://images.unsplash.com/photo-1598022124758-26d09adcb7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          alt: "hassan.jpg",
        },
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiPhotos%2F1622906820258_lemellah.jpg?alt=media&token=7417f0d8-bb70-47c0-801d-b370fa8df749",
          alt: "lemellah.jpg",
        },
      ],
      address: {
        formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
        latitude: 34.041547330204,
        longitude: -6.8209433555603,
        city: {
          id: 4,
          name: "Salé",
        },
      },
      parent: "/api/pois/3",
      typeOfAttraction: {
        type: "Bâtiments gouvernementaux",
        parentType: {
          type: "Sites touristiques",
          parentType: null,
        },
      },
    },
    {
      id: "8",
      name: "Bab ROua7",
      createdAt: "2021-06-05T15:27:17+00:00",
      updatedAt: null,
      description: [
        {
          content: "desc for test",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      audio: [
        {
          url: "https://www.audioguias-bluehertz.es/audioguide_paris/eng/Paris_01_EN.mp3",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      photo: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiPhotos%2F1622906820258_lemellah.jpg?alt=media&token=7417f0d8-bb70-47c0-801d-b370fa8df749",
          alt: "lemellah.jpg",
        },
      ],
      address: {
        formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
        latitude: 34.041547330204,
        longitude: -6.8209433555603,
        city: {
          id: 4,
          name: "Salé",
        },
      },
      parent: "/api/pois/3",
      typeOfAttraction: {
        type: "Bâtiments gouvernementaux",
        parentType: {
          type: "Sites touristiques",
          parentType: null,
        },
      },
    },
    {
      id: "86",
      name: "for test",
      createdAt: "2021-06-05T15:27:17+00:00",
      updatedAt: null,
      description: [
        {
          content: "desc for test",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      audio: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiAudios%2F%23fran%C3%A7ais_1622906829088_Tinder_notificacion_sound_effect.mp3?alt=media&token=597f7c52-2506-4569-8a46-7cd074bd8b64",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      photo: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiPhotos%2F1622906820258_lemellah.jpg?alt=media&token=7417f0d8-bb70-47c0-801d-b370fa8df749",
          alt: "lemellah.jpg",
        },
      ],
      address: {
        formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
        latitude: 34.041547330204,
        longitude: -6.8209433555603,
        city: {
          id: 4,
          name: "Salé",
        },
      },
      parent: "/api/pois/3",
      typeOfAttraction: {
        type: "Bâtiments gouvernementaux",
        parentType: {
          type: "Sites touristiques",
          parentType: null,
        },
      },
    },
    {
      id: "87",
      name: "for test",
      createdAt: "2021-06-05T15:27:17+00:00",
      updatedAt: null,
      description: [
        {
          content: "desc for test",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      audio: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiAudios%2F%23fran%C3%A7ais_1622906829088_Tinder_notificacion_sound_effect.mp3?alt=media&token=597f7c52-2506-4569-8a46-7cd074bd8b64",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      photo: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiPhotos%2F1622906820258_lemellah.jpg?alt=media&token=7417f0d8-bb70-47c0-801d-b370fa8df749",
          alt: "lemellah.jpg",
        },
      ],
      address: {
        formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
        latitude: 34.041547330204,
        longitude: -6.8209433555603,
        city: {
          id: 4,
          name: "Salé",
        },
      },
      parent: "/api/pois/3",
      typeOfAttraction: {
        type: "Bâtiments gouvernementaux",
        parentType: {
          type: "Sites touristiques",
          parentType: null,
        },
      },
    },
    {
      id: "89",
      name: "for test",
      createdAt: "2021-06-05T15:27:17+00:00",
      updatedAt: null,
      description: [
        {
          content: "desc for test",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      audio: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiAudios%2F%23fran%C3%A7ais_1622906829088_Tinder_notificacion_sound_effect.mp3?alt=media&token=597f7c52-2506-4569-8a46-7cd074bd8b64",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      photo: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiPhotos%2F1622906820258_lemellah.jpg?alt=media&token=7417f0d8-bb70-47c0-801d-b370fa8df749",
          alt: "lemellah.jpg",
        },
      ],
      address: {
        formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
        latitude: 34.041547330204,
        longitude: -6.8209433555603,
        city: {
          id: 4,
          name: "Salé",
        },
      },
      parent: "/api/pois/3",
      typeOfAttraction: {
        type: "Bâtiments gouvernementaux",
        parentType: {
          type: "Sites touristiques",
          parentType: null,
        },
      },
    },
    {
      id: "88",
      name: "for test",
      createdAt: "2021-06-05T15:27:17+00:00",
      updatedAt: null,
      description: [
        {
          content: "desc for test",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      audio: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiAudios%2F%23fran%C3%A7ais_1622906829088_Tinder_notificacion_sound_effect.mp3?alt=media&token=597f7c52-2506-4569-8a46-7cd074bd8b64",
          language: {
            name: "français",
            languageCode: "fr",
          },
        },
      ],
      photo: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/etourism-256e3.appspot.com/o/poiPhotos%2F1622906820258_lemellah.jpg?alt=media&token=7417f0d8-bb70-47c0-801d-b370fa8df749",
          alt: "lemellah.jpg",
        },
      ],
      address: {
        formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
        latitude: 34.041547330204,
        longitude: -6.8209433555603,
        city: {
          id: 4,
          name: "Salé",
        },
      },
      parent: "/api/pois/3",
      typeOfAttraction: {
        type: "Bâtiments gouvernementaux",
        parentType: {
          type: "Sites touristiques",
          parentType: null,
        },
      },
    },
  ];
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon
          onPress={() => navigation.openDrawer()}
          size={38}
          name="menu"
          style={styles.leftIcons}
        />
        <View style={styles.rightView}>
          <Text style={styles.cityNameText}>Rabat</Text>
          <Icon size={20} name="chevron-down"></Icon>
        </View>
      </View>
      <ScrollView onScroll={handleScrollView} scrollEventThrottle={16}>
        <View style={styles.welcomeTitleContainer}>
          <Text style={styles.welcomeTitle} numberOfLines={2}>
            {IMLocalized("homeScreenWelcomeTitle")}
          </Text>
        </View>
        <View style={styles.flatListHeader}>
          <Text style={styles.flatListHeaderTitle} numberOfLines={2}>
            {IMLocalized("tours")}
          </Text>
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            { useNativeDriver: true }
          )}
          style={{ backgroundColor: "white" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={FULL_SIZE}
          data={data}
          keyExtractor={(item) => item.id}
          decelerationRate={"fast"}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * FULL_SIZE,
              index * FULL_SIZE,
              (index + 1) * FULL_SIZE,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.2, 1],
            });
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  navigation.push("TourDetailScreen", { item });
                }}
              >
                <SharedElement
                  id={`item.${item.id}.cover`}
                  style={[StyleSheet.absoluteFillObject]}
                >
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      { overflow: "hidden", borderRadius: RADIUS },
                    ]}
                  >
                    <Animated.Image
                      source={{ uri: item.cover }}
                      style={[
                        { ...StyleSheet.absoluteFillObject },
                        {
                          backgroundColor: colors.underlayColor,
                          resizeMode: "cover",
                        },
                        { transform: [{ scale }] },
                      ]}
                    ></Animated.Image>
                  </View>
                </SharedElement>

                <Animated.Text
                  numberOfLines={2}
                  style={[
                    styles.location,
                    index + 1 === data.length
                      ? {}
                      : { transform: [{ translateX }] },
                  ]}
                >
                  {item.name}
                </Animated.Text>
                <View style={styles.numberContainer}>
                  <Text style={styles.number}>{item.numberOfSights}</Text>
                  <Text style={styles.itemLabel}>{IMLocalized("sights")}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.poisContainer}>
          <Text style={styles.flatListHeaderTitle} numberOfLines={2}>
            {IMLocalized("pois")}
          </Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={PoiData}
              keyExtractor={(item) => item.id}
              decelerationRate={"fast"}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PoiDetailScreen", { item })
                    }
                    style={styles.poiItemContainer}
                  >
                    <Image
                      style={styles.poiImage}
                      resizeMode="cover"
                      source={{ uri: item.photo[0].url }}
                    ></Image>
                    <View style={styles.bottomView}>
                      <Text style={styles.poiNameText}>{item.name}📍</Text>
                      <Text style={styles.poiDescText} numberOfLines={2}>
                        {
                          IMLocalized("bigLorem") //item.description[0].content
                        }
                      </Text>
                    </View>
                    <View style={styles.stickerView}>
                      <Text style={styles.stickerText}>
                        {item.typeOfAttraction.type}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            ></FlatList>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  leftIcons: {
    marginLeft: 10,
    flexGrow: 1,
  },
  rightView: {
    flexDirection: "row",
    marginRight: 10,
  },
  cityNameText: {
    fontSize: 17,
    fontWeight: "600",
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
    opacity: 0.9,
    marginHorizontal: 10,
    marginLeft: SPACING,
    marginBottom: 10,
  },
  flatListHeader: {
    justifyContent: "center",
  },
  flatListHeaderTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black,
    opacity: 0.7,
    marginHorizontal: 10,
    marginLeft: SPACING,
    marginBottom: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING,
    marginVertical: SPACING,
    borderRadius: RADIUS,
    overflow: "hidden",
  },
  location: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "800",
    width: ITEM_WIDTH * 0.7,
    textTransform: "uppercase",
    position: "absolute",
    top: SPACING,
    left: SPACING,
  },
  numberContainer: {
    position: "absolute",
    bottom: SPACING,
    left: SPACING,
    height: 44,
    width: 44,
    borderRadius: RADIUS,
    backgroundColor: colors.darkGreen,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  number: { fontWeight: "800", color: colors.white, fontSize: 18 },
  itemLabel: {
    fontSize: 10,
    color: colors.white,
  },
  poisContainer: { marginTop: 13 },
  poiItemContainer: {
    width: VERTICAL_ITEM_WIDTH,
    height: VERTICAL_ITEM_HEIGHT,
    marginVertical: VERTICAL_SPACING,
    borderRadius: RADIUS,
    alignSelf: "center",
    overflow: "hidden",
    shadowRadius: 10,
    shadowColor: colors.red,
    backgroundColor: colors.grayWhite,

    shadowOpacity: 1,
    shadowOffset: { height: 10, width: 10 },
  },
  poiImage: {
    height: VERTICAL_ITEM_HEIGHT * 0.8,
    width: VERTICAL_ITEM_WIDTH * 1,
    alignSelf: "center",
  },
  poiNameText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bottomView: { paddingHorizontal: 15, paddingVertical: 15 },
  stickerView: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: colors.green,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  stickerText: {
    fontSize: 16,
    color: "white",
  },
});
