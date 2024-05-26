import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View, ActivityIndicator } from "react-native";
import Match from "../Components/match";
import Header from "../Components/Header";

const Matchs = ({ navigation }) => {
  const route = useRoute();
  const { item, joueur } = route.params;

  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });

  useEffect(() => {
    getMatchs();
  }, []);

  const getMatchs = () => {
    fetch("http://localhost/gaulois-api/public/api/getMatchJouerParJoueur/"+item)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setMatchData(response);
        setLoading(false);
      })
      .catch(function (error) {
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
    <View style={styles.container}>
      <Header title="matchs joues" /> 
      <FlatList
        data={matchData}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id_match.toString()}
        renderItem={({ item, index }) => {
          return (
            
              <View
                style={
                  index !== matchData.length - 1
                    ? styles.matchContainerWithMargin
                    : styles.matchContainer
                }
              >
              <Pressable
              onPress={() =>
               navigation.navigate('StatistiqueDetail', { id_joueur: joueur, id_match: item.id_match })
              }
            >
                <Match
                  id_match={item.id_match}
                  point_gaulois={item.point_gaulois}
                  point_adverse={item.point_adverse}
                  logo_adverse={item.logo_equipe}
                  lieu={item.lieu}
                />
                </Pressable>
              </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  matchContainer: {
    marginBottom: 0,
  },
  matchContainerWithMargin: {
    marginBottom: 30,
  },
});

export default Matchs;
