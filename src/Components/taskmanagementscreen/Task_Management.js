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
import { LogOutModal } from "../component/LogOutModal";
import { Warningmessage } from "../component/Warningmessage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInputI } from "../component/TextInputI";
import { isNetworkConnected } from "../GlobalConnected";
import { Dropdown } from "react-native-element-dropdown";

const GLOBAL = require("../Global");
const Api = require("../Api");
let A = [];
const data2 = [];
const dataassigned = [];
const data3 = [{ label: "Reopen", value: "5", Icon: "retweet" }];

function Task_Management({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [DateAll, setDateAll] = useState("All");
  const [StatusAll, setStatusAll] = useState("Status");
  const [priorityAll, setpriorityAll] = useState("Normal");
  const [CurrentStatus, setCurrentStatus] = useState("");
  const [selectedRelated, setselectedRelated] = useState("");
  const [selectedSite, setselectedSite] = useState("");
  const [selectedUnit, setselectedUnit] = useState("");
  const [showModalCalender, setshowModalCalender] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [ShowDateRange, setShowDateRange] = useState(false);
  const [DateRangeList, setDateRangeList] = useState([]);
  const [MudolList, setMudolList] = useState([]);
  const [Taskpriority, setTaskpriority] = useState([]);
  const [Taskstatus, setTaskstatus] = useState([]);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [visiblFilter, setvisiblFilter] = useState(false);
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
  const [ColorChangestatus, setColorChangestatus] = useState("#fff");
  const [ColorChangePriority, setColorChangePriority] = useState("#008000");
  const [showModalReject, setshowModalReject] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [TaskRelated, setTaskRelated] = useState([]);
  const [Taskcategory, setTaskcategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setcategoryName] = useState("");
  const [FilterTimeList, setFilterTimeList] = useState([{ value: 0, label: "All", Icon: "calendar-month" },
    { value: 1, label: "Week", Icon: "calendar-week" }, { value: 2, label: "Today", Icon: "calendar-today" }]);
  const [FilterList, setFilterList] = useState([{ id: 0, Filtername: "Date: َAll", Icon: "calendar-month" },
    { id: 1, Filtername: "Status", Icon: "checkbox-marked-circle-outline" }, {
      id: 2,
      Filtername: "Normal",
      Icon: "podium",
    }, { id: 3, Filtername: "Category", Icon: "feature-search-outline" }]);
  const [reasons, setreasons] = useState([]);
  const [RelatedNameList, setRelatedNameList] = useState([]);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState("");
  const [selectedrelatedname, setselectedrelatedname] = useState("");
  const [SiteList, setSiteList] = useState([]);
  const [unitList, setunitList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [featureList, setfeatureList] = useState([]);
  const [selectedrelated, setSelectedrelated] = useState("");
  const [relatedId, setRelatedId] = useState(0);
  const [TaskProjectId, setTaskProjectId] = useState("");
  const [TaskSiteId, setTaskSiteId] = useState("");
  const [TaskunitId, setTaskunitId] = useState("");
  const [TasksectionId, setTasksectionId] = useState("");
  const [TaskfeatureId, setTaskfeatureId] = useState("");
  const [selectedTaskSiteName, setselectedTaskSiteName] = useState("");
  const [selectedunitName, setselectedunitName] = useState("");
  const [selectedsectionName, setselectedsectionName] = useState("");
  const [selectedfeatureName, setselectedfeatureName] = useState("");
  const [categoryEntityShow, setcategoryEntityShow] = useState('n');
  const [categoryLevellist, setcategoryLevellist] = useState([]);
  const [categoryLevel, setcategoryLevel] = useState('');
  const [RelatedNameLvalue, setRelatedNameLvalue] = useState('');
  useEffect(() => {

    const unsubscribe = navigation.addListener("focus", () => {
      setColorChangestatus(GLOBAL.header_backgroundColor)
      if (GLOBAL.selectItem === 1 && GLOBAL.TaskName === "") {
        My_TaskList();
      } else if (GLOBAL.selectItem === 2 && GLOBAL.TaskName === "") {
        Assigned_TaskList();
      } else if (GLOBAL.TaskName !== "") {
        getrelatedTask();
      }
    });
    Task_status();
    Task_priority();
    ReasonCodeReopen(7);
    Task_RelatedList();
    Task_category();
    // getSites();
    // getUnits();
    // getSection();
    // getFeatures();
    return unsubscribe;
  }, []);
///get task when come from projectstructure or DYb///
  const getrelatedTask = async () => {
    GLOBAL.TaskMenuName = GLOBAL.TaskName + " Tasks";
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList + `userId=${GLOBAL.UserInformation?.userId}&relatedName=${GLOBAL.RelatedName}&relatedId=${GLOBAL.RelatedId}&type=related`).then(json => {
        let Task_List = [];
        for (let item in json?.tasks) {
          let obj = json?.tasks?.[item];
          if (obj?.taskRelatedNameRef === GLOBAL.TaskName) {
            const Year = obj?.taskCreatedOn?.split(" ");
            const Day = Year?.[0]?.split("-");
            const W = Day?.[2]?.split(" ");
            let taskPriorityColor = "";
            if (obj?.taskPriorityName === "Low")
              taskPriorityColor = "#999999";
            else if (obj?.taskPriorityName === "High")
              taskPriorityColor = "#FF474D";
            else
              taskPriorityColor = "#008000";
            Task_List.push({
              taskId: obj.taskId,
              taskTitle: obj.taskTitle,
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
              taskUpdated: obj?.taskNotify,
              taskRelatedName: obj?.taskRelatedName,
              taskCategoryName: obj.taskCategoryName,
              taskRelatedNameRef: obj.taskRelatedNameRef,
              taskWorkType: obj.taskWorkType,
            });
          }
        }
        if (Task_List?.length !== 0) {
          Task_List?.sort(dateComparison_data);
          setMudolList(Task_List);
          Make_Week_Filter_List(Task_List);
          setmodules(Task_List?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
        } else {
          setmodules("");
        }

        writeDataStorage(GLOBAL.Related_Task, json?.tasks);
      });
    } else {
      let Task_List = [];
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Related_Task));
      for (let item in json) {
        let obj = json?.[item];
        if (obj?.taskRelatedNameRef === GLOBAL.TaskName) {
          const Year = obj?.taskCreatedOn?.split(" ");
          const Day = Year?.[0]?.split("-");
          const W = Day?.[2]?.split(" ");
          let taskPriorityColor = "";
          if (obj?.taskPriorityName === "Low")
            taskPriorityColor = "#999999";
          else if (obj?.taskPriorityName === "High")
            taskPriorityColor = "#FF474D";
          else
            taskPriorityColor = "#008000";
          Task_List.push({
            taskId: obj.taskId,
            taskTitle: obj.taskTitle,
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
            taskUpdated: obj?.taskNotify,
            taskRelatedName: obj?.taskRelatedName,
            taskCategoryName: obj.taskCategoryName,
            taskRelatedNameRef: obj.taskRelatedNameRef,
            taskWorkType: obj.taskWorkType,
          });
        }
      }
      if (Task_List?.length !== 0) {
        Task_List?.sort(dateComparison_data);
        setMudolList(Task_List);
        Make_Week_Filter_List(Task_List);
        setmodules(Task_List?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
      } else {
        setmodules("");
      }
    }
  };
  const getEntityInfo =async (categoryId,SearchId) => {
    return (
      readOnlineApi(Api.Task_Project+`userId=${GLOBAL.UserInformation?.userId}&categoryId=${categoryId}&relatedSearchId=${SearchId}`).then(json => {
        return json;
      }));


  };
  const getSites = async (TaskRelatedNameId,value,SubCategory_List) => {

    const json=await getEntityInfo(TaskRelatedNameId,value)
    let A = [];
    for (let item in json?.relatedList) {
      let obj = json?.relatedList?.[item];
      A.push({
        value: obj.relatedId,
        label: obj.relatedName,
      });
    }
    setSiteList(A);

    if(GLOBAL.TaskRelatedNameId!=='') {
      let seacrhId=A?.find(p =>p.label === GLOBAL.FilterSite_name)?.value
      const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='3')?.value
      setselectedTaskSiteName({
        label: A?.find(p => p.label === GLOBAL.FilterSite_name)?.label,
        value: A?.find(p => p.label === GLOBAL.FilterSite_name)?.value,
        _index: A?.findIndex(p => p.label === GLOBAL.FilterSite_name),
      });
      if(GLOBAL.TaskRelatedNameId==='1') {
        setRelatedId(A?.find(p => p.label === GLOBAL.FilterSite_name)?.value);
      }
      else {
        getUnits(categoryId,seacrhId,SubCategory_List)
      }
    }

  };
  const getUnits = async (categoryId,value,SubCategory_List) => {
    const json=await getEntityInfo(categoryId,value)
    let A = [];
    for (let item in json?.relatedList) {
      let obj = json?.relatedList?.[item];
      A.push({
        value: obj.relatedId,
        label: obj.relatedName,
      });
    }
    setunitList(A);

    //console.log(categoryId,'categoryId',seacrhId,'seacrhId')
    if (GLOBAL.TaskRelatedNameId !== "") {
      let seacrhId=A?.find(p =>p.label ===GLOBAL.FilterUnit_name)?.value;
      const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='4')?.value
      setselectedunitName({
        label: A?.find(p => p.label === GLOBAL.FilterUnit_name)?.label,
        value: A?.find(p => p.label === GLOBAL.FilterUnit_name)?.value,
        _index: A?.findIndex(p => p.label === GLOBAL.FilterUnit_name),
      });
      if (GLOBAL.TaskRelatedNameId === "2") {
        setRelatedId(A?.find(p => p.label === GLOBAL.FilterUnit_name)?.value);
      } else {

        getSection(categoryId,seacrhId,SubCategory_List);
      }
    }
  };
  const getSection = async (categoryId,value,SubCategory_List) => {
    const json=await getEntityInfo(categoryId,value)
    let A = [];
    for (let item in json?.relatedList) {
      let obj = json?.relatedList?.[item];
      A.push({
        value: obj.relatedId,
        label: obj.relatedName,
      });
    }
    setsectionList(A);
    if (GLOBAL.TaskRelatedNameId !== "") {
      let seacrhId=A?.find(p => p.label ===GLOBAL.FilterSection_name)?.value;
      const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='5')?.value
      setselectedsectionName({
        label: A?.find(p => p.label === GLOBAL.FilterSection_name)?.label,
        value: A?.find(p => p.label === GLOBAL.FilterSection_name)?.value,
        _index: A?.findIndex(p => p.label === GLOBAL.FilterSection_name),
      });
      if (GLOBAL.TaskRelatedNameId === "3") {
        setRelatedId(A?.find(p => p.label === GLOBAL.FilterSection_name)?.value);
      }
      else
        getFeatures(categoryId,seacrhId);
    }
  };
  const getFeatures = async (categoryId,value) => {
    const json=await getEntityInfo(categoryId,value)
    let A = [];
    for (let item in json?.relatedList) {
      let obj = json?.relatedList?.[item];
      A.push({
        value: obj.relatedId,
        label: obj.relatedName,
      });
    }
    setfeatureList(A);
      if (GLOBAL.TaskRelatedNameId === "4") {
        setselectedfeatureName({
          label: A?.find(p => p.label === GLOBAL.FilterFeature_name)?.label,
          value: A?.find(p => p.label === GLOBAL.FilterFeature_name)?.value,
          _index: A?.findIndex(p => p.label === GLOBAL.FilterFeature_name),
        });
        setRelatedId(A?.find(p => p.label === GLOBAL.FilterFeature_name)?.value);
      }
  };
  const Task_category = async () => {
    let Category_List = [];
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_category + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        for (let item in json?.categories) {
          let obj = json?.categories?.[item];
          Category_List.push({
            value: obj.categoryId,
            label: obj.categoryTitle,
            categoryEntityShow:obj.categoryEntityShow
          });
        }
        writeDataStorage(GLOBAL.Task_Category, json);
        setTaskcategory(Category_List);
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Category));
      for (let item in json?.categories) {
        let obj = json?.categories?.[item];
        Category_List.push({
          value: obj.categoryId,
          label: obj.categoryTitle,
          categoryEntityShow:obj.categoryEntityShow
        });
      }
      setTaskcategory(Category_List);
    }
  };
  const Task_RelatedList =async () => {
    let SubCategory_List =JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_SubCategory2))
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_Project + `userId=${GLOBAL.UserInformation?.userId}&categoryId=${1}`).then(json => {
        let RelatedList = [];
        for (let item in json?.relatedList) {
          let obj = json?.relatedList?.[item];
          RelatedList.push({
            value: obj.relatedId,
            label: obj.relatedName,
          });
        }
        setTaskRelated(RelatedList);
        writeDataStorage(GLOBAL.RelatedList, json);

        if(GLOBAL.TaskRelatedNameId!=='') {
          let seacrhId=A?.find(p =>parseInt(p.value) ===parseInt( GLOBAL.ProjectId))?.value
          const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='2')?.value
          setSelectedrelated({
            label: A?.find(p => p.label === GLOBAL.FilterProject_name)?.label,
            value: A?.find(p => p.label === GLOBAL.FilterProject_name)?.value,
            _index: A?.findIndex(p => p.label === GLOBAL.FilterProject_name),
          });
          if(GLOBAL.TaskRelatedNameId==='0') {
            setRelatedId(A?.find(p => p.value === GLOBAL.ProjectId)?.value);
          }
          else
            getSites(categoryId,seacrhId,SubCategory_List);
        }
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.RelatedList));
      let RelatedList = [];
      for (let item in json?.relatedList) {
        let obj = json?.relatedList?.[item];
        RelatedList.push({
          value: obj.relatedId,
          label: obj.relatedName,
        });
      }
      setTaskRelated(RelatedList);
      writeDataStorage(GLOBAL.RelatedList, json);
      if (GLOBAL.TaskRelatedNameId !== "") {
        setSelectedrelated({
          label: RelatedList?.find(p => p.label === GLOBAL.FilterProject_name)?.label,
          value: RelatedList?.find(p => p.label === GLOBAL.FilterProject_name)?.value,
          _index: RelatedList?.findIndex(p => p.label === GLOBAL.FilterProject_name),
        });
        if (GLOBAL.TaskRelatedNameId === "0") {
          setRelatedId(RelatedList?.find(p => p.label === GLOBAL.FilterProject_name)?.value);
        } else
          getSites(categoryId,seacrhId,SubCategory_List);
      }
    }
  };
  const ReasonCodeReopen = async (value) => {
    if (GLOBAL.isConnected === true) {
      fetch(Api.Reason_Code + `userId=${GLOBAL.UserInformation?.userId}&statusId=${value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(resp => {
        return resp.json();
      }).then(json => {
        let CodeReopen_List = [];
        json?.reasons?.forEach((obj) => {
          CodeReopen_List.push({
            label: obj?.reasonTitle,
            value: obj?.reasonId,
            reasonDescription: obj?.reasonDescription,
          });
        });
        setreasons(CodeReopen_List);
        writeDataStorage(GLOBAL.Reason_Code_Reopen, json?.reasons);
      }).catch(error => console.log("dd", error));
    } else {
      let Modules = await AsyncStorage.getItem(GLOBAL.Reason_Code_Reopen);
      let CodeReopen = [];
      Modules?.forEach((obj) => {
        CodeReopen.push({
          label: obj?.reasonTitle,
          value: obj?.reasonId,
          reasonDescription: obj?.reasonDescription,
        });
      });
      setreasons(CodeReopen);
    }
  };
  ///calculate Names of the days of the week///
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  };
  ///get user add task list from asyncStorage///
  const My_TaskList = async () => {
    if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
      setmodules(GLOBAL?.FilterList);
      setMudolList(GLOBAL.List);
      setDateAll(GLOBAL.FilterTime_name);
      setStatusAll(GLOBAL.FilterStatus_name);
      setpriorityAll(GLOBAL.FilterPriority_name);
      if (GLOBAL.TaskRelatedNameId !== "") {
        setCategoryId(GLOBAL.categoryId);
        setcategoryName({ label: "Subcontract", value: "1", _index: 0 });
        if (GLOBAL.TaskRelatedNameId === "5") {
          RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId);
          setselectedrelatedname({
            label: RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId)?.label,
            value: RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId)?.value,
            _index: RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId),
          });
          setTaskRelatedNameId(GLOBAL.TaskRelatedId);
        } else if (GLOBAL.TaskRelatedNameId === "0") {
          Task_RelatedList("1");
          setTaskRelatedNameId("0");
          setselectedrelatedname({ label: "Project", value: "0", _index: 0 });
        } else if (GLOBAL.TaskRelatedNameId === "1") {
          Task_RelatedList("1");
          setTaskRelatedNameId("1");
          setselectedrelatedname({ label: "Site", value: "1", _index: 1 });
        } else if (GLOBAL.TaskRelatedNameId === "2") {
          Task_RelatedList("1");
          setTaskRelatedNameId("2");
          setselectedrelatedname({ label: "Unit", value: "2", _index: 2 });

        } else if (GLOBAL.TaskRelatedNameId === "3") {
          Task_RelatedList("1");
          setTaskRelatedNameId("3");
          setselectedrelatedname({ label: "Section", value: "3", _index: 3 });

        } else if (GLOBAL.TaskRelatedNameId === "4") {
          Task_RelatedList("1");
          setTaskRelatedNameId("4");
          setselectedrelatedname({ label: "Feature", value: "4", _index: 4 });
        }
      }
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
      let Task_List = [];
      for (let item in json) {
        let obj = json?.[item];
        const Year = obj?.taskCreatedOn?.split(" ");
        const Day = Year?.[0]?.split("-");
        const W = Day?.[2]?.split(" ");
        let taskPriorityColor = "";
        if (obj?.taskPriorityName === "Low")
          taskPriorityColor = "#999999";
        else if (obj?.taskPriorityName === "High")
          taskPriorityColor = "#FF474D";
        else
          taskPriorityColor = "#008000";
        Task_List.push({
          taskId: obj.taskId,
          taskTitle: obj.taskTitle,
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
          taskUpdated: obj?.taskNotify,
          taskRelatedName: obj?.taskRelatedName,
          taskCategoryName: obj.taskCategoryName,
          taskRelatedNameRef: obj.taskRelatedNameRef,
          taskWorkType: obj.taskWorkType,
        });
      }
      if (Task_List?.length !== 0) {
        Task_List?.sort(dateComparison_data);
        // if(GLOBAL.TaskName!==''){
        //   setMudolList(Task_List);
        //   Make_Week_Filter_List(Task_List);
        //   setmodules(Task_List?.filter((p) => p?.taskRelatedNameRef === GLOBAL.TaskName));
        // }
        // else {
        setMudolList(Task_List);
        Make_Week_Filter_List(Task_List);
        setmodules(Task_List?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
        // }
      } else {
        setmodules("");
      }
    }
  };
  ///compare  arrays by date and sort According to Year///
  const dateComparison_data = (a, b) => {
    const date1 = new Date(a?.Year);
    const date2 = new Date(b?.Year);
    return date1 - date2;
  };
  /// sort date and make list by week by week///
  const Make_Week_Filter_List = (A) => {
    let Week_filter = [];
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
        Exist = Week_filter?.findIndex((p) => p.endDate === endDate_Format);
        if (Exist === -1) {
          Week_filter.push({
            startDate: obj?.Year?.split(" ")?.[0],
            endDate: endDate_Format,
          });
        }
      }
    });
    setDateRangeList(Week_filter);
  };
  ///get Technician task list from  asyncStorage///
  const Assigned_TaskList = async () => {
    if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
      setmodules(GLOBAL?.FilterList);
      setMudolList(GLOBAL.List);
      setDateAll(GLOBAL.FilterTime_name);
      setStatusAll(GLOBAL.FilterStatus_name);
      setpriorityAll(GLOBAL.FilterPriority_name);
      if (GLOBAL.TaskRelatedNameId !== "") {
        setCategoryId(GLOBAL.categoryId);
        setcategoryName({ label: "Subcontract", value: "1", _index: 0 });
        if (GLOBAL.TaskRelatedNameId === "5") {
          RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId);
          setselectedrelatedname({
            label: RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId)?.label,
            value: RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId)?.value,
            _index: RelatedNameList.findIndex((p) => p.value === GLOBAL.TaskRelatedId),
          });
          setTaskRelatedNameId(GLOBAL.TaskRelatedId);
        } else if (GLOBAL.TaskRelatedNameId === "0") {
          Task_RelatedList("1");
          setTaskRelatedNameId("0");
          setselectedrelatedname({ label: "Project", value: "0", _index: 0 });
        } else if (GLOBAL.TaskRelatedNameId === "1") {
          Task_RelatedList("1");
          setTaskRelatedNameId("1");
          setselectedrelatedname({ label: "Site", value: "1", _index: 1 });
        } else if (GLOBAL.TaskRelatedNameId === "2") {
          Task_RelatedList("1");
          setTaskRelatedNameId("2");
          setselectedrelatedname({ label: "Unit", value: "2", _index: 2 });
        } else if (GLOBAL.TaskRelatedNameId === "3") {
          Task_RelatedList("1");
          setTaskRelatedNameId("3");
          setselectedrelatedname({ label: "Section", value: "3", _index: 3 });
        } else if (GLOBAL.TaskRelatedNameId === "4") {
          Task_RelatedList("1");
          setTaskRelatedNameId("4");
          setselectedrelatedname({ label: "Feature", value: "4", _index: 4 });
        }
      }
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
      let Task_List = [];
      let taskStatusName = "";
      for (let item in json) {
        let obj = json?.[item];
        const Year = obj?.taskCreatedOn?.split(" ");
        const taskPlanStar = obj?.taskPlanStartDate?.split(" ");
        const taskPlanDue = obj?.taskPlanDueDate?.split(" ");
        const Day = Year?.[0]?.split("-");
        const W = Day?.[2]?.split(" ");
        let taskPriorityColor = "";
        if (obj?.taskPriorityName === "Low")
          taskPriorityColor = "#999999";
        else if (obj?.taskPriorityName === "High")
          taskPriorityColor = "#FF474D";
        else
          taskPriorityColor = "#008000";
        if (obj?.taskStatusName === "Accepted")
          taskStatusName = "In Progress";
        else
          taskStatusName = obj.taskStatusName;
        Task_List.push({
          taskId: obj.taskId,
          taskTitle: obj.taskTitle,
          taskPriorityName: obj.taskPriorityName,
          taskDescription: obj.taskDescription,
          taskParentTaskId: obj.taskParentTaskId,
          taskPlanStartDate: taskPlanStar?.[0],
          taskPlanDueDate: taskPlanDue?.[0],
          taskStatusColor: obj.taskStatusColor,
          taskCreatedOn: obj.taskCreatedOn,
          taskStatusName: taskStatusName,
          Year: Year?.[0],
          WeekDay: getDayOfWeek(Year?.[0]),
          Day: W?.[0],
          Month: Day?.[1],
          taskPriorityColor: taskPriorityColor,
          taskUpdated: obj?.taskNotify,
          attachments: obj?.attachments,
          taskRequestNotes: obj?.taskRequestNotes,
          taskFeedback: obj?.taskDescription,
          Format_Dates_StartDate: new Date(obj?.taskPlanStartDate),
          Format_Dates_DueDate: new Date(obj?.taskPlanDueDate),
          taskRelatedName: obj?.taskRelatedName,
          taskCategoryName: obj.taskCategoryName,
          taskRelatedNameRef: obj.taskRelatedNameRef,
          taskWorkType: obj.taskWorkType,
        });
      }
      if (Task_List?.length !== 0) {
        Task_List?.sort(dateComparison_data);
        // if(GLOBAL.TaskName!==''){
        //   setmodules(Task_List?.filter((p) => p?.taskRelatedNameRef === GLOBAL.TaskName));
        //   setMudolList(Task_List);
        //   Make_Week_Filter_List(Task_List);
        // }
        // else {
        setmodules(Task_List?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
        setMudolList(Task_List);
        Make_Week_Filter_List(Task_List);
        // }
      } else {
        setmodules("");
      }
    }
  };
  ///add new task button function///
  const handleSubmit = () => {
    if (modules?.length !== 0)
      GLOBAL.TaskId = parseInt(modules?.[modules?.length - 1]?.taskId) + 1;
    else
      GLOBAL.TaskId = 1;
    navigation.navigate("AddNewTask");
  };
  ///LogOut Function///
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
    if (Url === "ProfileStack") {
      navigation.navigate(Url);
    } else {
      navigation.navigate(Url);
      GLOBAL.FilterList = modules;
      GLOBAL.List = MudolList;
    }
  };
  ///update task when app is offline///
  const Update_Off = async (taskId) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled" };
    writeDataStorage(GLOBAL.All_Task, markers_List);
    My_TaskList();
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId);
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = {
      ...markers_Listdetail[index_detail],
      taskStatusColor: "#5a5a5a",
      taskStatusName: "Cancelled",
    };
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);
  };
  ///update task to reopen when app is offline///
  const Update_Off_Reopen = async (taskId, reasonDescription) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = {
      ...markers_List[index],
      taskStatusColor: "#ff4545",
      taskStatusName: "Reopen",
      taskDescription: reasonDescription,
    };
    writeDataStorage(GLOBAL.All_Task, markers_List);
    My_TaskList();
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId);
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = {
      ...markers_Listdetail[index_detail],
      taskStatusColor: "#ff4545",
      taskStatusName: "Reopen",
      taskDescription: reasonDescription,
    };
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);
  };
  ///Technician update task when app is offline///
  const Update_Off_Assigned = async (taskId) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: "#0000FF", taskStatusName: "Completed" };
    writeDataStorage(GLOBAL.Assigned_TaskList, markers_List);
    Assigned_TaskList();
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId);
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = {
      ...markers_Listdetail[index_detail],
      taskStatusColor: "#0000FF",
      taskStatusName: "Completed",
    };
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);
  };

  const renderItem = ({ item, index }) => (
    <Task_management_Item data={GLOBAL?.selectItem === 1 ? GLOBAL.Task_data : dataassigned} data2={data2} index={index}
                          key={index}
                          modules={modules?.length} My_TaskList={My_TaskList} dataassigned2={GLOBAL.Task_data_assigned}
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
        let status_List = [];
        let Filter = {
          value: 10,
          label: "All",
          statusColorCode: "#bd04ae",
          Icon: "status",
        };
        let status_List_Copy = [];
        for (let item in json?.taskStatus) {
          let obj = json?.taskStatus?.[item];
          status_List.push({
            value: obj.statusId,
            label: obj.statusTitle,
            statusColorCode: obj.statusColorCode,
            Icon: "status",
          });
        }
        status_List_Copy = [Filter, ...status_List];
        setTaskstatus(status_List);
        setTaskstatusfilter(status_List_Copy);
        writeDataStorage(GLOBAL.Task_status, json);
      });
    } else {

      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_status));
      let status_List = [];
      let Filter = {
        value: 10,
        label: "All",
        statusColorCode: "#bd04ae",
        Icon: "status",
      };
      let status_List_Copy = [];
      for (let item in json?.taskStatus) {
        let obj = json?.taskStatus?.[item];
        status_List.push({
          value: obj.statusId,
          label: obj.statusTitle,
          statusColorCode: obj.statusColorCode,
          Icon: "status",
        });
      }
      setTaskstatus(status_List);
      status_List_Copy = [Filter, ...status_List];
      setTaskstatusfilter(status_List_Copy);
    }
  };
  const Task_priority = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_priority + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let priority_List = [];
        let priority_List_copy = [];
        let Filter = {
          value: 10,
          label: "All",
          taskPriorityColor: "#bd04ae",
          Icon: "prioriti",
        };
        for (let item in json?.priorities) {
          let obj = json?.priorities?.[item];
          priority_List.push({
            value: obj.priorityId,
            label: obj.priorityTitle,
            taskPriorityColor: obj.priorityColor,
            Icon: "prioriti",
          });
        }
        writeDataStorage(GLOBAL.priorities, json);
        setTaskpriority(priority_List);
        priority_List_copy = [Filter, ...priority_List];
        setTaskpriorityfilter(priority_List_copy);
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.priorities));
      let Filter = {
        value: 10,
        label: "All",
        taskPriorityColor: "#bd04ae",
        Icon: "prioriti",
      };
      let priority_List = [];
      let priority_List_copy = [];
      for (let item in json?.priorities) {
        let obj = json?.priorities?.[item];
        let taskPriorityColor = "";
        if (obj?.priorityTitle === "Low")
          taskPriorityColor = "#fcd274";
        else if (obj?.priorityTitle === "Medium")
          taskPriorityColor = "#fefe77";
        else
          taskPriorityColor = "#d2fd77";
        priority_List.push({
          value: obj.priorityId,
          label: obj.priorityTitle,
          taskPriorityColor: taskPriorityColor,
          Icon: "prioriti",
        });
      }

      setTaskpriority(priority_List);
      priority_List_copy = [Filter, ...priority_List];
      setTaskpriorityfilter(priority_List_copy);
    }
  };
  const Task_subcategory =async (value) => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_subcategory + `userId=${GLOBAL.UserInformation?.userId}&categoryId=${value}`).then(json => {
        let A = [];
        for (let item in json?.subCategories) {
          let obj = json?.subCategories?.[item];
          A.push({
            value: obj.categoryId,
            label: obj.categoryTitle,
            categoryEntityShow:obj.categoryEntityShow,
            categoryLevel:obj.categoryLevel
          });
        }
        setRelatedNameList(A);
        writeDataStorage(GLOBAL.Task_SubCategory, json);
      })
    }
    else {
      let A=[]
      let json =JSON.parse( await AsyncStorage.getItem(GLOBAL.Task_SubCategory));
      for (let item in json?.subCategories) {
        let obj = json?.subCategories?.[item];
        A.push({
          value: obj.categoryId,
          label: obj.categoryTitle,
          categoryEntityShow:obj.categoryEntityShow,
          categoryLevel:obj.categoryLevel
        });
      }
      setRelatedNameList(A);
    }
  }
  ///get user add task list from server///
  const My_TaskList_server = async () => {
    const date = new Date();
    const Day = date.getDate();
    const Month = date.getMonth();
    let Task_List = [];
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
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
          Task_List.push({
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
            taskRequestNotes: obj?.taskRequestNotes,
            taskFeedback: obj?.taskFeedback,
          });
        }
        writeDataStorage(GLOBAL.All_Task, json?.tasks);
        if (Task_List?.length !== 0) {
          Task_List?.sort(dateComparison_data);
          setMudolList(Task_List);
          Make_Week_Filter_List(Task_List);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true) {
            setDateAll(GLOBAL.FilterTime_name);
            setStatusAll(GLOBAL.FilterStatus_name);
            setpriorityAll(GLOBAL.FilterPriority_name);
            if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterPriority_name === "All" && GLOBAL.FilterStatus_name === "All") {
              setmodules(Task_List);
            } else if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Task_List?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name && p?.taskStatusName === GLOBAL.FilterStatus_name));
            } else if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name === "All") {
              setmodules(Task_List?.filter((p) => p?.taskStatusName === GLOBAL.FilterStatus_name));
            } else if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Task_List?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name === "All") {
              setmodules(Task_List?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Task_List?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskPriorityName === GLOBAL.FilterPriority_name));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name === "All") {
              setmodules(Task_List?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskStatusName === GLOBAL.FilterStatus_name));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Task_List?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskStatusName === GLOBAL.FilterStatus_name && p?.taskPriorityName === GLOBAL.FilterPriority_name));
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name === "All") {
              SortByWeek(GLOBAL.selectedRange.firstDate, GLOBAL.selectedRange.secondDate);
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name !== "All") {
              FilterWeekstatus();
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name === "All") {
              FilterWeekPriority();
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name !== "All") {
              FilterWeek();
            }
          } else {
            setmodules(Task_List?.filter((p) => p?.taskPriorityName === "Normal" && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          }
        } else {
          setmodules("");
        }
      });
    }
  };
  ///get Technician task list from server///
  const Assigned_TaskList_server = async () => {
    if (GLOBAL.isConnected === true) {
      let Assigned_TaskList = [];
      let taskStatusName = "";
      readOnlineApi(Api.Assigned_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
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
          else if (obj?.taskPriorityName === "Medium")
            taskPriorityColor = "#fefe77";
          else
            taskPriorityColor = "#d2fd77";
          if (obj.taskStatusName === "Accepted")
            taskStatusName = "In Progress";
          else
            taskStatusName = obj.taskStatusName;
          Assigned_TaskList.push({
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
            taskStatusName: taskStatusName,
            Year: Year?.[0],
            WeekDay: getDayOfWeek(Year?.[0]),
            Day: W?.[0],
            Month: Day?.[1],
            taskPriorityColor: taskPriorityColor,
            taskUpdated: obj?.taskUpdated,
            attachments: obj?.attachments,
            taskRequestNotes: obj?.taskRequestNotes,
            taskFeedback: obj?.taskDescription,
            Format_Dates_StartDate: new Date(obj?.taskPlanStartDate),
            Format_Dates_DueDate: new Date(obj?.taskPlanDueDate),
          });
        }
        if (Assigned_TaskList?.length !== 0) {
          const date = new Date();
          const Day = date.getDate();
          const Month = date.getMonth();
          Assigned_TaskList?.sort(dateComparison_data);
          setMudolList(Assigned_TaskList);
          Make_Week_Filter_List(Assigned_TaskList);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true) {
            setDateAll(GLOBAL.FilterTime_name);
            setStatusAll(GLOBAL.FilterStatus_name);
            setpriorityAll(GLOBAL.FilterPriority_name);
            if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterPriority_name === "All" && GLOBAL.FilterStatus_name === "All") {
              setmodules(Assigned_TaskList);
            } else if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Assigned_TaskList?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name && p?.taskStatusName === GLOBAL.FilterStatus_name));
            } else if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name === "All") {
              setmodules(Assigned_TaskList?.filter((p) => p?.taskStatusName === GLOBAL.FilterStatus_name));
            } else if (GLOBAL.FilterTime_name === "All" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Assigned_TaskList?.filter((p) => p?.taskPriorityName === GLOBAL.FilterPriority_name));

            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name === "All") {
              setmodules(Assigned_TaskList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Assigned_TaskList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskPriorityName === GLOBAL.FilterPriority_name));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name === "All") {
              setmodules(Assigned_TaskList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskStatusName === GLOBAL.FilterStatus_name));
            } else if (GLOBAL.FilterTime_name === "Today" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name !== "All") {
              setmodules(Assigned_TaskList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskStatusName === GLOBAL.FilterStatus_name && p?.taskPriorityName === GLOBAL.FilterPriority_name));
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name === "All") {
              SortByWeek(GLOBAL.selectedRange.firstDate, GLOBAL.selectedRange.secondDate);
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name === "All" && GLOBAL.FilterPriority_name !== "All") {
              FilterWeekstatus();
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name === "All") {
              FilterWeekPriority();
            } else if (GLOBAL.FilterTime_name === "Week" && GLOBAL.FilterStatus_name !== "All" && GLOBAL.FilterPriority_name !== "All") {
              FilterWeek();
            }
          } else {
            setmodules(Assigned_TaskList.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll));
          }
        } else {
          setmodules("");
        }
        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);

      });
    }
  };
///delete task when app is offline///
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
  ///delete Technician task when app is offline///
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
  ///sort list by time =>id==0 means all ,id==1 means filter by week and id==2 means today ///
  const FilterFunc = (id, label) => {
    GLOBAL.FilterTime = true;
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
        if (CurrentStatus === "") {
          if (GLOBAL.selectItem === 1)
            setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          else
            setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll));
        } else
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
        if (CurrentStatus === "") {
          if (GLOBAL.selectItem === 1)
            A = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled" && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
          else
            A = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        } else
          A = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      } else {

        A = MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
      }
      setmodules(A);
    }
  };
  ///sort list by status ///
  const FilterFuncStatus = (id, label) => {
    GLOBAL.FilterStatus = true;
    setCurrentStatus(label);
    setStatusAll(label);
    if (id === 10) {
      setShowDateRange(false);
      if (priorityAll === "All" && DateAll === "All") {
        setmodules(MudolList);
      } else if (priorityAll !== "All" && DateAll === "All") {
        setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll));
      } else if (DateAll === "Today" && priorityAll !== "All") {
        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();

        setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
      } else if (DateAll === "Today" && priorityAll === "All") {
        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
      } else if (DateAll === "Week" && priorityAll !== "All") {
        FilterWeekstatus();
      } else if (DateAll === "Week" && priorityAll === "All") {

        SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
      } else if (DateAll === "All" && priorityAll !== "All") {
        setmodules(MudolList?.filter((p) => p?.taskPriorityName === priorityAll));
      }
      let index = 1;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    } else {
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
      } else if (DateAll === "Week" && priorityAll !== "All") {
        FilterWeek();
      } else if (DateAll === "Week" && priorityAll === "All") {
        FilterWeekPriority();
      } else if (priorityAll === "All" && DateAll === "All") {
        A = MudolList?.filter((p) => p?.taskStatusName === label);
        setmodules(A);
      } else if (priorityAll !== "All" && DateAll === "All") {
        A = MudolList?.filter((p) => p?.taskStatusName === label && p?.taskPriorityName === priorityAll);
        setmodules(A);
      }
      let index = 1;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    }
  };
  ///sort list by time=> id==1 filter by week ///
  const FilterWeek = async () => {
    await SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
    if (CurrentStatus === "") {
      if (GLOBAL.selectItem === 1)
        A = modules?.filter((p) => p?.taskPriorityName === priorityAll);
      else
        A = modules?.filter((p) => p?.taskPriorityName === priorityAll);
    } else
      A = modules?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll);
    setmodules(A);
  };
  ///sort list by time=> id==1 filter by week and status///
  const FilterWeekstatus = async () => {
    await SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
    setmodules(modules?.filter((p) => p?.taskPriorityName === priorityAll));
  };
  ///sort list by time=> id==1 filter by week and Priority///
  const FilterWeekPriority = async () => {
    await SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
    if (CurrentStatus === "") {
      setmodules(modules);
    } else
      setmodules(modules?.filter((p) => p?.taskStatusName === StatusAll));
  };
  ///sort list by Priority ///
  const FilterFuncPriority = (id, label) => {
    setpriorityAll(label);
    GLOBAL.FilterPriority = true;
    if (id === 10) {
      setShowDateRange(false);
      if (StatusAll === "All" && DateAll === "All") {
        setmodules(MudolList);
      } else if (DateAll === "Today" && StatusAll !== "All") {
        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        if (CurrentStatus === "") {
          if (GLOBAL.selectItem === 1)
            setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1 && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          else
            setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
        } else
          setmodules(MudolList?.filter((p) => p?.taskStatusName === StatusAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
      } else if (DateAll === "Today" && StatusAll === "All") {
        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        setmodules(MudolList?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1));
      } else if (DateAll === "Week" && StatusAll !== "All") {
        FilterWeekPriority();
      } else if (DateAll === "Week" && StatusAll === "All") {
        SortByWeek(selectedRange.firstDate, selectedRange.secondDate);
      } else if (DateAll === "All" && StatusAll !== "All") {
        if (CurrentStatus === "") {
          if (GLOBAL.selectItem === 1)
            setmodules(MudolList?.filter((p) => p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled"));
          else
            setmodules(MudolList);
        } else
          setmodules(MudolList?.filter((p) => p?.taskStatusName === StatusAll));
      }
      let index = 2;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    } else {
      if (DateAll === "Today" && StatusAll !== "All") {
        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        if (CurrentStatus === "") {
          if (GLOBAL.selectItem === 1)
            A = A?.filter((p) => p?.taskPriorityName === label && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled" && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
          else
            A = A?.filter((p) => parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);

        } else
          A = A?.filter((p) => p?.taskPriorityName === label && p?.taskStatusName === StatusAll && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        setmodules(A);

      }
      if (DateAll === "Today" && StatusAll === "All") {

        const date = new Date();
        const Day = date.getDate();
        const Month = date.getMonth();
        A = A?.filter((p) => p?.taskPriorityName === label && parseInt(p.Day) === Day && parseInt(p.Month) === Month + 1);
        setmodules(A);


      } else if (DateAll === "Week" && StatusAll !== "All") {

        FilterWeek();
      } else if (DateAll === "Week" && StatusAll === "All") {

        FilterWeekPriority();
      } else if (StatusAll === "All" && DateAll === "All" && label !== "All") {

        A = MudolList?.filter((p) => p?.taskPriorityName === label);
        setmodules(A);
      } else if (StatusAll !== "All" && DateAll === "All" && label !== "All") {

        if (CurrentStatus === "") {
          if (GLOBAL.selectItem === 1)
            A = MudolList?.filter((p) => p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled" && p?.taskPriorityName === label);
          else
            A = MudolList?.filter((p) => p?.taskPriorityName === label);

        } else
          A = MudolList?.filter((p) => p?.taskStatusName === StatusAll && p?.taskPriorityName === label);
        setmodules(A);
      }
      let index = 2;
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: label };
      setFilterList(markers);
    }
  };
  ///sort list by time =>id==0 means date ,id==1 means filter by Status and id==2 means Priority ///
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
    } else if (id === 3) {
      setDateItems(false);
      setStatus(false);
      setPriority(false);
      setvisiblFilter(!visiblFilter);
    }
  };

  const renderSectionHeader = () => (
    <>
      {showWarning === true && <Warningmessage />}
      <View style={Styles.infobox}>
        {
          modules !== "" && <TouchableOpacity style={Styles.Width30} onPress={() => setvisibleguide(!visibleguide)}>
            <AntDesign name={"infocirlce"} size={20} color={GLOBAL.OFFICIAL_ORANGE_COLOR} />
          </TouchableOpacity>
        }
      </View>
      {modules !== "" ?
        <View style={Styles.FilterBoxtask}>
          {FilterList?.map((value, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                setSelectItem(value.id);
                FilterFunc1(value.id);
              }} style={[Styles.FilterBoxItemsSelectcategory,{backgroundColor:GLOBAL.headertext_backgroundColor}]}>
                {
                  value.id === 0 || value.id === 3 ?
                    <MaterialCommunityIcons name={value.Icon} size={20}
                                            color={GLOBAL.header_backgroundColor} /> :
                    value.id === 1 ?
                      <View style={[Styles.btntaskCircel, { backgroundColor: ColorChangestatus }]} /> :
                      <View style={[Styles.triangle, { borderBottomColor: ColorChangePriority }]} />
                }
                {
                  value.id === 0 || value.id === 3 ?
                    <Text
                      style={[Styles.txtCenter_filter,{color:GLOBAL.header_backgroundColor}]}>
                      {value.Filtername}
                    </Text> :
                    value.id === 1 ?
                      <Text
                        style={[Styles.txtCenter_filter, { color: ColorChangestatus }]}>
                        {value.Filtername}
                      </Text> :
                      value.id === 2 ?
                        <Text
                          style={[Styles.txtCenter_filter,{color:GLOBAL.header_backgroundColor}]}>
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
                  GLOBAL.FilterTime_name = value.label;
                }}
                                  style={[SelectDetailItem === value.value ? [Styles.FilterBoxItemsSelecttasl,{backgroundColor:GLOBAL.footertext_backgroundColor}] : Styles.FilterBoxItemstask]}>
                  <MaterialCommunityIcons name={value.Icon} size={20}
                                          color={SelectDetailItem === value.value ? GLOBAL.OFFICIAL_WITE_COLOR : GLOBAL.OFFICIAL_BLUE_COLOR} />
                  <Text
                    style={[SelectDetailItem === value.value ? [Styles.txtCenter_filter] : Styles.txtCenter_filter2]}>
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
                  GLOBAL.FilterStatus_name = value.label;
                }}
                                  style={[SelectDetailItemStatus === value.value ? [Styles.FilterBoxItemsSelecttasl,{backgroundColor:GLOBAL.footertext_backgroundColor}] : Styles.FilterBoxItemstask]}>
                  <View style={[Styles.btntask,{backgroundColor:value.statusColorCode}]}/>
                  <Text
                    style={[SelectDetailItemStatus === value.value ? [Styles.txtCenter_filter]:Styles.txtCenter_filter2]}>
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
                  GLOBAL.FilterPriority_name = value.label;
                }}
                                  style={[SelectDetailItemPriority === value.value ? Styles.FilterBoxItemsSelecttasl: Styles.FilterBoxItemstask]}>
                  <View style={[Styles.triangle, { borderBottomColor: value.taskPriorityColor }]} />
                  <Text
                    style={[SelectDetailItemPriority === value.value ? [Styles.txtCenter_filter] : Styles.txtCenter_filter2]}>
                    {value.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      }
      {ShowDateRange === true ?
        <TouchableOpacity onPress={() => setshowModalCalender(true)} style={Styles.WeekFilterBox}>
          <Text style={[Styles.txtFilter3,{color:GLOBAL.headertext_backgroundColor}]}>
            Start Date
          </Text>
          <View style={[Styles.WeekFilterBoxItem,{backgroundColor:GLOBAL.footertext_backgroundColor }]}>
            <Text style={Styles.txtFilter}>
              {selectedRange.firstDate}
            </Text>
          </View>
          <Text style={[Styles.txtFilter3,{color:GLOBAL.headertext_backgroundColor}]}>
          End Date
          </Text>
          <View style={[Styles.WeekFilterBoxItem,{backgroundColor:GLOBAL.footertext_backgroundColor }]}>
            <Text style={Styles.txtFilter}>
              {selectedRange.secondDate}
            </Text>
          </View>
        </TouchableOpacity> : null
      }
      <View style={Styles.SectionHeader} />
    </>
  );
  /// sort Task by week ///
  const SortByWeek = (startDate, endDate) => {
    let Filter = "";
    if (priorityAll !== "All" && StatusAll !== "All") {
      if (CurrentStatus === "") {
        if (GLOBAL.selectItem === 1)
          Filter = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName !== "Completed" && p?.taskStatusName !== "Cancelled");
        else
          Filter = MudolList?.filter((p) => p?.taskPriorityName === priorityAll);
      } else
        Filter = MudolList?.filter((p) => p?.taskPriorityName === priorityAll && p?.taskStatusName === StatusAll);
    } else
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
                  GLOBAL.selectedRange = { firstDate: value.startDate, secondDate: value.endDate };
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
        <View style={[Styles.With50List, { marginTop: 50 }]}>
          <ButtonI
            style={Styles.btnFilter}
            onpress={() => {
              setshowModalCalender(false);
              setShowDateRange(false);
            }}
            categoriIcon={"Nopadding"}
            title={"Close"}
            colorsArray={["#b9a4ff", "#9f83ff", "#7953FAFF"]}
            styleTxt={[Styles.txtbtn, { fontSize: normalize(13) }]} sizeIcon={27} />
        </View>
      </SafeAreaView>
    );
  };
  ///delete task image when edit///
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
  const renderItem_dropDown = item => {
    return (
      <View style={Styles.itemModalFilter}>
        <Text style={Styles.textItemModalFilter}>{item.label}</Text>
      </View>
    );
  };
  ///header back button///
  const Go_Back = () => {
    GLOBAL.TaskRelatedNameId = "";
    GLOBAL.FilterTime = false;
    GLOBAL.FilterStatus = false;
    GLOBAL.FilterPriority = false;
    GLOBAL.FilterList = [];
    GLOBAL.List = [];
    GLOBAL.FilterTime_name = "All";
    GLOBAL.FilterStatus_name = "All";
    GLOBAL.FilterPriority_name = "Normal";
    GLOBAL.FilterEntity_name = "";
    GLOBAL.FilterProject_name = "";
    GLOBAL.FilterSite_name = "";
    GLOBAL.FilterUnit_name = "";
    GLOBAL.FilterSection_name = "";
    GLOBAL.FilterFeature_name = "";

    if (GLOBAL.TaskName !== "") {
      GLOBAL.TaskName = "";
      Navigate_Url(GLOBAL.Url_Navigate);
    } else {
      GLOBAL.TaskName = "";
      goBack();
    }
  };
  ///filter by category///
  const ApplyFilter = () => {
    let index = 3;
    setmodules(MudolList);
    let lable = "";
    GLOBAL.FilterCategory = true;
    GLOBAL.FilterCategory_name = "subcontract";
    GLOBAL.categoryId = "1";
    if (categoryName !== "" && selectedrelatedname === "" && selectedrelated === "" && selectedTaskSiteName === "" && selectedunitName === "" && selectedsectionName === "" && selectedfeatureName === "") {
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: categoryName?.label };
      setFilterList(markers);
      modules.filter((p) => p.taskCategoryName === categoryName.label);
      setmodules(modules.filter((p) => p.taskCategoryName === categoryName.label));
      GLOBAL.FilterList = modules;
      GLOBAL.TaskRelatedNameId = "6";
    } else if (categoryName !== "" && selectedrelatedname !== "" && selectedrelated === "" && selectedTaskSiteName === "" && selectedunitName === "" && selectedsectionName === "" && selectedfeatureName === "") {
      let markers = [...FilterList];
      lable = categoryName.label + "/" + selectedrelatedname?.label;
      markers[index] = { ...markers[index], Filtername: lable };
      setFilterList(markers);
      setmodules(modules.filter((p) => p.taskRelatedName === selectedrelatedname.label));
      GLOBAL.FilterList = modules;
      GLOBAL.TaskRelatedNameId = "5";
      GLOBAL.TaskRelatedId = selectedrelatedname?.value;
    } else if (categoryName !== "" && selectedrelatedname !== "" && selectedrelated !== "" && selectedTaskSiteName === "" && selectedunitName === "" && selectedsectionName === "" && selectedfeatureName === "") {
      lable = selectedrelated?.label;
      GLOBAL.FilterEntity_name = "Project";
      GLOBAL.FilterProject_name = selectedrelated?.label;
      GLOBAL.TaskRelatedNameId = "0";
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: lable };
      setFilterList(markers);
      setmodules(modules.filter((p) => p.taskRelatedNameRef === selectedrelated.label));
      GLOBAL.FilterList = modules;
    } else if (categoryName !== "" && selectedrelatedname !== "" && selectedrelated !== "" && selectedTaskSiteName !== "" && selectedunitName === "" && selectedsectionName === "" && selectedfeatureName === "") {
      lable = selectedrelated?.label + " / " + selectedTaskSiteName?.label;
      GLOBAL.FilterEntity_name = "Site";
      GLOBAL.FilterProject_name = selectedrelated?.label;
      GLOBAL.FilterSite_name = selectedTaskSiteName?.label;
      GLOBAL.TaskRelatedNameId = "1";
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: lable };
      setFilterList(markers);
      setmodules(modules.filter((p) => p.taskRelatedNameRef === selectedTaskSiteName.label));
      GLOBAL.FilterList = modules;
    } else if (categoryName !== "" && selectedrelatedname !== "" && selectedrelated !== "" && selectedTaskSiteName !== "" && selectedunitName !== "" && selectedsectionName === "" && selectedfeatureName === "") {
      lable = selectedrelated?.label + " / " + selectedTaskSiteName?.label + " / " + selectedunitName?.label;
      GLOBAL.FilterEntity_name = "Unit";
      GLOBAL.FilterProject_name = selectedrelated?.label;
      GLOBAL.FilterSite_name = selectedTaskSiteName?.label;
      GLOBAL.FilterUnit_name = selectedunitName?.label;
      GLOBAL.TaskRelatedNameId = "2";
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: lable };
      setFilterList(markers);
      setmodules(modules.filter((p) => p.taskRelatedNameRef === selectedunitName.label));
      GLOBAL.FilterList = modules;
    } else if (categoryName !== "" && selectedrelatedname !== "" && selectedrelated !== "" && selectedTaskSiteName !== "" && selectedunitName !== "" && selectedsectionName !== "" && selectedfeatureName === "") {
      lable = selectedrelated?.label + " / " + selectedTaskSiteName?.label + " / " + selectedunitName?.label + " / " + selectedsectionName?.label;
      GLOBAL.FilterEntity_name = "Section";
      GLOBAL.FilterProject_name = selectedrelated?.label;
      GLOBAL.FilterSite_name = selectedTaskSiteName?.label;
      GLOBAL.FilterUnit_name = selectedunitName?.label;
      GLOBAL.FilterSection_name = selectedsectionName?.label;
      GLOBAL.TaskRelatedNameId = "3";
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: lable };
      setFilterList(markers);
      setmodules(modules.filter((p) => p.taskRelatedNameRef === selectedsectionName.label));
      GLOBAL.FilterList = modules;
    } else if (categoryName !== "" && selectedrelatedname !== "" && selectedrelated !== "" && selectedTaskSiteName !== "" && selectedunitName !== "" && selectedsectionName !== "" && selectedfeatureName !== "") {
      lable = selectedrelated?.label + " / " + selectedTaskSiteName?.label + " / " + selectedunitName?.label + " / " + selectedsectionName?.label + " / " + selectedfeatureName?.label;
      GLOBAL.FilterEntity_name = "Feature";
      GLOBAL.FilterProject_name = selectedrelated?.label;
      GLOBAL.FilterSite_name = selectedTaskSiteName?.label;
      GLOBAL.FilterUnit_name = selectedunitName?.label;
      GLOBAL.FilterSection_name = selectedsectionName?.label;
      GLOBAL.FilterFeature_name = selectedfeatureName?.label;
      GLOBAL.TaskRelatedNameId = "4";
      let markers = [...FilterList];
      markers[index] = { ...markers[index], Filtername: lable };
      setFilterList(markers);
      setmodules(modules.filter((p) => p.taskRelatedNameRef === selectedfeatureName.label));
      GLOBAL.FilterList = modules;
    }
    setvisiblFilter(false);
  };


  const FindCategoryId=async(item)=>{
    setcategoryLevellist(RelatedNameList.filter((p)=>p?.categoryLevel<=item?.categoryLevel))
  }
  return (
    <>
      <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
        <Header colors={["#a39898", "#786b6b", "#382e2e"]} StatusColor={"#a39897"} onPress={Go_Back}
                Title={GLOBAL.TaskMenuName} />

        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
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
            </View>
            : GLOBAL.selectItem !== 1 && modules === "" ?
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
                  <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={visiblFilter}>
          <Content contentContainerStyle={[Styles.centeredView,
            { flexGrow: 1, backgroundColor: "rgba(0,0,0, 0.5)", justifyContent: "center" }]}>
            <View style={[Styles.ModalTaskStyle2]}>
              <View style={[{ width: "89%", marginBottom: "4%" }]}>
                <TouchableOpacity onPress={() => {
                  setvisiblFilter(false);
                }} style={Styles.CancelBtnLeftAlign}>
                  <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                </TouchableOpacity>
              </View>
              <Text style={Styles.FilterText}>
                Filter
              </Text>
              <View style={Styles.ItemModalFilter}>
                <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>Category</Text>
              </View>
              <Dropdown
                style={[Styles.dropdownModalFilter]}
                showsVerticalScrollIndicator={true}
                placeholderStyle={Styles.placeholderStyleModalFilter}
                selectedTextStyle={Styles.selectedTextModalFilter}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskcategory}
                maxHeight={140}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Category" : "..."}
                value={categoryName}
                containerStyle={Styles.containerModalFilter}
                renderItem={renderItem_dropDown}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setcategoryName(item);
                  setCategoryId(item.value);
                  Task_subcategory(item.value);

                  setcategoryEntityShow(item.categoryEntityShow)
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              {categoryEntityShow === "y" &&
              <>
                <View style={Styles.ItemModalFilter}>
                  <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>Target Entity</Text>
                </View>
                <Dropdown
                  style={[Styles.dropdownModalFilter]}
                  placeholderStyle={Styles.placeholderStyleModalFilter}
                  selectedTextStyle={Styles.selectedTextModalFilter}
                  iconStyle={Styles.iconStyle}
                  itemTextStyle={Styles.itemTextStyle}
                  data={RelatedNameList}
                  maxHeight={140}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select Target Entity" : "..."}
                  value={selectedrelatedname}
                  containerStyle={Styles.containerModalFilter}
                  renderItem={renderItem_dropDown}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    FindCategoryId(item)
                    setcategoryLevel(item.categoryLevel)
                    setselectedrelatedname(item);
                    setTaskRelatedNameId(item.value);
                    setRelatedNameLvalue(item.label);
                    GLOBAL.TaskRelatedName=item.categoryLevel
                  }}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                      <View style={Styles.selectedStyle2}>
                        <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                        <AntDesign color="#fff" name="delete" size={15} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
                {categoryEntityShow === 'y' &&
                  <>
                    <View style={Styles.ItemModalFilter}>
                      <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>Project Name</Text>
                    </View>
                    <Dropdown
                      style={[Styles.dropdownModalFilter]}
                      placeholderStyle={Styles.placeholderStyleModalFilter}
                      selectedTextStyle={Styles.selectedTextModalFilter}
                      iconStyle={Styles.iconStyle}
                      itemTextStyle={Styles.itemTextStyle}
                      data={TaskRelated}
                      maxHeight={140}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "Select Project Name" : "..."}
                      value={selectedRelated}
                      containerStyle={Styles.containerModalFilter}
                      renderItem={renderItem_dropDown}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        GLOBAL.ProjectId = item.value;
                        if (RelatedNameLvalue==='project') {
                          setSelectedrelated(item);
                          setRelatedId(item.value);
                        } else {
                          const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='2')?.value;
                          console.log(categoryId,'categoryId : getSites')
                          getSites(categoryId,item.value);
                          setSelectedrelated(item);
                          setTaskProjectId(item.value);
                        }

                      }}
                      renderSelectedItem={(item, unSelect) => (
                        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                          <View style={Styles.selectedStyle2}>
                            <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                            <AntDesign color="#fff" name="delete" size={15} />
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </>
                }
                {categoryLevellist.find((p)=>p?.label==='Site')&&
                <>
                  <View style={Styles.ItemModalFilter}>
                    <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>Site</Text>
                  </View>
                  <Dropdown
                    style={[Styles.dropdownModalFilter]}
                    placeholderStyle={Styles.placeholderStyleModalFilter}
                    selectedTextStyle={Styles.selectedTextModalFilter}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={SiteList}
                    maxHeight={140}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select Site" : "..."}
                    value={selectedTaskSiteName}
                    containerStyle={Styles.containerModalFilter}
                    renderItem={renderItem_dropDown}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      GLOBAL.SiteId = item.value;
                      if (RelatedNameLvalue==='Site') {
                        setselectedTaskSiteName(item);
                        setRelatedId(item.value);
                      } else {
                        const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='3')?.value
                        console.log(categoryId,'categoryId : getUnits')
                        console.log(categoryLevellist,'categoryLevellist')
                        console.log(item.value,'item.value')
                        getUnits(categoryId,item.value);
                        setselectedTaskSiteName(item);
                        setTaskSiteId(item.value);
                      }
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </>
                }
                {categoryLevellist.find((p)=>p?.label==='Unit') &&
                <>
                  <View style={Styles.ItemModalFilter}>
                    <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>unit</Text>
                  </View>

                  <Dropdown
                    style={[Styles.dropdownModalFilter]}
                    placeholderStyle={Styles.placeholderStyleModalFilter}
                    selectedTextStyle={Styles.selectedTextModalFilter}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={unitList}
                    maxHeight={140}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select unit" : "..."}
                    value={selectedunitName}
                    containerStyle={Styles.containerModalFilter}
                    renderItem={renderItem_dropDown}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      GLOBAL.UnitId = item.value;
                      if (RelatedNameLvalue==='Unit') {
                        setselectedunitName(item);
                        setRelatedId(item.value);
                      } else {
                        const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='4')?.value
                        console.log(categoryId,'categoryId : getSection')
                        getSection(categoryId,item.value);
                        setselectedunitName(item);
                        setTaskunitId(item.value);
                      }
                    }}
                  />
                </>
                }
                {categoryLevellist.find((p)=>p?.label==='Section') &&
                <>
                  <View style={Styles.ItemModalFilter}>
                    <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>section</Text>
                  </View>
                  <Dropdown
                    style={[Styles.dropdownModalFilter]}
                    placeholderStyle={Styles.placeholderStyleModalFilter}
                    selectedTextStyle={Styles.selectedTextModalFilter}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={sectionList}
                    maxHeight={140}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select section" : "..."}
                    value={selectedsectionName}
                    containerStyle={Styles.containerModalFilter}
                    renderItem={renderItem_dropDown}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      GLOBAL.SectionId = item.value;
                      if (RelatedNameLvalue==='Section') {
                        setselectedsectionName(item);
                        setRelatedId(item.value);
                      } else {
                        const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='5')?.value
                        console.log(categoryId,'categoryId : getFeatures')
                        getFeatures(categoryId,item.value);
                        setselectedsectionName(item);
                        setTasksectionId(item.value);
                      }
                    }}
                  />
                </>
                }
                {categoryLevellist.find((p)=>p?.label==='Feature') &&
                <>
                  <View style={Styles.ItemModalFilter}>
                    <Text style={[Styles.txt_leftModalFilter, { marginTop: normalize(15) }]}>feature</Text>
                  </View>
                  <Dropdown
                    style={[Styles.dropdownModalFilter]}
                    placeholderStyle={Styles.placeholderStyleModalFilter}
                    selectedTextStyle={Styles.selectedTextModalFilter}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={featureList}
                    maxHeight={140}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select feature" : "..."}
                    value={setselectedfeatureName}
                    containerStyle={Styles.containerModalFilter}
                    renderItem={renderItem_dropDown}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      if (RelatedNameLvalue==='Feature') {
                        setselectedfeatureName(item);
                        setRelatedId(item.value);
                      } else {
                        getFeatures();
                        setselectedfeatureName(item);
                        setTaskfeatureId(item.value);
                      }
                    }}
                  />
                </>
                }
              </>
              }
              <View style={Styles.With95Row2}>
                <TouchableOpacity style={Styles.btnModalFilter1} onPress={() => {
                  setTaskRelatedNameId("");
                  setcategoryName("");
                  setCategoryId(0);
                  setmodules(MudolList);
                  setvisiblFilter(false);
                }}>
                  <Text style={[Styles.txt_CenterModalFilter]}> Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.btnModalFilter1} onPress={() => {
                  ApplyFilter();
                }}>
                  <Text style={[Styles.txt_CenterModalFilter]}> Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </Modal>
        {GLOBAL.selectItem === 1 || GLOBAL.TaskName !== "" ?
          <FloatAddBtn onPress={handleSubmit} colors={["#a39898", "#786b6b", "#382e2e"]} /> : null
        }
        <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
      </Container>
    </>
  );
}

export default Task_Management;
