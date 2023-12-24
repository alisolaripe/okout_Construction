import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity, Image,BackHandler
} from "react-native";
import normalize from "react-native-normalize/src/index";
import { Styles } from "../Styles";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Body, Button, Container, Header, Left, Right,Content } from "native-base";
import { TextInputI } from "../component/TextInputI";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GLOBAL = require("../Global");
const Api = require("../Api");
const serialize = require("../GlobalSerialize");
import { isNetworkConnected } from "../GlobalConnected";
import { readOnlineApi } from "../ReadPostApi";
import { writeDataStorage } from "../Get_Location";
function LogIn({ navigation }) {
  const [verification, setVerification] = useState(null);
  const [value, setValue] = useState("");
  const [Cheked, setCheked] = useState(false);
  const [ErrorMs, setErrorMs] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Version,setVersionCheck] = useState('');
  const [ShowDate, setShowDate] = useState('');
  const [iconcheck, seticoncheck] = useState("user");
  const [Btn, setBtn] = useState(true);
  const { navigate } = useNavigation();
  useMemo(() => {
  }, [verification]);
  const GetOrgAppLink=async()=>{
    if(GLOBAL?.UserInformation!==''||GLOBAL?.UserInformation!==null){
      GLOBAL.BASE_URL_User={
        OrgAppKey:GLOBAL?.UserInformation?.OrgAppKey,
        OrgAppLink:JSON.parse( await AsyncStorage.getItem(GLOBAL.OrgAppLink))
      }
    }

  }

  useEffect( ()=>{
    GetOrgAppLink();

    const date=new Date() ;
    const Day=date.getDate();
    const Month=date.getMonth()+1;
    const Year=date.getFullYear();
    const Hour=date.getHours();
    const Minute=date.getMinutes()
    const Second=date.getSeconds()
    const Full=`${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
    setShowDate(Full)
    setVersionCheck('1.0.8')
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const writeDataStorage=async (key,obj)=>{
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
    }
    catch (e) {
    }

  }
  const handleBackButtonClick=()=>{
    BackHandler.exitApp()
  }
  const Usermodules = async () => {
    let Icon = "";
    let IconColor = "";
    let A = [];
      readOnlineApi(Api.getModulesInfoMin).then(json => {
        json?.modules?.forEach((obj) => {
          if (obj.constModule_Id === 1 || obj.constModule_Id === "1") {
            Icon = require("../../Picture/png/ProjectStructure.png");
            IconColor = ["#ffadad", "#f67070", "#FF0000"];
          } else if (obj.constModule_Id === 4 || obj.constModule_Id === "4") {
            Icon = require("../../Picture/png/Process.png");
            IconColor = ["#a39898", "#786b6b", "#382e2e"];
          } else if (obj.constModule_Id === 2 || obj.constModule_Id === "2") {
            Icon = require("../../Picture/png/DocumentManagement.png");
            IconColor = ["#79aad9", "#4e81b4", "#1f364e"];
          } else if (obj.constModule_Id === 5 || obj.constModule_Id === "5") {
            Icon = require("../../Picture/png/DocumentManagement.png");
            IconColor = ["#685858", "#4c3f3f", "#382e2e"];
          } else if (obj.constModule_Id === 6 || obj.constModule_Id === "6") {
            Icon = require("../../Picture/png/CheckInOut.png");
            IconColor = ["#4d78a5", "#375e89", "#27405c"];
          } else if (obj.constModule_Id === 6 || obj.constModule_Id === "3") {
            Icon = require("../../Picture/png/DYB.png");
            IconColor = ["#ffc2b5", "#fca795", "#d1583b"];
          }
          A.push({
            constModule_Id: obj.constModule_Id,
            constModule_Name: obj.constModule_Name,
            Image: Image.resolveAssetSource(Icon).uri,
            IconColor: IconColor,
          });
        });
        GLOBAL.modules=A;
        writeDataStorage(GLOBAL.Modules,A);
      });

  };
  const checkOrgCode = (value) => {
      var myHeaders = new Headers();
      const formData = new FormData();
      myHeaders.append("Content-Type", "application/json");
      formData.append("orgAppKey",value);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body:formData,
      };
      setValue(value);
      isNetworkConnected().then(status => {
        if (status) {
          fetch(GLOBAL.BASE_URL_first, requestOptions)
            .then(resp => {
              return resp.json();
            })
            .then(json => {
              setVerification(json.status);
              if (json.status === true)
              {
              seticoncheck('user-check')
                GLOBAL.BASE_URL_User = json;
                GLOBAL.OrgAppLink_value=json.OrgAppLink;
                Usermodules()
                writeDataStorage(GLOBAL.OrgAppLink,json?.OrgAppLink)
                readOnlineApi(Api.getCountry).then(json => {
                  writeDataStorage(GLOBAL.All_Country,json)
                });
                readOnlineApi(Api.getCity).then(json => {
                  writeDataStorage(GLOBAL.All_City,json)
                });
              }
              else {
                setErrorMs("invalid Organization App Key !");
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
              }
            })
            .catch(error => console.log("error", error));
        }
      })
  };
  const Login = (value) => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.BASE_URL_User.OrgAppLink +'api/ApiLogin/doLogin', {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: serialize({
            username: value.username,
            password: value.password,
            orgAppKey:GLOBAL.BASE_URL_User.OrgAppKey,
            IpAddress:GLOBAL.BASE_URL_User.OrgAppLink,
            dateTime: ShowDate,
          }),
        }) .then(resp => {
          setBtn(false)
          return resp.json();
        })
          .then(json => {
            console.log(json,'jsonjsonjson')
            if (json?.status===true) {
              GLOBAL.UserInformation=json;
              setBtn(true)
              navigate("Home");
              writeDataStorage(GLOBAL.UserInfo,json);
              writeDataStorage(GLOBAL.PASSWORD_KEY,json?.Password);
             }
               else
              {
                setBtn(true)
                setErrorMs(json.msg)
                setShowMessage(true)
                setTimeout(() => setShowMessage(false), 3000);
             }
          })
          .catch(error => console.log("errorwwww", error));
      }
    });
  };
  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };
  const Pinrecovery =()=> {
    navigation.navigate("ForgotPassword");
  };

  return (
    <Container style={[Styles.Backcolor]}>
      <Header style={Styles.HeaderBackColor}>
        <Left style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: "4%" }} />

        </Left>
        <Body style={{
          flex: 1, alignItems: "center",
        }}>
          <Text style={{
            color: "#fff",
            fontSize: normalize(23),
          }}>
            Log In
          </Text>
        </Body>
        <Right>
        </Right>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor={GLOBAL.OFFICIAL_background}/>
      <Content>
          <View style={style.container}>
            {ShowMessage === true ?
              <View style={Styles.flashMessage}>
                <View style={{ width: "10%" }} />
                <View style={{ width: "80%" }}>
                  <Text style={{
                    color: "white",
                    fontFamily: GLOBAL.FONT_FAMILY_BOLD,
                    textAlign:'center'
                  }}>
                    {ErrorMs}
                  </Text>
                </View>
                <TouchableOpacity onPress={()=> setShowMessage(false)} style={{ width: "10%" }}>
                  <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
                </TouchableOpacity>
                <View style={{ width: "10%" }} />
              </View>
              :
              null
            }
            <View style={[Styles.formContainer]}>
              <TextInputI onChangeText={(value)=>Login(value)}     numberValue={7}
                          ChangeChecked={(value)=>ChangeChecked(value)} Cheked={Cheked}
                          Pinrecovery={Pinrecovery}
                          iconcheck={iconcheck}
                          checkOrgCode={checkOrgCode}
                          Btn={Btn}
                          tittlebtn={'login'}/>
            </View>
          </View>


        <View style={[style.bottomView]}>
          <Text style={Styles.txtGrayLightColor}>
            CurrentVersion
          </Text>
          <Text style={Styles.txtGrayColor}>
            {Version}
          </Text>
        </View>
      </Content>

    </Container>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewExplain: {
    backgroundColor: 'red',
    borderRadius: normalize(6),
    paddingVertical: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  viewInput: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: normalize(10),
    padding: 12,
    marginBottom: 5,
    height: normalize(40),
    color: 'blue',
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    color: 'red',
    fontSize: normalize(13),
  },
  root: {
backgroundColor:'red',
    alignItems: "center",

  },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: {},
  cell: {
    width: normalize(65),
    height: normalize(57),
    lineHeight: 58,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: normalize(10),
    borderColor:'red',
    textAlign: "center",
    color: 'yellow',
  },
  focusCell: {
    borderColor: 'purple',
  },
  bottomView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
    , flexDirection: "row",marginTop:'auto'
  },
});
export default LogIn;
