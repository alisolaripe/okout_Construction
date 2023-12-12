import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Project_Units from './Project_Units';
import { NavigationContainer } from "@react-navigation/native";
import Project_Section2 from "../sectionstructurescreen/index";
import Project_Unit_Detail from "./Project_Unit_Detail";
function Project_UnitsStack() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false, gesturesEnabled: false,
        }}>
        <Stack.Screen name="Project_Units" component={Project_Units} initialRouteName={Project_Units}/>
        <Stack.Screen name="Project_Section2"       component={Project_Section2}/>
        <Stack.Screen name="Project_Unit_Detail"     component={Project_Unit_Detail}/>
      </Stack.Navigator>
  );
}

export default Project_UnitsStack;
