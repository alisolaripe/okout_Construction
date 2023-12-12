import React, { useState, useEffect } from "react";
import {
  Text,View,FlatList,TouchableOpacity,Image,Modal
} from "react-native";
import { Styles } from "../Styles";
import { Container } from "native-base";
import DYB_List_Item from "./DYB_List_Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { removeDataStorage } from "../Get_Location";
const GLOBAL = require("../Global");
const data = [
  { label: "Photos", value: "3", Icon: "images" },
  { label: "Location", value: "14", Icon: "location" },
];
let Filter_units='';
let Filter_sites='';
function UnitList({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);

  useEffect(() => {
    getUnits();
  }, []);
  const dateComparison_count =(a,b)=>{
    const date1 = a?.Count
    const date2 = b?.Count
    return date2 - date1;
  }
  const getUnits =async () => {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
      let A = [];
    if (json!==null) {
        Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
        Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);
        if (Filter_units?.units) {
          Filter_units?.units?.forEach((obj) => {
              A.push({
                Id: obj?.unitId,
                Name: obj?.unitName,
                Count: obj?.sectionCount,
                NameCount: 'section',
                task: obj?.task,
                ListName: 'Unit',
                address: obj?.address,
                geoLat: obj?.geoLat,
                geoLong: obj?.geoLong,
                cityName: GLOBAL.City?.cities?.find((p) => p?.cityId === obj?.address?.address_City)?.cityName,
                countryName: GLOBAL.Country?.countries?.find((p) => p?.countryId === obj?.address?.address_Country)?.countryName,
                postalCode: obj?.address?.address_Zip,
                street: obj?.address?.address_Street,
                sections:obj?.sections
              });
          });
          if(A?.length!==0) {
            A?.sort(dateComparison_count)
          }
          setmodules(A);
        }
      }

  };
  const SeeDetail = (Id) => {
    GLOBAL.UnitId = Id;
    navigation.navigate("SectionList");
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
      navigation.navigate("SiteList")
    }
    else {
      goBack()
    }
  }
  const renderItem = ({ item }) => (
    <DYB_List_Item  SeeDetail={SeeDetail} data={data} value={item}  Navigate_Url={Navigate_Url}/>
  );
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#ffc2b5','#fca795','#d1583b']} StatusColor={'#ffc6bb'} onPress={BackNavigation} Title={'Plots / Unites'}/>
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
                  " No Unites defined "
                </Text>
              </View>
          }
        </View>

      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}
export default UnitList;
