import { Styles } from "../Styles";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

function FloatAddBtn ({onPress}){
return(
  <LinearGradient colors={['#ffadad','#f67070','#FF0000']} style={[Styles.FloatBtn]}>
    <TouchableOpacity transparent onPress={()=> {
      onPress();

    }}>
      <AntDesign name="plus" size={25} color="#fff" />
    </TouchableOpacity>
  </LinearGradient>
)
}
export { FloatAddBtn };
