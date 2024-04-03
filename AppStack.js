import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MatchDetail from "./Screens/MatchDetail";
import Matchs from "./Screens/Matchs";
import App from "./App";
import Players from "./Screens/Players";
import PlayerDetail from "./Screens/PlayerDetail";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Matchs" component={Matchs} />
        <Stack.Screen name="MatchDetail" component={MatchDetail} />
        <Stack.Screen name="Players" component={Players} />
        <Stack.Screen name="PlayerDetail" component={PlayerDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
