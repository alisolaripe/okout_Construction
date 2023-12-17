import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View, TouchableOpacity, SafeAreaView,Modal, Image, FlatList,
} from "react-native";
import { ButtonI } from "../component/ButtonI";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import {Container, Content} from "native-base";
import List_Item_Detail_Images from '../component/List_Item_Detail_Images'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { Filter } from "../component/Filter";
import {readOnlineApi } from "../ReadPostApi";
import { removeDataStorage } from "../Get_Location";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
const GLOBAL = require("../Global");
const Api = require("../Api");
let A=[];
function Details_image({ navigation, navigation: { goBack } }) {
  const scrollViewRef = useRef();
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowFilter, setShowFilter] = useState(false);
  const [ShowDateRange, setShowDateRange] = useState(false);
  const [MudolList, setMudolList] = useState([]);
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [DateRangeList,setDateRangeList]=useState([]);
  const [scroll, setscroll] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);

  useEffect(() => {
    if (GLOBAL.SectionName === "site") {
      getSitesDetail();
    } else if (GLOBAL.SectionName === "unit") {
      getUnitDetail();
    }
  }, []);
  const dateComparison_data =(a,b)=>{
    const date1 = new Date(a?.Date)
    const date2 = new Date(b?.Date)
    return date1 - date2;
  }
  //////////////////////////////////

  const Make_Week_Filter_List=(A)=>{
    let B = [];
    let endDate_Format=''
    let today =''
    let tomorrow = ''
    let endDate = "";
    let Exist=''
    A?.forEach((obj) => {
      today = new Date(obj?.Date);
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
          startDate: obj?.Date?.split(" ")?.[0],
          endDate: endDate_Format,
        });
      }
    });
    setDateRangeList(B)
  };
  const getSitesDetail = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getBuildNotes+`userId=${GLOBAL.UserInformation?.userId}&relatedId=${GLOBAL.UpdateSiteID}&relatedName=site`).then(json => {
        let A = [];
        json?.buildNotes?.forEach((obj) => {
          obj?.attachements.forEach((obj2) => {
            const Day = obj2?.postDate?.split("-");
            const W = Day?.[2].split(" ");
            let Address=obj2?.geoAddress?.split(',')
            if (obj2?.imageUrl !== null) {
              let WeekDay=getDayOfWeek( obj2?.postDate)
              A.push({
                uri: GLOBAL.OrgAppLink_value + "/" + obj2?.imageUrl,
                type: obj2?.imageName.split(".")?.[1],
                fileName: obj2?.imageName,
                buildId: obj2.buildId,
                Show: "No",
                Day: W?.[0],
                Month: Day?.[1],
                Date: obj2.postDate,
                relatedId: obj.buildIdRelatedId,
                relatedName:"site",
                Type:"",
                geoLat: obj2?.geoLat,
                geoLong: obj2?.geoLong,
                geoAddress: obj2?.geoAddress,
                Country:Address?.[3]+Address?.[1],
                WeekDay:WeekDay
              });
            }
          });
        });
        if(A?.length!==0) {
          A?.sort(dateComparison_data)
          setImageSourceviewarray(A);
          setMudolList(A);
          Make_Week_Filter_List(A)
          Save_Details(A);
        }
        else {
          setImageSourceviewarray('')
        }
      });
    }
    else {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.DYBProjectsDetails))
        if(json) {
          let Filter = json?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateSiteID) && p.relatedName === "site");
          if (Filter) {
            if (Filter?.length >1) {
              Filter?.sort(dateComparison_data)
              Make_Week_Filter_List(Filter)
              setImageSourceviewarray(Filter);
              setMudolList(Filter);
            }
          }
          else {
            setImageSourceviewarray('')
          }
        }


    }
  };
  const getUnitDetail = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.getBuildNotes+`userId=${GLOBAL.UserInformation?.userId}&relatedId=${GLOBAL.UpdateSiteID}&relatedName=unit`).then(json => {
        let A = [];
        json?.buildNotes?.forEach((obj) => {
          obj?.attachements?.forEach((obj2) => {
            const Day = obj2?.postDate?.split("-");
            const W = Day?.[2]?.split(" ");
            let Address=obj2?.geoAddress?.split(',')
            if (obj2?.imageUrl !== null) {
              let WeekDay=getDayOfWeek( obj2?.postDate)
              A.push({
                uri: GLOBAL.OrgAppLink_value + "/" + obj2?.imageUrl,
                type: obj2?.imageName.split(".")?.[1],
                fileName: obj2?.imageName,
                buildId: obj2.buildId,
                Day: W?.[0],
                Month: Day?.[1],
                Date: obj2.postDate,
                relatedId: obj.buildIdRelatedId,
                relatedName:"unit",
                Show: "Yes",
                geoLat: obj2?.geoLat,
                geoLong: obj2?.geoLong,
                Type:"",
                geoAddress: obj2?.geoAddress,
                Country:Address?.[3]+Address?.[1],
                WeekDay:WeekDay
              });
            }
          });
        });
        if(A?.length!==0) {
          A?.sort(dateComparison_data)
          setImageSourceviewarray(A);
          setMudolList(A);
          Make_Week_Filter_List(A)
          Save_Details(A);
        }
        else {
          setImageSourceviewarray('')
        }
      });
    }
    else {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.DYBProjectsDetails))
        if(json) {
          let Filter = json?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateSiteID) && p.relatedName === "unit");
          if (Filter) {
            if (Filter.length>1) {
              Filter?.sort(dateComparison_data)
              Make_Week_Filter_List(Filter)
              setImageSourceviewarray(Filter);
              setMudolList(Filter);
            }
          else {
              setImageSourceviewarray('')
            }
          }
        }
    }
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
  /////////////////////////////////
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
        return object1.relatedId === object2.relatedId;
      });
    });
  }
  const Save_Details=async (A)=>{
    let AllList =[];
    let SiteDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.DYBProjectsDetails));
    if(SiteDetailList!==null &&SiteDetailList?.length!==0){
      let Filter=SiteDetailList?.filter((p) =>p.relatedName===GLOBAL.SectionName&&p.relatedId===GLOBAL.UpdateSiteID)
      const flag = compareTwoArrayOfObjects(Filter, A)
      if (flag === false) {
        let different=getDifference(A, Filter)
          let MakeList = [].concat(SiteDetailList?.filter((p) =>p.relatedName===GLOBAL.SectionName&&p.relatedId!==GLOBAL.UpdateSiteID), different)
          AllList = [...SiteDetailList?.filter((p)=>p.relatedName!== GLOBAL.SectionName), ...MakeList];
        await AsyncStorage.setItem(GLOBAL.DYBProjectsDetails, JSON.stringify(AllList))
      }
    }
    else if(A?.length!==0 && SiteDetailList===null) {
      await AsyncStorage.setItem(GLOBAL.DYBProjectsDetails,
        JSON.stringify(A),
      );
    }
  }
  const FilterFunc = (id) => {
    let FilterList = [];
    FilterList = MudolList;
    if (id === 0) {
      setImageSourceviewarray(MudolList);
    } else if (id === 1) {
      setshowModalCalender(true);
    } else if (id === 2) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth();
      let A = [];
      A = FilterList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      setImageSourceviewarray(A);
    }
  };
  const  getDayOfWeek=(date)=> {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
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
              navigation.navigate('LogIn');
              setshowModalDelete(false)
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
    <List_Item_Detail_Images value={item} Type={'DYB'}
    />
  )
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={["#ffc2b5", "#fca795", "#d1583b"]} StatusColor={"#ffc6bb"} onPress={goBack}
              Title={GLOBAL.MenuName} />
      {/*<ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}*/}
      {/*            style={[{ backgroundColor: Colors.background }]}>*/}
        <View style={Styles.container}>
          <View style={Styles.Center_margin_Bottom_details}>
            {
              showModalDelete &&
              <View>
                {
                  _showModalDelete()
                }
              </View>
            }
            {ImageSourceviewarray?.length !== 0 ?
              <Filter FilterFunc={FilterFunc} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter}
                      setShowFilter={setShowFilter} /> : null
            }
            {
              showModalCalender &&

              _showModalCalender()

            }
            {ShowDateRange === true ?
              <TouchableOpacity onPress={() => setshowModalCalender(true)} style={Styles.WeekFilterBox}>
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
            {ImageSourceviewarray && (
              <FlatList
                ref={scrollViewRef}
                columnWrapperStyle={{ justifyContent: "space-between",}}
                contentContainerStyle={{ justifyContent: "space-between",}}
                data={ImageSourceviewarray}
                numColumns={2}
                style={{width:'100%',}}
                renderItem={renderItem}
                key={'#'}
                keyExtractor={(item, index) => {
                  return "#" +index.toString();
                }}
              />
            )}
            {ImageSourceviewarray===''&&
              <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No items added  yet"
                </Text>

              </View>
            }
          </View>
        </View>

        {
          ImageSourceviewarray!==''&&
          <>
            {scroll===false?
            <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn]}>
              <TouchableOpacity transparent onPress={() => {
                scrollViewRef.current.scrollToEnd({ animated: true })
                setscroll(true)
              }}>
                <AntDesign name="down" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>:
            <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn]}>
              <TouchableOpacity transparent onPress={() => {
                scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
                setscroll(false)
              }}>
                <AntDesign name="up" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            }
          </>
      }
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>

  );
}


export default Details_image;
