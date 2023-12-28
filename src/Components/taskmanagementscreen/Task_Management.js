import React, { useState, useEffect } from "react";
import {Text,View,TouchableOpacity,Modal,Image,FlatList} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
const GLOBAL = require("../Global");
const Api = require("../Api");
import Task_management_Item from "./Task_management_Item";
import LinearGradient from "react-native-linear-gradient";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import { FloatAddBtn } from "../component/FloatAddBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../Colors";
import { TextInputI } from "../component/TextInputI";
import { Modalize } from "react-native-modalize";
import { readOnlineApi } from "../ReadPostApi";
import { isNetworkConnected } from "../GlobalConnected";
import { writePostApi } from "../writePostApi";
import ImagePicker from "react-native-image-crop-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
let A=[];
let B=[]
const taskmenu=[ { Name: "my Task ",Id:1, },{Id:2,Name: "Assigned to me"}];
function Task_Management({navigation,navigation:{goBack}}) {
  const [modules,setmodules]= useState([]);
  const [Assigned,setAssigned]= useState([]);
  const [showModalDelete,setshowModalDelete]= useState(false);
  const [angle,setAngle] = useState(165);
  const [selectItem,setSelectItem]= useState(1);
  const [changeScreen,setchangeScreen]= useState(false);
  const [value, setValue] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [selectedrelated,setSelectedrelated] = useState('');
  const [Cheked,setCheked] = useState(false);
  const [Taskcategory, setTaskcategory] = useState([]);
  const [dateType, setdateType] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [relatedId, setRelatedId] = useState(0);
  const modalizeRef =  React.createRef();
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [error, setErrors] = useState("");
  const [TaskRelated, setTaskRelated] = useState([]);
  useEffect(() => {
    Task_category()
    Assigned_TaskList();
    const unsubscribe = navigation.addListener('focus',()=> {
      My_TaskList();
    });
    return unsubscribe;
  },[]);
  //${GLOBAL.UserInformation?.userId}
  const My_TaskList =async () => {
        let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
        let A = [];
        for (let item in json) {
          let obj = json?.[item];
          const Year = obj.taskCreatedOn.split(" ");
          A.push({
            taskId: obj.taskId,
            taskTitle: obj.taskTitle,
            taskCategoryName: obj.taskCategoryName,
            taskPriorityName:obj.taskPriorityName,
            taskDescription:obj.taskDescription,
            taskParentTaskId:obj.taskParentTaskId,
            taskPlanStartDate:obj.taskPlanStartDate,
            taskPlanDueDate:obj.taskPlanDueDate,
            taskStatusColor:obj.taskStatusColor,
            taskCreatedOn:obj.taskCreatedOn,
            taskStatusName:obj.taskStatusName,
            Year:Year?.[0],
          });
        }
        if (A?.length!==0){
          setmodules(A);
        }
        else {
          setmodules('');
        }
  };
  const Assigned_TaskList =async () => {
      let json=JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList))
        let A = [];
        for (let item in json) {
          let obj = json?.[item];
          const Year = obj.taskCreatedOn.split(" ");
          A.push({
            taskId:obj.taskId,
            taskTitle:obj.taskTitle,
            taskCategoryName:obj.taskCategoryName,
            taskPriorityName:obj.taskPriorityName,
            taskDescription:obj.taskDescription,
            taskParentTaskId:obj.taskParentTaskId,
            taskPlanStartDate:obj.taskPlanStartDate,
            taskPlanDueDate:obj.taskPlanDueDate,
            taskStatusColor:obj.taskStatusColor,
            taskCreatedOn:obj.taskCreatedOn,
            taskStatusName:obj.taskStatusName,
            Year:Year?.[0]
          });
        }
        if (A?.length!==0){
          setAssigned(A);
        }
        else {
          setAssigned('');
        }
  };
  const handleSubmit = () => {
    if(modules?.length!==0)
    GLOBAL.TaskId=parseInt(modules?.[modules?.length-1]?.taskId)+1
    else
      GLOBAL.TaskId=1
    // navigation.navigate("AddNewTask");
    setchangeScreen(true)
  };
  const logout_Url= () => {
    setshowModalDelete(true)

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
  const renderItem = ({ item,index }) => (
    <Task_management_Item index={index} key={index} modules={modules.length}   value={item} Navigate_Url={Navigate_Url} ShowMessage={ShowMessage} />
  )
  const renderItem_assigned = ({ item,index }) => (
    <Task_management_Item index={index} modules={Assigned.length}   value={item} Navigate_Url={Navigate_Url} ShowMessage={ShowMessage} />
  )
  const renderSectionHeader=()=>(
    <>
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      <View style={Styles.Horizental_Menu}>
        <View style={Styles.Horizental_Menu_Box}>
          {taskmenu.map((item, index) => {
            return (
              <View key={index} style={{ width:'35%'}}>
                {
                  selectItem===item.Id?
                    <LinearGradient  angle={angle}
                                     colors={["#6dabec", "#27405c"]}    useAngle={true}
                                     style={Styles.Horizental_Menu_Item}>
                      <TouchableOpacity  key={index}  onPress={()=> {
                        setSelectItem(item.Id);
                        GLOBAL.Task_List=item.Name
                      }}>
                        <Text style={Styles.Horizental_Menu_Item_text}>
                          {item.Name}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>:

                    <TouchableOpacity  onPress={()=> {
                      setSelectItem(item.Id);
                      GLOBAL.Task_List=item.Name
                    }}  style={Styles.Horizental_Menu_Item_notselect}>
                      <Text style={Styles.Horizental_Menu_Item_text}>
                        {item.Name}
                      </Text>
                    </TouchableOpacity>
                }
              </View>

            );
          })}
      </View>
      </View>
      </>
    )
  const renderSectionFooter=()=>(
  <View style={Styles.SectionFooter}/>
    )
  const Task_category =async () => {
    if(GLOBAL.isConnected===true) {
      readOnlineApi(Api.Task_category+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
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

  const AddTask = (value) => {
    let idsArray=''
    const date=new Date() ;
    const Year=date.getFullYear();
    const Day = date.getDate();
    const Month = date.getMonth()+1;
    const TodayDate = `${Year}-${Month}-${Day}`;
    const formData = new FormData();
    if(categoryId===0){
      setErrors ('selectedcategory')
    }
      // else if(relatedId===0){
      //   setErrors ('selectedrelated')
    // }
    else {
      formData.append("userId",'1');
      formData.append("categoryId",categoryId);
      formData.append("relatedId",relatedId);
      formData.append("requestDate",TodayDate);
      formData.append("priorityId", '1');
      formData.append("planStartDate",null);
      formData.append("planEndDate",null);
      formData.append("taskStatusId", '1');
      formData.append("title", value?.Title);
      formData.append("description", value?.TaskNote);
      formData.append("requestedBy",GLOBAL?.UserInformation?.userId);
      formData.append("requestBy", GLOBAL?.UserInformation?.userId);
      formData.append("parentTaskId",null);
      formData.append("assignedTo", null);
      if (GLOBAL.isConnected=== false) {
        Add_Task_Offline(value, TodayDate);
      }
      if (ImageSourceviewarray.length !== 0) {
        for (let i = 0; i < ImageSourceviewarray?.length; i++) {
          idsArray = ImageSourceviewarray[i];
          formData.append("attachments[]", {
            uri: idsArray.uri,
            type: idsArray.type,
            name: idsArray.fileName,
          });
          writePostApi("POST",Api.AddTask, formData,ImageSourceviewarray).then(json => {
            if (json) {
              if (json?.status === true) {
                setMessage(json?.msg);
                setShowMessage(true);
                My_TaskList_server()
                const timerId = setInterval(() => {
                  setShowMessage(false);
                setchangeScreen(false)
              }, 2000);
          return () => clearInterval(timerId);
              }}
            else   {
              My_TaskList();
              setMessage('Your task successfully added')
              setShowMessage(true);

              const timerId = setInterval(() => {
                setShowMessage(false);
                setchangeScreen(false)

              }, 2000);
              return () => clearInterval(timerId);
            }
          });
        }
      }
      else {
        writePostApi("POST", Api.AddTask, formData).then(json => {
          if (json) {
            if (json?.status === true) {
              setMessage(json?.msg);
              setShowMessage(true);
              My_TaskList_server()
              const timerId = setInterval(() => {
                setShowMessage(false);
                setchangeScreen(false)
              }, 2000);
              return () => clearInterval(timerId);
            }}
          else   {
            My_TaskList();
            setMessage('Your task successfully added')
            setShowMessage(true);
            const timerId = setInterval(() => {
              setShowMessage(false);
              setchangeScreen(false)
            }, 3000);
            return () => clearInterval(timerId);
          }
        });
      }


    }
  };
  const My_TaskList_server =async () => {
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


        }
        setImageSourceviewarray(A);
        A = [...A];
        B=[...B]
      }
    });

  }
  const Add_Task_Offline =async (value,TodayDate) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task))
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail))
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments))
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A=[];
    let B=[];
    let C=[];
    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments=json_attachments
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      C = [...List_attachments];
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
    });
    List_Item_detail = B;
    ImageSourceviewarray?.forEach((obj) => {
      C.push({
        taskId:GLOBAL.TaskId,
        attachmentUrl:obj?.uri
      });}
    )
    List_attachments = C;
    let D = [];
    for (let item in List_Item) {
      let obj = List_Item?.[item];
      const Year = obj.taskCreatedOn.split(" ");
      D.push({
        taskId: obj.taskId,
        taskTitle: obj.taskTitle,
        taskCategoryName: obj.taskCategoryName,
        taskPriorityName:obj.taskPriorityName,
        taskDescription:obj.taskDescription,
        taskParentTaskId:obj.taskParentTaskId,
        taskPlanStartDate:obj.taskPlanStartDate,
        taskPlanDueDate:obj.taskPlanDueDate,
        taskStatusColor:obj.taskStatusColor,
        taskCreatedOn:obj.taskCreatedOn,
        taskStatusName:obj.taskStatusName,
        Year:Year?.[0],
      });
    }
    if (D?.length!==0){
      setmodules(D);
    }
    else {
      setmodules('');
    }
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item))
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail))
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments))
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

      A.push({
        uri: response.path,
        type: response.mime,
        fileName: imgName,
      });
      setImageSourceviewarray(A);
      A = [...A];
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
    setImageSourceviewarray(markers)
  }
  const backhandel=()=>{
    setchangeScreen(false)
  }
  return (
    <>
      {changeScreen===false?
        <Container style={[Styles.Backcolor]}>
          <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Management'}/>
          {selectItem === 1 ?
            <View style={[Styles.containerList]}>
              {modules === '' ?
                <View style={Styles.With100CenterVertical}>
                  <Text style={Styles.EmptyText}>
                    " No Task defined
                  </Text>
                  <Text style={Styles.EmptyText}>
                    Add by pressing button below "
                  </Text>
                </View>:
                <View style={Styles.TaskBox}>
                  <FlatList
                    showsh={false}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderSectionHeader}
                    ListFooterComponent={renderSectionFooter}
                    data={modules}
                    style={{ width: '100%',flexGrow: 0 }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
                </View>
              }
            </View>:
            <View style={[Styles.containerList]}>
              {
                Assigned === '' ?
                  <View style={Styles.With100CenterVertical}>
                    <Text style={Styles.EmptyText}>
                      " No Task defined
                    </Text>
                  </View>:
                  <View style={Styles.TaskBox}>
                    <FlatList
                      showsh={false}
                      showsVerticalScrollIndicator={false}
                      ListHeaderComponent={renderSectionHeader}
                      ListFooterComponent={renderSectionFooter}
                      data={Assigned}
                      style={{width:'100%',flexGrow:0}}
                      renderItem={renderItem_assigned}
                      keyExtractor={(item, index) => {
                        return index.toString();
                      }}
                    />
                  </View>
              }
            </View>
          }
          {selectItem===1?
            <FloatAddBtn onPress={handleSubmit} colors={['#a39898','#786b6b','#382e2e']}/>:null
          }
          <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
        </Container>:
        <Container style={[Styles.Backcolor]}>
          <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={backhandel} Title={'Add New Task'}/>
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

      }

    </>

  );
}
export default Task_Management;
