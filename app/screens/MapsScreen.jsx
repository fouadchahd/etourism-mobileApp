import React from "react";
import { Dimensions, StyleSheet, Image, View, ScrollView } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import colors from "res/colors";
const { height, width } = Dimensions.get("window");
const CustomMarker = ({ coordinate }) => {
  return (
    <Marker
      onPress={() => console.log("marker pressed")}
      title={"POi_name"}
      coordinate={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      }}
    >
      <View style={styles.markerWrapper}>
        <View style={styles.customMarker}>
          <Image
            style={{ ...StyleSheet.absoluteFillObject }}
            source={{
              uri: "https://thumbs.dreamstime.com/z/rabat-morocco-skyline-color-buildings-blue-sky-copy-space-vector-illustration-business-travel-tourism-concept-historic-136794731.jpg",
            }}
          ></Image>
        </View>
        <View style={styles.customMarkerTail}></View>
      </View>
    </Marker>
  );
};
const MapsScreen = () => {
  const INITIAL_REGION = {
    latitude: 33.9741,
    longitude: -6.8458,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };
  const mapRef = React.useRef();
  const animateToRegion = () => {
    let region = {
      latitude: 42.5,
      longitude: 15.2,
      latitudeDelta: 7.5,
      longitudeDelta: 7.5,
    };

    mapRef.current.animateToRegion(region, 2000);
  };

  return (
    <View style={styles.container}>
      <MapView
        clusterColor={colors.splashScreenBackgroundColor}
        initialRegion={INITIAL_REGION}
        cluster
        style={styles.map}
      >
        <CustomMarker coordinate={{ latitude: 33.4, longitude: -6.71 }} />
        <CustomMarker coordinate={{ latitude: 33.4, longitude: -6.72 }} />
        <CustomMarker coordinate={{ latitude: 33.4, longitude: -6.73 }} />
        <CustomMarker coordinate={{ latitude: 33.4, longitude: -6.74 }} />
        <CustomMarker coordinate={{ latitude: 33.4, longitude: -6.75 }} />
        <CustomMarker coordinate={{ latitude: 33.1, longitude: -6.4 }} />
        <CustomMarker coordinate={{ latitude: 33.6, longitude: -6.3 }} />
        <CustomMarker coordinate={{ latitude: 33.6, longitude: -6.0 }} />
        <CustomMarker coordinate={{ latitude: 33.1, longitude: -6.8 }} />
        <CustomMarker coordinate={{ latitude: 33.9, longitude: -6.4 }} />
        <CustomMarker coordinate={{ latitude: 33.2, longitude: -6 }} />
        <CustomMarker coordinate={{ latitude: 33.4, longitude: -7 }} />
        <CustomMarker coordinate={{ latitude: 33.8, longitude: -7.2 }} />
      </MapView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bottomSheet}
      >
        <View style={styles.poiContainer}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <View key={index} style={styles.poiWrapper}></View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MapsScreen;
const poiCardWidth = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrapper: { display: "flex", bottom: 15, left: 15 },
  customMarker: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: colors.splashScreenBackgroundColor,
  },
  customMarkerTail: {
    position: "absolute",
    bottom: 0,
    left: 16,
    bottom: -3,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.splashScreenBackgroundColor,
    backgroundColor: "transparent",
  },
  bottomSheet: {
    width: width * 0.98,
    alignSelf: "center",
    height: 180,
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    position: "absolute",
    bottom: 110,
    paddingVertical: 10,
    paddingHorizontal: 3,
    overflow: "scroll",
  },
  poiContainer: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
  },
  poiWrapper: {
    width: poiCardWidth,
    height: poiCardWidth,
    marginLeft: 10,
    backgroundColor: colors.white,
  },
});
