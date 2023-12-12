import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,Linking,Platform
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Styles } from "../Styles";
import { CheckBox } from "native-base";
import normalize from "react-native-normalize";
import { ButtonI } from "./ButtonI";
const GLOBAL = require("../Global");
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import { Dropdown,MultiSelect } from "react-native-element-dropdown";
let numOfLinesCompany = 0;
function TextInputI({ GeoAddressCity,
                      GeoAddressCountry,
                      GeoAddressStreet,GeoAddressPostalCode,
                      CityList,CountryList,location,
                      Version,
                      onChangeText,
                      setCheked,
                      numberValue,
                      Name,
                      tittlebtn,
                      ChangeChecked,
                      Cheked,
                      Pinrecovery,
                      emailOnpress,
                      featureName,Boolean,Btn,iconcheck,checkOrgCode,
                      setGeoAddressCity,setGeoAddressCountry,
                       setvisible,
                      setcountryId,setcityId,getCity,geoLat,geoLong,setShowMessage,
                      setSelectedcategory,selectedcategory,Taskcategory,value,Taskassigned,setSelectedassigned,selectedassigned,
                      Taskpriority,selectedpriority,setSelectedpriority,setOpen,setdateType
                      ,DateFormatplanend,DateFormatplanstart,Taskstatus,selectedstatus, setSelectedstatus,
                      selecteduser,setSelecteduser,Taskuser,setUserId,setCategoryId,setRelatedId,setParentTaskId,setPriorityId,setTaskStatusId,
                      Task_RelatedList,TaskRelated,selectedrelated,setSelectedrelated,error
                    }) {
  const { navigate } = useNavigation();
  const [securetText, setSecuretText] = useState(true);
  const [iconsecuret, setIconsecuret] = useState("eye-off");
  const [isFocus, setIsFocus] = useState(false);
  const [switchDYB, setswitchDYB] = useState(false);
  const [switchDYB2, setswitchDYB2] = useState(false);
  const [isFocusassigned, setIsFocusassigned] = useState(false);
  const [isFocuspriority, setIsFocuspriority] = useState(false);
  const [isFocusrelated, setIsFocusrelated] = useState(false);
  const [isFocususer, setIsFocususer] = useState(false);
  const [isFocusstatus, setIsFocusstatus] = useState(false);
  const validationSchema1 = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .required("please! email?")
      .email("well that's not an email"),
    password: Yup.string()
      .required()
      .min(8, "password should be at least 8 characters long."),
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const validationSchema2 = Yup.object().shape({
    UserName: Yup.string().required(),
    FullName: Yup.string().required(),
    orgkey: Yup.string().matches(new RegExp("[0-9]")).required("please! Orgkey?"),
    password: Yup.string()
      .required()
      .min(4, "pretty sure this will be hacked"),
  });
  const validationSchema3 = Yup.object().shape({
    Projectname: Yup.string()
      .required("ProjectName ! Please?")

  });
  const validationSchema12 = Yup.object().shape({
    SectionName: Yup.string()
      .required("SectionName ! Please?")
  });
  const validationSchema14 = Yup.object().shape({
    Unitname: Yup.string()
      .required("UnitName ! Please?"),
    GeoAddressStreet: Yup.string()
      .required("StreetName ! Please?"),
    GeoAddressPostalCode: Yup.string()
      .required("PostalCode! Please?"),
    UnitNote: Yup.string()
      .required("UnitNote ! Please?")

  });
  const validationSchema13 = Yup.object().shape({
    SectionName: Yup.string()
      .required("SectionName ! Please?")

  });
  const validationSchema15 = Yup.object().shape({
    FeatureName: Yup.string()
      .required("FeatureName ! Please?")

  });
  const validationSchema4 = Yup.object().shape({
    sitename: Yup.string()
      .required("ProjectSite Name ! Please?"),
    GeoAddressStreet: Yup.string()
      .required("StreetName ! Please?"),
    GeoAddressPostalCode: Yup.string()
      .required("PostalCode! Please?"),
  });
  const validationSchema6 = Yup.object().shape({
    username: Yup.string()
      .required("please! username?")
     ,
    password: Yup.string()
      .required()
      .min(4, "pretty sure this will be hacked"),
    orgkey: Yup.string().
   matches(new RegExp("[0-9]")).required("please! Orgkey?").min(8, "too short").max(9,'too long')

  });
  const validationSchema7 = Yup.object().shape({
    password: Yup.string()
      .required()
      .min(4, "pretty sure this will be hacked"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const validationSchema5 = Yup.object().shape({
    Title: Yup.string()
      .required("task Title ! Please?"),
    TaskNote: Yup.string()
      .required("Description ! Please?"),
  });
  const width = Dimensions.get("screen").width;
  const inputStyle = {
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width: '100%',
    paddingVertical: 4,
    color: '#fff',
  };
  const inputStyleProfile = {
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width: '100%',
    paddingVertical: 4,
    color: '#fff',
    backgroundColor: GLOBAL.OFFICIAL_background
  };
  const inputStyleLocation = {
    borderWidth:1,
    borderColor:'#1e233b',
    borderRadius:normalize(6),
    backgroundColor:'#1e233b',
    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(8),
    paddingVertical: 4,
  };
  const onpress = () => {
    if (securetText === false) {
      setSecuretText(true);
      setIconsecuret("eye-off");
    } else {
      setSecuretText(false);
      setIconsecuret("eye");
    }
  };
  useEffect(()=>{
    if(Boolean) {
      setCheked(Boolean);
      setswitchDYB2(Boolean);
    }
  },[]);
  const ClearDate=()=>{
    setGeoAddressCity('')
  }
  const renderItem_Location = (item,value) => {
    return (
      <View style={Styles.item_dropdownLocation}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={Styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
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
  };
  // /////check Input Value change or not:project////////////////
  //
  // const  string_equality1=(values)=>{
  //     if (values?.Projectname === Name) {
  //       setvisible(false);
  //       setShowMessage(false);
  //     }
  //   else {
  //     setShowWarningMessage(true);
  //   }
  // }
  // /////check Input Value change or not:site////////////////
  // const  string_equality_site=(values)=>{
  //   console.log(values,'values')
  //   if(values?.sitename!==Name||values?.GeoAddressPostalCode!==GeoAddressPostalCode||values?.GeoAddressStreet!==GeoAddressStreet||
  //     values?.GeoAddressCountry!==GeoAddressCountry||values?.GeoAddressCity!==GeoAddressCity){
  //     setShowWarningMessage(true);
  //   }
  //   else {
  //     setvisible(false);
  //     setShowMessage(false);
  //   }
  // }
  // /////check Input Value change or not:unit////////////////
  // const  string_equality_unit=(values)=>{
  //   console.log(values,'values')
  //   console.log(values?.GeoAddressStreet,'values?.GeoAddressPostalCode')
  //   console.log( GeoAddressStreet,' GeoAddressStreet')
  //   console.log(   values?.GeoAddressCountry,'   values?.GeoAddressCountry')
  //   console.log( GeoAddressCountry,' GeoAddressCountry')
  //   console.log(   values?.GeoAddressCity,'   values?.GeoAddressCity')
  //   console.log( GeoAddressCity,' GeoAddressCity')
  //   //values?.GeoAddressPostalCode !== GeoAddressPostalCode ||
  //     if (values?.Unitname !== Name ||  values?.GeoAddressStreet !== GeoAddressStreet ||
  //       values?.GeoAddressCountry !== GeoAddressCountry || values?.GeoAddressCity !== GeoAddressCity) {
  //       setShowWarningMessage(true);
  //     }
  //   else {
  //     setvisible(false);
  //     setShowMessage(false);
  //       setShowWarningMessage(false);
  //   }
  // }
  // /////check Input Value change or not:unit////////////////
  // const  string_equality_section=(values)=>{
  //   console.log(values,'values')
  //   if(values?.SectionName!==Name){
  //     setShowWarningMessage(true);
  //   }
  //   else {
  //
  //     setvisible(false);
  //     setShowMessage(false);
  //   }
  // }
  // /////check Input Value change or not:unit////////////////
  // const  string_equality_feature=(values)=>{
  //   console.log(values,'values')
  //   if(values?.FeatureName!==Name||values?.switchDYB!==switchDYB2){
  //     setShowWarningMessage(true);
  //   }
  //   else {
  //
  //     setvisible(false);
  //     setShowMessage(false);
  //   }
  // }
  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={Styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const renderItem_status = item => {
    return (
      <View style={Styles.item_status}>

        <View style={{width:'80%'}}>
          <Text style={Styles.textItem}>{item.label}</Text>
        </View>
        <View style={[
          Styles.Task_satus,{backgroundColor:item?.statusColorCode,}
        ]}>
          <Text style={Styles.textItem_status}>{item.statusClass}</Text>
        </View>
      </View>
    );
  };
  if (numberValue === 1) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Projectname: "",
            ProjectNote:""
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema3}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Project Name</Text>
              <TextInput
                value={values.Projectname}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("Projectname")}
                onFocus={() => setFieldTouched("Projectname")}
                placeholderTextColor={'#fff'} />
              {touched.Projectname && errors.Projectname &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Projectname}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.ProjectNote}

                onChangeText={handleChange("ProjectNote")}
                onFocus={() => setFieldTouched("ProjectNote")}
                multiline={true}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                placeholderTextColor={'#fff'} />
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),

                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 3) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Projectname:Name,
            ProjectNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema3}>
          {({ values, handleChange, errors,setFieldTouched, touched, handleSubmit}) => (
            <View style={{width:'90%'}}>
                <TouchableOpacity onPress={() => {
                  // string_equality1(values)
                  setvisible(false);
                 setShowMessage(false);
                }} style={Styles.CancelBtnLeftAlign2}>
                  <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
                </TouchableOpacity>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Project New Name</Text>
              <TextInput
                value={values.Projectname}
                style={[inputStyle,{paddingVertical:6}]}
                onChangeText={handleChange("Projectname")}
                onFocus={()=> {
                  setFieldTouched("Projectname");
                }}

                placeholderTextColor={'#fff'}/>
              {touched.Projectname&&errors.Projectname &&
              <Text style={{fontSize:12,color:"#FF0D10"}}>{errors.Projectname}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Display note</Text>
              <TextInput
                value={values.ProjectNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("ProjectNote")}
                onFocus={() => setFieldTouched("ProjectNote")}

                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),

                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

/////////////Project////////////////

  else if (numberValue === 2) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            sitename: "",
            note:"",
            GeoAddressPostalCode:'',
            GeoAddressStreet:''
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema4}>
          {({ values,handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Sites Name</Text>
              <TextInput
                value={values.sitename}
                style={[inputStyle ]}
                onChangeText={handleChange("sitename")}
                onFocus={() => setFieldTouched("sitename")}
                placeholderTextColor={'#fff'}
              />
              {touched.sitename && errors.sitename &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.sitename}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Street Address</Text>
              <TextInput
                value={values.GeoAddressStreet}
                style={[inputStyle,{paddingVertical:'3%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("GeoAddressStreet")}
                onFocus={() => setFieldTouched("GeoAddressStreet")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.GeoAddressStreet && errors.GeoAddressStreet &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressStreet}</Text>
              }

              <View style={Styles.InputeRow}>

                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Country</Text>
                  <Dropdown
                    style={[Styles.dropdownLocationAdd]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CountryList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCountry}
                    value={GeoAddressCountry}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGeoAddressCountry(item.label);
                      setIsFocus(false);
                      setcountryId(item.value);
                      getCity(item.value);
                      ClearDate();
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>City</Text>
                  <Dropdown
                    style={GeoAddressCity!==''?Styles.dropdownLocationAdd:Styles.dropdownLocationErrorAdd}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CityList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCity}
                    value={GeoAddressCity}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGeoAddressCity(item.label);
                      setcityId(item.value)
                      setIsFocus(false);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>postal code</Text>
                  <TextInput
                    value={values.GeoAddressPostalCode}
                    style={Styles.inputStyleLocationAdd2}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("GeoAddressPostalCode")}
                    onFocus={() => setFieldTouched("GeoAddressPostalCode")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                  {touched.GeoAddressPostalCode && errors.GeoAddressPostalCode &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressPostalCode}</Text>
                  }
                </View>

                <TouchableOpacity onPress={()=>openMaps(location?.latitude,location?.longitude)} style={Styles.InputeRowItems}>
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
                    style={Styles.inputStyleLocationAdd2}>
                    <Text style={Styles.txtLightColorLocation}>{location?.latitude} , {location?.longitude}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Notes</Text>
              <TextInput
                value={values.siteNote}
                style={[inputStyle,{paddingVertical:'3%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("siteNote")}
                onFocus={() => setFieldTouched("siteNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
                  <ButtonI style={[Styles.btn, {
                    //margin: normalize(15),
                    flexDirection: "row",
                    width: '100%',
                    paddingVertical: 2,
                    marginTop: normalize(15),
                  }]}//handleSubmit
                           onpress={handleSubmit}
                           categoriIcon={""}
                           title={tittlebtn}
                           colorsArray={['#ffadad','#f67070','#FF0000']}
                           styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />

            </View>
          )}
        </Formik>

      </View>
    );
  }
  else if (numberValue === 4) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            sitename:Name,
            siteNote:"",
            GeoAddressPostalCode:GeoAddressPostalCode,
            GeoAddressStreet:GeoAddressStreet,
            GeoAddressCountry:GeoAddressCountry,
            GeoAddressCity:GeoAddressCity
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema4}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
               //string_equality_site(values)
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
              </TouchableOpacity>
              <Text style={[Styles.txt,{marginTop: normalize(18),}]}>Sites New Name</Text>
              <TextInput
                value={values.sitename}
                style={[inputStyle,   { marginTop: normalize(10) }]}
                onChangeText={handleChange("sitename")}
                onFocus={() => {
                  setFieldTouched("sitename");
                }}
                //placeholder="E-mail"
                placeholderTextColor={'#fff'}

              />
              {touched.sitename && errors.sitename &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.sitename}</Text>
              }
              <View style={Styles.InputeRowItems2}>
                <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Street</Text>
                <TextInput
                  value={values.GeoAddressStreet}
                  style={[inputStyle,{paddingVertical:'3%'}]}
                  onContentSizeChange={(e) => {
                    numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                  }}
                  onChangeText={handleChange("GeoAddressStreet")}
                  onFocus={() => {
                    setFieldTouched("GeoAddressStreet");
                  }}
                  multiline={true}
                  placeholderTextColor={'#fff'} />
                {touched.GeoAddressStreet && errors.GeoAddressStreet &&
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressStreet}</Text>
                }
              </View>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Country</Text>
                  <Dropdown
                    style={[Styles.dropdownLocation]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CountryList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCountry}
                    value={GeoAddressCountry}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGeoAddressCountry(item.label);
                      setIsFocus(false);
                      setcountryId(item.value);
                      getCity(item.value);
                      ClearDate();
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>City</Text>
                  <Dropdown
                    style={GeoAddressCity!==''?Styles.dropdownLocation:Styles.dropdownLocationError}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CityList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCity}
                    value={GeoAddressCity}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setcityId(item.value)
                      setGeoAddressCity(item.label);
                      setIsFocus(false);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>postal code</Text>
                  <TextInput
                    value={values.GeoAddressPostalCode}
                    style={Styles.inputStyleLocationAdd2}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("GeoAddressPostalCode")}
                    onFocus={() => {
                      setFieldTouched("GeoAddressPostalCode");
                    }}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                  {touched.GeoAddressPostalCode && errors.GeoAddressPostalCode &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressPostalCode}</Text>
                  }
                </View>

                  <TouchableOpacity onPress={()=>openMaps(geoLat,geoLong)} style={Styles.InputeRowItems}>
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
                      <Text style={Styles.txtLightColorLocation}>{geoLat} , {geoLong}</Text>
                    </View>
                  </TouchableOpacity>

              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.siteNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("siteNote")}
                onFocus={() => setFieldTouched("siteNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <ButtonI style={[Styles.btn, {
                //margin: normalize(15),
                flexDirection: "row",
                width: '100%',
                paddingVertical: 2,
                marginTop: normalize(30),
              }]}//handleSubmit
                       onpress={handleSubmit}
                       categoriIcon={""}
                       title={tittlebtn}
                       colorsArray={['#ffadad','#f67070','#FF0000']}
                       styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />

            </View>
          )}
        </Formik>

      </View>
    );
  }

  /////////////Site////////////////

  if (numberValue === 11) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Unitname: "",
            UnitNote:"",
            GeoAddressPostalCode:'',
            GeoAddressStreet:''
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema14}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>unit Name</Text>
              <TextInput
                value={values.Unitname}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("Unitname")}
                onFocus={() => setFieldTouched("Unitname")}
                placeholderTextColor={'#fff'} />
              {touched.Unitname && errors.Unitname &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Unitname}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Street Address</Text>
              <TextInput
                value={values.GeoAddressStreet}
                style={[inputStyle,{paddingVertical:'3%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("GeoAddressStreet")}
                onFocus={() => setFieldTouched("GeoAddressStreet")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.GeoAddressStreet && errors.GeoAddressStreet &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressStreet}</Text>
              }
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Country</Text>
                  <Dropdown
                    style={[Styles.dropdownLocationAdd]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CountryList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCountry}
                    value={GeoAddressCountry}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGeoAddressCountry(item.label);
                      setIsFocus(false);
                      setcountryId(item.value);
                      getCity(item.value);
                      ClearDate();

                    }}

                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>City</Text>
                  <Dropdown
                    style={GeoAddressCity!==''?Styles.dropdownLocationAdd:Styles.dropdownLocationErrorAdd}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CityList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCity}
                    value={GeoAddressCity}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGeoAddressCity(item.label);
                      setcityId(item.value)
                      setIsFocus(false);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>postal code</Text>
                  <TextInput
                    value={values.GeoAddressPostalCode}
                    style={Styles.inputStyleLocationAdd2}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("GeoAddressPostalCode")}
                    onFocus={() => setFieldTouched("GeoAddressPostalCode")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                  {touched.GeoAddressPostalCode && errors.GeoAddressPostalCode &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressPostalCode}</Text>
                  }
                </View>
                <TouchableOpacity onPress={()=>openMaps(location?.latitude,location?.longitude)} style={Styles.InputeRowItems}>
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
                    style={Styles.inputStyleLocationAdd2}>
                    <Text style={Styles.txtLightColorLocation}>{location?.latitude} , {location?.longitude}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Notes</Text>
              <TextInput
                value={values.UnitNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("UnitNote")}
                onFocus={() => setFieldTouched("UnitNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.UnitNote && errors.UnitNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.UnitNote}</Text>
              }
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(15),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 12) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Unitname: Name,
            UnitNote:"",
            GeoAddressPostalCode:GeoAddressPostalCode,

            GeoAddressStreet:GeoAddressStreet,
            GeoAddressCountry:GeoAddressCountry,
            GeoAddressCity:GeoAddressCity
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema14}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
            <View style={styles.formContainer}>

              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
                //string_equality_unit(values)
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
              </TouchableOpacity>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>unit New Name</Text>
              <TextInput
                value={values.Unitname}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("Unitname")}
                onFocus={() => setFieldTouched("Unitname")}
                placeholderTextColor={'#fff'} />
              {touched.Unitname && errors.Unitname &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Unitname}</Text>
              }
              <View style={Styles.InputeRowItems2}>
                <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Street</Text>
                <TextInput
                  value={values.GeoAddressStreet}
                  style={[inputStyle,{paddingVertical:'3%'}]}
                  onContentSizeChange={(e) => {
                    numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                  }}
                  onChangeText={handleChange("GeoAddressStreet")}
                  onFocus={() => setFieldTouched("GeoAddressStreet")}
                  multiline={true}
                  placeholderTextColor={'#fff'} />
                {touched.GeoAddressStreet && errors.GeoAddressStreet &&
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressStreet}</Text>
                }
              </View>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Country</Text>
                  <Dropdown
                    style={[Styles.dropdownLocation]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CountryList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCountry}
                    value={GeoAddressCountry}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGeoAddressCountry(item.label);
                      setIsFocus(false);
                      setcountryId(item.value);
                      getCity(item.value);
                      ClearDate();
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>City</Text>
                  <Dropdown
                    style={GeoAddressCity!==''?Styles.dropdownLocation:Styles.dropdownLocationError}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={CityList}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    search={true}
                    searchPlaceholder="Search..."
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={GeoAddressCity}
                    value={GeoAddressCity}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setcityId(item.value)
                      setGeoAddressCity(item.label);
                      setIsFocus(false);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>postal code</Text>
                  <TextInput
                    value={values.GeoAddressPostalCode}
                    style={Styles.inputStyleLocationAdd2}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("GeoAddressPostalCode")}
                    onFocus={() => setFieldTouched("GeoAddressPostalCode")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                  {touched.GeoAddressPostalCode && errors.GeoAddressPostalCode &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressPostalCode}</Text>
                  }
                </View>

                  <TouchableOpacity onPress={()=>openMaps(geoLat,geoLong)} style={Styles.InputeRowItems}>
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
                      <Text style={Styles.txtLightColorLocation}>{geoLat} , {geoLong}</Text>
                    </View>
                  </TouchableOpacity>

              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Notes</Text>
              <TextInput
                value={values.UnitNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("UnitNote")}
                onFocus={() => setFieldTouched("UnitNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.UnitNote && errors.UnitNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.UnitNote}</Text>
              }
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  /////////////Units////////////////

  if (numberValue === 13) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            SectionName: "",
            SectionNote:""
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema13}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Section Name</Text>
              <TextInput
                value={values.SectionName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("SectionName")}
                onFocus={() => setFieldTouched("SectionName")}
                placeholderTextColor={'#fff'} />
              {touched.SectionName && errors.SectionName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.SectionName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.SectionNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("SectionNote")}
                onFocus={() => setFieldTouched("SectionNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 14) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            SectionName:Name,
            SectionNote:""
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema13}>
          {({values,handleChange,errors,setFieldTouched,touched,isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
                //string_equality_section(values)
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
              </TouchableOpacity>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Section New Name</Text>
              <TextInput
                value={values.SectionName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("SectionName")}
                onFocus={() =>setFieldTouched("SectionName")}
                placeholderTextColor={'#fff'} />
              {touched.SectionName && errors.SectionName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.SectionName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.SectionNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("SectionNote")}
                onFocus={() => setFieldTouched("SectionNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  /////////////Section////////////////

  if (numberValue === 15) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik

          initialValues={{
            FeatureName: "",
            FeatureNote:"",
            switchDYB:switchDYB
          }}

          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Feature Name</Text>
              <TextInput
                value={values.FeatureName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("FeatureName")}
                onFocus={() => setFieldTouched("FeatureName")}
                placeholderTextColor={'#fff'} />
              {touched.FeatureName && errors.FeatureName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.FeatureName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.FeatureNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("FeatureNote")}
                onFocus={() => setFieldTouched("FeatureNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={{
                flexDirection: "row",
                width: '100%', marginTop: '3%', zIndex: 100,
              }}>
                <Text style={[Styles.txtLightColor,{marginTop: normalize(18),}]}>Need DYB</Text>

                <ToggleSwitch
                  isOn={switchDYB}
                  size="large"
                  style={{marginLeft:'auto',marginTop: normalize(18)}}
                  trackOnStyle={{

                    backgroundColor:GLOBAL.OFFICIAL_Button,
                  }}
                  trackOffStyle={{

                    backgroundColor: "#a0a3bd",
                  }}
                  thumbOffStyle={{

                    borderRadius: 19,
                    // rgb(102,134,205)
                    borderColor: "rgb(255,255,255)",
                  }}
                  thumbOnStyle={{

                    borderRadius: 19,
                    borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                  }}
                  onToggle={isOn => {

                    setswitchDYB(isOn)
                    setCheked(isOn)
                  }}
                />

              </View>
              <View style={Styles.ViewItems_center}>
                <ButtonI style={Styles.btnFullWith}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 16) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>

        <Formik

          initialValues={{
            FeatureName:Name,
            FeatureNote:'',
            switchDYB:switchDYB2
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
                //string_equality_feature(values)
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
              </TouchableOpacity>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Feature New Name</Text>
              <TextInput
                value={values.FeatureName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("FeatureName")}
                onFocus={() => setFieldTouched("FeatureName")}
                placeholderTextColor={'#fff'} />
              {touched.FeatureName && errors.FeatureName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.FeatureName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.FeatureNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("FeatureNote")}
                onFocus={() => setFieldTouched("FeatureNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={{
                flexDirection: "row",

                width: '95%', marginTop: '4%', zIndex: 100,

              }}>
                <Text style={[Styles.txtLightColor,{marginTop: normalize(18),}]}>Need DYB</Text>

                <ToggleSwitch
                  isOn={switchDYB2}
                  size="large"
                  style={{marginLeft:'auto',marginTop: normalize(18)}}
                  trackOnStyle={{

                    backgroundColor:GLOBAL.OFFICIAL_Button,
                  }}
                  trackOffStyle={{

                    backgroundColor: "#a0a3bd",
                  }}
                  thumbOffStyle={{

                    borderRadius: 19,
                    // rgb(102,134,205)
                    borderColor: "rgb(255,255,255)",
                  }}
                  thumbOnStyle={{

                    borderRadius: 19,
                    borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                  }}
                  onToggle={isOn => {
                    setswitchDYB2(isOn)
                    setCheked(isOn)
                  }}
                />

              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 18) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            FeatureNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema13}>
          {({values,handleChange,errors,setFieldTouched,touched,isValid, handleSubmit }) => (
            <View style={styles.formContainer}>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.FeatureNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("FeatureNote")}
                onFocus={() => setFieldTouched("FeatureNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 19) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            ImageTitle: "",

          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema13}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Image Title</Text>
              <View style={{alignItems:'center',width:'100%'}}>
                <TextInput
                  value={values.ImageTitle}
                  style={[inputStyle,{paddingVertical:'4%'}]}
                  onContentSizeChange={(e) => {
                    numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                  }}
                  onChangeText={handleChange("ImageTitle")}
                  onFocus={() => setFieldTouched("ImageTitle")}

                  placeholderTextColor={'#fff'} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  /////////////Feature////////////////

  else if (numberValue === 7) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center',}}>
        <Formik
          initialValues={{
            username:GLOBAL?.UserInformation?.Username,
            password: "",
            orgkey:GLOBAL?.UserInformation?.OrgAppKey
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema6}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={[styles.formContainer]}>

              <Text style={[Styles.txt,{paddingVertical:'3%'}]}>OrgKey</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: '#fff',
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.orgkey}
                  style={[ {
                    width: '97%',
                    paddingVertical: 3, color: '#fff',
                  }]}
                  onChangeText={handleChange("orgkey")}
                  onFocus={() => setFieldTouched("orgkey")}
                  onBlur={()=>{
                    if(values?.orgkey?.length===9)

                      checkOrgCode(values?.orgkey)
                  }}
                  keyboardType={"numeric"}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <View>
                    <Feather name={iconcheck} size={15} color={'#fff'} />
                  </View>
                </View>
              </View>
              {touched.orgkey && errors.orgkey &&
              <Text style={{ fontSize: 12, color: "#FF0D10",paddingTop:2 }}>{errors.orgkey}</Text>
              }
              <Text style={[Styles.txt,{paddingVertical:'3%'}]}>Username</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: '#fff',
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }]}>
              <TextInput
                value={values.username}
                style={[{
                  width: '100%',
                  paddingVertical: 2,
                  borderRadius: normalize(6),
                  color:'#fff',
                }]}
                onChangeText={handleChange("username")}
                onFocus={() => setFieldTouched("username")}
                placeholderTextColor={'#fff'} />
              </View>
              {touched.username && errors.username &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.username}</Text>
              }
              <Text style={[Styles.txt,{paddingVertical:'3%'}]}>Password</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: '#fff',
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.password}
                  style={[{
                    width: '97%',
                    paddingVertical: 3, color: '#fff',
                  }]}
                  onChangeText={handleChange("password")}
                  onFocus={() => setFieldTouched("password")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <TouchableOpacity onPress={onpress}>
                    <Feather name={iconsecuret} size={15} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
              {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>
              }
              <View style={[{
                flexDirection: "row", marginTop: 5,   width: '100%',
              }]}>
                <View style={{ flexDirection: "row", width: "60%", alignItems: "center" }}>
                </View>
                <TouchableOpacity style={{ width: "40%" }}
                                  onPress={Pinrecovery}>
                  <Text style={[Styles.txt, { color:GLOBAL.OFFICIAL_Button, marginLeft: "auto" }]}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              {Btn===true?
                <View style={[Styles.ViewItems_center,{flexDirection:'row'}]}>
                  <ButtonI style={[ {
                    width: '50%',
                    paddingVertical: normalize(4),
                    marginTop: normalize(30),
                    borderRadius: normalize(7),
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection:'row',
                    backgroundColor:GLOBAL.OFFICIAL_Button

                  }]}//handleSubmit
                           onpress={handleSubmit}
                           categoriIcon={"AntDesign"}
                           title={tittlebtn}
                           styleTxt={[Styles.txt_center_login,{fontSize: normalize(16),}]} sizeIcon={27} />
                </View>
                    :null
              }
            </View>
          )}
        </Formik>
      </View>

    );
  }

  ///////////////////LOGIN////////////////

  else if (numberValue === 10) {
    return (
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema6}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>

              <Text style={[Styles.txtLightColor]}>Email</Text>
              <TextInput
                value={values.email}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("email")}
                onFocus={() => setFieldTouched("email")}
                placeholderTextColor={'#fff'} />
              {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.email}</Text>
              }
              <Text style={[Styles.txtLightColor]}>Password</Text>
              <View style={[, {
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: width - 50,
                paddingVertical: 3,
                color: '#fff',
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.password}
                  style={[, {
                    width: width - 100,
                    paddingVertical: 3, color: '#000',
                  }]}
                  onChangeText={handleChange("password")}
                  // placeholder="Password"
                  onFocus={() => setFieldTouched("password")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <TouchableOpacity
                    onPress={onpress}>
                    <Feather name={iconsecuret} size={15} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
              {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>
              }
              <View style={[{
                flexDirection: "row", marginTop: 5, width: width - 50,
              }]}>
                <View style={{ flexDirection: "row", width: "60%", alignItems: "center" }}>
                  <CheckBox checked={Cheked} color={GLOBAL.OFFICIAL_backgroundItem} onPress={ChangeChecked} style={{
                    borderWidth: 0.90,
                    borderColor: "#424867",
                    borderRadius: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 1,
                  }} />
                  <Text style={[Styles.txt, { color: GLOBAL.OFFICIAL_Button, marginRight: "auto", marginLeft: 20 }]}>Remember
                    Me!</Text>
                </View>
                <TouchableOpacity style={{ width: "40%" }}
                                  onPress={Pinrecovery}>
                  <Text style={[Styles.txt, { color:GLOBAL.OFFICIAL_Button, marginLeft: "auto" }]}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: width - 53,
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         styleTxt={Styles.txt} sizeIcon={27} />
              </View>
              <View style={[Styles.ViewItems_center, { flex: 0.4, marginTop: 7 }]}>
                <View style={[Styles.linearView, {}]}>
                  <View style={[Styles.liner, { width: width - 25 }]} />
                  <Text style={[Styles.txtLightColor, { fontSize: normalize(13) }]}>{'Okout'}</Text>
                  <View style={[Styles.liner, { width: width - 25 }]} />
                </View>
              </View>

              <TouchableOpacity onPress={emailOnpress}
                                style={[Styles.ViewItems_center, { marginTop: 10, flexDirection: "row" }]}>
                <Text style={[Styles.txt, { fontSize: normalize(13) }]}>Don't have an account ?

                </Text>
                <Text style={[Styles.txt, { color: GLOBAL.OFFICIAL_Button, marginLeft: 3 }]}>Sign Up</Text>
              </TouchableOpacity>
              {/* <View style={[Styles.ViewItems_center,{flex:1}]}>
                  <View style={[Styles.linearView,{}]}>

                    <Text style={[Styles.txt,{ fontSize: normalize(13),}]}>{All_text.OR_Use}</Text>

                  </View>
                </View>*/}
            </View>
          )}
        </Formik>
      </View>

    );
  }
  else if (numberValue === 9) {
    return (
      <View>
        <Formik
          initialValues={{
            password: "",
            confirmpassword: "",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema7}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txt]}>New Password</Text>
              <View style={[, {
                borderWidth: 1,
                borderColor: red,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: width - 50,
                paddingVertical: 2,
                color:'#fff',
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.password}
                  style={[{
                    width: width - 100,
                    paddingVertical: 5, color:'#fff',
                  }]}
                  onChangeText={handleChange("password")}
                  onFocus={() => setFieldTouched("password")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'}
                />
                <View style={[{}]}>
                  <TouchableOpacity
                    onPress={onpress}>
                    <Feather name={iconsecuret} size={15} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
              {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>
              }
              <Text style={[Styles.txt]}>Confirm Password</Text>
              <View style={[
                values.password !== "" ?
                  values.password !== values.confirmpassword ?
                    {
                      borderWidth: 1,
                      borderColor:'red',
                      borderRadius: normalize(6),
                      padding: 12,
                      marginBottom: 5,
                      width: width - 50,
                      paddingVertical: 2,
                      color:'#fff',
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    } :
                    {
                      borderWidth: 1,
                      borderColor: "#22C55E"
                      ,
                      borderRadius: normalize(6),
                      padding: 12,
                      marginBottom: 5,
                      width: width - 50,
                      paddingVertical: 2,
                      color: '#fff',
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    } :
                  {
                    borderWidth: 1,
                    borderColor: red,
                    borderRadius: normalize(6),
                    padding: 12,
                    marginBottom: 5,
                    width: width - 50,
                    paddingVertical: 2,
                    color: '#fff',
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  },
              ]}>

                <TextInput
                  value={values.confirmpassword}
                  style={[{
                    width: width - 100,
                    paddingVertical: 6, color: '#fff',
                  }]}
                  onChangeText={handleChange("confirmpassword")}
                  //placeholder="Password"
                  onFocus={() => setFieldTouched("confirmpassword")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'}
                />
                <View style={[{}]}>
                  {
                    values.password !== "" ?
                      values.password !== values.confirmpassword ?
                        <AntDesign name={"closecircleo"} size={20} color={"red"} />
                        : <AntDesign name={"checkcircleo"} size={20} color={'red'} /> :
                      <AntDesign name={"closecircleo"} size={20} color={"red"} />
                  }
                </View>
              </View>
              {touched.confirmpassword && errors.confirmpassword &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.confirmpassword}</Text>
              }
              <View style={[Styles.ViewItems_center, {}]}>
                <ButtonI
                  style={[Styles.btn, {
                    flexDirection: "row",
                    width: width - 50,
                    paddingVertical: 5,
                    marginTop: normalize(40),
                  }]}
                  onpress={handleSubmit}
                  categoriIcon={""}
                  title={tittlebtn}
                  styleTxt={Styles.txt} sizeIcon={27} />
              </View>

            </View>
          )}
        </Formik>

      </View>
    );
  }

