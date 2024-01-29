import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground, TouchableOpacity, StatusBar, Image, Platform, PermissionsAndroid, Modal,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import { DrawerActions } from '@react-navigation/native';
import normalize from "react-native-normalize/src/index";
import { Container, Content, Body, Left, Right, Header, Button, FooterTab } from "native-base";
import {writeDataStorage,removeDataStorage} from "../Get_Location";
const GLOBAL = require("../Global");
const Api = require("../Api");
import LinearGradient from "react-native-linear-gradient";
import { readOnlineApi } from "../ReadPostApi";
import { Footer1 } from "../component/Footer";
import {Warningmessage} from '../component/Warningmessage'
import {UserPermission} from '../CheckPermission'
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Home_meno({ navigation }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  useEffect(() => {
    console.log(GLOBAL.isConnected,'GLOBAL.isConnected')
    getAllProjectInfo();
    getAllProjectInfo_dyb();
    Assigned_TaskList();
    My_TaskList();
    Task_category();
    getUserPermissions()
  }, []);
  const getUserPermissions =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getUserPermissions+`userRoleId=1`).then(json => {
        console.log(json,'json')
        GLOBAL.UserPermissionsList=json?.menu_privileges
        writeDataStorage(GLOBAL.UserPermissions,json);
      });
    }
    else {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.UserPermissions))
      console.log(json,'json')
      GLOBAL.UserPermissionsList=json?.menu_privileges
    }
  };
  const  writeDataStorage=async(key,obj)=>{
    try {
      await AsyncStorage.setItem(key,JSON.stringify(obj));
    }
    catch (e) {
    }
  }
  const Task_category =async () => {
    if(GLOBAL.isConnected===true) {
      readOnlineApi(Api.Task_category+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.Task_Category,json)
      })
    }
  };
  const getAllProjectInfo = async () => {
    if (GLOBAL.isConnected === true){
      readOnlineApi(Api.getAllProjectInfo+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
      });
    }
  };
  const getAllProjectInfo_dyb = async () => {
    if (GLOBAL.isConnected === true){
      readOnlineApi(Api.getAllProjectInfo_dyb+`userId=${GLOBAL.UserInformation?.userId}&dyb=y`).then(json => {
        writeDataStorage(GLOBAL.AllProjectInfo_dyb, json?.projects);
      });
    }
  };
  const Assigned_TaskList =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Assigned_TaskList+`userId=1`).then(json => {
        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);
      });
    }
  };
  const My_TaskList =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList+`userId=1`).then(json => {
        console.log(json?.tasks,'json?.tasks')
        writeDataStorage(GLOBAL.All_Task,json?.tasks)
      });
    }
  };
  const Navigate_Between_Modules = (constModule_Id) => {
    if (constModule_Id === "1") {
      UserPermission(GLOBAL.UserPermissionsList?.Project).then(res =>{
        if(res.view==='1') {
          GLOBAL.route = "structure";
          navigation.navigate("Project_structureStack");
        }
        else {
          setshowWarning(true)
        }
      })
    } else if (constModule_Id === "4") {
      UserPermission(GLOBAL.UserPermissionsList?.Task).then(res =>{
        if(res.view==='1') {
          navigation.navigate("Task_managementStack");
        }
        else {
          setshowWarning(true)
        }
      })
    } else if (constModule_Id === "3") {
      UserPermission(GLOBAL.UserPermissionsList?.DYB).then(res =>{
        if(res.view==='1') {
          GLOBAL.route='DYB'
          navigation.navigate("Project_structureStack",{ screenMode:'Dyb'});
        }
        else {
          setshowWarning(true)
        }
      })
    }
  };
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
                 source={require("../../Picture/png/AlertImage.png")}
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
    return (
    <Container style={[Styles.Backcolor]}>
      <Header style={Styles.HeaderStyle}>
          <Left style={{flex:1,}} >
            <Button onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} transparent style={Styles.menubtn}>
              <AntDesign name={"menuunfold"} size={21} color={'#fff'} />
            </Button>
          </Left>
        <Body style={{flex: 1,alignItems:"center"}}>
          <Text numberOfLines={1} style={Styles.HeaderText2}>Home</Text>
        </Body>
        <Right style={{flex:1}}/>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ImageBackground source={require("../../Picture/png/HomeBack.png")}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
        <Content>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          {showWarning===true&&  <Warningmessage/>}
          <View style={Styles.container}>
            <View style={Styles.FlexWrapHome}>
              {
                GLOBAL.modules?.map((value, key) => {
                  return (
                    <LinearGradient colors={value.IconColor} key={key} style={Styles.ModuleBox}>
                      <TouchableOpacity onPress={() => Navigate_Between_Modules(value.constModule_Id)} style={{
                        width: "100%", alignItems: "center",
                      }}>
                        <Image tintColor={"#fff"} resizeMode={"contain"} source={{ uri: value.Image }}
                               style={{ width: "45%", height: normalize(80) }}
                        />
                        <Text style={Styles.txtMenuHome}>{value.constModule_Name}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  );
                })
              }
            </View>
          </View>
        </Content>
      </ImageBackground>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Home_meno;
