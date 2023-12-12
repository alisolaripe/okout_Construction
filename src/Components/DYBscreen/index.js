import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import DYB from "./DYB";
import  DYB_Detail from './DYB_Detail';
import  PojectList2 from './PojectList'
import SiteList from './SiteList';
import Details_image from './Details_image';
import  UnitList from './UnitList';
import SectionList from './SectionList'
import DYB_List from './DYB_List';
import DYB_List_Detail from './DYB_List_Detail'
function DYBStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}} initialRouteName={PojectList2}>
      <Stack.Screen name="PojectList2" component={PojectList2} />
      <Stack.Screen name="DYB" component={DYB}/>
      <Stack.Screen name="DYB_Detail" component={DYB_Detail} />
      <Stack.Screen name="SiteList" component={SiteList} />
      <Stack.Screen name="Details_image" component={Details_image} />
      <Stack.Screen name="UnitList" component={UnitList} />
      <Stack.Screen name="SectionList" component={SectionList} />
      <Stack.Screen name="DYB_List" component={DYB_List} />
      <Stack.Screen name="DYB_List_Detail" component={DYB_List_Detail} />
    </Stack.Navigator>
  );
}
export default DYBStack;
