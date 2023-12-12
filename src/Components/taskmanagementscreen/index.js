import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import Task_Management from "./Task_Management";
import Task_management_Item from "./Task_management_Item";
import AddNewTask from "./AddNewTask";
function Task_managementStack() {
  return (

      <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}} initialRouteName={Task_Management}>
        <Stack.Screen  name="Task_Management"      component={Task_Management} />
        <Stack.Screen  name="Task_management_Item" component={Task_management_Item}/>
        <Stack.Screen  name="AddNewTask" component={AddNewTask}/>
      </Stack.Navigator>

  );
}
export default Task_managementStack;
