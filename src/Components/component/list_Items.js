import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Styles } from "../Styles";
import Entypo from "react-native-vector-icons/Entypo";
import normalize from "react-native-normalize/src/index";
import { Colors } from "../Colors";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import {  Content } from "native-base";
import { TextInputI } from "./TextInputI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { writePostApi } from "../writePostApi";
import MapView, { Marker } from "react-native-maps";
import { geocodePosition, requestLocationPermission } from "../Get_Location";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Api = require("../Api");
const GLOBAL = require("../Global");
let City=[]
function List_Items({index,value,ShowMessage,ChangeChecked,setShowMessage,data,numberValue,tittlebtn,onPress,onPressDelete,Navigate_Url,CityList,CountryList,getCity,UpdateFeature_DYB,
                              edit, setedit,ShowWarningMessage,setShowWarningMessage,setCategoryId,setSelectedcategory,
                      setTaskRelatedNameId,setselectedrelatedname,marker, setmarker,setCityList,setCountryList,
                              getAllProjectInfo,Update_Off,location,setGeoAddress,setLocation}){

  const [cityId,setcityId] = useState('');
  const [countryId,setcountryId] = useState('');
   const [Name, setName] = useState(false);
  const [Cheked,setCheked] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [changeDYBbtn, setchangeDYBbtn] = useState(false);
  const [DYBSatue, setDYBSatue] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [GeoAddressPostalCode, setGeoAddressPostalCode] = useState('');
  const [GeoAddressStreet, setGeoAddressStreet] = useState('');
  const [GeoAddressCountry, setGeoAddressCountry] = useState('');
  const [GeoAddressCity, setGeoAddressCity] = useState('');
  const [visible,setvisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [ShowMessageUpdate,setShowMessageUpdate]=useState(false);
  const [Message, setMessage] = useState("");
  const [ShowButton, setShowButton] = useState(true);
  const [showMap, setshowMap] = useState(false);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const screen = Dimensions.get('window');

  const ASPECT_RATIO = (screen.width / screen.height)/4;
  const LATITUDE_DELTA = 4;
  const LONGITUDE_DELTA =( LATITUDE_DELTA * ASPECT_RATIO)/2;

  const renderItem = (item,key) => {
    return (
      <View key={key} style={Styles.renderItemStyle}>
        <View style={{paddingLeft:7}}>
          <Entypo size={normalize(12)} color={Colors.borderButton}  name={item.Icon}  />
        </View>
        <Text style={[Styles.txt_leftDropdown]} >{item.label}</Text>
      </View>
    );
  };
  useEffect(()=>{

  },[]);

  const onChangeText_Press=(value, Cheked)=>{
    if(tittlebtn==='Update Project'){
      UpdateProject(value, Cheked)
    }
    else if(tittlebtn==='Update Sites'){
      UpdateSites(value, Cheked)
    } else if(tittlebtn==='Update Unit'){
      UpdateUnits(value, Cheked)
    }else if(tittlebtn==='Update Section'){
      UpdateSection(value, Cheked)
    }else if(tittlebtn==='Update Feature'){
      UpdateFeature(value, Cheked)
    }
  }
  const openMaps=(latitude,longitude)=> {
    if (Platform.OS === "android") {
      if(latitude && longitude) {
        Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
          .catch(err => console.error("An error occurred", err));
      }
    }
  }
  const ClickManagement =(id)=>{
    if (id === "1") {
// if(GLOBAL.UserPermissionsList?.Project?.edit==='1') {
  GLOBAL.UpdateProjectId = value.projectId;
  setName(value.projectName);
  setvisible(true);
// }
    }
    else if (id === "2"|| id === "14") {
      if(id=== "14") {
        // if(GLOBAL.UserPermissionsList?.Project?.edit==='1') {
          GLOBAL.UpdateSiteID = value.siteId;
          setShowUpdateModal(true);
          setName(value.siteName)
        // }
      }
      else {
        // if (GLOBAL.UserPermissionsList?.Project?.edit === '1') {
          setName(value.siteName)
          setLocation(value?.Location)
          GLOBAL.UpdateSiteID = value.siteId;
          setGeoAddressCountry(value?.countryName)
          setGeoAddressCity(value?.cityName)
          setcountryId(value?.coutryId)
          setcityId(value?.cityId)
          setGeoAddressPostalCode(value?.postalCode)
          setGeoAddressStreet(value?.street)
          setvisible(true);
        // }
      }

    }
    else if (id === "3"){
      GLOBAL.UpdateSiteID = value.siteId;
      Navigate_Url('Project_Site_Detail');
    }
    if (id === "4"||id==='15') {
      if(id==='15'){
        // if(GLOBAL.UserPermissionsList?.Project?.edit==='1') {
          GLOBAL.UpdateUnitID = value.unitId;
          setShowUpdateModal(true);
          setName(value.unitName)
        // }
      }
      else {

        // if (GLOBAL.UserPermissionsList?.Project?.edit === '1') {
          GLOBAL.UpdateUnitID = value.unitId;
          setName(value.unitName)
          setGeoAddressCountry(value?.countryName)
          setGeoAddressCity(value?.cityName)
          setcountryId(value?.coutryId)
          setcityId(value?.cityId)
          setGeoAddressPostalCode(value?.postalCode)
          setGeoAddressStreet(value?.street)
          setvisible(true);
          setLocation(value?.Location)

        }
      // }
    }
    else if (id === "5") {
      // if(GLOBAL.UserPermissionsList?.Project?.delete==='1') {
        GLOBAL.UnitIdDelete = value.unitId;
        setName(value.unitName)
        setshowModalDelete(true)
      // }
    }
    else  if (id === "6") {
      GLOBAL.UpdateUnitID = value.unitId;
      Navigate_Url('Project_Unit_Detail')
    }
    if(id==='7'){
      // if(GLOBAL.UserPermissionsList?.Project?.edit==='1') {
        setName(value.sectionName)
        GLOBAL.UpdateSectionID = value.sectionId
        setvisible(true)
      // }
    }
    else if (id==='8') {
      // if(GLOBAL.UserPermissionsList?.Project?.delete==='1') {
        GLOBAL.SectionIdDelete = value.sectionId
        setName(value.sectionName)
        setshowModalDelete(true);
      // }
    }
    else if (id==='9'){
      GLOBAL.UpdateSectionID=value.sectionId
      Navigate_Url('Project_Section_Detail')
    }
    if(id==='10'){
      // if(GLOBAL.UserPermissionsList?.Project?.edit==='1') {
        GLOBAL.UpdateFeatureID = value.featureId
        setName(value.featureName)
        setvisible(true)
      // }
    }
    else if (id==='11') {
      // if(GLOBAL.UserPermissionsList?.Project?.delete==='1') {
        GLOBAL.FeatureIdDelete = value.featureId;
        setName(value.featureName)
        setshowModalDelete(true);
      // }
    }
    else if (id==='12'){
      GLOBAL.DYB=value.DYB;
      GLOBAL.FeatureName=value.featureName;
      GLOBAL.UpdateFeatureID=value.featureId
      Navigate_Url('Project_Feature_List');
    }
    else if (id==='13'){
      // if(GLOBAL.UserPermissionsList?.Project?.edit==='1') {
        GLOBAL.UpdateFeatureID = value.featureId
        setName(value.featureName)
        let B = ''
        if (value.DYB === "n") {
          B = 'on';
          setCheked(true)
        } else {
          B = 'off';
          setCheked(false)
        }
        setDYBSatue(B);
        setchangeDYBbtn(true)
      // }
    }
    else if (id==='16'){
      GLOBAL.TaskRelatedNameId='0';
      GLOBAL.categoryId='1';
      GLOBAL.TaskName=value.projectName;
      GLOBAL.ProjectId=value.projectId;
      GLOBAL.TaskName=value.projectName;
      GLOBAL.RelatedName='project';
      GLOBAL.RelatedId=value.projectId;
      GLOBAL.Url_Navigate='Project_structure2'
      Navigate_Url("Task_managementStack2");

    }
    else if (id==='18'){
      GLOBAL.SiteId =value.siteId;
      GLOBAL.RelatedId=value.siteId
      GLOBAL.TaskName=value.siteName
      GLOBAL.RelatedName='site';
      GLOBAL.RelatedId=value.siteId;
      GLOBAL.TaskRelatedNameId='1';
      GLOBAL.categoryId='1';
      GLOBAL.Url_Navigate='Project_Sites'
      Navigate_Url("Task_managementStack2");

    }
    else if (id==='22'){
      GLOBAL.TaskRelatedNameId='2';
      GLOBAL.categoryId='1';
      GLOBAL.UnitId = value.unitId;
      GLOBAL.TaskName=value.unitName;
      GLOBAL.RelatedName='unit';
      GLOBAL.RelatedId=value.unitId;
      GLOBAL.Url_Navigate='Project_UnitsStack'
      Navigate_Url("Task_managementStack2");
    }
    else if (id==='19'){
      GLOBAL.TaskRelatedNameId='3';
      GLOBAL.categoryId='1';
      GLOBAL.SectionId=value.sectionId;
      GLOBAL.TaskName=value.sectionName;
      GLOBAL.RelatedName='section';
      GLOBAL.RelatedId=value.sectionId;
      GLOBAL.Url_Navigate='Project_SectionStack'
      Navigate_Url("Task_managementStack2");
    }
    else if (id==='20'){
      GLOBAL.TaskRelatedNameId='4';
      GLOBAL.categoryId='1';
      GLOBAL.UpdateFeatureID=value.featureId;
        GLOBAL.TaskName=value.featureName;
      GLOBAL.RelatedName='feature';
      GLOBAL.RelatedId=value.featureId;
      GLOBAL.Url_Navigate='Project_FeaturesStack'
      Navigate_Url("Task_managementStack2");
    }
  };
  const _changeDYBbtn = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={changeDYBbtn}
          avoKeyboard={true}
          onBackdropPress={() => setchangeDYBbtn( false)}
          transparent={true}
        >
          {renderchangeDYBbtnModalContent()}
        </Modal>
      </View>
    );
  };
  const renderchangeDYBbtnModalContent = () => (
    <View style={[Styles.DeleteModalStyle,{paddingVertical:normalize(25)}]}>
        <View style={Styles.With100NoFlex}>
          <Text style={Styles.txt_left2}>
            Do you want to Change {Name} DYB to {DYBSatue} mode?
          </Text>
        </View>
      <View style={Styles.With100Row}>
        <LinearGradient  colors={['#9ab3fd','#82a2ff','#4B75FCFF']} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => setchangeDYBbtn( false)} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient   colors={['#ffadad','#f67070','#FF0000']} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => {
            UpdateFeature_DYB(value.featureName,Cheked)
            setchangeDYBbtn( false)
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  ////////////////////////
  const UpdateProject = (value) => {
    setShowButton(false)
    var formdata = new FormData();
    formdata.append("projectName", value.Projectname);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.ProjectNote);
    formdata.append("projectId", GLOBAL.UpdateProjectId);
    writePostApi("POST", Api.UpdateProject, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json.msg);
          setShowMessageUpdate(true);
          setShowButton(true)
          setShowWarningMessage(false)
          getAllProjectInfo();
          setvisible(false);
          setShowMessageUpdate(false);
        }
      }
      else {
        Update_Off(value)
        setMessage("Your project successfully updated");
        setShowMessageUpdate(true);
        setShowButton(true)
        setvisible(false);
        setShowMessageUpdate(false);
      }
    });
  };
  const UpdateSites = (value) => {
    setShowButton(false)
    var formdata = new FormData();
    formdata.append("siteName", value.sitename);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.siteNote);
    formdata.append("siteId", GLOBAL.UpdateSiteID);
    formdata.append("geoLat", parseFloat(location?.latitude).toFixed(7));
    formdata.append("geoLong",parseFloat(location?.longitude).toFixed(7));
    formdata.append("postalCode",value.GeoAddressPostalCode);
    formdata.append("cityId",cityId);
    formdata.append("countryId",countryId);
    formdata.append("street",value.GeoAddressStreet);
    writePostApi("POST", Api.UpdateSite,formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json.msg);
          setShowWarningMessage(false)
          setShowMessageUpdate(true);
          setShowButton(true)
          getAllProjectInfo();
          setvisible(false);
          setShowMessageUpdate(false);
        }

      }
      else {
        Update_Off(value,GeoAddressCity,GeoAddressCountry)
        setShowWarningMessage(false)
        setMessage("Your site successfully updated");
        setShowMessageUpdate(true);
        setShowButton(true)
        setvisible(false);
        setShowMessageUpdate(false);

      }
    });
  };
  const UpdateUnits = (value) => {
    setShowButton(false)
    var formdata = new FormData();
    formdata.append("unitName", value.Unitname);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.UnitNote);
    formdata.append("unitId", GLOBAL.UpdateUnitID);
    formdata.append("geoLat", parseFloat(location?.latitude).toFixed(7));
    formdata.append("geoLong",parseFloat(location?.longitude).toFixed(7));
    formdata.append("postalCode",value.GeoAddressPostalCode);
    formdata.append("cityId",cityId);
    formdata.append("countryId",countryId);
    formdata.append("street",value.GeoAddressStreet);
    writePostApi("POST", Api.UpdateUnit,formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowWarningMessage(false);
          setShowMessageUpdate(true);
          setShowButton(true)
          getAllProjectInfo();
          setvisible(false);
          setShowMessageUpdate(false);
        }
      }
      else  {
        Update_Off(value,GeoAddressCity,GeoAddressCountry)
        setShowWarningMessage(false);
        setMessage('Your unit successfully updated')
        setShowMessageUpdate(true)
        setShowButton(true)
        setvisible(false);
        setShowMessageUpdate(false);
      }
    });
  };
  const UpdateSection=(value)=>{
    setShowButton(false)
    var formdata = new FormData();
    formdata.append("sectionName", value.SectionName);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.SectionNote);
    formdata.append("sectionId", GLOBAL.UpdateSectionID);
    writePostApi("POST", Api.UpdateSection,formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowWarningMessage(false);
          setShowMessageUpdate(true);
          setShowButton(true);
          getAllProjectInfo();
          setvisible(false);
          setShowMessageUpdate(false);
        }
      }
      else {
        Update_Off(value);
        setShowWarningMessage(false);
        setMessage('Your section successfully updated');
        setShowMessageUpdate(true);
        setShowButton(true);
        setvisible(false);
        setShowMessageUpdate(false);
      }
    });
  };
  const UpdateFeature=(value,Cheked)=>{
    let switchDYB=''
    if(Cheked===true){
      switchDYB='y'
    }
    else {
      switchDYB='n'
    }
    setShowButton(false);
    var formdata = new FormData();
    formdata.append("featureName", value?.FeatureName);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value?.FeatureNote);
    formdata.append("featureId",GLOBAL.UpdateFeatureID);
    formdata.append("featureDYB",switchDYB);
    writePostApi("POST", Api.UpdateFeature,formdata).then(json => {

      if (json) {

        if (json?.status === true) {
          setMessage(json?.msg)
          setShowWarningMessage(false);
          setShowMessageUpdate(true)
          setShowButton(true)
          getAllProjectInfo()
          setvisible(false);
          setShowMessageUpdate(false);
        }
      }
      else  {
        Update_Off(value,switchDYB)
        setShowWarningMessage(false);
        setMessage('Your feature successfully updated')
        setShowMessageUpdate(true)
        setShowButton(true)
        setvisible(false);
        setShowMessageUpdate(false);
      }
    });
  }
