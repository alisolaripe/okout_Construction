import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Modal, Image, FlatList, SafeAreaView } from "react-native";
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
import { readOnlineApi } from "../ReadPostApi";
import { writePostApi } from "../writePostApi";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TaskFilter } from "../component/TaskFilter";
import { TaskFilter_Item } from "../component/TaskFilter_Item";
import { ButtonI } from "../component/ButtonI";
let A = [];
let B = [];
const data = [{ label: "Edit", value: "1", Icon: "edit" }];
const dataassigned = [];
function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [ShowDateRange, setShowDateRange] = useState(false);
  const [DateRangeList, setDateRangeList] = useState([]);
  const [ShowFilter, setShowFilter] = useState(false);
  const [Filtertype, setFiltertype] = useState(false);
  const [FilterName, setFilterName] = useState('');
  const [MudolList, setMudolList] = useState([]);
  const [Taskpriority, setTaskpriority] = useState([]);
  const [Taskstatus, setTaskstatus] = useState([]);
  const [ImageSourceviewarrayUpload,setImageSourceviewarrayUpload] = useState([]);
  const [ShowButton, setShowButton] = useState(true);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);
  const [Taskpriorityfilter, setTaskpriorityfilter] = useState([]);
  const [Taskstatusfilter, setTaskstatusfilter] = useState([]);
  const [visibleguide,setvisibleguide]=useState(false);
  const [FilterTimeList, setFilterTimeList] = useState([{value:0,label:'All',Icon:'calendar-month'},{value:1,label:'Week',Icon:'calendar-week'},{value:2,label:'Day',Icon:'calendar-today'}]);
  useEffect(() => {
    Task_status();
    Task_priority();
    if (GLOBAL.selectItem === 1) {
      const unsubscribe = navigation.addListener('focus', () => {
        My_TaskList();
      })
      return unsubscribe;
    } else {
      Assigned_TaskList();
    }
  }, []);
  //${GLOBAL.UserInformation?.userId}
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  };

  const My_TaskList = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    console.log(json,'json')
    let A = [];
    for (let item in json) {
      let obj = json?.[item];
      let taskPriorityColor = "";
      const Year = obj.taskCreatedOn.split(" ");
      const Day = Year?.[0]?.split("-");
      const W = Day?.[2]?.split(" ");
      if (obj?.taskPriorityName === "Low")
        taskPriorityColor = "#fcd274";
      else if (obj?.taskPriorityName === "Medium")
        taskPriorityColor = "#fefe77";
      else
        taskPriorityColor = "#d2fd77";
      A.push({
        taskId: obj.taskId,
        taskTitle: obj.taskTitle,
        taskCategoryName: obj.taskCategoryName,
        taskPriorityName: obj.taskPriorityName,
        taskDescription: obj.taskDescription,
        taskParentTaskId: obj.taskParentTaskId,
        taskStatusColor: obj.taskStatusColor,
        taskCreatedOn: obj.taskCreatedOn,
        taskStatusName: obj.taskStatusName,
        Year: Year?.[0],
        WeekDay: getDayOfWeek(Year?.[0]),
        Day: W?.[0],
        Month: Day?.[1],
        taskPriorityColor: taskPriorityColor,
        attachments: obj?.attachments,
        taskUpdated:obj?.taskUpdated
      });
    }
    if (A?.length !== 0) {
      A?.sort(dateComparison_data);
      setmodules(A);
      setMudolList(A);
      Make_Week_Filter_List(A);
    } else {
      setmodules("");
    }
  };
  const dateComparison_data = (a, b) => {
    const date1 = new Date(a?.Year);
    const date2 = new Date(b?.Year);
    return date1 - date2;
  };
  const Make_Week_Filter_List = (A) => {
    let B = [];
    let endDate_Format = "";
    let today = "";
    let tomorrow = "";
    let endDate = "";
    let Exist = "";
    A?.forEach((obj) => {
      if (obj?.Year !== "") {
        today = new Date(obj?.Year);
        tomorrow = new Date(today);
        if (obj?.WeekDay === "Sunday") {
          tomorrow?.setDate(today?.getDate() + 1);
          endDate = tomorrow?.toLocaleDateString();
        } else if (obj?.WeekDay === "Monday") {
          tomorrow?.setDate(today.getDate() + 7);
          endDate = tomorrow?.toLocaleDateString();
        } else if (obj?.WeekDay === "Tuesday") {
          tomorrow?.setDate(today?.getDate() + 6);
          endDate = tomorrow?.toLocaleDateString();

        } else if (obj?.WeekDay === "Wednesday") {
          tomorrow?.setDate(today?.getDate() + 5);
          endDate = tomorrow?.toLocaleDateString();

        } else if (obj?.WeekDay === "Thursday") {
          tomorrow?.setDate(today?.getDate() + 4);
          endDate = tomorrow?.toLocaleDateString();

        } else if (obj?.WeekDay === "Friday") {
          tomorrow?.setDate(today?.getDate() + 3);
          endDate = tomorrow?.toLocaleDateString();
        } else if (obj?.WeekDay === "Saturday") {
          tomorrow?.setDate(today?.getDate() + 2);
          endDate = tomorrow?.toLocaleDateString();
        }
        let newString = endDate.split("/");
        endDate_Format = newString?.[2] + "-" + newString?.[1] + "-" + newString?.[0];
        Exist = B?.findIndex((p) => p.endDate === endDate_Format);
        if (Exist === -1) {
          B.push({
            startDate: obj?.Year?.split(" ")?.[0],
            endDate: endDate_Format,
          });
        }
      }
    });

    setDateRangeList(B);
  };
  const Assigned_TaskList = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let A = [];
    for (let item in json) {
      let obj = json?.[item];
      let taskPriorityColor = "";
      const Year = obj.taskCreatedOn.split(" ");
      const taskPlanStar = obj.taskPlanStartDate.split(" ");
      const taskPlanDue = obj.taskPlanDueDate.split(" ");
      const Day = Year?.[0]?.split("-");
      const W = Day?.[2]?.split(" ");
      if (obj?.taskPriorityName === "Low")
        taskPriorityColor = "#fcd274";
      else if (obj?.taskPriorityName === "Medium")
        taskPriorityColor = "#fefe77";
      else
        taskPriorityColor = "#d2fd77";
      A.push({
        taskId: obj.taskId,
        taskTitle: obj.taskTitle,
        taskCategoryName: obj.taskCategoryName,
        taskPriorityName: obj.taskPriorityName,
        taskDescription: obj.taskDescription,
        taskParentTaskId: obj.taskParentTaskId,
        taskPlanStartDate: taskPlanStar?.[0],
        taskPlanDueDate: taskPlanDue?.[0],
        taskStatusColor: obj.taskStatusColor,
        taskCreatedOn: obj.taskCreatedOn,
        taskStatusName: obj.taskStatusName,
        Year: Year?.[0],
        WeekDay: getDayOfWeek(Year?.[0]),
        Day: W?.[0],
        Month: Day?.[1],
        taskPriorityColor: taskPriorityColor,
        taskUpdated:obj?.taskUpdated
      });
    }
    if (A?.length !== 0) {
      A?.sort(dateComparison_data);
      setmodules(A);
      setMudolList(A);
      Make_Week_Filter_List(A);
    } else {
      setmodules("");
    }
  };
  const handleSubmit = () => {
    if (modules?.length !== 0)
      GLOBAL.TaskId = parseInt(modules?.[modules?.length - 1]?.taskId) + 1;
    else
      GLOBAL.TaskId = 1;
     navigation.navigate("AddNewTask");

  };
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  const _showModalDelete = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDelete}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDelete(false)}
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
          <Image style={{ width: "27%", aspectRatio: 1, marginVertical: normalize(10) }}
                 source={require("../../Picture/png/AlertImage.png")}
                 resizeMode="contain" />
          <View style={Styles.With100NoFlex}>
            <Text style={Styles.txt_left2}>
              Do you want to Log Out from App?
            </Text>
          </View>
        </View>

        <View style={Styles.With100Row}>
          <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => setshowModalDelete(false)}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              removeDataStorage(GLOBAL.PASSWORD_KEY);
              setshowModalDelete(false);
              navigation.navigate("LogIn");
            }}>
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <Task_management_Item data={GLOBAL?.selectItem === 1 ? data : dataassigned} index={index} key={index}
                          modules={modules?.length} ImageSourceviewarrayUpload={ImageSourceviewarrayUpload}
                          setImageSourceviewarrayUpload={setImageSourceviewarrayUpload} ShowButton={ShowButton}
                          value={item} Navigate_Url={Navigate_Url} ShowMessage={ShowMessage} Cheked={Cheked}
                          UpdateTask={UpdateTask} Taskpriority={Taskpriority} Message={Message} My_TaskList_server={My_TaskList_server}
                          DeleteImage={DeleteImage} Taskstatus={Taskstatus} DeleteAttachment={DeleteAttachment}
                          ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                          ShowBackBtn={ShowBackBtn} setShowBackBtn={setShowBackBtn}
    />
  );

  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const Task_status = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_status + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let D = [];
        let Filter={value:10,
          label: 'All',
          statusColorCode:'#bd04ae',
          Icon:'status'}
        let C=[]
        for (let item in json?.taskStatus) {
          let obj = json?.taskStatus?.[item];
          D.push({
            value: obj.statusId,
            label: obj.statusTitle,
            statusColorCode: obj.statusColorCode,
            Icon:'status'
          });
        }

        C = [Filter,...D];
        setTaskstatus(D);
        setTaskstatusfilter(C)
        writeDataStorage(GLOBAL.Task_status, json);
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_status));
      let D = [];
      let Filter={value:10,
        label: 'All',
        statusColorCode:'#bd04ae',
        Icon:'status'}
      let C=[]
      for (let item in json?.taskStatus) {
        let obj = json?.taskStatus?.[item];
        D.push({
          value: obj.statusId,
          label: obj.statusTitle,
          statusColorCode: obj.statusColorCode,
          Icon:'status'
        });
      }
      setTaskstatus(D);
      C = [Filter,...D];
      setTaskstatusfilter(C)
    }
  };
  const Task_priority = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_priority + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let A = [];
        let Filter={value:10,
          label: 'All',
          taskPriorityColor:'#bd04ae',
          Icon:'prioriti'}
        let C=[]
        for (let item in json?.priorities) {
          let obj = json?.priorities?.[item];
          let taskPriorityColor = "";
          if (obj?.priorityTitle === "Low")
            taskPriorityColor = "#fcd274";
          else if (obj?.priorityTitle === "Medium")
            taskPriorityColor = "#fefe77";
          else
            taskPriorityColor = "#d2fd77";
          A.push({
            value: obj.priorityId,
            label: obj.priorityTitle,
            taskPriorityColor: taskPriorityColor,
            Icon:'prioriti'
          });
        }

        writeDataStorage(GLOBAL.priorities, json);
        setTaskpriority(A);
        C = [Filter,...A];
        setTaskpriorityfilter(C)
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.priorities));
      let Filter={value:10,
        label: 'All',
        taskPriorityColor:'#bd04ae',
        Icon:'prioriti'}
      let C=[]
      for (let item in json?.priorities) {
        let obj = json?.priorities?.[item];
        let taskPriorityColor = "";
        if (obj?.priorityTitle === "Low")
          taskPriorityColor = "#fcd274";
        else if (obj?.priorityTitle === "Medium")
          taskPriorityColor = "#fefe77";
        else
          taskPriorityColor = "#d2fd77";
        A.push({
          value: obj.priorityId,
          label: obj.priorityTitle,
          taskPriorityColor: taskPriorityColor,
          Icon:'prioriti'
        });
      }

      setTaskpriority(A);
      C = [Filter,...A];
      setTaskpriorityfilter(C)
    }
  };
  const My_TaskList_server = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList + `userId=1`).then(json => {
        console.warn(json,'json:My_TaskList_server')
        writeDataStorage(GLOBAL.All_Task, json?.tasks);
        My_TaskList();
      });
    }
  };
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
  const Delete_Task_Offline = async (attachmentId,taskId) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A = [];
    let B = [];
    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments = json_attachments;
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    let Find_attachments=List_Item?.find((p) => p.taskId === taskId)?.attachments;
    let index_attachments = Find_attachments?.findIndex((p) => p.attachmentId === attachmentId)
    Find_attachments?.splice(index_attachments, 1);
    let index = List_Item?.findIndex((p) => p.taskId === taskId)
    A[index] = { ...A[index], attachments:Find_attachments };
    List_Item = A;
    let Find_attachments_detail=List_Item_detail?.find((p) => p.taskId === taskId)?.attachments;
    let index_attachments_detail = Find_attachments_detail?.findIndex((p) => p.attachmentId === attachmentId)
    Find_attachments_detail?.splice(index_attachments_detail, 1);
    let index_detail = List_Item_detail?.findIndex((p) => p.taskId === taskId)
    B[index_detail] = { ...B[index_detail], attachments:Find_attachments };
    List_Item_detail = B;
    let Find_attachments_List=List_attachments?.filter((p) => p.taskId === taskId);
    let index_attachments_detail_List = Find_attachments_List?.findIndex((p) => p.attachmentId === attachmentId)
    Find_attachments_List?.splice(index_attachments_detail_List, 1);
    List_attachments = [...List_attachments?.filter((p) => p.taskId !== taskId),...Find_attachments_List];
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    My_TaskList()
  };
  const DeleteImage = (uri) => {
    let List_Item = ImageSourceviewarray;
    const index = List_Item.findIndex((p) => p.uri === uri);
    let markers = [...List_Item];
    markers?.splice(index, 1);
    setImageSourceviewarray(markers);
  };

  const FilterFunc = (id) => {
    setFilterName(id)
    setShowFilter(true)
  };
  const FilterFunc1 = (id) => {
    let Filter = MudolList;
    if (id === 0) {
      setmodules(MudolList);
    } else if (id === 1) {
      setshowModalCalender(true);
    } else if (id === 2) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth();
      let A = [];
      A = Filter?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      setmodules(A);
    }

  };
  const FilterFuncStatus = (id,label) => {
    let Filter = MudolList;
    if (id === 10) {
      setmodules(MudolList);
    }else  {
      A = Filter?.filter((p) => p.taskStatusName === label);
      setmodules(A)
    }
    };
  const renderSectionHeader = () => (
    <>
      {
        modules !== ""&& <TouchableOpacity onPress={()=>setvisibleguide(!visibleguide)}>
          <AntDesign  name={"infocirlce"} size={20} color={GLOBAL.OFFICIAL_ORANGE_COLOR} />
        </TouchableOpacity>
      }
      {modules !== "" ?
        <TaskFilter FilterFunc={FilterFunc} setShowDateRange={setShowDateRange} Filtertype={Filtertype}
                    setFiltertype={setFiltertype} setFilterName={setFilterName} />
        : null
      }
      { FilterName===0?
      <TaskFilter_Item FilterFunc={FilterFunc1} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter} FilterTimeList={FilterTimeList}
              setShowFilter={setShowFilter} />:FilterName===1?
          <TaskFilter_Item FilterFunc={FilterFuncStatus} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter} FilterTimeList={Taskstatusfilter}
                                                                               setShowFilter={setShowFilter} />:FilterName===2?
          <TaskFilter_Item FilterFunc={FilterFunc1} setShowDateRange={setShowDateRange} ShowFilter={ShowFilter} FilterTimeList={Taskpriorityfilter}
                           setShowFilter={setShowFilter} />:null
      }
      {ShowDateRange === true ?
        <TouchableOpacity onPress={() => setshowModalCalender(true)} style={Styles.WeekFilterBox}>
          <Text style={Styles.txtFilter}>
            Start Date
          </Text>
          <View style={Styles.WeekFilterBoxItem}>
            <Text style={Styles.txtFilter}>
              {selectedRange.firstDate}
            </Text>
          </View>
          <Text style={Styles.txtFilter}>
            End Date
          </Text>
          <View style={Styles.WeekFilterBoxItem}>
            <Text style={Styles.txtFilter}>
              {selectedRange.secondDate}
            </Text>
          </View>
        </TouchableOpacity> : null
      }
      <View style={Styles.SectionHeader} />
    </>
  );
  const SortByWeek = (startDate, endDate) => {
    let Filter = MudolList;
    let Filter2 = [];
    const firstDate = startDate;
    const secondDate = endDate;
    const today = firstDate?.split("-")?.[2];
    const sevenDaysBefore = secondDate?.split("-")?.[2];
    const Monthtoday = firstDate?.split("-")?.[1];
    const MonthsevenDaysBefore = secondDate?.split("-")?.[1];
    A = Filter?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday) || parseInt(p.Month) === parseInt(MonthsevenDaysBefore));
    if (parseInt(Monthtoday) === parseInt(MonthsevenDaysBefore)) {
      Filter2 = A?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore) && parseInt(p.Day) >= parseInt(today));
      setshowModalCalender(false);
    } else {
      let todays = [];
      let Copy = [];
      let sevenDaysBefores = [];
      let MonthsevenDaysBeforeList = A?.filter((p) => parseInt(p.Month) === parseInt(MonthsevenDaysBefore));
      let MonthtodayList = A?.filter((p) => parseInt(p.Month) === parseInt(Monthtoday));
      todays = MonthtodayList?.filter((p) => parseInt(p.Day) >= parseInt(today));
      sevenDaysBefores = MonthsevenDaysBeforeList?.filter((p) => parseInt(p.Day) <= parseInt(sevenDaysBefore));
      Copy = [].concat(sevenDaysBefores, todays);
      Filter2 = Copy;

      setshowModalCalender(false);
    }
    setShowDateRange(true);
    setmodules(Filter2);
  };
  const _showModalCalender = () => {
    return (
      <SafeAreaView style={[Styles.CalenderBox]}>
        <View style={Styles.With100List2}>
          <Text style={Styles.WeekFilterTextMiddel}>
            Week beginning
          </Text>

          <Text style={Styles.WeekFilterTextMiddel}>
            Week endingsssss
          </Text>
        </View>
        <View style={Styles.Calender}>
          {
            DateRangeList.map((value, index) => {
              return (
                <TouchableOpacity onPress={() => {
                  SortByWeek(value.startDate, value.endDate);
                  setRange({ firstDate: value.startDate, secondDate: value.endDate });
                }} key={index} style={Styles.With100List}>
                  <Text style={Styles.WeekFilterText}>
                    {value.startDate}
                  </Text>

                  <Text style={Styles.WeekFilterText}>
                    {value.endDate}
                  </Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <View style={Styles.With50List}>
          <ButtonI
            style={Styles.btnFilter}
            onpress={() => {
              setshowModalCalender(false);
              setShowDateRange(false);
            }}
            categoriIcon={"Nopadding"}
            title={"Close"}
            colorsArray={["#b9a4ff", "#9f83ff", "#7953FAFF"]}
            styleTxt={[Styles.txt, { fontSize: normalize(13) }]} sizeIcon={27} />
        </View>
      </SafeAreaView>
    );
  };
  const DeleteAttachment =async (attachmentId,taskId) => {
    const formData = new FormData();
    formData.append("userId", "1");
    formData.append("attachmentId", attachmentId);
    writePostApi("POST", Api.DeleteAttachment, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          My_TaskList_server();
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      } else {
        Delete_Task_Offline(attachmentId,taskId)
        setMessage('Your attachment successfully deleted.');
        setShowMessage(true);
        My_TaskList_server();
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 2000);
        return () => clearInterval(timerId);
      }
    });
  };
  const UpdateTask =async (value,taskId)=>{
    setShowButton(false)
    const formData = new FormData();
    formData.append("userId","1");
    formData.append("title",value?.Title);
    formData.append("description",value?.TaskNote);
    formData.append("parentTaskId",null);
    formData.append("taskId",taskId);
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
              setMessage(json?.msg);
              setShowMessage(true);
              setImageSourceviewarrayUpload([]);
              setShowButton(true)
              setShowBackBtn(true)
              My_TaskList_server();
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
            setImageSourceviewarrayUpload([]);
            setShowButton(true)
            setShowBackBtn(true)
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
              setMessage(json?.msg);
              setShowMessage(true);
              setShowButton(true)
              setShowBackBtn(true)
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
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        });
      }
  };
  return (
    <>

        <Container style={[Styles.Backcolor]}>
          <Header colors={["#a39898","#786b6b","#382e2e"]} StatusColor={"#a39897"} onPress={goBack} Title={GLOBAL.TaskMenuName} />
          {
            showModalDelete &&
            <View>
              {
                _showModalDelete()
              }
            </View>
          }
          <View style={[Styles.containerList]}>
            {GLOBAL.selectItem === 1 && modules === "" ?
              <View style={Styles.With100CenterVertical}>
                <Text style={Styles.EmptyText}>
                  " No Task defined
                </Text>
                <Text style={Styles.EmptyText}>
                  Add by pressing button below "
                </Text>
              </View> : GLOBAL.selectItem !== 1 && modules === "" ?
                <View style={Styles.With100CenterVertical}>
                  <Text style={Styles.EmptyText}>
                    " No Task defined
                  </Text>
                </View> : null}
            <View style={Styles.ItemsBoxDyb}>
              <FlatList
                showsh={false}

                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderSectionHeader}
                ListFooterComponent={renderSectionFooter}
                data={modules}
                style={{ width: "100%", flexGrow: 0 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
              />
              {
                showModalCalender &&
                _showModalCalender()
              }

            </View>

          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visibleguide}>
            <Content contentContainerStyle={[Styles.centeredView,
              {flexGrow:1,backgroundColor:"rgba(0,0,0, 0.5)",justifyContent:"center"}]}>
              <View style={[Styles.ModalLocationStyle]}>
                <View style={[{ width: "89%", marginBottom: "4%" }]}>
                  <TouchableOpacity onPress={() => {
                    setvisibleguide(false);
                  }} style={Styles.CancelBtnLeftAlign}>
                    <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
                  </TouchableOpacity>
                </View>
                <View style={Styles.formContainer}>
                  <View style={Styles.guide}>
                    <View style={Styles.guideItem}>
                      <Text style={[Styles.txt_left]}>Status</Text>
                    </View>
                    <View style={Styles.guideItembox}>
                      {
                        Taskstatus?.map((value,index) => {
                          return (
                            <View key={index} style={Styles.BtnListStyle2}>
                              <View style={[Styles.btntask,{backgroundColor:value?.statusColorCode}]}/>
                              <Text style={[Styles.txt_left]}>{value?.label}</Text>
                            </View>
                          )})}
                    </View>
                  </View>
                  <View style={Styles.guide}>
                    <View style={Styles.guideItem}>
                      <Text style={[Styles.txt_left]}>Priority</Text>
                    </View>
                    <View style={Styles.guideItembox}>
                      {
                        Taskpriority?.map((value,index) => {
                          return (
                            <View key={index} style={Styles.BtnListStyle2}>
                              <View style={[Styles.triangle,{borderBottomColor:value.taskPriorityColor}]} />
                              <Text style={Styles.txt_left}>{value?.label}</Text>
                            </View>
                          )})}
                    </View>
                  </View>
                </View>
              </View>
            </Content>
          </Modal>
          {GLOBAL.selectItem === 1 ?
            <FloatAddBtn onPress={handleSubmit} colors={["#a39898", "#786b6b", "#382e2e"]} /> : null
          }
          <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
        </Container>




    </>
  );
}

export default Task_Management;
