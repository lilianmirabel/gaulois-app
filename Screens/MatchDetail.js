import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions } from "react-native";
import { useFonts } from "expo-font";

const MatchDetail = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [matchData, setMatchData] = useState(null);

  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });

  useEffect(() => {
    getMatch();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const getMatch = () => {
    fetch("http://localhost/gaulois-api/public/api/getMatch/"+item)
      .then(response => response.json())
      .then(data => {
        setMatchData(data);
        console.log(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  };

  const handleRediffusionPress = () => {
    if (matchData && matchData.rediffusion) {
      Linking.openURL(matchData.rediffusion);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  if (!matchData) {
    return <Text>Chargement des données en cours</Text>;
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <TouchableOpacity onPress={handleRediffusionPress}>
        <View style={{ backgroundColor: "#F3722C",
          paddingHorizontal: screenWidth * 0.23,
          paddingVertical: screenWidth * 0.03,
          borderRadius: 25,
           alignItems: "center",
           justifyContent: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 33, fontFamily: "CollegeBlock",}}>REDIFFUSION
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>{matchData.date_match}</Text>
      <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>{matchData.lieu}</Text>
      <Text style={{ color: "#F3722C", fontWeight: "bold", fontSize: 33, fontFamily: "CollegeBlock",}}>STATISTIQUES</Text>
      <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Touché : {matchData.total_touchdowns}</Text>
      <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Plaquage : {matchData.total_plaquages}</Text>
    </View>
  );
};

export default MatchDetail;
