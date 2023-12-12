import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import HomeStack from "../homescreen/index";
import LoadingPage from './LoadingPage'
import { NavigationContainer } from "@react-navigation/native";
function LoadingPageStack() {
  return (
     <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false, gesturesEnabled: false,
      }}>
      <Stack.Screen name="LoadingPage" component={LoadingPage} initialRouteName={LoadingPage} />
     <Stack.Screen name="Home" component={HomeStack}/>
    </Stack.Navigator>
     </NavigationContainer>
  );
}

export default LoadingPageStack;
