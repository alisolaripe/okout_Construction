
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image, StyleSheet, StatusBar, ImageBackground, TouchableOpacity,
} from "react-native";
import {Easing} from 'react-native-reanimated'
 import { Styles } from "../Styles";
import { Colors } from "../Colors";
const GLOBAL = require("../Global");
const Api = require("../Api");
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Button, Container, Content } from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { MotiView } from 'moti';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import normalize from "react-native-normalize/src/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeDataStorage } from "../Get_Location";
import { LogOutModal } from "../component/LogOutModal";
function Voice_Search({navigation,navigation: { goBack } }) {
  const { navigate} = useNavigation();
  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [message, setmessage] = useState('');
  const [ShowMessage, setShowMessage] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  useEffect( ()=>{
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechStart = (e) => {
    setStarted('√');
  };
  const onSpeechRecognized = (e) => {
    setRecognized('√');
  };
  const onSpeechEnd = (e) => {
    setEnd('√');
  };
  const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
  };
  const onSpeechResults = (e) => {
    setResults(e.value);
  };
  const onSpeechPartialResults = (e) => {
    setPartialResults(e.value);
  };
  const onSpeechVolumeChanged = (e) => {
    setVolume(e.value);
  };
  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };
  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    Navigate_Url("LogIn")
  };
  const Search=async (result)=>{
    if(result.includes('Project')||result.includes('project'))
    {
      if(result.includes('dyb')||result.includes('Dyb')||result.includes('document')||result.includes('Document')){
        GLOBAL.route = "DYB";
        GLOBAL.TaskName = "";
        Navigate_Url("Project_structureStack")
      }
      else {
        GLOBAL.TaskName = "";
        GLOBAL.route = "structure";
        Navigate_Url("Project_structureStack")
      }
    }
      else   if(result.includes('Site')||result.includes('site'))
    {
      setmessage('Unable to navigate to directly')
      setShowMessage(true);
      setTimeout(function() {
        setShowMessage(false);
      }, 4000);
      _destroyRecognizer()
    }
    else   if(result.includes('Unit')||result.includes('unit'))
    {
      setmessage('Unable to navigate to directly')
      setShowMessage(true);
      setTimeout(function() {
        setShowMessage(false);
      }, 4000);
      _destroyRecognizer()
    }
    else   if(result.includes('Section')||result.includes('section')){
      setmessage('Unable to navigate to directly')
      setShowMessage(true);
      setTimeout(function() {
        setShowMessage(false);
      }, 4000);
      _destroyRecognizer()
    }
    else   if(result.includes('Feature')||result.includes('feature')){
      setmessage('Unable to navigate to directly')
      setShowMessage(true);
      setTimeout(function() {
        setShowMessage(false);
      }, 4000);
      _destroyRecognizer()
    }
    else   if(result.includes('Profile')||result.includes('profile')){
      Navigate_Url("ProfileStack")
    }
    else   if(result.includes('Task')||result.includes('task')){
      if(result.includes('Add')||result.includes('add')){
        if(GLOBAL.UserInformation?.roleName!=='Technician') {
          GLOBAL.TaskName = "";
          Navigate_Url("AddNewTask2");
        }
        else {
          setmessage('Unable to navigate to directly')
          setShowMessage(true);
          setTimeout(function() {
            setShowMessage(false);
          }, 4000);
          _destroyRecognizer()
        }
      }

     else{
        GLOBAL.TaskName = "";
        Navigate_Url("Task_managementStack")
      }
    }
    else   if(result.includes('Logout')||result.includes('log out')||result.includes('logout')||result.includes('log out')){
      setshowModalDelete(true);
    }
    else   if(result.includes('home')||result.includes('Home')||result.includes('dashboard')||result.includes('Dashboard')){
      goBack()
    }
    else {
      setmessage('No results were found for your search')
      setShowMessage(true);
      setTimeout(function() {
        setShowMessage(false);
      }, 4000);
      _destroyRecognizer()
    }
  }
  return (
    <Container style={[Styles.BackcolorHome]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.withe} />
      <View style={Styles.HeaderStyleVoice}>
        <View style={{ width: "2%" }} />
        <View style={{ width: "12%" }}>
          <Button onPress={()=>goBack()} transparent style={Styles.Backbtn}>
            <AntDesign name={"arrowleft"} size={21} color={Colors.button} />
          </Button>
        </View>
        <View style={{width:"74%"}}>
          <Text numberOfLines={1} style={[Styles.HeaderText4]}>Voice Search</Text>
        </View>
        <View style={{width:"12%"}}/>
      </View>
      <Content contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
          {
            ShowMessage===true&&
            <TouchableOpacity onPress={()=> {
              setShowMessage(false)
              _destroyRecognizer();
            }} style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={Styles.flashMessageWarning2}>
              <View style={{ width: "5%" }} />
              <View  style={{ width: "10%" }} >
                <FontAwesome size={normalize(18)} color={"#fff"} name={"window-close"} />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={Styles.AlertTxt}>
                  {message}
                </Text>
              </View>
              <View style={{ width: "5%" }} />
            </View>
            </TouchableOpacity>
          }


        {started!==''&&end===''&& <Text  style={[Styles.HeaderTextVoice]}>Ready To listen</Text>}
        {
          started!==''&&end===''?
            <View style={Styles.Voicecircle2}>
              <View style={Styles.VoiceBox}>
                {[...Array(3).keys()].map(index=>{
                  return<MotiView
                    from={{opacity:0.7,scale:1}}
                    animate={{opacity:0,scale:4}}
                    transition={{
                      type:'timing',
                      duration:4000,
                      easing:Easing.out(Easing.ease),
                      delay:index*300,
                      repeatReverse:false,
                      loop:true,
                    }}
                    key={index} style={[StyleSheet.absoluteFillObject,Styles.VoiceBox]}/>
                })}
                <MaterialIcons name={"keyboard-voice"} size={35} color={Colors.withe} />
              </View>
            </View>:
            <View style={Styles.Voicecircle1}>
              <View style={Styles.VoiceBox}>
                <MaterialIcons name={"keyboard-voice"} size={35} color={Colors.withe} />
              </View>
            </View>
        }
        <View style={Styles.containerresultVoice}>
        <Text style={[Styles.stat,{marginBottom:17}]}>Results</Text>
        {results.map((result, index) => {
          return (
            <TouchableOpacity onPress={()=>Search(result)}  key={`result-${index}`} style={Styles.containerresultVoiceItem}>
            <Text style={Styles.stat}>
              {result}
            </Text>
            </TouchableOpacity>
          );
        })}
        </View>
        <View style={Styles.containerListVoice}>
          <TouchableOpacity onPress={()=>_startRecognizing()} style={Styles.VoiceCancellButon}>
            <Text style={Styles.txt_left23}> Search </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>_destroyRecognizer()} style={Styles.VoiceCancellButon}>
            <Text style={Styles.txt_left23}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
}
export  default Voice_Search;
