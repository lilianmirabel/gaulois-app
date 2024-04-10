import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View,Pressable, ActivityIndicator } from "react-native";
import Player from "../Components/Player";
import PlayerDetail from "./PlayerDetail.js";
import Header from "../Components/Header";

const Players = ({ navigation }) => {
  const [playerData, setplayerData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });

  useEffect(() => {
    getPlayer();
  }, []);

  const getPlayer = () => {
    fetch("http://localhost/gaulois-api/public/api/getAllJoueurs")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setplayerData(response);
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
      <Header title="JOUEURS" />
      <FlatList
        data={playerData}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id_joueur.toString()}
        renderItem={({ item, index }) => {
          return (
            <Pressable
            onPress={() =>
              navigation.navigate('PlayerDetail', { item: item.id_joueur })
            }
          >
            <View
              style={
                index !== playerData.length - 1
                  ? styles.playerContainerWithMargin
                  : styles.playerContainer
              }
            >
              <Player
                prenom={item.prenom}
                nom={item.nom}
                numero={item.numero}
                image={item.photo_detoure}
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
  playerContainer: {
    marginBottom: 0,
  },
  playerContainerWithMargin: {
    marginBottom: 50,
  },
});

export default Players;
