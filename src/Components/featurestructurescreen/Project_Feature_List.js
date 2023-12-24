import React, { useState,useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity, SafeAreaView, Dimensions, Modal, Image, FlatList,
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
import {removeDataStorage} from "../Get_Location";
import {  readOnlineApi } from "../ReadPostApi";

let A=[];
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
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      setroute(GLOBAL.route)
      getFeatureDetail();
    });
    return unsubscribe;
  }, []);
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
                navigation.navigate('Project_Feature_Detail')
              }}>
                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Note</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient   colors={['#648bfc','#5982fa','#4B75FCFF']} style={Styles.btnList15}>
              <TouchableOpacity onPress={()=> {
                GLOBAL.Feature="Image";
                navigation.navigate('Project_Feature_Detail')
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

                navigation.navigate('Project_Feature_Detail')
              }}>
                <Text style={[Styles.txt_left2,{fontSize: normalize(14) }]}>Add Photos</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
      }
    </>
  )
  return (
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
            <View style={Styles.With90CenterVertical}>
                  <Text style={Styles.EmptyText}>
                 " No items added  yet"
                  </Text>
                </View>
            }
          </View>
        </View>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url}/>
    </Container>
  );
}


export default Project_Feature_List;
