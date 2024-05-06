import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, Image, FlatList, ImageBackground } from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writeDataStorage, removeDataStorage } from "../Get_Location";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import List_Items from "../component/list_Items";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { writePostApi } from "../writePostApi";
import { readOnlineApi } from "../ReadPostApi";
import DYB_List_Item from "../component/DYB_List_Item";
import { LogOutModal } from "../component/LogOutModal";
const Photoes = require("../Photoes");
const GLOBAL = require("../Global");
const Api = require("../Api");
const data_dyb = [];
function Project_Section({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [visibleAddModal, setvisibleAddModal] = useState(false);
  const [Json, setJson] = useState([]);
  const [ShowMessageUpdate, setShowMessageUpdate] = useState(false);
  const [AddId, setAddId] = useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [route, setroute] = useState("");
  const [ShowButton, setShowButton] = useState(true);
  const [CategoryId, setCategoryId] = useState(0);
  const [Selectedcategory, setSelectedcategory] = useState(0);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState(0);
  const [selectedrelatedname, setselectedrelatedname] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setroute(GLOBAL.route);
      if (GLOBAL.route === "structure") {
        getSection();
      } else {
        getSection_dyb();
      }
    });
    return unsubscribe;

  }, []);
  //Get  Dyb===y section Total List from AsyncStorage///
  const getSection_dyb = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb));
    let Section_dyb = [];
    let Filter_units = "";
    let Filter_sites = "";
    let Filter_section = "";
    if (json !== null) {
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId);
      if (Filter_section?.sections) {
        Filter_section?.sections?.forEach((obj) => {
          if (parseInt(obj.featureCount) !== 0) {
            Section_dyb.push({
              Id: obj.sectionId,
              Name: obj.sectionName,
              features: obj.features,
              Count: obj.features?.length,
              NameCount: "feature",
              ListName: "section",
              unitId: GLOBAL.UnitId,
              task: obj?.task,
            });
          }
        });
        if (Section_dyb?.length !== 0) {
          setmodules(Section_dyb);
        } else
          setmodules("");
      }
    }

  };
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  //Get  Dyb===n section Total List from Server///
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let Section_List = [];
      let Filter_sites = json?.projects?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId);
      Filter_section?.sections?.forEach((obj) => {
        Section_List.push({
          sectionId: obj.sectionId,
          sectionName: obj.sectionName,
          featureCount: obj.featureCount,
          task: obj?.task,
          ListName: "Section",
          unitId: GLOBAL.UnitId,
          features: obj.features,
        });
      });
      if (Section_List?.length !== 0)
        setmodules(Section_List);
      else
        setmodules("");
      writeDataStorage(GLOBAL.All_Lists, json?.projects);
    });
  };
  /// compare 2 array by Id And sort///
  const dateComparison = (a, b) => {
    const date1 = a?.Id;
    const date2 = b?.Id;
    return date1 - date2;
  };
  //Get  Dyb===n section Total List from AsyncStorage///
  const getSection = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists));
    if (json !== null) {
      let Section_List = [];
      let Filter_units = "";
      let Filter_sites = "";
      let Filter_section = "";
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId);
      Filter_section?.sections?.forEach((obj) => {
        Section_List.push({
          sectionId: obj.sectionId,
          sectionName: obj.sectionName,
          featureCount: obj.featureCount,
          task: obj?.task,
          ListName: "Section",
          unitId: GLOBAL.UnitId,
          features: obj.features,
        });
      });
      if (Section_List?.length !== 0)
        setmodules(Section_List);
      else
        setmodules("");
    }
    if (GLOBAL.isConnected === false) {
      let All_Sites = [];
      json?.forEach((obj) => {
        obj?.sites?.forEach((obj2) => {
          obj2?.units?.forEach((obj3) => {
            obj3?.sections?.forEach((obj4) => {
              All_Sites?.push({ Id: obj4?.sectionId });
            });
          });
        });
      });
      All_Sites?.sort(dateComparison);
      setAddId(All_Sites);
    }
  };
  ///compare 2 array and get  Difference//
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.sectionId) === parseInt(object2.sectionId) && object1.sectionName === object2.sectionName;
      });
    });
  };
  ///add And Update new section list in asyncStorage When app is Offline Mode///
  const SaveSection = async (A) => {
    let List = [];
    List = modules;
    let Filter_sites = Json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
    let Filter_unit = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
    let index_project = Json?.findIndex((p) => p?.projectId === GLOBAL.ProjectId);
    let index_sites = Filter_sites?.findIndex((p) => p?.siteId === GLOBAL.SiteId);
    let index_unit = Filter_unit?.findIndex((p) => p?.unitId === GLOBAL.UnitId);
    let ListTotal = [...Json];
    let markers_sites = [...Filter_sites];
    let markers_unit = [...Filter_unit];
    let different = getDifference(A, List);
    let Exist = false;
    different?.forEach((obj) => {
      Exist = List?.findIndex((p) => p.sectionId === obj.sectionId);
    });
    if (Exist === -1) {
      let MakeList = [].concat(modules, different);
      markers_unit[index_unit] = { ...markers_unit[index_unit], sections: MakeList };
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
      ListTotal[index_project] = { ...ListTotal[index_project], sites: markers_sites };
      writeDataStorage(GLOBAL.All_Lists, ListTotal);
    } else {
      markers_unit[index_unit] = { ...markers_unit[index_unit], sections: A };
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
      ListTotal[index_project] = { ...ListTotal[index_project], sites: markers_sites };

      writeDataStorage(GLOBAL.All_Lists, ListTotal);
    }
  };
  /// Add and send new section To server///
  const AddSection = (value) => {
    setShowButton(false);
    var formdata = new FormData();
    formdata.append("sectionName", value.SectionName);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.SectionNote);
    formdata.append("projectId", GLOBAL.ProjectId);
    formdata.append("unitId", GLOBAL.UnitId);
    formdata.append("siteId", GLOBAL.SiteId);
    writePostApi("POST", Api.CreateSection, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          setShowButton(true);
          getAllProjectInfo();
          setvisibleAddModal(false);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      } else {
        let List_Item = [];
        let section_List = [];
        let Count = 0;
        List_Item = modules;
        if (List_Item?.length !== 0) {
          section_List = [...List_Item];
        }
        if (AddId.length !== 0)
          Count = parseInt(AddId[AddId?.length - 1]?.Id) + 1;
        else
          Count = Count + 1;
        section_List.push({
          sectionId: Count.toString(),
          sectionName: value.SectionName,
          featureCount: "0",
          ListName: "Section",
          unitId: GLOBAL.UnitId,
          task: "0",
          features: [],
        });
        List_Item = section_List;
        setmodules(List_Item);
        SaveSection(List_Item);
        setMessage("Your section successfully added");
        setShowMessage(true);
        setvisibleAddModal(false);
        setShowButton(true);
        let All_Sites = [];
        json?.forEach((obj) => {
          obj?.sites?.forEach((obj2) => {
            obj2?.units?.forEach((obj3) => {
              obj3?.sections?.forEach((obj4) => {
                All_Sites?.push(
                  { Id: obj4?.sectionId },
                );
              });
            });
          });
        });
        All_Sites?.sort(dateComparison);
        setAddId(All_Sites);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4125);
        return () => clearInterval(timerId);
      }
    });
  };
  const DeleteSection = (sectionName) => {
    var formdata = new FormData();
    formdata.append("sectionName", sectionName);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", "value.Unitname");
    formdata.append("sectionId", GLOBAL.SectionIdDelete);
    writePostApi("POST", Api.DeleteSection, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessageDelete(true);
          getAllProjectInfo();
          const timerId = setInterval(() => {
            setShowMessageDelete(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      } else {
        let List_Item = modules;
        let index = List_Item?.findIndex((p) => p.sectionId === GLOBAL.SectionIdDelete);
        let markers = [...List_Item];
        markers?.splice(index, 1);
        setmodules(markers);
        SaveSection(markers);
        Delete_Detail_Offline();
        setMessage("Your unit successfully deleted");
      }
      setShowMessageDelete(true);
      const timerId = setInterval(() => {
        setShowMessageDelete(false);
      }, 4000);
      return () => clearInterval(timerId);
    });
  };
  ///delete section when app is offline///
  const Delete_Detail_Offline = async () => {
    let Modules = await AsyncStorage.getItem(GLOBAL.SectionDetail_KEY);
    let Filter = JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.SectionIdDelete));
    await AsyncStorage.setItem(GLOBAL.SectionDetail_KEY, JSON.stringify(Filter));
  };
  const ChangeChecked = (value) => {
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
  ///Update section When app is Offline Mode///
  const Update_Off = (value) => {
    let List_Item = modules;
    let index = List_Item?.findIndex((p) => p.sectionId === GLOBAL.UpdateSectionID);
    let markers = [...List_Item];
    markers[index] = { ...markers?.[index], sectionName: value.SectionName };
    setmodules(markers);
    SaveSection(markers);
  };
  const renderItem = ({ item, index }) => (
    <List_Items key={index} setShowMessage={setShowMessageUpdate} value={item} ShowWarningMessage={ShowWarningMessage}
                setShowWarningMessage={setShowWarningMessage} Update_Off={Update_Off}
                Navigate_Url={Navigate_Url} Message={Message} data={GLOBAL.Section_Data}
                getAllProjectInfo={getAllProjectInfo}
                ShowMessage={ShowMessageUpdate} tittlebtn={"Update Section"} numberValue={14}
                onPressDelete={DeleteSection} ShowButton={ShowButton}
                setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId}
    />
  );
  const renderSectionHeader = () => (
    <>
      {ShowMessageDelete === true ?
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
  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const SeeDetail = (Id) => {
    GLOBAL.SectionId = Id;
    navigation.navigate("Project_Features2");
  };
  const renderItem_dyb = ({ item }) => (
    <DYB_List_Item data={data_dyb} value={item}
                   SeeDetail={SeeDetail} Navigate_Url={Navigate_Url} />
  );
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
              StatusColor={route === "structure" ? "#ffadad" : "#ffc6bb"} onPress={goBack} Title={"Sections"} />
      <ImageBackground source={Photoes.sectionBack}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
      <View style={Styles.containerList}>

        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }

        {
          route === "structure" ?
            <>
              {
                modules !== "" ?
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
                  </View> :
                  <View style={Styles.With90CenterVertical}>
                    <Text style={Styles.EmptyText}>
                      " No Sections defined
                    </Text>
                    <Text style={Styles.EmptyText}>
                      Add by pressing button below "
                    </Text>
                  </View>
              }
            </> :
            <>
              {
                modules !== "" ?
                  <View style={Styles.ItemsBoxDyb}>
                    {modules && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={modules}
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
                      " No Sections defined "
                    </Text>
                  </View>
              }
            </>
        }
      </View>
      {
        route === "structure" ?
          <FloatAddBtn onPress={onOpen} colors={["#ffadad", "#f67070", "#FF0000"]} /> : null}
      </ImageBackground>
      <AddModal ShowMessage={ShowMessage} Message={Message}
                numberValue={13} ChangeChecked={ChangeChecked}
                setvisibleAddModal={setvisibleAddModal} setCategoryId={setCategoryId}
                visibleAddModal={visibleAddModal} setShowMessage={setShowMessage}
                setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname}
                onPressAdd={AddSection} tittlebtn={"Add Section"} ShowButton={ShowButton} />
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />

    </Container>
  );
}

export default Project_Section;
