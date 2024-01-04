import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import Task_Management from "./Task_Management";
import Task_management_Item from "./Task_management_Item";
import AddNewTask from "./AddNewTask";
import TaskDetail from './Task_Detail';
import Taskstructure from './Task_structure'
function Task_managementStack() {
  return (

      <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}} initialRouteName={Taskstructure}>
        <Stack.Screen  name="Taskstructure" component={Taskstructure}/>
        <Stack.Screen  name="Task_Management"      component={Task_Management} />
        <Stack.Screen  name="Task_management_Item" component={Task_management_Item}/>
        <Stack.Screen  name="AddNewTask" component={AddNewTask}/>
        <Stack.Screen  name="TaskDetail" component={TaskDetail}/>

      </Stack.Navigator>

  );
}
export default Task_managementStack;
