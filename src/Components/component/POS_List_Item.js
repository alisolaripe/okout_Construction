import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions, Modal, Platform, Linking,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Dropdown } from "react-native-element-dropdown";
import LinearGradient from "react-native-linear-gradient";
import { Container, Content } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const GLOBAL = require("../Global");
function POS_List_Item({
                              value,
                              SeeDetail,
                               data,
                               Navigate_Url,
                            }) {
  const [isFocus, setIsFocus] = useState(false);
  const [visible,setvisible] = useState(false);
  const ClickManagement = (id, Id) => {
    if(id=== "14") {
      setvisible(true)
    }
    else if(id=== "2") {
      GLOBAL.UpdateUnitID = value.Id;
      Navigate_Url('Project_Unit_Detail')
    }
    else if(id=== "3") {
      GLOBAL.UpdateSiteID = value.Id;
      Navigate_Url('Project_Site_Detail');
    }
  };
  const renderItem = (item, index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{ paddingLeft: 7 }}>
          <FontAwesome6 size={normalize(12)} color={Colors.button} name={item.Icon} />
        </View>
        <Text style={Styles.txt_leftDropdown}>{item.label}</Text>
      </View>
    );
  };
  const openMaps=(latitude,longitude)=> {
    if (Platform.OS === "android") {
      Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
        .catch(err => console.error("An error occurred", err));
    }
  }
  return (
          <View  style={Styles.ItemDetailBox}>
            <View style={Styles.With90}>
              <View style={{ width: "100%" }}>
                <Text onPress={() => SeeDetail(value.Id)} style={[Styles.txt_left_Pos]}>{value.Name}</Text>
                <View style={Styles.BtnListStyle}>
                  {/*<Text onPress={() => SeeDetail(value.Id)} style={[Styles.txt_left_small2]}>{value.Address}</Text>*/}
                  <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
                    <TouchableOpacity onPress={() =>  Navigate_Url('InvoiceScreen')}>
                      <Text
                        style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Invoice</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient colors={['#a39898', '#786b6b', '#382e2e']} style={Styles.btnPos}>
                        <TouchableOpacity onPress={() => {
                          Navigate_Url('InvoiceScreen')}}>
                          <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Return Invoice</Text>
                        </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
            >
              <Content contentContainerStyle={[Styles.centeredView, {
                flexGrow: 1,
                backgroundColor: "rgba(0,0,0, 0.5)",
                justifyContent: "center",
              }]}>
                <View style={[Styles.ModalLocationStyle]}>
                  <View style={[{ width: "89%", marginBottom: "4%" }]}>
                    <TouchableOpacity onPress={() => {
                      setvisible(false);
                    }} style={Styles.CancelBtnLeftAlign}>
                      <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.formContainer}>
                    <View style={Styles.InputeRowItems2}>
                      <Text
                        style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>Street</Text>
                      <View
                        style={[Styles.inputStyleLocation]}>
                        <Text numberOfLines={3} style={[Styles.txtLightColor]}>{value?.street}</Text>
                      </View>
                    </View>
                    <View style={Styles.InputeRow}>
                      <View style={Styles.InputeRowItems}>
                        <Text
                          style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>Country</Text>
                        <View
                          style={[Styles.inputStyleLocation]}>

                          <Text style={[Styles.txtLightColor]}>{value?.countryName}</Text>

                        </View>
                      </View>
                      <View style={Styles.InputeRowItems}>
                        <Text
                          style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>City</Text>
                        <View
                          style={[Styles.inputStyleLocation]}>
                          <Text style={[Styles.txtLightColor]}>{value?.cityName}</Text>

                        </View>
                      </View>

                      <View style={Styles.InputeRowItems}>
                        <Text style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>postal
                          code</Text>
                        <View
                          style={[Styles.inputStyleLocation]}>
                          <Text style={[Styles.txtLightColor]}>{value?.postalCode}</Text>

                        </View>
                      </View>
                      <TouchableOpacity onPress={()=>openMaps(value?.geoLat,value?.geoLong)} style={Styles.InputeRowItems}>
                        <View style={Styles.InputeRowLocation}>
                          <MaterialCommunityIcons
                            style={Styles.icon_Location}
                            color="#fff"
                            name="map-search-outline"
                            size={14}
                          />
                          <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Lat & Long
                            <Text style={Styles.txtLightColor_samall}>  (click here)</Text>
                          </Text>
                        </View>

                        <View
                          style={Styles.inputStyleLocation}>
                          { value?.geoLat&&value?.geoLong?
                            <Text style={Styles.txtLightColorLocation}>{value?.geoLat} , {value?.geoLong}</Text>:
                            <Text style={Styles.txtLightColorLocation}></Text>
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Content>
            </Modal>
          </View>
  );
}

export default POS_List_Item;
