import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, ActivityIndicator } from "react-native";
import Match from "../Components/match";
import MatchDetail from "./MatchDetail";
import Header from "../Components/Header";

const Matchs = ({ navigation }) => {
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
    fetch("http://localhost/gaulois-api/public/api/getAllMatchs")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setMatchData(response);
        console.log(response);
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
      <Header title="matchs" />
      <FlatList
        data={matchData}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id_match.toString()}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('MatchDetail', { item: item.id_match })
              }
            >
              <View
                style={
                  index !== matchData.length - 1
                    ? styles.matchContainerWithMargin
                    : styles.matchContainer
                }
              >
                <Match
                  id_match={item.id_match}
                  point_gaulois={item.point_gaulois}
                  point_adverse={item.point_adverse}
                  logo_adverse={item.logo_equipe}
                  lieu={item.lieu}
                />
              </View>
            </Pressable>
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
