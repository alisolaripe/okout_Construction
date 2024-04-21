import {Text, TouchableOpacity,View} from "react-native";
import { Styles } from "../Styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
function Warningmessage ({Warning}){
  return (
    <View style={Styles.container}>
    <View style={Styles.WarningBox}>
      <View style={Styles.WarningBoxItems}/>
      <View style={Styles.WarningBoxItems2}>
        <TouchableOpacity  style={Styles.infocirlce}>
        <AntDesign name={"infocirlce"} size={18} color={'#f3b04e'} />
        </TouchableOpacity>
        <View style={Styles.WarningBoxItemsTestBox}>
      <Text style={Styles.WarningBoxItemsTest}>
        No access privileges
      </Text>
        </View>
        <TouchableOpacity onPress={Warning} style={Styles.closecircleo}>
          <AntDesign name={"close"} size={20} color={"#f3b04e"} />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}
export { Warningmessage };
