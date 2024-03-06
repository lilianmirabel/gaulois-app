import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Header from "./Components/Header";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Gaulois from "./Screens/Gaulois";
import Matchs from "./Screens/Matchs";
import Players from "./Screens/Players";

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: "#222222" },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Players") {
          iconName = focused ? "home" : "home";
          size = focused ? 25 : 25;
          color = focused ? "#fecb00" : "#808080";
          color.name = "#808080";
        } else if (route.name === "Matchs") {
          iconName = focused ? "film" : "film";
          color = focused ? "#fecb00" : "#808080";
          size = focused ? 25 : 25;
        } else if (route.name === "Gaulois") {
          iconName = focused ? "information" : "information";
          color = focused ? "#fecb00" : "#808080";
          size = focused ? 25 : 25;
        } //else if (route.name === "Note") {
        //   iconName = focused ? "star" : "star";
        //   color = focused ? "#fecb00" : "#808080";
        //   size = focused ? 25 : 25;
        // }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: ({ focused }) => ({
        color: focused ? "#fecb00" : "#808080",
      }),
    })}
  >
    <Tab.Screen
      name="Players"
      component={Players}
      options={{ title: "Players", header: () => <Header title="JOUEUR" /> }}
    />
    {/* <Tab.Screen
      name="Matchs"
      component={StackNavigator}
      options={{ title: "Matchs", header: () => <Header title="Matchs" /> }}
    /> */}
    <Tab.Screen
      name="Matchs"
      component={Matchs}
      options={{
        title: "Matchs",
        header: () => <Header title="MATCH" />,
      }}
    />
    <Tab.Screen
      name="Gaulois"
      component={Gaulois}
      options={{ title: "Gaulois", header: () => <Header title="GAULOIS" /> }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
