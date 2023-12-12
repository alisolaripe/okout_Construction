import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity, Modal, Image, FlatList,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import {Container, Content} from "native-base";
const GLOBAL = require("../Global");
import Task_management_Item from "./Task_management_Item";
import LinearGradient from "react-native-linear-gradient";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { removeDataStorage,writeDataStorage } from "../Get_Location";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Api = require("../Api");
function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([{projectId:1, projectName: "ffff", Status: "done" }, {
    projectName: "ddd",
    Status: "Notdone",
  }, { projectName: "ddd", Status: "Notdone" }]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowMessage, setShowMessage] = useState(false);
  useEffect(() => {
    Task_List()
  }, []);


  const Task_List =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_List).then(json => {
        let A = [];
        for (let item in json?.taskList) {
          let obj = json?.taskList?.[item];
          A.push({
            taskId: obj.taskId,
            taskTitle: obj.taskTitle,
          });
        }
        console.log(A,'AAAAA')
        if (A?.length!==0){
          //setmodules(A);
          writeDataStorage(GLOBAL.All_Task,A)
        }
        else {

          //setmodules('');
        }
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
      if (json!==null) {
        if (json?.length!==0){
          //setmodules(A);
        }
        else {
          setmodules('');
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
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Management'}/>

        <View style={[Styles.containerList]}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
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

                {modules && (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={modules}
                    style={{ width: '100%', flexGrow: 0 }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
                )}
              </View>

          }
        </View>
      <FloatAddBtn onPress={handleSubmit} colors={['#a39898','#786b6b','#382e2e']}/>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}

export default Task_Management;
