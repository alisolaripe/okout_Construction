import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Colors } from "../Colors";
import Entypo from "react-native-vector-icons/Entypo";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import * as React from "react";
import { useState } from "react";
function DrawerCustomize(props) {
  const [Focuseditem1, setFocuseditem1] = useState(true);
  const [Focuseditem2, setFocuseditem2] = useState(false);
  const [Focuseditem3, setFocuseditem3] = useState(false);
  const [Focuseditem4, setFocuseditem4] = useState(false);
  const [Focuseditem5, setFocuseditem5] = useState(false);
  const [Focuseditem6, setFocuseditem6] = useState(false);
  const [Focuseditem7, setFocuseditem7] = useState(false);
  const [Focuseditem8, setFocuseditem8] = useState(false);
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors.background }}>
      <View style={styles.menuContainer}>

        <View style={[styles.viewHeaderMeno]}>
          <View style={[{ width:'93%',alignItems:'flex-start',paddingVertical:normalize(18)}]}>
            <Image resizeMode={'contain'} source={require("../../Picture/png/OkoutLogo.png")}
                   style={[Styles.littleImage]}
            />
          </View>

          <View style={[styles.viewHeaderTitle, {width:'91%',alignItems:'flex-start',paddingBottom:normalize(18)}]}>
            <Text style={[Styles.txt, { fontWeight: "bold" }]}>Ali Karami</Text>
            <Text style={[Styles.txt, { fontSize: normalize(14) }]}>With  since Nov 2022</Text>
          </View>
        </View>





        <TouchableOpacity
          onPress={() => {
            setFocuseditem1(true);
            setFocuseditem2(false);
            setFocuseditem3(false);
            setFocuseditem4(false);
            setFocuseditem5(false);
            setFocuseditem6(false);
            setFocuseditem7(false);
            setFocuseditem8(false);
            props.navigation.navigate("ProfileStack");
          }}
          style={[styles.circleContainer, { backgroundColor: Focuseditem1 === true ? Colors.borderButton : Colors.background,marginTop:15}]}>
          <Entypo name={"user"} size={18} color={Colors.withe} />
          <Text style={[Styles.txt, { margin: normalize(10) }]}>Profile</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    setFocuseditem1(false);*/}
        {/*    setFocuseditem2(true);*/}
        {/*    setFocuseditem3(false);*/}
        {/*    setFocuseditem4(false);*/}
        {/*    setFocuseditem5(false);*/}
        {/*    setFocuseditem6(false);*/}
        {/*    setFocuseditem7(false);*/}
        {/*    setFocuseditem8(false);*/}
        {/*    // props.navigation.navigate('meno_index');*/}
        {/*  }}*/}
        {/*  style={[styles.circleContainer, {*/}
        {/*    marginTop: normalize(20),*/}
        {/*    backgroundColor: Focuseditem2 === true ? Colors.borderButton : Colors.background,*/}
        {/*  }]}>*/}
        {/*  <Entypo name={"home"} size={18} color={Colors.withe} />*/}
        {/*  <Text style={[Styles.txt, { margin: normalize(8) }]}>Gallery</Text>*/}
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

    alignItems: "center",
    width:'100%'
  },
  viewHeaderTitle: {
    justifyContent: "center",
  },
});
export default DrawerCustomize;
