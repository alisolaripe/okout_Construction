import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Drawer from './Drawer';
import ProfileStack from '../profilescreen/index'
import { NavigationContainer } from "@react-navigation/native";
function DrawerCustomizeStack() {
  return (
     <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false, gesturesEnabled: false,
      }}>
      <Stack.Screen name="Drawer" component={Drawer} initialRouteName={Drawer} />
     <Stack.Screen name="ProfileStack" component={ProfileStack}/>
    </Stack.Navigator>
     </NavigationContainer>
  );
}

export default DrawerCustomizeStack;
