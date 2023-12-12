import React, { useState, useEffect } from "react";
import { View, Text,Image,Modal,TouchableOpacity } from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import { readOnlineApi } from "../ReadPostApi";
import Category_items_list from "../component/Category_items_list";
import {removeDataStorage,writeDataStorage} from "../Get_Location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { writePostApi } from "../writePostApi";
const GLOBAL = require("../Global");
const Api = require("../Api");
const data = [{ label: "Edit", value: "1", Icon: "edit" }];
function Project_structure({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [visibleAddModal, setvisibleAddModal] = useState(false);
  const [ShowMessageUpdate,setShowMessageUpdate]=useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [edit, setedit] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  useEffect(() => {
    get_Country_City();
    const unsubscribe = navigation.addListener('focus', () => {
      getProjects();
    });
    return unsubscribe;
  }, []);
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  const get_Country_City=async ()=>{
    GLOBAL.Country =JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Country));
    GLOBAL.City =JSON.parse(await AsyncStorage.getItem(GLOBAL.All_City));
  }
  const getAllProjectInfo = async () => {
      readOnlineApi(Api.getAllProjectInfo).then(json => {
        let A = [];
        json?.projects?.forEach((obj) => {
          A.push({
            projectId: obj?.projectId,
            projectName: obj?.projectName,
            siteCount: obj?.siteCount,
            sites: obj?.sites,
            notes: obj?.notes,
            task: obj?.task,
          });
        });
        if(A?.length!==0)
          setmodules(A);
        else
          setmodules('');
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
      });
  };
  const getProjects = async () => {
     let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists))
      let A = [];
    if (json!==null) {
      json?.forEach((obj) => {
        A.push({
          projectId: obj?.projectId,
          projectName: obj?.projectName,
          siteCount: obj?.siteCount,
          sites: obj?.sites,
          notes: obj?.notes,
          task: obj?.task,
        });
      });
      if(A?.length!==0)
      setmodules(A);
      else
        setmodules('');
    }
  };
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.projectId) === parseInt(object2.projectId) && object1.projectName === object2.projectName;
      });
    });
  };
  const AddProjectsDataStorage = async (A) => {
    let List = [];
    List = modules;
    if (List !== null && List.length !== 0) {
      let different = getDifference(A, List);
      let Exist = false;
      different?.forEach((obj) => {
        Exist = List?.findIndex((p) => p.projectId === obj.projectId);
      });
      if (Exist === -1) {
        let MakeList = [].concat(modules, different);
        writeDataStorage(GLOBAL.All_Lists, MakeList);

      } else {
        writeDataStorage(GLOBAL.All_Lists, A);
      }
    } else {
      writeDataStorage(GLOBAL.All_Lists, A);
    }
  };
  const UpdateProject = (value) => {
    var formdata = new FormData();
    formdata.append("projectName", value.Projectname);
    formdata.append("userId", "1");
    formdata.append("notes", value.ProjectNote);
    formdata.append("projectId", GLOBAL.UpdateProjectId);
    writePostApi("POST", Api.UpdateProject, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json.msg);
          setShowMessageUpdate(true);
          setShowWarningMessage(false)
          getAllProjectInfo();
        }
      }
      else {
        let List_Item = [];
        List_Item = modules;
        let index = List_Item?.findIndex((p) => p.projectId === GLOBAL.UpdateProjectId);
        let markers = [...List_Item];
        markers[index] = { ...markers[index], projectName: value.Projectname };
        setmodules(markers);
        setMessage("Your project successfully updated");
        setShowMessageUpdate(true);
        AddProjectsDataStorage(markers);
      }
    });
  };
  const AddProject = async (value) => {

    var formdata = new FormData();
    formdata.append("projectName", value.Projectname);
    formdata.append("userId", "1");
    formdata.append("notes", value.ProjectNote);
    writePostApi("POST", Api.CreatProject, formdata).then(json => {

      if (json!==undefined) {
        if (json?.status === true) {
          setMessage(json.msg);
          setShowMessage(true);
          getAllProjectInfo();
          setvisibleAddModal(false);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      }

      else {
        let List_Item = [];
        let A = [];
        let Count = 0;
        List_Item = modules;
        if (List_Item?.length !== 0) {
          A = [...List_Item];
          Count = parseInt(List_Item[List_Item.length - 1]?.projectId) + 1;
        } else {
          Count = Count + 1;
        }
        A.push({
          projectId: Count.toString(),
          projectName: value.Projectname,
          siteCount: "0",
          sites: [],
          notes: value.ProjectNote,
          task: "0",
        });
        List_Item = A;
        setmodules(List_Item);
        setMessage("Your project successfully added");
        setShowMessage(true);
        AddProjectsDataStorage(List_Item);
        setvisibleAddModal(false);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4125);
        return () => clearInterval(timerId);
      }
    });
  };
  const ChangeChecked = () => {
    setCheked(!Cheked);
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
            removeDataStorage(GLOBAL.PASSWORD_KEY)
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
  const logout_Url= () => {
    setshowModalDelete(true)

  };

  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={["#ffadad", "#f67070", "#FF0000"]} StatusColor={"#ffadad"} onPress={goBack}
              Title={"Construction Projects"} />
      <Content>
        <View style={[Styles.containerList]}>
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
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          {modules!=='' ?
              <View style={Styles.With100NoFlex}>
                <View style={[Styles.ItemsBox2]}>
                  {modules&&
                  modules?.map((item, index) => {
                    return (
                      <Category_items_list key={index} setShowMessage={setShowMessageUpdate} value={item}
                                           Message={Message} onPress={UpdateProject} data={data} edit={edit} setedit={setedit}
                                           ShowMessage={ShowMessageUpdate} tittlebtn={"Update Project"} numberValue={3} ShowWarningMessage={ShowWarningMessage}
                                           setShowWarningMessage={setShowWarningMessage}
                                           Navigate_Url={Navigate_Url}/>
                    );
                  })
                  }
                </View>
              </View>:
          <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No Projects defined
                </Text>
                <Text style={Styles.EmptyText}>
                  Add by pressing button below "
                </Text>
              </View>
          }
        </View>
      </Content>
      <FloatAddBtn onPress={onOpen}/>
      <AddModal ShowMessage={ShowMessage} Message={Message}
                numberValue={1} ChangeChecked={ChangeChecked} tittlebtn={"Add Project"}
                setvisibleAddModal={setvisibleAddModal} visibleAddModal={visibleAddModal}
                setShowMessage={setShowMessage}
                onPressAdd={AddProject}/>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url} />
    </Container>
  );
}
export default Project_structure;
