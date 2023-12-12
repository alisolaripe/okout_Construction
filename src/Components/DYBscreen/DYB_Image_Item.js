
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions, Modal, ImageBackground, TextInput, Image,
} from "react-native";
import Moment from 'moment';
import DatePicker from 'react-native-date-picker'
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Colors } from "../Colors";
import LinearGradient from "react-native-linear-gradient";
import { Content } from "native-base";
const GLOBAL = require("../Global");
function DYB_Image_Item({index,value,DeleteImage,}) {
  const [AddText,setAddText] = useState(false);
  const [FullImage,setFullImage] = useState(false);
  const [visible,setvisible] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const width = Dimensions.get("window").width;
  const oval1Width = width * 0.5;
  const [isFocus,setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [DateFormat,setDateFormat]=useState('')
  const ShowImage=(value)=>{
    setvisible(!visible)
    setFullImage(value)
  }
  useEffect(()=>{

    setDateFormat(value.Date)

  }, []);
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
            Do you want to delete Image from List?
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
            DeleteImage(value.fileName,value.buildId)
            setshowModalDelete( false)
          }} >

            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  return (

    <View index={index} style={Styles.UnitDetailImageBoxFeatureStyle}>
      <ImageBackground source={{ uri: value.uri}}
                       imageStyle={{ borderRadius:normalize(6)}}
                       style={Styles.UnitDetailImagestyle}
                       resizeMode="stretch" >


        <LinearGradient colors={['#ffadad','#fd5858','#FF0000']} style={[Styles.ImageBtn,{
          height:isFocus===false? '20%': '76%',
        }]}>
          <View style={[Styles.With100,{justifyContent:'center'}]}>
            {
              isFocus===false?
                <TouchableOpacity onPress={()=>setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox23,{marginTop:normalize(2),alignItems:'center'}]}>
                  <FontAwesome size={normalize(17)} color={Colors.withe}  name={'angle-double-down'}/>
                </TouchableOpacity>
                :null
            }
            {
              isFocus===true?
                <View style={[Styles.With100,{justifyContent:'center'}]}>
                  <TouchableOpacity onPress={()=>setshowModalDelete(true)
                  } style={[Styles.UnitDetailAddTextBox23,]}>
                    <MaterialCommunityIcons name={"delete"} size={18} color={'#fff'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>ShowImage(value)} style={[Styles.UnitDetailAddTextBox23,{marginTop:normalize(2)}]}>
                    <AntDesign name={"arrowsalt"} size={17} color={'#fff'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox23,{marginTop:normalize(2),justifyContent:'center'}]}>
                    <FontAwesome size={normalize(18)} color={Colors.withe}  name={'angle-double-up'}/>
                  </TouchableOpacity>
                </View>:null}
          </View>
        </LinearGradient>
        <DatePicker  modal
                     open={open}
                     date={date}
                     theme={'light'}
                     onConfirm={(date) => {
                       setOpen(false)
                       setDate(date);
                       setDateFormat(Moment(date)?.format('YYYY-MM-DD H:mm:ss'))
                     }}
                     textColor={GLOBAL.OFFICIAL_background}
                     onCancel={() => {
                       setOpen(false)
                     }} />

      </ImageBackground>
      {
        value.title===null||value.title==='undefined'||value.title===''?null
          :
          <View style={Styles.AddTextStyle}>
            <Text style={[Styles.txtLightcenter]}>{value.title}</Text>
          </View>
      }
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      <View style={Styles.AddTextStyle}>
        <View style={{width:'100%',}}>
          <View style={{width:'100%',}}>
            {
              value.Type==='Gallery'?
                <TouchableOpacity onPress={() => setOpen(true)}
                                  style={Styles.DYBDatteInpute2}>
                  <MaterialCommunityIcons name={"calendar-month"} size={12} color={'#fff'} />
                  <Text style={[Styles.txtLightcenterNoPadding]}>
                    {
                      DateFormat!==''? DateFormat:null
                    }
                  </Text>
                </TouchableOpacity>:
                <View onPress={() => setOpen(true)}
                      style={Styles.DYBDatteInpute2}>
                  <MaterialCommunityIcons name={"calendar-month"} size={12} color={'#fff'} />
                  <Text style={[Styles.txtLightcenterNoPadding]}>
                    {
                      DateFormat!==''? DateFormat:null
                    }
                  </Text>
                </View>
            }
            {  openMore===true?

              <View>
                <View
                  style={Styles.DYBDatteInpute2}>
                  <MaterialCommunityIcons name={"map-outline"} size={14} color={"#fff"} />
                  <Text style={[Styles.txtLightcenterNoPadding]}>
                    California,Mountain View
                  </Text>
                </View>
                <View
                  style={Styles.DYBDatteInpute2}>
                  <MaterialCommunityIcons name={"map-marker"} size={14} color={"#fff"} />
                  <Text style={[Styles.txtLightcenterNoPadding]}>
                    37.4219983,-122.084
                  </Text>
                </View>
              </View>:
              null
            }
            { openMore===false?
              <TouchableOpacity onPress={() => setOpenMore(!openMore)}
                                style={Styles.DYBDatteInpute2}>
                <Text style={[Styles.txtLightLeftNoPadding,{marginRight:'8%'}]}>
                  More
                </Text>
                <FontAwesome size={normalize(18)} color={Colors.withe}  name={'angle-double-right'}/>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setOpenMore(!openMore)}
                                style={[Styles.DYBDatteInpute2,{justifyContent:'center',marginTop:'5%'}]}>
                <FontAwesome size={normalize(18)} color={Colors.withe}  name={'angle-double-up'}/>
              </TouchableOpacity>}
          </View>

        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        //onRequestClose={() => {
        //Alert.alert("Modal has been closed.");
        //setModalVisible(!modalVisible);
        //}}
      >
        <Content contentContainerStyle={Styles.ModalStyleFullImage}>
          <View style={[{ width:'95%',marginTop:'10%'}]} >
            <TouchableOpacity onPress={()=> {
              setvisible(false);
            }} style={[Styles.CancelBtnLeft,{flexDirection:'row'}]}>
              <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
              <Text style={[Styles.txtLightcenter]}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ width:'95%'}]} >
            <ImageBackground source={{ uri: FullImage.uri}}
                             imageStyle={{ borderRadius:normalize(6)}}
                             style={Styles.UnitDetailImagestyleFullScreen}
                             resizeMode="stretch" >
            </ImageBackground>
            <View style={Styles.AddTextStyleFullImage}>
              {value.title ===null || value.title ==="undefined" || value.title ==="" ? null
                :
                <View  style={[Styles.UnitDetailAddTextBoxFullImage]}>
                  <Entypo name={"pencil"} size={20} color={'#fff'} />
                  <Text style={[Styles.txtLightcenter]}>{FullImage.title}</Text>

                </View>
              }
              <View  style={[Styles.UnitDetailAddTextBoxFullImage]}>
                <Entypo name={"back-in-time"} size={20} color={'#fff'} />
                <Text style={[Styles.txtLightcenter]}>{FullImage.Date}</Text>

              </View>


            </View>
          </View>
        </Content>


      </Modal>
    </View>

  );
}


export default DYB_Image_Item;
