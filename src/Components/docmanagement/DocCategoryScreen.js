import { Container } from "native-base";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";
import { Styles } from "../Styles";
import { LogOutModal } from "../component/LogOutModal";
import { Footer1 } from "../component/Footer";
import { removeDataStorage,writeDataStorage } from "../Get_Location";
import Doc_List_Item from "../component/Doc_List_Item";

import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
function DocCategoryScreen({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modules, setmodules] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Message, setMessage] = useState("");
  const [categorylist, setcategorylist] = useState([{  value: '1',name: ' Architect',Code:'Demo5',
    Reference:'07/05/2024',Notes:'07/05/2024',CreatedOn:'Okout Admin',CreatedBy:'07/05/2024'}]);
  const [data, setdata] = useState(['']);
  useEffect(() => {
    get_document()
  }, []);
  const get_document= async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.get_document + `userId=${GLOBAL.UserInformation?.userId}&sectionId=${GLOBAL.DocID}`).then(json => {
        console.log(json,'json')
        let getDoc = [];
        let data = [];
        json?.sections?.forEach((obj) => {
          getDoc.push({
            Id: obj?.sectionId,
            name: obj?.sectionTitle,
            documents:obj?.documents
          });
        });
        json?.sectionMenu?.forEach((obj) => {
          data.push({
            value: obj?.id,
            label: obj?.name,
          });
        });
        setdata(data)
        setmodules(getDoc)
        writeDataStorage(GLOBAL.Get_Docmanagecategory, json);
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Get_Docmanage));
      let getDoc = [];
      let data = [];
      json?.sections?.forEach((obj) => {
        getDoc.push({
          Id: obj?.sectionId,
          name: obj?.sectionTitle,
          documents:obj?.documents
        });
      });
      json?.sectionMenu?.forEach((obj) => {
        data.push({
          value: obj?.id,
          label: obj?.name,
        });
      });
      setdata(data)
      setmodules(getDoc)
    }
  };
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  const renderItem = ({ item, index }) => (
    <Doc_List_Item key={index}  value={item} SeeDetail={SeeDetail} categorylist={categorylist} Screen={'category'}
                   Navigate_Url={Navigate_Url} Message={Message} data={data}
    />
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
    </>
  );
  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const SeeDetail = (value) => {
    GLOBAL.documents= modules.find((p)=>p.Id===value.Id)?.documents;
    GLOBAL.SubCategoryTitle=GLOBAL.DocSubCategoryTitle+' / '+value.name
    navigation.navigate("DocSubCategoryScreen");
  };
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={["#8bc3f8", "#4a7fb3", "#1c3045"]}
              StatusColor={"#8bc3f8"} onPress={goBack} Title={GLOBAL.DocSubCategoryTitle+' '+'SubCategory'} />
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

export default DocCategoryScreen;
