import { StyleSheet, Text, View } from "react-native";
import layoutprops from "../Styles/LayoutProps";
import textprops from "../Styles/TextProps";
import viewprops from "../Styles/ViewProps";

function Header({ title }) {
  return (
    <View style={layoutprops.containerHeader}>
      <View style={viewprops.header}>
        <View style={viewprops.headerText}>
          <Text style={textprops.header}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({});
