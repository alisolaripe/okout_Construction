import {
  Image,
  StatusBar,
  Text,
  View,TouchableOpacity,Modal
} from "react-native";
import React, { useEffect, useState } from "react";
import normalize from "react-native-normalize/src/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Body,Button,Container,Content,Header,Left,Right } from "native-base";
import { Styles } from "../Styles";
import { Colors } from "../Colors";
const GLOBAL = require("../Global");
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "../component/TextInputI";
import { Footer1 } from "../component/Footer";
import { UserPermission } from "../CheckPermission";
function Profile( { navigation, navigation: { goBack }}) {
  const [Cheked,setCheked] = useState(false);
  const [Version,setVersionCheck] = useState('');
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showbtn, setshowbtn] = useState(true);
  useEffect( () => {
    setVersionCheck('1.0.14')
    UserPermission(GLOBAL.UserPermissionsList?.Profile).then(res => {
      if (res.edit === "1") {
        setshowbtn(true)
      } else {
        setshowbtn(false);
      }
    });
  }, []);

  const deleteAsync = async () => {
    try {
      await AsyncStorage.removeItem(GLOBAL.OrgAppLink);
      await AsyncStorage.removeItem(GLOBAL.PASSWORD_KEY);
      await AsyncStorage.removeItem(GLOBAL.VersionCheck);
      await AsyncStorage.removeItem(GLOBAL.UserInfo);
      GLOBAL.UserInformation='';
      setshowModalDelete(false)
      navigation.navigate('LogIn');
    }
    catch (e){
    }
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
            deleteAsync()
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
    </View>
  );
  const logout_Url= () => {
    setshowModalDelete(true)

  };

  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };

const UpdateProfileInfo=()=>{

}
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
  };
  return (
    <Container style={[Styles.Backcolor]}>
      <Header  style={Styles.HeaderStyle}>
        <Left style={{
          flex: 0.5,
        }}>
          <Button onPress={() => {
            goBack();
          }} transparent style={[Styles.Backbtn,{justifyContent:'flex-start'}]}>
            <AntDesign name={"arrowleft"} size={21} color={'#fff'} />
          </Button>
        </Left>
        <Body style={{
          flex: 1,alignItems:"center"
        }}>
          <Text numberOfLines={1} style={Styles.HeaderText2}>Profile</Text>
        </Body>
        <Right style={{
          flex: 0.5,
        }}>

        </Right>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        <Content style={{zIndex:1000}}>
          <View style={[Styles.container,{zIndex:1000}]}>
            {
              showModalDelete &&
              <View>
                {
                  _showModalDelete()
                }
              </View>
            }
            {
              showbtn===true&&
              <View style={Styles.mainSystemDesigner}>
                <TextInputI onChangeText={(value)=>UpdateProfileInfo(value)}     numberValue={5}
                            ChangeChecked={(value)=>ChangeChecked(value)}
                            Version={Version}
                            tittlebtn={'Update'}/>
              </View>
            }
          </View>
        </Content>
      <View style={[Styles.bottomView]}>
        <Image tintColor={GLOBAL.OFFICIAL_backgroundItem} source={require("../../Picture/png/ProfileBg.png")}
               style={{width: "100%",
               }} resizeMode="contain"/>
      </View>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>

  );
}

export default Profile;
