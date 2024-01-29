import React, { useState, useEffect } from "react";
import {
  View,
  Text, Modal, Image, TouchableOpacity, FlatList,
} from "react-native";
import { Styles } from "../Styles";
import { Container } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import List_Items from "../component/list_Items";
import { FloatAddBtn } from "../component/FloatAddBtn";
import Geolocation from "react-native-geolocation-service";
import {readOnlineApi } from "../ReadPostApi";
import {requestLocationPermission ,geocodePosition,writeDataStorage,removeDataStorage} from "../Get_Location";
import DYB_List_Item from "../component/DYB_List_Item";
import { UserPermission } from "../CheckPermission";
import { Warningmessage } from "../component/Warningmessage";

const data = [
  { label: "Edit", value: "2", Icon: "edit" },
  { label: "Photos", value: "3", Icon: "images" },
  { label: "Location", value: "14", Icon: "location" },
];
const data_dyb = [
  {label: "Photos",value: "3",Icon: "images" },
  {label: "Location",value: "14",Icon: "location" },
];
let City=[];
const GLOBAL = require("../Global");
const Api = require("../Api");
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
  useEffect(() => {
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
  const dateComparison_count =(a,b)=>{

    const date1 = a?.Count
    const date2 = b?.Count

    return date2 - date1;
  }
  const getSites_dyb = async () => {
    let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
    let A =[];
    if (json!==null) {
      let Site_List= json?.find((p) => p?.projectId === GLOBAL.ProjectId)
      if (Site_List?.sites) {
        Site_List?.sites?.forEach((obj) => {

          A.push({
            Id: obj.siteId,
            Name: obj.siteName,
            Count:obj.units?.length,
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

  ///////////////////////////////////////////
  const dateComparison= (a,b)=>{
    const date1 = a?.Id
    const date2 = b?.Id
    return date1 - date2;
  }

  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let A = [];
      let Site= json?.projects?.find((p) => p?.projectId === GLOBAL?.ProjectId)

        Site?.sites?.forEach((obj) => {
          A.push({
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
          });
        });
      if(A?.length!==0)
        setmodules(A);
      else
        setmodules('');
      writeDataStorage(GLOBAL.All_Lists, json?.projects);
    });
  };
  const getSites = async () => {
    let json=JSON.parse (await AsyncStorage.getItem(GLOBAL.All_Lists))
    let A = [];
    if (json!==null) {
      let Site= json?.find((p) => p?.projectId === GLOBAL.ProjectId)
      Site?.sites?.forEach((obj) => {
        A.push({
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
        });
      });
      if(A?.length!==0)
        setmodules(A)
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
  const AddSites = (value) => {
  if(GeoAddressCity===''){
    settouch('City')
   setvalidatemsg('Please Select Your City')
 }
 else {
    setShowButton(false)
   var formdata = new FormData();
   formdata.append("siteName", value.sitename);
   formdata.append("userId", "1");
   formdata.append("notes", value.siteNote);
   formdata.append("projectId", GLOBAL.ProjectId);
   formdata.append("geoLat", location.latitude);
   formdata.append("geoLong", location.longitude);
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
       let A = [];
       let Count = 0;
       List_Item = modules;
       if (List_Item?.length !== 0) {
         A = [...List_Item];
       }
       if(AddId.length!==0)
         Count = parseInt(AddId[AddId?.length - 1]?.Id) + 1;
       else
         Count = Count + 1;
       A.push({
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
       List_Item = A;
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
        getCity(Default_countryId,adminArea);
      }
  };
  const getCity = async (value,adminArea) => {

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
  ///////////////////////////////////////////

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
                setShowWarningMessage={setShowWarningMessage}
                setShowMessage={setShowMessageUpdate} value={item}
                CityList={CityList} CountryList={CountryList}
                cityId={cityId} setcityId={setcityId} ShowButton={ShowButton}
                countryId={countryId} setcountryId={setcountryId}
                Message={Message}  data={data}
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
    <DYB_List_Item data={data_dyb} value={item}  SeeDetail={SeeDetail}
                   Navigate_Url={Navigate_Url}/>
  );
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']} StatusColor={route==='structure'?"#ffadad":'#ffc6bb'} onPress={goBack}
              Title={"Sites / Buildings"}/>
      {showWarning===true&&  <Warningmessage/>}
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
      <AddModal
        numberValue={2}
        GeoAddressCity={GeoAddressCity}
        GeoAddressCountry={GeoAddressCountry}
        GeoAddressStreet={GeoAddressStreet}
        GeoAddressPostalCode={GeoAddressPostalCode}
        CityList={CityList} CountryList={CountryList}
        location={location}
        setGeoAddressCity={setGeoAddressCity}
        setGeoAddressCountry={setGeoAddressCountry}
        setGeoAddressStreet={setGeoAddressStreet}
         setGeoAddressPostalCode={setGeoAddressPostalCode}
        setcountryId={setcountryId} setcityId={setcityId}
        ShowMessage={ShowMessage} Message={Message}
        ChangeChecked={ChangeChecked}
        validatemsg={validatemsg}
                    getCity={getCity} touch={touch}
                    setvisibleAddModal={setvisibleAddModal} visibleAddModal={visibleAddModal} setShowMessage={setShowMessage}
                    onPressAdd={AddSites} tittlebtn={"Add Site"} ShowButton={ShowButton}/>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}  />
    </Container>
  );
}

export default Project_Sites;
