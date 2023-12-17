import { Button, Container, Content } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import React, { useState ,useEffect} from "react";
import { Footer1 } from "../component/Footer";
import { Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../Colors";
const GLOBAL = require("../Global");
function TaskDetail({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  useEffect(() => {
    console.log(GLOBAL.Task_detail,'GLOBAL.Task_detail')
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
  <Container style={[Styles.Backcolor]}>
    <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Details'}/>
    <Content>
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      <View style={Styles.container}>
        <View style={Styles.InputeRowItemstask}>
          <View style={[Styles.inputStyletask]}>
            <View style={Styles.RowTask}>
              <View style={[Styles.DoneTaskDetaisl,{backgroundColor:GLOBAL.Task_detail?.taskStatusColor}]}/>
              <Text numberOfLines={3} style={[Styles.txtLightColor]}>{GLOBAL.Task_detail?.taskTitle}</Text>
            </View>

            <View style={Styles.RowTask}>
             <View style={Styles.RowTask_Items}>
               <AntDesign name="calendar" size={normalize(14)} color={Colors.withe} />
               <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{GLOBAL.Task_detail?.taskPlanStartDate}</Text>
             </View>
              <View style={Styles.RowTask_Items}>
                <AntDesign name="calendar" size={normalize(14)} color={Colors.withe} />
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{GLOBAL.Task_detail?.taskPlanDueDate}</Text>
             </View>
            </View>
            <Text numberOfLines={10} style={[Styles.txtLightColortask]}>{GLOBAL.Task_detail?.taskCategoryName
            }</Text>
          </View>
        </View>
      </View>
    </Content>
    <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
  </Container>
  )
    }

export default TaskDetail;
