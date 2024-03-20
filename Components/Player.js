import { useFonts } from "expo-font";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import layoutprops from "../Styles/LayoutProps";

const Player = ({ numero, nom, prenom, image, id_joueur }) => {
  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const imageWidth = screenWidth * 0.15;

  return (
    <View style={layoutprops.containerPlayers}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: screenWidth * 0.1,
          borderWidth: screenWidth * 0.005,
          backgroundColor: "#D9D9D9",
          height: screenHeight * 0.1,
          width: screenWidth * 1,
        }}
      >
        <View
          style={{
            borderRadius: 50,
            borderWidth: 2,
            backgroundColor: "#FFF",
          }}
        >
          <Text
            style={{
              fontSize: screenWidth * 0.1,
              fontFamily: "Kadwa",
              marginLeft: 25,
              marginRight: 25,
            }}
          >
            {numero}
          </Text>
        </View>
        <View
          style={{ flexDirection: "column", marginLeft: 20, marginRight: 20 }}
        >
          <Text
            style={{
              fontSize: screenWidth * 0.05,
              fontFamily: "Kadwa",
            }}
          >
            {prenom}
          </Text>
          <Text
            style={{
              fontSize: screenWidth * 0.05,
              fontFamily: "Kadwa",
            }}
          >
            {nom}
          </Text>
        </View>
        <Image
          style={{
            width: imageWidth * 1.5,
            height: imageWidth * 2,
            bottom: 20,
          }}
          source={{ uri: image }}
        />
      </View>
    </View>
  );
};

export default Player;
