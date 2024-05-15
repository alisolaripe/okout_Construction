import { Container } from "native-base";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { FlatList, PermissionsAndroid, Text, View,Platform } from "react-native";
import { Styles } from "../Styles";
import { LogOutModal } from "../component/LogOutModal";
import { Footer1 } from "../component/Footer";
import { removeDataStorage } from "../Get_Location";
import Doc_List_Item from "../component/Doc_List_Item";
import Entypo from "react-native-vector-icons/Entypo";
import normalize from "react-native-normalize/src/index";
import FileViewer from "react-native-file-viewer";

import { Colors } from "../Colors";
const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
import RNFetchBlob from 'rn-fetch-blob';
function DocSubCategoryScreen({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modules, setmodules] = useState([{id:0,name:'Level 00 GA 1 of 2'}]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Message, setMessage] = useState("");

  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  useEffect(() => {

  }, []);
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  const renderItem = ({ item, index }) => (
    <Doc_List_Item key={index}  value={item} SeeDetail={SeeDetail} Screen={'Sub'} download={download}
                   Navigate_Url={Navigate_Url} Message={Message} data={GLOBAL.Docsubcategorydata} />
  );
  const renderSectionHeader = () => (
    <>
      {ShowMessageDelete === true ?
        <View style={Styles.flashMessageSuccsess}>
          <View style={{ width: "10%" }} />
          <View style={{ width: "80%" }}>
            <Text style={Styles.AlertTxt}>
              {Message}
            </Text>
          </View>
          <View style={{ width: "10%" }} />
        </View>
        :
        null
      }
      {ShowMessage === true ?
        <View style={Styles.flashMessageSuccsess}>
          <View style={{ width: "10%" }} />
          <View style={{ width: "80%" }}>
            <Text style={Styles.AlertTxt}>
              {Message}
            </Text>
          </View>
          <View style={{ width: "10%" }} />
        </View>
        :
        null
      }
      {/*<View style={Styles.link}>*/}
      {/*<Entypo size={normalize(22)} color={Colors.button} name={'attachment'}/>*/}
      {/*</View>*/}
    </>
  );
  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const SeeDetail = (Id) => {
    GLOBAL.UnitId = Id;
    navigation.navigate("Project_Section2");
  };
  const download=async()=> {
      const downloadUrl = 'https://jtg.okout.net/uploads/profile/1715002611761.jpg';
    const FilePath = "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf";
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage",
          message: "This app would like to store some files on your phone",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === 'granted') {
        const android = RNFetchBlob.android;
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
          .config({
            addAndroidDownloads: {
              useDownloadManager: true,
              title: "certificate.pdf",
              description: "File will be Downloaded",
              notification: true,
              path: dirs.DownloadDir+ "/certificate.pdf",
            },
          })
          .fetch('GET',FilePath, {
            //some headers ..
          })
          .then((res) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('res ', res);
            android.actionViewIntent(
              res.path(),
              "application/vnd.android.package-archive"
            );
            FileViewer.open(dirs.DownloadDir+ "/certificate.pdf")
            // try {
            //   console.log('The file saved to ', res.path());
            //   if (res.path() === null) {
            //
            //   } else {
            //
            //   }
            //
            // } catch (e) {
            //
            // }
            console.log(res.path());
          });
      } else {
        console.log("please grant permission");
      }
    } catch (err) {
      console.log("display error",err)    }
  }

  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={["#8bc3f8", "#4a7fb3", "#1c3045"]}
              StatusColor={"#8bc3f8"} onPress={goBack} Title={GLOBAL.SubCategoryTitle} />
      <View style={Styles.containerList}>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
        {
          modules !== "" ?
            <View style={[Styles.Center_margin_Bottom3]}>
              {modules && (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={modules}
                  style={{ width: "100%", flexGrow: 0 }}
                  renderItem={renderItem}
                  ListHeaderComponent={renderSectionHeader}
                  ListFooterComponent={renderSectionFooter}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              )}
            </View> :
            <View style={Styles.With90CenterVertical}>
              <Text style={Styles.EmptyText}>
                " No Document defined "
              </Text>
            </View>
        }
      </View>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  )
}

export default DocSubCategoryScreen;
