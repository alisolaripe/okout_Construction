import React, { useState } from "react";
import { Image, Linking, Modal, Platform, Text,TouchableOpacity, View,KeyboardAvoidingView } from "react-native";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeDataStorage } from "../Get_Location";

const GLOBAL = require("../Global");
function List_Items({index,value,ShowMessage,Message,ChangeChecked,setShowMessage,data,numberValue,tittlebtn,onPress,onPressDelete,Navigate_Url,CityList,CountryList,getCity,UpdateFeature_DYB,
                               cityId, setcityId,edit, setedit,ShowWarningMessage,setShowWarningMessage,
                               countryId, setcountryId,ShowButton}){


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
  const renderItem = (item,key) => {
    return (
      <View key={key} style={Styles.renderItemStyle}>
        <View style={{paddingLeft:7}}>
          <Entypo size={normalize(12)} color={Colors.withe}  name={item.Icon}  />
        </View>
        <Text style={[Styles.txt_leftDropdown]} >{item.label}</Text>
      </View>
    );
  };
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

      GLOBAL.UpdateProjectId = value.projectId;
      setName(value.projectName)

      setvisible(true);
    }
    else if (id === "2"|| id === "14") {
      if(id=== "14") {
        GLOBAL.UpdateSiteID = value.siteId;
        setShowUpdateModal(true);
        setName(value.siteName)
      }
      else {
        setName(value.siteName)
        GLOBAL.UpdateSiteID = value.siteId;
        setGeoAddressCountry(value?.countryName)
        setGeoAddressCity(value?.cityName)
        setcountryId(value?.coutryId)
        setcityId(value?.cityId)
        setGeoAddressPostalCode(value?.postalCode)
        setGeoAddressStreet(value?.street)
        setvisible(true);
      }


    }
    else if (id === "3"){
      GLOBAL.UpdateSiteID = value.siteId;
      Navigate_Url('Project_Site_Detail');
    }
    if (id === "4"||id==='15') {
      if(id==='15'){
        GLOBAL.UpdateUnitID = value.unitId;
        setShowUpdateModal(true);
        setName(value.unitName)
      }
      else {
        GLOBAL.UpdateUnitID = value.unitId;
        setName(value.unitName)
        setGeoAddressCountry(value?.countryName)
        setGeoAddressCity(value?.cityName)
        setcountryId(value?.coutryId)
        setcityId(value?.cityId)
        setGeoAddressPostalCode(value?.postalCode)
        setGeoAddressStreet(value?.street)
        setvisible(true);
      }
    }
    else if (id === "5") {
      GLOBAL.UnitIdDelete = value.unitId;
      setName(value.unitName)
      setshowModalDelete(true)
    }
    else  if (id === "6") {
      GLOBAL.UpdateUnitID = value.unitId;
      Navigate_Url('Project_Unit_Detail')
    }
    if(id==='7'){
      setName(value.sectionName)
      GLOBAL.UpdateSectionID=value.sectionId
      setvisible(true)
    }
    else if (id==='8') {
      GLOBAL.SectionIdDelete=value.sectionId
      setName(value.sectionName)
      setshowModalDelete(true);
    }
    else if (id==='9'){
      GLOBAL.UpdateSectionID=value.sectionId
      Navigate_Url('Project_Section_Detail')
    }
    if(id==='10'){
      GLOBAL.UpdateFeatureID=value.featureId
      setName(value.featureName)
      setvisible(true)
    }
    else if (id==='11') {
      GLOBAL.FeatureIdDelete=value.featureId;
      setName(value.featureName)
      setshowModalDelete(true);
    }
    else if (id==='12'){
      GLOBAL.DYB=value.DYB;
      GLOBAL.FeatureName=value.featureName;
      GLOBAL.UpdateFeatureID=value.featureId
      Navigate_Url('Project_Feature_List');
    }
    else if (id==='13'){
      GLOBAL.UpdateFeatureID=value.featureId
      setName(value.featureName)
      let B=''
      if (value.DYB === "n") {
        B = 'on';
       setCheked(true)
      } else {
        B  ='off';
        setCheked(false)
      }
      setDYBSatue(B);
      setchangeDYBbtn( true)
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

  return (
    <View index={index} style={Styles.ItemDetailBox}>
      <View style={[Styles.With90]}>
        {
          numberValue===3?
            <View   style={Styles.With65}>
              <Text onPress={() => {
                GLOBAL.ProjectId=value.projectId;
                Navigate_Url('Project_Sites');
              }}  style={[Styles.txt_left]}>{value.projectName}</Text>
              <View style={Styles.BtnListStyle}>
                <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
                  <TouchableOpacity  onPress={() => {
                    GLOBAL.ProjectId=value.projectId;
                    Navigate_Url('Project_Sites');
                  }} >
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Site : {value.siteCount}</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient  colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                  <TouchableOpacity onPress={()=>Navigate_Url('Task_managementStack')} >
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

            </View>:
            numberValue===4?
              <View   style={Styles.With65}>
                <Text onPress={() => {
                  GLOBAL.SiteId =value.siteId
                  Navigate_Url('Project_UnitsStack');
                }} style={[Styles.txt_left]}>{value.siteName}</Text>
                <View style={Styles.BtnListStyle}>
                    <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
                      <TouchableOpacity onPress={() => {
                        GLOBAL.SiteId =value.siteId
                        Navigate_Url('Project_UnitsStack');
                      }} >
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> unit : {value.unitCount}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                      <TouchableOpacity onPress={()=>Navigate_Url('Task_managementStack')} >
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  {/*// <View style={Styles.btnList2}>*/}
                  {/*//   <Text style={[Styles.txt_left2, { fontSize: normalize(12) }]}> Other : 2</Text>*/}
                  {/*// </View>*/}
                </View>
              </View>:
              numberValue===12?
                <View   style={Styles.With65}>
                  <Text onPress={() => {
                    GLOBAL.UnitId = value.unitId
                    Navigate_Url('Project_Section2');
                  }} style={[Styles.txt_left]}>{value.unitName}</Text>
                  <View style={Styles.BtnListStyle}>

                      <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
                        <TouchableOpacity onPress={() => {
                          GLOBAL.UnitId = value.unitId
                          Navigate_Url('Project_Section2');
                        }} >
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> section : {value.sectionCount}</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                      <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                        <TouchableOpacity onPress={()=>Navigate_Url('Task_managementStack')} >
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                  </View>
                </View>:
                numberValue===14?
                  <View   style={Styles.With65}>
                    <Text onPress={()=> {
                      GLOBAL.SectionId=value.sectionId;
                      Navigate_Url('Project_Features2');
                    }} style={[Styles.txt_left]}>{value.sectionName}</Text>
                    <View style={Styles.BtnListStyle}>

                        <LinearGradient   colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
                          <TouchableOpacity onPress={()=> {
                            GLOBAL.SectionId=value.sectionId;
                            Navigate_Url('Project_Features2');
                          }}>
                            <Text style={[Styles.txt_left2,{fontSize: normalize(14)}]}> feature : {value.featureCount}</Text>
                          </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient   colors={['#a39898','#786b6b','#382e2e']} style={Styles.btnList1}>
                          <TouchableOpacity onPress={()=>Navigate_Url('Task_managementStack')} >
                            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task: {value.task}</Text>
                          </TouchableOpacity>
                        </LinearGradient>

                    </View>
                  </View>:
                  numberValue===16?
                    <View   style={Styles.With65}>
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
                            <TouchableOpacity onPress={()=>Navigate_Url('Task_managementStack')} >
                              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> task : {value.task}</Text>
                            </TouchableOpacity>
                          </LinearGradient>
                      </View>
                    </View>
                    :null
        }
        <View style={{width:"35%"}}>
          <Dropdown
            containerStyle={Styles.DropDown}
            selectedTextStyle={Styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            data={data}
            maxHeight={300}
            activeColor={"#181b2c"}
            renderItem={renderItem}
            renderRightIcon={() => (
              <View style={Styles.DropDownIcon}>
                <AntDesign name="ellipsis1" size={normalize(20)} color={GLOBAL.OFFICIAL_WITE_COLOR} />
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
        visible={visible}
      >
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
            <TextInputI onChangeText={(value) => {
              onPress(value, Cheked);
            }}
                        numberValue={numberValue}
                        ChangeChecked={(value) => {
                        ChangeChecked(value);
                        }} ShowButton={ShowButton}
                        ShowMessage={ShowMessage}
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
                        tittlebtn={tittlebtn} />
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
                <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
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
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Modal>
    </View>
  );
}
export default List_Items
