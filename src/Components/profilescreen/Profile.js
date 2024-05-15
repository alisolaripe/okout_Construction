import {

  StatusBar,
  Text,
  View,TouchableOpacity,Modal
} from "react-native";
import FastImage from 'react-native-fast-image'
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Body,Button,Container,Content,Header,Left,Right } from "native-base";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Styles } from "../Styles";
import { Colors } from "../Colors";
const GLOBAL = require("../Global");
const Photoes=require('../Photoes');
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInputI } from "../component/TextInputI";
import { Footer1 } from "../component/Footer";
import { LogOutModal } from "../component/LogOutModal";
import { Modalize } from "react-native-modalize";
import ImagePicker from "react-native-image-crop-picker";
import { Image } from "react-native-compressor";
import { writePostApi } from "../writePostApi";
import { isNetworkConnected } from "../GlobalConnected";
const Api = require("../Api");
const serialize = require("../GlobalSerialize");
function Profile( { navigation, navigation: { goBack }}) {
  const modalizeRef = React.createRef();
  const [Cheked,setCheked] = useState(false);
  const [Version,setVersionCheck] = useState('');
  const [PictureUrl,setPictureUrl] = useState(null);
  const [ShowDate, setShowDate] = useState('');
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  useEffect( () => {
    setVersionCheck('1.0.28');
    const date=new Date();
    const Day=date.getDate();
    const Month=date.getMonth()+1;
    const Year=date.getFullYear();
    const Hour=date.getHours();
    const Minute=date.getMinutes();
    const Second=date.getSeconds();
    const Full=`${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`
    setShowDate(Full);
    const unsubscribe = navigation.addListener("focus", () => {
      setPictureUrl(GLOBAL.UserInformation?.profileImg);
    });
    //418.08
      return unsubscribe;

  },[]);
  ///LogOut Function///
  const LogOut =async () => {
    try {
      await AsyncStorage.removeItem(GLOBAL.OrgAppLink);
      await AsyncStorage.removeItem(GLOBAL.PASSWORD_KEY);
      await AsyncStorage.removeItem(GLOBAL.VersionCheck);
      await AsyncStorage.removeItem(GLOBAL.UserInfo);
      await AsyncStorage.removeItem(GLOBAL.UserPermissions);
      await AsyncStorage.removeItem(GLOBAL.OrgAppKey);
      await AsyncStorage.removeItem(GLOBAL.Category_Last_Info);
      GLOBAL.UserInformation='';
      setshowModalDelete(false)
      navigation.navigate('LogIn');
    }
    catch (e){
    }
  };
  /// Bottom menu click On LogOut button///
  const logout_Url= () => {
    setshowModalDelete(true)
  };
  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };
  const writeDataStorage=async (key,obj)=>{
    try {
      await AsyncStorage.setItem(key,JSON.stringify(obj));
    }
    catch (e) {
    }
  }
