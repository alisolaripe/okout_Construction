
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image, Animated, StatusBar, ImageBackground, TouchableOpacity,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize";
import { Colors } from "../Colors";
const Photoes=require('../Photoes');
const GLOBAL = require("../Global");
const Api = require("../Api");
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Body, Button, Container, Content, Footer, FooterTab, Header, Left, Right } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { Footer1 } from "../component/Footer";
import { LogOutModal } from "../component/LogOutModal";
import { removeDataStorage } from "../Get_Location";
import AsyncStorage from "@react-native-async-storage/async-storage";
function ThemChange({ navigation,navigation: { goBack }  }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [select, setselect] = useState(0);
  const [selectcolor, setselectcolor] = useState('');
  const [coloroptions,setcoloroptions] = useState([
    {id:0,name1:'#f6f9f9',name2:'#fff',textcolor:'#4a6e8e',taskstructurelist:["#6598cd", "#5082ba", "#4a6e8e"]},
    {id:1,name1:'#fff',name2:'#4a6e8e',textcolor:'#fff',
      taskstructurelist:["#f6f9f9", "#b8b8b8", "#8b8b8b"]}
  ,{id:3,name1:'#fff',name2:'#67C6E3',textcolor:'#fff',taskstructurelist:["#6598cd", "#5082ba", "#4a6e8e"]},
    {id:4,name1:'#fff',name2:'#000fff',textcolor:'#fff',taskstructurelist:["#6598cd", "#5082ba", "#4a6e8e"]}
    ,{id:5,name1:'#fff',name2:'#92C7CF',textcolor:'#fff',taskstructurelist:["#6598cd", "#5082ba", "#4a6e8e"]}
  ]);
  const { navigate} = useNavigation();
  useEffect(()=>{

  }, []);
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Colorselect=(value)=>{
    setselectcolor(value)
    setselect(value.id);
    GLOBAL.backgroundColor=value.name1;
    GLOBAL.header_backgroundColor=value.name2;
    GLOBAL.headertext_backgroundColor=value.textcolor;
    GLOBAL.status_backgroundColor=value.name2;
    GLOBAL.footer_backgroundColor=value.name2;
    GLOBAL.footertext_backgroundColor=value.textcolor;
    GLOBAL.filter_backgroundColor=value.textcolor;
    GLOBAL.input_titleColor=value.textcolor;
    GLOBAL.input_textColor=value.textcolor;
    GLOBAL.input_borderColor=value.textcolor;
    GLOBAL.task_structurelistbackgroundColor=value.taskstructurelist
  };
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    Navigate_Url("LogIn")
  };
  const Applytheme=async ()=>{
    writeDataStorage(GLOBAL.Theme_Color,selectcolor)
  }
  const writeDataStorage=async (key,obj)=>{
    try {
      await AsyncStorage.setItem(key,JSON.stringify(obj));
    }
    catch (e) {
    }
  }
  return (
    <Container style={[Styles.BackcolorHome]}>
      <Header  style={Styles.HeaderStyle2}>
        <Left style={{
          flex: 0.5,
        }}>
          <Button onPress={() => {
            // navigation.navigate('Home');
            goBack()
            GLOBAL.backgroundColor='#f6f9f9'
          }} transparent style={[Styles.Backbtn,{justifyContent:'flex-start'}]}>
            <AntDesign name={"arrowleft"} size={21} color={Colors.button} />
          </Button>
        </Left>
        <Body style={{
          flex: 1,alignItems:"center"
        }}>
          <Text numberOfLines={1} style={Styles.HeaderText2}>Them Change</Text>
        </Body>
        <Right style={{
          flex: 0.5,
        }}>
        </Right>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Light} />
      <Content contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
         <View style={Styles.themBox}>
           {showModalDelete &&
           <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
           }
           <View style={[Styles.themBoxItems,{backgroundColor:GLOBAL.backgroundColor}]}>
             <View style={[Styles.statuscolor,{backgroundColor: GLOBAL.header_backgroundColor}]}/>
             <View style={[Styles.HeaderStyleHome,{backgroundColor:GLOBAL.header_backgroundColor}]}>
               <View style={{ width: "2%" }} />
               <View style={{ width: "12%" }}>
                 <Button  transparent style={Styles.Backbtn}>
                   <AntDesign name={"menuunfold"} size={17} color={GLOBAL.headertext_backgroundColor} />
                 </Button>
               </View>
               <View style={{ width: "72%",justifyContent:'center' }}>
                 <Text numberOfLines={1} style={[Styles.HeaderTexttheme,{color:GLOBAL.headertext_backgroundColor}]}>Home</Text>
               </View>
               <View style={{ width: "12%",justifyContent:'center' }} >
                 <Image style={Styles.littleImagetheme} source={Photoes.OkoutLogo} resizeMode={"stretch"}/>
               </View>
               <View style={{ width: "2%" }} />
             </View>

             <ImageBackground source={Photoes.Home_backgrung}
                              style={{ width: "100%", flex: 1, alignItems: "center",
                                justifyContent: "center", }} resizeMode="stretch">
             <View style={Styles.ViewAbsoluteHome} >
               <ImageBackground source={Photoes.Waves} tintColor={GLOBAL.header_backgroundColor}
                                style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center",height:39 }} resizeMode="stretch">
                 <View style={[Styles.VoiceCircletheme,{backgroundColor:GLOBAL.header_backgroundColor}]}>
                   <MaterialIcons name={"keyboard-voice"} size={22} color={GLOBAL.headertext_backgroundColor} />
                 </View>
               </ImageBackground>
             </View>
             <View style={Styles.FlexWrapHome2}>
               {GLOBAL.modules?.map((value, key) => {
                 return (
                   <LinearGradient colors={value.IconColor} key={key} style={Styles.ModuleBoxthem}>
                     <View
                                       style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                       <Image tintColor={"#fff"} resizeMode={"contain"} source={{ uri: value.Image }}
                              style={{ width: "25%", height: normalize(40) }} />
                       <Text style={Styles.txtMenuHomethem}>{value.constModule_Name}</Text>
                     </View>
                   </LinearGradient>
                 );
               })}
             </View>
             </ImageBackground>
             <View style={{
              width:'100%',marginTop:normalize(15)
             }}>
               <View style={[Styles.FooterTab_Home_theme,{ backgroundColor: GLOBAL.header_backgroundColor}]}>
                 <View style={Styles.FooterTab_theme} >
                   <AntDesign name="user" size={normalize(14)} color={GLOBAL.headertext_backgroundColor} />
                   <Text style={[Styles.Footertxt_Home_theme,{color: GLOBAL.headertext_backgroundColor}]}>Profile</Text>
                 </View>
                 <View style={Styles.FooterFloatBtn_homeTheme}>
                   <View
                     style={[Styles.FooterFloatBtn_homeTheme1,{backgroundColor:GLOBAL.headertext_backgroundColor}]}
                   >
                       <AntDesign name="home" size={normalize(14)} color={GLOBAL.header_backgroundColor} />
                       <Text style={[Styles.Footertxt4,{color:GLOBAL.header_backgroundColor}]}>Home</Text>
                   </View>
                 </View>
                 <View style={Styles.FooterTab_theme} >
                   <AntDesign name="logout" size={normalize(14)} color={GLOBAL.headertext_backgroundColor} />
                   <Text style={[Styles.Footertxt_Home_theme, { color: GLOBAL.headertext_backgroundColor }]}>LogOut</Text>
                 </View>
               </View>
             </View>
           </View>
           <View style={Styles.With95Rowthemw}>
             <TouchableOpacity style={Styles.btnModalFilter1} onPress={() => {
               GLOBAL.backgroundColor='#f6f9f9';
               GLOBAL.headertext_backgroundColor='#4a6e8e'
               GLOBAL.header_backgroundColor='#fff'
               setselect()
             }}>
               <Text style={[Styles.txt_CenterModalFilter]}> Reset</Text>
             </TouchableOpacity>
             <TouchableOpacity  style={Styles.btnModalFilter1} onPress={() => {
              Applytheme()
             }}>
               <Text style={[Styles.txt_CenterModalFilter]}> Apply</Text>
             </TouchableOpacity>
           </View>
           <View style={Styles.colorList}>
             {coloroptions?.map((value, key) => {
               return (
<TouchableOpacity onPress={()=>Colorselect(value)} key={key} style={Styles.colorListitems}>
  {select===value.id&&   <MaterialIcons name={"check-circle"} size={35} color={Colors.green} style={Styles.Floatcheck} />}
  <View style={Styles.colorListitems_box}>
    <View style={[Styles.colorListitems_box1,{backgroundColor:value.name2}]}/>
      <View style={Styles.colorListitems_boxtext}>
        <Text style={Styles.colorListitems_text}>{value.name2}</Text>
      </View>
  </View>
  <View style={[Styles.colorListitems_box]}>
    <View style={[Styles.colorListitems_box1,{backgroundColor:value.name1}]}/>
    <View style={Styles.colorListitems_boxtext}>
      <Text style={Styles.colorListitems_text}>{value.name1}</Text>
    </View>
  </View>
</TouchableOpacity>
               );
             })}
           </View>
         </View>

      </Content>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />

    </Container>
  );
}

export  default ThemChange;
