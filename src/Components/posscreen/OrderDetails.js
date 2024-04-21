import { FlatList, Image, ImageBackground, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import { UserPermission } from "../CheckPermission";
import React, { useState } from "react";
import { Container, Content } from "native-base";
import { Header } from "../component/Header";
import { Warningmessage } from "../component/Warningmessage";
import { Footer1 } from "../component/Footer";
const GLOBAL = require("../Global");
const Photoes=require('../Photoes');
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
let numOfLinesCompany=0
function OrderDetails({navigation,navigation:{goBack}}) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [TypeList, setTypeList] = useState([{value:'0',label:'Cash'},{value:'1',label:'Cerdit Card'},{value:'2',label:'Amex'},
    {value:'3',label:'Online Payment'},
  ]);
  const [isFocus, setIsFocus] = useState(false);
  const [showWarning, setshowWarning] = useState(false)
  const [Amount, setAmount] = useState('')
  const [notes, setnotes] = useState('')
  const [ShowModal, setShowModal] = useState(false);
  const [cashType, setcashType] = useState('');
  const [cashTypeId, setcashTypeId] = useState(0);
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
  const renderItem_Location = (item,value) => {
    return (
      <View style={Styles.item_dropdownLocation}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={Styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
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
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={["#4d78a5", "#375e89", "#27405c"]} StatusColor={'#5079a5'} onPress={goBack}
              Title={"Order Details"} />
      <Content contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          {showWarning===true&& <Warningmessage/>}
            <View style={Styles.mainRenderUser}>
              <Text style={Styles.txtRenderUser}>Customers :   Walk In Customer </Text>
              <View style={Styles.dashRenderUser}/>
              <Text style={Styles.txtRenderUser}>
                ITEM :  Single Matress Bag 3.6 </Text>
              <View style={Styles.dashRenderUser}/>
              <Text style={Styles.txtRenderUser}>PRICE : 400 </Text>
              <View style={Styles.dashRenderUser}/>
              <Text style={Styles.txtRenderUser}>QTY : 2 </Text>
              <View style={Styles.dashRenderUser}/>
              <Text style={Styles.txtRenderUser}>TOTALS : 800</Text>
            </View>
        <View style={Styles.Center_margin_Bottom3}>
        <View style={Styles.background}>
          <View style={[{backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR}, Styles.submitted]}>

            <View style={Styles.Width25}>
              <Text style={[{flex: 1}, Styles.txtTitleSubmitted]}>Amount
              </Text>
            </View>
            <View style={Styles.Width25}>
              <Text style={[{flex:1}, Styles.txtTitleSubmitted]}>Type
              </Text>
            </View>
            <View style={Styles.Width25}>
              <Text style={[{flex:1}, Styles.txtTitleSubmitted]}>Type
              </Text>
            </View>
            <View style={Styles.Width25}>
              <Text style={[{flex:1}, Styles.txtTitleSubmitted]}>Item
              </Text>
            </View>
          </View>
        </View>
        <View style={Styles.BtnListStyle3}>
          <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
            <TouchableOpacity onPress={()=> setShowModal(true)}>
              <Text
                style={[Styles.txt_left2, { fontSize: normalize(15) }]}> Pay</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
            <TouchableOpacity onPress={()=>navigation.navigate ('InvoiceScreen')} >
              <Text
                style={[Styles.txt_left2, { fontSize: normalize(15) }]}> Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        </View>
        <Modal
          transparent={true}
          visible={ShowModal}
          avoKeyboard={true}
        >
          <Content contentContainerStyle={[Styles.centeredView, {
            flexGrow: 1,
            backgroundColor: "rgba(0,0,0, 0.5)",
            justifyContent: "center",
          }]}>
            <View style={[Styles.ModalLocationStyle]}>
              <View style={[{ width: "89%", marginBottom: "10%" }]}>

              </View>
              <View style={Styles.formContainer}>
                <View style={Styles.background}>
                  <View style={[{backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR}, Styles.submitted]}>

                    <View style={Styles.Width50}>
                    <Text style={[{flex: 1}, Styles.txtTitleSubmitted]}>Amount
                    </Text>
                    </View>
                    <View style={Styles.Width50}>
                      <Text style={[{flex:1}, Styles.txtTitleSubmitted]}>Type
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{marginBottom: 5}}>
                  <View
                    style={Styles.whiteView2}>

                    <View style={Styles.Width47}>
                      <TextInput
                        value={Amount}
                        keyboardType={"numeric"}
                        style={Styles.inputStyleorderDetails}
                        onChangeText={(val)=>setAmount(val)}
                        placeholderTextColor={'#fff'} />
                    </View>
                    <View style={Styles.Width47}>
                      <Dropdown
                        style={[Styles.dropdownLocationAdd]}
                        placeholderStyle={Styles.placeholderStyle}
                        selectedTextStyle={Styles.selectedTextStyle}
                        iconStyle={Styles.iconStyle}
                        itemTextStyle={Styles.itemTextStyle}
                        data={TypeList}
                        maxHeight={150}
                        labelField="label"
                        valueField="value"
                        inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                        placeholder={cashType}
                        value={cashType}
                        containerStyle={Styles.containerStyle}
                        renderItem={renderItem_Location}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setcashType(item.label);
                          setcashTypeId(item.value);
                        }}
                        renderSelectedItem={(item, unSelect) => (
                          <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                            <View style={Styles.selectedStyle2}>
                              <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                              <AntDesign color="#fff" name="delete" size={15} />
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </View>
                <View style={Styles.Width100}>
                  <Text style={[Styles.txtLightColor,{textAlign:"left"}]}>Notes</Text>
                  <TextInput
                    value={notes}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    multiline={true}
                    style={Styles.inputStyleorderDetailsnotes}
                    onChangeText={(val)=>setnotes(val)}
                    placeholderTextColor={'#fff'} />
                  <Text style={[Styles.txtLightColor,{textAlign:"left"}]}>Pending Amount : 400</Text>
                </View>
                <View style={[Styles.BtnListStyle3,{marginVertical:'6%'}]}>

                  <LinearGradient colors={["#ffebae", "#ecd897", "#c4b57b"]} style={Styles.btnList}>
                    <TouchableOpacity onPress={()=> setShowModal(true)}>
                      <Text
                        style={[Styles.txt_left23, { fontSize: normalize(15) }]}> Submit</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient  colors={["#ffebae", "#ecd897", "#c4b57b"]} style={Styles.btnList}>
                    <TouchableOpacity onPress={()=>setShowModal(false)} >
                      <Text
                        style={[Styles.txt_left23, { fontSize: normalize(15) }]}> Close</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Content>
        </Modal>
      </Content>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url} />
    </Container>
  );
}
export default OrderDetails;

