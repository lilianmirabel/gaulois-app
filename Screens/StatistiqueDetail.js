import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import Header from "../Components/Header";

const StatistiqueDetail = ({ navigation }) => {
  const route = useRoute();
  const { id_joueur, id_match } = route.params;

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
    fetch(`http://localhost/gaulois-api/public/api/getInfoPartieParMatchParJoueur/${id_joueur}/${id_match}`)
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

  if (!matchData) {
    return <Text>Chargement des données en cours</Text>;
  }

  const renderCumule = () => {
    const { cumule } = matchData;

    return (
      <View style={styles.cumuleContainer}>
        {cumule.passes_complete != null && (
          <Text style={styles.cumuleText}>Passes complètes: {cumule.passes_complete}</Text>
        )}
        {cumule.passes_tentee != null && (
          <Text style={styles.cumuleText}>Passes tentées: {cumule.passes_tentee}</Text>
        )}
        {cumule.verges_passees != null && (
          <Text style={styles.cumuleText}>Verges passées: {cumule.verges_passees}</Text>
        )}
        {cumule.touche != null && (
          <Text style={styles.cumuleText}>Touché: {cumule.touche}</Text>
        )}
        {cumule.interceptions != null && (
          <Text style={styles.cumuleText}>Interceptions: {cumule.interceptions}</Text>
        )}
        {cumule.nb_courses != null && (
          <Text style={styles.cumuleText}>Nombre de courses: {cumule.nb_courses}</Text>
        )}
        {cumule.verge_gagnees != null && (
          <Text style={styles.cumuleText}>Verges gagnées: {cumule.verge_gagnees}</Text>
        )}
        {cumule.moyenne_verge != null && (
          <Text style={styles.cumuleText}>Moyenne de verges: {cumule.moyenne_verge}</Text>
        )}
        {cumule.nb_receptions != null && (
          <Text style={styles.cumuleText}>Réceptions: {cumule.nb_receptions}</Text>
        )}
       
        
      
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Statistiques" />
      <View style={styles.container}>
        {renderCumule()}
      </View>
    </View>
  );
};

export default StatistiqueDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cumuleContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cumuleText: {
    fontSize: 18,
    fontFamily: "Kadwa",
    marginBottom: 5,
  },
  headerView: {
    backgroundColor: "#2ECC71",
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
