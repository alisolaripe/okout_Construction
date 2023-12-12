
import React, { useEffect, useState} from "react";
import {
  Text,
  View,
  TouchableOpacity,Modal,Image,ActivityIndicator
} from "react-native";
import Moment from 'moment';
import DatePicker from 'react-native-date-picker'
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../Colors";
import LinearGradient from "react-native-linear-gradient";
import { Content } from "native-base";
const GLOBAL = require("../Global");
import FastImage from 'react-native-fast-image'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
function Category_List_Detail_Images_Item({index,value,DeleteImage,Type,Change_Gallry_Date,onOpen}) {
  const [FullImage,setFullImage] = useState(false);
  const [visible,setvisible] = useState(false);
  const [isFocus,setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [DateFormat,setDateFormat]=useState('');
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const ShowImage=(value)=>{
    setvisible(!visible)
    setIsFocus(false)
    setFullImage(value)
  }
  useEffect(()=>{
    setDateFormat(value.Date)
    return () => {
      // remove from here
    };
  }, [value]);
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
            DeleteImage(value.buildId,value.fileName)
            setshowModalDelete( false)
            setIsFocus(false)
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  const onLoadStart=()=> {
    setLoading(true);
  }
  const onLoadEnd=()=> {
    setLoading(false);
  }
  return (
    <>
      {value.uri!==''?
        <View index={index} style={Styles.UnitDetailImageBoxFeatureStyle2}>
          <FastImage
            onLoadEnd={onLoadEnd}
            onLoadStart={onLoadStart}
            source={{uri:value.uri, priority: FastImage.priority.high,}}
                     style={[Styles.UnitDetailImagestyle]}
                     resizeMode="stretch">
            {Type === 'DYB' ?
              <LinearGradient colors={["#ffc2b5", "#fca795", "#d1583b"]} style={[Styles.ImageBtn, {
                height: "15%",
              }]}>
                <TouchableOpacity onPress={() => ShowImage(value)}
                                  style={[Styles.With100, { justifyContent: "center" }]}>
                  <View style={[Styles.UnitDetailAddTextBox23, {
                    marginTop: normalize(2),
                    alignItems: "center",
                  }]}>
                    <AntDesign size={normalize(17)} color={Colors.withe} name={"arrowsalt"} />
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              :
              <LinearGradient colors={['#ffadad', '#fd5858', '#FF0000']} style={[Styles.ImageBtn, {
                height: isFocus === false ? '15%' : '60%',
              }]}>
                <View style={[Styles.With100, { justifyContent: 'center' }]}>
                  {
                    isFocus === false ?
                      <TouchableOpacity onPress={() => setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox23, {
                        marginTop: normalize(2),
                        alignItems: 'center'
                      }]}>
                        <FontAwesome size={normalize(17)} color={Colors.withe} name={'angle-double-down'} />
                      </TouchableOpacity>
                      : null
                  }
                  {
                    isFocus === true ?
                      <View style={[Styles.With100, { justifyContent: 'center' }]}>
                        <TouchableOpacity onPress={() => setshowModalDelete(true)
                        } style={[Styles.UnitDetailAddTextBox23,]}>
                          <MaterialCommunityIcons name={"delete"} size={18} color={'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ShowImage(value)}
                                          style={[Styles.UnitDetailAddTextBox23, { marginTop: normalize(2) }]}>
                          <AntDesign name={"arrowsalt"} size={16} color={'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox24, {
                          marginTop: normalize(10),
                          justifyContent: 'center'
                        }]}>
                          <FontAwesome size={normalize(18)} color={Colors.withe} name={'angle-double-up'} />
                        </TouchableOpacity>
                      </View> : null}
                </View>
              </LinearGradient>
            }
            <DatePicker  modal
                         open={open}
                         date={date}
                         theme={'light'}
                         onConfirm={(date) => {
                           setOpen(false)
                           setDate(date);
                           setDateFormat(Moment(date)?.format('YYYY-MM-DD H:mm:ss'))
                           Change_Gallry_Date(Moment(date)?.format('YYYY-MM-DD H:mm:ss'),value.buildId)
                         }}
                         textColor={GLOBAL.OFFICIAL_background}
                         onCancel={() => {
                           setOpen(false)
                         }} />
          </FastImage>
          {isLoading && (
            <ActivityIndicator style={Styles.loaderStyle} size={'large'} />
          )}
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          <View style={Styles.AddTextStyleFullImage}>
            {
              value.Type==='Gallery'?
                <TouchableOpacity onPress={() => setOpen(true)}
                                  style={[Styles.DYBDatteInpute2, { paddingTop: normalize(6) }]}>
                  <Entypo name={"back-in-time"} size={14} color={"#F67070FF"} />
                  <Text style={[Styles.txtImageBox]}>
                    {
                      DateFormat!==''? DateFormat:null
                    }
                  </Text>
                </TouchableOpacity>:
                <View onPress={() => setOpen(true)}
                      style={[Styles.DYBDatteInpute2, { paddingTop: normalize(6) }]}>
                  <Entypo name={"back-in-time"} size={14} color={"#F67070FF"} />
                  <Text style={[Styles.txtImageBox]}>
                    {
                      DateFormat!==''? DateFormat:null
                    }
                  </Text>
                </View>
            }

            <View>
              {value?.Country===''||value?.Country===null||value?.Country?.length===0||value?.Country===undefined|value?.Country===undefined?
                null:
                <View
                  style={Styles.DYBDatteInpute2}>
                  <MaterialCommunityIcons name={"map-outline"} size={14} color={"#F67070FF"} />
                  <Text style={[Styles.txtImageBox]}>
                    {value.Country}
                  </Text>
                </View>
              }

              <View
                style={Styles.DYBDatteInpute2}>
                <MaterialCommunityIcons name={"map-marker"} size={14} color={"#F67070FF"} />
                <Text style={[Styles.txtImageBox]}>
                  {value.geoLat},{value.geoLong}
                </Text>
              </View>
            </View>

          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
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
                  <View style={Styles.DYBDatteInpute2}>
                    <Entypo name={"back-in-time"} size={14} color={'#F67070FF'} />
                    <Text style={[Styles.txtImageBox]}>{FullImage.Date}</Text>
                  </View>
                  <View>

                    <View>
                      <View
                        style={Styles.DYBDatteInpute2}>
                        <MaterialCommunityIcons name={"map-outline"} size={14} color={"#F67070FF"} />
                        {value?.geoAddress===null||value?.geoAddress===undefined||value?.geoAddress?.length===0?null:
                          <Text numberOfLines={2} style={[Styles.txtImageBox]}>
                            {value?.geoAddress}
                          </Text>
                        }
                      </View>
                      <View
                        style={Styles.DYBDatteInpute2}>
                        <MaterialCommunityIcons name={"map-marker"} size={14} color={"#F67070FF"} />
                        <Text style={[Styles.txtImageBox]}>
                          {value.geoLat},{value.geoLong}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Content>


          </Modal>
        </View>
        :
        <TouchableOpacity onPress={() => onOpen()} style={Styles.unitDetailUploadImagebox}>
        <Text style={Styles.UploadImageText}>
        Add photos
        </Text>
        <MaterialIcons name={"add-a-photo"} size={20} color={"#fff"} />
        </TouchableOpacity>
      }
        </>
  );
}
export default Category_List_Detail_Images_Item;
