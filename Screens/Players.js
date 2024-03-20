import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Player from "../Components/Player";

const Players = ({ navigation }) => {
  const [playerData, setplayerData] = useState([]);

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
      })
      .catch(function (error) {
        console.error("Erreur lors de la récupération des données :", error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={playerData}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id_joueur.toString()}
        renderItem={({ item, index }) => {
          return (
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
