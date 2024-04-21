import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import Customer from "./Customer";

function CustomerStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen  name="Customer"      component={Customer} initialRouteName={Customer}/>
    </Stack.Navigator>

  );
}
export default CustomerStack;
