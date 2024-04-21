import { Image, Modal, Text, TouchableOpacity, View,ImageBackground } from "react-native";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors } from "../Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useState } from "react";
import { Content } from "native-base";
const Photoes=require('../Photoes')
import Entypo from "react-native-vector-icons/Entypo";
function DYB_List_Details_Image_Item({ item,DeleteImageFromApi,colors,IconColor,index}) {
  const [isFocus,setIsFocus] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [FullImage,setFullImage] = useState('');
  const [visible,setvisible] = useState(false);
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
  const renderModalContent = () =>(
    <View  style={Styles.DeleteModalStyle}>

      <View style={Styles.With100NoFlex}>
        <Image style={{width:'27%',aspectRatio:1,marginVertical:normalize(10)}}
               source={Photoes.Alert}
               resizeMode="contain" />
        <View style={Styles.With100NoFlex}>
          <Text style={Styles.txt_left2}>
            Do you want to delete Image ?
          </Text>
        </View>
      </View>
      <View style={Styles.With100Row}>
        <LinearGradient  colors={['#9ab3fd','#82a2ff','#4B75FCFF']} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => setshowModalDelete( false)} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient  colors={['#ffadad','#f67070','#FF0000']} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => {
            DeleteImageFromApi(item.buildId);
            setshowModalDelete( false)
          }}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  const ShowImage=(value)=>{
    setvisible(!visible)
    setFullImage(value)
    setIsFocus(false)
  }
  return (
    <View index={index} style={Styles.cardContainer}>
        <View style={Styles.card}>
          <ImageBackground source={{uri:item.imageUrl }}
                     style={Styles.FatureDetailImagestyleFullScreen}
                     resizeMode="stretch">
            <LinearGradient colors={colors} style={[Styles.ImageBtnFeature, {
              height: isFocus === false ? "10%" : "34%",
            }]}>
              <View style={[Styles.With100, { justifyContent: "center" }]}>
                {
                  isFocus === false ?
                    <TouchableOpacity onPress={() => setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox23, {
                      marginTop:normalize(2),
                      alignItems:"center"}]}>
                      <FontAwesome size={normalize(17)} color={Colors.withe} name={"angle-double-down"} />
                    </TouchableOpacity>
                    : null
                }
                {
                  isFocus === true ?
                    <View style={[Styles.With100, { justifyContent: "center" }]}>
                      <TouchableOpacity onPress={() => {
                        setshowModalDelete(true);
                        setIsFocus(false);
                      }
                      } style={[Styles.UnitDetailAddTextBox23]}>
                        <MaterialCommunityIcons name={"delete"} size={18} color={"#fff"} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => ShowImage(item)}
                                        style={[Styles.UnitDetailAddTextBox23, { marginTop: normalize(2) }]}>
                        <AntDesign name={"arrowsalt"} size={16} color={"#fff"} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox24, {
                        marginTop: normalize(10),
                        justifyContent: "center",
                      }]}>
                        <FontAwesome size={normalize(18)} color={Colors.withe} name={"angle-double-up"} />
                      </TouchableOpacity>
                    </View>:null}
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={Styles.With100NoFlex}>
            <View style={Styles.AddTextStyleFullImageFeature}>
              <View style={{ alignItems: "center" }}>
                <View style={[Styles.DYBDatteInpute2]}>
                  <Entypo name={"back-in-time"} size={18} color={IconColor} />
                  <Text style={[Styles.txtFeatureNumber]}>{item?.postDate}</Text>
                </View>
                {
                  item?.Country === null || item?.Country === ''|| item?.Country === undefined||typeof item?.Country==='number' ? null:
                <View style={[Styles.DYBDatteInpute2]}>
                  <MaterialCommunityIcons name={"map-outline"} size={18} color={IconColor} />

                      <Text style={[Styles.txtFeature]}>
                        {item?.Country}
                      </Text>

                </View>
                }
                <View style={[Styles.DYBDatteInpute2, { marginBottom: "2%" }]}>
                  <MaterialCommunityIcons name={"map-marker"} size={18} color={IconColor} />
                  <Text style={[Styles.txtFeatureNumber]}>
                    {item?.geoLat} , {item?.geoLong}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      {showModalDelete &&
      <View>
        {
          _showModalDelete()
        }
      </View>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <Content contentContainerStyle={Styles.ModalStyleFullImageDetails}>
          <View style={[{ width: "95%", marginVertical: "4%" }]}>
            <TouchableOpacity onPress={() => {
              setvisible(false);
            }} style={[Styles.CancelBtnLeft, { flexDirection: "row" }]}>
              <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
              <Text style={[Styles.txtLightcenter]}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ width: "96%", marginBottom: "5%" }]}>
            <Image source={{ uri: FullImage.imageUrl }}
                       imageStyle={{ borderRadius: normalize(6) }}
                       style={Styles.UnitDetailImagestyleFullScreen}
                       resizeMode="stretch"/>


            <View style={Styles.TextStyleFullImage}>
              {FullImage.title === null || FullImage.title === "undefined" || FullImage.title === "" ? null
                :
                <View style={Styles.DYBDatteInpute2}>
                  <Entypo name={"pencil"} size={18} color={IconColor} />
                  <Text style={Styles.txtFeature}>{FullImage.title}</Text>
                </View>
              }
              <View style={Styles.DYBDatteInpute2}>
                <Entypo name={"back-in-time"} size={18} color={IconColor} />
                <Text style={[Styles.txtFeatureNumber]}>{FullImage?.postDate}</Text>
              </View>
              <View>
                {
                  item?.geoAddress === null || item?.geoAddress === '' ?
                    null :
                    <View
                      style={Styles.DYBDatteInpute2}>
                      <MaterialCommunityIcons name={"map-outline"} size={18} color={IconColor} />

                      <Text numberOfLines={2} style={[Styles.txtFeature]}>
                        {item?.geoAddress}
                      </Text>

                    </View>
                }
                <View
                  style={Styles.DYBDatteInpute2}>
                  <MaterialCommunityIcons name={"map-marker"} size={18} color={IconColor} />
                  <Text style={[Styles.txtFeatureNumber]}>
                    {FullImage.geoLat} , {FullImage.geoLong}
                  </Text>
                </View>

              </View>
            </View>
          </View>
        </Content>
      </Modal>
    </View>
  );

}

export default DYB_List_Details_Image_Item;
