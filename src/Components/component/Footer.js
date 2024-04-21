import {Text, View } from "react-native";
import { Styles } from "../Styles";
import { Button, FooterTab,Footer } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
import normalize from "react-native-normalize/src/index";
import { Colors } from "../Colors";
const GLOBAL = require("../Global");
function Footer1 ({onPressHome,onPressProfile,onPressdeleteAsync}){
  return (
    <Footer style={{
      backgroundColor: GLOBAL.OFFICIAL_background
    }}>
      <FooterTab style={Styles.FooterTab_Home}>
        <Button onPress={()=>onPressHome('ProfileStack')}>
          <AntDesign name="user" size={normalize(17)} color={Colors.button} />
          <Text style={Styles.Footertxt_Home}>Profile</Text>
        </Button>
        <View style={Styles.FooterFloatBtn_home1}>
          <View
            style={Styles.FooterFloatBtn_home}
          >
          <Button onPress={()=>onPressHome('Home')}>
            <AntDesign name="home" size={normalize(17)} color={Colors.withe} />
            <Text style={Styles.Footertxt}>Home</Text>
          </Button>
        </View>
        </View>
        <Button onPress={onPressdeleteAsync}>
          <AntDesign name="logout" size={normalize(17)} color={Colors.button} />
          <Text style={Styles.Footertxt_Home}>LogOut</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}
export { Footer1 };
