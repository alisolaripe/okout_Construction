import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Modal, Image, FlatList, SafeAreaView } from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
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
import { ButtonI } from "../component/ButtonI";
import { UserPermission } from "../CheckPermission";
import { Warningmessage } from "../component/Warningmessage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInputI } from "../component/TextInputI";
import Moment from "moment";

const GLOBAL = require("../Global");
const Api = require("../Api");
let A = [];
const List = [{ id: 0, Filtername: "Date: َAll", Icon: "calendar-month" },
  { id: 1, Filtername: "Status", Icon: "checkbox-marked-circle-outline" }, {
    id: 2,
    Filtername: "Normal",
    Icon: "podium",
  }];
const data = [{ label: "Edit", value: "1", Icon: "edit" }, { label: "Cancel Task", value: "2", Icon: "cross" }];
const data2 = [];
const dataassigned = [];
const dataassigned2 = [ { label: "Complete Task", value: "4", Icon: "check" }];
const data3 = [{ label: "Reopen", value: "5", Icon: "retweet" }];
function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [DateAll, setDateAll] = useState("All");
  const [StatusAll, setStatusAll] = useState("Open");
  const [priorityAll, setpriorityAll] = useState("Normal");
  const [CurrentStatus, setCurrentStatus] = useState("");
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [ShowDateRange, setShowDateRange] = useState(false);
  const [DateRangeList, setDateRangeList] = useState([]);
  const [MudolList, setMudolList] = useState([]);
  const [Taskpriority, setTaskpriority] = useState([]);
  const [Taskstatus, setTaskstatus] = useState([]);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);
  const [Taskpriorityfilter, setTaskpriorityfilter] = useState([]);
  const [Taskstatusfilter, setTaskstatusfilter] = useState([]);
  const [visibleguide, setvisibleguide] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [DateItems, setDateItems] = useState(false);
  const [Status, setStatus] = useState(false);
  const [Priority, setPriority] = useState(false);
  const [SelectDetailItemStatus, setSelectDetailItemStatus] = useState("1");
  const [SelectDetailItemPriority, setSelectDetailItemPriority] = useState("2");
  const [SelectItem, setSelectItem] = useState(0);
  const [SelectDetailItem, setSelectDetailItem] = useState(0);
  const [ColorChange, setColorChange] = useState(false);
  const [ColorChangestatus, setColorChangestatus] = useState("#ffc2c2");
  const [ColorChangePriority, setColorChangePriority] = useState("#d2fd77");
  const [showModalReject, setshowModalReject] = useState(false);
  const [FilterTimeList, setFilterTimeList] = useState([{ value: 0, label: "All", Icon: "calendar-month" },
    { value: 1, label: "Week", Icon: "calendar-week" }, { value: 2, label: "Today", Icon: "calendar-today" }]);
  const [FilterList, setFilterList] = useState([{ id: 0, Filtername: "Date: َAll", Icon: "calendar-month" },
    { id: 1, Filtername: "Status", Icon: "checkbox-marked-circle-outline" }, {
      id: 2,
      Filtername: "Normal",
      Icon: "podium",
    }]);
  const [reasons, setreasons] = useState([]);
  useEffect(() => {
    Task_status();
    Task_priority();
    ReasonCodeReopen(7)
    const unsubscribe = navigation.addListener("focus", () => {
      if (GLOBAL.selectItem === 1) {
        My_TaskList();
      } else {
        Assigned_TaskList();
      }
    });
    return unsubscribe;
  }, []);
  const ReasonCodeReopen = async (value) => {
    if (GLOBAL.isConnected === true) {

      fetch(Api.Reason_Code+`userId=1&statusId=${value}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      }).then(resp => {
        return resp.json();}).then(json => {
        let A=[];
        json?.reasons?.forEach((obj) => {
          A.push({
            label: obj?.reasonTitle,
            value: obj?.reasonId,
            reasonDescription:obj?.reasonDescription
          });
        });
        setreasons(A);
        writeDataStorage(GLOBAL.Reason_Code_Reopen,json?.reasons);

      })
        .catch(error => console.log("dd", error))
    }
    else {
      let Modules = await AsyncStorage.getItem(GLOBAL.Reason_Code_Reopen);
      let A=[];
      Modules?.forEach((obj) => {
        A.push({
          label: obj?.reasonTitle,
          value: obj?.reasonId,
          reasonDescription:obj?.reasonDescription
        });
      });
      setreasons(A);
    }
  }

  //${GLOBAL.UserInformation?.userId}
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  };

  const My_TaskList = async () => {
    if(GLOBAL?.FilterTime===true||GLOBAL?.FilterStatus===true||GLOBAL?.FilterPriority===true)
    {

      setmodules(GLOBAL?.FilterList);
      setMudolList(GLOBAL.List);
      setDateAll(GLOBAL.FilterTime_name);
      setStatusAll(GLOBAL.FilterStatus_name);
      setpriorityAll(GLOBAL.FilterPriority_name);

    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
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
          taskUpdated: obj?.taskUpdated,
        });
      }
      if (A?.length !== 0) {
        A?.sort(dateComparison_data);
        setmodules(A?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
        setMudolList(A);
        Make_Week_Filter_List(A);
      } else {
        setmodules("");
      }
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

    if(GLOBAL?.FilterTime===true||GLOBAL?.FilterStatus===true||GLOBAL?.FilterPriority===true)
    {

        setmodules(GLOBAL?.FilterList);
        setMudolList(GLOBAL.List);
        setDateAll(GLOBAL.FilterTime_name);
        setStatusAll(GLOBAL.FilterStatus_name);
        setpriorityAll(GLOBAL.FilterPriority_name);

    }
    else {

      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));

      let A = [];
       let taskStatusName=''
      for (let item in json) {
        let obj = json?.[item];
        let taskPriorityColor = "";
        const Year = obj?.taskCreatedOn.split(" ");
        const taskPlanStar = obj?.taskPlanStartDate.split(" ");
        const taskPlanDue = obj?.taskPlanDueDate.split(" ");
        const Day = Year?.[0]?.split("-");
        const W = Day?.[2]?.split(" ");
        if (obj?.taskPriorityName === "Low")
          taskPriorityColor = "#fcd274";
        else if (obj?.taskPriorityName === "Medium")
          taskPriorityColor = "#fefe77";
        else
          taskPriorityColor = "#d2fd77";
        if (obj.taskStatusName==='Accepted')
          taskStatusName='In Progress'
        else
          taskStatusName=obj.taskStatusName
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
          taskStatusName:taskStatusName,
          Year: Year?.[0],
          WeekDay: getDayOfWeek(Year?.[0]),
          Day: W?.[0],
          Month: Day?.[1],
          taskPriorityColor: taskPriorityColor,
          taskUpdated: obj?.taskUpdated,
          attachments: obj?.attachments,
          taskRequestNotes:obj?.taskRequestNotes,
          taskFeedback:obj?.taskDescription,
          Format_Dates_StartDate:new Date(obj?.taskPlanStartDate),
          Format_Dates_DueDate:new Date(obj?.taskPlanDueDate)

        });
      }
      if (A?.length !== 0) {
        A?.sort(dateComparison_data);
        setmodules(A.filter((p) => p?.taskPriorityName === "Normal"));
        setMudolList(A);
        Make_Week_Filter_List(A);
      } else {
        setmodules("");
      }

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
    if (Url === "ProfileStack") {
      UserPermission(GLOBAL.UserPermissionsList?.Profile).then(res => {
        if (res.view === "1") {
          navigation.navigate(Url);
        } else {
          setshowWarning(true);
        }
      });
    } else {
      navigation.navigate(Url);
      // setFilterList([{ id: 0, Filtername: "Date: َAll", Icon: "calendar-month" },
      //   { id: 1, Filtername: "Status", Icon: "checkbox-marked-circle-outline" }, {
      //     id: 2,
      //     Filtername: "Normal",
      //     Icon: "podium",
      //   }]);
      // setColorChange(false);
      // setColorChangestatus(GLOBAL.OFFICIAL_WITE_COLOR)
      // setColorChangePriority(GLOBAL.OFFICIAL_WITE_COLOR)
      GLOBAL.FilterList=modules
        GLOBAL.List=MudolList
    }
  };
  const _showModalDelete = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDelete}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDelete(false)}
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
  const Update_Off = async (taskId) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled" };
    writeDataStorage(GLOBAL.All_Task, markers_List);
    My_TaskList();
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId)
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = { ...markers_Listdetail[index_detail], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled" };
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);

  };
  const Update_Off_Reopen = async (taskId,reasonDescription) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: "#ff4545", taskStatusName: "Reopen",taskDescription:reasonDescription};
    writeDataStorage(GLOBAL.All_Task, markers_List);
    My_TaskList();
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId)
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = { ...markers_Listdetail[index_detail], taskStatusColor: "#ff4545", taskStatusName: "Reopen",taskDescription:reasonDescription};
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);
  };
  const Update_Off_Assigned = async (taskId) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: "#0000FF", taskStatusName: "Completed" };
    writeDataStorage(GLOBAL.Assigned_TaskList, markers_List);
    Assigned_TaskList();
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId)
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = { ...markers_Listdetail[index_detail], taskStatusColor: "#0000FF", taskStatusName: "Completed" };
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);
  };

  const renderItem = ({ item, index }) => (
    <Task_management_Item data={GLOBAL?.selectItem === 1 ? data : dataassigned} data2={data2} index={index} key={index}
                          modules={modules?.length} My_TaskList={My_TaskList} dataassigned2={dataassigned2}
                          Assigned_TaskList={Assigned_TaskList} Update_Off_Reopen={Update_Off_Reopen}
                          value={item} Navigate_Url={Navigate_Url} Cheked={Cheked} Update_Off={Update_Off}
                          Taskpriority={Taskpriority} My_TaskList_server={My_TaskList_server}
                          Assigned_TaskList_server={Assigned_TaskList_server} Update_Off_Assigned={Update_Off_Assigned}
                          DeleteImage={DeleteImage} Taskstatus={Taskstatus} DeleteAttachment={DeleteAttachment}
                          ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                          ShowBackBtn={ShowBackBtn} setShowBackBtn={setShowBackBtn}
                          setshowModalReject={setshowModalReject} data3={data3} reasons={reasons}
    />
  );

  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const Reject_Task = (value) => {
    setshowModalReject(false);
  };
  const Task_status = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_status + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let D = [];
        let Filter = {
          value: 10,
          label: "All",
          statusColorCode: "#bd04ae",
          Icon: "status",
        };
        let C = [];
        for (let item in json?.taskStatus) {
          let obj = json?.taskStatus?.[item];
          D.push({
            value: obj.statusId,
            label: obj.statusTitle,
            statusColorCode: obj.statusColorCode,
            Icon: "status",
          });
        }

        C = [Filter, ...D];
        setTaskstatus(D);
        setTaskstatusfilter(C);

        writeDataStorage(GLOBAL.Task_status, json);
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_status));
      let D = [];
      let Filter = {
        value: 10,
        label: "All",
        statusColorCode: "#bd04ae",
        Icon: "status",
      };
      let C = [];
      for (let item in json?.taskStatus) {
        let obj = json?.taskStatus?.[item];
        D.push({
          value: obj.statusId,
          label: obj.statusTitle,
          statusColorCode: obj.statusColorCode,
          Icon: "status",
        });
      }
      setTaskstatus(D);
      C = [Filter, ...D];
      setTaskstatusfilter(C);
    }
  };
  const Task_priority = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_priority + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let A = [];
        let Filter = {
          value: 10,
          label: "All",
          taskPriorityColor: "#bd04ae",
          Icon: "prioriti",
        };
        let C = [];
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
            Icon: "prioriti",
          });
        }
        writeDataStorage(GLOBAL.priorities, json);
        setTaskpriority(A);
        C = [Filter, ...A];
        setTaskpriorityfilter(C);
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.priorities));
      let Filter = {
        value: 10,
        label: "All",
        taskPriorityColor: "#bd04ae",
        Icon: "prioriti",
      };
      let C = [];
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
          Icon: "prioriti",
        });
      }

      setTaskpriority(A);
      C = [Filter, ...A];
      setTaskpriorityfilter(C);
    }
  };
  const My_TaskList_server = async () => {

    const date = new Date();
    const Day = date.getDate();
    const Month = date.getMonth();
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList + `userId=1`).then(json => {
        for (let item in json?.tasks) {
          let obj = json?.tasks?.[item];
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
            taskUpdated: obj?.taskUpdated,
            taskRequestNotes:obj?.taskRequestNotes,
            taskFeedback:obj?.taskFeedback

          });
        }
        writeDataStorage(GLOBAL.All_Task, json?.tasks);

        if (A?.length !== 0) {
          A?.sort(dateComparison_data);
          setMudolList(A);
          Make_Week_Filter_List(A);

          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true) {
            setDateAll(GLOBAL.FilterTime_name);
            setStatusAll(GLOBAL.FilterStatus_name);
            setpriorityAll(GLOBAL.FilterPriority_name);
            if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterPriority_name==="All"&&GLOBAL.FilterStatus_name==="All"){
              setmodules(A);
            }
            else  if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name&&p?.taskStatusName === GLOBAL.FilterStatus_name));

            }
            else  if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name==="All"){
              setmodules(A?.filter((p) => p?.taskStatusName === GLOBAL.FilterStatus_name));
            }
            else  if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name==="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1&& p?.taskPriorityName === GLOBAL.FilterPriority_name));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name==="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1&& p?.taskStatusName === GLOBAL.FilterStatus_name));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1&& p?.taskStatusName === GLOBAL.FilterStatus_name&& p?.taskPriorityName === GLOBAL.FilterPriority_name));
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name==="All"){
              SortByWeek( GLOBAL.selectedRange.firstDate,  GLOBAL.selectedRange.secondDate)
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name!=="All"){
              FilterWeekstatus   ()
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name==="All"){
              FilterWeekPriority()
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name!=="All"){
              FilterWeek();
            }
          }
          else {
            setmodules(A?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          }
        }
        else
        {
          setmodules("");
        }
      });
    }
  };
  const Assigned_TaskList_server = async () => {
    if (GLOBAL.isConnected === true) {
      let A = [];
      let taskStatusName=''
      readOnlineApi(Api.Assigned_TaskList + `userId=1`).then(json => {

        for (let item in json?.tasks) {
          let obj = json?.tasks?.[item];
          let taskPriorityColor = "";
          const Year = obj?.taskCreatedOn.split(" ");
          const taskPlanStar = obj?.taskPlanStartDate.split(" ");
          const taskPlanDue = obj?.taskPlanDueDate.split(" ");
          const Day = Year?.[0]?.split("-");
          const W = Day?.[2]?.split(" ");

          if (obj?.taskPriorityName === "Low")
            taskPriorityColor = "#fcd274";
          else if(obj?.taskPriorityName === "Medium")
            taskPriorityColor = "#fefe77";
          else
            taskPriorityColor = "#d2fd77";
          if (obj.taskStatusName==='Accepted')
            taskStatusName='In Progress'
          else
            taskStatusName=obj.taskStatusName
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
            taskStatusName:taskStatusName,
            Year: Year?.[0],
            WeekDay: getDayOfWeek(Year?.[0]),
            Day: W?.[0],
            Month: Day?.[1],
            taskPriorityColor: taskPriorityColor,
            taskUpdated: obj?.taskUpdated,
            attachments: obj?.attachments,
            taskRequestNotes:obj?.taskRequestNotes,
            taskFeedback:obj?.taskDescription,
            Format_Dates_StartDate:new Date(obj?.taskPlanStartDate),
            Format_Dates_DueDate:new Date(obj?.taskPlanDueDate)
          });
        }
        if (A?.length !== 0) {

          const date = new Date();
          const Day = date.getDate();
          const Month = date.getMonth();
          A?.sort(dateComparison_data);
          setMudolList(A);
          Make_Week_Filter_List(A);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true) {
            setDateAll(GLOBAL.FilterTime_name);
            setStatusAll(GLOBAL.FilterStatus_name);
            setpriorityAll(GLOBAL.FilterPriority_name);
            if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterPriority_name==="All"&&GLOBAL.FilterStatus_name==="All"){
              setmodules(A);
            }
            else  if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name&&p?.taskStatusName === GLOBAL.FilterStatus_name));

            }
            else  if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name==="All"){
              setmodules(A?.filter((p) => p?.taskStatusName === GLOBAL.FilterStatus_name));
            }
            else  if(GLOBAL.FilterTime_name==="All"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name));

            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name==="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1&& p?.taskPriorityName === GLOBAL.FilterPriority_name));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name==="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1&& p?.taskStatusName === GLOBAL.FilterStatus_name));
            }
            else  if(GLOBAL.FilterTime_name==="Today"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name!=="All"){
              setmodules(A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1&& p?.taskStatusName === GLOBAL.FilterStatus_name&& p?.taskPriorityName === GLOBAL.FilterPriority_name));
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name==="All"){
              SortByWeek( GLOBAL.selectedRange.firstDate,  GLOBAL.selectedRange.secondDate)
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name==="All"&&GLOBAL.FilterPriority_name!=="All"){
              FilterWeekstatus   ()
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name==="All"){
              FilterWeekPriority()
            }
            else  if(GLOBAL.FilterTime_name==="Week"&&GLOBAL.FilterStatus_name!=="All"&&GLOBAL.FilterPriority_name!=="All"){
              FilterWeek();
            }
          }
          else {
            setmodules(A.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll));
          }
        } else {
          setmodules("");
        }
        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);

      });
    }
  };

  const Delete_Task_Offline = async (attachmentId, taskId) => {
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
    let Find_attachments = List_Item?.find((p) => p.taskId === taskId)?.attachments;
    let index_attachments = Find_attachments?.findIndex((p) => p.attachmentId === attachmentId);
    Find_attachments?.splice(index_attachments, 1);
    let index = List_Item?.findIndex((p) => p.taskId === taskId);
    A[index] = { ...A[index], attachments: Find_attachments };
    List_Item = A;
    let Find_attachments_detail = List_Item_detail?.find((p) => p.taskId === taskId)?.attachments;
    let index_attachments_detail = Find_attachments_detail?.findIndex((p) => p.attachmentId === attachmentId);
    Find_attachments_detail?.splice(index_attachments_detail, 1);
    let index_detail = List_Item_detail?.findIndex((p) => p.taskId === taskId);
    B[index_detail] = { ...B[index_detail], attachments: Find_attachments };
    List_Item_detail = B;
    let Find_attachments_List = List_attachments?.filter((p) => p.taskId === taskId);
    let index_attachments_detail_List = Find_attachments_List?.findIndex((p) => p.attachmentId === attachmentId);
    Find_attachments_List?.splice(index_attachments_detail_List, 1);
    List_attachments = [...List_attachments?.filter((p) => p.taskId !== taskId), ...Find_attachments_List];
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    My_TaskList();
  };

  const Delete_AssignedTask_Offline = async (attachmentId, taskId) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
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
    let Find_attachments = List_Item?.find((p) => p.taskId === taskId)?.attachments;
    let index_attachments = Find_attachments?.findIndex((p) => p.attachmentId === attachmentId);
    Find_attachments?.splice(index_attachments, 1);
    let index = List_Item?.findIndex((p) => p.taskId === taskId);
    A[index] = { ...A[index], attachments: Find_attachments };
    List_Item = A;
    let Find_attachments_detail = List_Item_detail?.find((p) => p.taskId === taskId)?.attachments;
    let index_attachments_detail = Find_attachments_detail?.findIndex((p) => p.attachmentId === attachmentId);
    Find_attachments_detail?.splice(index_attachments_detail, 1);
    let index_detail = List_Item_detail?.findIndex((p) => p.taskId === taskId);
    B[index_detail] = { ...B[index_detail], attachments: Find_attachments };
    List_Item_detail = B;
    let Find_attachments_List = List_attachments?.filter((p) => p.taskId === taskId);
    let index_attachments_detail_List = Find_attachments_List?.findIndex((p) => p.attachmentId === attachmentId);
    Find_attachments_List?.splice(index_attachments_detail_List, 1);
    List_attachments = [...List_attachments?.filter((p) => p.taskId !== taskId), ...Find_attachments_List];
    await AsyncStorage.setItem(GLOBAL.Assigned_TaskList, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    Assigned_TaskList();
  };
  const DeleteImage = (uri) => {
    let List_Item = ImageSourceviewarray;
    const index = List_Item.findIndex((p) => p.uri === uri);
    let markers = [...List_Item];
    markers?.splice(index, 1);
    setImageSourceviewarray(markers);
  };
  const FilterFunc = (id, label) => {
    GLOBAL.FilterTime=true

    setDateAll(label);
    let index = 0;
    let markers = [...FilterList];
    markers[index] = { ...markers[index], Filtername: "Date: َAll" };
    setShowDateRange(false);
    setFilterList(markers);
    if (id === 0) {
      if (StatusAll === "All" && priorityAll === "All") {
        setmodules(MudolList);
      } else if (StatusAll !== "All" && priorityAll !== "All") {

        if(CurrentStatus==='') {
          if (GLOBAL.selectItem === 1)
            setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll &&p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          else
            setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll));
        }
        else
        setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll));
      }
    } else if (id === 1) {
      setshowModalCalender(true);
      let index = 0;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    } else if (id === 2) {
      let index = 0;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth();
      let A = [];
      if (priorityAll !== "All" && StatusAll !== "All") {

        if(CurrentStatus==='') {
          if (GLOBAL.selectItem === 1)
            A = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled" && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
          else
            A = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        }
        else
        A = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      }      else {

        A = MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      }
      setmodules(A);
    }
  };
  const FilterFuncStatus = (id, label) => {
    GLOBAL.FilterStatus=true
    setCurrentStatus(label)
    setStatusAll(label);
    if (id === 10) {
      setShowDateRange(false);
      if (priorityAll === "All" && DateAll === "All") {
        setmodules(MudolList);
      }
      else if (DateAll === "Today" && priorityAll !== "All")
      {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();

        setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
      }
      else if (DateAll === "Today" && priorityAll === "All")
      {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();

        setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
      }
      else if (DateAll === "Week" && priorityAll !== "All") {

        FilterWeekstatus();
      } else if (DateAll === "Week" && priorityAll === "All") {

        SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
      }
      else if (DateAll === "All" && priorityAll !== "All"){

        setmodules(MudolList?.filter((p) =>p?.taskPriorityName === priorityAll))

      }
      let index = 1;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    }
    else {
      if (DateAll === "Today" && priorityAll !== "All") {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        A = A?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === label && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        setmodules(A);

      }
      if (DateAll === "Today" && priorityAll === "All") {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        A = A?.filter((p) => p?.taskStatusName === label && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        setmodules(A);

      }
      else if (DateAll === "Week" && priorityAll !== "All") {

        FilterWeek();
      } else if (DateAll === "Week" && priorityAll === "All") {

        FilterWeekPriority();
      }
      else if (priorityAll === "All" && DateAll === "All") {

        A = MudolList?.filter((p) => p?.taskStatusName === label);
        setmodules(A);

      }
      else if (priorityAll !== "All" && DateAll === "All") {

        A = MudolList?.filter((p) => p?.taskStatusName === label && p?.taskPriorityName === priorityAll);
        setmodules(A);


      }
      let index = 1;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);

    }
  };
  const FilterWeek = async () => {

    await SortByWeek(selectedRange.firstDate, selectedRange.secondDate);

    if(CurrentStatus==='') {
      if (GLOBAL.selectItem === 1)
        A = modules?.filter((p) => p?.taskPriorityName === priorityAll);
      else
        A = modules?.filter((p) => p?.taskPriorityName === priorityAll);

    }
    else
    A = modules?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll);
    setmodules(A);

  };
  const FilterWeekstatus = async () => {

    await SortByWeek(selectedRange.firstDate, selectedRange.secondDate);

    setmodules(modules?.filter((p) => p?.taskPriorityName === priorityAll));

  };
  const FilterWeekPriority = async () => {

    await SortByWeek(selectedRange.firstDate, selectedRange.secondDate);

    if(CurrentStatus==='') {
        setmodules(modules);
    }
    else
    setmodules(modules?.filter((p) => p?.taskStatusName === StatusAll));

  };
  const FilterFuncPriority = (id, label) => {
    setpriorityAll(label);
    GLOBAL.FilterPriority=true

    if (id === 10) {
      setShowDateRange(false);
      if (StatusAll === "All" && DateAll === "All" && label === "All") {
        setmodules(MudolList);
      }
      else if (DateAll === "Today" && StatusAll !== "All") {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        if(CurrentStatus==='') {
          if (GLOBAL.selectItem === 1)
            setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          else
            setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
        }
        else
          setmodules(MudolList?.filter((p)=> p?.taskStatusName === StatusAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));

      }
      else if (DateAll === "Today" && StatusAll === "All") {

        const date  = new Date();
        const Day   = date.getDate();
        const Month = date.getMonth();
        setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));

      }
      else if (DateAll === "Week" && StatusAll !== "All") {

        FilterWeekPriority();
      }
      else if (DateAll === "Week" && StatusAll === "All") {

        SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
      }
      else if (DateAll === "All" && StatusAll !== "All"){

        if(CurrentStatus==='') {
          if (GLOBAL.selectItem === 1)
            setmodules(MudolList?.filter((p) =>  p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          else
            setmodules(MudolList);
        }
        else
        setmodules(MudolList?.filter((p) =>p?.taskStatusName === StatusAll))

      }
      let index = 2;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    }
    else {
      if (DateAll === "Today" && StatusAll !== "All") {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        if(CurrentStatus==='') {
          if (GLOBAL.selectItem === 1)
          A = A?.filter((p) => p?.taskPriorityName === label &&  p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled" && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        else
            A = A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);

        }
        else
        A = A?.filter((p) => p?.taskPriorityName === label && p?.taskStatusName === StatusAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        setmodules(A);

      }
      if (DateAll === "Today" && StatusAll === "All") {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        A = A?.filter((p) => p?.taskPriorityName === label && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        setmodules(A);


      }
      else if (DateAll === "Week" && StatusAll !== "All") {

        FilterWeek();
      } else if (DateAll === "Week" && StatusAll === "All") {

        FilterWeekPriority();
      } else if (StatusAll === "All" && DateAll === "All" && label !== "All") {

        A = MudolList?.filter((p) => p?.taskPriorityName === label);
        setmodules(A);


      } else if (StatusAll !== "All" && DateAll === "All" && label !== "All") {

        if(CurrentStatus==='') {
          if (GLOBAL.selectItem === 1)
            A =MudolList?.filter((p) => p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled" && p?.taskPriorityName === label);
          else
            A = MudolList?.filter((p) =>  p?.taskPriorityName === label);

        }
        else
        A = MudolList?.filter((p) => p?.taskStatusName === StatusAll && p?.taskPriorityName === label);
        setmodules(A);


      }
      let index = 2;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);

    }
  };
  const FilterFunc1 = (id) => {
    if (id === 0) {
      setDateItems(!DateItems);
      setPriority(false);
      setStatus(false);
    } else if (id === 1) {
      setStatus(!Status);
      setDateItems(false);
      setPriority(false);
    } else if (id === 2) {
      setPriority(!Priority);
      setDateItems(false);
      setStatus(false);
    }
  };


  const renderSectionHeader = () => (
    <>
      {showWarning === true && <Warningmessage />}
      {
        modules !== "" && <TouchableOpacity onPress={() => setvisibleguide(!visibleguide)}>
          <AntDesign name={"infocirlce"} size={20} color={GLOBAL.OFFICIAL_ORANGE_COLOR} />
        </TouchableOpacity>
      }
      {modules !== "" ?
        <View style={Styles.FilterBoxtask}>
          {FilterList?.map((value, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                setSelectItem(value.id);
                FilterFunc1(value.id);
              }} style={[Styles.FilterBoxItemsSelecttasl]}>

                {
                  value.id === 0 ?
                    <MaterialCommunityIcons name={value.Icon} size={20}
                                            color={GLOBAL.OFFICIAL_WITE_COLOR} /> :
                    value.id === 1 ?
                      <View style={[Styles.btntaskCircel, { backgroundColor: ColorChangestatus }]} /> :
                      <View style={[Styles.triangle, { borderBottomColor: ColorChangePriority }]} />
                }
                {
                  value.id === 0 ?
                    <Text
                      style={Styles.txtCenter_filter}>
                      {value.Filtername}
                    </Text> :
                    value.id === 1 ?
                      <Text
                        style={[Styles.txtCenter_filter, { color: ColorChangestatus }]}>
                        {value.Filtername}
                      </Text> :
                      <Text
                        style={[Styles.txtCenter_filter, { color: ColorChangePriority }]}>
                        {value.Filtername}
                      </Text>
                }
              </TouchableOpacity>
            );
          })}
        </View>
        : null
      }
      {
        DateItems === true &&
        <View style={Styles.FilterBoxtask}>
          {
            FilterTimeList.map((value, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {
                  setSelectDetailItem(value.value);
                  setShowDateRange(false);
                  setColorChange(false);
                  setDateItems(false);
                  FilterFunc(value?.value, value.label);
                  GLOBAL.FilterTime_name=value.label
                }}
                 style={[SelectDetailItem === value.value ? Styles.FilterBoxItemsSelecttasl : Styles.FilterBoxItemstask]}>
                  <MaterialCommunityIcons name={value.Icon} size={20}
                                          color={SelectDetailItem === value.value ? GLOBAL.OFFICIAL_WITE_COLOR : GLOBAL.OFFICIAL_background} />
                  <Text style={[SelectDetailItem === value.value ? [Styles.txtCenter_filter] : Styles.txtCenter]}>
                    {value.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      }
      {
        Status === true &&
        <View style={Styles.FilterBoxtask}>
          {
            Taskstatusfilter.map((value, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {
                  setSelectDetailItemStatus(value.value);
                  FilterFuncStatus(value?.value, value.label);
                  setColorChangestatus(value.statusColorCode);
                  setStatus(false);
                  GLOBAL.FilterStatus_name=value.label
                }}
                                  style={[SelectDetailItemStatus === value.value ? Styles.FilterBoxItemsSelecttasl : Styles.FilterBoxItemstask]}>
                  <View style={[Styles.btntask, { backgroundColor: value.statusColorCode }]} />
                  <Text style={[SelectDetailItemStatus === value.value ? [Styles.txtCenter_filter] : Styles.txtCenter]}>
                    {value.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      }
      {
        Priority === true &&
        <View style={Styles.FilterBoxtask}>
          {
            Taskpriorityfilter.map((value, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {
                  setSelectDetailItemPriority(value.value);
                  FilterFuncPriority(value?.value, value.label);
                  setColorChangePriority(value.taskPriorityColor);
                  setPriority(false);
                  GLOBAL.FilterPriority_name=value.label;
                }}
                  style={[SelectDetailItemPriority === value.value ? Styles.FilterBoxItemsSelecttasl : Styles.FilterBoxItemstask]}>
                  <View style={[Styles.triangle, { borderBottomColor: value.taskPriorityColor }]} />
                  <Text
                    style={[SelectDetailItemPriority === value.value ? [Styles.txtCenter_filter] : Styles.txtCenter]}>
                    {value.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
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
    let Filter = "";
    if (priorityAll !== "All" && StatusAll !== "All") {
      if(CurrentStatus==='') {
        if (GLOBAL.selectItem === 1)
        Filter = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled");
        else
          Filter = MudolList?.filter((p) => p?.taskPriorityName === priorityAll);
      }
      else
        Filter = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll);
    }
    else
      Filter = MudolList;
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
            Week ending
          </Text>
        </View>
        <View style={Styles.Calender}>
          {
            DateRangeList.map((value, index) => {
              return (
                <TouchableOpacity onPress={() => {
                  SortByWeek(value.startDate, value.endDate);
                  setRange({ firstDate: value.startDate, secondDate: value.endDate });
                  GLOBAL.selectedRange={ firstDate: value.startDate, secondDate: value.endDate }
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
  const DeleteAttachment = async (attachmentId, taskId) => {
    const formData = new FormData();
    formData.append("userId", "1");
    formData.append("attachmentId", attachmentId);
    writePostApi("POST", Api.DeleteAttachment, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          if (GLOBAL?.selectItem === 1)
            My_TaskList_server();
          else
            Assigned_TaskList_server();
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      } else {
        if (GLOBAL?.selectItem === 1)
          Delete_Task_Offline(attachmentId, taskId);
        else
          Delete_AssignedTask_Offline(attachmentId, taskId);
        setMessage("Your attachment successfully deleted.");
        setShowMessage(true);
        if (GLOBAL?.selectItem === 1)
          My_TaskList_server();
        else
          Assigned_TaskList_server();
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 2000);
        return () => clearInterval(timerId);
      }
    });
  };

  const _showModalReject = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalReject}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalReject(false)}
          transparent={true}>
          {renderModalContentReject()}
        </Modal>
      </View>
    );
  };
  const renderModalContentReject = () => (
    <View style={Styles.TaskModalTotalStyle}>
      <View style={Styles.DeleteModalStyle2}>
        <View style={[{ width: "89%" }]}>
          <TouchableOpacity onPress={() => {
            setshowModalReject(false);
          }} style={Styles.CancelBtnLeftAlign}>
            <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <TextInputI onChangeText={(value) => {
          Reject_Task(value);
        }} numberValue={27} setshowModalReject={setshowModalReject}
                    ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked}
                    tittlebtn={"Send"}
        />
      </View>
    </View>
  );
  const Go_Back=()=>{
      GLOBAL.FilterTime=false;
      GLOBAL.FilterStatus=false;
      GLOBAL.FilterPriority=false;
      GLOBAL.FilterList=[];
      GLOBAL.List=[];
      GLOBAL.FilterTime_name='All';
      GLOBAL.FilterStatus_name='All';
      GLOBAL.FilterPriority_name='Normal';
      goBack()
  }
  return (
    <>

      <Container style={[Styles.Backcolor]}>
        <Header colors={["#a39898", "#786b6b", "#382e2e"]} StatusColor={"#a39897"} onPress={Go_Back}
                Title={GLOBAL.TaskMenuName} />
        {
          showModalDelete &&
          <View>
            {
              _showModalDelete()
            }
          </View>
        }
        {
          showModalReject &&
          <View>
            {
              _showModalReject()
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
            { flexGrow: 1, backgroundColor: "rgba(0,0,0, 0.5)", justifyContent: "center" }]}>
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
                      Taskstatus?.map((value, index) => {
                        return (
                          <View key={index} style={Styles.BtnListStyle2}>
                            <View style={[Styles.btntask, { backgroundColor: value?.statusColorCode }]} />
                            <Text style={[Styles.txt_left]}>{value?.label}</Text>
                          </View>
                        );
                      })}
                  </View>
                </View>
                <View style={Styles.guide}>
                  <View style={Styles.guideItem}>
                    <Text style={[Styles.txt_left]}>Priority</Text>
                  </View>
                  <View style={Styles.guideItembox}>
                    {
                      Taskpriority?.map((value, index) => {
                        return (
                          <View key={index} style={Styles.BtnListStyle2}>
                            <View style={[Styles.triangle, { borderBottomColor: value.taskPriorityColor }]} />
                            <Text style={Styles.txt_left}>{value?.label}</Text>
                          </View>
                        );
                      })}
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