///////////////////PasswordRecovery////////////////

  if (numberValue === 17) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Title:'',
            TaskNote: "",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema5}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={[styles.formContainer2,]}>

              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Title</Text>
              <TextInput
                value={values.Title}
                style={[Styles.inputStyleTask]}
                onChangeText={handleChange("Title")}
                onFocus={() => setFieldTouched("Title")}
                multiline={true}
                placeholderTextColor={"#fff"} />
              {touched.Title && errors.Title &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.Title}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Requested By</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskuser}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocususer ? 'Select Requested user' : '...'}
                searchPlaceholder="Search..."
                value={selecteduser}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocususer(true)}
                onBlur={() => setIsFocususer(false)}
                onChange={item=> {
                  setSelecteduser(item);
                  setUserId(item.value)
                }}
               // setCategoryId,setRelatedId,setParentTaskId,setPriorityId,setTaskStatusId
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              {error==='selecteduser'&& selecteduser==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select Requested user ! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Category</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskcategory}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select category' : '...'}
                searchPlaceholder="Search..."
                value={selectedcategory}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item=> {
                  setSelectedcategory(item);
                  setCategoryId(item.value);
                  Task_RelatedList(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />

              {error==='selectedcategory' && selectedcategory==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select category! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>related</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={TaskRelated}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusrelated ? 'Select related' : '...'}
                searchPlaceholder="Search..."
                value={selectedrelated}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocusrelated(true)}
                onBlur={() => setIsFocusrelated(false)}
                onChange={item=> {
                  setSelectedrelated(item);
                  setRelatedId(item.value)
                }}
              />
              {error==='selectedrelated' && selectedrelated==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select related! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Assigned</Text>
              <MultiSelect
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskassigned}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusassigned ? 'assigned to' : '...'}
                searchPlaceholder="Search..."
                value={selectedassigned}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocusassigned(true)}
                onBlur={() => setIsFocusassigned(false)}
                onChange={item=> {
                  setSelectedassigned(item);
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Priority</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskpriority}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocuspriority ? 'Select priority' : '...'}
                searchPlaceholder="Search..."
                value={selectedpriority}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocuspriority(true)}
                onBlur={() => setIsFocuspriority(false)}
                onChange={item=> {
                  setSelectedpriority(item);
                  setPriorityId(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}/>
              {error==='selectedpriority' && selectedpriority==='' ?
                <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select selected priority! Please?</Text>:null
              }
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                  Plan StartDate
                </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Plan EndDate
                  </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                <TouchableOpacity onPress={()=> {
                  setdateType("PlanStartDate");
                  setOpen(true)
                }} style={Styles.dateBoxItem}>
                  <Text style={Styles.txtdate}>
                    {DateFormatplanstart}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {
                  setdateType("PlanEndDate");
                  setOpen(true)
                }} style={Styles.dateBoxItem}>
                  <Text style={Styles.txtdate}>
                    {DateFormatplanend}
                  </Text>
                </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.dateBoxItemBorder}>

                    {error==='PlanStartDate' && DateFormatplanstart==='' ?
                    <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select PlanStartDate! Please?</Text>:null
                    }
                  </View>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanEndDate' && DateFormatplanend==='' ?
                    <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select PlanEndDate! Please?</Text>:null
                    }
                  </View>
                </View>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Status</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskstatus}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusstatus ? 'Select Status' : '...'}
                searchPlaceholder="Search..."
                value={selectedstatus}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem_status}
                onFocus={() => setIsFocusstatus(true)}
                onBlur={() => setIsFocusstatus(false)}
                onChange={item=> {
                  setSelectedstatus(item);
                  setTaskStatusId(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                    </View>
                )}
              />
              {error==='selectedstatus' && selectedstatus==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select Status! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(15),}]}>Description</Text>
              <TextInput
                value={values.TaskNote}
                style={[Styles.inputStyleTask,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("TaskNote")}
                onFocus={() => setFieldTouched("TaskNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.TaskNote && errors.TaskNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.TaskNote}</Text>
              }
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#a39898','#786b6b','#382e2e']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ///////////////////Task////////////////

  if (numberValue === 20) {
    return (
      <View>
        <Formik

          initialValues={{
            DYBName: "",
            DYBNote:"",

          }}

          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>DYB Name</Text>
              <TextInput
                value={values.DYBName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("DYBName")}
                onFocus={() => setFieldTouched("DYBName")}
                placeholderTextColor={'#fff'} />
              {touched.DYBName && errors.DYBName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.DYBName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.DYBNote}
                style={[inputStyle, { paddingVertical: normalize(25) }]}
                onChangeText={handleChange("DYBNote")}
                onFocus={() => setFieldTouched("DYBNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={{
                flexDirection: "row",
                width: width - 50, marginTop: 12, zIndex: 100,
              }}>
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:width-53,
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffc2b5','#fca795','#d1583b']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 21) {
    return (
      <View>
        <Formik

          initialValues={{
            DYBName:featureName,
            DYBNote:'',

          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>DYB New Name</Text>
              <TextInput
                value={values.DYBName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("DYBName")}
                onFocus={() => setFieldTouched("DYBName")}
                placeholderTextColor={'#fff'} />
              {touched.DYBName && errors.DYBName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.DYBName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}> Notes</Text>
              <TextInput
                value={values.DYBNote}
                style={[inputStyle, { paddingVertical: normalize(25) }]}
                onChangeText={handleChange("DYBNote")}
                onFocus={() => setFieldTouched("DYBNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'95%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffc2b5','#fca795','#d1583b']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ///////////////////DYB////////////////

  if (numberValue === 5) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            UserName:GLOBAL.UserInformation.Username,
            password:GLOBAL.PASSWORD_value,
            FullName:GLOBAL.UserInformation.FullName,
            OrgKey:GLOBAL.UserInformation.OrgAppKey
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema2}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Full Name</Text>
              <TextInput
                value={values.FullName}
                style={[inputStyleProfile,]}
                onChangeText={handleChange("FullName")}
                onFocus={() => setFieldTouched("FullName")}
                placeholderTextColor={'#fff'} />
              {touched.FullName && errors.FullName &&
              <Text style={{ fontSize: 12, color: "#FF0D10",fontWeight:'bold' }}>{errors.FullName}</Text>
              }<Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>User Name</Text>
              <TextInput
                value={values.UserName}
                style={[inputStyleProfile,]}
                onChangeText={handleChange("UserName")}
                onFocus={() => setFieldTouched("UserName")}
                placeholderTextColor={'#fff'} />
              {touched.UserName && errors.UserName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.UserName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Org Key</Text>
              <TextInput
                value={values.OrgKey}
                style={[inputStyleProfile]}
                onChangeText={handleChange("OrgKey")}
                onFocus={() => setFieldTouched("OrgKey")}
                placeholderTextColor={'#fff'} />
              {touched.OrgKey && errors.OrgKey &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.OrgKey}</Text>
              }
              {/*<Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>password</Text>*/}
              {/*<TextInput*/}
              {/*  value={values.password}*/}
              {/*  style={[inputStyleProfile]}*/}
              {/*  onChangeText={handleChange("password")}*/}
              {/*  onFocus={() => setFieldTouched("password")}*/}
              {/*  placeholderTextColor={'#fff'} />*/}
              {/*{touched.password && errors.password &&*/}
              {/*<Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>*/}
              {/*}*/}
              <View style={[Styles.bottomViewFixed]}>
                <Text style={Styles.txtGrayColor }>
                  CurrentVersion
                </Text>
                <Text style={Styles.txtLightColor}>
                  {Version}
                </Text>
              </View>
              <View style={[Styles.ViewItems_center_transparent]}>
                <ButtonI style={[Styles.btnNOBackColor, {
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(16),
                }]}
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#a58cf8','#987aff','#7953FAFF']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ///////////////////Profile////////////////

  if (numberValue === 22) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Location: "",

          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema13}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Country</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>City</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>

                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>postal code</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Street</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>



                {/*<View style={Styles.InputeRowItems}>*/}
                {/*  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>GeoLat</Text>*/}
                {/*  <TextInput*/}
                {/*    value={values.Location}*/}
                {/*    style={[inputStyleLocation,{paddingVertical:'4%'}]}*/}
                {/*    onContentSizeChange={(e) => {*/}
                {/*      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;*/}
                {/*    }}*/}
                {/*    onChangeText={handleChange("ImageTitle")}*/}
                {/*    onFocus={() => setFieldTouched("ImageTitle")}*/}
                {/*    multiline={true}*/}
                {/*    placeholderTextColor={'#fff'} />*/}
                {/*</View>*/}
                {/*<View style={Styles.InputeRowItems}>*/}
                {/*  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>GeoLong</Text>*/}
                {/*  <TextInput*/}
                {/*    value={values.Location}*/}
                {/*    style={[inputStyleLocation,{paddingVertical:'4%'}]}*/}
                {/*    onContentSizeChange={(e) => {*/}
                {/*      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;*/}
                {/*    }}*/}
                {/*    onChangeText={handleChange("ImageTitle")}*/}
                {/*    onFocus={() => setFieldTouched("ImageTitle")}*/}
                {/*    multiline={true}*/}
                {/*    placeholderTextColor={'#fff'} />*/}
                {/*</View>*/}
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'55%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ////////////////////Address//////////////////
}


const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
width:'95%'
  },
  formContainer2: {
width:'100%'
  },
  linearView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  liner: {
    height: normalize(3), flex: 1,
    backgroundColor:'#fff',
  },
  txt: {
    color:'#fff',
    fontSize: normalize(13),
  },
  eyeIcon: {
    flexDirection: "row-reverse",
    position: "relative",
    bottom: normalize(200),
    right: normalize(20),
  },
});
console.disableYellowBox = true;

export { TextInputI };
