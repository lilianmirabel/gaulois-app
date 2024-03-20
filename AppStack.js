import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MatchDetail from "./Screens/MatchDetail";
import Matchs from "./Screens/Matchs";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Matchs" component={Matchs} />
        <Stack.Screen name="MatchDetail" component={MatchDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
