import React, { useState, useEffect } from "react";
import {
  View,
  Text, Modal, Image, TouchableOpacity, FlatList, ImageBackground,
} from "react-native";
import { Styles } from "../Styles";
import { Container } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import List_Items from "../component/list_Items";
import { FloatAddBtn } from "../component/FloatAddBtn";
import {LogOutModal} from '../component/LogOutModal'
import Geolocation from "react-native-geolocation-service";
import {readOnlineApi } from "../ReadPostApi";
import {requestLocationPermission ,geocodePosition,writeDataStorage,removeDataStorage} from "../Get_Location";
import DYB_List_Item from "../component/DYB_List_Item";
import Geocoder from "react-native-geocoder";
let City=[];
const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes = require("../Photoes");
function Project_Sites({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [ShowButton, setShowButton] = useState(true);
  const [ShowMessageUpdate,setShowMessageUpdate]=useState(false);
  const [Json,setJson]=useState([]);
  const [CountryList, setCountryList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [cityId, setcityId] = useState('');
  const [countryId, setcountryId] = useState('');
  const [GeoAddressPostalCode, setGeoAddressPostalCode] = useState('');
  const [GeoAddressStreet, setGeoAddressStreet] = useState('');
  const [location, setLocation] = useState(false);
  const [GeoAddressCountry, setGeoAddressCountry] = useState('');
  const [GeoAddressCity, setGeoAddressCity] = useState('');
  const [validatemsg, setvalidatemsg] = useState('');
  const [touch, settouch] = useState('');
  const [visibleAddModal,setvisibleAddModal]=useState(false);
  const [AddId,setAddId]=useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [route, setroute] = useState('');
  const [showWarning, setshowWarning] = useState(false);
  const [CategoryId, setCategoryId] = useState(0);
  const [Selectedcategory, setSelectedcategory] = useState(0);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState(0);
  const [selectedrelatedname, setselectedrelatedname] = useState(0);
  const [marker, setmarker] = useState('');
  useEffect(() => {
    Geocoder.fallbackToGoogle(GLOBAL.mapKeyValue);
    getLocation();
    const unsubscribe = navigation.addListener('focus', () => {
      setroute(GLOBAL.route)
      if(GLOBAL.route==='structure') {
      getSites();
      }
      else {
        getSites_dyb()
      }
    });
    return unsubscribe;
  }, []);
  ///Get Dyb===y site Total List from AsyncStorage///
  const getSites_dyb = async () => {
    let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
    let Site_dyb =[];
    if (json!==null) {
      let Site_List= json?.find((p) => p?.projectId === GLOBAL.ProjectId)
      if (Site_List?.sites) {
        Site_List?.sites?.forEach((obj) => {
          Site_dyb.push({
            Id: obj.siteId,
            Name: obj.siteName,
            Count:obj.units?.length,
            NameCount: "unit",
            task: '0',
            ListName: "site",
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
        if(Site_dyb?.length!==0) {
          setmodules(Site_dyb);
        }
        else
          setmodules("");
      }
    }
  };
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  ///add And Update Sit When app is Offline Mode/////////
  const AddSitesDataStorage = async (A) => {
    try {
      let List =modules
      let ListTotal=[...Json];
      let index_project=Json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId);
        let different = getDifference(A, List);
        let Exist = false;
        different?.forEach((obj) => {
          Exist = List?.findIndex((p) => p.siteId === obj.siteId);
        });
        if (Exist === -1) {
          let MakeList=[].concat(modules, different);
          ListTotal[index_project]={...ListTotal[index_project],sites:MakeList};
          writeDataStorage(GLOBAL.All_Lists,MakeList)
        }
        else {
          ListTotal[index_project]={...ListTotal[index_project],sites:A};
          writeDataStorage(GLOBAL.All_Lists,ListTotal)
        }
    }
    catch (e) {
    }
  };
  ///compare 2 array and get  Difference//
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.projectId) === parseInt(object2.projectId) && object1.projectName === object2.projectName;
      });
    });
  };
  const ChangeChecked = () => {
    setCheked(!Cheked);
  };
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
  };
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  /// Bottom menu click On LogOut button///
  const logout_Url= () => {
    setshowModalDelete(true)
  };
  /// compare 2 array by Id And sort///
  const dateComparison= (a,b)=>{
    const date1 = a?.Id
    const date2 = b?.Id
    return date1 - date2;
  }
  //Get  Dyb===n site Total List from Server///
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let Site_List = [];
      let Site= json?.projects?.find((p) => p?.projectId === GLOBAL?.ProjectId)
        Site?.sites?.forEach((obj) => {
          Site_List.push({
            siteId: obj.siteId,
            siteName: obj.siteName,
            unitCount: obj.unitCount,
            task: "0",
            note: obj?.notes,
            address: obj?.address,
            geoLat: obj?.geoLat,
            geoLong: obj?.geoLong,
            cityName: GLOBAL.City?.cities?.find((p) => p?.cityId === obj?.address?.address_City)?.cityName,
            countryName: GLOBAL.Country?.countries?.find((p) => p?.countryId === obj?.address?.address_Country)?.countryName,
            coutryId: obj?.address?.address_Country,
            cityId: obj?.address?.address_City,
            postalCode: obj?.address?.address_Zip,
            street: obj?.address?.address_Street,
            units: obj?.units,
            Location:{latitude:obj?.geoLat,
              longitude:obj?.geoLong}
          });
        });
      if(Site_List?.length!==0)
        setmodules(Site_List);
      else
        setmodules('');
      writeDataStorage(GLOBAL.All_Lists, json?.projects);
    });
  };
  //Get  Dyb===n site Total List from AsyncStorage///
  const getSites = async () => {
    let json=JSON.parse (await AsyncStorage.getItem(GLOBAL.All_Lists))
    let Site_List = [];
    if (json!==null) {
      let Site= json?.find((p) => p?.projectId === GLOBAL.ProjectId)
      Site?.sites?.forEach((obj) => {
        Site_List.push({
          siteId: obj.siteId,
          siteName: obj.siteName,
          unitCount: obj.unitCount,
          task: obj?.task,
          note: obj?.notes,
          address: obj?.address,
          geoLat: obj?.geoLat,
          geoLong: obj?.geoLong,
          cityName: GLOBAL.City?.cities?.find((p) => p?.cityId === obj?.address?.address_City)?.cityName,
          countryName: GLOBAL.Country?.countries?.find((p) => p?.countryId === obj?.address?.address_Country)?.countryName,
          coutryId: obj?.address?.address_Country,
          cityId: obj?.address?.address_City,
          postalCode: obj?.address?.address_Zip,
          street: obj?.address?.address_Street,
          units: obj?.units,
          Location:{latitude:obj?.geoLat,
        longitude:obj?.geoLong}
        });
      });
      if(Site_List?.length!==0)
        setmodules(Site_List)
      else
        setmodules('')
    }
    if (GLOBAL.isConnected === false) {
      setGeoAddressCountry("United States");
      setGeoAddressCity("California");
      getCountry_city("United States", "California");
      let All_Sites = [];
      json?.forEach((obj) => {
        obj?.sites?.forEach((obj2) => {
          All_Sites?.push(
            { Id: obj2?.siteId },
          );
        });
      });
      All_Sites?.sort(dateComparison)
      setAddId(All_Sites);
      }
  }
  /// Add and send new Site To server///
  const AddSites = (value) => {
  if(GeoAddressCity===''){
    settouch('City')
   setvalidatemsg('Please Select Your City')
 }
 else {
    setShowButton(false)
   var formdata = new FormData();
   formdata.append("siteName", value.sitename);
   formdata.append("userId",  GLOBAL.UserInformation?.userId);
   formdata.append("notes", value.siteNote);
   formdata.append("projectId", GLOBAL.ProjectId);
    formdata.append("geoLat", parseInt(location?.latitude).toFixed(7));
    formdata.append("geoLong",parseInt(location?.longitude).toFixed(7));
   formdata.append("geoAddress", GeoAddress);
   formdata.append("postalCode", GeoAddressPostalCode);
   formdata.append("cityId", cityId);
   formdata.append("countryId", countryId);
   formdata.append("street", GeoAddressStreet);
    writePostApi("POST", Api.CreateSite, formdata).then(json => {
     if (json) {
       if (json?.status === true) {
         setMessage(json.msg);
         setShowMessage(true);
         getAllProjectInfo();
         setShowButton(true)
         setvisibleAddModal(false)
         const timerId = setInterval(() => {
           setShowMessage(false);
         }, 4125);
         return () => clearInterval(timerId);
       }
     }
     else {
       let List_Item = [];
       let Sites_List = [];
       let Count = 0;
       List_Item = modules;
       if (List_Item?.length !== 0) {
         Sites_List = [...List_Item];
       }
       if(AddId.length!==0)
         Count = parseInt(AddId[AddId?.length - 1]?.Id) + 1;
       else
         Count = Count + 1;
       Sites_List.push({
         siteId: Count.toString(),
         siteName: value.sitename,
         unitCount: "0",
         projectId: GLOBAL.ProjectId,
         note:value.siteNote,
         address:GeoAddress,
         geoLat:location.latitude,
         geoLong:location.longitude,
         cityName:GeoAddressCity,
         countryName:GeoAddressCountry,
         coutryId:countryId,
         cityId:cityId,
         postalCode:GeoAddressPostalCode,
         street:GeoAddressStreet,
         units:[]
       });
       List_Item = Sites_List;
       setMessage("Your site successfully added");
       setShowMessage(true);
       setmodules(List_Item);
       setShowButton(true)
       setvisibleAddModal(false)
       AddSitesDataStorage(List_Item);
       let All_Sites = [];
       json?.forEach((obj) => {
         obj?.sites?.forEach((obj2) => {
           All_Sites?.push(
             { Id: obj2?.siteId },
           );
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
  };
 ///get Country List///
  const getCountry_city = async (country,adminArea) => {
      let Country_List=[];
      GLOBAL.Country?.countries?.forEach((obj) => {
        if(obj?.countryName!=='') {
          Country_List.push({
            value: obj?.countryId,
            label: obj?.countryName,
          });
        }
      });
      setCountryList(Country_List);
      City=GLOBAL.City;
     let Default_countryId=Country_List?.find((p)=>p?.label===country)?.value
      setcountryId(Default_countryId)
      if(Default_countryId!==''||Default_countryId!==null) {
        getCity(Default_countryId,adminArea);
      }
  };
  ///get City List///
  const getCity = async (value,adminArea) => {
    let City_List = [];
    let City_filter=City?.cities?.filter((p)=>p?.coutryId===value)
    City_filter?.forEach((obj) => {
      if(obj?.cityName!=='') {
        City_List.push({
          value: obj?.cityId,
          label: obj?.cityName,
          coutryId:obj?.coutryId
        });
      }
    });
    setCityList(City_List);
    if(adminArea!==''){
      let Default_cityId= City_List?.find((p)=>p.label===adminArea)?.value
      setcityId(Default_cityId)
    }
  };
  //get User Location///
  const getLocation =async () => {
    requestLocationPermission().then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
            var NY = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            geocodePosition(NY).then(res => {
                if(res) {
                  setGeoAddress(res?.[0]?.formattedAddress);
                  setGeoAddressCountry(res?.[0]?.country);
                  setGeoAddressCity(res?.[0]?.adminArea);
                  setGeoAddressPostalCode(res?.[0]?.postalCode);
                  setGeoAddressStreet(res?.[0]?.streetName);
                  getCountry_city(res?.[0]?.country, res?.[0]?.adminArea);
                }
                else {
                  getCountry_city("United States", "California");
                }
              })
                .catch(err => console.log(err, "errrrr"));
          },
          error => {
            // See error code charts below.

            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  };
  ///Update Site in asyncstorage When app offline///
  const Update_Off=(value,GeoAddressCity,GeoAddressCountry)=>{
    let List_Item = [];
    List_Item = modules;
    let index = List_Item?.findIndex((p) => p?.siteId === GLOBAL.UpdateSiteID);
    let markers = [...List_Item];
    markers[index] = { ...markers[index], siteName: value?.sitename,cityName:GeoAddressCity,countryName:GeoAddressCountry,
      street:value.GeoAddressStreet,postalCode:value.GeoAddressPostalCode,address:value.GeoAddressStreet,
      geoLat: location.latitude,geoLong: location.longitude
    };
    setmodules(markers);
    AddSitesDataStorage(markers);
  }
  const renderItem=({ item ,index})=>(
    <List_Items key={index} getCity={getCity}
                ShowWarningMessage={ShowWarningMessage}
                marker={marker} setmarker={setmarker}
                setShowWarningMessage={setShowWarningMessage}
                setShowMessage={setShowMessageUpdate} value={item}
                CityList={CityList} CountryList={CountryList}
                setCountryList={setCountryList} setCityList={setCityList} setLocation={setLocation} setGeoAddress={setGeoAddress}
                cityId={cityId} setcityId={setcityId} ShowButton={ShowButton}
                countryId={countryId} setcountryId={setcountryId}
                Message={Message}  data={GLOBAL.Site_data}  setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId}
                ShowMessage={ShowMessageUpdate} tittlebtn={"Update Sites"} numberValue={4}
                Navigate_Url={Navigate_Url} location={location} getAllProjectInfo={getAllProjectInfo} Update_Off={Update_Off}
    />
  )
  const renderSectionHeader=()=>(
    <>
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
  const SeeDetail = (Id) => {
    GLOBAL.SiteId = Id;
    navigation.navigate("Project_UnitsStack");
  };
  const renderItem_dyb = ({ item }) => (
    <DYB_List_Item data={GLOBAL.Site_data_dyb} value={item}  SeeDetail={SeeDetail}
                   Navigate_Url={Navigate_Url}/>
  );
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']} StatusColor={route==='structure'?"#ffadad":'#ffc6bb'} onPress={goBack}
              Title={"Sites / Buildings"}/>
      <ImageBackground source={Photoes.SiteBack}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
      <View style={Styles.containerList}>
        { showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut}/>
        }
        {
          route==='structure'?
        <>
          {
            modules!=='' ?
              <View style={Styles.Center_margin_Bottom3}>
                {modules&&(
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={modules}
                    style={{width:'100%',flexGrow:0}}
                    renderItem={renderItem}
                    ListHeaderComponent={renderSectionHeader}
                    ListFooterComponent={renderSectionFooter}
                    keyExtractor={(item,index)=>{
                      return index.toString();
                    }}
                  />
                )}
              </View>:
              <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No Sites defined
                </Text>
                <Text style={Styles.EmptyText}>
                  Add by pressing button below "
                </Text>
              </View>
          }
        </>:
        <>
          {
            modules!=='' ?
              <View style={Styles.ItemsBoxDyb}>
                {modules && (
                  <FlatList
                    data={modules}
                    showsVerticalScrollIndicator={false}
                    style={{width:'100%'}}
                    renderItem={renderItem_dyb}
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
        </>
        }
      </View>
      {
        route==='structure'?
      <FloatAddBtn onPress={onOpen} colors={['#ffadad','#f67070','#FF0000']}/>:null}
      </ImageBackground>
      <AddModal
        numberValue={2}
        GeoAddressCity={GeoAddressCity}
        GeoAddressCountry={GeoAddressCountry}
        GeoAddressStreet={GeoAddressStreet}  GeoAddress={GeoAddress} GeoAddressPostalCode={GeoAddressPostalCode}
        CityList={CityList} CountryList={CountryList}
        location={location}
        setGeoAddressCity={setGeoAddressCity}
        setGeoAddressCountry={setGeoAddressCountry}
        setGeoAddressStreet={setGeoAddressStreet}
         setGeoAddressPostalCode={setGeoAddressPostalCode}
        setcountryId={setcountryId} setcityId={setcityId}
        ShowMessage={ShowMessage} Message={Message}
        ChangeChecked={ChangeChecked} setCategoryId={setCategoryId}  validatemsg={validatemsg}
        setCountryList={setCountryList} setCityList={setCityList} setLocation={setLocation} setGeoAddress={setGeoAddress}
        setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId} setselectedrelatedname={setselectedrelatedname}
                    getCity={getCity} touch={touch} marker={marker} setmarker={setmarker}
                    setvisibleAddModal={setvisibleAddModal} visibleAddModal={visibleAddModal} setShowMessage={setShowMessage}
                    onPressAdd={AddSites} tittlebtn={"Add Site"} ShowButton={ShowButton}/>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}  />
    </Container>
  );
}
export default Project_Sites;
