import { StyleSheet, Text, View } from "react-native";
import layoutprops from "../Styles/LayoutProps";
import textprops from "../Styles/TextProps";
import viewprops from "../Styles/ViewProps";

function Header({ title, textColor, viewColor }) {
  return (
    <View style={layoutprops.containerHeader}>
      <View style={[viewprops.header, { backgroundColor: viewColor }]}>
        <View style={[viewprops.headerText, { backgroundColor: viewColor }]}>
          <Text style={[textprops.header, { color: textColor }]}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({});