import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerCustomize from '../drawer/Drawer';
import Project_structureStack from '../projectstructurescreen/index';
import Task_managementStack from '../taskmanagementscreen/index';
import Home from "./Home_meno";
import LogIn from '../loginscreen/Login'
import ProfileStack from '../profilescreen/index';
import {Dimensions} from "react-native";
import Home_meno from "./Home_meno";
const Drawer = createDrawerNavigator();
const width = Dimensions.get("window").width;

function Home_Navigation() {
  return (

      <Stack.Navigator screenOptions={{ headerShown: false, gesturesEnabled: true }} initialRouteName={Home} >
        <Stack.Screen name="Home" component={Home_meno} />
        <Stack.Screen name="Project_structureStack" component={Project_structureStack} />
        <Stack.Screen name="Task_managementStack" component={Task_managementStack} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
        <Stack.Screen name="LogIn" component={LogIn} />

      </Stack.Navigator>


  );
}

const HomeStack  = () =>{
  return (
    <NavigationContainer  independent={true}>
      <Drawer.Navigator
        drawerContent={props => <DrawerCustomize {...props}/> } drawerPosition={'left'}
        screenOptions={() => ({
          drawerStyle:{
            width:width-60},
          headerShown:true,
          overlayColor:"rgba(209,209,210,1)",
          headerTintColor:"#ff0000",
        })}>
        <Drawer.Screen  options={{headerShown: false}}  name="HomeStack" component={Home_Navigation} initialParams={Home_Navigation}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
