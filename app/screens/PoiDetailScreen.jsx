import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Animated,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { IMLocalized } from "config/IMLocalized";
import colors from "res/colors";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
const UPPER_IMAGE_WIDTH = width;
const UPPER_IMAGE_HEIGHT = width * 1.1;
const rating = (Math.random() * 5).toFixed(1);
const PoiDetailScreen = ({ navigation, route }) => {
  console.log("POIDETAILSCREEN");
  const { item } = route?.params;
  const [scrollY, setScrollY] = React.useState(0);
  const [expandDescription, setExpandDescription] = React.useState(false);
  const mapsView = React.createRef();
  const [initialRegion, setInitialRegion] = React.useState({
    longitude: item.address.longitude,
    latitude: item.address.latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.1,
  });
  const [loadingSound, setLoadingSound] = React.useState(false);
  const [sound, setSound] = React.useState();
  const [soundIsPlaying, setSoundIsPlaying] = React.useState(false);
  const [lastMillisecPlayed, setLastMillisecPlayed] = React.useState(0);
  const toggleMapsDelta = () => {
    goToMarkerZoomIn();
  };
  const openInGoogleMap = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${initialRegion.latitude},${initialRegion.longitude}`;
    const label = item.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };
  const goToMarkerZoomIn = () => {
    setInitialRegion({
      ...initialRegion,
      latitudeDelta: 0.003,
      longitudeDelta: 0.00122,
    });
    mapsView.current.animateToRegion(initialRegion, 2000);
  };
  const toggleDescription = () => {
    setExpandDescription(!expandDescription);
  };
  const handleScrollY = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };
  async function playSound() {
    if (!item.audio) {
      return;
    }
    if (soundIsPlaying) {
      await sound
        .pauseAsync()
        .then((itemObj) => setLastMillisecPlayed(itemObj.positionMillis));
      setSoundIsPlaying(false);
    } else {
      console.log("Loading Sound");
      setLoadingSound(true);
      const { sound } = await Audio.Sound.createAsync({
        uri: item.audio[0]?.url,
      });
      setSound(sound);
      console.log("Playing Sound");
      setLoadingSound(false);
      await sound
        .playFromPositionAsync(lastMillisecPlayed)
        .then((soundObj) => setSoundIsPlaying(true));
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          console.log("just finished");
          setLastMillisecPlayed(0);
          setSoundIsPlaying(false);
        }
      });
    }
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <ScrollView
      scrollEventThrottle={16}
      onScroll={handleScrollY}
      stickyHeaderIndices={[0]}
      bounces={false}
      backgroundColor={"white"}
    >
      <View>
        <View
          style={[
            styles.stickyHeader,
            {
              backgroundColor:
                scrollY >= UPPER_IMAGE_HEIGHT * 0.8
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.1)",
            },
          ]}
        >
          <Icon
            size={30}
            name="chevron-back-outline"
            onPress={navigation.goBack}
            style={{
              borderRadius: 15,
              backgroundColor: colors.white,
              width: 32,
              height: 32,
              overflow: "hidden",
            }}
          ></Icon>
          <Text
            numberOfLines={1}
            style={[
              styles.poiNameHeader,
              {
                color:
                  scrollY >= UPPER_IMAGE_HEIGHT * 0.85
                    ? colors.black
                    : "transparent",
              },
            ]}
          >
            {item.name}
          </Text>
          <MaterialIcon
            style={{
              borderRadius: 15,
              width: 32,
              height: 32,
              overflow: "hidden",
            }}
            color={colors.gray}
            size={28}
            name={"ios-share"}
          ></MaterialIcon>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground
          style={styles.PoiImage}
          source={{ uri: item?.photo[0].url }}
        ></ImageBackground>
        <Animatable.View
          animation="fadeInUpBig"
          easing="ease-out"
          style={styles.poiWrapper}
        >
          {item.audio[0] && (
            <TouchableWithoutFeedback onPress={playSound}>
              <View style={styles.audioContainer}>
                {loadingSound ? (
                  <ActivityIndicator
                    style={{ alignSelf: "center" }}
                    color={colors.green}
                    size="small"
                  />
                ) : soundIsPlaying ? (
                  <Icon
                    style={{ marginLeft: 3 }}
                    size={35}
                    color={colors.green}
                    name="pause"
                  ></Icon>
                ) : (
                  <Icon
                    style={{ marginLeft: 3 }}
                    size={35}
                    color={colors.green}
                    name="play"
                  ></Icon>
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
          <View
            style={[
              styles.poiDetailContainer,
              !item.audio[0] && { marginTop: 35 },
            ]}
          >
            <View style={styles.poiDetailHeaderContainer}>
              <Text style={styles.PoiName}>{item.name}</Text>
              <View
                style={{
                  height: 40,
                  width: 70,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderRadius: 20,
                  alignItems: "center",
                }}
              >
                <Icon name="star" color="#FDCC0D" size={25}></Icon>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", marginLeft: -12 }}
                >
                  {rating}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text
                numberOfLines={expandDescription ? 30 : 4}
                style={{ fontSize: 14, padding: 0, opacity: 0.6 }}
              >
                {item.description[0].content}
              </Text>
              <Text
                onPress={toggleDescription}
                style={styles.readLessAndMoreButton}
              >
                {expandDescription
                  ? IMLocalized("readLess")
                  : IMLocalized("readMore")}
              </Text>
            </View>
            <View style={styles.photosSection}>
              <View style={styles.photosSectionHeader}>
                <Text style={styles.photosSectionHeaderText}>
                  {IMLocalized("photos")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    marginRight: 3,
                  }}
                >
                  <Text
                    onPress={() =>
                      navigation.navigate("DisplayPhotosScreen", {
                        photo: item?.photo,
                      })
                    }
                    style={{ color: colors.skyblue, marginRight: 5 }}
                  >
                    {IMLocalized("seeAll")}
                  </Text>
                  <Icon
                    name="images"
                    size={16}
                    color={colors.primaryBlue}
                  ></Icon>
                </View>
              </View>
              <View style={styles.photosSectionContent}>
                <ScrollView
                  horizontal
                  style={styles.photosSectionContentFlatList}
                >
                  {item?.photo.map((photo, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() =>
                          navigation.navigate("DisplayPhotosScreen", {
                            photo: item?.photo,
                          })
                        }
                      >
                        <Animatable.Image
                          animation={"fadeInUp"}
                          delay={index * 500}
                          duration={2000}
                          key={index}
                          source={{ uri: photo?.url }}
                          resizeMode={"cover"}
                          style={styles.photo}
                        ></Animatable.Image>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <View style={styles.mapSection}>
              <View
                style={[
                  styles.mapSection,
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={styles.mapTitle}>{IMLocalized("maps")} </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    onPress={openInGoogleMap}
                    style={{
                      color: colors.skyblue,
                    }}
                  >
                    {IMLocalized("directions")}
                  </Text>
                  <MaterialIcon
                    name="directions"
                    color={colors.primaryBlue}
                    size={20}
                  ></MaterialIcon>
                </View>
              </View>
              <View style={styles.poiLocation}>
                <MapView
                  ref={mapsView}
                  minZoomLevel={10}
                  maxZoomLevel={17}
                  zoomEnabled={true}
                  scrollEnabled={true}
                  showsScale={true}
                  initialRegion={initialRegion}
                  style={styles.mapsView}
                >
                  <Marker
                    onPress={toggleMapsDelta}
                    title={item.name}
                    coordinate={{
                      latitude: item.address.latitude,
                      longitude: item.address.longitude,
                    }}
                  >
                    <View style={styles.markerWrapper}>
                      <View style={styles.customMarker}>
                        <Image
                          style={{ ...StyleSheet.absoluteFillObject }}
                          source={{ uri: item.photo[0].url }}
                        ></Image>
                      </View>
                      <View style={styles.customMarkerTail}></View>
                    </View>
                  </Marker>
                </MapView>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default PoiDetailScreen;

const styles = StyleSheet.create({
  PoiImage: {
    height: UPPER_IMAGE_HEIGHT,
    width: UPPER_IMAGE_WIDTH,
    paddingTop: Constants.statusBarHeight,
  },
  poiNameHeader: {
    fontSize: 22,
    flexGrow: 1,
    textAlign: "center",
    maxWidth: width - (34 + 12) * 2,
    fontWeight: "bold",
    borderRadius: 6,
    overflow: "hidden",
  },
  stickyHeader: {
    paddingTop: Constants.statusBarHeight,
    height: 20 + 34 + Constants.statusBarHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  poiWrapper: {
    top: -30,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  audioContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    top: -30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 15,
    elevation: 10,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 2,
    },
    shadowColor: colors.lightGray,
  },
  contentContainer: {
    marginBottom: 50,
    transform: [{ translateY: -54 - Constants.statusBarHeight }],
  },

  poiDetailContainer: { paddingHorizontal: 15, top: -30 },
  poiDetailHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  PoiName: {
    fontSize: 22,
    fontWeight: "800",
    maxWidth: width - 140,
  },
  readLessAndMoreButton: {
    color: colors.skyblue,
    fontSize: 14,
    fontWeight: "300",
  },
  photosSection: {},
  photosSectionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photosSectionHeaderText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "700",
  },
  photosSectionContent: { minHeight: 30 },
  photo: { width: 170, height: 170, marginHorizontal: 5, borderRadius: 10 },
  poiLocation: {
    borderRadius: 10,
    overflow: "hidden",
    height: width * 0.9,
    width: "auto",
  },
  mapsView: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrapper: { display: "flex", bottom: 15, left: 15 },
  customMarker: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: colors.skyblue,
  },
  customMarkerTail: {
    position: "absolute",
    bottom: 0,
    left: 16,
    bottom: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.skyblue,
    backgroundColor: "transparent",
  },
  mapTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "700",
  },
});
