import React,{useState,useEffect} from "react";
import { Text,View,FlatList,TouchableOpacity,Modal,Image } from "react-native";
import { Styles } from "../Styles";
import { Container} from "native-base";
import DYB_List_Item from './DYB_List_Item';
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { removeDataStorage } from "../Get_Location";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GLOBAL = require("../Global");
const data=[
];
const Api = require("../Api");
function SectionList({navigation, navigation: { goBack }}) {
  const [modules,setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  useEffect(()=>{
    getSection()

  }, []);
  const dateComparison_count =(a,b)=>{

    const date1 = a?.Count
    const date2 = b?.Count
    return date2 - date1;
  }
  const getSection = async () => {
    // if(GLOBAL.isConnected===true) {
    //   readOnlineApi(Api.getSections+ `&projectId=${GLOBAL.ProjectId}&siteId=${GLOBAL.SiteId}&unitId=${GLOBAL.UnitId}`).then(json => {
    //     let A=[];
    //     json?.Sections?.forEach((obj) => {
    //       if(parseInt(obj.featureCount)!==0) {
    //         A.push({
    //           Id: obj.sectionId,
    //           Name: obj.sectionName,
    //           features: obj.features,
    //           Count: obj.featureCount,
    //           NameCount: 'feature',
    //           task: obj.task,
    //           ListName:'Section',
    //           unitId:GLOBAL.UnitId
    //         });
    //       }
    //     })
    //     if(A?.length!==0) {
    //       A?.sort(dateComparison_count)
    //     }
    //     setmodules(A);
    //     if(json?.Sections?.length===0) {
    //       setmodules('');
    //     }
    //   });
    // }
    //
      let json=JSON.parse (await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
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
                  Id: obj.sectionId,
                  Name: obj.sectionName,
                  features: obj.features,
                  Count: obj.featureCount,
                  NameCount: 'feature',
                  ListName: 'Section',
                  unitId: GLOBAL.UnitId,
                  task: obj?.task,
                });
              }
            });
            if(A?.length!==0) {
              A?.sort(dateComparison_count)
            }
            setmodules(A);
          }
        }

  };
  const SeeDetail=(Id)=>{
    GLOBAL.SectionId=Id;
    navigation.navigate("DYB");
  }
  const renderItem = ({ item }) => (
    <DYB_List_Item data={data} value={item}
                   SeeDetail={SeeDetail} Navigate_Url={Navigate_Url} />
  );
  const BackNavigation=()=>{
   if(GLOBAL.Navigation==='DYBStack2'){
     navigation.navigate("UnitList")
   }
   else {
     goBack()
   }
  }
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
      <Header colors={['#ffc2b5','#fca795','#d1583b']} StatusColor={'#ffc6bb'}
              onPress={BackNavigation} Title={'Sections'}/>
      <View style={Styles.containerList}>
        {
          showModalDelete &&
          <View>
            {
              _showModalDelete()
            }
          </View>
        }
        {
          modules!=='' ?
        <View style={Styles.ItemsBoxDyb}>
          {modules && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={modules}
              style={{width:'100%'}}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
            />
          )}
        </View>:
            <View style={Styles.With90CenterVertical}>
              <Text style={Styles.EmptyText}>
                " No Sections defined "
              </Text>
            </View>
        }
      </View>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}
export default SectionList;
