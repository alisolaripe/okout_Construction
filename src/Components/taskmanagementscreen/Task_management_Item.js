import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions, Modal, ScrollView, TextInput,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "../component/TextInputI";
import { Dropdown } from "react-native-element-dropdown";
import { Content } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../Colors";
import ImagePicker from "react-native-image-crop-picker";
import { writeDataStorage } from "../Get_Location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native-compressor";
import { writePostApi } from "../writePostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import DatePicker from "react-native-date-picker";
import Moment from "moment";
import { ButtonI } from "../component/ButtonI";
const GLOBAL = require("../Global");
const Api = require("../Api");
let A=[]
let B=[]
let Full=''
let numOfLinesCompany = 0;
function Task_management_Item({value,Navigate_Url,data,ChangeChecked,index,Update_Off_Assigned,reasons
                                ,DeleteAttachment,ShowWarningMessage,data3,Assigned_TaskList_server,Assigned_TaskList,
                                setShowWarningMessage,ShowBackBtn,setShowBackBtn,My_TaskList_server,My_TaskList,Update_Off,dataassigned2,Update_Off_Reopen
                              }) {
  const [visible,setvisible]=useState(false);
  const [isFocus,setIsFocus]=useState(false);
  const [taskId,settaskId]=useState(false);
  const [showModalAddImage,setshowModalAddImage]=useState(false);
  const [ImageSourceviewarray,setImageSourceviewarray] = useState([]);
  const [ShowButton, setShowButton] = useState(true);
  const [ImageSourceviewarrayUpload,setImageSourceviewarrayUpload] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [changestatus, setchangestatus] = useState(false);
  const [changestatus_Reopen, setchangestatus_Reopen] = useState(false);
  const [Description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateend, setDateend] = useState(new Date());
  const [openend, setOpenend] = useState(false);
  const [DateFormatplanend, setDateFormatplanend] = useState("");
  const [DateFormatplanstart, setDateFormatplanstart] = useState("");
  const [Cheked,setCheked] = useState(false);
  const [reasonId, setreasonId] = useState(false);
  const [reasonTitle, setreasonTitle] = useState('Select Reason');
  const [reasonDescription, setreasonDescription] = useState('');
  const [error, seterror] = useState(false);

  const ClickManagement =(id)=>{
    if(id==='1'){
      let A=[]
      let uri=''
      settaskId(value.taskId);
      let mark2 = {
        attachmentUrl: "",
        type:'',
        fileName: '',
        attachmentId:'',
      };
      value?.attachments?.forEach((obj) => {
        if(obj.attachmentUrl.split("/")?.[0]==='uploads'){
          uri=GLOBAL?.OrgAppLink_value + "/"+obj?.attachmentUrl
        }
    else {
          uri=obj?.attachmentUrl
        }
        A.push({
          attachmentUrl:uri,
          type: obj?.attachmentName.split(".")?.[1],
          fileName: obj?.attachmentName,
          attachmentId:obj?.attachmentId
        })
      })
      A = [mark2,...A];
      setImageSourceviewarray(A)
      setvisible(true)
    }
    else  if(id==='2'||id==='4') {
      GLOBAL.TaskId=value.taskId
      setchangestatus(true)
    }

    else  if(id==='3') {

      setDateFormatplanend(value?.taskPlanDueDate);
      setDateFormatplanstart(value?.taskPlanStartDate)
       setDate(value?.Format_Dates_StartDate);
       setDateend(value?.Format_Dates_DueDate)
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;
      const Year = date.getFullYear();
      setDescription(value?.taskRequestNotes)
      Full = `${Year}-${Month}-${Day}`;

      let A=[]
      let uri=''
      settaskId(value.taskId);
      let mark2 = {
        attachmentUrl: "",
        type:'AddImage',
        fileName: '',
        attachmentId:'',
      };

      value?.attachments?.forEach((obj) => {
        if(obj.attachmentUrl.split("/")?.[0]==='uploads'){
          uri=GLOBAL?.OrgAppLink_value + "/"+obj?.attachmentUrl
        }
        else {
          uri=obj?.attachmentUrl
        }
        A.push({
          attachmentUrl:uri,
          type: obj?.attachmentName.split(".")?.[1],
          fileName: obj?.attachmentName,
          attachmentId:obj?.attachmentId
        })
      })

      A = [...A,mark2];
      setImageSourceviewarray(A)
      setvisible(true)
    }
    else if(id==='5') {
      GLOBAL.TaskId=value.taskId
      setchangestatus_Reopen(true)
    }

    }

  const _changestatus = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={changestatus}
          avoKeyboard={true}
          onBackdropPress={() => setchangestatus( false)}
          transparent={true}
        >
          {renderchangestatusModalContent()}
        </Modal>
      </View>
    );
  };
  const renderchangestatusModalContent = () => (
    <View style={[Styles.taskModalStyle]}>
      <TouchableOpacity onPress={()=> setchangestatus(false)} style={Styles.CancelBtn}>
        <View style={{width:'95%'}}>
          <AntDesign name={"closecircleo"} size={20} color={"#fff"}  />
        </View>
      </TouchableOpacity>
      <View style={Styles.With95}>

        {
          GLOBAL.selectItem === 1?
            <Text style={Styles.txt_left2}>
              Do you want to Cancel {value.taskTitle} ?
            </Text>:
            <Text style={Styles.txt_left2}>
              Did you Completed the {value.taskTitle}  task ?
            </Text>
        }

      </View>
      <View style={[Styles.With90Row,{paddingVertical:normalize(10)}]}>
        <LinearGradient  colors={['#9ab3fd','#82a2ff','#4B75FCFF']} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => setchangestatus( false)} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient   colors={['#ffadad','#f67070','#FF0000']} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => {
            if( GLOBAL.selectItem === 1)
            Updatestatus()
            else
              UpdatestatusCompleted()
            setchangestatus( false)
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );

  const _changestatus_Reopen = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={changestatus_Reopen}
          avoKeyboard={true}
          onBackdropPress={() => setchangestatus_Reopen( false)}
          transparent={true}
        >
          {renderchangestatusModalContent_Reopen()}
        </Modal>
      </View>
    );
  };
  const renderchangestatusModalContent_Reopen = () => (

      <View style={[Styles.TaskModalTotalStyle,{marginTop:'17%'}]}>
        <View style={Styles.DeleteModalStyle2}>
          <View style={{width:"89%"}}>
            <TouchableOpacity onPress={() =>{
              setchangestatus_Reopen(false);
            }}
                              style={Styles.CancelBtnLeftAlign}>
              <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
          <View style={Styles.formContainer}>
            <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Reason</Text>
            <Dropdown
              style={[Styles.dropdowntask]}
              placeholderStyle={Styles.placeholderStyle}
              selectedTextStyle={Styles.selectedTextStyle}
              inputSearchStyle={Styles.inputSearchStyle}
              iconStyle={Styles.iconStyle}
              itemTextStyle={Styles.itemTextStyle}
              data={reasons}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={reasonTitle}
              searchPlaceholder="Search..."
              value={reasonTitle}
              containerStyle={Styles.containerStyle}
              renderItem={renderItem}
              onFocus={() => setIsFocus(true)}
              onBlur={()  => setIsFocus(false)}
              onChange={item=> {
                setreasonTitle(item.label)
                setreasonDescription(item?.reasonDescription);
                setreasonId(item.value)
              }}
            />
            {error==='Reason' && reasonId===false &&
            <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10),fontWeight:'bold' }}>Reopen Reason.Please!</Text>
            }
            <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Reopen Reason</Text>
            <TextInput
              value={reasonDescription}
              style={[Styles.inputStyle,{paddingVertical:'4%'}]}
              onContentSizeChange={(e)=>{
                numOfLinesCompany=e.nativeEvent.contentSize.height/14
              }}
              onChangeText={(val)=>setreasonDescription(val)}
              multiline={true}
              placeholderTextColor={'#fff'}/>

            <View style={[Styles.ViewItems_center_task]}>
              <ButtonI style={[Styles.btn,{
                flexDirection:"row",
                width:'50%',
                paddingVertical:2,
                marginTop:normalize(30),
              }]}//handleSubmit
                       onpress={UpdatestatusReopen}
                       categoriIcon={""}
                       title={'Send'}
                       colorsArray={['#ffadad','#f67070','#FF0000']}
                       styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
            </View>
          </View>
          {/*<TextInputI onChangeText={(value) => {Reject_Task(value)}}*/}
          {/*numberValue={27} setshowModalReject={setshowModalReject} tittlebtn={"Send"} reasons={reasons}*/}
          {/*ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked} />*/}
        </View>
      </View>

  );
  const Updatestatus=()=>{
    const formData = new FormData();
    formData.append("userId","1");
    formData.append("taskId",GLOBAL.TaskId);
    formData.append("taskStatusId","6");

    writePostApi("POST",Api.Change_Task_Status,formData).then(json => {

      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          My_TaskList_server();
          let index =  GLOBAL?.FilterList.findIndex((p)=>p.taskId===GLOBAL.TaskId);
          let mark=[...GLOBAL?.FilterList]
          mark[index] = { ...mark[index],taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled",taskUpdated:'y' };
          GLOBAL.FilterList=mark
          setchangestatus(false)
          setShowMessage(false);
        }
      }
      else {
        Update_Off(GLOBAL.TaskId)
        let index =  GLOBAL?.FilterList.findIndex((p)=>p.taskId===GLOBAL.TaskId);
        let mark=[...GLOBAL?.FilterList]
        mark[index] = { ...mark[index],taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled",taskUpdated:'y' };
        GLOBAL.FilterList=mark
        setMessage('Your task status successfully changed');
        setShowMessage(true);
        setchangestatus(false)
        setShowMessage(false);
      }
    });
  }
  const UpdatestatusCompleted=()=>{
    const formData = new FormData();
    formData.append("userId","1");
    formData.append("taskId",GLOBAL.TaskId);
    formData.append("taskStatusId","4");

    writePostApi("POST",Api.ChangeStatusTask,formData).then(json => {

      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          Assigned_TaskList_server();
          let index =  GLOBAL?.FilterList.findIndex((p)=>p.taskId===GLOBAL.TaskId);
          let mark=[...GLOBAL?.FilterList]
          mark[index] = { ...mark[index],taskStatusColor: "#0000FF", taskStatusName: "Completed",taskUpdated:'y' };
          GLOBAL.FilterList=mark
          setchangestatus(false)
          setShowMessage(false);
        }
      }
      else {
        Update_Off_Assigned(GLOBAL.TaskId)
        let index =  GLOBAL?.FilterList.findIndex((p)=>p.taskId===GLOBAL.TaskId);
        let mark=[...GLOBAL?.FilterList]
        mark[index] = { ...mark[index],taskStatusColor: "#0000FF", taskStatusName: "Completed",taskUpdated:'y' };
        GLOBAL.FilterList=mark
        setMessage('Your task status successfully changed');
        setShowMessage(true);
        setchangestatus(false)
        setShowMessage(false);
      }
    });
  }
  const Update_Task_Offline = async (value,taskId) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A = [];
    let B = [];
    let C = [];
    let ImageSource=[]

    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments = json_attachments;
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      C = [...List_attachments];
    }
    let index = List_Item?.findIndex((p) => p.taskId === taskId)
    let index_detail = List_Item_detail?.findIndex((p) => p.taskId === taskId)
    if(ImageSourceviewarrayUpload.length!==0){
      ImageSource=[... List_Item?.find((p) => p.taskId === taskId)?.attachments]

      ImageSourceviewarrayUpload?.forEach((obj) => {
          ImageSource.push({
            attachmentId:obj?.attachmentId,
            attachmentUrl: obj?.uri,
            attachmentName:obj?.fileName
          });
        },
      );
      A[index] = { ...A[index], taskTitle:value?.Title,taskDescription:value?.TaskNote,attachments:ImageSource,taskUpdated:'y' };
      List_Item = A;
      B[index_detail] = { ...B[index_detail], taskTitle:value?.Title,taskDescription:value?.TaskNote,attachments:ImageSource };
      List_Item_detail = B;
    }
    else {
      A[index] = { ...A[index], taskTitle:value?.Title,taskDescription:value?.TaskNote,taskUpdated:'y' };
      List_Item = A;
      B[index_detail] = { ...B[index_detail], taskTitle:value?.Title,taskDescription:value?.TaskNote,};
      List_Item_detail = B;
    }




    if(ImageSourceviewarrayUpload.length!==0) {
      ImageSourceviewarrayUpload?.forEach((obj) => {
        C.push({
          taskId: taskId,
          attachmentUrl: obj?.uri
        })
      })
      List_attachments = C;
    }

    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    setImageSourceviewarrayUpload([]);
    My_TaskList()
  };
  const UpdatestatusReopen=()=>{
    if(reasonId===false){
      seterror("Reason");
    }
    else {
      const formData = new FormData();
      formData.append("userId","1");
      formData.append("taskId",GLOBAL.TaskId);
      formData.append("taskStatusId","5");
      formData.append("reasonNotes", reasonDescription)
      formData.append("reasonId",reasonId);
      writePostApi("POST",Api.ChangeStatusTask,formData).then(json => {

        if (json) {
          if (json?.status === true) {
            let index =  GLOBAL?.FilterList.findIndex((p)=>p.taskId===GLOBAL.TaskId);
            let mark=[...GLOBAL?.FilterList]
            mark[index] = { ...mark[index],taskStatusColor: "#ff4545", taskStatusName: "Reopen",taskUpdated:'y' };
            GLOBAL.FilterList=mark
            setMessage(json?.msg);
            setShowMessage(true);
            My_TaskList_server();
            setShowMessage(false);
            setchangestatus_Reopen( false)
          }
        }
        else {
          Update_Off_Reopen(GLOBAL.TaskId,reasonDescription);
          let index =  GLOBAL?.FilterList.findIndex((p)=>p.taskId===GLOBAL.TaskId);
          let mark=[...GLOBAL?.FilterList]
          mark[index] = { ...mark[index],taskStatusColor: "#ff4545", taskStatusName: "Reopen",taskUpdated:'y' };
          GLOBAL.FilterList=mark
          setMessage('Your task status successfully changed');
          setShowMessage(true);
          setchangestatus_Reopen( false);
          setShowMessage(false);
        }
      });
    }

  }
  const Update_Task =async (value,taskId)=>{
    const formData = new FormData();
    formData.append("userId","1");
    formData.append("taskId",taskId);
    formData.append("title",value?.Title);
    if(GLOBAL?.selectItem === 1)
    formData.append("description",value?.TaskNote);

    if (ImageSourceviewarrayUpload?.length!==0) {
      ImageSourceviewarrayUpload?.forEach( (obj) => {
        formData.append("attachments[]",{
          uri:obj?.uri,
          type:obj?.type,
          name:obj?.fileName
        });
      })
      writePostApi("POST",Api.UpdateTask,formData,ImageSourceviewarrayUpload).then(json => {
        if (json) {
          if (json?.status===true) {
           My_TaskList_server();
            setMessage(json?.msg);
            setShowMessage(true);
            setImageSourceviewarrayUpload([]);
            setShowButton(true)
            setShowBackBtn(true)
            setvisible(false)
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        }
        else {
          Update_Task_Offline(value,taskId);
          setMessage('Your task successfully Updated');
          setShowMessage(true);
          My_TaskList_server();
          setImageSourceviewarrayUpload([]);
          setShowButton(true)
          setShowBackBtn(true)
          setvisible(false)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    }
    else {
      writePostApi("POST",Api.UpdateTask,formData).then(json => {
        if (json) {
          if (json?.status === true) {
            if(GLOBAL?.selectItem === 1 ) {

              My_TaskList_server();
            }
            else {

              Assigned_TaskList_server();
            }
            setMessage(json?.msg);
            setShowMessage(true);
            setShowButton(true)
            setShowBackBtn(true)
            setvisible(false)
            const timerId = setInterval(() => {
              setShowMessage(false);

            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
            Update_Task_Offline(value,taskId);
          setMessage('Your task successfully Updated');
          setShowMessage(true);
          setShowButton(true)
          setShowBackBtn(true)
          setvisible(false)
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    }
  };
  const Update_AssignTask =async (value,taskId,Cheked)=>{

    let Display='';
    const formData = new FormData();
    formData.append("userId","1");
    formData.append("taskId",taskId);
    formData.append("title",value?.Title);
    formData.append("description",value?.TaskNote);
    formData.append("planStartDate",DateFormatplanstart);
    formData.append("planEndDate",DateFormatplanend);
    if(Cheked===true){
      formData.append("taskStatusId",'4');
    }

      if(value?.CaseNote.split("\n")?.length===1){
        formData.append("requestNotes", value?.CaseNote)

      }
      else if(value?.CaseNote.split("\n")?.length>1){
        if(value?.CaseNote.split("\n")?.[2]==='') {
          formData.append("requestNotes", Description);
          Display=Description
        }
        else {
          formData.append("requestNotes", value?.CaseNote.split("\n")?.[0] + value?.CaseNote.split("\n")?.[2]);
          Display=value?.CaseNote.split("\n")?.[0] + value?.CaseNote.split("\n")?.[2]
        }
      }

    if (ImageSourceviewarrayUpload?.length!==0) {
      ImageSourceviewarrayUpload?.forEach( (obj) => {
        formData.append("attachments[]",{
          uri:obj?.uri,
          type:obj?.type,
          name:obj?.fileName
        });
      })
      writePostApi("POST",Api.ChangeStatusTask,formData,ImageSourceviewarrayUpload).then(json => {
        if (json) {
          if (json?.status===true) {
           Assigned_TaskList_server();
            setMessage(json?.msg);
            setShowMessage(true);
            setImageSourceviewarrayUpload([]);
            setShowButton(true)
            setShowBackBtn(true)

            const timerId = setInterval(() => {
              setShowMessage(false);
              setvisible(false)
            }, 2000);
            return () => clearInterval(timerId);
          }
        }
        else {
            Update_AssignTask_Offline(value,taskId,Display,Cheked)
          setMessage('Your task successfully Updated');
          setShowMessage(true);
          setImageSourceviewarrayUpload([]);
          setShowButton(true)
          setShowBackBtn(true)
          Assigned_TaskList();
          const timerId = setInterval(() => {
            setShowMessage(false);
            setvisible(false)
          }, 2000);
          return () => clearInterval(timerId);

        }
      });
    }
    else {
      writePostApi("POST",Api.ChangeStatusTask,formData).then(json => {
        if (json) {
          if (json?.status === true) {
            Assigned_TaskList_server();
            setMessage(json?.msg);
            setShowMessage(true);
            setShowButton(true)
            setShowBackBtn(true)
            const timerId = setInterval(() => {
              setShowMessage(false);
              setvisible(false)
            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
            Update_AssignTask_Offline(value,taskId,Display,Cheked)
          setMessage('Your task successfully Updated');
          setShowMessage(true);
          setShowButton(true)
          setShowBackBtn(true)
          Assigned_TaskList();
          const timerId = setInterval(() => {
            setShowMessage(false);
            setvisible(false)
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    }
  };
  const Update_AssignTask_Offline = async (value,taskId,Display,Cheked) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A = [];
    let B = [];
    let C = [];
    let ImageSource=[]
    let Status=''
    let Status_color=''
    if(Cheked===true) {
      Status = "Completed";
      Status_color='#0000FF'
    }
    else {
      Status = "In Progress";
      Status_color='#008000'
    }
    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments = json_attachments;
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      C = [...List_attachments];
    }
    let index = List_Item?.findIndex((p) => p.taskId === taskId)
    let index_detail = List_Item_detail?.findIndex((p) => p.taskId === taskId)
    if(ImageSourceviewarrayUpload.length!==0){
      ImageSource=[... List_Item?.find((p) => p.taskId === taskId)?.attachments]

      ImageSourceviewarrayUpload?.forEach((obj) => {
          ImageSource.push({
            attachmentId:obj?.attachmentId,
            attachmentUrl: obj?.uri,
            attachmentName:obj?.fileName
          });
        },
      );
      A[index] = { ...A[index], taskTitle:value?.Title,taskRequestNotes:Display,attachments:ImageSource,taskUpdated:'y',taskFeedback:value?.TaskNote,
        taskPlanStartDate:DateFormatplanstart,taskPlanDueDate:DateFormatplanend,
        Format_Dates_StartDate:new Date(DateFormatplanstart),
        Format_Dates_DueDate:new Date(DateFormatplanend),taskStatusColor:Status_color,taskStatusName:Status

      };
      List_Item = A;
      B[index_detail] = { ...B[index_detail], taskTitle:value?.Title,taskRequestNotes:Display,attachments:ImageSource,taskFeedback:value?.TaskNote,
        taskPlanStartDate:DateFormatplanstart,taskPlanDueDate:DateFormatplanend,
        Format_Dates_StartDate:new Date(DateFormatplanstart),
        Format_Dates_DueDate:new Date(DateFormatplanend),taskStatusColor:Status_color,taskStatusName:Status
      };
      List_Item_detail = B;
    }
    else {
      A[index] = { ...A[index], taskTitle:value?.Title,taskRequestNotes:Display,taskUpdated:'y',taskFeedback:value?.TaskNote,
        taskPlanStartDate:DateFormatplanstart,taskPlanDueDate:DateFormatplanend,
        Format_Dates_StartDate:new Date(DateFormatplanstart),
        Format_Dates_DueDate:new Date(DateFormatplanend),taskStatusColor:Status_color,taskStatusName:Status};
      List_Item = A;
      B[index_detail] = { ...B[index_detail], taskTitle:value?.Title,taskRequestNotes:Display,taskFeedback:value?.TaskNote,
        taskPlanStartDate:DateFormatplanstart,taskPlanDueDate:DateFormatplanend,
        Format_Dates_StartDate:new Date(DateFormatplanstart),
        Format_Dates_DueDate:new Date(DateFormatplanend),taskStatusColor:Status_color,taskStatusName:Status};
      List_Item_detail = B;
    }




    if(ImageSourceviewarrayUpload.length!==0) {
      ImageSourceviewarrayUpload?.forEach((obj) => {
        C.push({
          taskId: taskId,
          attachmentUrl: obj?.uri
        })
      })
      List_attachments = C;
    }

    await AsyncStorage.setItem(GLOBAL.Assigned_TaskList, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    setImageSourceviewarrayUpload([]);
    Assigned_TaskList()
  };
  const Back_navigate=(isValid)=>{

    if (ShowBackBtn===false||isValid===false) {
      setShowWarningMessage(true);
      setShowBackBtn(true)
      //setTimeout(function(){ setShowBackBtn(true)}, 2000)
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
          {
            let List_Item = ImageSourceviewarray;
            let index = List_Item?.findIndex((p) => p.Type === "AddImage");
            let markers = [...List_Item];
            markers?.splice(index, 1);
            A = [...markers];
          }
          // A = [...ImageSourceviewarray];
        if(ImageSourceviewarrayUpload)
          B = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let attachmentId=0;
          if(A?.length!==0){
            attachmentId= parseInt(A?.[A?.length - 1]?.attachmentId) + 1;
          }
          else {
            attachmentId = attachmentId + 1;
          }
          A.push({
            attachmentUrl:obj.path,
            type:obj.mime,
            fileName:imgName,
            attachmentId:attachmentId,
            taskId:taskId
          });
          Image_compress(obj.path).then(res=>{
            B.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              attachmentId:attachmentId,
              taskId: GLOBAL.TaskId,
            });
            if(B?.length===response?.length) {
              setImageSourceviewarrayUpload(B);
              B = [...B];
            }
          })
          // B.push({
          //   uri:obj.path,
          //   type:obj.mime,
          //   fileName:imgName,
          //   attachmentId:attachmentId,
          //   taskId:taskId
          // });
        }
        let mark2 = {
          attachmentUrl: "",
          type:'AddImage',
          fileName: '',
          attachmentId:'',
        };
        A = [...A, mark2];
        setImageSourceviewarray(A);
        setShowBackBtn(false);
        A = [...A];
      }
    });
  };
  const Image_compress=async (path)=>{
    return  await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    })
  }
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
      {
        let List_Item = ImageSourceviewarray;
        let index = List_Item?.findIndex((p) => p.Type === "AddImage");
        let markers = [...List_Item];
        markers?.splice(index, 1);
        A = [...markers];
      }
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
        attachmentUrl:response.path,
        type:response.mime,
        fileName:imgName,
        attachmentId:attachmentId,
        taskId:taskId
      });
      Image.compress( response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {

        B.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          attachmentId:attachmentId,
          taskId: GLOBAL.TaskId,
        });
        setImageSourceviewarrayUpload(B);
        B = [...B];
      })
      // B.push({
      //   uri:response.path,
      //   type:response.mime,
      //   fileName:imgName,
      //   attachmentId:attachmentId,
      //   taskId:taskId
      // });
      let mark2 = {
        attachmentUrl: "",
        type:'AddImage',
        fileName: '',
        attachmentId:'',
      };
      A = [...A, mark2];
      setImageSourceviewarray(A);

      setShowBackBtn(false);
      A = [...A];

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
    //     </TouchableOpacity>
    //   </View>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={visible}>
    //     <View style={[Styles.centeredView, {
    //       justifyContent: "space-between",
    //       flex: 1,
    //       backgroundColor: "rgba(0,0,0, 0.5)",
    //     }]}>
    //       <View style={[{ flex: 1}]} />
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
    //         </View>
    //         <TextInputI onChangeText={(value)=>UpdateProject(value)}     numberValue={3}
    //                     ChangeChecked={(value)=>ChangeChecked(value)}
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
           <Text style={[Styles.txt_left_task]}>{value?.taskDescription?.slice(0,6)} ...</Text>
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
          {(data.length !== 0 &&value?.taskStatusName!=='Cancelled'&&value?.taskStatusName!=='Completed'&&
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
          {(GLOBAL.selectItem === 2&&value?.taskStatusName==='In Progress' &&
            <Dropdown
              containerStyle={Styles.DropDown}
              selectedTextStyle={Styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              data={dataassigned2}
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
          {(GLOBAL.selectItem === 1&&value?.taskStatusName==='Completed' &&
            <Dropdown
              containerStyle={Styles.DropDown}
              selectedTextStyle={Styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              data={data3}
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
      {
        changestatus &&
        <View>
          {
            _changestatus()
          }
        </View>
      }
          {
            changestatus_Reopen &&
        <View>
          {
            _changestatus_Reopen()
          }

        </View>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <Content contentContainerStyle={[{flexGrow:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",
        }]}>
          <View style={[Styles.ModalLocationStyle]}>
            {/*<View style={[{ width: "89%", marginBottom: "4%" }]}>*/}
            {/*  <TouchableOpacity onPress={() => {*/}
            {/*    Back_navigate()*/}
            {/*  }} style={Styles.CancelBtnLeftAlign}>*/}
            {/*    <AntDesign name={"closecircleo"} size={20} color={"#fff"} />*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}
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
              <View style={Styles.flashMessageWarning4}>
                <View style={Styles.flashMessageWarning6}>
                  <View  style={{ width: "10%",alignItems:'center',justifyContent:'flex-start' }}>
                    <FontAwesome size={normalize(18)} color={'#fff'}  name={'exclamation-circle'} />
                  </View>
                  <View style={{ width: "90%",alignItems:'flex-start' }}>
                    <Text style={Styles.AddedtTxt}>
                      You will lose all changes.Do you still want to leave?

                    </Text>
                  </View>

                </View>
                <View style={Styles.With100Row2}>
                  <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
                    <TouchableOpacity onPress={() => {
                      setShowBackBtn(false)
                      setShowWarningMessage(false);
                    }}>
                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
                    <TouchableOpacity onPress={() => {
                      setShowWarningMessage(false);
                      setShowBackBtn(true);
                      setvisible(false);
                    }}>
                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                {/*<View style={Styles.CancelBtnLeftAlignwarn}>*/}
                {/*  <AntDesign name={"closecircleo"} size={20} color={"#fff"} />*/}
                {/*</View>*/}
              </View>
              }
              {
                GLOBAL.selectItem === 1?
                  <TextInputI onChangeText={(value)=>{Update_Task(value,taskId)}} setShowWarningMessage={setShowWarningMessage} numberValue={25} Full={Full} ChangeChecked={(value)=>ChangeChecked(value)} Cheked={Cheked} ShowButton={ShowButton}
                              Back_navigate={Back_navigate} setShowBackBtn={setShowBackBtn} tittlebtn={'Update Task'} onOpen={onOpen} DeleteImage={DeleteImage_task} value={value} ImageSourceviewarray={ImageSourceviewarray}
                  />:

                  <TextInputI onChangeText={(value)=>{Update_AssignTask(value,taskId,Cheked)}} setShowWarningMessage={setShowWarningMessage} numberValue={29} Full={Full} ChangeChecked={(value)=>ChangeChecked(value)} Cheked={Cheked} ShowButton={ShowButton}
                              Back_navigate={Back_navigate} setShowBackBtn={setShowBackBtn} tittlebtn={'Update Task'} onOpen={onOpen} DeleteImage={DeleteImage_task} value={value} ImageSourceviewarray={ImageSourceviewarray}
                              setOpenend={setOpenend} setOpen={setOpen} DateFormatplanstart={DateFormatplanstart} DateFormatplanend={DateFormatplanend} setCheked={setCheked}

                  />
              }
              <DatePicker modal
                          theme={"light"}
                          open={open}
                          date={date}
                          onConfirm={(date) => {
                            setOpen(false);
                            setDate(date);
                            setDateFormatplanstart(Moment(date)?.format("YYYY-MM-DD"));
                          }}
                          textColor={GLOBAL.OFFICIAL_background}
                          onCancel={() => {
                            setOpen(false);
                          }} />
              <DatePicker modal
                          theme={"light"}
                          open={openend}
                          date={dateend}
                          onConfirm={(date) => {
                            setOpenend(false);
                            setDateend(date);
                            setDateFormatplanend(Moment(date)?.format("YYYY-MM-DD"));
                          }}

                          textColor={GLOBAL.OFFICIAL_background}
                          onCancel={() => {
                            setOpenend(false);
                          }} />
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
