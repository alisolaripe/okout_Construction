import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import DYBStack2 from '../DYBscreen/index2';
import Project_Features from "./Project_Features";
import Project_Feature_Detail from "./Project_Feature_Detail";
import Project_Feature_List from "./Project_Feature_List";
import Project_Feature_List_Detail from "./Project_Feature_List_Detail";
function Project_FeaturesStack() {
  return (
      <Stack.Navigator initialRouteName={Project_Features}
        screenOptions={{
          headerShown:false,gesturesEnabled:false
        }}>
        <Stack.Screen name="Project_Features" component={Project_Features}  />
        <Stack.Screen name="Project_Feature_Detail" component={Project_Feature_Detail}  />
        <Stack.Screen name="Project_Feature_List" component={Project_Feature_List}  />
        <Stack.Screen name="Project_Feature_List_Detail" component={Project_Feature_List_Detail}  />
        <Stack.Screen name="DYBStack2" component={DYBStack2} />
      </Stack.Navigator>
  );
}

export default Project_FeaturesStack;
