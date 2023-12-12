import React, { useState,useEffect } from "react";
import {
  Text,
  View,Modal,Image,TouchableOpacity
} from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
const GLOBAL = require("../Global");
const Api = require("../Api");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Header } from '../component/Header';
import {Footer1} from '../component/Footer';
import {AddModal} from '../component/AddModal'
import  Category_items_list  from "../component/Category_items_list";
import { FloatAddBtn } from "../component/FloatAddBtn";
import {writeDataStorage,removeDataStorage} from "../Get_Location";
import {  readOnlineApi } from "../ReadPostApi";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
const data = [
  { label: "Edit", value: "10", Icon: "edit" },
  { label: "Delete", value: "11", Icon: "trash" },
  { label: "Photos / Notes", value: "12", Icon: "level-down" },
  { label: "Change DYB", value: "13", Icon: "retweet" },
];
function Project_Features({ navigation, navigation: { goBack } }) {
  const [modules,setmodules] = useState([]);
  const [Message,setMessage] = useState('');
  const [ShowMessage, setShowMessage] = useState(false);
  const [Cheked,setCheked] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [visibleAddModal,setvisibleAddModal]=useState(false);
  const [Json,setJson]=useState([]);
  const [ShowMessageUpdate,setShowMessageUpdate]=useState(false);
  const [AddId,setAddId]=useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  useEffect(()=>{
    getFeatures()
  }, []);
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  const getDifference=(array1, array2)=> {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1?.featureId) === parseInt(object2?.featureId) &&object1.featureName === object2.featureName;
      });
    });
  }
  const SaveFeatures=async (A)=>{
    let List = [];
    List=modules;
    let Filter_sites=Json?.find((p)=>p?.projectId===GLOBAL.ProjectId)?.sites;
    let Filter_unit=Filter_sites?.find((p)=>p?.siteId===GLOBAL.SiteId)?.units;
    let Filter_section=Filter_unit?.find((p)=>p?.unitId===GLOBAL.UnitId)?.sections;
    let index_project=Json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
    let index_sites=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
    let index_unit=Filter_unit?.findIndex((p)=>p?.unitId===GLOBAL.UnitId);
    let index_section=Filter_section?.findIndex((p)=>p?.sectionId===GLOBAL.SectionId);
    let ListTotal=[...Json];
    let markers_sites = [...Filter_sites];
    let markers_unit = [...Filter_unit];
    let markers_section = [...Filter_section];
        let different=getDifference(A, List)
        let Exist=false
        different?.forEach((obj) => {
          Exist=List?.findIndex((p)=>p.featureId===obj.featureId)
        })
        if(Exist===-1) {
          let MakeList = [].concat(modules, different)
          markers_section[index_section] = { ...markers_section[index_section], features: MakeList };
          markers_unit[index_unit] = { ...markers_unit[index_unit], sections: markers_section };
          markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
          ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };
          writeDataStorage(GLOBAL.All_Lists,ListTotal)
        }
        else {
          markers_section[index_section] = { ...markers_section[index_section], features: A };
          markers_unit[index_unit] = { ...markers_unit[index_unit], sections: markers_section };
          markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
          ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };
          writeDataStorage(GLOBAL.All_Lists,ListTotal)
        }
  }
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo).then(json => {

      let A = [];
      let B=''

      let Filter_sites = json?.projects?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      let Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId);

      if(Filter_feature?.features) {
        Filter_feature?.features?.forEach((obj) => {
          if (obj.DYB === "n") {
            B = false;
          } else {
            B = true;
          }
          A.push({
            featureId: obj.featureId,
            featureName: obj.featureName,
            Boolean: B,
            DYB: obj.DYB,
            ListName: "DYB",
            FeatureNote: "",
            sectionId: GLOBAL.SectionId,
            task: "0",
          });
        });
        if (A?.length !== 0)
          setmodules(A);
        else
          setmodules('');
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
      }
    });
  };
  const getFeatures = async () => {
    let B = false;
    if(GLOBAL.isConnected===true) {
      {
        let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists))
        if (json!==null)
        {
          let A = [];
          let Filter_units = "";
          let Filter_sites = "";
          let Filter_section = "";
          let Filter_feature = "";
          Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
          Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
          Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
          Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId);
          if(Filter_feature?.features)
          {
            Filter_feature?.features?.forEach((obj) => {
              if (obj.DYB === "n") {
                B = false;
              } else {
                B = true;
              }
              A.push({
                featureId: obj.featureId,
                featureName: obj.featureName,
                Boolean: B,
                DYB: obj.DYB,
                ListName: "DYB",
                FeatureNote: "",
                sectionId: GLOBAL.SectionId,
                task: obj?.task,
              });
            });
            if(A?.length!==0) {
              A?.sort(dateComparison_count)
              setmodules(A);
            }
            else
              setmodules('');
          }
        }
        // readOnlineApi(Api.getFeatures+`&projectId=${GLOBAL.ProjectId}&siteId=${GLOBAL.SiteId}&unitId=${GLOBAL.UnitId}&sectionId=${GLOBAL.SectionId}&dyb=n`).then(json => {
        //   let A = [];
        //   json?.features?.forEach((obj) => {
        //     if (obj.DYB === "n") {
        //       B = false;
        //     } else {
        //       B = true;
        //     }
        //     A.push({
        //       featureId: obj.featureId,
        //       FeatureName: obj.featureName,
        //       Boolean: B,
        //       DYB: obj.DYB,
        //       ListName:'DYB',
        //       FeatureNote:'',
        //       sectionId:GLOBAL.SectionId,
        //       task:obj.task
        //
        //     });
        //   })
        //   setmodules(A);
        //   if(json?.features?.length===0) {
        //     setmodules('');
        //   }
        // });
      }

    }
    else {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists))

      if (json!==null) {
          setJson(json);
          let A = [];
          let Filter_units = "";
          let Filter_sites = "";
          let Filter_section = "";
          let Filter_feature = "";
          Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
          Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
          Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
          Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId);

          if(Filter_feature?.features)
          {
            Filter_feature?.features?.forEach((obj) => {
              if (obj.DYB === "n") {
                B = false;
              } else {
                B = true;
              }
              A.push({
                featureId: obj.featureId,
                featureName: obj.featureName,
                Boolean: B,
                DYB: obj.DYB,
                ListName: "DYB",
                FeatureNote: "",
                sectionId: GLOBAL.SectionId,
                task: obj?.task,
              });
            });
          }

          if(A?.length!==0) {
            A?.sort(dateComparison_count)
            setmodules(A);
          }
          else
            setmodules('');
        }
          let All_Sites = [];
          json?.forEach((obj) => {
            obj?.sites?.forEach((obj2) => {
              obj2?.units?.forEach((obj3) => {
                obj3?.sections?.forEach((obj4) => {
                  obj4?.features?.forEach((obj5) => {
                  All_Sites?.push(
                    { Id: obj5?.featureId },
                  );
                });
                });
              });
            });
          });
          All_Sites?.sort(dateComparison);
          setAddId(All_Sites);
        }
    }
  const dateComparison_count =(a,b)=>{
    const date1 = a?.Count
    const date2 = b?.Count
    return date2 - date1;
  }
  const dateComparison= (a,b)=>{
    const date1 = a?.Id
    const date2 = b?.Id
    return date1 - date2;
  }
  const UpdateFeature=(value,Cheked)=>{
    let switchDYB=''
    if(Cheked===true){
      switchDYB='y'
    }
    else {
      switchDYB='n'
    }
    var formdata = new FormData();
    formdata.append("featureName", value?.FeatureName);
    formdata.append("userId", "1");
    formdata.append("notes", value?.FeatureNote);
    formdata.append("featureId",GLOBAL.UpdateFeatureID);
    formdata.append("featureDYB",switchDYB);

    writePostApi("POST", Api.UpdateFeature,formdata).then(json => {

        if (json) {

          if (json?.status === true) {
            setMessage(json?.msg)
            setShowWarningMessage(false);
            setShowMessageUpdate(true)
            getAllProjectInfo()
          }
        }
        else  {
         let  List_Item =modules;
          let index = List_Item?.findIndex((p) => p.featureId === GLOBAL.UpdateFeatureID)
          let markers = [...List_Item];
          markers[index] ={...markers[index],featureName:value.FeatureName,Boolean:Cheked,DYB:switchDYB,};
          SaveFeatures(markers)
          setmodules(markers)
          setShowWarningMessage(false);
          setMessage('Your feature successfully updated')
          setShowMessageUpdate(true)

        }
      });

  }
  const UpdateFeature_DYB=(FeatureName,Cheked)=>{
    let switchDYB=''
    if(Cheked===true){
      switchDYB='y'
    }
    else {
      switchDYB='n'
    }
    var formdata = new FormData();
    formdata.append("featureName",FeatureName);
    formdata.append("userId", "1");
    formdata.append("notes",'');
    formdata.append("featureId",GLOBAL.UpdateFeatureID);
    formdata.append("featureDYB",switchDYB);
    writePostApi("POST", Api.UpdateFeature,formdata).then(json => {

      if (json) {

        if (json?.status === true) {
          setMessage(json?.msg)
          setShowMessageUpdate(true)
          getAllProjectInfo()
        }
      }
      else  {
        let  List_Item =modules;
        let index = List_Item?.findIndex((p) => p.featureId === GLOBAL.UpdateFeatureID)
        let markers = [...List_Item];
        markers[index] =  markers[index] ={...markers[index],Boolean:Cheked,DYB:switchDYB,};

        SaveFeatures(markers)
        setmodules(markers)
        setMessage('Your feature successfully updated')
        setShowMessageUpdate(true)

      }
    });

  }
  const DeleteFeature=()=>{
    var formdata = new FormData();
    formdata.append("userId", "1");
    formdata.append("notes",'value.Unitname');
    formdata.append("featureId", GLOBAL.FeatureIdDelete);
    writePostApi("POST",Api.DeleteFeature,formdata).then(json => {
        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg)
            setShowMessageDelete(true)
            getAllProjectInfo();
            const timerId = setInterval(() => {
              setShowMessageDelete(false)
            }, 4000)
            return () => clearInterval(timerId);

          }
        }
        else  {
          let List_Item =modules;
          let index = List_Item?.findIndex((p) => p.featureId === GLOBAL.FeatureIdDelete)
          let markers = [...List_Item];
          markers?.splice(index, 1);
          SaveFeatures(markers)
          setmodules(markers)
          Delete_Detail_Offline()
          setMessage('Your feature successfully deleted')
          setShowMessageDelete(true);
          const timerId = setInterval(() => {
            setShowMessageDelete(false);
          }, 4115);
          return () => clearInterval(timerId);
        }
      });
  }
  const Delete_Detail_Offline=async ()=>{
    let Modules = await AsyncStorage.getItem(GLOBAL.FeatureList_KEY)
    let Filter=JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId)!== parseInt(GLOBAL.FeatureIdDelete))
    let ModulesDetail = await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY)
    let FilterDetail=JSON.parse(ModulesDetail)?.filter((p) => parseInt(p.relatedId)!== parseInt(GLOBAL.FeatureIdDelete))
    await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(FilterDetail));
    await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(Filter));
  }
  const AddFeature =(value)=>{
    let switchDYB=''
    if(Cheked===true){
      switchDYB='y'
    }
    else {
      switchDYB='n'
    }
    var formdata = new FormData();
    formdata.append("projectId",GLOBAL.ProjectId);
    formdata.append("userId", "1");
    formdata.append("unitId",GLOBAL.UnitId);
    formdata.append("siteId",GLOBAL.SiteId);
    formdata.append("sectionId", GLOBAL.SectionId);
    formdata.append("featureName",value.FeatureName);
    formdata.append("notes",value.FeatureNote);
    formdata.append("DYB",switchDYB);
    writePostApi("POST", Api.CreateFeature, formdata).then(json => {
        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg)
            setShowMessage(true)
            getAllProjectInfo();
            setvisibleAddModal(false)
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 4125);
            return () => clearInterval(timerId);
          }

        }
        else  {
          let List_Item = [];
          let A=[];
          let Count=0;
          List_Item = modules;
          if (List_Item?.length !== 0) {
            A = [...List_Item];
          }
          if(AddId.length!==0)
            Count = parseInt(AddId[AddId?.length - 1]?.Id) + 1;
          else
            Count = Count + 1;
          A.push({
            featureId: Count.toString(),
            featureName:value.FeatureName,
            Boolean: Cheked,
            DYB: switchDYB,
            ListName:'DYB',
            sectionId:GLOBAL.SectionId,
            FeatureNote:'',
            task:'0'
          });
          List_Item = A;
          setmodules(List_Item)
          SaveFeatures(List_Item)
          setMessage('Your feature successfully added');
          setShowMessage(true);
          let All_Sites = [];
          json?.forEach((obj) => {
            obj?.sites?.forEach((obj2) => {
              obj2?.units?.forEach((obj3) => {
                obj3?.sections?.forEach((obj4) => {
                  obj4?.features?.forEach((obj5) => {
                    All_Sites?.push(
                      { Id: obj5?.featureId },
                    );
                  });
                });
              });
            });
          });
          All_Sites?.sort(dateComparison);
          setAddId(All_Sites);
          setvisibleAddModal(false)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      });
  }
  const ChangeChecked =() => {
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
      <Header colors={['#ffadad','#f67070','#FF0000']} StatusColor={'#ffadad'} onPress={goBack} Title={'Features'}/>
      <Content>

        <View style={Styles.containerList}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
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
          {
            modules!=='' ?
          <View style={[Styles.ItemsBox2]}>
            {modules && (
              modules?.map((item,index) =>{
                return (
                  <Category_items_list key={index} setShowMessage={setShowMessageUpdate} value={item} Navigate_Url={Navigate_Url} ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                                       Message={Message} onPress={UpdateFeature} data={data} UpdateFeature_DYB={UpdateFeature_DYB}
                                       ShowMessage={ShowMessageUpdate} tittlebtn={'Update Feature'} numberValue={16} onPressDelete={DeleteFeature}
                  />
                )})
            )}
          </View>:

              <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No Features defined
                </Text>
                <Text style={Styles.EmptyText}>
                  Add by pressing button below "
                </Text>
              </View>
          }
        </View>
      </Content>
      <FloatAddBtn onPress={onOpen} colors={['#ffadad','#f67070','#FF0000']}/>

          <AddModal  ShowMessage={ShowMessage} Message={Message}
                    numberValue={15}  ChangeChecked={ChangeChecked}
                    setvisibleAddModal={setvisibleAddModal}
                    visibleAddModal={visibleAddModal} setShowMessage={setShowMessage}
                    onPressAdd={AddFeature} tittlebtn={'Add Feature'}  setCheked={setCheked} Cheked={Cheked}/>


      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}


export default Project_Features;
