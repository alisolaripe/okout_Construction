import { Styles } from "../Styles";
import { Content } from "native-base";
import React from "react";
import {TouchableOpacity,View,Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "./TextInputI";
function AddModal ({numberValue,GeoAddressCity,GeoAddressCountry,GeoAddressStreet,GeoAddressPostalCode,CityList,CountryList,location,
                     onPressAdd,tittlebtn,setCheked,Cheked,ShowButton,ChangeChecked,
                     setGeoAddressCity,setGeoAddressCountry,
                     setGeoAddressStreet,setGeoAddressPostalCode,
                     setcountryId,setcityId,getCity,setvisibleAddModal,visibleAddModal,setShowMessage,
                   }){



  return(
  <Modal
    animationType="slide"
    transparent={true}
    visible={visibleAddModal}>
    <Content contentContainerStyle={[Styles.centeredView, {
      flexGrow: 1,
      backgroundColor: "rgba(0,0,0, 0.5)",
      justifyContent: "center",
    }]}>
      <View style={[Styles.ModalStyle]}>
        <View style={[{ width: "89%", marginTop: "4%" }]}>
          <TouchableOpacity onPress={() => {

            setvisibleAddModal(false);
            setShowMessage(false);
          }} style={Styles.CancelBtnLeftAlign}>
            <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
             <TextInputI
             GeoAddressCity={GeoAddressCity} GeoAddressCountry={GeoAddressCountry} GeoAddressStreet={GeoAddressStreet}
             GeoAddressPostalCode={GeoAddressPostalCode} CityList={CityList} CountryList={CountryList} location={location}
             onChangeText={(value) => onPressAdd(value)} numberValue={numberValue} ShowButton={ShowButton}
             ChangeChecked={(value) => ChangeChecked(value)} setCheked={setCheked} Cheked={Cheked} getCity={getCity}
             setGeoAddressCity={setGeoAddressCity}
             setGeoAddressCountry={setGeoAddressCountry}
             setGeoAddressStreet={setGeoAddressStreet}
             setGeoAddressPostalCode={setGeoAddressPostalCode}
            setcountryId={setcountryId} setcityId={setcityId}
            tittlebtn={tittlebtn} />
      </View>
    </Content>
  </Modal>
  )
}
export { AddModal };
