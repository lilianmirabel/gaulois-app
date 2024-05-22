import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";

const Gaulois = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getBoutique();
  }, []);

  const getBoutique = () => {
    fetch("http://localhost/gaulois-api/public/api/getBoutique")
      .then(response => response.json())
      .then(data => {
        setData(data);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D30D14" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('Detail', { item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.nom}</Text>
      <Text style={styles.price}>${item.prix}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id_boutique}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1.5,
    overflow: "hidden",
    alignItems: "center",
    flexBasis: '48%', // Adjusts the width of the card
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontFamily: "Kadwa",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Kadwa",
    marginBottom: 10,
  },
});

export default Gaulois;
