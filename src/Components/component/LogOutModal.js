import { Image, Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "../Styles";
const Photoes = require("../Photoes");
import React from "react";
import normalize from "react-native-normalize/src/index";
function LogOutModal ({setshowModalDelete,showModalDelete,LogOut}){
  const renderModalContent= () => (
    <View style={Styles.DeleteModalTotalStyle}>
      <View style={Styles.DeleteModalStyle2}>
        <View style={Styles.With100NoFlex}>
          <Image style={{ width: "27%", aspectRatio: 1, marginVertical: normalize(10) }}
                 source={Photoes.Alert}
                 resizeMode="contain" />
          <View style={Styles.With100NoFlex}>
            <Text style={Styles.txt_left2}>
              Do you want to Log Out from App?
            </Text>
          </View>
        </View>
        <View style={Styles.With100Row}>
          <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => setshowModalDelete(false)}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              LogOut()
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
  return (
    <Modal
      isVisible={showModalDelete}
      avoKeyboard={true}
      onBackdropPress={() => setshowModalDelete(false)}
      transparent={true}
    >
      {renderModalContent()}
    </Modal>

  )
}
export { LogOutModal };
