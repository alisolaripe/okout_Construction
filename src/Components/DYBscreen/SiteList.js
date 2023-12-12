import React, { useState, useEffect } from "react";
import {
  View,FlatList,Text,Modal,TouchableOpacity,Image
} from "react-native";
import { Styles } from "../Styles";
import { Container } from "native-base";
import DYB_List_Item from "./DYB_List_Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Footer1 } from "../component/Footer";
import { Header } from "../component/Header";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { removeDataStorage } from "../Get_Location";
const GLOBAL = require("../Global");
const Api = require("../Api");
const data = [
  {label: "Photos",value: "2",Icon: "images" },
  {label: "Location",value: "14",Icon: "location" },
];
function SiteList({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  useEffect(() => {
      getSites();
  }, []);
  const dateComparison_count =(a,b)=>{

    const date1 = a?.Count
    const date2 = b?.Count

    return date2 - date1;
  }
  const getSites = async () => {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
        let A =[];
    if (json!==null) {
          let Site_List= json?.find((p) => p?.projectId === GLOBAL.ProjectId)
          if (Site_List?.sites) {
            Site_List?.sites?.forEach((obj) => {
                A.push({
                  Id: obj.siteId,
                  Name: obj.siteName,
                  Count: obj.unitCount,
                  NameCount: "unit",
                  task: '0',
                  ListName: "Site",
                  address: obj?.address,
                  geoLat: obj?.geoLat,
                  geoLong: obj?.geoLong,
                  cityName: GLOBAL.City?.cities?.find((p) => p?.cityId === obj?.address?.address_City)?.cityName,
                  countryName: GLOBAL.Country?.countries?.find((p) => p?.countryId === obj?.address?.address_Country)?.countryName,
                  postalCode: obj?.address?.address_Zip,
                  street: obj?.address?.address_Street,
                  units: obj?.units,
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
      GLOBAL.SiteId = Id;
      navigation.navigate("UnitList");

  };
  const renderItem = ({ item }) => (
    <DYB_List_Item data={data} value={item}  SeeDetail={SeeDetail}
                   Navigate_Url={Navigate_Url}/>
  );

  const BackNavigation=()=>{
    if(GLOBAL.Navigation==='DYBStack2'){
      navigation.navigate("PojectList2")
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
      <Header colors={['#ffc2b5','#fca795','#d1583b']} StatusColor={'#ffc6bb'} onPress={BackNavigation} Title={'Sites / Buildings'}/>

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
              " No Sites defined "
            </Text>
          </View>
          }
        </View>

      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}


export default SiteList;
