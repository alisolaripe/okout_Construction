import React, {useState} from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from "react-native-linear-gradient";
const GLOBAL = require("../Global");
function DYB_Item({index,value,Navigate_Url}) {
  const data = [
    { label: 'DYB List', value: '3' ,Icon:'level-down'},
  ];
  const [isFocus,setIsFocus] = useState(false);
  const ClickManagement =(id,featureId,featureName)=>{
    GLOBAL.DYB=value.DYB
    GLOBAL.FeatureName=featureName
      GLOBAL.UpdateFeatureID=featureId
    Navigate_Url('Project_Feature_List')
  }
  const renderItem = (item,index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{paddingLeft:7}}>
          <Entypo size={normalize(12)} color={Colors.withe}  name={item.Icon}  />
        </View>
        <Text style={[Styles.txt_left,{paddingLeft:3}]} >{item.label}</Text>
      </View>
    );
  };
  return (
    <View>
      {
        value.Count !=='0' ?
          <View index={index} style={Styles.ItemDetailBox}>

            <View style={Styles.With90}>
              <View style={{ width: '65%' }}>
                <Text onPress={() => {
                  GLOBAL.UpdateFeatureID = value.featureId;
                  GLOBAL.DYB=value.DYB
                  GLOBAL.FeatureName=value.featureName
                  Navigate_Url('Project_Feature_List')
                }
                } style={[Styles.txt_left]}>{value.featureName}</Text>
                <View style={Styles.DYB}>
                  {
                    value.DYB!=='n'?
                      <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList3}>
                        <TouchableOpacity onPress={() => {
                          GLOBAL.UpdateFeatureID = value.featureId;
                          GLOBAL.DYB=value.DYB
                          GLOBAL.FeatureName=value.featureName
                          Navigate_Url('Project_Feature_List')
                        }}   style={Styles.With100DYBbtn}>
                          <Text  style={Styles.txtcenter}> DYB </Text>
                          <Entypo size={normalize(12)} color={'#fff'}  name={'check'} />
                        </TouchableOpacity>
                      </LinearGradient>
                      :
                      null
                  }
                  <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                    {
                      value.task==='0'||value.task===0?
                        <View>
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                        </View>:
                        <TouchableOpacity onPress={()=> {
                          GLOBAL.TaskName=value.featureName;
                            GLOBAL.RelatedName=value.ListName;
                          GLOBAL.RelatedId=value.featureId
                          Navigate_Url("Task_managementStack3");
                        }} >
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                        </TouchableOpacity>
                    }

                  </LinearGradient>

                </View>
              </View>
              <View style={{ width: '35%' }}>
                <Dropdown
                  containerStyle={Styles.DropDown}
                  selectedTextStyle={Styles.selectedTextStyle}
                  labelField="label"
                  valueField="value"
                  data={data}
                  maxHeight={300}
                  renderItem={renderItem}
                  renderRightIcon={() => (
                    <View style={Styles.DropDownIcon}>
                      <AntDesign name="ellipsis1" size={normalize(25)} color={Colors.button} />
                    </View>
                  )}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    ClickManagement(item.value, value.featureId, value.featureName)
                  }}
                />
              </View>
            </View>
          </View>
          :
          <View index={index} style={Styles.ItemDetailBox2}>
            <View style={Styles.ItemDetailBox1}/>
            <View style={Styles.With90_zIndex}>
              <View style={{ width: '65%' }}>
                <Text  style={[Styles.txt_left]}>{value.featureName}5</Text>
                <View style={Styles.DYB}>
                  {
                    value.DYB!=='n'?
                      <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList3}>
                        <View style={Styles.With100DYBbtn} >
                          <Text  style={Styles.txtcenter}> DYB </Text>
                          <Entypo size={normalize(12)} color={'#fff'}  name={'check'} />
                        </View>
                      </LinearGradient>
                      :
                      null
                  }
                  <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                  </LinearGradient>
                </View>
              </View>
              <View style={{ width: '35%' }}>
                <View style={Styles.DropDownIcon}>
                  <AntDesign name="ellipsis1" size={normalize(17)} color={Colors.withe} />
                </View>
              </View>
            </View>
          </View>
      }
    </View>

  );
}


export default DYB_Item;
