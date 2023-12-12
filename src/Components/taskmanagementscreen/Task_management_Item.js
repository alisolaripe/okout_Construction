import React, {useState} from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions,Modal
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { TextInputI } from "../component/TextInputI";
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from "native-base";
const GLOBAL = require("../Global");
function Task_management_Item({value,Navigate_Url,modules,index,ShowMessage,Message,ChangeChecked,}) {
  const [visible,setvisible] = useState(false);
  const width = Dimensions.get("window").width;
  const ClickManagement =(id)=>{
    if(id==='1'){
      setvisible(true)
    }
    else {
    }
  }
  return (
    <View  index={index} style={Styles.With100}>
      <View style={Styles.FlexRow}>
        <View style={{width:'8%',alignItems:'center',justifyContent:"center"}}>
        <View style={[Styles.With80,value.Status==='done'?
          Styles.DoneTask:
         Styles.NotDoneTask
        ]}>{
          value.Status==='done'?
            <AntDesign name={"check"} size={15} color={'#fff'} />:
            null
        }
        </View>

          <View style={[modules- 1 !== index?Styles.BorderDash:
            { height:normalize(60),}]}>
          </View>
        </View>
        <TouchableOpacity onPress={()=> {
          GLOBAL.ProjectId = value.projectId;
          Navigate_Url("Project_Sites");
        }} style={{width:'92%'}}>
          <View style={Styles.ViewItems_center_transparent_row}>
          <Text style={[Styles.txt_left]}>{value.projectName}</Text>
            <Text style={[Styles.txtRight, {fontSize:normalize(12),color:'#b4b4b4',marginLeft:'auto'}]}>2.30 Am</Text>
          </View>
          <View style={[Styles.ViewItems_center_transparent_row,{marginTop:4}]}>
            <Text style={[Styles.txt_left, {fontSize:normalize(12),color:'#b4b4b4'}]}>Say Some Details About Task</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        // onRequestClose={() => {
        //     Alert.alert("Modal has been closed.");
        //     setModalVisible(!modalVisible);
        // }}
      >
        <View style={[Styles.centeredView, {
          justifyContent: "space-between",
          flex: 1,
          backgroundColor: "rgba(0,0,0, 0.5)",
        }]}>

          <View style={[{ flex: 1}]} />

          <View style={Styles.ModalStyle}>
            <View style={[{ width:width-40}]} >
              <TouchableOpacity onPress={()=> setvisible(false)}  style={Styles.CancelBtn}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
              </TouchableOpacity>
              {ShowMessage === true ?
                <View style={Styles.flashMessageSuccsess}>
                  <View style={{ width: "10%" }} />
                  <View style={{ width: "80%" }}>
                    <Text style={Styles.AlertTxt}>
                      {Message}
                    </Text>
                  </View>
                  <View style={{ width: "10%" }} />
                </View>
                :
                null
              }

            </View>
            <TextInputI onChangeText={(value)=>UpdateProject(value)}     numberValue={3}
                        ChangeChecked={(value)=>ChangeChecked(value)}

                        tittlebtn={'Update Project'}/>
          </View>

        </View>
      </Modal>
    </View>
  );
}


export default Task_management_Item;
