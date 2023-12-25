import React, { Component, useState,useEffect,useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal, ImageBackground, TextInput,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
import { TextInputI } from "../component/TextInputI";
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modalize } from "react-native-modalize";
const GLOBAL = require("../Global");
import { Footer1 } from "../component/Footer";
import { Header } from "../component/Header";
import { isNetworkConnected } from "../GlobalConnected";
import Moment from "moment";
import DatePicker from "react-native-date-picker";
import { writePostApi } from "../writePostApi";
import ImagePicker from "react-native-image-crop-picker";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import { ButtonI } from "../component/ButtonI";
import * as Yup from "yup";
import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Api = require("../Api");
let A=[];
let B=[]
let numOfLinesCompany = 0;
function AddNewTask({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [selectedrelated,setSelectedrelated] = useState('');
  const [Cheked,setCheked] = useState(false);
  const [Taskcategory, setTaskcategory] = useState([]);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [dateType, setdateType] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [relatedId, setRelatedId] = useState(0);
  const modalizeRef =  React.createRef();
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [error, setErrors] = useState("");
  const [TaskRelated, setTaskRelated] = useState([]);
  const [attachmentUrl,setattachmentUrl] = useState([]);
  useEffect(()=>{
    Task_category();
    // Task_priority();
    // Task_status();
     //Task_Users()
  }, []);
  const  writeDataStorage=async (key, obj)=>{
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
    }
  }
  const Task_category =async () => {
    if(GLOBAL.isConnected===true) {
      readOnlineApi(Api.Task_category+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let A = [];
        writeDataStorage(GLOBAL.Task_Category,json)
        for (let item in json?.categories) {
          let obj = json?.categories?.[item];
          A.push({
            value: obj.categoryId,
            label: obj.categoryTitle,
          });
        }

        setTaskcategory(A);
      })
      }
    else {
      let json =JSON.parse( await AsyncStorage.getItem(GLOBAL.Task_Category));
      for (let item in json?.categories) {
        let obj = json?.categories?.[item];
        A.push({
          value: obj.categoryId,
          label: obj.categoryTitle,
        });
      }

      setTaskcategory(A);

    }
    isNetworkConnected().then(status => {
      console.log(status,'status?.status')
      if (status) {
        fetch(GLOBAL.OrgAppLink_value + Api.Task_category+`userId=${GLOBAL.UserInformation?.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            let A = [];
            for (let item in json?.categories) {
              let obj = json?.categories?.[item];
              A.push({
                value: obj.categoryId,
                label: obj.categoryTitle,
              });
            }
            setTaskcategory(A);
          })
          .catch(error => console.log("error", error));
      }
    });
  };
  const Task_priority = () => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value + Api.Task_priority+`userId=${GLOBAL.UserInformation?.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            let A = [];
            for (let item in json?.priorities) {
              let obj = json?.priorities?.[item];
              A.push({
                value: obj.priorityId,
                label: obj.priorityTitle,
              });
            }
            setTaskpriority(A);
            //GLOBAL.modules=A;


          })
          .catch(error => console.log("error", error));
      }
    });
  };
  const Task_status = () => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value + Api.Task_status+`userId=${GLOBAL.UserInformation?.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            let A = [];
            for (let item in json?.taskStatus) {
              let obj = json?.taskStatus?.[item];
              A.push({
                value: obj.statusId,
                label: obj.statusTitle,
                statusClass:obj.statusClass,
                statusColorCode:obj.statusColorCode
              });
            }
            setTaskstatus(A);
            //GLOBAL.modules=A;
          })
          .catch(error => console.log("error", error));
      }
    });
  };
  const Task_Users = () => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value + Api.Task_Users+`userId=${GLOBAL.UserInformation?.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            let A = [];
            console.log( json?.users,' json?.users')
            for (let item in json?.users) {
              let obj = json?.users?.[item];
              A.push({
                value: obj.userId,
                label: obj.fullName,
                roleName:obj.roleName,
                roleId:obj.roleId
              });
            }
            //setTaskuser(A);
            //GLOBAL.modules=A;
          })
          .catch(error => console.log("error", error));
      }
    });
  };
  const Task_RelatedList = (Id) => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value+Api.Task_Project+`userId=${GLOBAL.UserInformation?.userId}&categoryId=${Id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            let A = [];
            for (let item in json?.relatedList) {
              let obj = json?.relatedList?.[item];
              A.push({
                value: obj.relatedId,
                label: obj.relatedName,
              });
            }
            setTaskRelated(A);
            //GLOBAL.modules=A;
          })
          .catch(error => console.log("error", error));
      }
    });
  };
  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
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
              removeDataStorage(GLOBAL.PASSWORD_KEY);
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
  const logout_Url= () => {
    setshowModalDelete(true)
  };

  const AddTask = (value) => {
    let idsArray=''
    const date=new Date() ;
    const Year=date.getFullYear();
    const Day = date.getDate();
    const Month = date.getMonth() + 1;
    const TodayDate = `${Year}-${Month}-${Day}`;
    const formData = new FormData();
    console.log(categoryId,'errors')
    if(categoryId===0){
      setErrors ('selectedcategory')
    }
    else if(relatedId===0){
      setErrors ('selectedrelated')
    }
      else {
      formData.append("userId",'1');
      formData.append("categoryId",categoryId);
      formData.append("relatedId",relatedId);
      formData.append("requestDate",TodayDate);
      formData.append("priorityId", '1');
      formData.append("planStartDate",null);
      formData.append("planEndDate",null);
      formData.append("taskStatusId", '1');
      formData.append("title", value.Title);
      formData.append("description", value.TaskNote);
      formData.append("requestedBy",GLOBAL.UserInformation?.userId);
      formData.append("requestBy", GLOBAL.UserInformation?.userId);
      formData.append("parentTaskId",null);
      formData.append("assignedTo", null);
      console.log(formData,'formData')
      if (ImageSourceviewarray.length !== 0) {
        for (let i = 0; i < ImageSourceviewarray.length; i++) {
          idsArray = ImageSourceviewarray[i];
          formData.append("attachment", {
            uri: idsArray.uri,
            type: idsArray.type,
            name: idsArray.fileName,
          });
          writePostApi("POST",Api.AddTask, formData,ImageSourceviewarray).then(json => {
            if (json) {
              if (json?.status === true) {
                setMessage(json?.msg);
                setShowMessage(true);
                My_TaskList()
                const timerId = setInterval(() => {
                  setShowMessage(false);
                }, 4000);
                return () => clearInterval(timerId);
              }}
            else   {
              setMessage('Your task successfully added')
              setShowMessage(true);

              const timerId = setInterval(() => {
                setShowMessage(false);
              }, 4000);
              return () => clearInterval(timerId);
            }
          });
        }
      }
      else {
        writePostApi("POST", Api.AddTask, formData).then(json => {
          if (json) {
            console.log(json,'jsonApi.AddTask')
            if (json?.status === true) {
              setMessage(json?.msg);
              setShowMessage(true);
              const timerId = setInterval(() => {
                setShowMessage(false);
              }, 4000);
              return () => clearInterval(timerId);
            }}
          else   {
            setMessage('Your task successfully added')
            setShowMessage(true);
            Add_Task_Offline(value,TodayDate)
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 4000);
            return () => clearInterval(timerId);
          }
        });
      }
    }

  };
  const My_TaskList =async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList+`userId=1`).then(json => {
        writeDataStorage(GLOBAL.All_Task,json?.tasks)
      });
    }
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const selectPhotoFromGallery=()=> {
    onClose()
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true
    }).then(response => {
      console.log(response,'response')
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

        alert(response.customButton);
      } else {
        if(ImageSourceviewarray)
          A = [...ImageSourceviewarray];
        B = [...ImageSourceviewarray];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];

          A.push({
            uri: obj.path,
            type: obj.mime,
            fileName: imgName,
          });
          B.push({
            attachmentUrl: obj.path,
            type: obj.mime,
            attachmentName:imgName,
          });

        }
        setImageSourceviewarray(A);
        setattachmentUrl(B)
        A = [...A];
        B=[...B]
      }
    });

  }
  const Add_Task_Offline =async (value,TodayDate) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail))
    let List_Item = [];
    let List_Item_detail = [];
    let A=[];
    let B=[];
    List_Item = json;
    List_Item_detail = json_detail;
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    A.push({
      taskAssignedTo:'',
      taskCategoryName: value.SectionName,
      taskCreatedBy:'0',
      taskCreatedOn:TodayDate,
      taskDescription: value.TaskNote,
      taskId:GLOBAL.TaskId,
      taskPriorityName:'Low',
      taskRequestBy:GLOBAL?.UserInformation?.FullName,
      taskRequestDate:TodayDate,
      taskStatusClass:"info",
      taskStatusColor:"#68BC31",
      taskStatusId:"1",
      taskStatusName:'New',
      taskTitle: value.Title,
    });
    List_Item = A;
    B.push({
      taskAssignedTo:'',
      taskCategoryName: value.SectionName,
      taskCreatedBy:'0',
      taskCreatedOn:TodayDate,
      taskDescription: value.TaskNote,
      taskId:GLOBAL.TaskId,
      taskPriorityName:'Low',
      taskRequestBy:GLOBAL?.UserInformation?.FullName,
      taskRequestDate:TodayDate,
      taskStatusClass:"info",
      taskStatusColor:"#68BC31",
      taskStatusId:"1",
      taskStatusName:'New',
      taskTitle: value.Title,
      attachments:attachmentUrl
    });
    List_Item_detail = A;
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item))
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail))
  };

  const selectPhoto=()=> {
    onClose()
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(response => {
      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      if(ImageSourceviewarray)
        A = [...ImageSourceviewarray];
      B = [...ImageSourceviewarray];
      A.push({
        uri: response.path,
        type: response.mime,
        fileName: imgName,
      });
      B.push({
        attachmentUrl: response.path,
        type: response.mime,
        attachmentName:imgName,
      });
      setImageSourceviewarray(A);
      setattachmentUrl(B)
      A = [...A];
      B=[...B]
    });
  }
  const  renderContent= () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={()=> onClose()} style={Styles.CancelBtn}>
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
  )
  const DeleteImage=(uri)=>{
    let List_Item = ImageSourceviewarray;
    const index= List_Item.findIndex((p)=>p.uri===uri)
    let markers=[...List_Item]
    markers?.splice(index, 1);
    console.log(markers,'markers')
    setImageSourceviewarray(markers)
  }
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Add New Task'}/>
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
      <Content style={[{ backgroundColor: Colors.background }]}>
        <View style={Styles.container}>
          <View style={Styles.Center_margin_Bottom}>
            {
              showModalDelete &&
              <View>
                {
                  _showModalDelete()
                }
              </View>
            }
            <View style={[Styles.With100NoFlex]}>
              <TextInputI onChangeText={(value)=>{AddTask(value)}}  numberValue={24}
                   ChangeChecked={(value)=>ChangeChecked(value)} Cheked={Cheked}
                   tittlebtn={'Add Task'} onOpen={onOpen} DeleteImage={DeleteImage}
                   value={value} ImageSourceviewarray={ImageSourceviewarray}
                   setSelectedcategory={setSelectedcategory} selectedcategory={selectedcategory}
                   selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated} setRelatedId={setRelatedId}
                   setdateType={setdateType} Taskcategory={Taskcategory}  setCategoryId={setCategoryId}
                   Task_RelatedList={Task_RelatedList} TaskRelated={TaskRelated} error={error}
              />
            </View>
          </View>
        </View>
      </Content>
      <Modalize ref={modalizeRef}  withHandle={false}  modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
    </Container>

  );
}


export default AddNewTask;
