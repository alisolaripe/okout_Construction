import { Container, Content } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { Footer1 } from "../component/Footer";
import { FlatList, Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
const GLOBAL = require("../Global");
const Api = require("../Api");
function Taskstructure({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  useEffect(() => {

  }, []);
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
  };
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
          transparent={true}
        >
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
                 source={require("../../Picture/png/AlertImage.png")}
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
              removeDataStorage(GLOBAL.PASSWORD_KEY);
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

  return (
    <Container style={[Styles.HeaderBackColor]}>
      <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task List'}/>
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      <ImageBackground tintColor={'rgba(77,120,165,0.16)'} source={require("../../Picture/png/Task_back.png")}
                       style={{ width: "100%",flex:1, alignSelf: "stretch"}} resizeMode="stretch">

      <View style={Styles.container_task2}>
        <View style={Styles.FlexWrapHome}>
          <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]}  style={Styles.ModuleBox2}>
            <TouchableOpacity onPress={()=>{
            GLOBAL.selectItem=1;
            GLOBAL.TaskMenuName='My Task'
              navigation.navigate("Task_Management")
            }
            }  style={{
              width: "100%", alignItems: "center",justifyContent:'center',alignSelf:'center'
            }}>
              <Image tintColor={'#fff'} resizeMode={"contain"} source={require("../../Picture/png/MyTasks.png")}
                     style={{ width: "100%", height: normalize(90),alignItems:"center",justifyContent:'center',marginTop:normalize(7) }}
              />
              <Text style={Styles.txtMenuHome2}>My Task</Text>


            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.ModuleBox2}>
            <TouchableOpacity onPress={()=>{
              GLOBAL.selectItem=2;
              GLOBAL.TaskMenuName='The Workshop'
              navigation.navigate("Task_Management")
            }
            }  style={{
              width: "100%", alignItems: "center",justifyContent:'center'
            }}>
              <Image tintColor={'#fff'} resizeMode={"contain"} source={require("../../Picture/png/workshop.png")}
                     style={{ width: "35%", height: normalize(90),alignItems:"center",justifyContent:'center',marginTop:normalize(7) }}
              />
                <Text style={Styles.txtMenuHome2}>The Workshop</Text>


            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Image  resizeMode={"contain"} source={require("../../Picture/png/Task_back.png")}
                style={{ width: "100%", alignItems:"center" }}
        />
      </View>
      </ImageBackground>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>
  )
}
export default Taskstructure;
