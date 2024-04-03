import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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

  if (!fontsLoaded) {
    return null;
  }

  if (!matchData) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View>
      <Text>{matchData.nom}</Text>
      <Text>{matchData.score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MatchDetail;
