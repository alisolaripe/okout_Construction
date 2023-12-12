import React, { Component } from "react";
import Splash from "./Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
const Stack = createNativeStackNavigator();


function SplashStack() {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} initialRouteName={Splash} />

    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SplashStack;
