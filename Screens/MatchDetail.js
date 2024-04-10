import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import Header from "../Components/Header";

const MatchDetail = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); 
        console.log(data);
      })
      .catch(error => {
        setLoading(false); 
        console.error("Erreur lors de la récupération des données :", error);
      });
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#D30D14" />
      </View>
    );
  }

  const handleRediffusionPress = () => {
    if (matchData && matchData.rediffusion) {
      Linking.openURL(matchData.rediffusion);
    }
  };

  if (!matchData) {
    return <Text>Chargement des données en cours</Text>;
  }

  // Détermine le titre en fonction des points des Gaulois
  const title = matchData.point_gaulois > matchData.point_adverse ? "Victoire" : "Defaite";

  return (
    <View style={{ flex: 1 }}> {/* Assurez-vous que la vue principale a flex: 1 */}
      <Header title={title} /> {/* Utilisation du titre déterminé */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
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
    </View>
  );
};

export default MatchDetail;
