import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Colors } from "../Colors";
import Entypo from "react-native-vector-icons/Entypo";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import * as React from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Container, Content } from "native-base";
const Photoes=require('../Photoes');
const GLOBAL = require("../Global");
function DrawerCustomize(props) {
  useEffect( () => {

  },[]);
  const [PictureUrl,setPictureUrl] = useState(null);
  const Navigate_Between_Modules = (constModule_Id) => {
    if (constModule_Id === "1") {
      GLOBAL.TaskName = "";
      GLOBAL.route = "structure";
      props.navigation.navigate("Project_structureStack");
    } else if (constModule_Id === "4") {
      props.navigation.navigate("Task_managementStack");
      GLOBAL.TaskName = "";
    } else if (constModule_Id === "3") {
      GLOBAL.route = "DYB";
      GLOBAL.TaskName = "";
      props.navigation.navigate("Project_structureStack", { screenMode: "Dyb" });
    }
  };
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: GLOBAL.backgroundColor }}>
      <View style={styles.menuContainer}>
        <View style={[styles.viewHeaderMeno]}>
          <ImageBackground source={Photoes.abstract}
                           style={{ width: "100%", flex: 1,alignItems:'center'  }} resizeMode="stretch">
          <TouchableOpacity onPress={()=>  props.navigation.navigate('ProfileStack')} style={Styles.ViewAbsoluteDrawer}>
            {  GLOBAL.PictureUrl === null ?
                <EvilIcons name={"user"} size={130} color={Colors.Light} />:
                <Image style={Styles.imageProfileDrawer} source={{uri:GLOBAL.PictureUrl}}/>
            }
            <Text style={[Styles.txtMenu,{ margin: normalize(10) }]}>{GLOBAL.UserInformation?.Email}</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
        { GLOBAL.modules?.map((value, key) => {
          return (
        <TouchableOpacity key={key}  onPress={() => Navigate_Between_Modules(value.constModule_Id)}
          style={[styles.circleContainer, {marginTop:15}]}>
          <Image tintColor={GLOBAL.headertext_backgroundColor} resizeMode={"contain"} source={{ uri: value.Image }}
                 style={{ width: "27%", height: normalize(40) }} />
          <Text style={[Styles.txtMenu,{ margin: normalize(8),color: GLOBAL.headertext_backgroundColor }]}>{value.constModule_Name}</Text>
        </TouchableOpacity>
        );
        })}
        {/*<TouchableOpacity   onPress={() =>     props.navigation.navigate("ThemChangeStack")}*/}
        {/*                  style={[styles.circleContainer, {marginTop:15}]}>*/}
        {/*  <Ionicons name={"color-palette-outline"} size={27} color={GLOBAL.headertext_backgroundColor} />*/}
        {/*  <Text style={[Styles.txtMenu,{ margin: normalize(8),marginLeft:normalize(19),color:GLOBAL.headertext_backgroundColor }]}>colour them</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: 'space-evenly',

  },
  menuItemsCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  circleContainer: {

    borderRadius: normalize(10),
    width: '60%',alignItems:'center' ,
    // marginTop:normalize(10),
    marginLeft: normalize(15),
    padding: normalize(5),
    flexDirection: "row",
  },
  viewHeaderMeno: {
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
  },
  viewHeaderTitle: {
    justifyContent: "center",
  },
});
export default DrawerCustomize;
