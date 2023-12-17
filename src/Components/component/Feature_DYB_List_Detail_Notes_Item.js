import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput, TouchableOpacity,
} from "react-native";
import { Styles } from "../Styles";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
let numOfLinesCompany = 0;
const GLOBAL = require("../Global");
import normalize from "react-native-normalize/src/index";
function Notes_Item({value,UpdateBuildNote,ShowEditBtn}) {
  const [FeatureNote,setFeatureNote]= useState(false);
  const [Title,setTitle]= useState(false);
  const [updateText, setupdateText] = useState(false);
  const [updateTitle, setupdateTitle] = useState(false);
  useEffect(()=>{
    setFeatureNote(value.buildIdNotes)
    setTitle(value.title)
  }, []);
  const onpress = () => {

    if (updateText === false) {
      setupdateText(true);
    }
    else {
      setupdateText(false);
    }
  };
  const onpress_title = () => {

    if (updateTitle === false) {
      setupdateTitle(true);
    }
    else {
      setupdateTitle(false);
    }
  };
  return (
    <View  style={Styles.With100_NoFlex}>
      <Text style={[Styles.txtLightColor_Left,{marginTop: normalize(15)}]}> Title</Text>
      <View  style={Styles.With100NoFlex}>
      <View  style={[Styles.inputFeatureNote,updateTitle&&{borderColor:GLOBAL.OFFICIAL_Button,
        borderWidth:1,}]}>
        {updateTitle ===false?
          <View

            style={Styles.With96}>
            <Text numberOfLines={10} style={Styles.txt_Left_padding_horizontal}>
              {Title}
            </Text>
          </View>
          :
          <TextInput
            value={Title}
            style={Styles.With96_}
            onContentSizeChange={(e) => {
              numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
            }}
            onChangeText={(val) => {
              setTitle(val);
            }}
            multiline={true}
            placeholderTextColor={'#fff'}/>
        }
        <TouchableOpacity style={Styles.CenterItems}
                          onPress={onpress_title}>
          <Feather name={'edit'} size={15} color={'#fff'} />
        </TouchableOpacity>
      </View>

      </View>
      <Text style={[Styles.txtLightColor_Left,{marginTop: normalize(15)}]}> Notes</Text>
      <View  style={Styles.With100NoFlex}>
<View  style={[Styles.inputFeatureNote,updateText&&{borderColor:GLOBAL.OFFICIAL_Button,
  borderWidth:1,}]}>

  {updateText===false?
    <View

      style={Styles.With96}>
      <Text numberOfLines={10} style={Styles.txt_Left_padding_horizontal}>
        {FeatureNote}
      </Text>
    </View>
  :
  <TextInput
    value={FeatureNote}
    style={Styles.With96_}
    onContentSizeChange={(e) => {
      numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
    }}
    onChangeText={(val) => {
      setFeatureNote(val);
    }}
    multiline={true}
    placeholderTextColor={'#fff'}/>
  }
  <TouchableOpacity style={Styles.CenterItems}
    onPress={onpress}>
    <Feather name={'edit'} size={15} color={'#fff'} />
  </TouchableOpacity>
</View>

      {
        updateText===true||updateTitle===true?
          <View style={Styles.With100Row}>
            <LinearGradient colors={['#648bfc', '#5982fa', '#4B75FCFF']}
                            style={Styles.btnUpdateNote}>
              <TouchableOpacity onPress={() => {UpdateBuildNote(FeatureNote,value.buildId,Title);setupdateText(false); setupdateTitle(false);}} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Feather name={"send"} size={12} color={'#fff'} />
                <Text style={Styles.txtCenterPaddingHorizontal}>Confirm </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>:
          null
      }
      </View>
    </View>
  );
}
export default Notes_Item;
