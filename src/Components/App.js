import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupStack from "../Components/loginscreen/index";
import "react-native-gesture-handler";
import Homescreen  from './homescreen/index';
const GLOBAL =require("./Global");
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import Splash from "./splashscreen/index";
import {syncLocalStorageToServer} from "./syncLocalStorageToServer";
import Geocoder from "react-native-geocoder";
import { readOnlineApi } from "./ReadPostApi";
import { Image } from "react-native";
Geocoder.fallbackToGoogle('AIzaSyBv7qilelWW181590KkUizFqj4WcY2P1k0');
let userDetail=null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      timePassed: false,
      OrgAppKey_value:'',
      VersionCheck:'',
    }}
  getCurrentUser = async () =>{
    try{
      userDetail = await this.readDataStorage(GLOBAL.PASSWORD_KEY);
      GLOBAL.OrgAppLink_value = await this.readDataStorage(GLOBAL.OrgAppLink);
      GLOBAL.UserInformation=await this.readDataStorage(GLOBAL.UserInfo);
      GLOBAL.modules=JSON.parse (await AsyncStorage.getItem(GLOBAL.Modules))
      GLOBAL.PictureUrl=GLOBAL.UserInformation?.profileImg
      // this._interval = setInterval(() => {
      //
      //   clearInterval(this._interval);
      // }, 4115);
      this.setState({ timePassed: true });
       if(userDetail != null)
      {
        GLOBAL.PASSWORD_value=userDetail
      }
    }
    catch(error){
      alert('readWriteApi:getCurrentUser'+error);
    }
  }
  async readDataStorage(key) {
    try{
      let storeObj = await AsyncStorage.getItem(key);
      let obj = JSON.parse(storeObj);
      return obj;

    }
    catch(error){
    }
  };
  intervalFunction() {
    NetInfo.addEventListener(state => {
      GLOBAL.isConnected = state.isInternetReachable;
    });
  }
  check_MethodsList=async ()=> {
    //await  AsyncStorage.removeItem(GLOBAL.offline_data)
    GLOBAL.OrgAppLink_value =JSON.parse(await AsyncStorage.getItem(GLOBAL.OrgAppLink))
     if (GLOBAL.isConnected === true) {
       syncLocalStorageToServer()
     }
   }
    async componentDidMount() {
    this.getCurrentUser();
    this.check_MethodsList()
    this.intervalFunction();
    setInterval(() => {
      this.intervalFunction();
    }, 60000);
  }
  render() {
    if (this.state.timePassed === false) {
      return (
        <Splash/>
      );
    }
    else if (userDetail!==null&&this.state.timePassed === true) {
        return (
          <NavigationContainer>
            <Homescreen />
          </NavigationContainer>
        );
    }
    else  if (userDetail===null&&this.state.timePassed === true) {
      return (
        <NavigationContainer>
          <SignupStack/>
        </NavigationContainer>
      );
    }

  }
}
export default App;
