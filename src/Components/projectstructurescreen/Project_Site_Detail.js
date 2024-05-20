import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView, TouchableOpacity, Modal, FlatList, BackHandler,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";

import Geolocation from "react-native-geolocation-service";
import { Modalize } from "react-native-modalize";
import { ButtonI } from "../component/ButtonI";
import { Image } from "react-native-compressor";
import { LogOutModal } from "../component/LogOutModal";
import { removeDataStorage, requestLocationPermission, geocodePosition } from "../Get_Location";
import List_Item_Detail_Images from "../component/List_Item_Detail_Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi,selectPhotocamera,selectPhotoGallery } from "../writePostApi";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { Filter } from "../component/Filter";
import { readOnlineApi } from "../ReadPostApi";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Geocoder from "react-native-geocoder";

let ImageList = [];
let ImageListUpload = [];
let Full = "";
let TodayDate = "";
let Day = "";
let Month = "";
let List = [];
const Api = require("../Api");
const GLOBAL = require("../Global");

function Project_Site_Detail({ navigation, navigation: { goBack } }) {
  const modalizeRef = React.createRef();
  const scrollViewRef = useRef();
  const [ImageSource, setImageSource] = useState("");
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [location, setLocation] = useState(false);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [ShowFilter, setShowFilter] = useState(false);
  const [MudolList, setMudolList] = useState([]);
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [ShowDateRange, setShowDateRange] = useState(false);
  const [DateRangeList, setDateRangeList] = useState([]);
  const [Country, setCountry] = useState(false);
  const [scroll, setscroll] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);

  useEffect(() => {
    Geocoder.fallbackToGoogle(GLOBAL.mapKeyValue);
    console.log('useEffect')
    getSitesDetail();
    getLocation();
    const date = new Date();
    Day = date.getDate();
    Month = date.getMonth() + 1;
    const Year = date.getFullYear();
    const Hour = date.getHours();
    const Minute = date.getMinutes();
    const Second = date.getSeconds();
    TodayDate = `${Year}-${Month}-${Day}`;
    Full = `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
  }, []);
  ///get user loction ///
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
                setCountry(res?.[0]?.country + " " + res?.[0]?.adminArea);
              } else {
                setGeoAddress("");
                setCountry("");
              }
            })
              .catch(err => {
              });
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
  ///compare 2 array by date and sort///
  const dateComparison_data = (a, b) => {
    const date1 = new Date(a?.Date);
    const date2 = new Date(b?.Date);
    return date1 - date2;
  };
  /// sort date and make list by week by week///
  const Make_Week_Filter_List = (A) => {
    let Week_List = [];
    let endDate_Format = "";
    let today = "";
    let tomorrow = "";
    let endDate = "";
    let Exist = "";
    A?.forEach((obj) => {
      if (obj?.Date !== "") {
        today = new Date(obj?.Date);
        tomorrow = new Date(today);
        if (obj?.WeekDay === "Sunday") {
          tomorrow?.setDate(today?.getDate() + 1);
          endDate = tomorrow?.toLocaleDateString();
        } else if (obj?.WeekDay === "Monday") {
          tomorrow?.setDate(today.getDate() + 7);
          endDate = tomorrow?.toLocaleDateString();
        } else if (obj?.WeekDay === "Tuesday") {
          tomorrow?.setDate(today?.getDate() + 6);
          endDate = tomorrow?.toLocaleDateString();

        } else if (obj?.WeekDay === "Wednesday") {
          tomorrow?.setDate(today?.getDate() + 5);
          endDate = tomorrow?.toLocaleDateString();

        } else if (obj?.WeekDay === "Thursday") {
          tomorrow?.setDate(today?.getDate() + 4);
          endDate = tomorrow?.toLocaleDateString();

        } else if (obj?.WeekDay === "Friday") {
          tomorrow?.setDate(today?.getDate() + 3);
          endDate = tomorrow?.toLocaleDateString();
        } else if (obj?.WeekDay === "Saturday") {
          tomorrow?.setDate(today?.getDate() + 2);
          endDate = tomorrow?.toLocaleDateString();
        }
        let newString = endDate.split("/");
        endDate_Format = newString?.[2] + "-" + newString?.[1] + "-" + newString?.[0];
        Exist = Week_List?.findIndex((p) => p.endDate === endDate_Format);
        if (Exist === -1) {
          Week_List.push({
            startDate: obj?.Date?.split(" ")?.[0],
            endDate: endDate_Format,
          });
        }
      }
    });
    setDateRangeList(Week_List);
  };
  ///calculate Names of the days of the week///
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  };
  ///get site detail from serve///
  const getSitesDetail = async () => {
    let mark2 = {
      uri: "",
      type: "",
      fileName: "",
      buildId: "",
      Type: "",
      Day: "",
      Date: "",
      Month: "",
      WeekDay: "",
      relatedId: "",
      buildIdAttachmentId: "",
      geoLat: "",
      geoLong: "",
      geoAddress: "",
      Country: "",
    };
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getBuildNotes + `userId=${GLOBAL.UserInformation?.userId}&relatedId=${GLOBAL.UpdateSiteID}&relatedName=site`).then(json => {
        let Site_Detail = [];
        let Country = "";
        let Address = "";
        json?.buildNotes?.forEach((obj) => {
          obj?.attachements?.forEach((obj2) => {
            const Day = obj2?.postDate?.split("-");
            const W = Day?.[2]?.split(" ");
            if (obj2?.geoAddress !== "false") {
              Address = obj2?.geoAddress?.split(",");
              Country = Address?.[3] + Address?.[1];
            } else {
              Country = "";
            }
            if (obj2?.imageUrl !== null) {
              Site_Detail.push({
                uri: GLOBAL.OrgAppLink_value + "/" + obj2?.imageUrl,
                type: obj2?.imageName?.split(".")?.[1],
                fileName: obj2?.imageName,
                buildId: obj2.buildId,
                Type: "",
                Day: W?.[0],
                Date: obj2?.postDate,
                Month: Day?.[1],
                WeekDay: getDayOfWeek(obj2?.postDate),
                relatedId: obj.buildIdRelatedId,
                buildIdAttachmentId: obj2.buildIdAttachmentId,
                geoLat: obj2?.geoLat,
                geoLong: obj2?.geoLong,
                geoAddress: obj2?.geoAddress,
                Country: Country,
              });
            }
          });
        });
        if (GLOBAL.route === "structure") {
          if (Site_Detail?.length !== 0) {
            Site_Detail = [mark2, ...Site_Detail];
            Site_Detail?.sort(dateComparison_data);
            setImageSourceviewarray(Site_Detail);
            setMudolList(Site_Detail);
            Make_Week_Filter_List(Site_Detail);
            Save_Details_Online(Site_Detail);
          } else {
            Site_Detail = [mark2];
            setImageSourceviewarray(Site_Detail);
          }
        } else {
          if (Site_Detail?.length !== 0) {
            Site_Detail?.sort(dateComparison_data);
            setImageSourceviewarray(Site_Detail);
            setMudolList(Site_Detail);
            Make_Week_Filter_List(Site_Detail);
            Save_Details_Online(Site_Detail);
          } else {
            setImageSourceviewarray("");
          }
        }
      });
    } else {
      let Site_Detail = [];
      let Filter = JSON.parse(await AsyncStorage.getItem(GLOBAL.SiteDetail_KEY))?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateSiteID));

      if (Filter) {
        if (GLOBAL.route === "structure") {
          Site_Detail = [mark2, ...Filter];
          Site_Detail?.sort(dateComparison_data);
          Make_Week_Filter_List(Site_Detail);
          setImageSourceviewarray(Site_Detail);
          setMudolList(Site_Detail);
        } else {
          Filter?.sort(dateComparison_data);
          Make_Week_Filter_List(Filter);
          setImageSourceviewarray(Filter);
          setMudolList(Filter);
        }
      }
      setGeoAddress("");
      setCountry("");
    }
  };
  ///user can change photos date if select from gallery///
  const Change_Gallry_Date = (date, buildId) => {
    let List_Item = [];
    List_Item = ImageSourceviewarrayUpload;
    let List_Item_array = [];
    List_Item_array = ImageSourceviewarray;
    let index_array = List_Item_array?.findIndex((p) => p?.buildId === buildId);
    let markers_array = [...List_Item_array];
    markers_array[index_array] = {
      ...markers_array[index_array],
      Date: date,
      Day: date?.split("-")?.[2]?.split(" ")?.[0],
      Month: date?.split("-")?.[1],
    };
    markers_array?.sort(dateComparison_data);
    setImageSourceviewarray(markers_array);
    Make_Week_Filter_List(markers_array);
    let index = List_Item?.findIndex((p) => p?.buildId === buildId);
    let markers = [...List_Item];
    markers[index] = {
      ...markers[index],
      Date: date,
      Day: date?.split("-")?.[2]?.split(" ")?.[0],
      Month: date?.split("-")?.[1],
    };
    setImageSourceviewarrayUpload(markers);
    Save_Details(markers_array);
  };
  /// sort photos by week ///
  const SortByWeek = (startDate, endDate) => {
    let Filter = MudolList;
    let Week_List = [];
    let Filter2 = [];
    const firstDate = startDate;
    const secondDate = endDate;
    const today = firstDate?.split("-")?.[2];
    const sevenDaysBefore = secondDate?.split("-")?.[2];
    const Monthtoday = firstDate?.split("-")?.[1];
    const MonthsevenDaysBefore = secondDate?.split("-")?.[1];
    Week_List = Filter?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday) || parseInt(p.Month) === parseInt(MonthsevenDaysBefore));
    if (parseInt(Monthtoday) === parseInt(MonthsevenDaysBefore)) {
      Filter2 = Week_List?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore) && parseInt(p.Day) >= parseInt(today));
      setshowModalCalender(false);
    } else {
      let todays = [];
      let Copy = [];
      let sevenDaysBefores = [];
      let MonthsevenDaysBeforeList = Filter?.filter((p) => parseInt(p.Month) === parseInt(MonthsevenDaysBefore));
      let MonthtodayList = Filter?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday));
      todays = MonthtodayList?.filter((p) => parseInt(p.Day) >= parseInt(today));
      sevenDaysBefores = MonthsevenDaysBeforeList?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore));
      Copy = [].concat(sevenDaysBefores, todays);
      Filter2 = Copy;
      setshowModalCalender(false);
    }
    setShowDateRange(true);
    setImageSourceviewarray(Filter2);
  };
  ///show week list///
  const _showModalCalender = () => {
    return (
      <SafeAreaView style={[Styles.CalenderBox]}>
        <View style={Styles.With100List2}>
          <Text style={Styles.WeekFilterTextMiddel}>
            Week beginning
          </Text>

          <Text style={Styles.WeekFilterTextMiddel}>
            Week ending
          </Text>
        </View>
        <View style={Styles.Calender}>
          {
            DateRangeList.map((value, index) => {
              return (
                <TouchableOpacity onPress={() => {
                  SortByWeek(value.startDate, value.endDate);
                  setRange({ firstDate: value.startDate, secondDate: value.endDate });
                }} key={index} style={Styles.With100List}>
                  <Text style={Styles.WeekFilterText}>
                    {value.startDate}
                  </Text>
                  <Text style={Styles.WeekFilterText}>
                    {value.endDate}
                  </Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <View style={Styles.With50List}>
          <ButtonI
            style={Styles.btnFilter}
            onpress={() => {
              setshowModalCalender(false);
              setShowDateRange(false);
            }}
            categoriIcon={"Nopadding"}
            title={"Close"}
            colorsArray={["#b9a4ff", "#9f83ff", "#7953FAFF"]}
            styleTxt={[Styles.txtbtn, { fontSize: normalize(13) }]} sizeIcon={27} />
        </View>
      </SafeAreaView>
    );
  };
  ///add new image in list when user Offline///
  const AddImageOffline = () => {
    let List_Item = [];
    let Image_List = [];
    List_Item = ImageSourceviewarray?.filter((p) => p.Type === "");
    Image_List = [...List_Item];
    ImageSourceviewarrayUpload?.forEach((obj) => {
      Image_List.push({
        uri: obj.uri,
        type: obj?.type,
        fileName: obj?.fileName,
        buildId: obj.buildId,
        Type: "",
        Day: obj.Day,
        Month: obj.Month,
        Date: obj.Date,
        relatedId: GLOBAL.UpdateSiteID,
        geoLat: obj.geoLat,
        geoLong: obj.geoLong,
        geoAddress: obj.geoAddress,
        Country: obj.Country,
        WeekDay: obj.WeekDay,

      });
    });
    if (Image_List?.length !== 0) {
      Image_List?.sort(dateComparison_data);
      Make_Week_Filter_List(Image_List);
    }
    List_Item = Image_List;
    setImageSourceviewarray(Image_List);
    setMudolList(Image_List);
    setImageSourceviewarrayUpload([]);
    Save_Details(List_Item);
  };
  ///add or update sitedetails in asyncStorage when app is offline///
  const Save_Details = async (A) => {
    let AllList = [];
    let SiteDetailList = JSON.parse(await AsyncStorage.getItem(GLOBAL.SiteDetail_KEY));
    if (SiteDetailList !== null && SiteDetailList?.length !== 0) {
      let Filter = SiteDetailList?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateSiteID));
      const flag = compareTwoArrayOfObjects(Filter, A);
      if (flag === false) {
        let different = getDifference(A, Filter);
        let Exist = false;
        different?.forEach((obj) => {
          Exist = Filter.findIndex((p) => p.buildId === obj.buildId);
        });
        if (Exist === -1) {
          let MakeList = [].concat(Filter, different);
          AllList = [...SiteDetailList?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.UpdateSiteID)), ...MakeList];
        } else {
          AllList = [...SiteDetailList?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.UpdateSiteID)), ...A];
        }
        AllList?.sort(dateComparison_data);
        await AsyncStorage.setItem(GLOBAL.SiteDetail_KEY, JSON.stringify(AllList));
      }
    } else if (A?.length !== 0 && SiteDetailList === null) {
      A?.sort(dateComparison_data);
      await AsyncStorage.setItem(GLOBAL.SiteDetail_KEY,
        JSON.stringify(A),
      );
    }
  };
  ///Delete Photos///
  const DeleteImage = (buildId) => {
    let List_Item = ImageSourceviewarray;
    const index = List_Item?.findIndex((p) => p?.buildId === buildId);
    let markers = [...List_Item];
    markers?.splice(index, 1);
    markers?.sort(dateComparison_data);
    setImageSourceviewarray(markers);
    setMudolList(markers);
    Save_Details(markers);
  };
  ///Reduce the size of the photo///
  const Image_compress = async (path) => {
    return await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    });
  };

  const selectPhotoFromGallery = () => {
    onClose();
    selectPhotoGallery().then(response => {

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      }
      else {
        if (ImageSourceviewarray)
          ImageList = [...ImageSourceviewarray];
        if (ImageSourceviewarrayUpload)
          ImageListUpload = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let D = "";
          let B = "";
          let RealDate = "";
          let Months = "";
          let buildid = 0;
          if (obj?.exif?.DateTimeDigitized !== null) {
            D = obj?.exif?.DateTimeDigitized?.split(":");
            B = D?.[2]?.split(" ");
            RealDate = `${D?.[0]}-${D?.[1]}-${B?.[0]} ${B?.[1]}:${D?.[3]}:${D?.[4]}`;
            Months = D?.[1];
          } else {
            RealDate = Full;

            Months = Month;
          }
          let WeekDay = getDayOfWeek(RealDate);
          if (ImageList.length !== 0) {
            buildid = parseInt(ImageList?.[ImageList.length - 1]?.buildId) + 1;
          } else {
            buildid = buildid + 1;
          }
          Image_compress(obj.path).then(res => {

            ImageList.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              buildId: buildid,
              title: "",
              Date: RealDate,
              Type: "Gallery",
              Day: parseInt(B?.[0]),
              Month: Months,
              geoLat: location.latitude,
              geoLong: location.longitude,
              geoAddress: GeoAddress,
              Country: Country,
              WeekDay: WeekDay,
            });
            ImageListUpload.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              buildId: buildid,
              title: "",
              Type: "Gallery",
              Date: RealDate,
              Day: parseInt(B?.[0]),
              Month: Months,
              geoLat: location.latitude,
              geoLong: location.longitude,
              geoAddress: GeoAddress,
              Country: Country,
              WeekDay: WeekDay,
            });
            List.push({
              Type: "Gallery",
            });
            if (List?.length === response?.length) {

              if (ImageList?.length !== 0) {
                ImageList.sort(dateComparison_data);
                Make_Week_Filter_List(ImageList);
              }
              setImageSourceviewarray(ImageList);
              setMudolList(ImageList);
              setImageSourceviewarrayUpload(ImageListUpload);
              scrollViewRef.current.scrollToEnd({ animated: true });
              setscroll(true);
              setShowBackBtn(false);
              List = [];
              ImageList = [...ImageList];
              ImageListUpload = [...ImageListUpload];
            }
          });
        }
      }
    })
  };
  const selectPhoto = () => {
    onClose();
    selectPhotocamera().then(response => {
      var getFilename = response?.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      setImageSource(response.path);
      if (ImageSourceviewarray)
        ImageList = [...ImageSourceviewarray];
      if (ImageSourceviewarrayUpload)
        ImageListUpload = [...ImageSourceviewarrayUpload];

      let buildid = 0;

      if (ImageList?.length !== 0) {
        buildid = parseInt(ImageList?.[ImageList?.length - 1]?.buildId) + 1;
      } else {
        buildid = buildid + 1;
      }

      let WeekDay = getDayOfWeek(Full);
      Image.compress(response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {

        ImageList.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          buildId: buildid,
          title: "",
          Date: Full,
          Type: "Camera",
          Day: Day,
          Month: Month,
          geoLat: location.latitude,
          geoLong: location.longitude,
          geoAddress: GeoAddress,
          Country: Country,
          WeekDay: WeekDay,
        });

        ImageListUpload.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          buildId: buildid,
          title: "",
          Date: Full,
          Type: "Camera",
          Day: Day,
          Month: Month,
          geoLat: location.latitude,
          geoLong: location.longitude,
          geoAddress: GeoAddress,
          Country: Country,
          WeekDay: WeekDay,
        });
        if (ImageList?.length !== 0) {
          ImageList?.sort(dateComparison_data);
          Make_Week_Filter_List(ImageList);
        }
        setImageSourceviewarray(ImageList);
        setMudolList(ImageList);
        setImageSourceviewarrayUpload(ImageListUpload);
        scrollViewRef.current.scrollToEnd({ animated: true });
        setscroll(true);
        setShowBackBtn(false);
        ImageList = [...ImageList];
        ImageListUpload = [...ImageListUpload];
    })
    })
  };
  ///Add new Photos for Site and sent to server////
  const AddSitesImage = () => {
    let idsArray = "";
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("relatedName", "site");
    formData.append("relatedId", GLOBAL.UpdateSiteID);
    formData.append("geoLat", location.latitude);
    formData.append("geoLong", location.longitude);
    formData.append("geoAddress", GeoAddress);
    formData.append("buildType", "general");
    if (ImageSourceviewarrayUpload.length !== 0) {
      for (let i = 0; i < ImageSourceviewarrayUpload.length; i++) {
        idsArray = ImageSourceviewarrayUpload[i];
        formData.append("attachment", {
          uri: idsArray.uri,
          type: idsArray.type,
          name: idsArray.fileName,
        });
        formData.append("postDate", idsArray.Date);
        writePostApi("POST", Api.AddBuildNotes, formData, ImageSourceviewarrayUpload).then(json => {
          if (json) {
            if (json?.status === true) {
              setMessage(json?.msg);
              setShowMessage(true);
              setShowBackBtn(true);
              setTimeout(function() {
                setShowMessage(false);
              }, 4000);
              Navigate_Url("Project_Sites");
            }
          } else {
            setMessage("Your BuildNotes successfully added");
            setShowMessage(true);
            setShowBackBtn(true);
            setTimeout(function() {
              setShowMessage(false);
            }, 4000);
            Navigate_Url("Project_Sites");
          }
        });
      }
      AddImageOffline();
    }
  };
  ///compare 2 array and get  Difference///
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return object1.buildId === object2.buildId && object1.fileName === object2.fileName;
      });
    });
  };
  ///save unit detail information in asyncStorage.to use when app offline///
  const Save_Details_Online = async (A) => {
    let AllList = [];
    let SiteDetailList = JSON.parse(await AsyncStorage.getItem(GLOBAL.SiteDetail_KEY));
    let FilterList = SiteDetailList?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.UpdateSiteID));
    if (SiteDetailList !== null && FilterList !== null) {
      AllList = [...FilterList, ...A];
    } else {
      AllList = A;
    }
    await AsyncStorage.setItem(GLOBAL.SiteDetail_KEY, JSON.stringify(AllList));
  };
  ///compare 2 array and return they are same or not///
  const compareTwoArrayOfObjects = (
    first_array_of_objects,
    second_array_of_objects,
  ) => {
    return (
      first_array_of_objects.length === second_array_of_objects.length &&
      first_array_of_objects.every((element_1) =>
        second_array_of_objects.some((element_2) =>
          Object.keys(element_1).every((key) => element_1[key] === element_2[key]),
        ),
      )
    );
  };
  const DeleteImageFromApi = (buildId) => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("buildNoteId", buildId);
    formData.append("notes", "delete");
    writePostApi("POST", Api.DeleteBuildNote, formData, buildId).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json.msg);
          setShowMessage(true);
          DeleteImage(buildId);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      } else {
        setMessage("Your unit successfully deleted");
        setShowMessage(true);
        DeleteImage(buildId);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4000);
        return () => clearInterval(timerId);
      }
    });
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  ///sort list button =>id==0 means all photos,id==1 means filter by week and id==2 means today photos///
  const FilterFunc = (id) => {
    if (id === 0) {
      setImageSourceviewarray(MudolList);
    } else if (id === 1) {
      setshowModalCalender(true);
    } else if (id === 2) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth();
      let A = [];
      A = MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      setImageSourceviewarray(A);
    }
  };
  const renderContent = () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={() => onClose()} style={Styles.CancelBtn}>
        <View style={{ width: "80%" }}>
          <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhoto();
      }} style={Styles.UploadBtn}>
        <AntDesign name={"camera"} size={17} color={"#fff"} />
        <Text style={[Styles.TextUploadBtn]}>
          Use Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhotoFromGallery();
      }} style={Styles.UploadBtn}>
        <AntDesign name={"picture"} size={17} color={"#fff"} />
        <Text style={[Styles.TextUploadBtn]}>
          Choose From Gallery
        </Text>
      </TouchableOpacity>
    </View>
  );
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
  ///header back button =>if add photos and did not send server send message if not navigate back///
  const Back_navigate = () => {
    if (ShowBackBtn === false) {
      setShowWarningMessage(true);
      scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
      setscroll(false);
      setShowBackBtn(true);
    } else {
      goBack();
    }
  };
  const renderItem = ({ item }) => (
    <List_Item_Detail_Images value={item} Change_Gallry_Date={Change_Gallry_Date}
                             DeleteImage={DeleteImageFromApi} Type={"Feature"} onOpen={onOpen} />
  );
  const renderSectionHeader = () => (
    <>
      {ShowMessage === true ?
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <View style={Styles.flashMessageSuccsess}>
            <View style={{ width: "10%" }} />
            <View style={{ width: "80%" }}>
              <Text style={Styles.AlertTxt}>
                {Message}
              </Text>
            </View>
            <View style={{ width: "10%" }} />
          </View>
        </View>
        : null}
      {ShowWarningMessage === true &&
      <View style={Styles.flashMessageWarning4}>
        <View style={Styles.flashMessageWarning6}>
          <View style={{ width: "10%", alignItems: "center", justifyContent: "flex-start" }}>
            <FontAwesome size={normalize(18)} color={"#fff"} name={"exclamation-circle"} />
          </View>
          <View style={{ width: "90%", alignItems: "flex-start" }}>
            <Text style={Styles.AddedtTxt}>
              You will lose all changes.Do you still want to leave?
            </Text>
          </View>
        </View>
        <View style={Styles.With100Row2}>
          <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              setShowBackBtn(false);
              setShowWarningMessage(false);
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              setShowWarningMessage(false);
              setShowBackBtn(true);
              navigation.navigate("Project_Sites");
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      }
      {ImageSourceviewarray?.length > 1 ?
        <Filter FilterFunc={FilterFunc} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter}
                setShowFilter={setShowFilter} />
        : null
      }
      {ShowDateRange === true ?
        <TouchableOpacity onPress={() => setshowModalCalender(true)} style={Styles.WeekFilterBox}>
          <Text style={[Styles.txtFilter3,{color:GLOBAL.headertext_backgroundColor}]}>
            Start Date
          </Text>
          <View style={[Styles.WeekFilterBoxItem]}>
            <Text style={Styles.txtFilternumber}>
              {selectedRange.firstDate}
            </Text>
          </View>
          <Text style={[Styles.txtFilter3]}>
            End Date
          </Text>
          <View style={[Styles.WeekFilterBoxItem]}>
            <Text style={Styles.txtFilternumber}>
              {selectedRange.secondDate}
            </Text>
          </View>
        </TouchableOpacity> : null
      }
    </>
  );
  const ListFooter = () => (
    <View style={Styles.ViewItems_center_transparent}>
      {ImageSourceviewarrayUpload?.length !== 0 ?
        <ButtonI
          style={Styles.btn23}
          onpress={AddSitesImage}
          categoriIcon={""}
          title={"Save photos"}
          colorsArray={["#ffadad", "#f67070", "#FF0000"]}
          styleTxt={[Styles.txtbtn, { fontSize: normalize(16) }]} sizeIcon={27} /> : null
      }
    </View>
  );
  const renderItem_dyb = ({ item }) => (
    <List_Item_Detail_Images value={item} Type={"DYB"}
    />
  );
  return (
    <Container style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header
        colors={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
        StatusColor={GLOBAL.route === "structure" ? "#ffadad" : "#ffc6bb"} onPress={Back_navigate}
        Title={"Sites / Buildings Detail"} />
      <View style={Styles.containerList}>
        {
          showModalCalender &&
          _showModalCalender()
        }
        <View style={Styles.Center_margin_Bottom2}>
          {showModalDelete &&
          <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
          }
          {
            GLOBAL.route === "structure" ?
              <>
                {ImageSourceviewarray && (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ImageSourceviewarray}
                    style={{ width: "100%", flexGrow: 0 }}
                    renderItem={renderItem}
                    ListHeaderComponent={renderSectionHeader}
                    ListFooterComponent={ListFooter}
                    ref={scrollViewRef}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ justifyContent: "space-between" }}
                    numColumns={2}
                    key={"#"}
                    keyExtractor={(item, index) => {
                      return "#" + index.toString();
                    }}
                  />
                )}
              </> :
              <>
                {ImageSourceviewarray && (
                  <FlatList
                    ref={scrollViewRef}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ justifyContent: "space-between" }}
                    data={ImageSourceviewarray}
                    numColumns={2}
                    style={{ width: "100%" }}
                    ListHeaderComponent={renderSectionHeader}
                    renderItem={renderItem_dyb}
                    key={"#"}
                    keyExtractor={(item, index) => {
                      return "#" + index.toString();
                    }}
                  />
                )}
              </>
          }
          {
            ImageSourceviewarray?.length === 0 &&
            <View style={Styles.With90CenterVertical}>
              <Text style={Styles.EmptyText}>
                " No Photos defined "
              </Text>
            </View>
          }
        </View>
      </View>
      {
        ImageSourceviewarray?.length > 1 ?
          <>
            {
              scroll === false ?
                <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn2]}>
                  <TouchableOpacity transparent onPress={() => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                    setscroll(true);
                  }}>
                    <AntDesign name="down" size={20} color="#fff" />
                  </TouchableOpacity>
                </LinearGradient> :
                <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn2]}>
                  <TouchableOpacity transparent onPress={() => {
                    scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
                    setscroll(false);
                  }}>
                    <AntDesign name="up" size={20} color="#fff" />
                  </TouchableOpacity>
                </LinearGradient>
            }
          </> : null
      }
      <Modalize avoidKeyboardLikeIOS={true}  ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Project_Site_Detail;
