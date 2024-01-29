import React,{useState,useEffect} from "react";
import { Text, View, Modal, TouchableOpacity, Image, FlatList } from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import normalize from "react-native-normalize/src/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {writeDataStorage,removeDataStorage} from "../Get_Location";
import LinearGradient from "react-native-linear-gradient";
import { Header } from '../component/Header';
import {Footer1} from '../component/Footer';
import {AddModal} from '../component/AddModal'
import  List_Items  from "../component/list_Items";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { writePostApi } from "../writePostApi";
import { readOnlineApi } from "../ReadPostApi";
import DYB_List_Item from "../component/DYB_List_Item";
import { UserPermission } from "../CheckPermission";
import { Warningmessage } from "../component/Warningmessage";
const GLOBAL = require("../Global");
const Api = require("../Api");
const data = [
  {label: "Edit",value: "7",Icon: "edit" },
  {label: "Delete",value: "8",Icon: "trash" },
];
const data_dyb = []
//{ label: "Pictures", value: "9", Icon: "images" },
function Project_Section({navigation, navigation: { goBack }}) {
  const [modules,setmodules] = useState([]);
  const [Message,setMessage] = useState('');
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Cheked,setCheked] = useState(false);
  const [visibleAddModal,setvisibleAddModal]=useState(false);
  const [Json,setJson]=useState([]);
  const [ShowMessageUpdate,setShowMessageUpdate]=useState(false);
  const [AddId,setAddId]=useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [route, setroute] = useState('');
  const [ShowButton, setShowButton] = useState(true);
  const [showWarning, setshowWarning] = useState(false);
  useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        setroute(GLOBAL.route)
        if(GLOBAL.route==='structure') {
          getSection();
        }
        else {
          getSection_dyb()
        }
      });
      return unsubscribe;


  }, []);
  const dateComparison_count =(a,b)=>{
    const date1 = a?.Count
    const date2 = b?.Count
    return date2 - date1;
  }
  const getSection_dyb = async () => {
    let json=JSON.parse (await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
    console.log(json,'json')
    let A=[];
    let Filter_units='';
    let Filter_sites='';
    let Filter_section='';
    if (json!==null) {
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId);
      if( Filter_section?.sections) {
        Filter_section?.sections?.forEach((obj) => {
          if (parseInt(obj.featureCount) !== 0) {
            A.push({
              Id:obj.sectionId,
              Name:obj.sectionName,
              features:obj.features,
              Count: obj.features?.length,
              NameCount:'feature',
              ListName:'Section',
              unitId: GLOBAL.UnitId,
              task: obj?.task,
            });
          }
        });
        if(A?.length!==0) {
          A?.sort(dateComparison_count)
          setmodules(A);
        }
      else
        setmodules('');
      }
    }

  };
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let A = [];
      let Filter_sites= json?.projects?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId);
        Filter_section?.sections?.forEach((obj) => {
          A.push({
            sectionId: obj.sectionId,
            sectionName: obj.sectionName,
            featureCount: obj.featureCount,
            task: obj?.task,
            ListName: "Section",
            unitId: GLOBAL.UnitId,
            features: obj.features,
          });
        });
      if(A?.length!==0)
        setmodules(A);
      else
        setmodules('');
      writeDataStorage(GLOBAL.All_Lists,json?.projects);
    });
  };
  const dateComparison= (a,b)=>{
    const date1 = a?.Id
    const date2 = b?.Id
    return date1 - date2;
  }
  const getSection = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists))
    if (json!==null) {
      let A = [];
      let Filter_units = "";
      let Filter_sites = "";
      let Filter_section = "";
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId);

      Filter_section?.sections?.forEach((obj) => {
        A.push({
          sectionId: obj.sectionId,
          sectionName: obj.sectionName,
          featureCount: obj.featureCount,
          task: obj?.task,
          ListName: "Section",
          unitId: GLOBAL.UnitId,
          features: obj.features,
        });
      });
      if(A?.length!==0)
        setmodules(A);
      else
        setmodules('');
    }
    if(GLOBAL.isConnected===false) {
      let All_Sites = [];
      json?.forEach((obj) => {
        obj?.sites?.forEach((obj2) => {
          obj2?.units?.forEach((obj3) => {
            obj3?.sections?.forEach((obj4) => {
              All_Sites?.push({ Id: obj4?.sectionId })})})})});
      All_Sites?.sort(dateComparison)
      setAddId(All_Sites);
    }

  };
  const getDifference=(array1, array2)=> {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.sectionId) === parseInt(object2.sectionId) &&object1.sectionName === object2.sectionName;
      });
    });
  }
  const SaveSection=async (A)=>{
      let List = [];
      List=modules;

    let Filter_sites=Json?.find((p)=>p?.projectId===GLOBAL.ProjectId)?.sites;
    let Filter_unit=Filter_sites?.find((p)=>p?.siteId===GLOBAL.SiteId)?.units;


    let index_project=Json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
    let index_sites=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
    let index_unit=Filter_unit?.findIndex((p)=>p?.unitId===GLOBAL.UnitId);

    let ListTotal=[...Json];
    let markers_sites = [...Filter_sites];
    let markers_unit = [...Filter_unit];
    let different=getDifference(A, List)
        let Exist=false
        different?.forEach((obj) => {
          Exist=List?.findIndex((p)=>p.sectionId===obj.sectionId)
        })
        if(Exist===-1) {
          let MakeList = [].concat(modules, different)
          markers_unit[index_unit] = { ...markers_unit[index_unit], sections: MakeList };
          markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
           ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };
          writeDataStorage(GLOBAL.All_Lists,ListTotal)
        }
        else {
          markers_unit[index_unit] = { ...markers_unit[index_unit], sections: A };
          markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
          ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };

         writeDataStorage(GLOBAL.All_Lists,ListTotal)
        }


  }

  const AddSection =(value)=>{
    setShowButton(false)
    var formdata = new FormData();
    formdata.append("sectionName", value.SectionName);
    formdata.append("userId", "1");
    formdata.append("notes", value.SectionNote);
    formdata.append("projectId", GLOBAL.ProjectId);
    formdata.append("unitId",GLOBAL.UnitId);
    formdata.append("siteId", GLOBAL.SiteId);

    writePostApi("POST", Api.CreateSection, formdata).then(json => {
        if (json) {
        if(json?.status===true)
        {
          setMessage(json?.msg);
          setShowMessage(true);
          setShowButton(true)
          getAllProjectInfo();
          setvisibleAddModal(false)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }}
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
            sectionId: Count.toString(),
            sectionName: value.SectionName,
            featureCount: '0',
            ListName:'Section',
            unitId:GLOBAL.UnitId,
            task:'0',
            features:[]
          });
          List_Item = A;
          setmodules(List_Item);
          SaveSection(List_Item);
          setMessage('Your section successfully added')
          setShowMessage(true)
          setvisibleAddModal(false)
          setShowButton(true)
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
          All_Sites?.sort(dateComparison)
          setAddId(All_Sites);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      });
  }
  const DeleteSection=(sectionName)=>{
    var formdata = new FormData();
    formdata.append("sectionName",sectionName);
    formdata.append("userId", "1");
    formdata.append("notes", 'value.Unitname');
    formdata.append("sectionId", GLOBAL.SectionIdDelete);
    writePostApi("POST", Api.DeleteSection,formdata).then(json => {
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
         let List_Item = modules;
          let index = List_Item?.findIndex((p) => p.sectionId === GLOBAL.SectionIdDelete)
          let markers = [...List_Item];
          markers?.splice(index, 1);
          setmodules(markers);
          SaveSection(markers);
          Delete_Detail_Offline()
          setMessage('Your unit successfully deleted')}
        setShowMessageDelete(true)
        const timerId=setInterval(() => {
          setShowMessageDelete(false)
        }, 4000)
        return () => clearInterval(timerId);
      });
  }
  const Delete_Detail_Offline=async ()=>{
    let Modules = await AsyncStorage.getItem(GLOBAL.SectionDetail_KEY)
    let Filter=JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId)!== parseInt(GLOBAL.SectionIdDelete))
    await AsyncStorage.setItem(GLOBAL.SectionDetail_KEY, JSON.stringify(Filter));
  }
  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };
  const Navigate_Url= (Url) => {
    if(Url==='ProfileStack') {
      UserPermission(GLOBAL.UserPermissionsList?.Profile).then(res => {
        if (res.view === "1") {
          navigation.navigate(Url);
        } else {
          setshowWarning(true);
        }
      });
    }
    else
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
  const Update_Off=(value)=>{
    let List_Item = modules;
    let index = List_Item?.findIndex((p) => p.sectionId === GLOBAL.UpdateSectionID)
    let markers = [...List_Item];
    markers[index] = { ...markers?.[index], sectionName: value.SectionName };
    setmodules(markers);
    SaveSection(markers)
  }
  const renderItem=({ item ,index})=>(
    <List_Items key={index} setShowMessage={setShowMessageUpdate} value={item} ShowWarningMessage={ShowWarningMessage}
                setShowWarningMessage={setShowWarningMessage} Update_Off={Update_Off}
                Navigate_Url={Navigate_Url} Message={Message} data={data} getAllProjectInfo={getAllProjectInfo}
                ShowMessage={ShowMessageUpdate} tittlebtn={'Update Section'} numberValue={14} onPressDelete={DeleteSection} ShowButton={ShowButton}
    />
  )
  const renderSectionHeader=()=>(
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
  )
  const renderSectionFooter=()=>(
    <View style={Styles.SectionFooter}/>
  )
  const SeeDetail=(Id)=>{
    GLOBAL.SectionId=Id;
    navigation.navigate("Project_Features2");
  }
  const renderItem_dyb = ({ item }) => (
    <DYB_List_Item data={data_dyb} value={item}
                   SeeDetail={SeeDetail} Navigate_Url={Navigate_Url} />
  );
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']} StatusColor={route==='structure'?"#ffadad":'#ffc6bb'}  onPress={goBack} Title={'Sections'}/>

        <View style={Styles.containerList}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          {showWarning===true&&  <Warningmessage/>}
          {
            route=== 'structure' ?
              <>
                {
                  modules !== '' ?
                    <View style={[Styles.Center_margin_Bottom3]}>
                      {modules && (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={modules}
                          style={{ width: '100%', flexGrow: 0 }}
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
                  modules !== '' ?
                    <View style={Styles.ItemsBoxDyb}>
                      {modules && (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={modules}
                          style={{ width: '100%' }}
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
        route==='structure'?
          <FloatAddBtn onPress={onOpen} colors={['#ffadad','#f67070','#FF0000']}/>:null}
      <AddModal  ShowMessage={ShowMessage} Message={Message}
                numberValue={13}  ChangeChecked={ChangeChecked}
                setvisibleAddModal={setvisibleAddModal}
                visibleAddModal={visibleAddModal} setShowMessage={setShowMessage}
                onPressAdd={AddSection} tittlebtn={'Add Section'} ShowButton={ShowButton}/>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}/>

    </Container>
  );
}
export default Project_Section;
