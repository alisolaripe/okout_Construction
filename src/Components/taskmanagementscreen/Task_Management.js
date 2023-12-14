import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity, Modal, Image, FlatList,Button
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import {Container, Fab} from "native-base";
const GLOBAL = require("../Global");
import Task_management_Item from "./Task_management_Item";
import LinearGradient from "react-native-linear-gradient";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { removeDataStorage,writeDataStorage } from "../Get_Location";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
const Api = require("../Api");
const taskmenu=[ { Name: "my Task ",Id:1, },
  {Id:2,Name: "Assigned to me",},
 ]
const ActionButton_list=[ { title: "Completed",Id:2,Color:'#a0b6f6'},
  {Id:1,title: "Over due",Color:'#173cbd'},{Id:1,title: "Task type",Color:'#173cbd'},
 ]
function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Assigned, setAssigned] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowMessage, setShowMessage] = useState(false);
  const [angle, setAngle] = useState(165);
  const [selectItem, setSelectItem] = useState(1);
  const [active, setactive] = useState(false);
  useEffect(() => {
    My_TaskList();
    Assigned_TaskList()
  }, []);

  //${GLOBAL.UserInformation?.userId}
  const My_TaskList =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList+`userId=1`).then(json => {
        let A = [];
        for (let item in json?.tasks) {
          let obj = json?.tasks?.[item];
          A.push({
            taskId: obj.taskId,
            taskTitle: obj.taskTitle,
            taskCategoryName: obj.taskCategoryName,
            taskPriorityName:obj.taskPriorityName,
            taskDescription:obj.taskDescription,
            taskParentTaskId:obj.taskParentTaskId,
            taskPlanStartDate:obj.taskPlanStartDate,
            taskPlanDueDate:obj.taskPlanDueDate,
            taskStatusColor:obj.taskStatusColor,
            taskCreatedOn:obj.taskCreatedOn,
            taskStatusName:obj.taskStatusName
          });
        }
        console.log(A,'AAAAA')
        if (A?.length!==0){
          setmodules(A);
          writeDataStorage(GLOBAL.All_Task,A)
        }
        else {

          setmodules('');
        }
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
      if (json!==null) {
        if (json?.length!==0){
          setmodules(json);
        }
        else {
          setmodules('');
        }
      }
    }
  };
  const Assigned_TaskList =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Assigned_TaskList+`userId=1`).then(json => {
        console.log(json,'json')
        let A = [];
        for (let item in json?.tasks) {
          let obj = json?.tasks?.[item];
          A.push({
            taskId: obj.taskId,
            taskTitle: obj.taskTitle,
            taskCategoryName: obj.taskCategoryName,
            taskPriorityName:obj.taskPriorityName,
            taskDescription:obj.taskDescription,
            taskParentTaskId:obj.taskParentTaskId,
            taskPlanStartDate:obj.taskPlanStartDate,
            taskPlanDueDate:obj.taskPlanDueDate,
            taskStatusColor:obj.taskStatusColor,
            taskCreatedOn:obj.taskCreatedOn,
            taskStatusName:obj.taskStatusName
          });
        }
        console.log(A,'AAAAA')
        if (A?.length!==0){
          setAssigned(A);
          writeDataStorage(GLOBAL.All_Task,A)
        }
        else {

          setAssigned('');
        }
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
      if (json!==null) {
        if (json?.length!==0){
          setAssigned(json);
        }
        else {
          setAssigned('');
        }
      }
    }
  };
  const SeeDetail = (projectId) => {
    GLOBAL.ProjectId = projectId;
    navigation.navigate("Project_Sites");
  };
  const handleSubmit = () => {
    navigation.navigate("AddNewTask");
  };

  const logout_Url= () => {
    setshowModalDelete(true)

  };
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
  };
  const _showModalDelete = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDelete}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDelete( false)}
          transparent={true}
        >
          {renderModalContent()}
        </Modal>
      </View>
    );
  };
  const renderModalContent = () => (
    <View style={Styles.DeleteModalTotalStyle}>
      <View style={Styles.DeleteModalStyle2}>

        <View style={Styles.With100NoFlex}>
          <Image style={{width:'27%',aspectRatio:1,marginVertical:normalize(10)}}
                 source={require("../../Picture/png/AlertImage.png")}
                 resizeMode="contain" />
          <View style={Styles.With100NoFlex}>
            <Text style={Styles.txt_left2}>
              Do you want to Log Out from App?
            </Text>
          </View>
        </View>

        <View style={Styles.With100Row}>
          <LinearGradient  colors={['#9ab3fd','#82a2ff','#4B75FCFF']} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => setshowModalDelete( false)} >
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient   colors={['#ffadad','#f67070','#FF0000']} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              removeDataStorage(GLOBAL.PASSWORD_KEY);
              setshowModalDelete(false)
              navigation.navigate('LogIn');
            }} >
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item,index }) => (
    <Task_management_Item  index={index}   value={item} Navigate_Url={Navigate_Url}
                          modules={modules.length}  ShowMessage={ShowMessage} />
  )
  const renderSectionHeader=()=>(
    <>
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      <View style={Styles.Horizental_Menu}>

          {taskmenu.map((item, index) => {
            return (
              <LinearGradient  angle={angle}
                               colors={["#382e2e", "#786b6b"]} key={index}   useAngle={true}
                               style={[Styles.Horizental_Menu_Item,selectItem===item.Id?{borderWidth:2,borderColor:'#a39898'}:null]}>
              <TouchableOpacity onPress={()=>setSelectItem(item.Id)}>
                <Text style={Styles.Horizental_Menu_Item_text}>
                  {item.Name}
                </Text>
              </TouchableOpacity>
              </LinearGradient>
            );
          })}
      </View>
      </>
    )
const renderSectionFooter=()=>(
  <View style={Styles.SectionFooter}/>
)
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Management'}/>

        <View style={[Styles.containerList]}>

          {
            modules === '' ?
              <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No Task defined
                </Text>
                <Text style={Styles.EmptyText}>
                  Add by pressing button below "
                </Text>
              </View>:
              <View style={Styles.TaskBox}>
                  <FlatList
                    showsh={false}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderSectionHeader}
                    ListFooterComponent={renderSectionFooter}
                    data={selectItem===1?modules:Assigned}
                    style={{ width: '100%',flexGrow: 0 }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
              </View>

          }
        </View>
      {selectItem===1?
        <FloatAddBtn onPress={handleSubmit} colors={['#a39898','#786b6b','#382e2e']}/>:
null
        // <View style={[Styles.FloatBtn_action]}>
        //   <Fab
        //     active={active}
        //     direction="up"
        //     containerStyle={{ }}
        //     style={{ backgroundColor: '#5067FF' }}
        //     position="bottomRight"
        //     onPress={() => setactive(!active)}>
        //     <AntDesign name="filter" size={25} color="#fff" />
        //      {ActionButton_list.map((item, index) => {
        //          return (
        //            <Button style={{ backgroundColor: '#34A34F',flexDirection:'column',width:70,height:70,marginVertical:15}}>
        //              <Text style={Styles.Text_actionbtn}>
        //                {item.title}
        //              </Text>
        //            </Button>
        //
        //            )})}
        //   </Fab>
        // </View>
      }

      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}

export default Task_Management;
