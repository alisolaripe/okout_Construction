import { Image, Modal, Text, TouchableOpacity, View,ImageBackground } from "react-native";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useState,useEffect } from "react";
const GLOBAL = require("../Global");
import { Content } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../Colors";

function Task_Edit_Image({ item,colors,onOpen,index,setattachmentId,settaskId,setshowModalDelete}) {
  const [isFocus,setIsFocus] = useState(false);
  const [FullImage,setFullImage] = useState('');
  const [visible,setvisible] = useState(false);

  const ShowImage=(attachmentUrl)=>{
    setvisible(!visible)
    setFullImage(attachmentUrl)

  }
  return (
    <>
      {
        item?.attachmentUrl===''?
          <View index={index} style={Styles.cardContainer}>
            <View style={Styles.card}>
              <TouchableOpacity onPress={() => onOpen()} style={Styles.TaskUploadImagebox}>
                <Text style={Styles.UploadImageText2}>
                  Add Photos
                </Text>
                <MaterialIcons name={"add-a-photo"} size={20} color={"#fff"}  />
              </TouchableOpacity>
            </View>
          </View>
          :
          <View index={index} style={Styles.cardContainer}>
            <View style={Styles.card}>
              <ImageBackground source={{uri:item.attachmentUrl }}
                               style={Styles.FatureDetailImagestyleFullScreen}
                               resizeMode="stretch">
                <LinearGradient colors={colors} style={[Styles.ImageBtnFeature, {
                  height: isFocus === false ? "10%" : "34%",
                }]}>
                  {
                    isFocus === false &&
                      <TouchableOpacity onPress={() => setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox23, {
                        marginTop:normalize(2),
                        alignItems:"center"}]}>
                        <FontAwesome size={normalize(17)} color={Colors.withe} name={"angle-double-down"} />
                      </TouchableOpacity>
                  }
                  {
                    isFocus === true &&
                    <View style={[Styles.With100, { justifyContent: "center" }]}>
                      <View style={[Styles.With100, { justifyContent: "center" }]}>
                        <TouchableOpacity onPress={() => ShowImage(item.attachmentUrl)}
                                          style={[Styles.UnitDetailAddTextBox23, { marginTop: normalize(2) }]}>
                          <AntDesign name={"arrowsalt"} size={16} color={"#fff"} />
                        </TouchableOpacity>
                      </View>
                      <View style={[Styles.With100, { justifyContent: "center" }]}>
                        <TouchableOpacity onPress={() => {
                          setattachmentId(item.attachmentId)
                          settaskId(item?.taskId)
                         setshowModalDelete(true)
                        }}
                                          style={[Styles.UnitDetailAddTextBox23, { marginTop: normalize(2) }]}>
                          <MaterialCommunityIcons name={"delete"} size={16} color={"#fff"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsFocus(!isFocus)} style={[Styles.UnitDetailAddTextBox24, {
                          marginTop: normalize(2),
                          justifyContent: 'center'
                        }]}>
                          <FontAwesome size={normalize(16)} color={Colors.withe} name={'angle-double-up'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                </LinearGradient>
              </ImageBackground>
            </View>
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
                  <Image source={{ uri:FullImage }}
                         imageStyle={{ borderRadius: normalize(6) }}
                         style={Styles.UnitDetailImagestyleFullScreen}
                         resizeMode="stretch"/>
                </View>
              </Content>
            </Modal>
          </View>
      }
    </>

  );

}

export default Task_Edit_Image;
