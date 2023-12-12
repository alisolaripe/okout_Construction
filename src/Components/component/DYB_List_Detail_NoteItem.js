import React from "react";
import {
  Text,
  View,
  TextInput,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
let numOfLinesCompany = 0;
function DYB_List_Detail_NoteItem({FeatureNote,setFeatureNote,ImageTitle,setImageTitle,TitleValidate,ImageValidate,setImageValidate}) {
  return (
    <View  style={Styles.inputStyleBox2}>
      <View>
        <Text style={[Styles.txtLightColor,{marginTop: normalize(4),}]}> Title</Text>
        <View style={{width:'100%'}}>
          <TextInput
            value={ImageTitle}
            style={[Styles.inputStyleFeature,TitleValidate&&{borderColor:'#CC0000'}]}
            onChangeText={(val) => setImageTitle(val)}
            multiline={true}
            placeholderTextColor={'#fff'} />
          {TitleValidate&&(<Text style={Styles.TitleValidate}>Fill the Title, please.</Text>)}
        </View>
        <Text style={[Styles.txtLightColor,{marginTop: normalize(20)}]}> Note</Text>
        <View style={{width:'100%'}}>
          <TextInput
            value={FeatureNote}
            style={[Styles.inputStyleFeature,ImageValidate&&{borderColor:'#CC0000'}]}
            onContentSizeChange={(e) => {
              numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
            }}
            onChangeText={(val) => {
              setFeatureNote(val);
            }}
            multiline={true}
            onFocus={()=>setImageValidate(false)}
            placeholderTextColor={'#fff'}/>
          {ImageValidate&&(<Text style={Styles.TitleValidate}>Fill the Notes, please.</Text>)}
        </View>
      </View>
    </View>
  );
}
export default DYB_List_Detail_NoteItem;

