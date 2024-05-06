import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import ThemChange from './ThemChange'
function ThemChangeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, gesturesEnabled: false,
      }}>
        <Stack.Screen name="LoadingPage" component={ThemChange} initialRouteName={ThemChange} />
        {/*<Stack.Screen name="Home" component={HomeStack}/>*/}
      </Stack.Navigator>

  );
}

export default ThemChangeStack;
