import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Header from "./Components/Header";
import AppStack from "./AppStack";
import Gaulois from "./Screens/Gaulois";
import Matchs from "./Screens/Matchs";
import MatchDetail from "./Screens/MatchDetail";
import Players from "./Screens/Players";
import PlayerDetail from "./Screens/PlayerDetail";
import MatchJoue from "./Screens/MatchJoue";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigatorMatch = () => (
  <Stack.Navigator initialRouteName="Matchs">
    <Stack.Screen name="Matchs" component={Matchs} options={({ route }) => ({
      headerShown: false, 
    })} />
    <Stack.Screen name="MatchDetail" component={MatchDetail} options={({ route }) => ({
      headerShown: false, headerTitle: false
      
    })} />
  </Stack.Navigator>
);

const StackNavigatorPlayer = () => (
  <Stack.Navigator initialRouteName="Matchs">
    <Stack.Screen name="Players" component={Players} options={({ route }) => ({
      headerShown: false
    })} />
    <Stack.Screen
  name="PlayerDetail"
  component={PlayerDetail}
  options={({ route }) => ({
    headerShown: false // Cacher le header par défaut
  })}
/>

    <Stack.Screen name="MatchJoue" component={MatchJoue} options={({ route })  => ({
      headerShown: false
    })} />
  </Stack.Navigator>
);


const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: "#222222" },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Players") {
          iconName = focused ? "football-helmet" : "football-helmet";
          size = focused ? 25 : 25;
          color = focused ? "#fecb00" : "#808080";
          color.name = "#808080";
        } else if (route.name === "Matchs") {
          iconName = focused ? "football" : "football";
          color = focused ? "#fecb00" : "#808080";
          size = focused ? 25 : 25;
        } else if (route.name === "Gaulois") {
          iconName = focused ? "alpha-g-box-outline" : "alpha-g-box-outline";
          color = focused ? "#fecb00" : "#808080";
          size = focused ? 25 : 25;
        }

        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
      tabBarLabelStyle: ({ focused }) => ({
        color: focused ? "#fecb00" : "#808080",
      }),
    })}
  >
    <Tab.Screen
      name="Players"
      component={StackNavigatorPlayer}
      options={{ title: "Players",  headerShown: false }}
    />
    <Tab.Screen
      name="Matchs"
      component={StackNavigatorMatch}
      options={{
        title: "Matchs", headerShown: false
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
