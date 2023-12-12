import React, {useState,useEffect} from "react";
import {
  Text,
  View,
  FlatList, Modal, TouchableOpacity, Image,
} from "react-native";
import { Styles } from "../Styles";
import {Container } from "native-base";
const GLOBAL = require("../Global");
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Header} from "../component/Header";
import {Footer1} from "../component/Footer";
import {removeDataStorage} from "../Get_Location";
import DYB_List_Item from "./DYB_List_Item";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
const data = []
function PojectList({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  useEffect(() => {
      getProjects();
    get_Country_City()
  }, []);
  const dateComparison_count =(a,b)=>{
    const date1 = a?.Count
    const date2 = b?.Count
    return date2 - date1;
  }
  const getProjects = async () => {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
    if (json!==null) {
          let A = [];
          json?.forEach((obj) => {
              A.push({
                Id: obj.projectId,
                Name: obj.projectName,
                Count: obj.siteCount,
                NameCount: "site",
                ListName: "Project",
                notes: obj?.notes,
                task: '0'
              });
          });
          if(A?.length!==0) {
            A?.sort(dateComparison_count)
          }
          setmodules(A);

        }
  };
  const get_Country_City=async ()=>{
    GLOBAL.Country =JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Country));
    GLOBAL.City =JSON.parse(await AsyncStorage.getItem(GLOBAL.All_City));
  }
  const SeeDetail = (Id) => {
    GLOBAL.ProjectId = Id;
    navigation.navigate("SiteList");
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

  const BackNavigation=()=>{
    if(GLOBAL.Navigation==='DYBStack2'){
      navigation.navigate("Home")
    }
    else {
      goBack()
    }
  }
  const renderItem = ({ item }) => (
    <DYB_List_Item data={data} value={item}  SeeDetail={SeeDetail}
                   Navigate_Url={Navigate_Url}/>
  );
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#ffc2b5','#fca795','#d1583b']} StatusColor={'#ffc6bb'} onPress={BackNavigation} Title={'Construction Projects'}/>
        <View style={[Styles.containerList]}>
          <View style={{width:'100%',alignItems:'center'}}>
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
                  data={modules}
                  showsVerticalScrollIndicator={false}
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
                    " No Project defined "
                  </Text>
                </View>
            }
          </View>
        </View>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>

  );
}

export default PojectList;
