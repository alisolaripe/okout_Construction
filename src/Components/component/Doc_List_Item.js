import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Modal, Platform, Linking,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Dropdown } from "react-native-element-dropdown";
import { TextInputI } from "./TextInputI";
import { Content } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-date-picker";
import Moment from "moment";
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from "react-native-image-crop-picker";
const GLOBAL = require("../Global");
function Doc_List_Item({
                              value,
                              SeeDetail,
                               data,
                               Navigate_Url,categorylist,Screen,download,opneFiles
                            }) {
  const [isFocus, setIsFocus] = useState(false);
  const [visible,setvisible] = useState(false);
  const [DirectoryUser,setDirectoryUser]=useState([{value: '1',label: 'Demo5'}]);
  const [Status,setStatus]=useState([]);
  const [Recipient,setRecipient]=useState([{value: '1',label: 'Okout Admin'},{value: '2',label: 'Demo5'}]);
  const [StatusId,setStatusId]=useState('')
  const [StatusName,setStatusName]=useState('');
  const [DirectoryUserId,setDirectoryUserId]=useState('')
  const [DirectoryUserName,setDirectoryUserName]=useState('');
  const [Name,setName]=useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [DateFormat,setDateFormat]=useState('');
  const [dateEnd, setDateEnd] = useState(new Date())
  const [openEnd, setOpenEnd] = useState(false);
  const [DateFormatEnd,setDateFormatEnd]=useState('');
  const [modaldata, setmodaldata] = useState(false);
  const [type, settype] = useState('');
  const [filename, setfilename] = useState('');

  const [RecipientName,setRecipientName]=useState('');
  const [RecipientId,setRecipientId]=useState('')
  useEffect(()=>{
    const date=new Date();
    setDateFormat(Moment(date)?.format('YYYY-MM-DD H:mm:ss'))
    setDateFormatEnd(Moment(date)?.format('YYYY-MM-DD H:mm:ss'))
  }, [value]);

  const ClickManagement = (item) => {

    if(item?.label=== "Auto Approval") {
      setName(value.name)
      setmodaldata(false)
      setvisible(true)
    }
    if(item?.label=== "Approval List") {
      setmodaldata(true)
      setvisible(true)
    }
    else if(item?.label=== 'Open Folder') {
      SeeDetail(value)
    }
    else if(item?.label=== "Directory Info") {
        GLOBAL.DocID = value.Id;
        GLOBAL.screenName='SubDoc'
        Navigate_Url("DocDetail");
    }

    else if(item?.label=== "Open"||item?.label==='Download') {
      download(value.documentUrl,value.documentName)
    }
    else if(item?.label=== "Pick Up Link") {
      setName(value.name);
      settype('link');
      setmodaldata(false);
      setvisible(true);
    }
    else if(item?.label=== "Info") {
      settype('Info')
      setvisible(true)
    }
    else if(item?.label=== "Add Tag") {
      settype('tag')
      setvisible(true)
    }
    else if(item?.label=== "Edit Version") {
      setName(value.name)
      settype('upload')
      setvisible(true)
    }
    else if(item?.label=== "View More") {
      GLOBAL.DocID = value.Id;
      GLOBAL.screenName='sub'
      Navigate_Url("DocDetail");
    }
    else if(item?.label=== "status") {
      setStatus(value.status)
      settype('status')
      setvisible(true)
    }

  };
  const selectFile=async () => {
    let FileList=[]
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [DocumentPicker.types.docx,DocumentPicker.types.doc,DocumentPicker.types.pdf],
      });
      console.log(res,'res')
      setfilename(res?.[0]?.name)
      for (let item in res) {
        let obj = res[item];
        FileList.push({
          uri: obj.uri,
          type: obj.type,
          fileName: obj.name})
      }

    } catch ( err ) {
      if ( DocumentPicker.isCancel(err) ) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const renderItem = (item, index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{paddingLeft:7}}>
          {/*<Entypo size={normalize(12)} color={Colors.button} name={item.Icon}/>*/}
        </View>
        <Text style={Styles.txt_leftDropdown}>{item.label}</Text>
      </View>
    );
  };
  const openMaps=(latitude,longitude)=> {
    if (Platform?.OS === "android") {
      Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
        .catch(err => console.error("An error occurred", err));
    }
  }
  const SubDirectory_changes=()=>{

  }
  return (
    <>
    {
      Screen==='Sub'?
      <View  style={Styles.ItemDetailBox}>
        <View style={Styles.With90}>

          <View   style={{ width: "55%" }}>

            <Text onPress={() => SeeDetail(value)} style={[Styles.txt_left]}>{value.name}</Text>
            <View style={Styles.TaskListStyle}>
              <Text style={[Styles.txt_left_task]}>Status : {value.documentStatusTitle}</Text>
            </View>
            <View style={Styles.TaskListStyle}>
              <Text style={[Styles.txt_left_task]}>Version : {value.documentVersion}</Text>
            </View>
          </View>
          <View style={{ width: "45%" }}>
            {/*{(value?.data?.length !== 0 &&*/}
            {/*  <Dropdown*/}
            {/*    containerStyle={Styles.DropDown}*/}
            {/*    selectedTextStyle={Styles.selectedTextStyle}*/}
            {/*    labelField="label"*/}
            {/*    valueField="value"*/}
            {/*    data={value?.data}*/}
            {/*    activeColor={Colors.Light}*/}
            {/*    maxHeight={300}*/}
            {/*    renderItem={renderItem}*/}
            {/*    renderRightIcon={()=>(*/}
            {/*      <View style={Styles.DropDownIcon}>*/}
            {/*        <AntDesign name="ellipsis1" size={normalize(25)} color={GLOBAL.OFFICIAL_BLUE_COLOR}/>*/}
            {/*      </View>*/}
            {/*    )}*/}
            {/*    onFocus={() => setIsFocus(true)}*/}
            {/*    onBlur={()  => setIsFocus(false)}*/}
            {/*    onChange={item=>{*/}
            {/*      ClickManagement(item);*/}
            {/*    }}*/}
            {/*  />*/}
            {/*)}*/}
            {/*<View style={{marginLeft:'auto',marginTop:15 }}>*/}
            {/*<Entypo size={normalize(25)} color={Colors.button} name={'heart-outlined'}/>*/}
            {/*</View>*/}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}>
          <Content contentContainerStyle={[Styles.centeredView,{
            flexGrow: 1,
            backgroundColor: "rgba(0,0,0, 0.5)",
            justifyContent: "center",
          }]}>
            <View style={[Styles.ModalLocationStyle]}>
              <View style={[{ width: "89%", marginBottom: "4%" }]}>
                <TouchableOpacity onPress={() => {
                  setvisible(false);
                }} style={Styles.CancelBtnLeftAlign}>
                  <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
                </TouchableOpacity>
              </View>
              <View style={Styles.formContainer}>
                {type==='Upload'?
                  <TextInputI onChangeText={(value) => {
                    SubDirectory_changes(value)}}
                              numberValue={35} DirectoryUser={DirectoryUser}
                              setDirectoryUserId={setDirectoryUserId} setOpen={setOpen} setOpenEnd={setOpenEnd}
                              Name={Name} DateFormatEnd={DateFormatEnd}  tittlebtn={"Submit"}
                              DirectoryUserName={DirectoryUserName} setDirectoryUserName={setDirectoryUserName}
                              DateFormat={DateFormat}
                  />:type==='Info'?
                    <View style={Styles.mainRenderUser} >
                      <Text style={Styles.txtRenderUser}>Title : Level 00 GA 1 of 2</Text>
                      <View style={Styles.dashRenderUser}/>
                      <Text style={Styles.txtRenderUser}>File Name : 21-067-DW-1000.pdf</Text>
                      <View style={Styles.dashRenderUser}/>
                      <Text style={Styles.txtRenderUser}>Date added : 2023-12-08 15:36:50</Text>
                      <View style={Styles.dashRenderUser}/>
                      <Text style={Styles.txtRenderUser}> Notes : Document Version should be numerical and seperated with dots ., for example 1 or 1.1 or 1.2.1 etc. The version you start with can be anything but each time you upload a new version the numerical value should be higher. As an example you can start with 1.2 and then upload 1.5.1.3.20.3: C6</Text>

                    </View>:
                    type==='tag'?
                      <TextInputI onChangeText={(value) => {
                        SubDirectory_changes(value)}}
                                  numberValue={36} DirectoryUser={DirectoryUser}
                                  setDirectoryUserId={setDirectoryUserId}
                                 tittlebtn={"Add"} DirectoryUserName={DirectoryUserName} setDirectoryUserName={setDirectoryUserName}
                      />:
                      type==='status'?
                        <TextInputI onChangeText={(value) => {
                          SubDirectory_changes(value)}}
                                    numberValue={37} Status={Status}
                                    setStatusId={setStatusId}
                                    tittlebtn={"Save"} StatusName={StatusName} setStatusName={setStatusName}
                        /> :type==='upload'?
                        <TextInputI onChangeText={(value) => {
                          SubDirectory_changes(value)}} filename={filename}
                                    numberValue={38}  selectFile={selectFile}
                                    tittlebtn={"Upload"}
                        />
                        :type==='link'?
                        <TextInputI onChangeText={(value) => {
                          SubDirectory_changes(value)}} filename={filename}
                                    numberValue={39}  selectFile={selectFile}
                                    Recipient={Recipient}
                                    tittlebtn={"Send Email"}
                                    setRecipientName={setRecipientName} RecipientName={RecipientName}
                                    RecipientId={RecipientId}  setRecipientId={setRecipientId}
                        />

                    :
                  // const [RecipientName,setRecipientName]=useState('');
                  // const [RecipientId,setRecipientId]=useState('')
                        null
                }
              </View>
            </View>
          </Content>
        </Modal>
      </View>:
      <View  style={Styles.ItemDetailBox}>
        <View style={Styles.With90}>
          <TouchableOpacity  onPress={() => SeeDetail(value)} style={{ width: "55%" }}>
            <Text style={[Styles.txt_left]}>{value.name}</Text>
          </TouchableOpacity>
          <View style={{ width: "45%" }}>
            {/*{(data?.length !== 0 &&*/}
            {/*  <Dropdown*/}
            {/*    containerStyle={Styles.DropDown}*/}
            {/*    selectedTextStyle={Styles.selectedTextStyle}*/}
            {/*    labelField="label"*/}
            {/*    valueField="value"*/}
            {/*    data={data}*/}
            {/*    activeColor={Colors.Light}*/}
            {/*    maxHeight={300}*/}
            {/*    renderItem={renderItem}*/}
            {/*    renderRightIcon={()=>(*/}
            {/*      <View style={Styles.DropDownIcon}>*/}
            {/*        <AntDesign name="ellipsis1" size={normalize(25)} color={GLOBAL.OFFICIAL_BLUE_COLOR}/>*/}
            {/*      </View>*/}
            {/*    )}*/}
            {/*    onFocus={() => setIsFocus(true)}*/}
            {/*    onBlur={()  => setIsFocus(false)}*/}
            {/*    onChange={item=>{*/}
            {/*      ClickManagement(item);*/}
            {/*    }}*/}
            {/*  />*/}
            {/*)}*/}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}>
          <Content contentContainerStyle={[Styles.centeredView,{
            flexGrow: 1,
            backgroundColor: "rgba(0,0,0, 0.5)",
            justifyContent: "center",
          }]}>
            <View style={[Styles.ModalLocationStyle]}>
              <View style={[{ width: "89%", marginBottom: "4%" }]}>
                <TouchableOpacity onPress={() => {
                  setvisible(false);
                }} style={Styles.CancelBtnLeftAlign}>
                  <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
                </TouchableOpacity>
              </View>
              <DatePicker  modal
                           open={open}
                           date={date}
                           theme={'light'}
                           onConfirm={(date) => {
                             setOpen(false)
                             setDate(date);
                             setDateFormat(Moment(date)?.format('YYYY-MM-DD H:mm:ss'))
                             console.log(DateFormat,'DateFormatDateFormatDateFormat')
                           }}
                           textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
                           onCancel={() => {
                             setOpen(false)
                           }} />

              <DatePicker  modal
                           open={openEnd}
                           date={dateEnd}
                           theme={'light'}
                           onConfirm={(date) => {
                             setOpenEnd(false)
                             setDateEnd(date);
                             setDateFormatEnd(Moment(date)?.format('YYYY-MM-DD H:mm:ss'))
                             console.log(DateFormat,'DateFormatDateFormatDateFormat')
                           }}
                           textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
                           onCancel={() => {
                             setOpenEnd(false)
                           }} />

              <View style={Styles.formContainer}>
                {modaldata===false?
                  <TextInputI onChangeText={(value) => {
                    SubDirectory_changes(value)}}
                              numberValue={35} DirectoryUser={DirectoryUser}
                              setDirectoryUserId={setDirectoryUserId} setOpen={setOpen} setOpenEnd={setOpenEnd}
                              Name={Name} DateFormatEnd={DateFormatEnd}  tittlebtn={"Submit"}
                              DirectoryUserName={DirectoryUserName} setDirectoryUserName={setDirectoryUserName}
                              DateFormat={DateFormat}
                  />:
                  <View>
                    <View style={Styles.greenView2}>
                      <Text style={[Styles.txtGreenView ,{flex:1}]}>Created On</Text>
                      <Text style={[Styles.txtGreenView ,{flex:1}]}>Created By</Text>
                      <Text style={[Styles.txtGreenView ,{flex:1}]}>Auto Approval To</Text>
                      <Text style={[Styles.txtGreenView ,{flex:1}]}>Auto Approval From</Text>
                      <Text style={[Styles.txtGreenView, {flex: 1}]}>User Name</Text>
                      <Text style={[Styles.txtGreenView, {flex: 1}]}>Directory Name
                      </Text>
                    </View>
                    {categorylist.map((item, key) => {
                      return (
                        <View style={Styles.greenView3}>
                          <Text style={[Styles.CatText4 ,{flex:1}]}>{item.CreatedBy}</Text>
                          <Text style={[Styles.CatText4 ,{flex:1}]}>{item.CreatedOn}</Text>
                          <Text style={[Styles.CatText4 ,{flex:1}]}>{item.Notes}</Text>
                          <Text style={[Styles.CatText4 ,{flex:1}]}>{item.Reference}</Text>
                          <Text style={[Styles.CatText4 ,{flex:1}]}>{item.Code}</Text>
                          <Text style={[Styles.CatText4 ,{flex:1}]}>{item.name}</Text>
                        </View>
                      )})
                    }
                  </View>
                }
              </View>
            </View>
          </Content>
        </Modal>
      </View>
    }
    </>
  );
}

export default Doc_List_Item;
