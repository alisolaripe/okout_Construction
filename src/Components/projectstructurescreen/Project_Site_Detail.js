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
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from "react-native-geolocation-service";
import { Modalize } from "react-native-modalize";
import { ButtonI } from "../component/ButtonI";
import { Image } from 'react-native-compressor';
import FastImage from 'react-native-fast-image';
import { removeDataStorage, requestLocationPermission, geocodePosition } from "../Get_Location";
import List_Item_Detail_Images from "../component/List_Item_Detail_Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { Filter } from "../component/Filter";
import { readOnlineApi } from "../ReadPostApi";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { UserPermission } from "../CheckPermission";
import { Warningmessage } from "../component/Warningmessage";

let A = [];
let C = [];
let Full = "";
let TodayDate = "";
let Day = "";
let Month = "";
let List=[]
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
  const [showWarning, setshowWarning] = useState(false);

  useEffect(() => {
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
  ///////////////////////////////
  const dateComparison_data = (a, b) => {
    const date1 = new Date(a?.Date);
    const date2 = new Date(b?.Date);
    return date1 - date2;
  };
  const Make_Week_Filter_List = (A) => {
    let B = [];
    let endDate_Format = "";
    let today = "";
    let tomorrow = "";
    let endDate = "";
    let Exist = "";
    A?.forEach((obj) => {
      if(obj?.Date!=='') {
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
        Exist = B?.findIndex((p) => p.endDate === endDate_Format);
        if (Exist === -1) {
          B.push({
            startDate: obj?.Date?.split(" ")?.[0],
            endDate: endDate_Format,
          });
        }
      }
    });
    //C=[...B]
    // while(endDate_Format <= A?.[A?.length-1]?.Date?.split(" ")?.[0]) {
    //   today=new Date(C?.[C?.length-1]?.endDate);
    //   tomorrow?.setDate(today?.getDate()+7);
    //   endDate=tomorrow?.toLocaleDateString();
    //   let newString=endDate.split('/');
    //   endDate_Format=newString?.[2]+'-'+newString?.[1]+'-'+newString?.[0];
    //
    //     Exist = A?.filter((p) => p.Date === obj.siteId);
    //
    //   C.push({
    //     startDate:C?.[C?.length-1]?.endDate,
    //     endDate:endDate_Format
    //   })
    //   C = [...C]
    // }
    setDateRangeList(B);
  };
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  };
  const getSitesDetail = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getBuildNotes + `userId=${GLOBAL.UserInformation?.userId}&relatedId=${GLOBAL.UpdateSiteID}&relatedName=site`).then(json => {
        let A = [];
        let Country = "";
        let Address = "";
        let mark2 = {
          uri:"",
          type:'',
          fileName:'',
          buildId:'',
          Type:"",
          Day:'',
          Date:'',
          Month:'',
          WeekDay:'',
          relatedId:'',
          buildIdAttachmentId:'',
          geoLat:'',
          geoLong:'',
          geoAddress:'',
          Country:'',
        };
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
              A.push({
                uri: GLOBAL.OrgAppLink_value + "/" + obj2?.imageUrl,
                type:obj2?.imageName?.split(".")?.[1],
                fileName:obj2?.imageName,
                buildId:obj2.buildId,
                Type:"",
                Day:W?.[0],
                Date:obj2?.postDate,
                Month:Day?.[1],
                WeekDay:getDayOfWeek(obj2?.postDate),
                relatedId:obj.buildIdRelatedId,
                buildIdAttachmentId: obj2.buildIdAttachmentId,
                geoLat:obj2?.geoLat,
                geoLong:obj2?.geoLong,
                geoAddress:obj2?.geoAddress,
                Country:Country,
              })}})});
        if(GLOBAL.route==='structure') {
          if (A?.length !== 0) {
            A = [mark2, ...A];
            A?.sort(dateComparison_data)
            setImageSourceviewarray(A);
            setMudolList(A);
            Make_Week_Filter_List(A)
            Save_Details_Online(A)
          } else {
            A = [mark2];
            setImageSourceviewarray(A);
          }
        }
        else {
          if (A?.length !== 0) {
            A?.sort(dateComparison_data)
            setImageSourceviewarray(A);
            setMudolList(A);
            Make_Week_Filter_List(A)
            Save_Details_Online(A)

          }
          else {
            setImageSourceviewarray('')
          }
        }
      });
    }
    else {
      let B=[]
      let Filter = JSON.parse(await AsyncStorage.getItem(GLOBAL.SiteDetail_KEY))?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateSiteID));
      //Filter?.sort(dateComparison_data);
      let mark2 = {
        uri: "",
        type:'',
        fileName: '',
        buildId:'',
        Type: "",
        Day:'',
        Date:'',
        Month:'',
        WeekDay:'',
        relatedId:'',
        buildIdAttachmentId: '',
        geoLat:'',
        geoLong: '',
        geoAddress: '',
        Country:'',
      };
      if (Filter) {
        if(GLOBAL.route==='structure') {
          B = [mark2,...Filter];
          B?.sort(dateComparison_data)
          Make_Week_Filter_List(B)
          setImageSourceviewarray(B);
          setMudolList(B)
        }
        else {
          Filter?.sort(dateComparison_data)
          Make_Week_Filter_List(Filter)
          setImageSourceviewarray(Filter);
          setMudolList(Filter)
        }
      }
      setGeoAddress("");
      setCountry("");
    }
  };
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
  const SortByWeek = (startDate, endDate) => {
    let Filter = MudolList;
    let Filter2 = [];
    const firstDate = startDate;
    const secondDate = endDate;
    const today = firstDate?.split("-")?.[2];
    const sevenDaysBefore = secondDate?.split("-")?.[2];
    const Monthtoday = firstDate?.split("-")?.[1];
    const MonthsevenDaysBefore = secondDate?.split("-")?.[1];
    A = Filter?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday) || parseInt(p.Month) === parseInt(MonthsevenDaysBefore));
    if (parseInt(Monthtoday) === parseInt(MonthsevenDaysBefore)) {
      Filter2 = A?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore) && parseInt(p.Day) >= parseInt(today));
      setshowModalCalender(false);
    } else {
      let todays = [];
      let Copy = [];
      let sevenDaysBefores = [];
      let MonthsevenDaysBeforeList = A?.filter((p) => parseInt(p.Month) === parseInt(MonthsevenDaysBefore));
      let MonthtodayList = A?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday));
      todays = MonthtodayList?.filter((p) => parseInt(p.Day) >= parseInt(today));
      sevenDaysBefores = MonthsevenDaysBeforeList?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore));
      Copy = [].concat(sevenDaysBefores, todays);
      Filter2 = Copy;

      setshowModalCalender(false);
    }
    setShowDateRange(true);
    setImageSourceviewarray(Filter2);
  };
  const _showModalCalender = () => {
    return (
      <SafeAreaView style={[Styles.CalenderBox]}>
        <View style={Styles.With100List2}>
          <Text style={Styles.WeekFilterTextMiddel}>
            Week beginning
          </Text>

          <Text style={Styles.WeekFilterTextMiddel}>
            Week endingsssss
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
            styleTxt={[Styles.txt, { fontSize: normalize(13) }]} sizeIcon={27} />
        </View>
      </SafeAreaView>
    );
  };
  const AddImageOffline = () => {
    let List_Item = [];
    let A = [];
    List_Item = ImageSourceviewarray?.filter((p) => p.Type === "");
    A = [...List_Item];
    ImageSourceviewarrayUpload?.forEach((obj) => {
      A.push({
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
    if (A?.length !== 0) {
      A?.sort(dateComparison_data);
      Make_Week_Filter_List(A);
    }
    List_Item = A;
    setImageSourceviewarray(A);
    setMudolList(A);
    setImageSourceviewarrayUpload([]);
    Save_Details(List_Item);
  };
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
  const Image_compress=async (path)=>{
    return  await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    })
  }
  const selectPhotoFromGallery = () => {
    onClose();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      mediaType: "photo",
      includeExif: true,
    }).then(response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        if (ImageSourceviewarray)
          A = [...ImageSourceviewarray];
        if (ImageSourceviewarrayUpload)
          C = [...ImageSourceviewarrayUpload];
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
          if (A.length !== 0) {
            buildid = parseInt(A?.[A.length - 1]?.buildId) + 1;
          } else {
            buildid = buildid + 1;
          }
          Image_compress(obj.path).then(res=>{

            A.push({
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
            C.push({
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
            if(List?.length===response?.length) {

              if (A?.length !== 0) {
                A?.sort(dateComparison_data);
                Make_Week_Filter_List(A);
              }
              setImageSourceviewarray(A);
              setMudolList(A);
              setImageSourceviewarrayUpload(C);
              scrollViewRef.current.scrollToEnd({ animated: true });
              setscroll(true);
              setShowBackBtn(false)
              List=[]
              A = [...A];
              C = [...C];
            }
          })
        }
      }
    });
  };
  const selectPhoto = () => {
    onClose();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(response => {
      var getFilename = response?.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      setImageSource(response.path);
      if (ImageSourceviewarray)
        A = [...ImageSourceviewarray];
      if (ImageSourceviewarrayUpload)
        C = [...ImageSourceviewarrayUpload];

      let buildid = 0;

      if (A?.length !== 0) {
        buildid = parseInt(A?.[A?.length - 1]?.buildId) + 1;
      } else {
        buildid = buildid + 1;
      }

      let WeekDay = getDayOfWeek(Full);
      Image.compress( response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {

        A.push({
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

        C.push({
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
        if (A?.length !== 0) {
          A?.sort(dateComparison_data);
          Make_Week_Filter_List(A);
        }
        setImageSourceviewarray(A);
        setMudolList(A);
        setImageSourceviewarrayUpload(C);
        scrollViewRef.current.scrollToEnd({ animated: true });
        setscroll(true);
        setShowBackBtn(false)
        A = [...A];
        C = [...C];
      })


    });
  };
  //////////////////////////////
  const AddSitesImage = () => {
    let idsArray = "";
    const formData = new FormData();
    formData.append("userId", "1");
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
              setShowBackBtn(true)
              setTimeout(function(){ setShowMessage(false)}, 4000)
              Navigate_Url('Project_Sites')
            }
          } else {
            setMessage("Your BuildNotes successfully added");
            setShowMessage(true);
            setShowBackBtn(true)
            setTimeout(function(){ setShowMessage(false)}, 4000)
            Navigate_Url('Project_Sites')
          }
        });
      }
      AddImageOffline();
    }
  };
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return object1.buildId === object2.buildId && object1.fileName === object2.fileName;
      });
    });
  };
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
    formData.append("userId", "1");
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
  const FilterFunc = (id) => {
    let Filter = MudolList;
    if (id === 0) {
      setImageSourceviewarray(MudolList);
    } else if (id === 1) {
      setshowModalCalender(true);
    } else if (id === 2) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth();
      let A = [];
      A = Filter?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      setImageSourceviewarray(A);
    }
  };
  const renderContent = () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={() => onClose()} style={Styles.CancelBtn}>
        <View style={{ width: "80%" }}>
          <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
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
          onBackdropPress={() => setshowModalDelete(false)}
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
          <FastImage  style={{ width: "27%", aspectRatio: 1, marginVertical: normalize(10) }}
                 source={require("../../Picture/png/AlertImage.png")}
                 resizeMode="contain" />
          <View style={Styles.With100NoFlex}>
            <Text style={Styles.txt_left2}>
              Do you want to Log Out from App?
            </Text>
          </View>
        </View>

        <View style={Styles.With100Row}>
          <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => setshowModalDelete(false)}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              removeDataStorage(GLOBAL.PASSWORD_KEY);
              setshowModalDelete(false)
              navigation.navigate("LogIn");
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Back_navigate=()=>{
    console.log(ShowBackBtn,'ShowBackBtn')
    if (ShowBackBtn===false) {
      setShowWarningMessage(true);
      scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
      setscroll(false);
      setShowBackBtn(true)
      //setTimeout(function(){ setShowBackBtn(true)}, 2000)
    }
    else {
      goBack()
    }
  };
  const renderItem = ({ item })=> (
    <List_Item_Detail_Images value={item}  Change_Gallry_Date={Change_Gallry_Date}
     DeleteImage={DeleteImageFromApi} Type={'Feature'} onOpen={onOpen} />
  );
  const renderSectionHeader=()=>(
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

      {ShowWarningMessage===true&&
      <View style={Styles.flashMessageWarning4}>
        <View style={Styles.flashMessageWarning6}>
          <View  style={{ width: "10%",alignItems:'center',justifyContent:'flex-start' }}>
            <FontAwesome size={normalize(18)} color={'#fff'}  name={'exclamation-circle'} />
          </View>
          <View style={{ width: "90%",alignItems:'flex-start' }}>
            <Text style={Styles.AddedtTxt}>
              You will lose all changes.Do you still want to leave?

            </Text>
          </View>

        </View>
        <View style={Styles.With100Row2}>
          <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              setShowBackBtn(false)
              setShowWarningMessage(false);
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              setShowWarningMessage(false);
              setShowBackBtn(true);
              navigation.navigate('Project_Sites')
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/*<View style={Styles.CancelBtnLeftAlignwarn}>*/}
        {/*  <AntDesign name={"closecircleo"} size={20} color={"#fff"} />*/}
        {/*</View>*/}
      </View>
      }
      {ImageSourceviewarray?.length>1?
        <Filter FilterFunc={FilterFunc} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter}
                setShowFilter={setShowFilter} />
        : null
      }

      {ShowDateRange === true ?
        <TouchableOpacity onPress={() => setshowModalCalender(true)} style={Styles.WeekFilterBox}>
          <Text style={Styles.txtFilter}>
            Start Date
          </Text>
          <View style={Styles.WeekFilterBoxItem}>
            <Text style={Styles.txtFilter}>
              {selectedRange.firstDate}
            </Text>
          </View>
          <Text style={Styles.txtFilter}>
            End Date
          </Text>
          <View style={Styles.WeekFilterBoxItem}>
            <Text style={Styles.txtFilter}>
              {selectedRange.secondDate}
            </Text>
          </View>
        </TouchableOpacity> : null
      }
    </>
  );
  const ListFooter=()=>(
    <View style={Styles.ViewItems_center_transparent}>
      {ImageSourceviewarrayUpload?.length !== 0 ?
          <ButtonI
            style={Styles.btn23}
            onpress={AddSitesImage}
            categoriIcon={""}
            title={"Save photos"}
            colorsArray={["#ffadad","#f67070","#FF0000"]}
            styleTxt={[Styles.txt,{fontSize:normalize(16)}]} sizeIcon={27} />:null
      }
    </View>
  );
  const renderItem_dyb = ({ item }) => (
    <List_Item_Detail_Images value={item} Type={'DYB'}
    />
  )
  return (
    <Container style={[Styles.Backcolor]}>
      <Header  colors={GLOBAL.route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']} StatusColor={GLOBAL.route==='structure'?"#ffadad":'#ffc6bb'} onPress={Back_navigate}
              Title={"Sites / Buildings Detail"} />
        <View style={Styles.containerList}>
          {
            showModalCalender &&
            _showModalCalender()
          }
          {showWarning===true&&  <Warningmessage/>}
          <View style={Styles.Center_margin_Bottom2}>
            {
              showModalDelete &&
              <View>
                {
                  _showModalDelete()
                }
              </View>
            }
            {
              GLOBAL.route === 'structure' ?
                <>
                  {ImageSourceviewarray && (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={ImageSourceviewarray}
                      style={{ width: '100%', flexGrow: 0 }}
                      renderItem={renderItem}
                      ListHeaderComponent={renderSectionHeader}
                      ListFooterComponent={ListFooter}
                      ref={scrollViewRef}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                      contentContainerStyle={{ justifyContent: "space-between" }}
                      numColumns={2}
                      key={'#'}
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
                      columnWrapperStyle={{ justifyContent: "space-between", }}
                      contentContainerStyle={{ justifyContent: "space-between", }}
                      data={ImageSourceviewarray}
                      numColumns={2}
                      style={{ width: '100%', }}
                      ListHeaderComponent={renderSectionHeader}
                      renderItem={renderItem_dyb}
                      key={'#'}
                      keyExtractor={(item, index) => {
                        return "#" + index.toString();
                      }}
                    />
                  )}
                </>
            }
          </View>
        </View>
        {
          ImageSourceviewarray?.length>1?
            <>
              {
                scroll===false?
                  <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn2]}>
                    <TouchableOpacity transparent onPress={() => {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                      setscroll(true);}}>
                      <AntDesign name="down" size={20} color="#fff" />
                    </TouchableOpacity>
                  </LinearGradient>:
                  <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn2]}>
                    <TouchableOpacity transparent onPress={()=>{
                      scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
                      setscroll(false)
                    }}>
                      <AntDesign name="up" size={20} color="#fff" />
                    </TouchableOpacity>
                  </LinearGradient>
              }
            </>:null
        }
      <Modalize ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}


export default Project_Site_Detail;
