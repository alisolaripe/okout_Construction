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
import AsyncStorage from "@react-native-async-storage/async-storage";
const Api = require("../Api");
const taskmenu=[ { Name: "my Task ",Id:1, },
  {Id:2,Name: "Assigned to me",},
 ]
function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Assigned, setAssigned] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowMessage, setShowMessage] = useState(false);
  const [angle, setAngle] = useState(165);
  const [selectItem, setSelectItem] = useState(1);
  useEffect(() => {
    Assigned_TaskList()
    const unsubscribe = navigation.addListener('focus', () => {
      My_TaskList();
    });
    return unsubscribe;
  }, []);
  //${GLOBAL.UserInformation?.userId}
  const My_TaskList =async () => {
        let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
        let A = [];
        for (let item in json) {
          let obj = json?.[item];
          const Year = obj.taskCreatedOn.split(" ");
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
            taskStatusName:obj.taskStatusName,
            Year:Year?.[0],

          });
        }

        if (A?.length!==0){
          setmodules(A);
        }
        else {
          setmodules('');
        }
  };
  const Assigned_TaskList =async () => {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList))
        let A = [];
        for (let item in json) {
          let obj = json?.[item];
          const Year = obj.taskCreatedOn.split(" ");
          console.log(obj.taskCreatedOn.split(" "),'obj.taskCreatedOn')
          A.push({
            taskId:obj.taskId,
            taskTitle:obj.taskTitle,
            taskCategoryName:obj.taskCategoryName,
            taskPriorityName:obj.taskPriorityName,
            taskDescription:obj.taskDescription,
            taskParentTaskId:obj.taskParentTaskId,
            taskPlanStartDate:obj.taskPlanStartDate,
            taskPlanDueDate:obj.taskPlanDueDate,
            taskStatusColor:obj.taskStatusColor,
            taskCreatedOn:obj.taskCreatedOn,
            taskStatusName:obj.taskStatusName,
            Year:Year?.[0]
          });
        }
        if (A?.length!==0){
          setAssigned(A);
        }
        else {
          setAssigned('');
        }
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
    <Task_management_Item index={index} modules={modules.length}   value={item} Navigate_Url={Navigate_Url} ShowMessage={ShowMessage} />
  )
  const renderItem_assigned = ({ item,index }) => (
    <Task_management_Item index={index} modules={Assigned.length}   value={item} Navigate_Url={Navigate_Url} ShowMessage={ShowMessage} />
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
        <View style={Styles.Horizental_Menu_Box}>
          {taskmenu.map((item, index) => {
            return (
              <>
                {
                  selectItem===item.Id?
                    <LinearGradient key={index}  angle={angle}
                                     colors={["#6dabec", "#27405c"]}    useAngle={true}
                                     style={Styles.Horizental_Menu_Item}>
                      <TouchableOpacity  key={index}  onPress={()=>setSelectItem(item.Id)}>
                        <Text style={Styles.Horizental_Menu_Item_text}>
                          {item.Name}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>:

                    <TouchableOpacity key={index} onPress={()=>setSelectItem(item.Id)}  style={Styles.Horizental_Menu_Item_notselect}>
                      <Text style={Styles.Horizental_Menu_Item_text}>
                        {item.Name}
                      </Text>
                    </TouchableOpacity>
                }
              </>

            );
          })}
      </View>
      </View>
      </>
    )
const renderSectionFooter=()=>(
  <View style={Styles.SectionFooter}/>
)
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Management'}/>
      {selectItem === 1 ?
        <View style={[Styles.containerList]}>

        {
          modules === '' ?
            <View style={Styles.With100CenterVertical}>
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
                data={modules}
                style={{ width: '100%',flexGrow: 0 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
              />
            </View>

        }
      </View>:


        <View style={[Styles.containerList]}>

          {
            Assigned === '' ?
              <View style={Styles.With100CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No Task defined
                </Text>
              </View>:
              <View style={Styles.TaskBox}>
                <FlatList
                  showsh={false}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={renderSectionHeader}
                  ListFooterComponent={renderSectionFooter}
                  data={Assigned}
                  style={{ width: '100%',flexGrow: 0 }}
                  renderItem={renderItem_assigned}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              </View>

          }
        </View>
      }
      {selectItem===1?
        <FloatAddBtn onPress={handleSubmit} colors={['#a39898','#786b6b','#382e2e']}/>:
null
      }

      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}

export default Task_Management;
