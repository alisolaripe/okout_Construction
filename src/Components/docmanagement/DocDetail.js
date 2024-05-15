import React, { Component, useState } from "react";
import { Container, Content } from "native-base";
import { Header } from "../component/Header";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import { LogOutModal } from "../component/LogOutModal";
import {User_Items} from '../component/User_Items'
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import { Footer1 } from "../component/Footer";
import { Warningmessage } from "../component/Warningmessage";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import normalize from "react-native-normalize/src/index";
import { Colors } from "../Colors";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from 'react-native-check-box'
import { TextInputI } from "../component/TextInputI";
import Entypo from "react-native-vector-icons/Entypo";
const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
function DocDetail ({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [Contract, setContract] = useState('');
  const [ContractId, setContractId] = useState(0);

  const [data, setdata] = useState([{  value: '1',label: 'test',}]);
  const [list, setlist] = useState([{  value: '1', label: 'User Access'},
    {  value: '2',label: 'Sub Directory',},
    {  value: '3',label: 'Send Email Settings',},{  value: '4',label: 'Storage Location',},{  value: '5',label: 'Comments',}]);
  const [selectId, setselectId] = useState("1");
  const [UserAccess, setUserAccess] = useState([
    {  id: '1',Username: 'Demo5',Coordinator:'y',Create:'y',ReadApproved:'n',ReadOlderVersions:'y',Readdraftversion:'y',
      CommentonDocument:'y',ReadDocumentComments:'y',Delete:'y',SendSignature:'y',CreateSubDirectory:'y',CommentonDirectory:'y',
      ReadDirectoryComments:'y'
    },
    {  id: '2',Username: 'Demo4',Coordinator:'y',Create:'y',ReadApproved:'n',ReadOlderVersions:'y',Readdraftversion:'y',
      CommentonDocument:'y',ReadDocumentComments:'y',Delete:'y',SendSignature:'y',CreateSubDirectory:'y',CommentonDirectory:'y',
      ReadDirectoryComments:'y'
    }
  ]);
  const [Parentlist,setParentlist]=useState([{  value: '1',
    label: 'User Access'},{  value: '2',label: 'Sub Directory',}]);
  const [selectparentId, setselectparentId] = useState("");
  const [selectparentname, setselectparentname] = useState("Choose");
  const [categorylist, setcategorylist] = useState([{  value: '1',name: 'Architect',Code:'SEC-00000061',
    Reference:'Reference',Notes:'Notes',CreatedOn:'2022-03-09 16:02:41',CreatedBy:'Demo5'}]);
  const [historylist, sethistorylist] = useState([{  value: '1',name: 'Released',Code:'Draft document created',
   Notes:'Action By bwelsh at  28 Jul 2023 19:51\n' +
     'Ip Address :176.249.214.136'}]);
  const [listSub, setlistSub] = useState([{  value: '1', label: 'General Info'},
    {  value: '2',label: 'Document History'}]);
  const [documenthistorylist, setdocumenthistorylist] = useState([{  value: '1',name: 'Released',DocumentVersionName:'21-067-DW-8300.pdf',
    Author:'bwelsh',Version:'C8',Notes:'Notes',	Type:'Type',	Tags:'Tags'	}]);
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
  const ClickManagement = (item) => {
console.log(item,'item')
  };
  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const SubDirectory_changes =()=>{

  }
    return (
      <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
        <Header colors={["#8bc3f8", "#4a7fb3", "#1c3045"]}
                StatusColor={"#8bc3f8"} onPress={goBack} Title={"Directory Info"} />
        <Content contentContainerStyle={{ alignItems: "center", justifyContent: "center"}}>
          {showModalDelete &&
          <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
          }
          {
            GLOBAL.screenName==='Doc'?
              <>
                <View style={Styles.InputeRowItemsDoc}>
                  <View style={[Styles.inputStyletask2]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowDoc_Items}>
                        <FontAwesome6 name="file-pen" size={normalize(14)} color={Colors.withe} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Directory Info
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="book-open-reader" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Directory Code
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="file-signature" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Reference Code
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="marker" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Directory Title
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="people-arrows" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Parent Section
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="user-gear" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Coordinator
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>Demo 5</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="square-pen" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Notes
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="file-lines" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Contract Number
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/*<View style={Styles.InputeRowItemsdoc2}>*/}
                {/*  <View style={[Styles.inputStyledoc]}>*/}
                {/*    <View style={Styles.RowTask}>*/}
                {/*      <View style={Styles.RowTask_Items}>*/}
                {/*        <FontAwesome6 name="book-bookmark" size={normalize(14)} color={Colors.button} />*/}
                {/*        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Change Contract*/}
                {/*        </Text>*/}
                {/*      </View>*/}
                {/*      <View style={Styles.RowTask_Items}>*/}
                {/*        <Dropdown*/}
                {/*          style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}*/}
                {/*          placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}*/}
                {/*          selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}*/}
                {/*          iconStyle={Styles.iconStyle}*/}
                {/*          itemTextStyle={Styles.itemTextStyle}*/}
                {/*          data={data}*/}
                {/*          maxHeight={300}*/}
                {/*          labelField="label"*/}
                {/*          valueField="value"*/}
                {/*          placeholder={!isFocus ? 'Choose contract' : '...'}*/}
                {/*          value={Contract}*/}
                {/*          containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}*/}
                {/*          renderItem={renderItem}*/}
                {/*          onFocus={() => setIsFocus(true)}*/}
                {/*          onBlur={() => setIsFocus(false)}*/}
                {/*          onChange={item=> {*/}
                {/*            setContract(item);*/}
                {/*            setContractId(item.value);*/}

                {/*          }}*/}
                {/*          renderSelectedItem={(item, unSelect) => (*/}
                {/*            <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>*/}
                {/*              <View style={Styles.selectedStyle2}>*/}
                {/*                <Text style={Styles.selectedTextStyle2}>{item.label}</Text>*/}
                {/*                <AntDesign color="#fff" name="delete" size={15} />*/}
                {/*              </View>*/}
                {/*            </TouchableOpacity>*/}
                {/*          )}*/}
                {/*        />*/}

                {/*      </View>*/}
                {/*    </View>*/}
                {/*  </View>*/}
                {/*</View>*/}
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="face-smile" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Created By
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>Demo5</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="hourglass-start" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Created On
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>2 years ago</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsDoc}>
                  <View style={[Styles.inputStyletask2]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowDoc_Items}>
                        <FontAwesome6 name="file-pen" size={normalize(14)} color={Colors.withe} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Storage Info
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="puzzle-piece" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Storage Type
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>ftp</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="user" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>UserName
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>ftp2@okout.net</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="eye-slash" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Password
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>*******</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="clone" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Directory
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>uploads</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="arrow-up-short-wide" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Encrypt Files Names
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>Y</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc23}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="arrow-up-wide-short" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Encrypt Files(Y/N)
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>n</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/*            <View style={Styles.ScrollView}>*/}
                {/*              <ScrollView*/}
                {/*                horizontal={true}*/}
                {/*                showsHorizontalScrollIndicator={false}>*/}
                {/*                {list.map((item, key) => {*/}
                {/*                  return (*/}
                {/*                    <TouchableOpacity onPress={()=>setselectId(item.value)} key={key} style={item.value===selectId?Styles.ButtonCarouselview:Styles.ButtonCarouselviewnotselect}>*/}

                {/*                      <Text style={item.value===selectId?Styles.txtcenter:Styles.txtcenter2}>*/}
                {/*                        {item.label}*/}
                {/*                      </Text>*/}
                {/*                    </TouchableOpacity>*/}
                {/*                  );*/}
                {/*                })}*/}

                {/*              </ScrollView>*/}
                {/*            </View>*/}

                {/*{selectId==='1'?*/}
                {/*  <View style={Styles.ScrollView2}>*/}
                {/*      {UserAccess.map((item, key) => {*/}
                {/*        return (*/}
                {/*          <User_Items item={item} key={key}/>*/}
                {/*        );*/}
                {/*      })}*/}
                {/*  </View>*/}
                {/*    :selectId==='2'?*/}
                {/*  <View style={Styles.ScrollView2}>*/}
                {/*    <TextInputI onChangeText={(value) => {*/}
                {/*      SubDirectory_changes(value);*/}
                {/*    }} numberValue={34} Parentlist={Parentlist} setselectparentId={setselectparentId} selectparentname={selectparentname} setselectparentname={setselectparentname}*/}
                {/*    />*/}
                {/*    <View style={Styles.greenView}>*/}
                {/*      <Text style={[Styles.txtGreenView ,{flex:1}]}>Created  By</Text>*/}
                {/*      <Text style={[Styles.txtGreenView ,{flex:1}]}>Created On</Text>*/}
                {/*      <Text style={[Styles.txtGreenView ,{flex:1}]}>Notes</Text>*/}
                {/*      <Text style={[Styles.txtGreenView, {flex: 1}]}>Reference</Text>*/}
                {/*      <Text style={[Styles.txtGreenView, {flex: 1}]}>Code*/}
                {/*      </Text>*/}
                {/*      <Text style={[Styles.txtGreenView, {flex: 1}]}>Directory Name*/}
                {/*      </Text>*/}
                {/*    </View>*/}
                {/*    {*/}
                {/*      categorylist.map((item, key) => {*/}
                {/*        return (*/}
                {/*                <View style={Styles.cardViewLikes}>*/}
                {/*                  <View style={Styles.width16}>*/}
                {/*                    <Text style={[Styles.CatText4]}>{item.name}</Text>*/}
                {/*                  </View>*/}
                {/*                  <View style={Styles.width20}>*/}
                {/*                    <Text style={[Styles.CatText4]}>{item.Code}</Text>*/}
                {/*                  </View>*/}
                {/*                  <View style={Styles.width16}>*/}
                {/*                      <Text style={[Styles.CatText4]}>{item.Reference}</Text>*/}
                {/*                  </View>*/}
                {/*                  <View style={Styles.width16}>*/}
                {/*                    <Text style={[Styles.CatText4]}>{item.Notes}</Text>*/}
                {/*                  </View>*/}
                {/*                  <View style={Styles.width16}>*/}
                {/*                    <Text style={[Styles.CatText4,{paddingRight:2}]}>{item.CreatedOn}</Text>*/}
                {/*                  </View>*/}
                {/*                  <View style={Styles.width14}>*/}
                {/*                    <Text style={[Styles.CatText4,{paddingRight:2}]}>{item.CreatedBy}</Text>*/}
                {/*                  </View>*/}
                {/*                </View>*/}
                {/*        )})*/}
                {/*    }*/}


                {/*  </View>:*/}
                {/*    <View style={Styles.ScrollView2}>*/}

                {/*    </View>*/}
                {/*}*/}
              </>:
              GLOBAL.screenName==='SubDoc'?
              <>
                <View style={Styles.InputeRowItemsDoc}>
                  <View style={[Styles.inputStyletask2]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowDoc_Items}>
                        <FontAwesome6 name="file-pen" size={normalize(14)} color={Colors.withe} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Directory Info
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="book-open-reader" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Directory Code
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="file-signature" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Reference Code
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="marker" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Directory Title
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}> Architect</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="people-arrows" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Parent Section
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>St Albans</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="user-gear" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Coordinator
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>Demo 5</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="square-pen" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Notes
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="file-lines" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Contract Number
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc2}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="face-smile" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Created By
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>Demo5</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.InputeRowItemsdoc23}>
                  <View style={[Styles.inputStyledoc]}>
                    <View style={Styles.RowTask}>
                      <View style={Styles.RowTask_Items}>
                        <FontAwesome6 name="hourglass-start" size={normalize(14)} color={Colors.button} />
                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Created On
                        </Text>
                      </View>
                      <View style={Styles.RowTask_Items}>
                        <Text numberOfLines={10}
                              style={[Styles.txtLightColortask_Items33]}>2 years ago</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>:
                GLOBAL.screenName==='sub'?
                  <>
                                <View style={Styles.ScrollView3}>
                                  <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}>
                                    {listSub.map((item, key) => {
                                      return (
                                        <TouchableOpacity onPress={()=>setselectId(item.value)} key={key} style={item.value===selectId?Styles.ButtonCarouselview:Styles.ButtonCarouselviewnotselect}>

                                          <Text style={item.value===selectId?Styles.txtcenter:Styles.txtcenter2}>
                                            {item.label}
                                          </Text>
                                        </TouchableOpacity>
                                      );
                                    })}

                                  </ScrollView>
                                </View>
                    {selectId==='1'?

                    <>
                      <View style={Styles.InputeRowItemsDoc}>
                        <View style={[Styles.inputStyletask2]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowDoc_Items}>
                              <FontAwesome6 name="file-pen" size={normalize(14)} color={Colors.withe} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Directory Info
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="book-open-reader" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Directory Name
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>Architect</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="file-signature" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Directory Notes
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>SEC-00000027</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="marker" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Status
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}> Active</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="people-arrows" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Created On
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>2 years ago</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc23}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="user-gear" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Created By
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>Demo 5</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={Styles.InputeRowItemsDoc}>
                        <View style={[Styles.inputStyletask33]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowDoc_Items}>
                              <FontAwesome6 name="file-pen" size={normalize(14)} color={Colors.withe} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Document Info
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="book-open-reader" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Document  Name
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>Accommodation Schedule</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="file-signature" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Document Version Name
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>21-067-DW-8300.pdf</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="marker" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Current Version
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}> C8</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="people-arrows" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Document Notes
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}> Notes</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="user-gear" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Document Status
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>Released</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="marker" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}> Created On
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}> 9 months ago</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc2}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="people-arrows" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Created By
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>bwelsh</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemsdoc23}>
                        <View style={[Styles.inputStyledoc]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="user-gear" size={normalize(14)} color={Colors.button} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Ip Address
                              </Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items33]}>176.249.214.136</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <Text numberOfLines={10}
                            style={[Styles.txtLightColortask_Items33]}>History</Text>
                      <View style={Styles.greenView}>
                        <Text style={[Styles.txtGreenView, {flex: 3}]}>Info</Text>
                        <Text style={[Styles.txtGreenView, {flex: 2}]}>Notes
                        </Text>
                        <Text style={[Styles.txtGreenView, {flex: 1}]}>Status
                        </Text>
                      </View>
                      {
                        historylist.map((item, key) => {
                          return (
                            <View style={Styles.cardViewLikes}>
                              <View style={Styles.width18}>
                                <Text style={[Styles.CatText4]}>{item.name}</Text>
                              </View>
                              <View style={Styles.width42}>
                                <Text style={[Styles.CatText4]}>{item.Code}</Text>
                              </View>

                              <View style={Styles.width42}>
                                <Text style={[Styles.CatText4]}>{item.Notes}</Text>
                              </View>


                            </View>
                          )})
                      }
                    </>:
                      <>
                        <View style={Styles.greenView24}>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Action</Text>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Tags</Text>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Type</Text>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Notes</Text>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Version</Text>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Author</Text>
                          <Text style={[Styles.txtGreenView, {flex: 2}]}>Document Version Name</Text>
                          <Text style={[Styles.txtGreenView, {flex: 1}]}>Status
                          </Text>
                        </View>
                        {
                          documenthistorylist.map((item, key) => {
                            return (
                              <View style={Styles.cardViewLikes}>
                                <View style={Styles.width14}>
                                  <Text style={[Styles.CatText4]}>{item.name}</Text>
                                </View>
                                <View style={Styles.width23}>
                                  <Text style={[Styles.CatText4]}>{item.DocumentVersionName}</Text>
                                </View>

                                <View style={Styles.width14}>
                                  <Text style={[Styles.CatText4]}>{item.Author}</Text>
                                </View>
                                <View style={Styles.width7}>
                                  <Text style={[Styles.CatText4]}>{item.Version}</Text>
                                </View>
                                <View style={Styles.width14}>
                                  <Text style={[Styles.CatText4]}>{item.Notes}</Text>
                                </View>
                                <View style={Styles.width14}>
                                  <Text style={[Styles.CatText4]}>{item.Type}</Text>
                                </View>
                                <View style={Styles.width14}>
                                  <Text style={[Styles.CatText4]}>{item.Tags}</Text>
                                </View>
                                <TouchableOpacity style={Styles.width7}>
                                  <Entypo size={normalize(12)} color={Colors.button} name={'download'}/>
                                </TouchableOpacity>
                              </View>
                            )})
                        }
                      </>
                      // const [documenthistorylist, setdocumenthistorylist] = useState([{
                      // value: '1',name: 'Released',DocumentVersionName:'21-067-DW-8300.pdf',
                      // Author:'bwelsh',Version:'C8',Notes:'Notes',	Type:'Type',	Tags:'Tags'	}]);
                    }
                  </>
                  :null
          }

        </Content>
        <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
      </Container>
    );

}

export default DocDetail;
