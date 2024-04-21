import { Styles } from "../Styles";
import { Content } from "native-base";
import React, { useState } from "react";
import {TouchableOpacity,View,Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "./TextInputI";
function AddModal ({numberValue,GeoAddressCity,GeoAddressCountry,GeoAddressStreet,GeoAddressPostalCode,CityList,CountryList,location,
                     onPressAdd,tittlebtn,setCheked,Cheked,ShowButton,ChangeChecked,
                     setGeoAddressCity,setGeoAddressCountry,setCityList,setCountryList,
                     setGeoAddressStreet,setGeoAddressPostalCode,setLocation,setGeoAddress,
                     setcountryId,setcityId,getCity,setvisibleAddModal,visibleAddModal,setShowMessage,setCategoryId,setSelectedcategory,
                     setTaskRelatedNameId,setselectedrelatedname,marker, setmarker
                   }){
  const [showMap, setshowMap] = useState(false);
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
              {
                showMap===false?
                  <TouchableOpacity onPress={() => {

                    setvisibleAddModal(false);
                    setShowMessage(false);
                  }} style={Styles.CancelBtnLeftAlign}>
                    <AntDesign name={"closecircleo"} size={20} color={"#4a6e8e"} />
                  </TouchableOpacity>:
                  <TouchableOpacity onPress={() => {
                    setshowMap(false);
                  }} style={Styles.CancelBtnLeftAlign}>
                    <AntDesign name={"closecircleo"} size={20} color={"#4a6e8e"} />
                  </TouchableOpacity>
              }

            </View>
                <TextInputI setshowMap={setshowMap} setCountryList={setCountryList} setCityList={setCityList} showMap={showMap}
                            GeoAddressCity={GeoAddressCity} GeoAddressCountry={GeoAddressCountry} GeoAddressStreet={GeoAddressStreet}
                            GeoAddressPostalCode={GeoAddressPostalCode} CityList={CityList} CountryList={CountryList} location={location}
                            onChangeText={(value) => onPressAdd(value)} numberValue={numberValue} ShowButton={ShowButton}
                            ChangeChecked={(value) => ChangeChecked(value)} setCheked={setCheked} Cheked={Cheked} getCity={getCity}
                            setGeoAddressCity={setGeoAddressCity} setGeoAddressCountry={setGeoAddressCountry}
                            setGeoAddressStreet={setGeoAddressStreet} marker={marker} setmarker={setmarker}
                            setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                            setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId}
                            setGeoAddressPostalCode={setGeoAddressPostalCode} setGeoAddress={setGeoAddress}
                            setcountryId={setcountryId} setcityId={setcityId} setLocation={setLocation}
                            tittlebtn={tittlebtn}  />

          </View>


    </Content>
  </Modal>
  )
}
export { AddModal };
