import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, TouchableOpacity, StatusBar, Image, Modal } from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import { LogOutModal } from "../component/LogOutModal";
import { DrawerActions } from "@react-navigation/native";
import normalize from "react-native-normalize/src/index";
import { Container, Content, Button } from "native-base";
import { removeDataStorage } from "../Get_Location";

const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes = require("../Photoes");
import LinearGradient from "react-native-linear-gradient";
import { readOnlineApi } from "../ReadPostApi";
import { Footer1 } from "../component/Footer";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home_meno({ navigation }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modules, setmodules] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Usermodules();
      getAllProjectInfo();
      getAllProjectInfo_dyb();
      Assigned_TaskList();
      My_TaskList();
      Task_category();
      getmapkey();

    });
    return unsubscribe;
  }, []);
  ///get Map key from AsyncStorage///
  const getmapkey = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.mapKey));
    GLOBAL.mapKeyValue = json;
  };
  ///get Modules List////
  const Usermodules = async () => {
    let Icon = "";
    let IconColor = "";
    let List_Modules = [];
    if(GLOBAL.isConnected===true) {
      readOnlineApi(Api.getModulesInfoMin + `roleId=${GLOBAL.UserInformation?.roleId}&moduleType=${GLOBAL.UserInformation?.MenuType
      }`).then(json => {
        json?.modules?.forEach((obj) => {
          if (obj.constModule_Id === 1 || obj.constModule_Id === "1") {
            Icon = Photoes.ProjectStructure;
            IconColor = ["#fdcdcd", "#fd8282", "#FF0000"];
          } else if (obj.constModule_Id === 4 || obj.constModule_Id === "4") {
            Icon = Photoes.Process;
            IconColor = ["#d7b2b2", "#715a5a", "#382e2e"];
            GLOBAL.Submodules = obj?.subModules;
          } else if (obj.constModule_Id === 2 || obj.constModule_Id === "2") {
            Icon = Photoes.DocumentManagement;
            IconColor = ["#8bc3f8", "#4a7fb3", "#1c3045"];
          } else if (obj.constModule_Id === 5 || obj.constModule_Id === "5") {
            Icon = Photoes.DocumentManagement;
            IconColor = ["#e3bfbf", "#927575", "#382e2e"];
          } else if (obj.constModule_Id === 6 || obj.constModule_Id === "6") {
            Icon = Photoes.CheckInOut;
            IconColor = ["#8bc3f8", "#4a7fb3", "#1c3045"];
          } else if (obj.constModule_Id === 6 || obj.constModule_Id === "3") {
            Icon = Photoes.DYB;
            IconColor = ["#fdcac0", "#ea9885", "#b14b33"];
          }
          List_Modules.push({
            constModule_Id: obj.constModule_Id,
            constModule_Name: obj.constModule_Name,
            Image: Image.resolveAssetSource(Icon).uri,
            IconColor: IconColor,
          });
        });
        if (List_Modules?.length !== 0)
          setmodules(List_Modules);
        else
          setmodules("");

        GLOBAL.modules = List_Modules;
        writeDataStorage(GLOBAL.Modules, List_Modules);
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Modules));
      if (json?.length !== 0)
        setmodules(List_Modules);
      else
        setmodules("");
      GLOBAL.modules = json;
    }
  };
  ///Write Data in AsyncStorage///
  const writeDataStorage = async (key, obj) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
    }
  };
  ///get Category List for Add Task///
  const Task_category = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_category + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.Task_Category, json);
      });
    }
  };
  //Get  Dyb===n Project Total List///
  const getAllProjectInfo = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getAllProjectInfo + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
      });
    }
  };
  ///Get Dyb===y Project Total List///
  const getAllProjectInfo_dyb = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getAllProjectInfo_dyb + `userId=${GLOBAL.UserInformation?.userId}&dyb=y`).then(json => {
        writeDataStorage(GLOBAL.AllProjectInfo_dyb, json?.projects);
      });
    }
  };
  ///get Technician task list///
  const Assigned_TaskList = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Assigned_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);
      });
    }
  };
  ///get user add task list///
  const My_TaskList = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.All_Task, json?.tasks);
      });
    }
  };
  ///onpress on modules///
  const Navigate_Between_Modules = (constModule_Id) => {
    if (constModule_Id === "1") {
        GLOBAL.TaskName = "";
        GLOBAL.route = "structure";
      Navigate_Url("Project_structureStack")

    } else if (constModule_Id === "4") {
      GLOBAL.TaskName = "";
      Navigate_Url("Task_managementStack")
    } else if (constModule_Id === "3") {
      GLOBAL.route = "DYB";
      GLOBAL.TaskName = "";
      Navigate_Url("Project_structureStack")
    }
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    Navigate_Url("LogIn")
  };
  return (
    <Container style={{backgroundColor:GLOBAL.backgroundColor}}>
      <StatusBar barStyle="light-content" backgroundColor={ GLOBAL.status_backgroundColor} />
      <View style={[Styles.HeaderStyleHome,{backgroundColor:GLOBAL.header_backgroundColor}]}>
        <View style={{ width: "2%" }} />
        <View style={{ width: "12%" }}>
          <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())} transparent style={[Styles.Backbtn]}>
            <AntDesign name={"menuunfold"} size={21} color={GLOBAL.headertext_backgroundColor} />
          </Button>
        </View>
        <View style={{ width: "72%" }}>
          <Text numberOfLines={1} style={[Styles.HeaderText4,{color:GLOBAL.headertext_backgroundColor}]}>Home</Text>
        </View>
        <View style={{ width: "12%" }} >
          <Image style={Styles.littleImage} source={Photoes.OkoutLogo} resizeMode={"stretch"}/>
        </View>
        <View style={{ width: "2%" }} />
      </View>
      <ImageBackground source={Photoes.Home_backgrung}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
        <Content contentContainerStyle={{ alignItems: "center", justifyContent: "center"}}>
          <View style={Styles.ViewAbsoluteHome} >
            <ImageBackground source={Photoes.Waves} tintColor={GLOBAL.header_backgroundColor}
                             style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center",height:120 }} resizeMode="stretch">
              <TouchableOpacity onPress={()=> Navigate_Url("VoiceSearch")} style={[Styles.VoiceCircle,{backgroundColor:GLOBAL.header_backgroundColor}]}>
                <MaterialIcons name={"keyboard-voice"} size={35} color={GLOBAL.headertext_backgroundColor}  />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          {showModalDelete &&
          <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
          }
          {modules !== "" ?
            <View style={Styles.FlexWrapHome2}>
              {modules?.map((value, key) => {
                return (
                  <LinearGradient colors={value.IconColor} key={key} style={Styles.ModuleBox}>
                    <TouchableOpacity onPress={() => Navigate_Between_Modules(value.constModule_Id)}
                                      style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                      <Image tintColor={"#fff"} resizeMode={"contain"} source={{ uri: value.Image }}
                             style={{ width: "45%", height: normalize(80) }} />
                      <Text style={Styles.txtMenuHome}>{value.constModule_Name}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                );
              })}
            </View> :
            <View style={Styles.With90CenterVertical3}>
              <Text style={Styles.EmptyText}>
                " Access Denied....Administrative Privileges may be required "
              </Text>
            </View>
          }
        </Content>
      </ImageBackground>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}  />
    </Container>
  );
}

export default Home_meno;
