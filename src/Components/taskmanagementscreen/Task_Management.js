import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,Modal,Image
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import {Container, Content} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import { isNetworkConnected } from "../GlobalConnected";
import { TextInputI } from "../component/TextInputI";
const GLOBAL = require("../Global");
import Task_management_Item from "./Task_management_Item";
import LinearGradient from "react-native-linear-gradient";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { removeDataStorage } from "../Get_Location";
const Api = require("../Api");
function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([{projectId:1, projectName: "ffff", Status: "done" }, {
    projectName: "ddd",
    Status: "Notdone",
  }, { projectName: "ddd", Status: "Notdone" }]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowBtn2, setShowBtn2] = useState(true);
  useEffect(() => {
    Task_category()
  }, []);


  const Task_category = () => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value + Api.Task_category, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
               console.log(json,'json')
            let A = [];
            for (let item in json?.projects) {
              let obj = json?.projects?.[item];
              A.push({
                projectId: obj.projectId,
                projectName: obj.projectName,
              });
            }
            //setmodules(A);
            //GLOBAL.modules=A;


          })
          .catch(error => console.log("error", error));
      }
    });
  };

  const ChangeChecked = (value) => {
    setCheked(!Cheked);
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
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Management'}/>
      <Content>
        <View style={[Styles.container]}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          <View style={Styles.TaskBox}>
            {
              modules.map((value, index) => {
                return (
                  <Task_management_Item key={index} index={index}   value={value} Navigate_Url={Navigate_Url}
                                        modules={modules.length} ShowBtn2={ShowBtn2} ShowMessage={ShowMessage} />


                );

              })
            }
          </View>
          <View style={[Styles.ViewItems_center]}>
            <LinearGradient colors={['#a39898','#786b6b','#382e2e']} style={[Styles.btnTask,{ marginBottom: normalize(28),}]}>
              <TouchableOpacity
                onPress={handleSubmit}>
                <Text style={[Styles.txt,{fontSize: normalize(16),}]}>Add New Task</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Content>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}

export default Task_Management;
