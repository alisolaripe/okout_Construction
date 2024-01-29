import {
  StatusBar, Text, TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "../Styles";
import { Button, Content } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
function Warningmessage ({colors,Title,onPress,StatusColor}){
  return (
    <View style={Styles.container}>
    <View style={Styles.WarningBox}>
      <View style={Styles.WarningBoxItems}/>
      <View style={Styles.WarningBoxItems2}>
        <View style={Styles.infocirlce}>
        <AntDesign name={"infocirlce"} size={18} color={'#f3b04e'} />
        </View>
        <View style={Styles.WarningBoxItemsTestBox}>
      <Text style={Styles.WarningBoxItemsTest}>
        No access privileges
      </Text>
        </View>
        <View style={Styles.closecircleo}>
          <AntDesign name={"close"} size={20} color={"#f3b04e"} />
        </View>
      </View>
    </View>
    </View>
  )
}
export { Warningmessage };
