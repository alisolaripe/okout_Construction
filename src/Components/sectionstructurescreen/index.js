import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import Project_Section from "./Project_Section";
import Project_Features2 from "../featurestructurescreen/index";
import Project_Section_Detail from "./Project_Section_Detail";
function Project_SectionStack() {
  return (

      <Stack.Navigator
      screenOptions={{ headerShown: false,gesturesEnabled:false}}>
      <Stack.Screen name="Project_Section" component={Project_Section} initialRouteName={Project_Section}/>
        <Stack.Screen name="Project_Features2"  component={Project_Features2}/>
  <Stack.Screen name="Project_Section_Detail"  component={Project_Section_Detail}/>
      </Stack.Navigator>

  );
}
export default Project_SectionStack;
