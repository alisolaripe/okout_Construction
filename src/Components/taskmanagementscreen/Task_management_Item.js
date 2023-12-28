import React, {useState} from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions,Modal
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "../component/TextInputI";
const GLOBAL = require("../Global");
function Task_management_Item({value,Navigate_Url,ShowMessage,Message,ChangeChecked,index,modules}) {
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
    <View index={index}   style={Styles.With100}>
      <View style={Styles.FlexRow}>
        <View style={{width:'5%',alignItems:'center',justifyContent:"center"}}>
          <View style={value.taskStatusName==='Completed'?Styles.DoneTask:Styles.NotDoneTask}>
          </View>
          <View style={[modules- 1 !== index?Styles.BorderDash:
            { height:normalize(45)}]}>
          </View>
        </View>
        <TouchableOpacity onPress={()=> {
          console.log(value.taskId,'value.taskId')
          GLOBAL.Task_detail=value
          GLOBAL.TaskId = value.taskId;
          Navigate_Url("TaskDetail");
        }} style={{width:'95%',}}>
          <View style={Styles.ViewItems_center_transparent_row_task}>
          <Text style={[Styles.txt_left_task]}>{value.taskTitle}</Text>

              <View style={[Styles.btnListTask,{backgroundColor:value.taskStatusColor}]}>
                <Text style={[Styles.txt_left2, { fontSize: normalize(12) }]}>  {value.taskStatusName}</Text>
              </View>

          </View>
          <View style={[Styles.ViewItems_center_transparent_row]}>
            <Text style={[Styles.txt_left_task, {fontSize:normalize(12),color:'#b4b4b4'}]}>{value.Year}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
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
