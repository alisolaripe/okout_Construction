import React, { useState, useEffect } from "react";
import {
  Text,
  View, Modal, Image, TouchableOpacity, FlatList, ImageBackground,
} from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import List_Items from "../component/list_Items";
import { LogOutModal } from "../component/LogOutModal";
import Geolocation from "react-native-geolocation-service";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { readOnlineApi } from "../ReadPostApi";
import { geocodePosition, requestLocationPermission, writeDataStorage, removeDataStorage } from "../Get_Location";
import DYB_List_Item from "../component/DYB_List_Item";
const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
let City = [];
let Filter_units = "";
let Filter_sites = "";

function Project_Units({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [CountryList, setCountryList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [cityId, setcityId] = useState("");
  const [countryId, setcountryId] = useState("");
  const [GeoAddressPostalCode, setGeoAddressPostalCode] = useState("");
  const [GeoAddressStreet, setGeoAddressStreet] = useState("");
  const [location, setLocation] = useState(false);
  const [GeoAddressCountry, setGeoAddressCountry] = useState("");
  const [GeoAddressCity, setGeoAddressCity] = useState("");
  const [validatemsg, setvalidatemsg] = useState("");
  const [touch, settouch] = useState("");
  const [visibleAddModal, setvisibleAddModal] = useState(false);
  const [Json, setJson] = useState([]);
  const [ShowMessageUpdate, setShowMessageUpdate] = useState(false);
  const [AddId, setAddId] = useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [route, setroute] = useState("");
  const [ShowButton, setShowButton] = useState(true);

  const [CategoryId, setCategoryId] = useState(0);
  const [Selectedcategory, setSelectedcategory] = useState(0);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState(0);
  const [selectedrelatedname, setselectedrelatedname] = useState(0);
  const [marker, setmarker] = useState("");
  useEffect(() => {
    getLocation();
    const unsubscribe = navigation.addListener("focus", () => {
      setroute(GLOBAL.route);
      if (GLOBAL.route === "structure") {
        getUnits();
      } else {
        getUnits_dyb();
      }
    });
    return unsubscribe;

  }, []);
  //Get  Dyb===y unit Total List from AsyncStorage///
  const getUnits_dyb = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb));
    let Units_dyb = [];
    if (json !== null) {
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);
      if (Filter_units?.units) {
        Filter_units?.units?.forEach((obj) => {
          Units_dyb.push({
            Id: obj?.unitId,
            Name: obj?.unitName,
            Count: obj.sections?.length,
            NameCount: "section",
            task: obj?.task,
            ListName: "unit",
            address: obj?.address,
            geoLat: obj?.geoLat,
            geoLong: obj?.geoLong,
            cityName: GLOBAL.City?.cities?.find((p) => p?.cityId === obj?.address?.address_City)?.cityName,
            countryName: GLOBAL.Country?.countries?.find((p) => p?.countryId === obj?.address?.address_Country)?.countryName,
            postalCode: obj?.address?.address_Zip,
            street: obj?.address?.address_Street,
            sections: obj?.sections,
          });
        });
        if (Units_dyb?.length !== 0) {
          setmodules(Units_dyb);
        } else
          setmodules("");
      }
    }
  };
  //Get  Dyb===n unit Total List from Server///
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let units_List = [];
      let Filter_sites = json?.projects?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);
      Filter_units?.units?.forEach((obj) => {
        units_List.push({
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
          Location: {
            latitude: obj?.geoLat,
            longitude: obj?.geoLong,
          },
        });
      });
      if (units_List?.length !== 0)
        setmodules(units_List);
      else
        setmodules("");
      writeDataStorage(GLOBAL.All_Lists, json?.projects);
    });
  };
  /// Add and send new unit To server///
  const AddUnits = (value) => {
    setShowButton(false);
    var formdata = new FormData();
    formdata.append("unitName", value.Unitname);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", value.UnitNote);
    formdata.append("siteId", GLOBAL.SiteId);
    formdata.append("projectId", GLOBAL.ProjectId);
    formdata.append("geoLat", parseInt(location?.latitude).toFixed(7));
    formdata.append("geoLong", parseInt(location?.longitude).toFixed(7));
    formdata.append("geoAddress", GeoAddress);
    formdata.append("postalCode", value.GeoAddressPostalCode);
    formdata.append("cityId", cityId);
    formdata.append("countryId", countryId);
    formdata.append("street", value.GeoAddressStreet);
    writePostApi("POST", Api.CreateUnit, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          setvisibleAddModal(false);
          setShowButton(true);
          getAllProjectInfo();
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      } else {
        let List_Item = [];
        let Unit_ListCopy = [];
        let Count = 0;
        List_Item = modules;
        if (List_Item?.length !== 0) {
          Unit_ListCopy = [...List_Item];
        }
        if (AddId.length !== 0)
          Count = parseInt(AddId[AddId?.length - 1]?.Id) + 1;
        else
          Count = Count + 1;
        Unit_ListCopy.push({
          unitId: Count.toString(),
          unitName: value.Unitname,
          sectionCount: "0",
          task: "0",
          siteId: GLOBAL.SiteId,
          address: GeoAddress,
          geoLat: location.latitude,
          geoLong: location.longitude,
          cityName: GeoAddressCity,
          countryName: GeoAddressCountry,
          coutryId: countryId,
          cityId: cityId,
          postalCode: GeoAddressPostalCode,
          street: GeoAddressStreet,
          sections: [],
        });
        List_Item = Unit_ListCopy;
        setmodules(List_Item);
        SaveUnits(List_Item);
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
        All_Sites?.sort(dateComparison);
        setAddId(All_Sites);
        setMessage("Your unit successfully added");
        setShowMessage(true);
        setvisibleAddModal(false);
        setShowButton(true);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4125);
        return () => clearInterval(timerId);
      }
    });
  };
  /// compare 2 array by Id And sort///
  const dateComparison = (a, b) => {
    const date1 = a?.Id;
    const date2 = b?.Id;
    return date1 - date2;
  };
  ///Update unit in asyncstorage When app offline///
  const Update_Off = (value) => {
    let List_Item = modules;
    let index = List_Item?.findIndex((p) => p.unitId === GLOBAL.UpdateUnitID);
    let markers = [...List_Item];
    markers[index] = {
      ...markers[index], unitName: value.Unitname, cityName: GeoAddressCity, countryName: GeoAddressCountry,
      street: value.GeoAddressStreet, postalCode: value.GeoAddressPostalCode, address: value.GeoAddressStreet,
      geoLat: location.latitude, geoLong: location.longitude,
    };
    setmodules(markers);
    SaveUnits(markers);
  };
  //Get  Dyb===n unit Total List from AsyncStorage///
  const getUnits = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists));
    if (json !== null) {
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId);
      let Units_List = [];
      Filter_units?.units?.forEach((obj) => {
        Units_List.push({
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
          Location: {
            latitude: obj?.geoLat,
            longitude: obj?.geoLong,
          },
        });
      });
      if (Units_List?.length !== 0)
        setmodules(Units_List);
      else
        setmodules("");
    }
    if (GLOBAL.isConnected === false) {
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
      All_Sites?.sort(dateComparison);
      setAddId(All_Sites);
    }
  };
  ///get Country List///
  const getCountry_city = async (country, adminArea) => {
    let Country_List = [];
    GLOBAL.Country?.countries?.forEach((obj) => {
      if (obj?.countryName !== "") {
        Country_List.push({
          value: obj?.countryId,
          label: obj?.countryName,
        });
      }
    });
    setCountryList(Country_List);
    City = GLOBAL.City;
    let Default_countryId = Country_List?.find((p) => p.label === country)?.value;
    setcountryId(Default_countryId);
    if (Default_countryId !== "" || Default_countryId !== null) {
      getCity(Default_countryId, adminArea);
    }
  };
  ///get City List///
  const getCity = async (value, adminArea) => {
    let City_List = [];
    let City_filter = City?.cities?.filter((p) => p?.coutryId === value);
    City_filter?.forEach((obj) => {
      if (obj?.cityName !== "") {
        City_List.push({
          value: obj?.cityId,
          label: obj?.cityName,
          coutryId: obj?.coutryId,
        });
      }
    });
    setCityList(City_List);
    if (adminArea !== "") {
      let Default_cityId = City_List?.find((p) => p.label === adminArea)?.value;
      setcityId(Default_cityId);
    }
  };
  //get User Location///
  const getLocation = async () => {
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
              if (res) {
                setGeoAddress(res?.[0]?.formattedAddress);
                setGeoAddressCountry(res?.[0]?.country);
                setGeoAddressCity(res?.[0]?.adminArea);
                setGeoAddressPostalCode(res?.[0]?.postalCode);
                setGeoAddressStreet(res?.[0]?.streetName);
                getCountry_city(res?.[0]?.country, res?.[0]?.adminArea);
              } else {
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
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  ///compare 2 array and get  Difference//
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1.unitId) === parseInt(object2.unitId) && object1.unitName === object2.unitName
          && object1.cityName === object2.cityName && object1.countryName === object2.countryName
          && object1.postalCode === object2.postalCode && object1.street === object2.street;
      });
    });
  };
  ///add And Update new unit list asyncStorage When app is Offline Mode///
  const SaveUnits = async (A) => {
    let List = modules;
    let List_Item = Json;
    let Filter_sites = Json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
    let index_project = Json?.findIndex((p) => p?.projectId === GLOBAL.ProjectId);
    let index_sites = Filter_sites?.findIndex((p) => p?.siteId === GLOBAL.SiteId);
    let ListTotal = [...List_Item];
    let markers = [...Filter_sites];
    let different = getDifference(A, List);
    let Exist = false;
    different?.forEach((obj) => {
      Exist = List?.findIndex((p) => p.unitId === obj.unitId);
    });
    if (Exist === -1) {
      let MakeList = [].concat(modules, different);
      markers[index_sites] = { ...markers[index_sites], units: MakeList };
      ListTotal[index_project] = { ...ListTotal[index_project], sites: markers };
      writeDataStorage(GLOBAL.All_Lists, ListTotal);
    } else {
      markers[index_sites] = { ...markers[index_sites], units: A };
      ListTotal[index_project] = { ...ListTotal[index_project], sites: markers };
      writeDataStorage(GLOBAL.All_Lists, ListTotal);
    }
  };
  const DeleteUnits = (unitName) => {
    var formdata = new FormData();
    formdata.append("unitName", unitName);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", "ffff");
    formdata.append("unitId", GLOBAL.UnitIdDelete);
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
      } else {
        let List_Item = modules;
        let index = List_Item?.findIndex((p) => p?.unitId === GLOBAL.UnitIdDelete);
        let markers = [...List_Item];
        markers?.splice(index, 1);
        setMessage("Your unit successfully deleted");
        setShowMessageDelete(true);
        setmodules(markers);
        SaveUnits(markers);
        Delete_Detail_Offline();
        const timerId = setInterval(() => {
          setShowMessageDelete(false);
        }, 4115);
        return () => clearInterval(timerId);
      }
    });
  };
  ///delete unit when app is offline///
  const Delete_Detail_Offline = async () => {
    let Modules = await AsyncStorage.getItem(GLOBAL.UnitDetail_KEY);
    let Filter = JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.UnitIdDelete));
    await AsyncStorage.setItem(GLOBAL.UnitDetail_KEY, JSON.stringify(Filter));
  };
  const ChangeChecked = (value) => {
    setCheked(!Cheked);
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const renderItem = ({ item, index }) => (
    <List_Items key={index} setShowMessage={setShowMessageUpdate} value={item} getCity={getCity} CityList={CityList}
                CountryList={CountryList}
                Navigate_Url={Navigate_Url} Message={Message} Update_Off={Update_Off} data={GLOBAL.Unitdata}
                getAllProjectInfo={getAllProjectInfo}
                ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                ShowMessage={ShowMessageUpdate} tittlebtn={"Update Unit"} location={location} numberValue={12}
                onPressDelete={DeleteUnits} ShowButton={ShowButton}
                setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                setCountryList={setCountryList} setCityList={setCityList} setLocation={setLocation}
                setGeoAddress={setGeoAddress}
                setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId} marker={marker}
                setmarker={setmarker}
    />
  );
  const renderSectionHeader = () => (
    <>
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
    </>
  );
  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const SeeDetail = (Id) => {
    GLOBAL.UnitId = Id;
    navigation.navigate("Project_Section2");
  };
  const renderItem_dyb = ({ item }) => (
    <DYB_List_Item SeeDetail={SeeDetail} data={GLOBAL.Unitdata_dyb} value={item} Navigate_Url={Navigate_Url} />
  );
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
              StatusColor={route === "structure" ? "#ffadad" : "#ffc6bb"} onPress={goBack} Title={"Plots / Units"} />
      <ImageBackground source={Photoes.unitBack}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
      <View style={Styles.containerList}>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
        {
          route === "structure" ?
            <>
              {
                modules !== "" ?
                  <View style={[Styles.Center_margin_Bottom3]}>
                    {modules && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={modules}
                        style={{ width: "100%", flexGrow: 0 }}
                        renderItem={renderItem}
                        ListHeaderComponent={renderSectionHeader}
                        ListFooterComponent={renderSectionFooter}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                      />
                    )}
                  </View> :
                  <View style={Styles.With90CenterVertical}>
                    <Text style={Styles.EmptyText}>
                      " No Units defined
                    </Text>
                    <Text style={Styles.EmptyText}>
                      Add by pressing button below "
                    </Text>
                  </View>
              }
            </> :
            <>
              {
                modules !== "" ?
                  <View style={Styles.ItemsBoxDyb}>
                    {modules && (
                      <FlatList
                        data={modules}
                        showsVerticalScrollIndicator={false}
                        style={{ width: "100%" }}
                        renderItem={renderItem_dyb}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                      />
                    )}
                  </View> :
                  <View style={Styles.With90CenterVertical}>
                    <Text style={Styles.EmptyText}>
                      " No Unites defined "
                    </Text>
                  </View>
              }
            </>
        }
      </View>
      {
        route === "structure" ?
          <FloatAddBtn onPress={onOpen} colors={["#ffadad", "#f67070", "#FF0000"]} /> : null}
      </ImageBackground>
      <AddModal
        numberValue={11}
        GeoAddressCity={GeoAddressCity}
        GeoAddressCountry={GeoAddressCountry}
        CityList={CityList} CountryList={CountryList}
        location={location}
        GeoAddressStreet={GeoAddressStreet} GeoAddress={GeoAddress} GeoAddressPostalCode={GeoAddressPostalCode}
        setGeoAddressCity={setGeoAddressCity}
        setGeoAddressCountry={setGeoAddressCountry}
        setGeoAddressStreet={setGeoAddressStreet}
        setGeoAddressPostalCode={setGeoAddressPostalCode}
        setcountryId={setcountryId} setcityId={setcityId}
        ShowMessage={ShowMessage} Message={Message}
        ChangeChecked={ChangeChecked} setCategoryId={setCategoryId}
        validatemsg={validatemsg}
        setCountryList={setCountryList} setCityList={setCityList} setLocation={setLocation}
        setGeoAddress={setGeoAddress}
        getCity={getCity} touch={touch} setvisibleAddModal={setvisibleAddModal}
        visibleAddModal={visibleAddModal} setShowMessage={setShowMessage} marker={marker} setmarker={setmarker}
        setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
        setselectedrelatedname={setselectedrelatedname}
        onPressAdd={AddUnits} tittlebtn={"Add Unit"} ShowButton={ShowButton} />
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Project_Units;
