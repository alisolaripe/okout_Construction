import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import Profile from "./Profile";

function ProfileStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen  name="Profile"      component={Profile} initialRouteName={Profile}/>
    </Stack.Navigator>

  );
}
export default ProfileStack;
