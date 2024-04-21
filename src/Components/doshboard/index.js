import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerStack from '../customerscreen/index';
import PosStack from '../posscreen/index'
const Stack=createNativeStackNavigator();
import Doshboardscreen from "./Doshboardscreen";

function DoshboardStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen  name="Doshboardscreen"      component={Doshboardscreen} initialRouteName={Doshboardscreen}/>
      <Stack.Screen  name="CustomerStack"      component={CustomerStack}/>
      <Stack.Screen  name="PosStack"      component={PosStack}/>
    </Stack.Navigator>

  );
}
export default DoshboardStack;
