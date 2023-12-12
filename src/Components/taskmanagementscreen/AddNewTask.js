import React, { Component, useState,useEffect,useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal, ImageBackground,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
import { TextInputI } from "../component/TextInputI";
import {removeDataStorage} from "../Get_Location";
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
const Api = require("../Api");
let A=[]
function AddNewTask({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [selectedassigned, setSelectedassigned] = useState([]);
  const [selectedpriority, setSelectedpriority] = useState('');
  const [selectedstatus, setSelectedstatus] = useState('');
  const [selecteduser,setSelecteduser] = useState('');
  const [selectedrelated,setSelectedrelated] = useState('');
  const [Cheked,setCheked] = useState(false);
  const [Taskcategory, setTaskcategory] = useState([]);
  const [Taskassigned, setassigned] = useState([{ label: 'Item 1', value: '1' },{ label: 'Item 2', value: '2' }]);
  const [Taskpriority, setTaskpriority] = useState([]);
  const [Taskstatus, setTaskstatus] = useState([]);
  const [Taskuser, setTaskuser] = useState([]);
  const [TaskRelated, setTaskRelated] = useState([]);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [dateType, setdateType] = useState(false);
  const [DateFormatplanstart,setDateFormatplanstart]=useState('');
  const [DateFormatplanend,setDateFormatplanend]=useState('');
  const [userId, setUserId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [relatedId, setRelatedId] = useState(0);
  const [parentTaskId, setParentTaskId] = useState(null);
  const [priorityId, setPriorityId] = useState(0);
  const [taskStatusId, setTaskStatusId] = useState(0);
  const modalizeRef =  React.createRef();
  const [ImageSource,setImageSource] = useState('');
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  useEffect(()=>{
    Task_category();
    Task_priority();
    Task_status();
    Task_Users()
  }, []);
  const Task_category = () => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value + Api.Task_category+`userId=${GLOBAL.UserInformation?.roleId}`, {
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
        fetch(GLOBAL.OrgAppLink_value + Api.Task_priority+`userId=${GLOBAL.UserInformation?.roleId}`, {
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
        fetch(GLOBAL.OrgAppLink_value + Api.Task_status+`userId=${GLOBAL.UserInformation?.roleId}`, {
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
        fetch(GLOBAL.OrgAppLink_value + Api.Task_Users+`userId=${GLOBAL.UserInformation?.roleId}`, {
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
            for (let item in json?.users) {
              let obj = json?.users?.[item];
              A.push({
                value: obj.userId,
                label: obj.fullName,
                roleName:obj.roleName,
                roleId:obj.roleId
              });
            }
            setTaskuser(A);
            //GLOBAL.modules=A;
          })
          .catch(error => console.log("error", error));
      }
    });
  };
  const Task_RelatedList = (Id) => {
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.OrgAppLink_value+Api.Task_Project+`userId=${GLOBAL.UserInformation?.roleId}&categoryId=${Id}`, {
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
  const onConfirm=(date)=>{
    setOpen(false);

    if(dateType==='PlanStartDate') {
      setDate(date);
      setDateFormatplanstart(Moment(date)?.format("YYYY-MM-DD"));
    }
    else   if(dateType==='PlanEndDate') {
      setDate(date);
      setDateFormatplanend(Moment(date)?.format("YYYY-MM-DD"));
    }

  }
  const AddTask = (value) => {
    console.log(categoryId,'errors')
    let idsArray=''
    const date=new Date() ;
    const Year=date.getFullYear();
    const Day = date.getDate();
    const Month = date.getMonth() + 1;
    const TodayDate = `${Year}-${Month}-${Day}`;
    const formData = new FormData();
    console.log(categoryId,'errors')
    if(userId===0){
      setErrors ('selecteduser')
    }
    else if(categoryId===0){
      setErrors ('selectedcategory')
      console.log(errors,'errors')
    }
    else if(relatedId===0){
      setErrors ('selectedrelated')
    }
      else if(priorityId===0){
      setErrors ('selectedpriority')
    }
      else if(DateFormatplanstart===''){
      setErrors ('PlanStartDate')
    }
      else if(DateFormatplanend===''){
      setErrors ('PlanEndDate')
    }
      else if(taskStatusId===0){
      setErrors ('selectedstatus')
    }
      else {
      formData.append("userId",'1');
      formData.append("categoryId",categoryId);
      formData.append("relatedId",relatedId);
      formData.append("requestDate",TodayDate);
      formData.append("priorityId", priorityId);
      formData.append("planStartDate",DateFormatplanstart);
      formData.append("planEndDate",DateFormatplanend);
      formData.append("taskStatusId", taskStatusId);
      formData.append("title", value.Title);
      formData.append("description", value.TaskNote);
      formData.append("requestedBy", userId);
      formData.append("requestBy", userId);
      formData.append("parentTaskId",null);
      formData.append("assignedTo", '2');

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
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 4000);
            return () => clearInterval(timerId);
          }
        });
      }
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
      cropping: true,
      multiple: true
    }).then(response => {
      console.log(response,'response')
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

        alert(response.customButton);
      } else {
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          console.log(obj,'obj')
          A.push({
            uri: obj.path,
            type: obj.mime,
            fileName: imgName,
          });
        }
        setImageSourceviewarray(A);

        A = [...A];
      }
    });

  }

  const Add_Task_Offline = () => {
    let List_Item = [];
    let A = [];
    List_Item =
    A = [...List_Item];

    Save_Details(List_Item);
  };
  const selectPhoto=()=> {
    onClose()
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(response => {


      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      setImageSource(response.path )

      let C=A
      A.push({
        uri: response.path,
        type: response.mime,
        fileName: imgName,
      });
      A = [...A];
      setImageSourceviewarray(A);
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
  const DeleteImage=(fileName)=>{
    let A=[...ImageSourceviewarray]
    const index= A.findIndex((p)=>p.fileName===fileName)
    const x = A.splice(index, 1);
    console.log(x,A)
    setImageSourceviewarray(A)
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
            <DatePicker  modal
                         open={open}
                         date={date}
                         theme={'light'}
                         onConfirm={(date)=>{
                         onConfirm(date)
                         }}
                         textColor={GLOBAL.OFFICIAL_background}
                         onCancel={()=>{
                         setOpen(false);
                         }}/>
            <View style={[Styles.With100NoFlex]}>
              <View style={Styles.FlexWrap}>
                {
                  ImageSourceviewarray.map((value,key) => {
                    return (
                      <View key={key} style={Styles.UnitDetailImageBoxFeatureStyle2}>
                        <ImageBackground source={{uri:value.uri}}
                                         imageStyle={{borderRadius:normalize(6)}}
                                         style={Styles.UnitDetailImagestyle}
                                         resizeMode="stretch">
                          <TouchableOpacity onPress={()=>DeleteImage(value.fileName)} style={Styles.UnitDetailAddTextBox}>
                            <MaterialCommunityIcons name={"delete"} size={17} color={'#fff'} />
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    )
                  })
                }
                <TouchableOpacity onPress={() => onOpen()} style={Styles.unitDetailUploadImagebox}>
                  <Text style={Styles.UploadImageText}>
                    Add Photos
                  </Text>
                  <MaterialIcons name={"add-a-photo"} size={20} color={"#fff"}  />
                </TouchableOpacity>
              </View>
              <TextInputI onChangeText={(value)=> {
                AddTask(value)
              }}  numberValue={17} setSelectedcategory={setSelectedcategory} selectedcategory={selectedcategory}
                          ChangeChecked={(value)=>ChangeChecked(value)} Cheked={Cheked} Taskcategory={Taskcategory} value={value} setOpen={setOpen}
                          tittlebtn={'Add Task'} selectedassigned={selectedassigned} setSelectedassigned={setSelectedassigned} Taskassigned={Taskassigned}
                          selectedpriority={selectedpriority} setSelectedpriority={setSelectedpriority} Taskpriority={Taskpriority} setdateType={setdateType}
                          DateFormatplanstart={DateFormatplanstart} DateFormatplanend={DateFormatplanend}
                          Taskstatus={Taskstatus} selectedstatus={selectedstatus} setSelectedstatus={setSelectedstatus} Taskuser={Taskuser}
                          selecteduser={selecteduser} setSelecteduser={setSelecteduser} setUserId={setUserId} setCategoryId={setCategoryId}
                          setRelatedId={setRelatedId} setParentTaskId={setParentTaskId} setPriorityId={setPriorityId} setTaskStatusId={setTaskStatusId}
                          Task_RelatedList={Task_RelatedList} TaskRelated={TaskRelated} error={errors}
                          selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated}
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
