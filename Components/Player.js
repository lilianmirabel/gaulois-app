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
    <View style={{ ...layoutprops.containerPlayers }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between", // Ajustement pour placer les éléments aux extrémités
          alignItems: "center",
          paddingHorizontal: screenWidth * 0.05, // Ajustement de l'espacement horizontal
          paddingVertical: screenWidth * 0.02, // Ajustement de l'espacement vertical
          borderRadius: screenWidth * 0.1, // Ajustement du bord arrondi
          borderWidth: screenWidth * 0.005,
          backgroundColor: "#D9D9D9",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 2,
              backgroundColor: "#FFF",
            }}
          >
            <Text
              style={{
                fontSize: screenWidth * 0.08,
                fontFamily: "Kadwa",
                paddingHorizontal: screenWidth * 0.04, // Ajustement de l'espacement
                paddingVertical: screenWidth * 0.02, // Ajustement de l'espacement
              }}
            >
              {numero}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginLeft: screenWidth * 0.03, // Ajustement de l'espacement
            }}
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
        </View>
        <Image
          style={{
            width: imageWidth * 1.5,
            height: imageWidth * 2,
          }}
          source={{ uri: image }}
        />
      </View>
    </View>
  );
};

export default Player;