//////////////////////////
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
    <View style={Styles.DeleteModalStyle}>

      <View style={Styles.With100NoFlex}>
        <Image style={{width:'27%',aspectRatio:1,marginVertical:normalize(10)}}
               source={require("../../Picture/png/AlertImage.png")}
               resizeMode="contain" />
        <View style={Styles.With100NoFlex}>
          <Text style={Styles.txt_left2}>
            Do you want to delete {Name} from List?
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
            onPressDelete(Name);
            setshowModalDelete( false)
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  const getLocation =async (coordinate) => {
    requestLocationPermission().then(res => {
      if (res) {
        setLocation(coordinate);
        var NY = {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        };
        geocodePosition(NY).then(res => {
          if (res) {

            setGeoAddress(res?.[0]?.formattedAddress);
            setGeoAddressCountry(res?.[0]?.country);
            if(res?.[0]?.adminArea!==null)
            setGeoAddressCity(res?.[0]?.adminArea);
            if(res?.[0]?.postalCode!==null)
            setGeoAddressPostalCode(res?.[0]?.postalCode);
            if(res?.[0]?.streetName!==null)
            setGeoAddressStreet(res?.[0]?.streetName);
            getCountry_city(res?.[0]?.country, res?.[0]?.adminArea);
          } else {
            getCountry_city("United States", "California");
          }
        })
          .catch(err => console.log(err, "errrrr"));
      }})
  };
  const getCountry_city = async (country,adminArea) => {
    let A=[]
    GLOBAL.Country?.countries?.forEach((obj) => {
      if(obj?.countryName!=='') {
        A.push({
          value: obj?.countryId,
          label: obj?.countryName,
        });
      }
    });
    setCountryList(A);
    City=GLOBAL.City;
    let Default_countryId=A?.find((p)=>p?.label===country)?.value
    setcountryId(Default_countryId)
    if(Default_countryId!==''||Default_countryId!==null) {
      getCity3(Default_countryId,adminArea);
    }
  };
  const getCity3 = async (value,adminArea) => {

    let A = [];
    let City_filter=City?.cities?.filter((p)=>p?.coutryId===value)
    City_filter?.forEach((obj) => {
      if(obj?.cityName!=='') {
        A.push({
          value: obj?.cityId,
          label: obj?.cityName,
          coutryId:obj?.coutryId
        });
      }
    });
    setCityList(A);
    if(adminArea!==''){
      let Default_cityId= A?.find((p)=>p.label===adminArea)?.value
      setcityId(Default_cityId)
    }
  };
  return (
    <View index={index} style={Styles.ItemDetailBox}>
      <View style={[Styles.With90]}>
        {
          numberValue===3?
            <View   style={Styles.With70}>
              <Text onPress={() => {
                GLOBAL.ProjectId=value.projectId;
                Navigate_Url('Project_Sites');
              }}  style={[Styles.txt_left]}>{value.projectName}</Text>
              <View style={Styles.BtnListStyle}>
                <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnListfirst}>
                  <TouchableOpacity  onPress={() => {
                    GLOBAL.ProjectId=value.projectId;
                    Navigate_Url('Project_Sites');
                  }}>
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Site : {value.siteCount}</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient  colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnListfirst}>
                  {
                    value.task==='0'||value.task===0?
                      <View>
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>task : {value.task}</Text>
                      </View>:
                      <TouchableOpacity onPress={()=> {
                        GLOBAL.TaskName=value.projectName;
                        GLOBAL.RelatedName='project';
                        GLOBAL.RelatedId=value.projectId;
                        GLOBAL.TaskRelatedNameId='0';
                        GLOBAL.categoryId='1';
                        GLOBAL.ProjectId=value.projectId;
                        GLOBAL.Url_Navigate='Project_structure2'
                        Navigate_Url("Task_managementStack3");
                      }} >
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                      </TouchableOpacity>

                  }

                </LinearGradient>
                <LinearGradient colors={["#86449e", "#663378", "#4e275c"]} style={Styles.btnListfirst}>
                  <TouchableOpacity  onPress={() => {
                    GLOBAL.Projectdocinfo='project';
                    GLOBAL.SelectId=value.projectId;
                    Navigate_Url('DocmanagementStack2');
                  }}>
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Doc   </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

            </View>:
            numberValue===4?
              <View   style={Styles.With70}>
                <Text onPress={() => {
                  GLOBAL.SiteId =value.siteId
                  Navigate_Url('Project_UnitsStack');
                }} style={[Styles.txt_left]}>{value.siteName}</Text>
                <View style={Styles.BtnListStyle}>
                    <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnListfirst}>
                      <TouchableOpacity onPress={() => {
                        GLOBAL.SiteId =value.siteId
                        Navigate_Url('Project_UnitsStack');
                      }} >
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> unit : {value.unitCount}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnListfirst}>
                      {
                        value.task==='0'||value.task===0?
                          <View >
                            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>task : {value.task}</Text>
                          </View>:
                          <TouchableOpacity onPress={()=> {
                            GLOBAL.TaskName=value.siteName
                            GLOBAL.RelatedName='site';
                            GLOBAL.RelatedId=value.siteId;
                            GLOBAL.TaskRelatedNameId='1';
                            GLOBAL.categoryId='1';
                            GLOBAL.Url_Navigate='Project_Sites'
                            Navigate_Url("Task_managementStack3");
                          }} >
                            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                          </TouchableOpacity>
                      }

                    </LinearGradient>
                  <LinearGradient colors={["#86449e", "#663378", "#4e275c"]} style={Styles.btnListfirst}>
                    <TouchableOpacity  onPress={() => {
                      GLOBAL.Projectdocinfo='site';
                      GLOBAL.SelectId=value.siteId
                      Navigate_Url('DocmanagementStack2');
                    }}>
                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Doc   </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>:
              numberValue===12?
                <View   style={Styles.With70}>
                  <Text onPress={() => {
                    GLOBAL.UnitId = value.unitId
                    Navigate_Url('Project_Section2');
                  }} style={[Styles.txt_left]}>{value.unitName}</Text>
                  <View style={Styles.BtnListStyle}>

                      <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnListfirst}>
                        <TouchableOpacity onPress={() => {
                          GLOBAL.UnitId = value.unitId
                          Navigate_Url('Project_Section2');
                        }} >
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> section : {value.sectionCount}</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                      <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnListfirst}>
                        {
                          value.task==='0'||value.task===0?

                            <View >
                              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>task : {value.task}</Text>
                            </View>:
                          <TouchableOpacity onPress={()=> {
                          GLOBAL.TaskName=value.unitName;
                            GLOBAL.RelatedName='unit';
                            GLOBAL.RelatedId=value.unitId;
                            GLOBAL.TaskRelatedNameId='2';
                            GLOBAL.categoryId='1';
                            GLOBAL.UnitId = value.unitId;
                            GLOBAL.Url_Navigate='Project_UnitsStack'
                          Navigate_Url("Task_managementStack3");
                        }} >
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                          </TouchableOpacity>
                        }

                      </LinearGradient>
                    <LinearGradient colors={["#86449e", "#663378", "#4e275c"]} style={Styles.btnListfirst}>
                      <TouchableOpacity  onPress={() => {
                        GLOBAL.Projectdocinfo='unit';
                        GLOBAL.SelectId=value.unitId;
                        Navigate_Url('DocmanagementStack2');
                      }}>
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Doc  </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>:
                numberValue===14?
                  <View   style={Styles.With70}>
                    <Text onPress={()=> {
                      GLOBAL.SectionId=value.sectionId;
                      Navigate_Url('Project_Features2');
                    }} style={[Styles.txt_left]}>{value.sectionName}</Text>
                    <View style={Styles.BtnListStyle}>

                        <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnListfirst}>
                          <TouchableOpacity onPress={()=> {
                            GLOBAL.SectionId=value.sectionId;
                            Navigate_Url('Project_Features2');
                          }}>
                            <Text style={[Styles.txt_left2,{fontSize: normalize(14)}]}> feature : {value.featureCount}</Text>
                          </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnListfirst}>
                          {
                            value.task==='0'||value.task===0?
                              <View >
                                <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>task : {value.task}</Text>
                              </View>
                             :
                            <TouchableOpacity onPress={()=> {
                            GLOBAL.TaskName=value.sectionName;
                              GLOBAL.RelatedName='section';
                              GLOBAL.SectionId=value.sectionId;
                              GLOBAL.RelatedId=value.sectionId;
                              GLOBAL.TaskRelatedNameId='3';
                              GLOBAL.categoryId='1';
                              GLOBAL.Url_Navigate='Project_SectionStack'
                            Navigate_Url("Task_managementStack3");
                          }} >
                            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task: {value.task}</Text>
                            </TouchableOpacity>
                          }

                        </LinearGradient>
                      <LinearGradient colors={["#86449e", "#663378", "#4e275c"]} style={Styles.btnListfirst}>
                        <TouchableOpacity  onPress={() => {
                          GLOBAL.Projectdocinfo='section';
                          GLOBAL.SelectId=value.sectionId
                          Navigate_Url('DocmanagementStack2');
                        }}>
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Doc  </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>:
                  numberValue===16?
                    <View   style={Styles.With70}>
                      {
                        value.DYB!=='n'?
                          <Text onPress={()=> {
                            GLOBAL.DYB=value.DYB;
                            GLOBAL.FeatureName=value.featureName;
                            GLOBAL.UpdateFeatureID=value.featureId
                            Navigate_Url('Project_Feature_List');
                      }} style={[Styles.txt_left]}>
                            {value.featureName}</Text>
                          :
                          <Text style={[Styles.txt_left]}>{value.featureName}</Text>
                      }
                      <View style={Styles.DYB}>
                        {
                          value.DYB!=='n'?
                            <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList3}>
                              <TouchableOpacity onPress={()=> {
                                GLOBAL.route='DYB'
                                GLOBAL.UpdateFeatureID=value.featureId;
                                GLOBAL.DYB=value.DYB;
                                GLOBAL.FeatureName=value.featureName;

                                Navigate_Url('Project_Feature_List');
                              }}  style={Styles.With100DYBbtn} >
                                <Text  style={Styles.txtcenter}> DYB </Text>
                                <Entypo size={normalize(12)} color={'#fff'}  name={'check'} />
                              </TouchableOpacity>
                            </LinearGradient>
                            :
                            null
                        }
                          <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                            {
                              value.task==='0'||value.task===0?

                                <View >
                                  <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>task : {value.task}</Text>
                                </View>:
                                <TouchableOpacity onPress={()=> {
                                  GLOBAL.TaskName=value.featureName;
                                  GLOBAL.RelatedName='feature';
                                  GLOBAL.RelatedId=value.featureId;
                                  GLOBAL.TaskRelatedNameId='4';
                                  GLOBAL.UpdateFeatureID=value.featureId;
                                  GLOBAL.categoryId='1';
                                  GLOBAL.Url_Navigate='Project_FeaturesStack'
                                  Navigate_Url("Task_managementStack3");
                                }} >
                                  <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                                </TouchableOpacity>
                            }

                          </LinearGradient>
                        <LinearGradient colors={["#86449e", "#663378", "#4e275c"]} style={Styles.btnList4}>
                          <TouchableOpacity  onPress={() => {
                            GLOBAL.Projectdocinfo='feature'
                            GLOBAL.SelectId=value.featureId
                            Navigate_Url('DocmanagementStack2');
                          }}>
                            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Doc  </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                    :null
        }
        <View style={{width:"30%"}}>
          <Dropdown
            containerStyle={Styles.DropDown}
            selectedTextStyle={Styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            data={data}
            maxHeight={300}
            activeColor={'#f6f9f9'}
            renderItem={renderItem}
            renderRightIcon={() => (
              <View style={Styles.DropDownIcon}>
                <AntDesign name="ellipsis1" size={normalize(20)} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              </View>
            )}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {

              ClickManagement(item.value);
            }}
          />
        </View>
      </View>
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      {
        changeDYBbtn &&
        <View>
          {
            _changeDYBbtn()
          }
        </View>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <Content contentContainerStyle={[Styles.ViewItems_center, {
          flexGrow: 1,
          backgroundColor: "rgba(0,0,0, 0.5)",
          justifyContent: "center",
          zIndex:110
        }]}>
          <View style={[Styles.ModalStyle]}>
            <KeyboardAvoidingView style={[{ width: "90%", marginVertical: "4%" }]}>
              {ShowMessage === true ?
                <View style={Styles.flashMessageSuccsess}>
                  <View style={{ width: "80%" }}>
                    <Text style={Styles.AlertTxt}>
                      {Message}
                    </Text>
                  </View>
                </View>
                :
                null
              }
            </KeyboardAvoidingView>
            {
              showMap===false?
                <TextInputI onChangeText={(value) => {
                  onChangeText_Press(value, Cheked);
                }}
                            setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                            setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId}
                            Message={Message}
                            numberValue={numberValue}
                            ChangeChecked={(value) => {
                              ChangeChecked(value);
                            }}
                            setLocation={setLocation}
                            ShowButton={ShowButton}
                            ShowMessage={ShowMessageUpdate}
                            Name={Name} setShowMessage={setShowMessage} setvisible={setvisible}
                            ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                            GeoAddressStreet={GeoAddressStreet}
                            setCheked={setCheked}
                            CityList={CityList} CountryList={CountryList}
                            setGeoAddressCity={setGeoAddressCity} GeoAddressPostalCode={GeoAddressPostalCode}
                            GeoAddressCity={GeoAddressCity} GeoAddressCountry={GeoAddressCountry}
                            setGeoAddressCountry={setGeoAddressCountry}
                            setcountryId={setcountryId} setcityId={setcityId}
                            getCity={getCity}
                            geoLat={value?.geoLat}
                            geoLong={value?.geoLong}
                            Boolean={value?.Boolean}
                            setshowMap={setshowMap}
                            setLocation={setLocation}
                            location={location}
                            tittlebtn={tittlebtn} />:
                <View style={[Styles.ModalStyle]}>
                  <View style={[{ width: "89%", marginTop: "4%" }]}>
                    <TouchableOpacity onPress={() => {
                      setshowMap(false);
                    }} style={Styles.CancelBtnLeftAlign}>
                      <AntDesign name={"closecircleo"} size={20} color={"#4a6e8e"} />
                    </TouchableOpacity>
                  </View>
                  <MapView
                    style={Styles.map}
                    initialRegion={{
                      latitude:parseFloat(location?.latitude) ,
                      longitude: parseFloat(location?.longitude),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    // onPress={(e) => setmarker({ marker: e.nativeEvent.coordinate })}
                    onPress={(e) => {
                      setmarker({coordinate: e.nativeEvent.coordinate})
                      getLocation(e.nativeEvent.coordinate)
                    }}
                    mapType="standard"
                    zoomEnabled={true}
                    pitchEnabled={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}
                  >
                    {marker!=='' ?
                      <Marker coordinate={marker?.coordinate} />:null}
                  </MapView>
                </View>
            }

          </View>
        </Content>
      </Modal>
      <Modal
        transparent={true}
        visible={ShowUpdateModal}
        avoKeyboard={true}
        >
        <Content contentContainerStyle={[Styles.centeredView, {
          flexGrow: 1,
          backgroundColor: "rgba(0,0,0, 0.5)",
          justifyContent: "center",
        }]}>
          <View style={[Styles.ModalLocationStyle]}>
            <View style={[{ width: "89%", marginBottom: "4%" }]}>
              <TouchableOpacity onPress={() => {
                setShowUpdateModal(false);
              }} style={Styles.CancelBtnLeftAlign}>
                <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              </TouchableOpacity>
            </View>
            <View style={Styles.formContainer}>
              <View style={Styles.InputeRowItems2}>
                <Text
                  style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>Street</Text>
                <View
                  style={[Styles.inputStyleLocation]}>
                  <Text numberOfLines={3} style={[Styles.txtLightColor]}>{value?.street}</Text>
                </View>
              </View>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text
                    style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>Country</Text>
                  <View
                    style={[Styles.inputStyleLocation]}>
                    <Text style={[Styles.txtLightColor]}>{value?.countryName}</Text>
                  </View>
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text
                    style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>City</Text>
                  <View
                    style={[Styles.inputStyleLocation]}>
                    <Text style={[Styles.txtLightColor]}>{value?.cityName}</Text>
                  </View>
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>postal code</Text>
                  <View style={[Styles.inputStyleLocation]}>
                    <Text style={[Styles.txtLightColor]}>{value?.postalCode}</Text>
                  </View>
                </View>
                {
                  value?.geoLat&&value?.geoLong?
                    <TouchableOpacity onPress={()=>openMaps(value?.geoLat,value?.geoLong)} style={Styles.InputeRowItems}>
                      <View style={Styles.InputeRowLocation}>
                        <MaterialCommunityIcons
                          style={Styles.icon_Location}
                          color="#fff"
                          name="map-search-outline"
                          size={14}
                        />
                        <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Lat & Long

                          <Text style={Styles.txtLightColor_samall}>  (click here)</Text>
                        </Text>
                      </View>
                      <View
                        style={Styles.inputStyleLocation}>
                        { value?.geoLat&&value?.geoLong?
                          <Text style={Styles.txtLightColorLocation}>{value?.geoLat} , {value?.geoLong}</Text>:
                          <Text style={Styles.txtLightColorLocation}></Text>
                        }

                      </View>
                    </TouchableOpacity>:

                    <View  style={Styles.InputeRowItems}>
                      <View style={Styles.InputeRowLocation}>
                        <MaterialCommunityIcons
                          style={Styles.icon_Location}
                          color="#fff"
                          name="map-search-outline"
                          size={14}
                        />
                        <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Lat & Long
                        </Text>
                      </View>
                      <View
                        style={Styles.inputStyleLocation}>
                          <Text style={Styles.txtLightColorLocation}></Text>
                      </View>
                    </View>
                }

              </View>
            </View>
          </View>
        </Content>
      </Modal>
    </View>
  );
}
export default List_Items
