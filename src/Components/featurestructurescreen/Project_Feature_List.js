import React, { useState,useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity, SafeAreaView, Dimensions, Modal, Image, FlatList, TextInput,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
const GLOBAL = require("../Global");
const Api = require("../Api");
const width = Dimensions.get("window").width;
import { ButtonI } from "../component/ButtonI";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Footer1 } from "../component/Footer";
import { Filter } from "../component/Filter";
import { Header } from "../component/Header";
import { geocodePosition, removeDataStorage, requestLocationPermission } from "../Get_Location";
import {  readOnlineApi } from "../ReadPostApi";
import { Colors } from "../Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feature_DYB_detail_Image_Item from "../component/Feature_DYB_detail_Image_Item";
import DYB_List_Detail_NoteItem from "../component/DYB_List_Detail_NoteItem";
import { Modalize } from "react-native-modalize";
import Geolocation from "react-native-geolocation-service";
import { writePostApi } from "../writePostApi";
import ImagePicker from "react-native-image-crop-picker";
let A = [];
let C = [];
let Full = "";
let Date_Today = "";

function Project_Feature_List({ navigation, navigation: { goBack } }) {

  const [modules,setmodules] = useState([]);
  const [ShowFilter,setShowFilter]= useState(false);
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [SelectItem,setSelectItem]= useState(0);
  const [selectedRange, setRange] = useState({});
  const [MudolList,setMudolList]= useState([]);
  const [attachements,setattachements]= useState([]);
  const [ShowDateRange,setShowDateRange]=useState(false);
  const [DateRangeList,setDateRangeList]=useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [route, setroute] = useState('');
  const [changeScreen,setchangeScreen]= useState(false);
  const modalizeRef = React.createRef();
  const [ImageSource, setImageSource] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");

  const [TitlesList, setTitlesList] = useState([]);
  const [Count, setCount] = useState(0);
  const [FeatureNote, setFeatureNote] = useState("");
  const [ImageTitle, setImageTitle] = useState("");
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [location, setLocation] = useState(false);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [Title, setTitle] = useState("");
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [Country, setCountry] = useState(false);
  const [TitleValidate, setTitleValidate] = useState(false);
  const [ImageValidate, setImageValidate] = useState(false);

  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);

  useEffect(()=>{
    getLocation();
    const date = new Date();
    const Day = date.getDate();
    const Month = date.getMonth() + 1;
    const Year = date.getFullYear();
    const Hour = date.getHours();
    const Minute = date.getMinutes();
    const Second = date.getSeconds();
    Full = `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
    Date_Today = `${Year}-${Month}-${Day}`;
    const unsubscribe = navigation.addListener('focus', () => {
      setroute(GLOBAL.route)
      getFeatureDetail();
    });
    return unsubscribe;
  }, []);


  const getLocation = async () => {
    requestLocationPermission().then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
            var NY = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            geocodePosition(NY).then(res => {
              if(res) {
                setGeoAddress(res?.[0]?.formattedAddress);
                setCountry(res?.[0]?.country + " " + res?.[0]?.adminArea);
              }
              else {
                setGeoAddress("");
                setCountry("");
              }
            })
              .catch(err => {
              })
          },
          error => {
            // See error code charts below.
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  const AddFeatureImage = async () => {
    let idsArray = "";
    const formData = new FormData();
    formData.append("userId", "1");
    formData.append("relatedName", "feature");
    formData.append("relatedId", GLOBAL.UpdateFeatureID);
    formData.append("geoLat", location.latitude);
    formData.append("geoLong", location.longitude);
    formData.append("geoAddress", GeoAddress);
    formData.append("buildType", "dyb");
    if(GLOBAL.Feature === "Image") {
      if (GLOBAL.DYB!== "n") {
        if (Title=== "")
          setTitleValidate(true);
      }
      else if (ImageSourceviewarrayUpload?.length === 0) {
        setTitleValidate(false);
        setImageValidate(true);
      } else {
        setImageValidate(false)
        formData.append('title', Title);
        for (let i = 0; i < ImageSourceviewarrayUpload.length; i++) {
          idsArray = ImageSourceviewarrayUpload[i];
          formData.append('attachment', {
            uri: idsArray.uri,
            type: idsArray.type,
            name: idsArray.fileName,
          });
          formData.append('postDate', idsArray.Date);
          writePostApi("POST", Api.AddBuildNotes, formData, ImageSourceviewarrayUpload).then(json => {
            if (json) {
              if (json.status === true) {
                setMessage(json.msg);
                setShowMessage(true);
                getFeatureDetail()
                setTimeout(function(){ setShowMessage(false)}, 2000)
                setchangeScreen(false)

              }
            } else {
              setMessage('Your build notes successfully added');
              setShowMessage(true);
              const timerId = setInterval(() => {
                setShowMessage(false);
                setchangeScreen(false)
              }, 2000);
              return () => clearInterval(timerId);
            }
          });

        }
        if (GLOBAL.isConnected === false) {
          AddImageOffline();
        }
      }
    }
    /////////Send Note/////////////
    else {
      if (ImageTitle === "") {
        setTitleValidate(true);
      }
      else if (FeatureNote=== '') {
        setTitleValidate(false);
        setImageValidate(true);
      }
      else {
        setImageValidate(false)
        /////////Send Note/////////////

        formData.append("title", ImageTitle);
        formData.append("notes", FeatureNote);
        formData.append("postDate", Full);
        formData.append("attachment", ImageSourceviewarrayUpload);
        if (GLOBAL.isConnected === true) {
          fetch(GLOBAL.OrgAppLink_value + Api.AddBuildNotes, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          })
            .then(resp => {

              if (resp.status === 201) {
                setMessage("Your build notes successfully added");
                setShowMessage(true);
                getFeatureDetail()
                setTimeout(() => {
                  setShowMessage(false);
                  setchangeScreen(false)
                }, 2000)

              }

              return resp.txt();
            })
            .then(txt => {

            })
            .catch(error => console.log("errorwwww", error));

        }
        else {
          AddNoteOffline()
          let get_MethodsList = await AsyncStorage.getItem(GLOBAL.offline_data)
          let List = [];
          let AllList = [];
          let ID = 0;
          if (get_MethodsList !== null) {
            ID = parseInt(JSON.parse(get_MethodsList).length) + 1;
          } else {
            ID = 0;
          }
          List.push({
            type: "POST",
            Url: Api.AddBuildNotes,
            formdata: formData,
            id: ID
          });
          if (get_MethodsList !== null) {
            AllList = [...List, ...JSON.parse(get_MethodsList)];
          } else {
            AllList = [...List]
          }

          await AsyncStorage.setItem(GLOBAL.offline_data, JSON.stringify(AllList));
          setMessage('Your build notes successfully added');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            navigation.navigate('Project_Feature_List')
          }, 2000)

        }
      }

    }
  };
  const ChangeChecked2 = (value) => {

  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const selectPhotoFromGallery = () => {
    onClose();
    if(GLOBAL.isConnected!==true){
      setGeoAddress('');
      setCountry('');
    }
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
        if(ImageSourceviewarray)
          A = [...ImageSourceviewarray];
        if(ImageSourceviewarrayUpload)
          C = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let D = "";
          let B = "";
          let RealDate = "";
          let Months = "";

          if (obj?.exif?.DateTimeDigitized !== null) {
            D = obj?.exif?.DateTimeDigitized?.split(":");
            B = D?.[2].split(" ");
            RealDate = `${D?.[0]}-${D?.[1]}-${B?.[0]} ${B?.[1]}:${D?.[3]}:${D?.[4]}`;
            Months = D?.[1];
          } else {

            RealDate = Full
          }

          A.push({
            uri: obj.path,
            type: obj.mime,
            fileName: imgName,
            buildId: 0,
            title: "",
            Date: RealDate,
            Type: "Gallery",
            geoLat: location.latitude,
            geoLong:location.longitude,
            geoAddress:GeoAddress,
            Country: Country,
          });
          C.push({
            uri: obj.path,
            type: obj.mime,
            fileName: imgName,
            buildId: 0,
            title: "",
            Date: RealDate,
            Type: "Gallery",
            geoLat: location.latitude,
            geoLong:location.longitude,
            geoAddress: GeoAddress,
            Country: Country,
          });
        }
        setImageSourceviewarray(A);
        setImageSourceviewarrayUpload(C);
        setMudolList(A);
        setImageValidate(false)
        setShowBackBtn(false)
        A = [...A];
        C = [...C];

      }
    });
  };
  const selectPhoto = () => {
    onClose();
    if(GLOBAL.isConnected!==true){
      setGeoAddress('');
      setCountry('');
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(response => {
      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      setImageSource(response.path);
      if(ImageSourceviewarray)
        A = [...ImageSourceviewarray];
      if(ImageSourceviewarrayUpload)
        C = [...ImageSourceviewarrayUpload];

      A.push({
        uri: response.path,
        type: response.mime,
        fileName: imgName,
        buildId: 0,
        title: "",
        Date: Full,
        Type: "Camera",
        geoLat: location.latitude,
        geoLong:location.longitude,
        geoAddress: GeoAddress,
        Country:Country,
      });
      C.push({
        uri: response.path,
        type: response.mime,
        fileName: imgName,
        buildId: 0,
        title: "",
        Date: Full,
        Type: "Camera",
        geoLat: location.latitude,
        geoLong:location.longitude,
        geoAddress: GeoAddress,
        Country:Country,
      });
      setImageSourceviewarray(A);
      setImageSourceviewarrayUpload(C);
      setMudolList(A);
      setImageValidate(false)
      setShowBackBtn(false)
      A = [...A];
      C = [...C];
    });
  };

  const AddImageOffline = async () => {
    let A = [];
    let Count = 0;
    let different = [];
    let SameTitle = 0;
    let FeatureList = [];
    let Buildid = 0;
    let differentDetail = [];
    let AllListDetail = [];
    let Detail_Exist = [];
    let AllList=[]
    let List = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY));
    different = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type === "Image");
    SameTitle = different?.findIndex((p) => p.title === Title);
    let ListDetail = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY));
    differentDetail = ListDetail?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) & p.Type === "Image");
    if (SameTitle === -1||SameTitle ===undefined) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;
      if (List!==null) {
        Buildid = parseInt(List?.[List?.length - 1]?.buildId) + 1;
      }
      else {
        Buildid = Buildid + 1;
      }
      let WeekDay=getDayOfWeek(Date_Today)
      FeatureList.push({
        Type: "Image",
        Icon: "folder-multiple-image",
        title: Title,
        FullYear: Date_Today,
        Month: Day,
        Day: Month,
        relatedId: GLOBAL.UpdateFeatureID,
        buildId: Buildid,
        WeekDay:WeekDay
      });
      if(List!==null)
      {
        AllList = [...List, ...FeatureList];
      }
      else{
        AllList = [...FeatureList];
      }

      ImageSourceviewarrayUpload?.forEach((obj) => {
        if (differentDetail!==undefined) {
          Count = parseInt(differentDetail?.[differentDetail?.length - 1]?.buildId) + 1;
        } else
          Count = Count + 1;
        A.push({
          imageUrl: obj.uri,
          title: Title,
          buildId: Count,
          Type: "Image",
          postDate: obj.Date,
          buildIdParent: Buildid,
          geoLat: obj.geoLat,
          geoLong: obj.geoLong,
          geoAddress: obj.geoAddress,
          Country: obj.Country,
          relatedId: GLOBAL.UpdateFeatureID,
        });
      });
      if(ListDetail!==null)
      {
        AllListDetail = [...ListDetail, ...A];
      }
      else{
        AllListDetail = [...A];
      }

      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
      await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(AllList));
      setImageSourceviewarrayUpload([]);
    }
    else {
      Buildid = different?.find((p) => p.title === Title)?.buildId;
      Detail_Exist = differentDetail?.filter((p) => parseInt(p?.buildIdParent) === parseInt(Buildid));
      ImageSourceviewarrayUpload?.forEach((obj) => {
        if (Detail_Exist)
          Count = parseInt(Detail_Exist?.[Detail_Exist.length - 1]?.buildId) + 1;
        else
          Count = Count + 1;
        A.push({
          imageUrl: obj.uri,
          title: Title,
          buildId: Count.toString(),
          Type: "Image",
          postDate: obj.Date,
          buildIdParent: Buildid,
          geoLat: obj.geoLat.toString(),
          geoLong: obj.geoLong.toString(),
          geoAddress: obj.geoAddress,
          Country: obj.Country,
          relatedId: GLOBAL.UpdateFeatureID,
        });
      });
      if(ListDetail) {
        AllListDetail = [...ListDetail, ...A];
      }
      else {
        AllListDetail=[...A]
      }
      setImageSourceviewarrayUpload([])
      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
    }
  };
  const AddNoteOffline = async () => {
    let A = [];
    let Count = 0;
    let different = [];
    let SameTitle = 0;
    let FeatureList = [];
    let Buildid = 0;
    let differentDetail = [];
    let AllListDetail = [];
    let Detail_Exist = [];
    let AllList=[]
    let List = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY));
    different = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type === "Note");
    SameTitle = different?.findIndex((p) => p?.title === ImageTitle);
    let ListDetail = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY));
    differentDetail = ListDetail?.filter((p) => parseInt(p?.relatedId) === parseInt(GLOBAL.UpdateFeatureID) & p?.Type === "Note");
    if (SameTitle===-1||SameTitle ===undefined) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;

      if (List!==null) {
        Buildid = parseInt(List?.[List?.length - 1]?.buildId) + 1;
      } else
        Buildid = Buildid + 1;
      let WeekDay=getDayOfWeek(Date_Today)
      FeatureList.push({
        Type: "Note",
        Icon: "clipboard-text-outline",
        title: ImageTitle,
        FullYear: Date_Today,
        Month: Day,
        Day: Month,
        relatedId: GLOBAL.UpdateFeatureID,
        buildId: Buildid,
        WeekDay:WeekDay
      });
      if(List!==null)
      {
        AllList = [...List, ...FeatureList];
      }
      else{
        AllList = [...FeatureList];
      }
      if (differentDetail !== undefined) {
        Count = parseInt(differentDetail?.[differentDetail?.length - 1]?.buildId) + 1;
      } else
        Count = Count + 1;
      A.push({
        buildIdNotes:FeatureNote,
        title: ImageTitle,
        buildId: Count,
        Type: "Note",
        postDate:Full,
        buildIdParent: Buildid,
        geoLat: location.latitude,
        geoLong: location.longitude,
        geoAddress: GeoAddress,
        Country: Country,
        relatedId: GLOBAL.UpdateFeatureID,
      });
      if(ListDetail!==null)
      {
        AllListDetail = [...ListDetail, ...A];
      }
      else{
        AllListDetail = [...A];
      }
      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
      await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(AllList));
      setImageSourceviewarrayUpload([]);
    }
    //
    //  else {
    //        Buildid = different?.find((p) => p.title === ImageTitle)?.buildId;
    //          Detail_Exist = differentDetail?.filter((p) => parseInt(p.buildIdParent) === parseInt(Buildid));
    //      if (Detail_Exist)
    //        Count = parseInt(Detail_Exist?.[Detail_Exist.length - 1]?.buildId) + 1;
    //      else
    //        Count = Count + 1;
    //      A.push({
    //        buildIdNotes:FeatureNote,
    //        title: ImageTitle,
    //        buildId: Count,
    //        Type: "Note",
    //        postDate:Full,
    //        buildIdParent: Buildid,
    //        geoLat: location.latitude,
    //        geoLong: location.longitude,
    //        geoAddress: GeoAddress,
    //        Country: Country,
    //        relatedId: GLOBAL.UpdateFeatureID,
    //      });
    // if(ListDetail) {
    //   AllListDetail = [...ListDetail, ...A];
    // }
    // else {
    //   AllListDetail=[...A]
    // }
    //    setImageSourceviewarrayUpload([])
    //    await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
    //  }
    //
    //     const date = new Date();
    //     const Day = date.getDate();
    //     const Month = date.getMonth() + 1;
    //     if (List) {
    //       Buildid = parseInt(List?.[List?.length - 1]?.buildId) + 1;
    //     } else
    //       Buildid = Buildid + 1;
    //     FeatureList.push({
    //       Type: "Note",
    //       Icon: "file-text-o",
    //       title: ImageTitle,
    //       FullYear: Date_Today,
    //       Month: Day,
    //       Day: Month,
    //       relatedId: GLOBAL.UpdateFeatureID,
    //       buildId: Buildid,
    //     });
    //     if(List)
    //     {
    //        AllList = [...List, ...FeatureList];
    //     }
    //     else{
    //       AllList = [...FeatureList];
    //     }
    //     if (ListDetail?.length !== 0) {
    //         Count = parseInt(differentDetail?.[differentDetail?.length - 1]?.buildId) + 1;
    //       } else
    //         Count = Count + 1;
    //       A.push({
    //         buildIdNotes:FeatureNote,
    //         title: ImageTitle,
    //         buildId: Count,
    //         Type: "Note",
    //         postDate:Full,
    //         buildIdParent: Buildid,
    //         geoLat: location.latitude,
    //         geoLong: location.longitude,
    //         geoAddress: GeoAddress,
    //         Country: Country,
    //         relatedId: GLOBAL.UpdateFeatureID,
    //       });
    //     if(ListDetail)
    //     {
    //       AllListDetail = [...ListDetail, ...A];
    //     }
    //     else{
    //       AllListDetail = [...A];
    //     }
    //     await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
    //     await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(AllList));
    //     setImageSourceviewarrayUpload([]);
  };

  const DeleteImage = (fileName) => {
    let A = [...ImageSourceviewarray];
    let C = [...ImageSourceviewarrayUpload];
    const index = A.findIndex((p) => p.fileName === fileName);
    const indexC = C.findIndex((p) => p.fileName === fileName);
    A.splice(index, 1);
    C.splice(indexC, 1);
    setImageSourceviewarray(A);
    setImageSourceviewarrayUpload(C)
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

  const Back_navigate=()=>{

    if (ShowBackBtn===false) {
      setShowWarningMessage(true);

    }

    else {

      setchangeScreen(false)
    }
  }


  /////////////////////////

  const Make_Week_Filter_List=(A)=>{
    let B = [];
    let endDate_Format=''
    let today =''
    let tomorrow = ''
    let endDate = "";
    let Exist=''
    A?.forEach((obj) => {
      today = new Date(obj?.FullYear);
      tomorrow = new Date(today);
      if (obj?.WeekDay === "Sunday") {
        tomorrow?.setDate(today?.getDate() + 1);
        endDate = tomorrow?.toLocaleDateString();
      }
      else if (obj?.WeekDay === "Monday") {
        tomorrow?.setDate(today.getDate() + 7);
        endDate = tomorrow?.toLocaleDateString();
      }
      else if (obj?.WeekDay === "Tuesday") {
        tomorrow?.setDate(today?.getDate() + 6);
        endDate = tomorrow?.toLocaleDateString();

      }
      else if (obj?.WeekDay === "Wednesday") {
        tomorrow?.setDate(today?.getDate() + 5);
        endDate = tomorrow?.toLocaleDateString();

      }
      else if (obj?.WeekDay === "Thursday") {
        tomorrow?.setDate(today?.getDate() + 4);
        endDate = tomorrow?.toLocaleDateString();

      }
      else if (obj?.WeekDay === "Friday") {
        tomorrow?.setDate(today?.getDate() + 3);
        endDate = tomorrow?.toLocaleDateString();
      }
      else if (obj?.WeekDay === "Saturday") {
        tomorrow?.setDate(today?.getDate() + 2);
        endDate = tomorrow?.toLocaleDateString();
      }
      let newString = endDate.split('/')
      endDate_Format=newString?.[2]+'-'+newString?.[1]+'-'+newString?.[0]
      Exist = B?.findIndex((p) => p.endDate === endDate_Format);
      if(Exist===-1) {
        B.push({
          startDate: obj?.FullYear?.split(" ")?.[0],
          endDate: endDate_Format,
        });
      }
    });
    setDateRangeList(B)
  }
  const  getDayOfWeek=(date)=> {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }
  const getFeatureDetail = async () => {
    if(GLOBAL.isConnected===true)
    {
      readOnlineApi(Api.getBuildNotes+`userId=${GLOBAL.UserInformation?.userId}&relatedId=${GLOBAL.UpdateFeatureID}&relatedName=feature`).then(json => {
        let A=[];
        let B='';
        let attachements=[];
console.log(json?.buildNotes,'json?.buildNotes')
        json?.buildNotes?.forEach((obj) => {
          if(obj?.attachements?.length!==0) {
            const Day = obj?.attachements?.[0]?.postDate?.split(' ')?.[0]?.split('-')?.[2];
            const Month = obj?.attachements?.[0]?.postDate?.split(' ')?.[0]?.split('-')?.[1];
            B='folder-multiple-image'

            A.push({
              buildId:obj?.buildId,
              title:obj?.buildIdTitle,
              Icon:B,
              Month:Month,
              Day:Day,
              FullYear:obj?.attachements?.[0]?.postDate?.split(' ')?.[0],
              relatedId:obj?.buildIdRelatedId,
              Type:'Image',
              WeekDay:getDayOfWeek(obj?.attachements?.[0]?.postDate?.split(' ')?.[0])
            });
            obj?.attachements?.forEach((obj2) => {
              let Address=obj2?.geoAddress?.split(',')
              if(obj2?.imageUrl!==null) {
                attachements.push({
                  imageUrl:GLOBAL?.OrgAppLink_value + "/" + obj2?.imageUrl,
                  buildId: obj2.buildId,
                  relatedId: obj?.buildIdRelatedId,
                  postDate: obj2?.postDate,
                  geoLat: obj2?.geoLat,
                  geoLong: obj2?.geoLong,
                  geoAddress: obj2?.geoAddress,
                  Country:Address?.[3]+Address?.[1],
                  buildIdParent: obj.buildId,
                  title:obj.buildIdTitle,
                  Type:'Image'
                });
              }})
          }
          else if(obj?.notes?.length!==0 &&GLOBAL.DYB !== "n") {
            B='clipboard-text-outline'
            let FullYear=obj?.notes?.postDate?.split(' ')
            const Day = FullYear?.[0]?.split('-')?.[2];
            const Month = FullYear?.[0]?.split('-')?.[1];
            A.push({
              buildId: obj?.buildId,
              title: obj?.buildIdTitle,
              Icon: B,
              Day:Day,
              Month:Month,
              FullYear:FullYear?.[0],
              relatedId: obj?.buildIdRelatedId,
              Type:'Note',
              WeekDay:getDayOfWeek(obj?.attachements?.[0]?.postDate?.split(' ')?.[0])
            });
            attachements.push({
              buildId:obj?.notes.buildId,
              relatedId:obj?.buildIdRelatedId,
              buildIdNotes:obj?.notes?.buildIdNotes,
              postDate:obj?.notes?.postDate,
              geoLat:obj?.notes?.geoLat,
              geoLong:obj?.notes?.geoLong,
              geoAddress:'',
              Country:'',
              buildIdParent:obj?.buildId,
              title:obj?.buildIdTitle,
              Type:'Note',
            });
          }
        })
        if(A?.length!==0) {
          A?.sort(dateComparison_data)
          setmodules(A);
          setMudolList(A);
          Make_Week_Filter_List(A)
          Save_List_Online(A);
        }
    else {
          setmodules('');
        }

        setattachements(attachements)
        Save_List_Online_Details(attachements);
        A=[...A];
        attachements=[...attachements];
      });
    }
    else {
        let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY))
      if (json!==null) {
        let Filter = json?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID));
        if (Filter) {
          Make_Week_Filter_List(Filter)
          setmodules(Filter);
          setMudolList(Filter);
        }
        let json_Details = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY))
        let Filterattachements = json_Details?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID))
        if (Filterattachements) {
          setattachements(Filterattachements);
        }}}};
  const dateComparison_data =(a,b)=>{
    const date1 = new Date(a?.FullYear)
    const date2 = new Date(b?.FullYear)
    return date1 - date2;
  }
  const SortByWeek=(startDate,endDate)=>{
    let Filter=MudolList;
    let Filter2=[];
    const firstDate = startDate
    const secondDate = endDate
    const today=firstDate?.split('-')?.[2]
    const sevenDaysBefore=secondDate?.split('-')?.[2];
    const Monthtoday=firstDate?.split('-')?.[1]
    const MonthsevenDaysBefore=secondDate?.split('-')?.[1];
    A=Filter?.filter((p) =>parseInt(p.Month)===parseInt(Monthtoday)||parseInt(p.Month)===parseInt(MonthsevenDaysBefore) );
    if(parseInt(Monthtoday)===parseInt(MonthsevenDaysBefore) ) {
      Filter2 = A?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore) && parseInt(p.Day) >= parseInt(today));
      setshowModalCalender( false)
    }
    else  {
      let todays=[];
      let Copy=[];
      let sevenDaysBefores=[]
      let MonthsevenDaysBeforeList=A?.filter((p) => parseInt(p.Month) === parseInt(MonthsevenDaysBefore))
      let MonthtodayList=A?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday))
      todays=MonthtodayList?.filter((p) => parseInt(p.Day) >= parseInt(today))
      sevenDaysBefores=MonthsevenDaysBeforeList?.filter((p) =>  parseInt(p.Day) <= parseInt(sevenDaysBefore))
      Copy=[].concat(sevenDaysBefores,todays)
      Filter2=Copy
      setshowModalCalender( false)
    }
    setShowDateRange(true);
    setmodules(Filter2)
  }
  const _showModalCalender = () => {
    return (
      <SafeAreaView style={[Styles.CalenderBox,]}>
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
            DateRangeList.map((value,index) =>{
              return (
                <TouchableOpacity onPress={()=> {SortByWeek(value.startDate,value.endDate ); setRange({ firstDate: value.startDate, secondDate: value.endDate });}} key={index} style={Styles.With100List}>
                  <Text style={Styles.WeekFilterText}>
                    {value.startDate}
                  </Text>

                  <Text style={Styles.WeekFilterText}>
                    {value.endDate}
                  </Text>
                </TouchableOpacity>
              )})
          }
        </View>
        <View style={Styles.With50List}>
          <ButtonI
            style={Styles.btnFilter}
            onpress={()=> {
              setshowModalCalender(false);
              setShowDateRange(false)
            }}
            categoriIcon={"Nopadding"}
            title={'Close'}
            colorsArray={['#b9a4ff','#9f83ff','#7953FAFF']}
            styleTxt={[Styles.txt,{fontSize: normalize(13),}]} sizeIcon={27} />
        </View>
      </SafeAreaView>
    );
  };
  /////////////////////////

  const Save_List_Online_Details=async (A)=>{
    let AllList=[];
    let Filter_List=[]
    let SiteDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY));
    Filter_List=SiteDetailList?.filter((p) =>parseInt(p?.relatedId)!==parseInt(GLOBAL.UpdateFeatureID))
    if(SiteDetailList!==null&&Filter_List!==null) {
      AllList = [...SiteDetailList?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.UpdateFeatureID)), ...A];
    }
    else {
      AllList=A
    }

    await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllList));
  }
  const Save_List_Online=async (A)=>{
    let AllList=[];
    let Filter_List=[]
    let SiteDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY));

    Filter_List=SiteDetailList?.filter((p) =>parseInt(p?.relatedId)!==parseInt(GLOBAL.UpdateFeatureID))
    if(SiteDetailList!==null&&Filter_List!==null) {
      AllList = [...Filter_List,...A];
    }
    else {
      AllList=A
    }

    await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(AllList));
  }
  const Featuredetail =(value)=>{
    GLOBAL.FeatureNameDetail=value.title;
    GLOBAL.DYB_Type=value.Type
    GLOBAL.FeatureSelectDetail=attachements?.filter((p) => parseInt(p.buildIdParent) === parseInt(value?.buildId)&&p.Type===value.Type);
    setShowFilter(false);
    setShowDateRange(false);
    FilterFunc(0);
    setSelectItem(0)
    navigation.navigate('Project_Feature_List_Detail')
  }

  const FilterFunc=(id)=>{
    let Filter=MudolList
    if(id===0){
      setmodules(Filter)
    }
    else if(id===1){
      setshowModalCalender( true)
    }
    else if(id===2){
      const date=new Date() ;
      const Day=date.getDate();
      const Month=date.getMonth();
      let A=[];
      A=Filter?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month+1);
      setmodules(A)
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
  const renderItem = ({ item }) => (
    <View  style={Styles.ItemDetailFeatureBox}>
      {
        item.Icon !== '' ?
          <TouchableOpacity onPress={()=>Featuredetail(item)} style={Styles.With90}>
            <View style={{ width: "88%" }}>
              {
                item.title=== "undefined"?
                  null:
                  <Text style={[Styles.txt_left_Padding_bottom]}>{item.title}</Text>
              }
              <Text style={[Styles.txt_left_small_padding_top]}>{item.FullYear}</Text>
            </View>
            <View style={{ width: "12%",flexDirection:"row",alignItems:"center",justifyContent:'center'}}>
              <MaterialCommunityIcons name={item.Icon} size={normalize(17)} color={'#F67070FF'} />
            </View>
          </TouchableOpacity> :null
      }
    </View>
  );
  const renderSectionHeader=()=>(
    <>

      { modules?.length!==0?
        <Filter  FilterFunc={FilterFunc} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter} setShowFilter={setShowFilter}/>
        :null
      }

      {ShowDateRange===true?
        <TouchableOpacity onPress={()=>setshowModalCalender( true)} style={Styles.WeekFilterBox}>
          <Text style={Styles.Filter_txt}>
            Start Date
          </Text>
          <View style={Styles.WeekFilterBoxItem}>
            <Text style={Styles.Filter_txt}>
              {selectedRange.firstDate
              }
            </Text>
          </View>
          <Text style={Styles.Filter_txt}>
            End Date
          </Text>
          <View style={Styles.WeekFilterBoxItem}>
            <Text style={Styles.Filter_txt}>
              {selectedRange.secondDate
              }
            </Text>
          </View>

        </TouchableOpacity> : null
      }
      {
        GLOBAL.DYB!=='n'?
          <View style={{
            width:'100%',flexDirection:"row",
            alignItems:"center",flexWrap:"wrap",
            justifyContent:'space-between',alignSelf:'center',marginTop:"5%"
          }}>

            <LinearGradient   colors={['#997aff','#8663ff','#7953FAFF']} style={Styles.btnList32}>
              <TouchableOpacity onPress={() => {
                GLOBAL.Feature="Note";
                setchangeScreen(true)
                //navigation.navigate('Project_Feature_Detail')
              }}>
                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Note</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient   colors={['#648bfc','#5982fa','#4B75FCFF']} style={Styles.btnList15}>
              <TouchableOpacity onPress={()=> {
                GLOBAL.Feature="Image";
                setchangeScreen(true)
               // navigation.navigate('Project_Feature_Detail')
              }}>
                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Photos</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>:
          <View style={{
            width:"100%",alignItems:"center",justifyContent:'center',
            alignSelf:'center',marginTop:"5%"}}>
            <LinearGradient   colors={['#648bfc','#5982fa','#4B75FCFF']} style={Styles.btnList15}>
              <TouchableOpacity onPress={()=> {
                GLOBAL.Feature="Image";
                setchangeScreen(true)
               // navigation.navigate('Project_Feature_Detail')
              }}>
                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Photos</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
      }
    </>
  )
  return (
    <>
      {
        changeScreen===false?
          <Container style={[Styles.Backcolor]}>
            <Header  colors={route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']} StatusColor={route==='structure'?"#ffadad":'#ffc6bb'} onPress={goBack} Title={'DYL List'}/>
            <View style={Styles.containerList}>
              <View style={[Styles.With90Center_Margin]}>
                {
                  showModalCalender &&
                  _showModalCalender()
                }
                {
                  showModalDelete &&
                  <View>
                    {
                      _showModalDelete()
                    }
                  </View>
                }
                {
                  modules!==''?
                    <View style={Styles.FlexWrapDyb}>
                      {modules && (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={modules}
                          style={{width:'100%', flexGrow: 0,}}
                          renderItem={renderItem}
                          ListHeaderComponent={renderSectionHeader}
                          keyExtractor={(item, index) => {
                            return index.toString();
                          }}
                        />
                      )}
                    </View>:
                    <>
                      {
                        GLOBAL.DYB!=='n'?
                          <View style={{
                            width:'100%',flexDirection:"row",
                            alignItems:"center",flexWrap:"wrap",
                            justifyContent:'space-between',alignSelf:'center',marginTop:"5%"
                          }}>

                            <LinearGradient   colors={['#997aff','#8663ff','#7953FAFF']} style={Styles.btnList32}>
                              <TouchableOpacity onPress={() => {
                                GLOBAL.Feature="Note";
                                setchangeScreen(true)
                                //navigation.navigate('Project_Feature_Detail')
                              }}>
                                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Note</Text>
                              </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient   colors={['#648bfc','#5982fa','#4B75FCFF']} style={Styles.btnList15}>
                              <TouchableOpacity onPress={()=> {
                                GLOBAL.Feature="Image";
                                setchangeScreen(true)
                                // navigation.navigate('Project_Feature_Detail')
                              }}>
                                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Photos</Text>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>:
                          <View style={{
                            width:"100%",alignItems:"center",justifyContent:'center',
                            alignSelf:'center',marginTop:"5%"}}>
                            <LinearGradient   colors={['#648bfc','#5982fa','#4B75FCFF']} style={Styles.btnList15}>
                              <TouchableOpacity onPress={()=> {
                                GLOBAL.Feature="Image";
                                setchangeScreen(true)
                                // navigation.navigate('Project_Feature_Detail')
                              }}>
                                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Photos</Text>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>
                      }
                      <View style={Styles.With90CenterVertical}>

                        <Text style={Styles.EmptyText}>
                          " No items added  yet"
                        </Text>
                      </View>
                    </>

                }
              </View>
            </View>
            <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}/>
          </Container>:
          <Container style={[Styles.Backcolor]}>
            <Header colors={GLOBAL.route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']} StatusColor={GLOBAL.route==='structure'?"#ffadad":'#ffc6bb'} onPress={Back_navigate}
                    Title={"Features Detail"} />
            {ShowMessage === true ?
              <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                <View style={[Styles.flashMessageSuccsess, { flexDirection: "row" }]}>

                  <View style={{ width: "85%" }}>
                    <Text style={Styles.AlertTxt}>
                      {Message}
                    </Text>
                  </View>
                  <View style={{ width: "15%" }}>
                  </View>
                </View>
              </View>
              : null}
            <Content style={[{ backgroundColor: Colors.background }]}>
              <View style={Styles.container}>
                {
                  showModalDelete &&
                  <View>
                    {
                      _showModalDelete()
                    }
                  </View>
                }
                {
                  GLOBAL.Feature=== "Image" ?
                    <View style={Styles.Center}>
                      { ShowWarningMessage===true&&
                      <TouchableOpacity onPress={()=>{
                        setShowWarningMessage(false);
                        setShowBackBtn(true)

                      }} style={Styles.flashMessageWarning2}>
                        <View style={{ width: "15%",alignItems:'center' }}>
                          <FontAwesome size={normalize(18)} color={'#fff'}  name={'exclamation-circle'} />
                        </View>
                        <View style={{ width: "65%",alignItems:'flex-start' }}>
                          <Text style={Styles.AddedtTxt}>
                            You will lose all changes.
                          </Text>
                        </View>
                        <View style={Styles.CancelBtnLeftAlignwarn}>
                          <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
                        </View>
                      </TouchableOpacity>
                      }
                      {
                        GLOBAL.DYB=== "n" ? null :
                          <View style={Styles.inputStyleBoxPadding0}>
                            <Text style={[Styles.txtLightColor,{marginTop:normalize(4)}]}>Title</Text>
                            <TextInput
                              value={Title}
                              style={[Styles.inputStyleFeature,TitleValidate&&{borderColor:'#CC0000'}]}
                              onChangeText={(val) => setTitle(val)}
                              multiline={true}
                              placeholderTextColor={"#fff"} />
                            {TitleValidate&&(<Text style={Styles.TitleValidate}>Fill the field, please.</Text>)}
                          </View>
                      }
                      <View style={Styles.FlexWrap}>
                        <TouchableOpacity onPress={() => {
                          GLOBAL.DYB === "n" ?
                            onOpen() :
                            selectPhoto();
                        }} style={Styles.unitDetailUploadImagebox}>
                          <Text style={Styles.UploadImageText}>
                            Add Photos
                          </Text>
                          <MaterialIcons name={"add-a-photo"} size={20} color={"#fff"}  />
                        </TouchableOpacity>

                        {
                          ImageSourceviewarray.map((value, index) => {
                            return (
                              <Feature_DYB_detail_Image_Item value={value} key={index} ImageTitle={ImageTitle} ImagebtnColor={GLOBAL.route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']}
                                                             DeleteImage={DeleteImage} ChangeChecked={ChangeChecked2} IconColor={'#F67070FF'} />
                            );
                          })}
                      </View>
                      <View style={Styles.FlexWrap}>
                        {ImageValidate&&(<Text style={Styles.TitleValidate}>Select Photos, please.</Text>)}
                      </View>
                      {Title!==''|| ImageSourceviewarrayUpload?.length!==0?
                        <ButtonI style={Styles.btnDYB}
                                 onpress={AddFeatureImage}
                                 categoriIcon={""}
                                 title={"Save"}
                                 colorsArray={GLOBAL.route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']}
                                 styleTxt={[Styles.txt, { fontSize: normalize(16) }]} sizeIcon={27} />:null
                      }

                    </View> :
                    <View style={Styles.Center}>
                      <View style={Styles.With100}>
                        <View style={Styles.FlexWrap}>
                          <DYB_List_Detail_NoteItem FeatureNote={FeatureNote} setFeatureNote={setFeatureNote} setImageValidate={setImageValidate}
                                                    ImageTitle={ImageTitle} setImageTitle={setImageTitle}
                                                    ChangeChecked={ChangeChecked2} setTitlesList={setTitlesList} TitleValidate={TitleValidate}
                                                    Count={Count} ImageValidate={ImageValidate} />
                        </View>
                      </View>
                      <ButtonI  style={Styles.btnDYB}
                                onpress={AddFeatureImage}
                                categoriIcon={""}
                                title={"Save"}
                                colorsArray={GLOBAL.route==='structure'?["#ffadad", "#f67070", "#FF0000"]:['#ffc2b5','#fca795','#d1583b']}
                                styleTxt={[Styles.txt, { fontSize: normalize(16) }]} sizeIcon={27} />
                    </View>
                }
              </View>
            </Content>
            <Modalize ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
              {renderContent()}
            </Modalize>
            <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
          </Container>

      }
    </>

  );
}


export default Project_Feature_List;
