import { Button, Container, Content } from "native-base";
import { Styles } from "../Styles";
import { Image, Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../Colors";
import { Warningmessage } from "../component/Warningmessage";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { Footer1 } from "../component/Footer";
import React, { useState } from "react";
import { UserPermission } from "../CheckPermission";
import { removeDataStorage } from "../Get_Location";
const GLOBAL = require("../Global");
const Photoes=require('../Photoes')
function Doshboardscreen({ navigation }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [doshboardlist, setdoshboardlist] = useState([{constModule_Id:0,constModule_Name:'Customer',Icon:require("../../Picture/png/customer.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Id:1,constModule_Name:'Pos',Icon:require("../../Picture/png/shop.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Name:'Sales',Icon:require("../../Picture/png/sales.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Name:'Invoice',Icon:require("../../Picture/png/invoice.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Name:'Move In',Icon:require("../../Picture/png/movin.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Name:'move Out',Icon:require("../../Picture/png/moveout.png"),IconColor:['#BCE7FC','#38AECC','#022F40']}
  ]);
  const Navigate_Url= (Url) => {
    if(Url==='ProfileStack') {
      UserPermission(GLOBAL.UserPermissionsList?.Profile).then(res => {
        if (res.view === "1") {
          navigation.navigate(Url);
        } else {
          setshowWarning(true);
        }
      });
    }
    else
      navigation.navigate(Url);
  };
  const logout_Url= () => {
    setshowModalDelete(true)
  };
  const _showModalDelete = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDelete}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDelete( false)}
          transparent={true}
        >
          {renderModalContent()}
        </Modal>
      </View>
    );
  };
  const renderModalContent = () => (
    <View style={Styles.DeleteModalTotalStyle}>
      <View style={Styles.DeleteModalStyle2}>

        <View style={Styles.With100NoFlex}>
          <Image style={{width:'27%',aspectRatio:1,marginVertical:normalize(10)}}
                 source={Photoes.Alert}
                 resizeMode="contain" />
          <View style={Styles.With100NoFlex}>
            <Text style={Styles.txt_left2}>
              Do you want to Log Out from App?
            </Text>
          </View>
        </View>

        <View style={Styles.With100Row}>
          <LinearGradient  colors={['#9ab3fd','#82a2ff','#4B75FCFF']} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => setshowModalDelete( false)} >
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient   colors={['#ffadad','#f67070','#FF0000']} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              removeDataStorage(GLOBAL.PASSWORD_KEY)
              setshowModalDelete(false)
              navigation.navigate('LogIn');
            }} >
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
  const Navigate_Between_Modules=(constModule_Id)=>{
    if(constModule_Id===0)
      navigation.navigate('CustomerStack');
    else if(constModule_Id===1)
      navigation.navigate('PosStack');


  }
  return (
    <Container style={[Styles.BackcolorHome]}>
      <StatusBar barStyle="light-content" backgroundColor={'#fff'} />
      <View style={Styles.HeaderStyleHome1}>
        <View  style={Styles.HeaderStyleHome}>
          <View style={{ width: "2%" }}/>
          <View style={{ width: "12%" }}>
            <Button onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} transparent style={Styles.Backbtn}>
              <AntDesign name={"arrowleft"} size={21} color={Colors.button} />
            </Button>
          </View>
          <View style={{ width: "76%" }}>
            <Text numberOfLines={1} style={[Styles.HeaderText45,]}>Doshboard</Text>
          </View>
          <View style={{ width: "10%" }} />

        </View>
        <View style={Styles.ViewAbsolutedoshboard}>
          <Text style={Styles.DoshbordAmonttext}>Total Amount:101010</Text>
        </View>
      </View>
        <Content contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          {showWarning===true&&  <Warningmessage/>}
          <View style={Styles.FlexWrapHome2}>
            {
              doshboardlist?.map((value, key) => {
                return (
                  <View  key={key} style={Styles.ModuleBox2}>
                    <TouchableOpacity onPress={() => Navigate_Between_Modules(value.constModule_Id)} style={{
                      width:"100%",alignItems:"center",justifyContent:'center'
                    }}>
                      <Image resizeMode={"contain"} source={value.Icon}
                             style={{width:"45%",height:normalize(65),marginTop:normalize(10)}}/>
                      <Text style={Styles.txtMenuHome23}>{value.constModule_Name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </View>
        </Content>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Doshboardscreen;

