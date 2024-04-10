import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Dimensions, Pressable, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import Header from "../Components/Header"; // Import du composant Header

const PlayerDetail = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [playerData, setplayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });

  useEffect(() => {
    getPlayer();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const getPlayer = () => {
    setLoading(true);
    fetch("http://localhost/gaulois-api/public/api/getJoueur/"+item)
      .then(response => response.json())
      .then(data => {
        setplayerData(data);
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

  return (
    <View style={{ flex: 1 }}>
      <Header title={`${playerData.prenom} ${playerData.nom}`} /> 
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Match présent : {playerData.nombre_de_matchs}</Text>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Position : {playerData.pos}</Text>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Poids : {playerData.poids} lbs</Text>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Ecole : {playerData.ecole}</Text>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Ville : {playerData.ville}</Text>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Programme : {playerData.programme}</Text>
        <Text style={{ fontSize: 25, fontFamily: "Kadwa",}}>Taille : {playerData.taille}</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('MatchJoue', { item: playerData.id_joueur, joueur: playerData.id_joueur })
          }
        >
          <View style={{ backgroundColor: "#D30D14",
            paddingHorizontal: screenWidth * 0.10,
            paddingVertical: screenWidth * 0.01,
            borderRadius: 25,
             alignItems: "center",
             justifyContent: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 33, fontFamily: "CollegeBlock",}}>STATISTIQUES
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlayerDetail;
