import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import layoutprops from "../Styles/LayoutProps";

const Matchs = ({ navigation }) => {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/gaulois-api/public/api/getMatch/1"
        );
        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchMatchData();
  }, []);

  const backgroundColor =
    matchData && matchData.point_gaulois > matchData.point_adverse
      ? "#2ECC71"
      : "#EF233C";

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.15;
  const separatorWidth = screenWidth * 0.26;

  return (
    <View style={layoutprops.containerMatchs}>
      {matchData && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: screenWidth * 0.1,
            backgroundColor: backgroundColor,
            borderWidth: screenWidth * 0.005,
          }}
        >
          <Image
            style={{
              width: imageWidth,
              height: imageWidth,
              borderRadius: imageWidth * 0.5,
              borderWidth: screenWidth * 0.005,
              padding: screenWidth * 0.001,
              backgroundColor: "#FFF",
            }}
            resizeMode="contain"
            source={require("../assets/images/gaulois-lg.png")}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                marginHorizontal: screenWidth * 0.02,
                paddingHorizontal: screenWidth * 0.1,
              }}
            >
              {matchData.point_gaulois} - {matchData.point_adverse}
            </Text>
          </View>
          <Image
            style={{
              width: imageWidth,
              height: imageWidth,
              borderRadius: imageWidth * 0.5,
              borderWidth: screenWidth * 0.005,
              padding: screenWidth * 0.01,
              backgroundColor: "#FFF",
            }}
            resizeMode="contain"
            source={{ uri: matchData.logo_equipe }}
          />
        </View>
      )}
    </View>
  );
};

export default Matchs;
