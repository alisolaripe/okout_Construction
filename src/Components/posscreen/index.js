import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import PosScreen from "./PosScreen";
import InvoiceScreen from './InvoiceScreen';
import OrderDetails from './OrderDetails'
function PosStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen  name="PosScreen"      component={PosScreen} initialRouteName={PosScreen}/>
      <Stack.Screen  name="InvoiceScreen"      component={InvoiceScreen} />
      <Stack.Screen  name="OrderDetails"      component={OrderDetails} />
    </Stack.Navigator>

  );
}
export default PosStack;
