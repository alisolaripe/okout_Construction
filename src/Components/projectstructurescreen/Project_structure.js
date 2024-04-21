import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { Styles } from "../Styles";
import { Container } from "native-base";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import { readOnlineApi } from "../ReadPostApi";
import List_Items from "../component/list_Items";
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import DYB_List_Item from "../component/DYB_List_Item";
import { LogOutModal } from "../component/LogOutModal";
const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes = require("../Photoes");
const data_dyb = [];
function Project_structure({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [visibleAddModal, setvisibleAddModal] = useState(false);
  const [ShowMessageUpdate, setShowMessageUpdate] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [edit, setedit] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [route, setroute] = useState("");
  const [ShowButton, setShowButton] = useState(true);
  const [CategoryId, setCategoryId] = useState(0);
  const [Selectedcategory, setSelectedcategory] = useState(0);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState(0);
  const [selectedrelatedname, setselectedrelatedname] = useState(0);
  useEffect(() => {
    get_Country_City();
    const unsubscribe = navigation.addListener("focus", () => {
      setroute(GLOBAL.route);
      if (GLOBAL.route === "structure") {
        getProjects();
      } else {
        getProjects_dyb();
      }
    });
    return unsubscribe;

  }, []);
  ///Get Dyb===y Project Total List from AsyncStorage///
  const getProjects_dyb = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb));
    if (json !== null) {
      let Project_List = [];
      json?.forEach((obj) => {
        Project_List.push({
          Id: obj.projectId,
          Name: obj.projectName,
          Count: obj.sites?.length,
          NameCount: "site",
          ListName: "project",
          notes: obj?.notes,
          task: obj?.task,
        });
      });
      if (Project_List?.length !== 0) {
        setmodules(Project_List);
      } else
        setmodules("");
    }
  };
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  ///Get Country And City List from AsyncStorage///
  const get_Country_City = async () => {
    GLOBAL.Country = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Country));
    GLOBAL.City = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_City));
  };
  //Get  Dyb===n Project Total List from Server///
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let Project_List = [];
      json?.projects?.forEach((obj) => {
        Project_List.push({
          projectId: obj?.projectId,
          projectName: obj?.projectName,
          siteCount: obj?.siteCount,
          sites: obj?.sites,
          notes: obj?.notes,
          task: obj?.task,
        });
      });
      if (Project_List?.length !== 0)
        setmodules(Project_List);
      else
        setmodules("");
      writeDataStorage(GLOBAL.All_Lists, json?.projects);
    });
  };
  //Get  Dyb===n Project Total List from AsyncStorage///
  const getProjects = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists));
    let Project_List = [];
    if (json !== null) {
      json?.forEach((obj) => {
        Project_List.push({
          projectId: obj?.projectId,
          projectName: obj?.projectName,
          siteCount: obj?.siteCount,
          sites: obj?.sites,
          notes: obj?.notes,
          task: obj?.task,
        });
      });
      if (Project_List?.length !== 0)
        setmodules(Project_List);
      else
        setmodules("");
    }
  };
  ///compare 2 array and get  Difference//
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.projectId) === parseInt(object2.projectId) && object1.projectName === object2.projectName;
      });
    });
  };
  /// add new project to Project Total List when app is offline///
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
  ///Add and send new Project To server///
  const AddProject = async (value) => {
    setShowButton(false);
    var formdata = new FormData();
    formdata.append("projectName", value.Projectname);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.ProjectNote);
    writePostApi("POST", Api.CreatProject, formdata).then(json => {
      if (json !== undefined) {
        if (json?.status === true) {
          setMessage(json.msg);
          setShowMessage(true);
          getAllProjectInfo();
          setShowButton(true);
          setvisibleAddModal(false);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      } else {
        let List_Item = [];
        let Project_List = [];
        let Count = 0;
        List_Item = modules;
        if (List_Item?.length !== 0) {
          Project_List = [...List_Item];
          Count = parseInt(List_Item[List_Item.length - 1]?.projectId) + 1;
        } else {
          Count = Count + 1;
        }
        Project_List.push({
          projectId: Count.toString(),
          projectName: value.Projectname,
          siteCount: "0",
          sites: [],
          notes: value.ProjectNote,
          task: "0",
        });
        List_Item = Project_List;
        setmodules(List_Item);
        setMessage("Your project successfully added");
        setShowMessage(true);
        setShowButton(true);
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
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const renderSectionHeader = () => (
    <>
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
    </>
  );
  const renderItem = ({ item, index }) => (
    <List_Items key={index} setShowMessage={setShowMessageUpdate} value={item}
                data={GLOBAL.Project_data} edit={edit} setedit={setedit}
                ShowMessage={ShowMessageUpdate} tittlebtn={"Update Project"} numberValue={3}
                ShowWarningMessage={ShowWarningMessage}
                setShowWarningMessage={setShowWarningMessage} setSelectedcategory={setSelectedcategory}
                setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId}
                Navigate_Url={Navigate_Url} getAllProjectInfo={getAllProjectInfo} Update_Off={Update_Off} />
  );
  ///Update Project Info when app is offline///
  const Update_Off = (value) => {
    let List_Item = [];
    List_Item = modules;
    let index = List_Item?.findIndex((p) => p.projectId === GLOBAL.UpdateProjectId);
    let markers = [...List_Item];
    markers[index] = { ...markers[index], projectName: value.Projectname };
    setmodules(markers);
    AddProjectsDataStorage(markers);
  };
  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const SeeDetail = (Id) => {
    GLOBAL.ProjectId = Id;
    navigation.navigate("Project_Sites");
  };
  const renderItem_dyb = ({ item, index }) => (
    <DYB_List_Item data={data_dyb} value={item} SeeDetail={SeeDetail} numberValue={25}
                   Navigate_Url={Navigate_Url} />
  );
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
              StatusColor={route === "structure" ? "#ffadad" : "#ffc6bb"} onPress={goBack}
              Title={"Construction Projects"} />
      <ImageBackground source={Photoes.buildingBck}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
      <View style={[Styles.containerList]}>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
        {
          route === "structure" ?
            <>
              {modules !== "" ?
                <View style={Styles.With100NoFlex}>
                  <View style={[Styles.Center_margin_Bottom3]}>
                    {modules && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={modules}
                        style={{ width: "100%", flexGrow: 0 }}
                        renderItem={renderItem}
                        ListHeaderComponent={renderSectionHeader}
                        ListFooterComponent={renderSectionFooter}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                      />
                    )}
                  </View>
                </View> :
                <View style={Styles.With90CenterVertical}>
                  <Text style={Styles.EmptyText}>
                    " No Projects defined
                  </Text>
                  <Text style={Styles.EmptyText}>
                    Add by pressing button below "
                  </Text>
                </View>
              }
            </> :
            <View style={{ width: "100%", alignItems: "center" }}>
              {
                modules !== "" ?
                  <View style={Styles.ItemsBoxDyb}>
                    {modules && (
                      <FlatList
                        data={modules}
                        showsVerticalScrollIndicator={false}
                        style={{ width: "100%" }}
                        renderItem={renderItem_dyb}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                      />
                    )}
                  </View> :
                  <View style={Styles.With90CenterVertical}>
                    <Text style={Styles.EmptyText}>
                      " No Project defined "
                    </Text>
                  </View>
              }
            </View>
        }
      </View>
      {
        route === "structure" ?
          <FloatAddBtn onPress={onOpen} colors={["#ffadad", "#f67070", "#FF0000"]} /> : null
      }
      </ImageBackground>
      <AddModal ShowMessage={ShowMessage} Message={Message}
                numberValue={1} ChangeChecked={ChangeChecked} tittlebtn={"Add Project"}
                setvisibleAddModal={setvisibleAddModal} visibleAddModal={visibleAddModal}
                setShowMessage={setShowMessage} ShowButton={ShowButton}
                setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname}
                onPressAdd={AddProject} setCategoryId={setCategoryId} />
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Project_structure;
