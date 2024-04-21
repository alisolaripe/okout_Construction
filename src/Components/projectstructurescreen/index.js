import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Project_structure2 from "./Project_structure";
import  Project_Sites from './Project_Sites';
import Project_UnitsStack from '../unitstructurscreen/index'
import Project_SectionStack from "../sectionstructurescreen/index";
import Project_FeaturesStack from "../featurestructurescreen/index";
import Project_Site_Detail from './Project_Site_Detail';
import Task_managementStack2 from "../taskmanagementscreen/index2";
import Task_managementStack3 from '../taskmanagementscreen/index3'
function Project_structureStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}} initialRouteName={Project_structure2}>
        <Stack.Screen name="Project_structure2" component={Project_structure2}  />
        <Stack.Screen name="Project_Site_Detail" component={Project_Site_Detail}  />
        <Stack.Screen name="Project_Sites"     component={Project_Sites}/>
        <Stack.Screen name="Project_UnitsStack"     component={Project_UnitsStack}/>
        <Stack.Screen name="Project_SectionStack"       component={Project_SectionStack}/>
        <Stack.Screen name="Project_FeaturesStack"  component={Project_FeaturesStack}/>
        <Stack.Screen name="Task_managementStack2"  component={Task_managementStack2}/>
        <Stack.Screen name="Task_managementStack3"  component={Task_managementStack3}/>
      </Stack.Navigator>

  );
}

export default Project_structureStack;
