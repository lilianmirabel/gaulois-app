import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const MatchDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
};

const styles = StyleSheet.create({});

export default MatchDetail;
