import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions,Modal
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "../component/TextInputI";
import { Dropdown } from "react-native-element-dropdown";
import { Container, Content } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../Colors";
import ImagePicker from "react-native-image-crop-picker";
import { writeDataStorage } from "../Get_Location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const GLOBAL = require("../Global");
let A=[]
let B=[]
function Task_management_Item({value,Navigate_Url,data,ShowMessage,Message,ChangeChecked,index,Cheked,
                                UpdateTask,ShowButton,DeleteAttachment,ImageSourceviewarrayUpload,setImageSourceviewarrayUpload,ShowWarningMessage,
                                setShowWarningMessage,ShowBackBtn,setShowBackBtn
                              }) {
  const [visible,setvisible]=useState(false);

  const [isFocus,setIsFocus]=useState(false);
  const [taskId,settaskId]=useState(false);
  const [showModalAddImage,setshowModalAddImage]=useState(false);
  const [ImageSourceviewarray,setImageSourceviewarray] = useState([]);

  const ClickManagement =(id)=>{
    if(id==='1'){
      let A=[]
      let uri=''
      settaskId(value.taskId);
      value?.attachments?.forEach((obj) => {
        if(obj.attachmentUrl.split("/")?.[0]==='uploads'){
          uri=GLOBAL?.OrgAppLink_value + "/"+obj?.attachmentUrl
        }
    else {
          uri=obj?.attachmentUrl
        }
        A.push({
          uri:uri,
          type: obj?.attachmentName.split(".")?.[1],
          fileName: obj?.attachmentName,
          attachmentId:obj?.attachmentId
        })
      })

      setImageSourceviewarray(A)
      setvisible(true)
    }

  }
  const Back_navigate=()=>{
    if (ShowBackBtn===false) {
      setShowWarningMessage(true);
      setTimeout(function(){ setShowBackBtn(true)}, 2000)
    }
    else {
      setvisible(false);
    }
  }
  const renderItem = (item,index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{ paddingLeft: 7 }}>
          <Entypo size={normalize(12)} color={Colors.withe} name={item.Icon} />
        </View>
        <Text style={Styles.txt_leftDropdown}>{item.label}</Text>
      </View>
    );
  };
  const  renderContent= () => (
    <View style={Styles.BtnBoxtask}>
      <View style={Styles.BtnBoxtask2}>
        <TouchableOpacity onPress={()=> onClosetask()} style={Styles.CancelBtn}>
          <View style={{width:'80%'}}>
            <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          selectPhoto()
        }} style={Styles.UploadBtn}>
          <AntDesign name={"camera"} size={17} color={'#fff'} />
          <Text style={[Styles.TextUploadBtn]}>
            Use Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          selectPhotoFromGallery()
        }} style={Styles.UploadBtn}>
          <AntDesign name={"picture"} size={17} color={'#fff'} />
          <Text style={[Styles.TextUploadBtn]}>
            Choose From Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  const _showModalAddImage = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalAddImage}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalAddImage( false)}
          transparent={true}>
          {renderContent()}
        </Modal>
      </View>
    );
  };
  const selectPhotoFromGallery = () => {
    onClosetask();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      mediaType: "photo",
      includeExif: true,
    }).then(response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      }
      else {
        if(ImageSourceviewarray)
          A = [...ImageSourceviewarray];
        if(ImageSourceviewarrayUpload)
          B = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          console.warn(obj.path,'response.path,')
          let attachmentId=0;
          if(A?.length!==0){
            attachmentId= parseInt(A?.[A?.length - 1]?.attachmentId) + 1;
          }
          else {
            attachmentId = attachmentId + 1;
          }
          A.push({
            uri:obj.path,
            type:obj.mime,
            fileName:imgName,
            attachmentId:attachmentId,
            taskId:taskId
          });
          B.push({
            uri:obj.path,
            type:obj.mime,
            fileName:imgName,
            attachmentId:attachmentId,
            taskId:taskId
          });
        }
        setImageSourceviewarray(A);
        setImageSourceviewarrayUpload(B);
        setShowBackBtn(false);
        A = [...A];
        B = [...B];
      }
    });
  };

  const selectPhoto = () => {
    onClosetask();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(response => {
     // console.warn(response,'response')
      var getFilename = response.path.split("/");
      console.warn(response.path,'response.path,')
      writeDataStorage(GLOBAL.ImageSourceviewarray, response);
      var imgName=getFilename[getFilename.length - 1];
      if(ImageSourceviewarray)
        A = [...ImageSourceviewarray];
      if(ImageSourceviewarrayUpload)
        B = [...ImageSourceviewarrayUpload];
      let attachmentId=0;
      if(A?.length!==0){
        attachmentId= parseInt(A?.[A?.length - 1]?.attachmentId) + 1;
      }
      else {
        attachmentId = attachmentId + 1;
      }


      A.push({
        uri:response.path,
        type:response.mime,
        fileName:imgName,
        attachmentId:attachmentId,
        taskId:taskId
      });
      B.push({
        uri:response.path,
        type:response.mime,
        fileName:imgName,
        attachmentId:attachmentId,
        taskId:taskId
      });

      setImageSourceviewarray(A);
      setImageSourceviewarrayUpload(B);
      setShowBackBtn(false);
      A = [...A];
      B = [...B];
    });


  };
  const DeleteImage_task = (attachmentId,ImageSourceviewarray) => {

    let List_Item = ImageSourceviewarray;
    const index = List_Item.findIndex((p) => p.attachmentId === attachmentId);
    let markers = [...List_Item];
    markers?.splice(index, 1);
    setImageSourceviewarray(markers);
    let List_Item_upload = ImageSourceviewarrayUpload;
    const index_upload = List_Item_upload.findIndex((p) => p.attachmentId === attachmentId);
    let markers_upload = [...List_Item_upload];
    markers_upload?.splice(index_upload, 1);
    setImageSourceviewarrayUpload(markers_upload);
    DeleteAttachment(attachmentId,taskId)
  };
  const onOpen = () => {
  setshowModalAddImage(true)
  };
  const onClosetask = () => {
  setshowModalAddImage(false)
  };
  return (
    // <View index={index}   style={Styles.With100}>
    //   <View style={Styles.FlexRow}>
    //
    //     <TouchableOpacity onPress={()=> {
    //       console.log(value.taskId,'value.taskId')
    //       GLOBAL.Task_detail=value
    //       GLOBAL.TaskId = value.taskId;
    //       Navigate_Url("TaskDetail");
    //     }} style={{width:'100%'}}>
    //       <View style={Styles.ViewItems_center_transparent_row_task}>
    //         <View style={{width:'5%',alignItems:'center',justifyContent:"center"}}>
    //           <View style={[Styles.DoneTask,{backgroundColor:value.taskStatusColor}]}>
    //           </View>
    //           {/*<View style={[modules- 1 !== index?Styles.BorderDash:*/}
    //           {/*  { height:normalize(45)}]}>*/}
    //           {/*</View> backgroundColor:'#786b6b'*/}
    //         </View>
    //       <Text style={[Styles.txt_left_task]}>{value.taskTitle}</Text>
    //
    //           {/*<View style={[Styles.btnListTask,{backgroundColor:value.taskStatusColor}]}>*/}
    //           {/*  <Text style={[Styles.txt_left2, { fontSize: normalize(12) }]}>  {value.taskStatusName}</Text>*/}
    //           {/*</View>*/}
    //
    //         <View style={[Styles.ViewItems_center_transparent_row]}>
    //           <Text style={[Styles.txt_left_task, {fontSize:normalize(12),color:'#b4b4b4'}]}>{value?.taskDescription?.slice(0,30)} ...</Text>
    //         </View>
    //       </View>
    //       <View style={{width:'35%'}}>
    //
    //           <Text style={[Styles.txt_left_task, {fontSize:normalize(12),color:'#b4b4b4'}]}>{value?.Year}</Text>
    //
    //       </View>
    //
    //     </TouchableOpacity>
    //   </View>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={visible}
    //   >
    //     <View style={[Styles.centeredView, {
    //       justifyContent: "space-between",
    //       flex: 1,
    //       backgroundColor: "rgba(0,0,0, 0.5)",
    //     }]}>
    //
    //       <View style={[{ flex: 1}]} />
    //
    //       <View style={Styles.ModalStyle}>
    //         <View style={[{ width:width-40}]} >
    //           <TouchableOpacity onPress={()=> setvisible(false)}  style={Styles.CancelBtn}>
    //             <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
    //           </TouchableOpacity>
    //           {ShowMessage === true ?
    //             <View style={Styles.flashMessageSuccsess}>
    //               <View style={{ width: "10%" }} />
    //               <View style={{ width: "80%" }}>
    //                 <Text style={Styles.AlertTxt}>
    //                   {Message}
    //                 </Text>
    //               </View>
    //               <View style={{ width: "10%" }} />
    //             </View>
    //             :
    //             null
    //           }
    //
    //         </View>
    //         <TextInputI onChangeText={(value)=>UpdateProject(value)}     numberValue={3}
    //                     ChangeChecked={(value)=>ChangeChecked(value)}
    //
    //                     tittlebtn={'Update Project'}/>
    //       </View>
    //
    //     </View>
    //   </Modal>
    // </View>
    <TouchableOpacity  onPress={()=> {
      GLOBAL.Task_detail=value;
      GLOBAL.TaskId=value.taskId;
      Navigate_Url("TaskDetail");
    }} index={index}  style={Styles.ItemDetailBox}>
      <View style={Styles.With93_row}>
        <View style={{ width: "65%" }}>
          <View style={{width:'100%',alignItems:'center',justifyContent:"flex-start",flexDirection:"row"}}>
            <Text style={[Styles.txt_left]}>{value.taskTitle}</Text>
            {
              value?.taskUpdated==='y'?
                  <Text style={[Styles.txt_left_task,{marginLeft:normalize(8)}]}>( Updated )</Text>
                :null
            }
                    </View>
          <View style={Styles.TaskListStyle}>
            <Text style={[Styles.txt_left_task]}>{value?.Year}</Text>
          </View>
          <View style={Styles.TaskListStyle}>
           <Text style={[Styles.txt_left_task]}>{value?.taskDescription?.slice(0,30)} ...</Text>
          </View>
          {/*<View style={Styles.taskbtnStyle}>*/}
          {/*  <Text style={[Styles.txt_left_task]}>Start Date: {value?.taskPlanStartDate}</Text>*/}
          {/*  <Text style={[Styles.txt_left_task]}>Due Date: {value?.taskPlanDueDate}</Text>*/}
          {/*</View>*/}
         <View style={[Styles.BtnListStyle,{marginTop:normalize(7)}]}>
           <View style={[Styles.btntask,{backgroundColor:value.taskStatusColor}]}/>
           <View style={[Styles.triangle,{borderBottomColor:value.taskPriorityColor}]} />
          </View>
        </View>
        <View style={{ width: "35%" }}>
          {(data.length !== 0 &&
            <Dropdown
              containerStyle={Styles.DropDown}
              selectedTextStyle={Styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              data={data}
              activeColor={"#181b2c"}
              maxHeight={300}
              renderItem={renderItem}
              renderRightIcon={() => (
                <View style={Styles.DropDownIcon}>
                  <AntDesign name="ellipsis1" size={normalize(20)} color={GLOBAL.OFFICIAL_WITE_COLOR} />
                </View>
              )}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                ClickManagement(item.value, value.Id);
              }}
            />
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <Content contentContainerStyle={[{flexGrow:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",
        }]}>
          <View style={[Styles.ModalLocationStyle]}>
            <View style={[{ width: "89%", marginBottom: "4%" }]}>
              <TouchableOpacity onPress={() => {
                Back_navigate()


              }} style={Styles.CancelBtnLeftAlign}>
                <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
              </TouchableOpacity>
            </View>
            <View style={Styles.formContainer}>
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
              {ShowWarningMessage===true&&
              <TouchableOpacity onPress={()=>{
                setShowWarningMessage(false);
                setShowBackBtn(true)
              }} style={Styles.flashMessageWarning2}>
                <View style={{ width: "15%",alignItems:'center' }}>
                  <FontAwesome size={normalize(18)} color={'#fff'}  name={'exclamation-circle'} />
                </View>
                <View style={{ width: "65%",alignItems:'flex-start' }}>
                  <Text style={Styles.AddedtTxt}>
                    You will lose all changes.
                  </Text>
                </View>
                <View style={Styles.CancelBtnLeftAlignwarn}>
                  <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
                </View>
              </TouchableOpacity>
              }
              <TextInputI onChangeText={(value)=>{UpdateTask(value,taskId)}} numberValue={25} ChangeChecked={(value)=>ChangeChecked(value)} Cheked={Cheked} ShowButton={ShowButton}
                          tittlebtn={'Update Task'} onOpen={onOpen} DeleteImage={DeleteImage_task} value={value} ImageSourceviewarray={ImageSourceviewarray}
              />
              {
                showModalAddImage&&
                <View>
                  {
                    _showModalAddImage()
                  }
                </View>
              }
            </View>
          </View>
        </Content>
      </Modal>

    </TouchableOpacity>
  );
}


export default Task_management_Item;
