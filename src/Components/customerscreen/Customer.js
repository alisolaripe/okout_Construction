import { Container, Content } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Warningmessage } from "../component/Warningmessage";
import { Footer1 } from "../component/Footer";
import React, { useEffect, useState } from "react";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import { UserPermission } from "../CheckPermission";
import { TextInputI } from "../component/TextInputI";
let City=[]
const GLOBAL = require("../Global");
const Photoes=require('../Photoes')
function Customer({navigation,navigation:{goBack}}) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [Cheked,setCheked] = useState(false);
  const [CountryList,setCountryList] = useState([]);
  const [CityList,setCityList] = useState([]);
  const [cityId,setcityId] = useState('');
  const [countryId,setcountryId] = useState('');
  const logout_Url= () => {
    setshowModalDelete(true)
  };
  const _showModalDelete = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDelete}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDelete( false)}
          transparent={true}>
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
                 source={Photoes.Alert}
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
  const CreateCustomer=()=>{
  }
  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };
  useEffect(() => {
    getCountry_city()
  }, []);
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
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#ffc2b5','#fca795','#d1583b']} StatusColor={'#ffc6bb'} onPress={goBack}
              Title={"Customer"} />
      <Content style={{zIndex:1000}}>
      <View style={[Styles.containerList]}>
        {
          showModalDelete &&
          <View>
            {
              _showModalDelete()
            }
          </View>
        }
        {showWarning===true&& <Warningmessage/>}
        <View style={Styles.mainSystemDesigner}>
          <TextInputI onChangeText={(value)=>CreateCustomer(value)}  numberValue={30} CountryList={CountryList} CityList={CityList}
                      ChangeChecked={(value)=>ChangeChecked(value)}  tittlebtn={'CreateCustomer'} getCity={getCity}/>
        </View>
      </View>
      </Content>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url} />
    </Container>
  );
}
export default Customer;
