import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";
function ButtonI({ onpress, style, styleTxt, title, categoriIcon, nameIcon, sizeIcon, colorIcon,colorsArray }) {
  if (categoriIcon === "FontAwesome") {
    return (
      <LinearGradient colors={colorsArray} style={style}>

        <TouchableOpacity style={{width:'100%',alignItems:'center'}}
                          onPress={onpress}
        >
          <Text style={[styleTxt, {paddingVertical:8}]}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  else if (categoriIcon === "FontAwesome5") {
    return (
      <TouchableOpacity
        onPress={onpress}
        style={style}>
        <Text style={[styleTxt, {}]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  else if (categoriIcon === "AntDesign") {
    return (
      <TouchableOpacity
        onPress={onpress}
        style={style}>
        <AntDesign name={nameIcon} size={sizeIcon} color={colorIcon} />
        <Text style={[styleTxt, {}]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  else if (categoriIcon === "Nopadding") {
    return (
      <LinearGradient colors={colorsArray} style={style}>

        <TouchableOpacity style={{width:'100%',alignItems:'center'}}
                          onPress={onpress}
        >
          <Text style={[styleTxt, {paddingVertical:5}]}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  else if (categoriIcon==="") {
    return (
      <LinearGradient colors={colorsArray} style={style}>

        <TouchableOpacity style={{width:'100%',alignItems:'center'}}
                          onPress={onpress}
        >
          <Text style={[styleTxt, {paddingVertical:8}]}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  else if (categoriIcon === "Disable") {
    return (
      <View
        style={style}>
        <MaterialCommunityIcons name={nameIcon} size={sizeIcon} color={colorIcon} />
        <Text style={[styleTxt, {}]}>{title}</Text>
      </View>
    );
  }
}
export { ButtonI };
