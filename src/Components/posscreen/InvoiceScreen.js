import { FlatList, Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import { UserPermission } from "../CheckPermission";
import React, { useState } from "react";
import { Container, Content } from "native-base";
import { Header } from "../component/Header";
import { Warningmessage } from "../component/Warningmessage";
import { Footer1 } from "../component/Footer";
import InvoiceFactor from "../component/InvoiceFactor";
let A=[]
const Photoes=require('../Photoes');
function InvoiceScreen({navigation,navigation:{goBack}}) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [modules, setmodules] = useState([{ Id: 0 ,Name:'Single Matress Bag 3.6',QTY:'5',Discount:'4',Price:'420'},{ Id: 1 ,Name:'Dannka',QTY:'82',Discount:'0',Price:'20'},
    { Id: 1 ,Name:'Single Matress Bag 3.6',QTY:'7',Discount:'10',Price:'400'},{ Id: 3 ,Name:'Single Matress Bag 3.6',QTY:'12',Discount:'7',Price:'720'},
  ]);
  const [totalQTY, settotalQTY] = useState(0);
  const [grandTotal, setgrandTotal] = useState(0);
  const [Sourceviewarray, setSourceviewarray] = useState([]);
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
  const Invoice=(QTYNumber,total,Id)=>{
    A = [...Sourceviewarray];
  let Exist=A.findIndex((p)=>p.Id===Id)
    if(Exist===-1) {
      A.push({
        Id: Id,
        total: total,
        QTYNumber: QTYNumber
      });
      setSourceviewarray(A);
      A = [...A];
    }
    else {
      console.log('else')
      let markers = [...A];
      console.log(markers,'markers')
      console.log(Exist,'Exist')
      markers[Exist] = { ...markers[Exist], total: total,QTYNumber:QTYNumber};
      setSourceviewarray(markers);
    }
    console.log(Sourceviewarray,'A:new')
  }
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={["#4d78a5", "#375e89", "#27405c"]} StatusColor={'#5079a5'} onPress={goBack}
              Title={"Invoice"} />
      <View style={Styles.Center_margin_Bottom3}>
        <LinearGradient colors={["#629ad5", "#4374aa", "#27405c"]} style={Styles.TotalFactor}>
          <View style={Styles.Width70}>
            <Text style={Styles.TotalFactorText}>QTY  : {totalQTY}</Text>
            {/*<Text style={Styles.TotalFactorText}>Discount (%)  : 45646454</Text>*/}
            {/*<Text style={Styles.TotalFactorText}>Total Vat  : 45646454</Text>*/}
            <Text style={Styles.TotalFactorText}>Grand Total  : {grandTotal}</Text>
          </View>
          <View style={Styles.Width30_flex}>

              <TouchableOpacity onPress={()=>navigation.navigate ('OrderDetails')} style={Styles.btnFactor}>
                <Text
                  style={[Styles.txt_left23, { fontSize: normalize(14) }]}> Next </Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.btnFactor}>
                <Text
                  style={[Styles.txt_left23, { fontSize: normalize(14) }]}>Clear</Text>
              </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <Content contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
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

              {
                modules?.map((item, key) => {
                  return (
                    <InvoiceFactor  value={item} key={key} Invoice={Invoice}
                                    Navigate_Url={Navigate_Url}/>
                  );
                })
              }
            </View>:
            <View style={Styles.With90CenterVertical}>
              <Text style={Styles.EmptyText}>
                " Nothing defined
              </Text>
            </View>
        }
      </View>
      </Content>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url} />
    </Container>
  );
}
export default InvoiceScreen;
