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
  const imageWidth = screenWidth * 0.15;
  const cardWidth = screenWidth * 0.9; 
  const cardHeight = screenWidth * 0.3;

  return (
    <View style={{ ...layoutprops.containerPlayers }}>
      <View
        style={{
          width: cardWidth,
          height: cardHeight,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: screenWidth * 0.05,
          paddingVertical: screenWidth * 0.02,
          borderRadius: screenWidth * 0.05,
          borderWidth: screenWidth * 0.005,
          backgroundColor: "#D9D9D9",
          position: "relative", 
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 2,
              backgroundColor: "#FFF",
            }}>
            <Text
              style={{
                fontSize: screenWidth * 0.08,
                fontFamily: "Kadwa",
                paddingHorizontal: screenWidth * 0.04,
                paddingVertical: screenWidth * 0.02,
              }}>
              {numero}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginLeft: screenWidth * 0.03,
              paddingVertical: screenWidth * 0.01,
            }}>
            <Text
              style={{
                fontSize: screenWidth * 0.05,
                fontFamily: "Kadwa",
              }}>
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
        </View>
        <Image
          style={{
            width: imageWidth * 1.2, 
            height: imageWidth * 1.8,
            position: "absolute", 
            bottom: 0, 
            right: screenWidth * 0.05,
          }}
          source={{ uri: image }}/>
      </View>
    </View>
  );
};

export default Player;
