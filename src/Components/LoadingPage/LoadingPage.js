
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image, Animated, StatusBar,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize";
import { Colors } from "../Colors";
const GLOBAL = require("../Global");
const Api = require("../Api");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Read } from "../writeOnlineApi";
import { useNavigation } from "@react-navigation/native";
 function LoadingPage({ navigation }) {
   const [fadeAnim,setfadeAnim] = useState(new Animated.Value(0));
   const { navigate} = useNavigation();
   useEffect(()=>{
     BackOnline()
     Animated.timing(
       fadeAnim,// The animated value to drive
       {
         toValue: 1,// Animate to opacity: 1 (opaque)
         duration: 2500,// 2000ms
         useNativeDriver: true,
       },
     ).start();
   }, []);
  const BackOnline=async ()=>{
     let get_MethodsList =JSON.parse( await AsyncStorage.getItem(GLOBAL.offline_data));
       let obj2=''
       let obj3=''
       let i = 0;
       let id=0;
       for (; i < get_MethodsList?.length;) {
         let obj = get_MethodsList[i];
         if(obj.type==='POST') {
           if(obj.Url!==Api.AddBuildNotes){

             obj2 = obj?.formdata._parts;
             id = obj2.id;
             var formdata = new FormData();
             for (let j = 0; j < obj2?.length; j++) {
               obj3 = obj2[j];
               formdata.append(obj3?.[0], obj3?.[1]);
             }
             Read(obj.type, obj.Url, formdata).then(json => {
               if(json)
               {
               }
             })
           }
           else {

             if(obj?.ImageSourceviewarrayUpload){
               var formData = new FormData();
               obj2 = obj?.formdata._parts;
               id = obj2.id;
               for (let j = 0; j < obj2?.length;j++) {
                 obj3 = obj2[j];
                 if(obj3?.[0]!=='attachment'&&obj3?.[0]!=='postDate')
                   formData.append(obj3?.[0], obj3?.[1]);
               }

               for (let i = 0; i < obj?.ImageSourceviewarrayUpload?.length; i++) {
                 let idsArray = obj?.ImageSourceviewarrayUpload[i];
                 formData.append("attachment", {
                   uri:idsArray.uri,
                   type:idsArray.type,
                   name:idsArray.fileName,
                 });
                 formData.append("postDate", idsArray.Date);
                 Read("POST", Api.AddBuildNotes, formData).then(json => {

                 });
               }
             }
           else {
               var formdata = new FormData();
               obj2 = obj?.formdata._parts;
               id = obj2.id;
               for (let j = 0; j < obj2?.length; j++) {
                 obj3 = obj2[j];
                 formdata.append(obj3?.[0], obj3?.[1]);
               }

               fetch(GLOBAL.OrgAppLink_value +obj.Url, {
                 method: "POST",
                 headers: {
                   "Content-Type": "multipart/form-data",
                 },
                 body: formdata,
               })
                 .then(resp => {

                   if (resp.status === 201) {
                   }
                   return resp.txt();
                 })
                 .then(txt => {
                   console.log(txt, "txttxt");
                 })
                 .catch(error => console.log("errorwwww", error));
             }

           }
         }
         else {
           let index = get_MethodsList.findIndex((p) => p.id === id);
           let markers = [...get_MethodsList];
           markers.splice(index, 1);
           setoffline_data(markers);
         }

i++;
       }
       console.log(get_MethodsList?.length,i,'length')
    if(i===parseInt(get_MethodsList?.length)){
      console.log('navigate')
      await AsyncStorage.removeItem(GLOBAL.offline_data)
      const timerId = setInterval(() => {
        navigate('Home')
      }, 20000)
      return () => clearInterval(timerId);

    }

   }
   const setoffline_data=async (markers)=>{
     await AsyncStorage.setItem(GLOBAL.offline_data, JSON.stringify(markers));
   }
   return (
    <View style={Styles.containerloadingpage}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={{ justifyContent: "flex-end" ,width:'100%',alignItems:'center',flex:0.6,}}>
        <Animated.View style={[ {  opacity: fadeAnim}]}>
          <Image  resizeMode={"contain"} source={require("../../Picture/png/OkoutLogo.png")}
                  style={{width:normalize(180),height:normalize(180)}}
          />
        </Animated.View>

      </View>
      <Text style={Styles.HeaderText2}>
       Please waite
      </Text>
      <Text style={Styles.HeaderText2}>
      Loading ...
      </Text>
    </View>
  );
}

export  default LoadingPage;
