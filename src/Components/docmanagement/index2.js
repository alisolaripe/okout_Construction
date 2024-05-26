import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import DocScreen from "./DocScreen";
import DocDetail from './DocDetail';
import DocCategoryScreen from './DocCategoryScreen';
import DocSubCategoryScreen from './DocSubCategoryScreen'
function DocmanagementStack2() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gesturesEnabled: false}}>
      <Stack.Screen name="DocCategoryScreen" component={DocCategoryScreen} initialRouteName={DocCategoryScreen}/>
      <Stack.Screen name="DocDetail" component={DocDetail}/>
      <Stack.Screen name="DocSubCategoryScreen" component={DocSubCategoryScreen}/>
    </Stack.Navigator>
  );
}

export default DocmanagementStack2;
