import { Container } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Warningmessage } from "../component/Warningmessage";
import { Footer1 } from "../component/Footer";
import React, { useEffect, useState } from "react";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import { UserPermission } from "../CheckPermission";
import POS_List_Item from "../component/POS_List_Item";
const GLOBAL = require("../Global");
const Photoes=require('../Photoes');
function PosScreen({navigation,navigation:{goBack}}) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [modules, setmodules] = useState([{ Id: 0 ,Name:'Walk In Customer',Address:'test address,London'},{ Id: 1 ,Name:'TEST CUSTOMER (TEST CUSTOMER) ',Address:'test address,London'}]);
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
          transparent={true}>
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
                 source={Photoes.Alert}
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
              removeDataStorage(GLOBAL.PASSWORD_KEY)
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
  const Navigate_Url= (Url) => {
    if(Url==='ProfileStack') {
      UserPermission(GLOBAL.UserPermissionsList?.Profile).then(res => {
        if (res.view === "1") {
          navigation.navigate(Url);
        } else {
          setshowWarning(true);
        }
      });
    }
    else
      navigation.navigate(Url);
  };
const SeeDetail=()=>{
}
  useEffect(() => {
  }, []);
  const renderItem=({ item ,index})=>(
    <POS_List_Item data={GLOBAL.Pos_dyb} value={item}  SeeDetail={SeeDetail}
                   Navigate_Url={Navigate_Url}/>
  )

  const renderSectionFooter=()=>(
    <View style={Styles.SectionFooter}/>
  )
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#ffc2b5','#fca795','#d1583b']} StatusColor={'#ffc6bb'} onPress={goBack}
              Title={"Pos"} />

        <View style={[Styles.containerList]}>
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          {showWarning===true&& <Warningmessage/>}
          {
            modules!=='' ?
              <View style={Styles.Center_margin_Bottom3}>
                {modules&&(
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={modules}
                    style={{width:'100%',flexGrow:0}}
                    renderItem={renderItem}
                    ListFooterComponent={renderSectionFooter}
                    keyExtractor={(item,index)=>{
                      return index.toString();
                    }}
                  />
                )}
              </View>:
              <View style={Styles.With90CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " Nothing defined
                </Text>
              </View>
          }
        </View>

      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url} />
    </Container>
  );
}
export default PosScreen;
