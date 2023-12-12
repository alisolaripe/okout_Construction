import {
  StatusBar, Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "../Styles";
import { Button, Container } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
function Header ({colors,Title,onPress,StatusColor}){
  return (
    <View>
      <StatusBar  barStyle="light-content" backgroundColor={StatusColor} />
      <LinearGradient colors={colors} style={Styles.HeaderItems}>
        <View style={{ width: "2%" }}/>
        <View style={{ width: "12%" }}>
          <Button onPress={onPress} transparent style={Styles.Backbtn}>
            <AntDesign name={"arrowleft"} size={21} color={'#fff'} />
          </Button>
        </View>
        <View style={{ width: "76%" }}>
          <Text numberOfLines={1} style={[Styles.HeaderText,]}>{Title}</Text>
        </View>
        <View style={{ width: "10%" }} />
      </LinearGradient>
      <View style={Styles.ViewAbsolute}/>
    </View>
  )
}
export { Header };
