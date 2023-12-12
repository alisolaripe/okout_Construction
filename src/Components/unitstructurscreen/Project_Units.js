import React, { useState, useEffect } from "react";
import {
  Text,
  View,Modal,Image,TouchableOpacity
} from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Header } from '../component/Header';
import {Footer1} from '../component/Footer';
import {AddModal} from '../component/AddModal'
import  Category_items_list  from "../component/Category_items_list";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import Geolocation from "react-native-geolocation-service";
import {FloatAddBtn} from "../component/FloatAddBtn";
import {readOnlineApi} from "../ReadPostApi";
import { geocodePosition, requestLocationPermission ,writeDataStorage,removeDataStorage} from "../Get_Location";
const Api = require("../Api");
const GLOBAL = require("../Global");
const data = [
  { label: "Edit", value: "4", Icon: "edit" },
  { label: "Delete", value: "5", Icon: "trash" },
  { label: "Photos", value: "6", Icon: "images" },
  { label: "Location", value: "15", Icon: "location" },
];
let City=[];
function Project_Units({ navigation, navigation: { goBack } }) {
  const [modules,setmodules]=useState([]);
  const [Message,setMessage]=useState("");
  const [ShowMessage,setShowMessage]=useState(false);
  const [ShowMessageDelete,setShowMessageDelete]=useState(false);
  const [Cheked,setCheked]=useState(false);
  const [CountryList,setCountryList] = useState([]);
  const [CityList,setCityList] = useState([]);
  const [GeoAddress,setGeoAddress] = useState(false);
  const [cityId,setcityId] = useState('');
  const [countryId,setcountryId] = useState('');
  const [GeoAddressPostalCode, setGeoAddressPostalCode] = useState('');
  const [GeoAddressStreet, setGeoAddressStreet] = useState('');
  const [location,setLocation] = useState(false);
  const [GeoAddressCountry,setGeoAddressCountry] = useState('');
  const [GeoAddressCity,setGeoAddressCity] = useState('');
  const [validatemsg,setvalidatemsg] = useState('');
  const [touch,settouch] = useState('');
  const [visibleAddModal,setvisibleAddModal]=useState(false);
  const [Json,setJson]=useState([]);
  const [ShowMessageUpdate,setShowMessageUpdate]=useState(false);
  const [AddId,setAddId]=useState(0);
  const [showModalDelete,setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);

  useEffect(() => {
    getLocation();
    const unsubscribe = navigation.addListener('focus', () => {
      getUnits();
    });
    return unsubscribe;
  }, []);
  ///////////////////////////////////////////////////
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo).then(json => {
      let A = [];
      let Filter_sites= json?.projects?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);

        Filter_units?.units?.forEach((obj) => {
          A.push({
            unitId: obj?.unitId,
            unitName: obj?.unitName,
            sectionCount: obj?.sectionCount,
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
            sections: obj?.sections
          });
        });
      if(A?.length!==0)
        setmodules(A);
      else
        setmodules('');
      writeDataStorage(GLOBAL.All_Lists,json?.projects);
    });
  };

  const AddUnits = (value) => {
      var formdata= new FormData();
      formdata.append("unitName",value.Unitname);
      formdata.append("userId", "1");
      formdata.append("notes",value.UnitNote);
      formdata.append("siteId",GLOBAL.SiteId);
      formdata.append("projectId",GLOBAL.ProjectId);
      formdata.append("geoLat", location.latitude);
      formdata.append("geoLong", location.longitude);
      formdata.append("geoAddress", GeoAddress);
      formdata.append("postalCode", value.GeoAddressPostalCode);
      formdata.append("cityId", cityId);
      formdata.append("countryId", countryId);
      formdata.append("street", value.GeoAddressStreet);

      writePostApi("POST", Api.CreateUnit,formdata).then(json => {
        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg);
            setShowMessage(true);
            setvisibleAddModal(false)
            getAllProjectInfo();
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 4125);
            return () => clearInterval(timerId);
          }
        }
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
            unitId: Count.toString(),
            unitName: value.Unitname,
            sectionCount: '0',
            task:'0',
            siteId:GLOBAL.SiteId,
            address:GeoAddress,
            geoLat:location.latitude,
            geoLong:location.longitude,
            cityName:GeoAddressCity,
            countryName:GeoAddressCountry,
            coutryId:countryId,
            cityId:cityId,
            postalCode:GeoAddressPostalCode,
            street:GeoAddressStreet,
            sections:[]
          });
          List_Item = A;
          setmodules(List_Item);
          SaveUnits(List_Item)
          let All_Sites = [];
          json?.forEach((obj) => {
            obj?.sites?.forEach((obj2) => {
              obj2?.units?.forEach((obj3) => {
                All_Sites?.push(
                  { Id: obj3?.unitId },
                );
              });
            });
          });
          All_Sites?.sort(dateComparison)
          setAddId(All_Sites);
          setMessage('Your unit successfully added')
          setShowMessage(true)
          setvisibleAddModal(false)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      });

  };
  const dateComparison= (a,b)=>{
    const date1 = a?.Id
    const date2 = b?.Id
    return date1 - date2;
  }
  const UpdateUnits = (value) => {

    var formdata = new FormData();
    formdata.append("unitName", value.Unitname);
    formdata.append("userId", "1");
    formdata.append("notes", value.UnitNote);
    formdata.append("unitId", GLOBAL.UpdateUnitID);
    formdata.append('geoLat', location.latitude);
    formdata.append('geoLong', location.longitude);
    formdata.append("postalCode",value.GeoAddressPostalCode);
    formdata.append("cityId",cityId);
    formdata.append("countryId",countryId);
    formdata.append("street",value.GeoAddressStreet);
    console.log(formdata,'formdata')
    writePostApi("POST", Api.UpdateUnit,formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowWarningMessage(false);
          setShowMessageUpdate(true);
          getAllProjectInfo();

        }
      }
      else  {
        let List_Item = modules;
        let index = List_Item?.findIndex((p) => p.unitId === GLOBAL.UpdateUnitID)
        let markers = [...List_Item];
        markers[index] = { ...markers[index], unitName: value.Unitname };
        setmodules(markers);
        SaveUnits(markers)
        setShowWarningMessage(false);
        setMessage('Your unit successfully updated')
        setShowMessageUpdate(true)

      }
    });
  };

  const getUnits =async () => {
    if(GLOBAL.isConnected===true)
    {
      let json=JSON.parse (await AsyncStorage.getItem(GLOBAL.All_Lists))
      if (json!==null) {
        let Filter_units = "";
        let Filter_sites = "";
        Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
        Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);

          let A = [];
          Filter_units?.units?.forEach((obj) => {
            A.push({
              unitId: obj?.unitId,
              unitName: obj?.unitName,
              sectionCount: obj?.sectionCount,
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
              sections: obj?.sections
            });
          })
        if(A?.length!==0)
          setmodules(A);
         else
          setmodules('');
      }
    }
    else {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists));
      if (json!==null) {
         setJson(json);
         let A = [];
         let Filter_units = "";
         let Filter_sites = "";
         Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
         Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);
         if (Filter_units?.units) {
           Filter_units?.units?.forEach((obj) => {
             A.push({
               unitId: obj?.unitId,
               unitName: obj?.unitName,
               sectionCount: obj?.sectionCount,
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
               sections: obj?.sections,
             });
           });
           if(A?.length!==0)
             setmodules(A);
           else
             setmodules('');
         }
         setGeoAddressCountry("United States");
         setGeoAddressCity("California");
         getCountry_city("United States", "California");
         let All_Sites = [];
         json?.forEach((obj) => {
           obj?.sites?.forEach((obj2) => {
             obj2?.units?.forEach((obj3) => {
             All_Sites?.push(
               { Id: obj3?.unitId },
             );
           });
           });
         });
         All_Sites?.sort(dateComparison)
         setAddId(All_Sites);
       }
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
      let Default_countryId=A?.find((p)=>p.label===country)?.value
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
  ////////////////////////////////////////////
  const onOpen =()=> {
    setvisibleAddModal(true);
  };
  const getDifference=(array1, array2)=> {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.unitId) === parseInt(object2.unitId) &&object1.unitName === object2.unitName
        && object1.cityName === object2.cityName && object1.countryName === object2.countryName
          && object1.postalCode === object2.postalCode && object1.street === object2.street

          ;
      });
    });
  }
  const SaveUnits=async (A)=>{

    let List=modules;
    let List_Item = Json;

    let Filter_sites=Json?.find((p)=>p?.projectId===GLOBAL.ProjectId)?.sites;
    let index_project=Json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
    let index_sites=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);

    let ListTotal=[...List_Item];
    let markers = [...Filter_sites];

        let different=getDifference(A, List)
        let Exist=false
        different?.forEach((obj) => {
          Exist=List?.findIndex((p)=>p.unitId===obj.unitId)
        })
        if(Exist===-1) {
          let MakeList = [].concat(modules,different);
          markers[index_sites] = { ...markers[index_sites], units: MakeList };
          ListTotal[index_project]={...ListTotal[index_project],sites: markers };
          writeDataStorage(GLOBAL.All_Lists,ListTotal)
      }
      else {
          markers[index_sites] = { ...markers[index_sites], units: A };
          ListTotal[index_project]={...ListTotal[index_project],sites: markers };
          writeDataStorage(GLOBAL.All_Lists,ListTotal)
        }
  }
  const DeleteUnits = (unitName) => {
    var formdata = new FormData();
    formdata.append("unitName",unitName);
    formdata.append("userId","1");
    formdata.append("notes","ffff");
    formdata.append("unitId",GLOBAL.UnitIdDelete);
    writePostApi("POST", Api.DeleteUnit, formdata).then(json => {
        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg);
            setShowMessageDelete(true);
            getAllProjectInfo();
            const timerId = setInterval(() => {
              setShowMessageDelete(false);
            }, 4115);
            return () => clearInterval(timerId);
          }
        }
        else  {
         let List_Item = modules;
          let index = List_Item?.findIndex((p) => p?.unitId === GLOBAL.UnitIdDelete);
          let markers = [...List_Item];
          markers?.splice(index,1);
          setMessage('Your unit successfully deleted');
          setShowMessageDelete(true);
          setmodules(markers);
          SaveUnits(markers);
          Delete_Detail_Offline()
          const timerId = setInterval(() => {
            setShowMessageDelete(false);
          }, 4115);
          return () => clearInterval(timerId);
        }
      });
  };
  const Delete_Detail_Offline=async ()=>{
    let Modules = await AsyncStorage.getItem(GLOBAL.UnitDetail_KEY)
    let Filter=JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId)!== parseInt(GLOBAL.UnitIdDelete))
    await AsyncStorage.setItem(GLOBAL.UnitDetail_KEY, JSON.stringify(Filter));
  }
  const ChangeChecked = (value) => {
    setCheked(!Cheked);
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
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#ffadad','#f67070','#FF0000']} StatusColor={'#ffadad'} onPress={goBack} Title={'Plots / Units'}/>
      <Content>
        <View style={Styles.containerList}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
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
          {
            modules!=='' ?
              <View style={[Styles.ItemsBox2]}>
            {modules && (
              modules?.map((item,index) =>{
                return (
                  <Category_items_list key={index} setShowMessage={setShowMessageUpdate} value={item} getCity={getCity} CityList={CityList} CountryList={CountryList}
                 Navigate_Url={Navigate_Url}  Message={Message} onPress={UpdateUnits} data={data}  cityId={cityId} setcityId={setcityId}
                  countryId={countryId} setcountryId={setcountryId}  ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                                       ShowMessage={ShowMessageUpdate} tittlebtn={'Update unit'} numberValue={12} onPressDelete={DeleteUnits}
                  />
                )})
            )}
          </View>:
              <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                 " No Units defined
                </Text>
                <Text style={Styles.EmptyText}>
                  Add by pressing button below "
                </Text>
              </View>
          }
        </View>
      </Content>
      <FloatAddBtn onPress={onOpen}/>
      <AddModal
        numberValue={11}
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
        getCity={getCity} touch={touch} setvisibleAddModal={setvisibleAddModal}
        visibleAddModal={visibleAddModal} setShowMessage={setShowMessage}
        onPressAdd={AddUnits} tittlebtn={'Add unit'}/>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}


export default Project_Units;
