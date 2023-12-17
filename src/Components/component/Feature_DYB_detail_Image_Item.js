
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
import AntDesign from "react-native-vector-icons/AntDesign";
import FastImage from 'react-native-fast-image'
import { Colors } from "../Colors";
import LinearGradient from "react-native-linear-gradient";
import { Content } from "native-base";
const GLOBAL = require("../Global");
function Feature_DYB_detail_Image_Item({index,value,DeleteImage,ImagebtnColor,IconColor}) {
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
            setIsFocus(false)
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
                 style={[Styles.UnitDetailImagestyle]}
                 resizeMode="stretch">
        <LinearGradient colors={ImagebtnColor} style={[Styles.ImageBtn,{
          height:isFocus===false? '15%': '60%',
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
                  <TouchableOpacity onPress={()=>setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox23,{marginTop:normalize(6),justifyContent:'center'}]}>
                    <FontAwesome size={normalize(18)} color={Colors.withe}  name={'angle-double-up'}/>
                  </TouchableOpacity>
                </View>:null}
          </View>
        </LinearGradient>
        <DatePicker  modal
                     theme={'light'}
                     open={open}
                     date={date}
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
                                          style={[Styles.DYBDatteInpute2, { paddingTop: normalize(6) }]}>
                          <Entypo name={"back-in-time"} size={14} color={IconColor} />
                          <Text style={[Styles.txtImageBox]}>
                            {
                              DateFormat!==''? DateFormat:null
                            }
                          </Text>
                        </TouchableOpacity>:
                          <View onPress={() => setOpen(true)}
                                style={[Styles.DYBDatteInpute2, { paddingTop: normalize(6) }]}>
                            <Entypo name={"back-in-time"} size={14} color={IconColor} />
                            <Text style={[Styles.txtImageBox]}>
                              {
                                DateFormat!==''? DateFormat:null
                              }
                            </Text>
                          </View>
                    }
                      <View>
                        <View
                          style={Styles.DYBDatteInpute2}>
                          <MaterialCommunityIcons name={"map-marker"} size={14} color={IconColor} />
                          <Text style={[Styles.txtImageBox]}>
                            {value.geoLat},{value.geoLong}
                          </Text>
                        </View>
                      </View>
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
        <Content contentContainerStyle={Styles.ModalStyleFullImageDetails}>
          <View style={[{ width:'95%',marginVertical:'4%'}]} >
              <TouchableOpacity onPress={()=> {
                setvisible(false);
              }} style={[Styles.CancelBtnLeft,{flexDirection:'row'}]}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
                <Text style={[Styles.txtLightcenter]}>Close</Text>
              </TouchableOpacity>
            </View>
          <View style={[{ width:'96%',marginBottom:'5%'}]} >
            <FastImage source={{ uri: FullImage.uri}}
                       style={Styles.UnitDetailImagestyleFullScreen}
                       resizeMode="stretch" >
            </FastImage>
              <View style={Styles.TextStyleFullImage}>
                {value.title ===null || value.title ==="undefined" || value.title ==="" ? null
                  :
                  <View  style={[Styles.DYBDatteInpute2]}>
                    <Entypo name={"pencil"} size={14} color={IconColor}/>
                    <Text style={[Styles.txtImageBox]}>{FullImage.title}</Text>
                  </View>
                }
                <View  style={[Styles.DYBDatteInpute2]}>
                  <Entypo name={"back-in-time"} size={14} color={IconColor} />
                  <Text style={[Styles.txtImageBox]}>{FullImage.Date}</Text>
                </View>
                  <View
                    style={Styles.DYBDatteInpute2}>
                    <MaterialCommunityIcons name={"map-marker"} size={14} color={IconColor} />
                    <Text style={[Styles.txtImageBox]}>
                      {FullImage.geoLat},{FullImage.geoLong}
                    </Text>
                  </View>

              </View>
            </View>
        </Content>


      </Modal>
    </View>

  );
}


export default Feature_DYB_detail_Image_Item;
