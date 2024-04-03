import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const PlayerDetail = (navigation) => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);

  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlayerDetail;