const UpdateProfileInfo=(value)=>{
  const formData = new FormData();
  formData.append("userId",GLOBAL.UserInformation?.userId);
  formData.append("username",value.UserName);
  formData.append("password",value.password);
  if (ImageSourceviewarray?.length!== 0) {
    for (let i = 0; i < ImageSourceviewarray?.length; i++) {
      let idsArray = ImageSourceviewarray[i];
      formData.append("attachment", {
        uri: idsArray.uri,
        type: idsArray.type,
        name: idsArray.fileName,
      });
    }
    writePostApi("POST",Api.UpdateProfile, formData, ImageSourceviewarray).then(json => {

      if (json) {
        if (json?.status === true) {
          Update_async(value)
          setShowMessage(true)
          setMessage(json?.msg)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      }
      else {
        Update_async(value)
        setShowMessage(true)
        setMessage('User successfully updated')
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4000);
        return () => clearInterval(timerId);
      }
    });
  }
  else {
    writePostApi("POST",Api.UpdateProfile, formData).then(json => {

      if (json) {
        if (json?.status === true) {
          Update_async(value)
          setShowMessage(true)
          setMessage(json?.msg)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      }
      else {
        Update_async(value)
        setShowMessage(true)
        setMessage('User successfully updated')
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4000);
        return () => clearInterval(timerId);
      }
    });
  }
}
///Update User info in asynStorage///
 const Update_async=(value)=>{
  let Json= GLOBAL.UserInformation
   Json.Username=value.UserName
   Json.Password=value.password
   Json.profileImg=PictureUrl
   GLOBAL.UserInformation=Json
   GLOBAL.PictureUrl=PictureUrl
   writeDataStorage(GLOBAL.UserInfo,Json);
   writeDataStorage(GLOBAL.PASSWORD_KEY,value.password);
 }
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  ///Reduce the size of the photo///
  const Image_compress = async (path) => {
    return await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    });
  };
  const selectPhotoFromGallery = () => {
    onClose();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: false,
      mediaType: "photo",
      includeExif: true,
    }).then(response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        let photos=[]
          let obj = response
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          Image_compress(obj.path).then(res => {
            photos.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
            })
            setPictureUrl(res)
            setImageSourceviewarray(photos)
          });
        }
    });
  };
  const selectPhoto = () => {
    onClose();
    let photos=[]
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(response => {

      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      Image.compress(response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {
        photos.push({
          uri: res,
            type: response.mime,
            fileName: imgName,
        })
        setPictureUrl(res);
        setImageSourceviewarray(photos)
      });
    });
  };
  const renderContent = () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={() => onClose()} style={Styles.CancelBtn}>
        <View style={{ width: "80%" }}>
          <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhoto();
      }} style={Styles.UploadBtn}>
        <AntDesign name={"camera"} size={17} color={"#fff"} />
        <Text style={[Styles.TextUploadBtn]}>
          Use Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhotoFromGallery();
      }} style={Styles.UploadBtn}>
        <AntDesign name={"picture"} size={17} color={"#fff"} />
        <Text style={[Styles.TextUploadBtn]}>
          Choose From Gallery
        </Text>

      </TouchableOpacity>
    </View>
  );
  return (
    <Container style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header  style={[Styles.HeaderStyle2,{backgroundColor:GLOBAL.header_backgroundColor}]}>
        <Left style={{
          flex: 0.5,
        }}>
          <Button onPress={() => {
            goBack();
          }} transparent style={[Styles.Backbtn,{justifyContent:'flex-start'}]}>
            <AntDesign name={"arrowleft"} size={21} color={GLOBAL.headertext_backgroundColor} />
          </Button>
        </Left>
        <Body style={{
          flex: 1,alignItems:"center"
        }}>
          <Text numberOfLines={1} style={[Styles.HeaderText2,{color: GLOBAL.headertext_backgroundColor}]}>Profile</Text>
        </Body>
        <Right style={{
          flex: 0.5,
        }}>
        </Right>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor={GLOBAL.header_backgroundColor} />
      {ShowMessage === true ?
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <View style={Styles.flashMessageSuccsess}>
            <View style={{ width: "10%" }} />
            <View style={{ width: "80%" }}>
              <Text style={Styles.AlertTxt}>
                {Message}
              </Text>
            </View>
            <View style={{ width: "10%" }} />
          </View>
        </View>
        : null}
        <Content style={{zIndex:1000}}>
          <View style={[Styles.container,{zIndex:1000}]}>
            {showModalDelete &&
            <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut}/>
            }
              <View style={Styles.mainSystemDesignerProfile}>
                {
                  PictureUrl === null || GLOBAL.PictureUrl ===''?
                    <EvilIcons name={"user"} size={170} color={GLOBAL.headertext_backgroundColor} /> :
                    <FastImage   style={[Styles.imageProfile,{borderColor: GLOBAL.headertext_backgroundColor}]} source={{uri:PictureUrl}}/>
                }
                <TouchableOpacity
                  style={Styles.btnSelectImage}
                  onPress={()=>onOpen()}>
                  <FontAwesome onPress={()=>onOpen()} name={"exchange"} size={15} color={GLOBAL.headertext_backgroundColor} />
                  <Text style={[Styles.txtMenu,{marginLeft:10,color: GLOBAL.headertext_backgroundColor}]}>
                  Change Photo
                  </Text>
                </TouchableOpacity>

                <TextInputI onChangeText={(value)=>UpdateProfileInfo(value)} numberValue={5}
                ChangeChecked={(value)=>ChangeChecked(value)} Version={Version} tittlebtn={'Update'}/>
              </View>
          </View>
        </Content>
      <Modalize ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>

  );
}

export default Profile;
