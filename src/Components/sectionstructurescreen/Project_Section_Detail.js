import React, { useState,useEffect } from "react";
import {
  Text,
  View,
  Modal, SafeAreaView, TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { Button, Container, Content, Footer, FooterTab } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import Moment from 'moment';
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from 'react-native-geolocation-service';
import { Modalize } from "react-native-modalize";
import { ButtonI } from "../component/ButtonI";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {removeDataStorage} from "../Get_Location";
const GLOBAL = require("../Global");
const Api = require("../Api");
let A=[];
let C=[];
let Full=''
let TodayDate=''
let Day=''
let Month=''
import Geocoder from "react-native-geocoder";
import Category_List_Detail_Images_Item from '../component/Category_List_Detail_Images_Item'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Filter } from "../component/Filter";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { readOnlineApi } from "../ReadPostApi";
Geocoder.fallbackToGoogle('AIzaSyBv7qilelWW181590KkUizFqj4WcY2P1k0');
function Project_Section_Detail({ navigation, navigation: { goBack } }) {
  const { navigate } = useNavigation();
  const modalizeRef =  React.createRef();
  const [ImageSource,setImageSource] = useState('');
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message,setMessage] = useState('');
  const [location, setLocation] = useState(false);
  const [ShowFilter,setShowFilter]= useState(false);
  const [MudolList,setMudolList]= useState([]);
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [ShowDateRange,setShowDateRange]=useState(false);
  const [DateRangeList,setDateRangeList]=useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);

  useEffect(()=>{
    const date=new Date() ;
    Day=date.getDate();
    Month=date.getMonth()+1;
    const Year=date.getFullYear();
    const Hour=date.getHours();
    const Minute=date.getMinutes()
    const Second=date.getSeconds()
    TodayDate=`${Year}-${Month}-${Day}`;
    Full=`${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
    getLocation();
    getSectionDetail()
  }, []);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose =()=>{
    modalizeRef.current?.close();
  };
  ////////////////////////////////////
  const dateComparison_data =(a,b)=>{
    const date1 = new Date(a?.Date)
    const date2 = new Date(b?.Date)
    return date1 - date2;
  }
  const Make_Week_Filter_List=(A)=>{
    let B = [];
    let C=[]
    let endDate_Format=''
    var today = new Date(A?.[0]?.Date);
    var tomorrow = new Date(today);
    let endDate = "";
    if (A?.[0]?.WeekDay === "Sunday") {
      tomorrow?.setDate(today?.getDate() + 1);
      endDate = tomorrow?.toLocaleDateString();
    }
    else if (A?.[0]?.WeekDay === "Monday") {
      tomorrow?.setDate(today.getDate() + 7);
      endDate = tomorrow?.toLocaleDateString();
    }
    else if (A?.[0]?.WeekDay === "Tuesday") {
      tomorrow?.setDate(today?.getDate() + 6);
      endDate = tomorrow?.toLocaleDateString();

    }
    else if (A?.[0]?.WeekDay === "Wednesday") {
      tomorrow?.setDate(today?.getDate() + 5);
      endDate = tomorrow?.toLocaleDateString();

    }
    else if (A?.[0]?.WeekDay === "Thursday") {
      tomorrow?.setDate(today?.getDate() + 4);
      endDate = tomorrow?.toLocaleDateString();

    }
    else if (A?.[0]?.WeekDay === "Friday") {
      tomorrow?.setDate(today?.getDate() + 3);
      endDate = tomorrow?.toLocaleDateString();
    }
    else if (A?.[0]?.WeekDay === "Saturday") {
      tomorrow?.setDate(today?.getDate() + 2);
      endDate = tomorrow?.toLocaleDateString();
    }
    let newString = endDate.split('/')
    endDate_Format=newString?.[2]+'-'+newString?.[0]+'-'+newString?.[1]
    B.push({
      startDate: A?.[0]?.Date?.split(" ")?.[0],
      endDate:endDate_Format,
    });
    C=[...B]
    while(endDate_Format <= A?.[A?.length-1]?.Date?.split(" ")?.[0]) {
      today=new Date(C?.[C?.length-1]?.endDate);
      tomorrow?.setDate(today?.getDate()+7);
      endDate=tomorrow?.toLocaleDateString();
      let newString=endDate.split('/');
      endDate_Format=newString?.[2]+'-'+newString?.[1]+'-'+newString?.[0];
      C.push({
        startDate:C?.[C?.length-1]?.endDate,
        endDate:endDate_Format
      })
      C = [...C]
    }
    B=C
    setDateRangeList(B)
  }
  const getSectionDetail =async () => {
    if(GLOBAL.isConnected===true) {
      readOnlineApi(Api.getBuildNotes+ `&relatedId=${GLOBAL.UpdateSectionID}&relatedName=section`).then(json => {
        let A = [];
        json?.buildNotes?.forEach((obj) => {
          obj?.attachements?.forEach((obj2) => {
            const Day = obj2?.postDate?.split('-')
            const W = Day?.[2].split(' ');
            if(obj2?.imageUrl!==null) {
              A.push({
                uri: GLOBAL?.OrgAppLink_value + "/" + obj2?.imageUrl,
                type: obj2?.imageName.split(".")?.[1],
                fileName: obj2?.imageName,
                buildId: obj2.buildId,
                Type: "",
                Day: W?.[0],
                Month: Day?.[1],
                relatedId: obj?.buildIdRelatedId,
                buildIdAttachmentId: obj2?.buildIdAttachmentId,
                Show: "Yes",
                Date: obj2?.postDate,
                geoLat: obj2?.geoLat,
                geoLong: obj2?.geoLong,
                geoAddress: '',
                Country:' ' ,
                WeekDay:Moment(obj2?.postDate).format('dddd'),
              });
            }
          })
        })
        if(A?.length!==0) {
          A?.sort(dateComparison)
          Make_Week_Filter_List(A)
        }
        setImageSourceviewarray(A);
        setMudolList(A);
        Save_Details_Online(A)
      });
    }
    else {
      let Modules = await AsyncStorage.getItem(GLOBAL.SectionDetail_KEY)
      let Filter=JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateSectionID))
      if(Filter) {
        Filter?.sort(dateComparison)
        Make_Week_Filter_List(Filter)
        setImageSourceviewarray(Filter);
        setMudolList(Filter)
      }

    }
  };
  const selectPhotoFromGallery=()=> {
    onClose()
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      mediaType: 'photo',
      includeExif:true
    }).then(response => {

      if (response.didCancel) {
      } else if (response.error) {

      } else if (response.customButton) {
        alert(response.customButton);}
      else {
        if(ImageSourceviewarray)
          A = [...ImageSourceviewarray];
        if(ImageSourceviewarrayUpload)
          C = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj?.path?.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let D =''
          let B=''
          let RealDate=''
          let Months=''
          let buildid=0
          if(obj?.exif?.DateTimeDigitized!==null) {
            D = obj?.exif?.DateTimeDigitized?.split(":");
            B=D?.[2]?.split(' ');
            RealDate=`${D?.[0]}-${D?.[1]}-${B?.[0]} ${B?.[1]}:${D?.[3]}:${D?.[4]}`
            Months=D?.[1]
          }
          else {

            RealDate =Full;
            Months=Month
          }
          if(A.length!==0){
            buildid= parseInt(A?.[A.length - 1]?.buildId) + 1;
          }
          else {
            buildid = buildid + 1;
          }
          A.push({
            uri: obj.path,
            type: obj.mime,
            fileName: imgName,
            buildId:buildid,
            title:'',
            Date:RealDate,
            Type:'Gallery',
            Day:parseInt(B?.[0]),
            Month:Months,
            geoLat: location.latitude,
            geoLong:location.longitude,
            geoAddress:'',
            Country:'',
            Show: "Yes",
            WeekDay:Moment(Full).format('dddd'),
          });
          C.push({
            uri: obj.path,
            type: obj.mime,
            fileName: imgName,
            buildId:buildid,
            title:'',
            Date:RealDate,
            Type:'Gallery',
            Day:parseInt(B?.[0]),
            Month:Months,
            geoLat: location.latitude,
            geoLong:location.longitude,
            geoAddress:'',
            Country:'',
            Show: "Yes",
            WeekDay:Moment(Full).format('dddd'),
          });
        }
        if(A?.length!==0) {
          A?.sort(dateComparison)
          Make_Week_Filter_List(A)
        }
        setImageSourceviewarray(A);
        setImageSourceviewarrayUpload(C);
        setMudolList(A)
        A = [...A];
        C = [...C];


      }

    });
  };
  const selectPhoto=()=> {
    onClose()
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
      const date=new Date() ;
      const Day=date.getDate();
      const Month=date.getMonth()+1;
      const Year=date.getFullYear();
      const Hour=date.getHours();
      const Minute=date.getMinutes()
      const Second=date.getSeconds()
      const Full=`${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
      let buildid=0
      if(A?.length!==0){
        buildid= parseInt(A?.[A?.length - 1]?.buildId) + 1;
      }
      else {
        buildid = buildid + 1;
      }
      A.push({
        uri:response.path,
        type:response.mime,
        fileName:imgName,
        buildId:buildid,
        title:'',
        Date:Full,
        Type:'Camera',
        Day:Day,
        Month:Month,
        geoLat: location.latitude,
        geoLong:location.longitude,
        geoAddress:'',
        Country:'',
        Show: "Yes",
        WeekDay:Moment(Full).format('dddd'),
      });
      C.push({
        uri:response.path,
        type:response.mime,
        fileName:imgName,
        buildId:buildid,
        title:'',
        Date:Full,
        Type:'Camera',
        Day:Day,
        Month:Month,
        geoLat: location.latitude,
        geoLong:location.longitude,
        geoAddress:'',
        Country:'',
        Show: "Yes",
        WeekDay:Moment(Full).format('dddd'),
      });
      if(A?.length!==0) {
        A?.sort(dateComparison)
        Make_Week_Filter_List(A)
      }
      setImageSourceviewarray(A);
      setImageSourceviewarrayUpload(C);
      setMudolList(A)
      A = [...A];
      C = [...C];
    });
  };
  const SortByWeek=(startDate,endDate)=>{
    let Filter=MudolList
    let Filter2=[]
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
    setImageSourceviewarray(Filter2)
  };
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
  const AddImageOffline=()=>{
    let List_Item = [];
    let A=[];
    List_Item = ImageSourceviewarray?.filter((p) => p.Type==='');
    A = [...List_Item];
    ImageSourceviewarrayUpload?.forEach((obj) => {
      A.push({
        uri:obj.uri,
        type: obj?.type,
        fileName: obj?.fileName,
        buildId: obj.buildId,
        Type: "",
        Day: obj.Day,
        Month: obj.Month,
        Date: obj.Date,
        relatedId: GLOBAL.UpdateSectionID,
        Show: "Yes",
        geoLat: obj.geoLat,
        geoLong:obj.geoLong,
        geoAddress:obj.geoAddress,
        Country:obj.Country
      });
    })
    if(A?.length!==0) {
      A?.sort(dateComparison)
      Make_Week_Filter_List(A)
    }
    List_Item = A;
    setImageSourceviewarray(A);
    setImageSourceviewarrayUpload([])
    Save_Details(List_Item)
  };
  const Save_Details=async (A)=>{
    let AllList =[]
    let SiteDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.SectionDetail_KEY));
    if(SiteDetailList!==null &&SiteDetailList?.length!==0 ){
      let Filter=SiteDetailList?.filter((p) => parseInt(p.relatedId)===parseInt(GLOBAL.UpdateSectionID))
      const flag = compareTwoArrayOfObjects(Filter, A)
      if (flag === false) {
        let different=getDifference(A, Filter)
        let Exist=false
        different?.forEach((obj) => {
          Exist=Filter?.findIndex((p)=>p.buildId===obj.buildId)
        })
        if(Exist===-1) {
          let MakeList = [].concat(Filter,different)
          AllList = [...SiteDetailList?.filter((p) => parseInt(p.relatedId)!==parseInt(GLOBAL.UpdateSectionID)), ...MakeList];

        }}
      else {
        AllList = [...SiteDetailList?.filter((p) => parseInt(p.relatedId)!==parseInt(GLOBAL.UpdateSectionID)), ...A];

      }
      AllList?.sort(dateComparison)
      await AsyncStorage.setItem(GLOBAL.SectionDetail_KEY, JSON.stringify(AllList));
    }
    else if(A?.length!==0 && SiteDetailList===null) {
      A?.sort(dateComparison)
      await AsyncStorage.setItem(GLOBAL.SectionDetail_KEY,
        JSON.stringify(A),
      );
    }

  };
  const DeleteImageFromApi=(buildId)=>{
    const formData = new FormData();
    formData.append('userId','1');
    formData.append('buildNoteId',buildId);
    formData.append('notes','delete');
    writePostApi("POST", Api.DeleteBuildNote,formData).then(json => {
      if (json) {
        if(json?.status===true)
        {
          setMessage(json.msg)
          setShowMessage(true)
          DeleteImage(buildId)
          const timerId = setInterval(() => {
            setShowMessage(false)
          }, 4000)
          return () => clearInterval(timerId);
        }}
      else{
        setMessage('Your BuildNote successfully deleted')
        setShowMessage(true)
        DeleteImage(buildId)
        const timerId = setInterval(() => {
          setShowMessage(false)
        }, 4000)
        return () => clearInterval(timerId);
      }
    });
  };
  const DeleteImage=(fileName,buildId)=>{
    let A=[...ImageSourceviewarray]
    const index= A?.findIndex((p)=>p?.buildId===buildId)
    A.splice(index, 1);
    A?.sort(dateComparison)
    setImageSourceviewarray(A);
    setMudolList(A);
    Save_Details(A);
  };
  const Change_Gallry_Date=(date,buildId)=>{
    let List_Item = [];
    List_Item = ImageSourceviewarrayUpload;
    let List_Item_array = [];
    List_Item_array=ImageSourceviewarray
    let index_array = List_Item_array?.findIndex((p) => p?.buildId === buildId);
    let markers_array = [...List_Item_array];
    markers_array[index_array] = { ...markers_array[index_array], Date:date,Day:date?.split('-')?.[2]?.split(' ')?.[0],Month:date?.split('-')?.[1] };
    markers_array?.sort(dateComparison)
    setImageSourceviewarray(markers_array)
    Make_Week_Filter_List(markers_array)
    let index = List_Item?.findIndex((p) => p?.buildId === buildId);
    let markers = [...List_Item];
    markers[index] = { ...markers[index], Date:date,Day:date?.split('-')?.[2]?.split(' ')?.[0],Month:date?.split('-')?.[1] };
    setImageSourceviewarrayUpload(markers);
    Save_Details(markers_array)
  }
  ///////////////////////////////////////
  const FilterFunc=(id)=>{
    let Filter=MudolList
    if(id===0){
      setImageSourceviewarray(MudolList)
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

      setImageSourceviewarray(A)
    }
  }
  const  renderContent= () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={()=> onClose()} style={Styles.CancelBtn}>
        <View style={{width:'80%'}}>
          <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhoto()
      }} style={Styles.UploadBtn}>
        <AntDesign name={"camera"} size={17} color={'#fff'} />
        <Text style={[Styles.TextUploadBtn]}>
          Use Camera
        </Text>

      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhotoFromGallery()

      }} style={Styles.UploadBtn}>
        <AntDesign name={"picture"} size={17} color={'#fff'} />
        <Text style={[Styles.TextUploadBtn]}>
          Choose From Gallery
        </Text>

      </TouchableOpacity>
    </View>
  )
  const Save_Details_Online=async (A)=>{
    let AllList=[];
    let Filter=[];
    let SiteDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.SectionDetail_KEY));
    Filter=SiteDetailList?.filter((p) =>parseInt(p.relatedId)!==parseInt(GLOBAL.UpdateSectionID))
    if(SiteDetailList!==null&&Filter!==null) {
        AllList = [...Filter, ...A];
    }
    else {
      AllList=A
    }
    await AsyncStorage.setItem(GLOBAL.SectionDetail_KEY, JSON.stringify(AllList));
  }
  const  compareTwoArrayOfObjects = (
    first_array_of_objects,
    second_array_of_objects
  ) => {
    return (
      first_array_of_objects.length === second_array_of_objects.length &&
      first_array_of_objects.every((element_1) =>
        second_array_of_objects.some((element_2) =>
          Object.keys(element_1).every((key) => element_1[key] === element_2[key])
        )
      )
    );
  }
  const getDifference=(array1, array2)=> {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return object1?.buildId === object2?.buildId &&object1?.fileName === object2?.fileName;
      });
    });
  }
  const getLocation = async () => {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
            var NY = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            Geocoder.geocodePosition(NY).then(res => {
              setGeoAddress(res?.[0]?.formattedAddress)
            })
              .catch(err => console.log(err,'errrrr'))
          },
          error => {
            // See error code charts below.
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
  };
  const AddSectionImage =()=>{
      let idsArray=''
      const formData = new FormData();
      formData.append('userId','1');
      formData.append('relatedName','section');
      formData.append('relatedId',GLOBAL.UpdateSectionID);
      formData.append('geoLat',location.latitude);
      formData.append('geoLong',location.longitude);
      formData.append('geoAddress',GeoAddress);
      formData.append('buildType','general');
      if(ImageSourceviewarrayUpload?.length!==0){
        for (let i=0; i < ImageSourceviewarrayUpload.length;i++) {
          idsArray = ImageSourceviewarrayUpload[i];
          formData.append('attachment', {
            uri:idsArray.uri,
            type: idsArray.type,
            name: idsArray.fileName,
          });
          formData.append('postDate',idsArray.Date);

          writePostApi("POST", Api.AddBuildNotes, formData,ImageSourceviewarrayUpload).then(json => {
            if (json) {
            if(json?.status===true)
            {
              setMessage(json?.msg)
              setShowMessage(true)
              const timerId = setInterval(() => {
                setShowMessage(false)
              }, 4000)
              return () => clearInterval(timerId);
            }}
            else   {
              setMessage('Your BuildNotes successfully added')
              setShowMessage(true);
              const timerId = setInterval(() => {
                setShowMessage(false);
              }, 4000);
              return () => clearInterval(timerId);
            }
          });

        }
        AddImageOffline()
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

    <View style={Styles.DeleteModalStyle}>

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
            navigation.navigate('LogIn');
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  const logout_Url= () => {
    setshowModalDelete(true)

  };
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#ffadad','#f67070','#FF0000']} StatusColor={'#ffadad'} onPress={goBack} Title={'Sections Detail'}/>
      {ShowMessage === true ?
        <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
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
        :null}
      <Content style={[{ backgroundColor: Colors.background }]}>
        <View style={Styles.container}>
          <View style={Styles.Center}>
            {
              showModalDelete &&
              <View>
                {
                  _showModalDelete()
                }
              </View>
            }
            <Filter  FilterFunc={FilterFunc} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter} setShowFilter={setShowFilter}/>
            {
              showModalCalender &&

              _showModalCalender()

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
            <View style={Styles.FlexWrap}>
              <TouchableOpacity onPress={() => onOpen()} style={Styles.unitDetailUploadImagebox}>
                <Text style={Styles.UploadImageText}>
                  Add Photos
                </Text>
                <MaterialIcons name={"add-a-photo"} size={20} color={"#fff"}  />
              </TouchableOpacity>
            {
              ImageSourceviewarray.map((value,index) => {
                return (
               <Category_List_Detail_Images_Item value ={value} key={index} DeleteImage={DeleteImageFromApi}
                                                 Change_Gallry_Date={Change_Gallry_Date} Type={'Feature'}/>
                    )
              })
            }

            </View>
            <ButtonI style={Styles.btn23}//handleSubmit
                     onpress={AddSectionImage}
                     categoriIcon={""}
                     title={'Save Photos'}
                     colorsArray={['#ffadad','#f67070','#FF0000']}
                     styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />

          </View>
        </View>
      </Content>
      <Modalize ref={modalizeRef}  withHandle={false}  modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>

  );
}


export default Project_Section_Detail;
