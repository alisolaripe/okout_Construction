import { Button, Container } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import React, { useState, useEffect, useRef } from "react";
import { Footer1 } from "../component/Footer";
import { Dimensions, ScrollView, Modal, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native";
import { Image } from "react-native-compressor";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Colors } from "../Colors";
import { readOnlineApi } from "../ReadPostApi";
import Carousel, { Pagination } from "react-native-snap-carousel";
import TaskDetailImage from "../component/Task_Detail_Image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Warningmessage } from "../component/Warningmessage";
import { TextInputI } from "../component/TextInputI";
import Moment from "moment";
import DatePicker from "react-native-date-picker";
import { selectPhotocamera, selectPhotoGallery, writePostApi } from "../writePostApi";
import { Dropdown } from "react-native-element-dropdown";
import { ButtonI } from "../component/ButtonI";
import { Formik } from "formik";
import ToggleSwitch from "toggle-switch-react-native";
import Task_Edit_Image from "../component/Task_Edit_Image";
import FastImage from "react-native-fast-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
const { width: viewportWidth } = Dimensions.get("window");
const SLIDER_1_FIRST_ITEM = 0;
let Full = "";
let A = [];
let B = [];

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(83);
const itemHorizontalMargin = wp(3);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2.2;
let numOfLinesCompany = 0;
let YearFull = "";
import { LogOutModal } from "../component/LogOutModal";

function TaskDetail({ navigation, navigation: { goBack } }) {
  let _slider1Ref = useRef(null);
  const [changestatus_Reopen, setchangestatus_Reopen] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showModalDeleteImages, setshowModalDeleteImages] = useState(false);
  const [Task_detail, setTask_detail] = useState("");
  const [slider1ActiveSlide, setslider1ActiveSlide] = useState(0);
  const [attachments, setattachments] = useState([]);
  const [showWarning, setshowWarning] = useState(false);
  const [showModalReject, setshowModalReject] = useState(false);
  const [showModalAccept, setshowModalAccept] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [dateType, setdateType] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [error, seterror] = useState(false);
  const [dateend, setDateend] = useState(new Date());
  const [openend, setOpenend] = useState(false);
  const [DateFormatplanend, setDateFormatplanend] = useState("");
  const [DateFormatplanstart, setDateFormatplanstart] = useState("");
  const [reasons, setreasons] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [reasonId, setreasonId] = useState(false);
  const [reasonTitle, setreasonTitle] = useState("Select Reason");
  const [reasonDescription, setreasonDescription] = useState("");
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [changestatus, setchangestatus] = useState(false);
  const [completedtask, setcompletedtask] = useState(false);
  const [scroll, setscroll] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);
  const [ShowButton, setShowButton] = useState(false);
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [showModalAddImage, setshowModalAddImage] = useState(false);
  const [Description, setDescription] = useState("");
  const [taskId, settaskId] = useState(false);
  const [attachmentId, setattachmentId] = useState(true);
  const [TimeRelated, setTimeRelated] = useState([{ value: "0", label: "days" }, { value: "1", label: "hours" }]);
  const [TimeRelatedselct, setTimeRelatedselct] = useState("");
  const [startdate, setstartdate] = useState("");
  const [dateDifferenceHours, setdateDifferenceInHours] = useState("");
  const [dateDifferenceDays, setdateDifferenceInDays] = useState("");
  const [switchDYB, setswitchDYB] = useState(false);
  const [DiscussList, setDiscussList] = useState([]);
  const [Discuss, setDiscuss] = useState("");
  const [taskRequestNotes, settaskRequestNotes] = useState("");
  const scrollRef = useRef();
  useEffect(() => {
    GetTaskDetail();
    const date = new Date();
    const Day = date.getDate();
    const Month = date.getMonth() + 1;
    const Year = date.getFullYear();
    const Hour = date.getHours();
    const Minutes = date.getMinutes();
    const Seconds = date.getSeconds();
    Full = `${Year}-${Month}-${Day}`;
    YearFull = `${Year}-${Month}-${Day} ${Hour}:${Minutes}:${Seconds}`;
  }, []);
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  ///Technician can chose to see update flag or not and send to server///
  const Notify = (isOn) => {
    let Notify = "";
    if (isOn === false)
      Notify = "n";
    else
      Notify = "y";
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", GLOBAL.TaskId);
    formData.append("notifyStatus", Notify);
    writePostApi("POST", Api.Notify, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          My_TaskList_server();
          GetTaskDetail();
          setShowMessage(false);
          setchangestatus_Reopen(false);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index = GLOBAL?.FilterList?.findIndex((p) => p?.taskId === GLOBAL?.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index] = { ...mark[index], taskUpdated: Notify };
            GLOBAL.FilterList = mark;
          }
        }
      } else {
        Update_Off_Notify(GLOBAL.TaskId, Notify);
        if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
          let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
          let mark = [...GLOBAL?.FilterList];
          mark[index] = { ...mark[index], taskUpdated: Notify };
          GLOBAL.FilterList = mark;
        }
        setMessage("Your task status successfully changed");
        setShowMessage(true);
        setchangestatus_Reopen(false);
        setShowMessage(false);
      }
    });
  };
  ///Add Chat Message and send to server ///
  const Add_Discuss = () => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", GLOBAL.TaskId);
    formData.append("notes", Discuss);
    writePostApi("POST", Api.Discuss, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          GetTaskDetail();
          setShowMessage(false);
        }
      } else {
        Add_Off_Discuss(GLOBAL.TaskId, Discuss);
        setMessage("Your notes successfully added");
        setShowMessage(true);
        setShowMessage(false);
      }
    });
  };
  ///Technician can chose to see update flag or not when app is offline///
  const Update_Off_Notify = async (taskId, Notify) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskNotify: Notify };
    writeDataStorage(GLOBAL.All_Task, markers_List);
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId);
    let markers_Listdetail = [...json_detail];
    markers_Listdetail[index_detail] = { ...markers_Listdetail[index_detail], taskUpdated: Notify, taskNotify: Notify };
    writeDataStorage(GLOBAL.Task_Detail, markers_Listdetail);
  };
  ///Add Chat Message when app is offline ///
  const Add_Off_Discuss = async (taskId, Discuss) => {
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let index_detail = json_detail?.findIndex((p) => p.taskId === taskId)?.trackings;
    let markers = [...json_detail];
    markers.push({
      by: Task_detail?.taskCompletedBy,
      date: YearFull,
      notes: Discuss,
    });
    json_detail[index_detail] = { ...json_detail[index_detail], trackings: markers };
    writeDataStorage(GLOBAL.Task_Detail, json_detail);
  };
  const _changestatus_Reopen = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={changestatus_Reopen}
          avoKeyboard={true}
          onBackdropPress={() => setchangestatus_Reopen(false)}
          transparent={true}>
          {renderchangestatusModalContent_Reopen()}
        </Modal>
      </View>
    );
  };
  const renderchangestatusModalContent_Reopen = () => (
    <View style={[Styles.TaskModalTotalStyle, { marginTop: "17%" }]}>
      <View style={Styles.DeleteModalStyle23}>
        <View style={{ width: "89%" }}>
          <TouchableOpacity onPress={() => {
            setchangestatus_Reopen(false);
          }}
                            style={Styles.CancelBtnLeftAlign}>
            <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_Button} />
          </TouchableOpacity>
        </View>
        <View style={Styles.formContainer}>
          <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>Reason</Text>
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
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setreasonTitle(item.label);
              setreasonDescription(item?.reasonDescription);
              setreasonId(item.value);
            }}
          />
          {error === "Reason" && reasonId === false &&
          <Text style={{ fontSize: 12, color: "#FF0D10", marginTop: normalize(10), fontWeight: "bold" }}>Reopen
            Reason.Please!</Text>
          }
          <Text style={[Styles.txtLightColor, { marginTop: normalize(25) }]}>Reopen Reason</Text>
          <TextInput
            value={reasonDescription}
            style={[Styles.inputStyle_with, { paddingVertical: "4%" }]}
            onContentSizeChange={(e) => {
              numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
            }}
            onChangeText={(val) => setreasonDescription(val)}
            multiline={true}
            placeholderTextColor={"#fff"} />

          <View style={[Styles.ViewItems_center_task]}>
            <ButtonI style={[Styles.btn, {
              flexDirection: "row",
              width: "50%",
              paddingVertical: 2,
              marginTop: normalize(30),
            }]}
                     onpress={UpdatestatusReopen}
                     categoriIcon={""}
                     title={"Send"}
                     colorsArray={["#ffadad", "#f67070", "#FF0000"]}
                     styleTxt={[Styles.txtbtn2, { fontSize: normalize(16) }]} sizeIcon={27} />
          </View>
        </View>
      </View>
    </View>
  );
  ///change task status to reopen///
  const UpdatestatusReopen = () => {
    if (reasonId === false) {
      seterror("Reason");
    } else {
      const formData = new FormData();
      formData.append("userId", GLOBAL.UserInformation?.userId);
      formData.append("taskId", GLOBAL.TaskId);
      formData.append("taskStatusId", "5");
      formData.append("reasonNotes", reasonDescription);
      formData.append("reasonId", reasonId);
      writePostApi("POST", Api.ChangeStatusTask, formData).then(json => {

        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg);
            setShowMessage(true);
            My_TaskList_server();
            GetTaskDetail();
            setShowMessage(false);
            setchangestatus_Reopen(false);
            if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
              let index = GLOBAL?.FilterList?.findIndex((p) => p?.taskId === GLOBAL?.TaskId);
              let mark = [...GLOBAL?.FilterList];
              mark[index] = { ...mark[index], taskStatusColor: "#ff4545", taskStatusName: "Reopen", taskUpdated: "y" };
              GLOBAL.FilterList = mark;
            }
          }
        } else {
          Update_Off_Reopen(GLOBAL.TaskId, value);
          setMessage("Your task status successfully changed");
          setShowMessage(true);
          setchangestatus_Reopen(false);
          setShowMessage(false);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index] = { ...mark[index], taskStatusColor: "#ff4545", taskStatusName: "Reopen", taskUpdated: "y" };
            GLOBAL.FilterList = mark;
          }
        }
      });
    }

  };
  ///change task status to reopen when app is offline///
  const Update_Off_Reopen = async (taskId, value) => {
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
  const GetTaskDetail = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_detail + `&taskId=${GLOBAL.TaskId}`).then(json => {
        setTask_detail(json?.singleTask);
        settaskRequestNotes(json?.singleTask?.taskRequestNotes);
        if (json?.singleTask?.taskNotify === "n")
          setswitchDYB(false);
        else
          setswitchDYB(true);
        let Task_details = [];
        if (GLOBAL.selectItem === 2 && json?.singleTask?.taskStatusName !== "Rejected" && json?.singleTask?.taskStatusName !== "Accepted" && json?.singleTask?.taskStatusName !== "Completed") {
          ReasonCode(7);
        } else if (GLOBAL.selectItem === 1 && json?.singleTask?.taskStatusName === "Completed") {
          ReasonCodeReopen(6);
        }
        Save_Details_Online(json?.singleTask);
        if (json?.singleTask?.taskStatusName === "Accepted" && GLOBAL.selectItem === 2) {
          setDateFormatplanend(json?.singleTask?.taskPlanDueDate);
          setDateFormatplanstart(json?.singleTask?.taskPlanStartDate);
          setDate(new Date(json?.singleTask?.taskPlanStartDate));
          setDateend(new Date(json?.singleTask?.taskPlanDueDate));
          setDescription(json?.singleTask?.taskRequestNotes);
          let Task_details_attachmentUrl = [];
          let uri = "";
          settaskId(json?.singleTask?.taskId);
          let mark2 = {
            attachmentUrl: "",
            type: "AddImage",
            fileName: "",
            attachmentId: "",
          };
          if (json?.singleTask?.attachments?.length !== 0) {
            json?.singleTask?.attachments?.forEach((obj) => {
              if (obj.attachmentUrl?.split("/")?.[0] === "uploads") {
                uri = GLOBAL?.OrgAppLink_value + "/" + obj?.attachmentUrl;
              } else {
                uri = obj?.attachmentUrl;
              }
              Task_details_attachmentUrl.push({
                attachmentUrl: uri,
                type: obj?.attachmentName?.split(".")?.[1],
                fileName: obj?.attachmentName,
                attachmentId: obj?.attachmentId,
              });
            });
            Save_attachments_Online(Task_details_attachmentUrl);
            Task_details_attachmentUrl = [...Task_details_attachmentUrl, mark2];
            setImageSourceviewarray(Task_details_attachmentUrl);
            setattachments(Task_details_attachmentUrl);
          }
        } else {
          if (json?.singleTask?.attachments?.length !== 0) {
            json?.singleTask?.attachments?.forEach((obj) => {
              Task_details.push({
                taskId: json?.singleTask?.taskId,
                attachmentUrl: GLOBAL?.OrgAppLink_value + "/" + obj?.attachmentUrl,
                attachmentId: obj?.attachmentId,
              });
            });
            setattachments(Task_details);
            if (json?.singleTask)
              Save_attachments_Online(Task_details);
          }
        }

      });
    } else {
      let Modules = await AsyncStorage.getItem(GLOBAL.Task_Detail);
      let Filter = JSON.parse(Modules)?.find((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId));
      let Modules_attachments = await AsyncStorage.getItem(GLOBAL.Task_attachments);
      let Filter_attachments = JSON.parse(Modules_attachments)?.filter((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId));
      setTask_detail(Filter);
      if (Filter?.taskUpdated === "n")
        setswitchDYB(false);
      else
        setswitchDYB(true);
      setattachments(Filter_attachments);
    }
  };
  ///get task reject reason list///
  const ReasonCode = async (value) => {
    if (GLOBAL.isConnected === true) {
      fetch(Api.Reason_Code + `userId=${GLOBAL.UserInformation?.userId}&statusId=${value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(resp => {
        return resp.json();
      }).then(json => {
        let ReasonCode = [];
        json?.reasons?.forEach((obj) => {
          ReasonCode.push({
            label: obj?.reasonTitle,
            value: obj?.reasonId,
            reasonDescription: obj?.reasonDescription,
          });
        });
        setreasons(ReasonCode);
        writeDataStorage(GLOBAL.Reason_Code, json?.reasons);
      })
        .catch(error => console.log("dd", error));
    } else {
      let Modules = await AsyncStorage.getItem(GLOBAL.Reason_Code);
      let ReasonCode = [];
      Modules?.forEach((obj) => {
        ReasonCode.push({
          label: obj?.reasonTitle,
          value: obj?.reasonId,
          reasonDescription: obj?.reasonDescription,
        });
      });
      setreasons(ReasonCode);
    }
  };
  ///get task Reopen reason list///
  const ReasonCodeReopen = async (value) => {
    if (GLOBAL.isConnected === true) {
      fetch(Api.Reason_Code + `userId=${GLOBAL.UserInformation?.userId}&statusId=${value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(resp => {
        return resp.json();
      }).then(json => {
        let ReasonCodeReopen = [];
        json?.reasons?.forEach((obj) => {
          ReasonCodeReopen.push({
            label: obj?.reasonTitle,
            value: obj?.reasonId,
            reasonDescription: obj?.reasonDescription,
          });
        });
        setreasons(ReasonCodeReopen);
        writeDataStorage(GLOBAL.Reason_Code_Reopen, json?.reasons);
      })
        .catch(error => console.log("dd", error));
    } else {
      let Modules = await AsyncStorage.getItem(GLOBAL.Reason_Code_Reopen);
      let ReasonCodeReopen = [];
      Modules?.forEach((obj) => {
        ReasonCodeReopen.push({
          label: obj?.reasonTitle,
          value: obj?.reasonId,
          reasonDescription: obj?.reasonDescription,
        });
      });
      setreasons(ReasonCodeReopen);
    }
  };
  ///Technician edit task when app is offline///
  const Update_Off_Assigned = async (taskId) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(taskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: "#0000FF", taskStatusName: "Completed" };
    writeDataStorage(GLOBAL.Assigned_TaskList, markers_List);
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
  ///change task status to completes///
  const UpdatestatusCompleted = (value) => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", GLOBAL.TaskId);
    formData.append("taskStatusId", "4");
    formData.append("taskStartDate", DateFormatplanstart);
    formData.append("taskCompletedDate", DateFormatplanend);
    formData.append("taskCompletedDetails", value?.CompletedDetails);
    formData.append("planStartDate", DateFormatplanstart);
    formData.append("planEndDate", DateFormatplanend);
    formData.append("timeRelated", TimeRelatedselct);
    if (TimeRelatedselct === "days")
      formData.append("totaltime", dateDifferenceDays);
    else if (TimeRelatedselct === "hours")
      formData.append("totaltime", dateDifferenceHours);
    writePostApi("POST", Api.ChangeStatusTask, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          My_TaskList_server();
          GetTaskDetail();
          setShowMessage(false);
          setcompletedtask(false);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index] = { ...mark[index], taskStatusColor: "#0000FF", taskStatusName: "Completed", taskUpdated: "y" };
            GLOBAL.FilterList = mark;
          }
        }
      } else {
        Update_Off_Assigned(GLOBAL.TaskId);
        setMessage("Your task status successfully changed");
        setShowMessage(true);
        setShowMessage(false);
        setcompletedtask(false);
        if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
          let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
          let mark = [...GLOBAL?.FilterList];
          mark[index] = { ...mark[index], taskStatusColor: "#0000FF", taskStatusName: "Completed", taskUpdated: "y" };
          GLOBAL.FilterList = mark;
        }
      }
    });
  };
  ///save task detail in asyncStorage///
  const Save_Details_Online = async (A) => {
    let B = [];
    B.push(A);
    let AllList = [];
    let Filter = [];
    let TaskDetailList = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    Filter = TaskDetailList?.filter((p) => parseInt(p?.taskId) !== parseInt(GLOBAL.TaskId));
    if (TaskDetailList !== null && Filter !== null) {
      AllList = [].concat(Filter, B);
    } else {
      AllList = B;
    }
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(AllList));
  };
  ///save task detail images in asyncStorage///
  const Save_attachments_Online = async (B) => {
    let AllList = [];
    let Filter = [];
    let TaskDetailList = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    Filter = TaskDetailList?.filter((p) => parseInt(p?.taskId) !== parseInt(GLOBAL.TaskId));
    if (TaskDetailList !== null && Filter !== null) {
      AllList = [].concat(Filter, B);
    } else {
      AllList = B;
    }
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(AllList));
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

  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === reasonTitle && (
          <AntDesign
            style={Styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
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
      <View style={Styles.DeleteModalStyle23}>
        <View style={{ width: "89%" }}>
          <TouchableOpacity onPress={() => {
            setshowModalReject(false);
          }}
                            style={Styles.CancelBtnLeftAlign}>
            <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_Button} />
          </TouchableOpacity>
        </View>
        <View style={Styles.formContainer}>
          <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>Reason</Text>
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
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setreasonTitle(item.label);
              setreasonDescription(item?.reasonDescription);
              setreasonId(item.value);
            }}
          />
          {error === "Reason" && reasonId === false &&
          <Text style={{ fontSize: 12, color: "#FF0D10", marginTop: normalize(10), fontWeight: "bold" }}>Reject
            Reason.Please!</Text>
          }
          <Text style={[Styles.txtLightColor, { marginTop: normalize(25) }]}>Reject Reason</Text>
          <TextInput
            value={reasonDescription}
            style={[Styles.inputStyle_with, { paddingVertical: "4%" }]}
            onContentSizeChange={(e) => {
              numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
            }}
            onChangeText={(val) => setreasonDescription(val)}
            multiline={true}
            placeholderTextColor={"#fff"} />

          <View style={[Styles.ViewItems_center_task]}>
            <ButtonI style={[Styles.btn, {
              flexDirection: "row",
              width: "50%",
              paddingVertical: 2,
              marginTop: normalize(30),
            }]}//handleSubmit
                     onpress={Reject_Task}
                     categoriIcon={""}
                     title={"Send"}
                     colorsArray={["#ffadad", "#f67070", "#FF0000"]}
                     styleTxt={[Styles.txtbtn2, { fontSize: normalize(16) }]} sizeIcon={27} />
          </View>
        </View>
      </View>
    </View>
  );
  const _showModalAccept = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalAccept}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalAccept(false)}
          transparent={true}>
          {renderModalContentAccept()}
        </Modal>
      </View>
    );
  };
  const renderModalContentAccept = () => (
    <View style={Styles.TaskModalTotalStyle}>
      <View style={Styles.DeleteModalStyle23}>
        <View style={{ width: "89%" }}>
          <TouchableOpacity onPress={() => {
            setshowModalAccept(false);
          }} style={Styles.CancelBtnLeftAlign}>
            <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
          </TouchableOpacity>
        </View>
        <TextInputI onChangeText={(value) => {
          Accept_Task(value);
        }}
                    numberValue={28} setOpen={setOpen} tittlebtn={"Send"} error={error}
                    setOpenend={setOpenend} DateFormatplanstart={DateFormatplanstart}
                    setdateType={setdateType} DateFormatplanend={DateFormatplanend}
                    ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked}
        />
      </View>
    </View>
  );
  const ChangeChecked = (value) => {
    setCheked(!Cheked);
  };
  ///get Technician task list from server///
  const My_TaskList_server = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Assigned_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {

        GLOBAL.buttonName = "Assigned_TaskList";
        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);
      });
    }
  };
  ///get user add task list from server///
  const My_TaskList_server2 = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.My_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        GLOBAL.buttonName = "My_TaskList";
        writeDataStorage(GLOBAL.All_Task, json?.tasks);
      });
    }
  };
  const Reject_Task = async () => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    //setshowModalReject(false)
    if (reasonId === false) {
      seterror("Reason");
    } else {
      const formData = new FormData();
      formData.append("userId", GLOBAL.UserInformation?.userId);
      formData.append("taskId", Task_detail?.taskId);
      formData.append("taskStatusId", "7");
      formData.append("reasonId", reasonId);
      formData.append("description", reasonDescription);
      writePostApi("POST", Api.Change_Task_Status, formData).then(json => {
        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg);
            setShowMessage(true);
            GetTaskDetail();
            My_TaskList_server();
            setshowModalReject(false);
            setShowMessage(false);
            if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
              let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
              let mark = [...GLOBAL?.FilterList];
              mark[index] = {
                ...mark[index],
                taskStatusColor: "#5a5a5a",
                taskStatusName: "Cancelled",
                taskUpdated: "y",
              };
              GLOBAL.FilterList = mark;
            }
          }
        } else {
          let markers = Task_detail;
          markers = { ...markers, taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled", taskUpdated: "y" };
          Save_Details_Online(markers);
          setTask_detail(markers);
          setMessage("Your task status successfully changed");
          setShowMessage(true);
          let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId));
          let markers_List = [...List_Item];
          markers[index] = { ...markers[index], taskStatusColor: "#5a5a5a", taskStatusName: "Rejected" };
          ReadApi("#5a5a5a", "Cancelled");
          writeDataStorage(GLOBAL.Assigned_TaskList, markers_List);
          setshowModalReject(false);
          setShowMessage(false);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index2 = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index2] = {
              ...mark[index2],
              taskStatusColor: "#5a5a5a",
              taskStatusName: "Cancelled",
              taskUpdated: "y",
            };
            GLOBAL.FilterList = mark;
          }
        }
      });
    }
  };
  ///  change task detail info when Technician reject or accept task when app is offline///
  const ReadApi = async (taskStatusColor, taskStatusName) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: taskStatusColor, taskStatusName: taskStatusName };
    writeDataStorage(GLOBAL.Assigned_TaskList, markers_List);
  };
  ///  change task detail info when user cancell task when app is offline///
  const ReadApiTask = async (taskStatusColor, taskStatusName) => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId));
    let markers_List = [...List_Item];
    markers_List[index] = { ...markers_List[index], taskStatusColor: taskStatusColor, taskStatusName: taskStatusName };
    writeDataStorage(GLOBAL.Assigned_TaskList, markers_List);
  };
  const Accept_Task = (value) => {
    if (DateFormatplanstart === "") {
      seterror("PlanStartDate");
    } else if (DateFormatplanend === "") {
      seterror("PlanEndDate");
    } else {
      const formData = new FormData();
      formData.append("userId", GLOBAL.UserInformation?.userId);
      formData.append("taskId", Task_detail?.taskId);
      formData.append("taskStatusId", "8");
      formData.append("planStartDate", DateFormatplanstart);
      formData.append("planEndDate", DateFormatplanend);
      formData.append("planFeedback", value?.FeedbackNote);
      formData.append("requestNotes", value?.CaseNote);
      writePostApi("POST", Api.Change_Task_Status, formData).then(json => {
        if (json) {
          if (json?.status === true) {
            setMessage(json?.msg);
            setShowMessage(true);
            GetTaskDetail();
            My_TaskList_server();
            ReadApi("#008000", "In Progress");
            setShowMessage(false);
            setshowModalAccept(false);
            if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
              let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
              let mark = [...GLOBAL?.FilterList];
              mark[index] = {
                ...mark[index],
                taskStatusColor: "#008000",
                taskStatusName: "In Progress",
                taskUpdated: "y",
              };
              GLOBAL.FilterList = mark;
            }

          }
        } else {
          let markers = Task_detail;
          markers = { ...markers, taskStatusColor: "#008000", taskStatusId: "8", taskStatusName: "Accepted" };
          Save_Details_Online(markers);
          setTask_detail(markers);
          ReadApi();
          setMessage("Your task status successfully changed");
          setShowMessage(true);
          setMessage("Your task status successfully changed.");
          setShowMessage(true);
          setShowMessage(false);
          setshowModalAccept(false);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index2 = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index2] = {
              ...mark[index2],
              taskStatusColor: "#5a5a5a",
              taskStatusName: "Cancelled",
              taskUpdated: "y",
            };
            GLOBAL.FilterList = mark;
          }
        }
      });
    }
  };
  const _renderItem_Carousel = ({ item, index }) => {
    return (
      <TaskDetailImage item={item} key={index} colors={["#a39898", "#786b6b", "#382e2e"]} IconColor={"#786b6b"} />
    );
  };
  const _renderItem_Carousel_Edit = ({ item, index }) => {
    return (
      <Task_Edit_Image item={item} key={index} onOpen={onOpen}
                       colors={["#a39898", "#786b6b", "#382e2e"]}
                       IconColor={"#786b6b"} setattachmentId={setattachmentId} settaskId={settaskId}
                       setshowModalDelete={setshowModalDeleteImages} />
    );
  };
  const _changestatus = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={changestatus}
          avoKeyboard={true}
          onBackdropPress={() => setchangestatus(false)}
          transparent={true}
        >
          {renderchangestatusModalContent()}
        </Modal>
      </View>
    );
  };
  ///change status to cancell///
  const Updatestatus = async () => {
    let List_Item = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", GLOBAL.TaskId);
    formData.append("taskStatusId", "6");
    writePostApi("POST", Api.Change_Task_Status, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          My_TaskList_server2();
          GetTaskDetail();
          setchangestatus(false);
          setShowMessage(false);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index] = { ...mark[index], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled", taskUpdated: "y" };
            GLOBAL.FilterList = mark;
          }
        }
      } else {
        let index = List_Item?.findIndex((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId));
        let markers_List = [...List_Item];
        markers_List[index] = { ...markers_List[index], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled" };
        writeDataStorage(GLOBAL.All_Task, markers_List);
        ReadApiTask("#5a5a5a", "Cancelled");
        setMessage("Your task status successfully changed");
        setShowMessage(true);
        setchangestatus(false);
        setShowMessage(false);
        if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
          let index2 = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
          let mark = [...GLOBAL?.FilterList];
          mark[index2] = { ...mark[index2], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled", taskUpdated: "y" };
          GLOBAL.FilterList = mark;
        }
      }
    });
  };
  const renderchangestatusModalContent = () => (
    <View style={[Styles.taskModalStyle, { paddingVertical: normalize(25) }]}>
      <View style={Styles.With95}>

        <Text style={Styles.txt_left23}>
          Do you want to Cancel {Task_detail?.taskTitle} ?
        </Text>
      </View>
      <View style={Styles.With90Row}>
        <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => setchangestatus(false)}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => {
            Updatestatus();

          }}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );

  const _Completestask = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={completedtask}
          avoKeyboard={true}
          onBackdropPress={() => setcompletedtask(false)}
          transparent={true}
        >
          {renderCompletestaskModalContent()}
        </Modal>
      </View>
    );
  };
  ///Calculate days of between two dates///
  const dateDifferenceInDays = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 86_400_000;
  ///Calculate Hours of between two dates///
  const dateDifferenceInHours = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 3_600_000;
  const renderCompletestaskModalContent = () => (
    <View style={[Styles.taskModalStyle, { paddingVertical: normalize(55) }]}>
      <View style={Styles.With95}>
        <View style={[{ width: "89%", marginBottom: "4%" }]}>
          <TouchableOpacity onPress={() => {
            setcompletedtask(false);
          }} style={Styles.CancelBtnLeftAlign}>
            <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
          </TouchableOpacity>
        </View>
        <TextInputI onChangeText={(value) => {
          UpdatestatusCompleted(value);
        }} TimeRelated={TimeRelated} TimeRelatedselct={TimeRelatedselct} setTimeRelatedselct={setTimeRelatedselct}
                    numberValue={33} setOpen={setOpen} tittlebtn={"Completed"} error={error}
                    setOpenend={setOpenend} DateFormatplanstart={DateFormatplanstart}
                    dateDifferenceDays={dateDifferenceDays}
                    setdateType={setdateType} DateFormatplanend={DateFormatplanend}
                    dateDifferenceHours={dateDifferenceHours}
                    ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked}
        />
      </View>
    </View>
  );
  ///Technician edit task after accept ///
  const Update_AssignTask = async (value, taskId, Cheked) => {

    let Display = "";
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", taskId);
    formData.append("title", value?.Title);
    formData.append("planFeedback", value?.TaskNote);

    formData.append("planStartDate", DateFormatplanstart);
    formData.append("planEndDate", DateFormatplanend);
    if (Cheked === true) {
      formData.append("taskStatusId", "4");
    }

    if (value?.CaseNote.split("\n")?.length === 1) {
      formData.append("requestNotes", value?.CaseNote);
      Display = value?.CaseNote;

    } else if (value?.CaseNote.split("\n")?.length > 1) {
      if (value?.CaseNote.split("\n")?.[2] === "") {
        formData.append("requestNotes", Description);
        Display = Description;
      } else {
        formData.append("requestNotes", value?.CaseNote.split("\n")?.[0] + value?.CaseNote.split("\n")?.[2]);
        Display = value?.CaseNote.split("\n")?.[0] + value?.CaseNote.split("\n")?.[2];
      }
    }

    if (ImageSourceviewarrayUpload?.length !== 0) {
      ImageSourceviewarrayUpload?.forEach((obj) => {
        formData.append("attachments[]", {
          uri: obj?.uri,
          type: obj?.type,
          name: obj?.fileName,
        });
      });
      writePostApi("POST", Api.UpdateTask, formData, ImageSourceviewarrayUpload).then(json => {
        if (json) {
          if (json?.status === true) {
            Assigned_TaskList_server();
            GetTaskDetail();
            setMessage(json?.msg);
            setShowMessage(true);
            setImageSourceviewarrayUpload([]);
            setShowButton(false);
            setShowBackBtn(true);
            if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
              let index2 = GLOBAL?.FilterList?.findIndex((p) => p?.taskId === GLOBAL?.TaskId);
              let mark = [...GLOBAL?.FilterList];
              mark[index2] = {
                ...mark[index2],
                taskTitle: value?.Title,
                taskRequestNotes: value?.TaskNote,
                taskFeedback: Display,
                taskUpdated: "y",
              };
              GLOBAL.FilterList = mark;
            }
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
          Update_AssignTask_Offline(value, taskId, Display, Cheked);
          setMessage("Your task successfully Updated");
          setShowMessage(true);
          setImageSourceviewarrayUpload([]);
          setShowButton(false);
          setShowBackBtn(true);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index2 = GLOBAL?.FilterList?.findIndex((p) => p?.taskId === GLOBAL?.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index2] = {
              ...mark[index2],
              taskTitle: value?.Title,
              taskRequestNotes: value?.TaskNote,
              taskFeedback: Display,
              taskUpdated: "y",
            };
            GLOBAL.FilterList = mark;
          }
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    } else {
      writePostApi("POST", Api.UpdateTask, formData).then(json => {
        if (json) {
          if (json?.status === true) {
            Assigned_TaskList_server();
            GetTaskDetail();
            setMessage(json?.msg);
            setShowMessage(true);
            setShowButton(false);
            setShowBackBtn(true);
            if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
              let index2 = GLOBAL?.FilterList?.findIndex((p) => p?.taskId === GLOBAL?.TaskId);
              let mark = [...GLOBAL?.FilterList];
              mark[index2] = {
                ...mark[index2],
                taskTitle: value?.Title,
                taskRequestNotes: value?.TaskNote,
                taskFeedback: Display,
                taskUpdated: "y",
              };
              GLOBAL.FilterList = mark;
            }
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
          Update_AssignTask_Offline(value, taskId, Display, Cheked);
          setMessage("Your task successfully Updated");
          setShowMessage(true);
          setShowButton(false);
          setShowBackBtn(true);
          if (GLOBAL?.FilterTime === true || GLOBAL?.FilterStatus === true || GLOBAL?.FilterPriority === true || GLOBAL.FilterCategory === true) {
            let index2 = GLOBAL?.FilterList?.findIndex((p) => p?.taskId === GLOBAL?.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index2] = {
              ...mark[index2],
              taskTitle: value?.Title,
              taskRequestNotes: value?.TaskNote,
              taskFeedback: Display,
              taskUpdated: "y",
            };
            GLOBAL.FilterList = mark;
          }
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    }
  };
  ///Technician edit task after accept when app is offline ///
  const Update_AssignTask_Offline = async (value, taskId, Display, Cheked) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A = [];
    let B = [];
    let C = [];
    let ImageSource = [];
    let Status = "";
    let Status_color = "";
    if (Cheked === true) {
      Status = "Completed";
      Status_color = "#0000FF";
    } else {
      Status = "In Progress";
      Status_color = "#008000";
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
    let index = List_Item?.findIndex((p) => p.taskId === taskId);
    let index_detail = List_Item_detail?.findIndex((p) => p.taskId === taskId);
    if (ImageSourceviewarrayUpload.length !== 0) {
      ImageSource = [...List_Item?.find((p) => p.taskId === taskId)?.attachments];

      ImageSourceviewarrayUpload?.forEach((obj) => {
          ImageSource.push({
            attachmentId: obj?.attachmentId,
            attachmentUrl: obj?.uri,
            attachmentName: obj?.fileName,
          });
        },
      );
      A[index] = {
        ...A[index],
        taskTitle: value?.Title,
        taskRequestNotes: Display,
        attachments: ImageSource,
        taskUpdated: "y",
        taskFeedback: value?.TaskNote,
        taskPlanStartDate: DateFormatplanstart,
        taskPlanDueDate: DateFormatplanend,
        Format_Dates_StartDate: new Date(DateFormatplanstart),
        Format_Dates_DueDate: new Date(DateFormatplanend),
        taskStatusColor: Status_color,
        taskStatusName: Status,

      };
      List_Item = A;
      B[index_detail] = {
        ...B[index_detail],
        taskTitle: value?.Title,
        taskRequestNotes: Display,
        attachments: ImageSource,
        taskFeedback: value?.TaskNote,
        taskPlanStartDate: DateFormatplanstart,
        taskPlanDueDate: DateFormatplanend,
        Format_Dates_StartDate: new Date(DateFormatplanstart),
        Format_Dates_DueDate: new Date(DateFormatplanend),
        taskStatusColor: Status_color,
        taskStatusName: Status,
      };
      List_Item_detail = B;
    } else {
      A[index] = {
        ...A[index],
        taskTitle: value?.Title,
        taskRequestNotes: Display,
        taskUpdated: "y",
        taskFeedback: value?.TaskNote,
        taskPlanStartDate: DateFormatplanstart,
        taskPlanDueDate: DateFormatplanend,
        Format_Dates_StartDate: new Date(DateFormatplanstart),
        Format_Dates_DueDate: new Date(DateFormatplanend),
        taskStatusColor: Status_color,
        taskStatusName: Status,
      };
      List_Item = A;
      B[index_detail] = {
        ...B[index_detail], taskTitle: value?.Title, taskRequestNotes: Display, taskFeedback: value?.TaskNote,
        taskPlanStartDate: DateFormatplanstart, taskPlanDueDate: DateFormatplanend,
        Format_Dates_StartDate: new Date(DateFormatplanstart),
        Format_Dates_DueDate: new Date(DateFormatplanend), taskStatusColor: Status_color, taskStatusName: Status,
      };
      List_Item_detail = B;
    }


    if (ImageSourceviewarrayUpload.length !== 0) {
      ImageSourceviewarrayUpload?.forEach((obj) => {
        C.push({
          taskId: taskId,
          attachmentUrl: obj?.uri,
        });
      });
      List_attachments = C;
    }

    await AsyncStorage.setItem(GLOBAL.Assigned_TaskList, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    setImageSourceviewarrayUpload([]);
  };
  const onOpen = () => {
    setshowModalAddImage(true);
  };
  const onClosetask = () => {
    setshowModalAddImage(false);
  };
  const DeleteImage_task = (attachmentId, ImageSourceviewarray) => {
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
    DeleteAttachment(attachmentId, taskId);
  };
  const DeleteAttachment = async (attachmentId, taskId) => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("attachmentId", attachmentId);
    writePostApi("POST", Api.DeleteAttachment, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          Assigned_TaskList_server();
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      } else {
        Delete_AssignedTask_Offline(attachmentId, taskId);
        setMessage("Your attachment successfully deleted.");
        setShowMessage(true);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 2000);
        return () => clearInterval(timerId);
      }
    });
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
  };
  ///get Technician task list///
  const Assigned_TaskList_server = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Assigned_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {

        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);

      });
    }
  };

  const renderContent = () => (
    <View style={Styles.BtnBoxtask}>
      <View style={Styles.BtnBoxtask2}>
        <TouchableOpacity onPress={() => onClosetask()} style={Styles.CancelBtn}>
          <View style={{ width: "80%" }}>
            <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          selectPhoto();
        }} style={Styles.UploadBtn}>
          <AntDesign name={"camera"} size={17} color={"#fff"} />
          <Text style={[Styles.TextUploadBtn]}>
            Use Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          selectPhotoFromGallery();
        }} style={Styles.UploadBtn}>
          <AntDesign name={"picture"} size={17} color={"#fff"} />
          <Text style={[Styles.TextUploadBtn]}>
            Choose From Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const _showModalAddImage = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalAddImage}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalAddImage(false)}
          transparent={true}>
          {renderContent()}
        </Modal>
      </View>
    );
  };
  const selectPhotoFromGallery = () => {
    onClosetask();
    selectPhotoGallery().then(response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        if (ImageSourceviewarray) {
          let List_Item = ImageSourceviewarray;
          let index = List_Item?.findIndex((p) => p.Type === "AddImage");
          let markers = [...List_Item];
          markers?.splice(index, 1);
          A = [...markers];
        }
        // A = [...ImageSourceviewarray];
        if (ImageSourceviewarrayUpload)
          B = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let attachmentId = 0;
          if (A?.length !== 0) {
            attachmentId = parseInt(A?.[A?.length - 1]?.attachmentId) + 1;
          } else {
            attachmentId = attachmentId + 1;
          }
          A.push({
            attachmentUrl: obj.path,
            type: obj.mime,
            fileName: imgName,
            attachmentId: attachmentId,
            taskId: taskId,
          });
          Image_compress(obj.path).then(res => {
            B.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              attachmentId: attachmentId,
              taskId: GLOBAL.TaskId,
            });
            if (B?.length === response?.length) {
              setImageSourceviewarrayUpload(B);
              B = [...B];
            }
          });
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
          type: "AddImage",
          fileName: "",
          attachmentId: "",
        };
        A = [...A, mark2];
        setImageSourceviewarray(A);
        setShowBackBtn(false);
        setShowButton(true);
        A = [...A];
      }
    });
  };
  ///Reduce the size of the photo///
  const Image_compress = async (path) => {
    return await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    });
  };
  const selectPhoto = () => {
    onClosetask();
    selectPhotocamera().then(response => {
      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      if (ImageSourceviewarray) {
        let List_Item = ImageSourceviewarray;
        let index = List_Item?.findIndex((p) => p.Type === "AddImage");
        let markers = [...List_Item];
        markers?.splice(index, 1);
        A = [...markers];
      }
      if (ImageSourceviewarrayUpload)
        B = [...ImageSourceviewarrayUpload];
      let attachmentId = 0;
      if (A?.length !== 0) {
        attachmentId = parseInt(A?.[A?.length - 1]?.attachmentId) + 1;
      } else {
        attachmentId = attachmentId + 1;
      }
      A.push({
        attachmentUrl: response.path,
        type: response.mime,
        fileName: imgName,
        attachmentId: attachmentId,
        taskId: taskId,
      });
      Image.compress(response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {
        B.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          attachmentId: attachmentId,
          taskId: GLOBAL.TaskId,
        });
        setImageSourceviewarrayUpload(B);
        B = [...B];
      });
      let mark2 = {
        attachmentUrl: "",
        type: "AddImage",
        fileName: "",
        attachmentId: "",
      };
      A = [...A, mark2];
      setImageSourceviewarray(A);
      setShowButton(true);
      setShowBackBtn(false);
      A = [...A];

    });


  };
///header back button =>if add photos and did not send server send message if not navigate back///
  const Back_navigate = (isValid) => {
    if (ShowBackBtn === false || isValid === false) {
      setShowWarningMessage(true);
      setShowBackBtn(true);
      //setTimeout(function(){ setShowBackBtn(true)}, 2000)
    } else {
      goBack();
    }
  };
  const _showModalDelete_Images = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDeleteImages}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDeleteImages(false)}
          transparent={true}>
          {renderModalContent_Images()}
        </Modal>
      </View>
    );
  };
  const renderModalContent_Images = () => (
    <View style={Styles.DeleteModalStyle}>
      <View style={Styles.With100NoFlex}>
        <FastImage style={{ width: "27%", aspectRatio: 1, marginVertical: normalize(10) }}
                   source={Photoes.Alert}
                   resizeMode="contain" />
        <View style={Styles.With100NoFlex}>
          <Text style={Styles.txt_left2}>
            Do you want to delete Image from List?
          </Text>
        </View>
      </View>
      <View style={Styles.With100Row}>
        <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => setshowModalDeleteImages(false)}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => {
            DeleteImage_task(attachmentId, ImageSourceviewarray, taskId);
            setshowModalDeleteImages(false);
            setIsFocus(false);
          }}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
///header back button when Technician =>if add photos or change items and did not send server send message if not navigate back///
  const string_equalityAssignTask = (values) => {
    let isValid = false;
    if (values?.DateFormatplanend !== DateFormatplanend) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setscroll(false);
      setShowBackBtn(false);
      isValid = true;
    } else if (values?.DateFormatplanstart !== DateFormatplanstart) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setscroll(false);
      setShowBackBtn(false);
      isValid = true;
    } else if (values?.TaskNote !== Task_detail?.taskFeedback) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setscroll(false);
      setShowBackBtn(false);
      isValid = true;
    } else if (values?.CaseNote?.split("\n")?.length > 1) {
      if (values?.CaseNote?.split("\n")?.[2] !== "") {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
        setscroll(false);
        setShowBackBtn(false);
        isValid = true;
      }
    } else if (values?.CaseNote?.split("\n")?.length === 1) {
      if (values?.CaseNote === "" || values?.CaseNote.split("\n")?.[0] !== Task_detail?.taskRequestNotes) {
        setShowBackBtn(false);
        isValid = true;
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
        setscroll(false);
      }
    }
    if (isValid) {
      //setShowBackBtn(false)

      isValid = true;
      Back_navigate(false);
    } else {

      Back_navigate();
    }
  };
  const onChangeText = (value) => {
    Update_AssignTask(value, Task_detail?.taskId, Cheked);
  };

  return (
    <>
      {
        Task_detail?.taskStatusName === "Accepted" && GLOBAL.selectItem === 2 ?
          <Container style={[Styles.Backcolor]}>
            <>
              {showModalDelete &&
              <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
              }

              <DatePicker modal
                          theme={"light"}
                          open={open}
                          date={date}
                          onConfirm={(date) => {
                            setOpen(false);
                            setDate(date);
                            setDateFormatplanstart(Moment(date)?.format("YYYY-MM-DD H:mm"));
                            setShowButton(true);
                            setstartdate(date);
                            if (dateend === "") {
                              let Days = dateDifferenceInDays(
                                new Date(Moment(date)?.format("YYYY-MM-DD")),
                                new Date(Moment(DateFormatplanend)?.format("YYYY-MM-DD")),
                              );
                              let hours = dateDifferenceInHours(
                                new Date(Moment(date)?.format("YYYY-MM-DD H:mm")),
                                new Date(Moment(DateFormatplanend)?.format("YYYY-MM-DD H:mm")),
                              );

                              if (Days !== 0) {
                                setdateDifferenceInHours(0);
                                setdateDifferenceInDays(parseInt(Days));
                                setTimeRelatedselct("days");
                              } else {
                                setdateDifferenceInDays(0);
                                setdateDifferenceInHours(parseInt(hours));
                                setTimeRelatedselct("hours");
                              }
                            } else {
                              let Days = dateDifferenceInDays(
                                new Date(Moment(date)?.format("YYYY-MM-DD")),
                                new Date(Moment(dateend)?.format("YYYY-MM-DD")),
                              );
                              let hours = dateDifferenceInHours(
                                new Date(Moment(date)?.format("YYYY-MM-DD H:mm")),
                                new Date(Moment(dateend)?.format("YYYY-MM-DD H:mm")),
                              );
                              if (Days !== 0) {
                                setdateDifferenceInHours(0);
                                setdateDifferenceInDays(parseInt(Days));
                                setTimeRelatedselct("days");
                              } else {
                                setdateDifferenceInDays(0);
                                setdateDifferenceInHours(parseInt(hours));
                                setTimeRelatedselct("hours");
                              }
                            }
                          }}
                          textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
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
                            setDateFormatplanend(Moment(date)?.format("YYYY-MM-DD H:mm"));
                            setShowButton(true);
                            if (startdate === "") {
                              let Days = dateDifferenceInDays(
                                new Date(Moment(DateFormatplanstart)?.format("YYYY-MM-DD")),
                                new Date(Moment(date)?.format("YYYY-MM-DD")),
                              );
                              let hours = dateDifferenceInHours(
                                new Date(Moment(DateFormatplanstart)?.format("YYYY-MM-DD H:mm")),
                                new Date(Moment(date)?.format("YYYY-MM-DD H:mm")),
                              );
                              if (Days !== 0) {
                                setdateDifferenceInHours(0);
                                setdateDifferenceInDays(parseInt(Days));
                                setTimeRelatedselct("days");
                              } else {
                                setdateDifferenceInDays(0);
                                setdateDifferenceInHours(hours);
                                setTimeRelatedselct("hours");
                              }
                            } else {
                              let Days = dateDifferenceInDays(
                                new Date(Moment(startdate)?.format("YYYY-MM-DD")),
                                new Date(Moment(date)?.format("YYYY-MM-DD")),
                              );
                              let hours = dateDifferenceInHours(
                                new Date(Moment(startdate)?.format("YYYY-MM-DD H:mm")),
                                new Date(Moment(date)?.format("YYYY-MM-DD H:mm")),
                              );

                              if (Days !== 0) {
                                setdateDifferenceInHours(0);
                                setdateDifferenceInDays(parseInt(Days));
                                setTimeRelatedselct("days");
                              } else {
                                setdateDifferenceInDays(0);
                                setdateDifferenceInHours(parseInt(hours));
                                setTimeRelatedselct("hours");
                              }
                            }
                          }}
                          textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
                          onCancel={() => {
                            setOpenend(false);
                          }} />
              <Formik
                initialValues={{
                  Title: Task_detail?.taskTitle,
                  TaskNote: Task_detail?.taskFeedback,
                  CaseNote: Task_detail?.taskRequestNotes,
                  DateFormatplanstart: Task_detail?.taskPlanStartDate,
                  DateFormatplanend: Task_detail?.taskPlanDueDate,
                }}
                onSubmit={values => {
                  onChangeText(values);
                }}>
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <>
                    <View>
                      <StatusBar barStyle="light-content" backgroundColor={"#a39897"} />
                      <LinearGradient colors={["#a39898", "#786b6b", "#382e2e"]} style={Styles.HeaderItems}>
                        <View style={{ width: "2%" }} />
                        <View style={{ width: "12%" }}>
                          <Button onPress={() => string_equalityAssignTask(values)} transparent style={Styles.Backbtn}>
                            <AntDesign name={"arrowleft"} size={21} color={"#fff"} />
                          </Button>
                        </View>
                        <View style={{ width: "76%" }}>
                          <Text numberOfLines={1} style={[Styles.HeaderText]}>Task Details</Text>
                        </View>
                        <View style={{ width: "10%" }} />
                      </LinearGradient>
                      <View style={Styles.ViewAbsolute} />
                    </View>
                    <View style={Styles.container}>
                      <View style={Styles.formContainertask}>
                        <View style={{ width: "95%", justifyContent: "center", alignItems: "center" }}>
                          <ScrollView ref={scrollRef} style={[Styles.formContainer2, { marginTop: "6%" }]}>
                            <View style={Styles.formContainer2}>
                              {showWarning === true && <Warningmessage />}
                              {ShowWarningMessage === true &&
                              <View style={Styles.flashMessageWarning4}>
                                <View style={Styles.flashMessageWarning6}>
                                  <View style={{ width: "10%", alignItems: "center", justifyContent: "flex-start" }}>
                                    <FontAwesome size={normalize(18)} color={"#fff"} name={"exclamation-circle"} />
                                  </View>
                                  <View style={{ width: "90%", alignItems: "flex-start" }}>
                                    <Text style={Styles.AddedtTxt}>
                                      You will lose all changes.Do you still want to leave?
                                    </Text>
                                  </View>
                                </View>
                                <View style={Styles.With100Row2}>
                                  <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]}
                                                  style={Styles.btnListDelete}>
                                    <TouchableOpacity onPress={() => {
                                      setShowBackBtn(false);
                                      setShowWarningMessage(false);
                                    }}>
                                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
                                    </TouchableOpacity>
                                  </LinearGradient>
                                  <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]}
                                                  style={Styles.btnListDelete}>
                                    <TouchableOpacity onPress={() => {
                                      setShowWarningMessage(false);
                                      setShowBackBtn(true);
                                      goBack();
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
                                showModalDeleteImages &&
                                <View>
                                  {
                                    _showModalDelete_Images()
                                  }
                                </View>
                              }
                              <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>Title</Text>
                              <TextInput
                                value={values.Title}
                                editable={false}
                                style={[Styles.inputStyleTask]}

                                multiline={true}
                                placeholderTextColor={"#fff"} />
                              {
                                GLOBAL.UserInformation?.roleName === "Technician" && Task_detail?.taskNotify === "y" &&
                                <View style={Styles.dateBox}>
                                  <View style={[Styles.inputStyletask24]}>
                                    <View style={Styles.RowTask1}>
                                      <View style={Styles.RowTask_Items}>
                                        {/*<FontAwesome6 name="bell" size={normalize(14)} color={Colors.button} />*/}
                                        <Text numberOfLines={10} style={[Styles.txtLightColor]}>Notify The changes
                                          {Task_detail?.taskNotifyNotes}
                                        </Text>
                                      </View>
                                      <View style={Styles.RowTask_Items}>
                                        <ToggleSwitch
                                          isOn={switchDYB}
                                          size="medium"
                                          style={{ marginLeft: "auto", marginTop: normalize(1) }}
                                          trackOnStyle={{
                                            backgroundColor: "#4a6e8e",
                                          }}
                                          trackOffStyle={{
                                            backgroundColor: "#4a6e8e",
                                          }}
                                          thumbOffStyle={{
                                            borderRadius: 19,
                                            borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                                            backgroundColor: "#b8b7b7",
                                          }}
                                          thumbOnStyle={{
                                            borderRadius: 19,
                                            //rgb(102,134,205)
                                            borderColor: "rgb(255,255,255)",
                                            backgroundColor: "#fff",
                                          }}
                                          onToggle={isOn => {
                                            setswitchDYB(isOn);
                                            setCheked(isOn);
                                            Notify(isOn);
                                          }}
                                        />
                                        <Text numberOfLines={10} style={[Styles.txtLightColortask_Items33]}>Yes
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              }

                              <View style={Styles.dateBox}>
                                <View style={Styles.dateBoxitems}>
                                  <TouchableOpacity onPress={() => {
                                    setdateType("PlanStartDate");
                                    setOpen(true);
                                  }} style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Plan Date
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {
                                    setdateType("PlanEndDate");
                                    setOpenend(true);
                                  }} style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Completed
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={Styles.dateBoxitems}>
                                  <TouchableOpacity onPress={() => {
                                    setOpen(true);
                                  }} style={Styles.dateBoxItem}>
                                    <Text style={Styles.txtdate2}>
                                      {DateFormatplanstart}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {
                                    setOpenend(true);
                                  }}
                                                    style={Styles.dateBoxItem}>
                                    <Text style={Styles.txtdate2}>
                                      {DateFormatplanend}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={Styles.dateBoxitems}>
                                  <View style={Styles.dateBoxItemBorder}>

                                    {error === "PlanStartDate" && DateFormatplanstart === "" ?
                                      <Text style={{
                                        fontSize: 12,
                                        color: "#FF0D10",
                                        marginTop: normalize(10),
                                        fontFamily: "TisaSansProBoldItalic",
                                      }}>Select PlanStartDate! Please?</Text> : null
                                    }
                                  </View>
                                  <View style={Styles.dateBoxItemBorder}>
                                    {error === "PlanEndDate" && DateFormatplanend === "" ?
                                      <Text style={{
                                        fontSize: 12,
                                        color: "#FF0D10",
                                        marginTop: normalize(10),
                                        fontFamily: "TisaSansProBoldItalic",
                                      }}>Select PlanEndDate! Please?</Text> : null
                                    }
                                  </View>
                                </View>
                                <View style={Styles.dateBoxitems}>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      WorkType
                                    </Text>
                                  </View>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Parent Task
                                    </Text>
                                  </View>
                                </View>
                                <View style={[Styles.dateBoxitems, { marginTop: "1%" }]}>
                                  <View style={Styles.dateBoxItem}>
                                    <Text style={[Styles.txtdate2]}>
                                      {Task_detail?.taskWorkType}
                                    </Text>
                                  </View>
                                  <View style={[Styles.dateBoxItem]}>
                                    <Text style={[Styles.txtdate2]}>
                                      {Task_detail?.taskParentTitle}
                                    </Text>
                                  </View>
                                </View>
                                <View style={Styles.dateBoxitems}>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Created On
                                    </Text>
                                  </View>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Category
                                    </Text>
                                  </View>
                                </View>
                                <View style={[Styles.dateBoxitems, { marginTop: "1%" }]}>
                                  <View style={Styles.dateBoxItem}>
                                    <Text style={[Styles.txtdate2]}>
                                      {Task_detail?.taskCreatedOn}
                                    </Text>
                                  </View>
                                  <View style={[Styles.dateBoxItem]}>
                                    <Text style={[Styles.txtdate2]}>
                                      {Task_detail?.taskCategoryName}
                                    </Text>
                                  </View>
                                </View>


                                <View style={Styles.dateBoxitems}>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Entity Name
                                    </Text>
                                  </View>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Entity Related Name
                                    </Text>
                                  </View>
                                </View>
                                <View style={[Styles.dateBoxitems, { marginTop: "1%" }]}>
                                  <View style={Styles.dateBoxItem}>
                                    <Text style={[Styles.txtdate2]}>
                                      {Task_detail?.taskRelatedName}
                                    </Text>
                                  </View>
                                  <View style={[Styles.dateBoxItem]}>
                                    <Text style={[Styles.txtdate2]}>
                                      {Task_detail?.taskRelatedNameRef}
                                    </Text>
                                  </View>
                                </View>


                                <View style={Styles.dateBoxitems}>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Status
                                    </Text>
                                  </View>
                                  <View style={Styles.dateBoxItemtransparent}>
                                    <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>
                                      Priority
                                    </Text>
                                  </View>
                                </View>
                                <View style={[Styles.dateBoxitems, { marginTop: "1%" }]}>
                                  <View style={Styles.dateBoxItem}>
                                    <Text style={[Styles.txtdate, { color: Task_detail?.taskStatusColor }]}>
                                      {Task_detail?.taskStatusName}
                                    </Text>
                                  </View>
                                  <View style={[Styles.dateBoxItem]}>
                                    <Text style={[Styles.txtdate, { color: "#fcd274" }]}>
                                      {Task_detail?.taskPriorityName}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>Description</Text>
                              <TextInput
                                value={Task_detail.taskDescription}
                                style={[Styles.inputStyleTask, { paddingVertical: "4%" }]}
                                onContentSizeChange={(e) => {
                                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                                }}
                                editable={false}
                                multiline={true}
                                placeholderTextColor={"#fff"} />
                              <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>Feedback for
                                Request</Text>
                              <TextInput
                                value={values.TaskNote}
                                style={[Styles.inputStyleTask, { paddingVertical: "4%" }]}
                                onContentSizeChange={(e) => {
                                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                                }}
                                onChangeText={handleChange("TaskNote")}
                                onFocus={() => {
                                  setFieldTouched("TaskNote");
                                }}
                                onBlur={() => {
                                  if (values?.TaskNote !== Task_detail?.taskDescription)
                                    setShowButton(true);
                                }}
                                multiline={true}
                                placeholderTextColor={"#fff"} />
                              <Text style={[Styles.txtLightColor, { marginTop: normalize(15) }]}>Case Note</Text>
                              <TextInput
                                value={values.CaseNote}
                                style={[Styles.inputStyleTask, { paddingVertical: "4%" }]}
                                onContentSizeChange={(e) => {
                                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                                }}
                                onChangeText={handleChange("CaseNote")}
                                onFocus={() => {
                                  setFieldTouched("CaseNote");
                                  let split = values?.CaseNote?.split("\n");
                                  if (split?.length === 1) {
                                    values.CaseNote = taskRequestNotes + `\n---${Full}---\n`;
                                  } else {
                                    values.CaseNote = split?.[0] + `\n---${Full}---\n` + split?.[2];
                                  }
                                }}
                                onBlur={() => {
                                  let split = values?.CaseNote?.split("\n");
                                  if (split?.[2] === "") {
                                    values.CaseNote = Task_detail?.taskRequestNotes;
                                  } else {
                                    values.CaseNote = split?.[0] + `\n---${Full}---\n` + split?.[2];
                                    settaskRequestNotes(values.CaseNote);
                                  }
                                }}
                                multiline={true}
                                placeholderTextColor={"#fff"} />
                              {ImageSourceviewarray?.length !== 0 && (
                                <View style={Styles.With100NoFlexMarginBotoom}>
                                  <View style={[Styles.carouselBtnStyle, { marginTop: "4%" }]}>
                                    <TouchableOpacity style={Styles.carouselStyle}
                                                      onPress={() => _slider1Ref.snapToPrev()}>
                                      <AntDesign name="caretleft" size={normalize(14)} color={Colors.button} />
                                      <Text style={Styles.skiptext}>Prev</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Styles.carouselStyle1}
                                                      onPress={() => _slider1Ref.snapToNext()}>
                                      <Text style={Styles.skiptext}>Next</Text>
                                      <AntDesign name="caretright" size={normalize(14)} color={Colors.button} />
                                    </TouchableOpacity>
                                  </View>
                                  <Carousel
                                    ref={c => _slider1Ref = c}
                                    data={ImageSourceviewarray}
                                    renderItem={_renderItem_Carousel_Edit}
                                    sliderWidth={sliderWidth}
                                    itemWidth={itemWidth}
                                    hasParallaxImages={true}
                                    firstItem={SLIDER_1_FIRST_ITEM}
                                    inactiveSlideScale={0.94}
                                    inactiveSlideOpacity={0.4}
                                    containerCustomStyle={Styles.slider}
                                    contentContainerCustomStyle={Styles.tasksliderContentContainer}
                                    onSnapToItem={(index) => setslider1ActiveSlide(index)}
                                  />
                                </View>
                              )}
                            </View>
                          </ScrollView>
                          <View style={[Styles.BtnStyle, { marginVertical: "2%" }]}>
                            {
                              Task_detail !== "" &&
                              Task_detail?.taskStatusName === "Accepted" && GLOBAL.selectItem === 2 &&
                              <LinearGradient colors={["#28892f", "#1a7222", "#03570d"]} style={Styles.btnList15}>
                                <TouchableOpacity onPress={() => {
                                  if (Task_detail?.taskPlanStartDate && Task_detail?.taskPlanDueDate) {
                                    let Days = dateDifferenceInDays(
                                      new Date(Moment(Task_detail?.taskPlanStartDate)?.format("YYYY-MM-DD")),
                                      new Date(Moment(Task_detail?.taskPlanDueDate)?.format("YYYY-MM-DD")),
                                    );
                                    let hours = dateDifferenceInHours(
                                      new Date(Moment(Task_detail?.taskPlanStartDate)?.format("YYYY-MM-DD H:mm")),
                                      new Date(Moment(Task_detail?.taskPlanDueDate)?.format("YYYY-MM-DD H:mm")),
                                    );
                                    if (Days !== 0) {
                                      setdateDifferenceInHours(0);
                                      setdateDifferenceInDays(parseInt(Days));
                                      setTimeRelatedselct("days");
                                    } else {
                                      setdateDifferenceInDays(0);
                                      setdateDifferenceInHours(parseInt(hours));
                                      setTimeRelatedselct("hours");
                                    }
                                  }
                                  setcompletedtask(true);
                                }}>
                                  <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Complete Task</Text>
                                </TouchableOpacity>
                              </LinearGradient>
                            }
                            {
                              ShowButton === true &&
                              <LinearGradient colors={["#a39898", "#786b6b", "#382e2e"]} style={Styles.btnList15}>
                                <TouchableOpacity onPress={handleSubmit}>
                                  <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Update Task</Text>
                                </TouchableOpacity>
                              </LinearGradient>
                            }
                          </View>
                        </View>
                        {
                          showModalAddImage &&
                          <View>
                            {
                              _showModalAddImage()
                            }
                          </View>
                        }
                      </View>
                    </View>
                  </>
                )}
              </Formik>
              {
                changestatus &&
                <View>
                  {
                    _changestatus()
                  }
                </View>
              }
              {
                completedtask &&
                <View>
                  {
                    _Completestask()
                  }
                </View>
              }
            </>
            {ShowMessage === true ?
              <View style={{ width: "100%", alignItems: "center" }}>
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
            {Task_detail !== "" &&
            Task_detail?.taskStatusName !== "Rejected" && Task_detail?.taskStatusName !== "Accepted" && Task_detail?.taskStatusName !== "Completed" && GLOBAL.selectItem === 2
            &&
            <View style={Styles.BtnStyle}>
              <LinearGradient colors={["#d54d4d", "#dc3d3d", "#cc0000"]} style={Styles.btnList32}>
                <TouchableOpacity onPress={() => {
                  setshowModalReject(true);
                }}>
                  <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Reject</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={["#28892f", "#1a7222", "#03570d"]} style={Styles.btnList15}>
                <TouchableOpacity onPress={() => {
                  setshowModalAccept(true);
                }}>
                  <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Accept</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            }
            <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
          </Container> :
          <Container style={[Styles.Backcolor]}>
            {
              GLOBAL.selectItem === 1 || Task_detail?.taskStatusName !== "Accepted" && GLOBAL.selectItem === 2 || GLOBAL.TaskName !== "" ?
                <Header colors={["#a39898", "#786b6b", "#382e2e"]} StatusColor={"#a39897"} onPress={goBack}
                        Title={"Task Details"} /> : null
            }
            <>
              <ScrollView ref={scrollRef}>
                {showModalDelete &&
                <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete}
                             LogOut={LogOut} />
                }
                {
                  showModalAccept &&
                  <View>
                    {
                      _showModalAccept()
                    }
                  </View>
                }
                <DatePicker modal
                            theme={"light"}
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                              setOpen(false);
                              setDate(date);
                              setDateFormatplanstart(Moment(date)?.format("YYYY-MM-DD H:mm"));
                            }}
                            textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
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
                              setDateFormatplanend(Moment(date)?.format("YYYY-MM-DD H:mm"));
                            }}
                            textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
                            onCancel={() => {
                              setOpenend(false);
                            }} />
                {
                  showModalReject &&
                  <View>
                    {
                      _showModalReject()
                    }
                  </View>
                }
                <View style={Styles.container}>
                  {showWarning === true && <Warningmessage />}
                  <View style={Styles.InputeRowItemstask2}>
                    <View style={[Styles.DoneTaskDetaislFloat, { backgroundColor: Task_detail?.taskStatusColor }]}>
                      <Text numberOfLines={3} style={Styles.txtDarkColor}>{Task_detail?.taskStatusName}</Text>
                    </View>
                    <View style={[Styles.inputStyletask3]}>
                      <View style={{ width: "90%" }}>
                        <Text numberOfLines={3} style={[Styles.txtTasktitle]}>{Task_detail?.taskTitle}</Text>
                      </View>
                    </View>
                  </View>
                  {
                    GLOBAL.UserInformation?.roleName === "Technician" && Task_detail?.taskNotify === "y" &&
                    <View style={Styles.InputeRowItemstask}>
                      <View style={[Styles.inputStyletask2]}>
                        <View style={Styles.RowTask}>
                          <View style={Styles.RowTask_Items}>
                            <FontAwesome6 name="bell" size={normalize(14)} color={Colors.withe} />
                            <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Notify The changes
                              {Task_detail?.taskNotifyNotes}
                            </Text>
                          </View>
                          <View style={Styles.RowTask_Items}>
                            <ToggleSwitch
                              isOn={switchDYB}
                              size="medium"
                              style={{ marginLeft: "auto", marginTop: normalize(1) }}
                              trackOnStyle={{
                                backgroundColor: "#fff",
                              }}
                              trackOffStyle={{
                                backgroundColor: "#fff",
                              }}
                              thumbOffStyle={{
                                borderRadius: 19,
                                borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                                backgroundColor: "#8d8d8d",
                              }}
                              thumbOnStyle={{
                                borderRadius: 19,
                                //rgb(102,134,205)
                                borderColor: "rgb(255,255,255)",
                                backgroundColor: "#5658DD",
                              }}
                              onToggle={isOn => {
                                setswitchDYB(isOn);
                                setCheked(isOn);
                                Notify(isOn);
                              }}
                            />
                            <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Yes
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <FontAwesome6 name="book-open-reader" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>WorkType
                          </Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskWorkType}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {
                    Task_detail?.taskParentTitle !== null &&
                    <View style={Styles.InputeRowItemstask}>
                      <View style={[Styles.inputStyletask2]}>
                        <View style={Styles.RowTask}>
                          <View style={Styles.RowTask_Items}>
                            <FontAwesome6 name="file-export" size={normalize(14)} color={Colors.withe} />
                            <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Parent Task
                            </Text>
                          </View>
                          <View style={Styles.RowTask_Items}>
                            <Text numberOfLines={10}
                                  style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskParentTitle}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="loading1" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Status</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskStatusName}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {
                    GLOBAL.selectItem === 2 &&
                    <>
                      <View style={Styles.InputeRowItemstask}>
                        <View style={[Styles.inputStyletask2]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="calendar-day" size={normalize(14)} color={Colors.withe} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Plan Date</Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskPlanStartDate}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.InputeRowItemstask}>
                        <View style={[Styles.inputStyletask2]}>
                          <View style={Styles.RowTask}>
                            <View style={Styles.RowTask_Items}>
                              <FontAwesome6 name="calendar-days" size={normalize(14)} color={Colors.withe} />
                              <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Completed</Text>
                            </View>
                            <View style={Styles.RowTask_Items}>
                              <Text numberOfLines={10}
                                    style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskPlanDueDate}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </>
                  }
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="pushpino" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Created By</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskCreatedBy}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="calendar" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Creat On</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items_Number]}>{Task_detail?.taskCreatedOn}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="indent-right" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Category</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items_Number]}>{Task_detail?.taskCategoryName}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="profile" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Entity Name</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items_Number]}>{Task_detail?.taskRelatedName}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="file-markdown" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Entity Related Name</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items_Number]}>{Task_detail?.taskRelatedNameRef}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.InputeRowItemstask}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="flag" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Priority</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskPriorityName}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.InputeRowItemstask44}>
                    <View style={[Styles.inputStyletask2]}>
                      <View style={Styles.RowTask}>
                        <View style={Styles.RowTask_Items}>
                          <AntDesign name="tago" size={normalize(14)} color={Colors.withe} />
                          <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Labels</Text>
                        </View>
                        <View style={Styles.RowTask_Items}>
                          <Text numberOfLines={10}
                                style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskStatusClass}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {GLOBAL.selectItem === 2 && Task_detail?.taskStatusName === "Accepted" || Task_detail?.taskStatusName === "Completed" ?
                    <>
                      <View style={Styles.InputeRowItemstask23}>
                        <View style={Styles.InputeRowItemstask445}>
                          <View style={[Styles.inputStyletask26]}>
                            <View style={Styles.RowTask}>
                              <View style={Styles.RowTask_Items}>
                                <AntDesign name="filetext1" size={normalize(14)} color={Colors.withe} />
                                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>RequestNotes</Text>
                              </View>
                              <View style={Styles.RowTask_Items} />
                            </View>
                          </View>
                        </View>
                        <View style={[Styles.inputStyletask55]}>
                          <View style={Styles.Description}>
                            <Text numberOfLines={100}
                                  style={[Styles.txtLightColortaskdescription]}>{Task_detail?.taskRequestNotes}
                            </Text>
                          </View>
                        </View>
                        <View style={{
                          borderTopWidth: 1,
                          borderStyle: "dashed",
                          borderColor: "rgba(147,147,147,0.71)", width: "100%",
                        }} />
                        <View style={Styles.InputeRowItemstask445}>
                          <View style={[Styles.inputStyletask25]}>
                            <View style={Styles.RowTask}>
                              <View style={Styles.RowTask_Items}>
                                <AntDesign name="filetext1" size={normalize(14)} color={Colors.withe} />
                                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Feedback for
                                  Request</Text>
                              </View>
                              <View style={Styles.RowTask_Items} />
                            </View>
                          </View>
                        </View>
                        <View style={[Styles.inputStyletask55]}>
                          <View style={Styles.Description}>
                            <Text numberOfLines={100}
                                  style={[Styles.txtLightColortaskdescription]}>{Task_detail?.taskFeedback}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </> :
                    Task_detail?.taskStatusName !== "Accepted" && GLOBAL.selectItem === 2 ?
                      <View style={Styles.InputeRowItemstask23}>
                        <View style={[Styles.inputStyletask5]}>
                          <View style={Styles.Description}>
                            <Text numberOfLines={100}
                                  style={[Styles.txtLightColortaskdescription]}>{Task_detail?.taskDescription}
                            </Text>
                          </View>
                        </View>
                      </View> :
                      GLOBAL.selectItem === 1 ?
                        <View style={Styles.InputeRowItemstask23}>
                          <View style={[Styles.inputStyletask5]}>
                            <View style={Styles.Description}>
                              <Text numberOfLines={100}
                                    style={[Styles.txtLightColortaskdescription]}>{Task_detail?.taskDescription}
                              </Text>
                            </View>
                          </View>
                        </View> : null
                  }
                  {attachments?.length !== 0 && (
                    <View style={Styles.With100NoFlexMarginBotoom}>
                      <View style={Styles.carouselBtnStyle}>
                        <TouchableOpacity style={Styles.carouselStyle} onPress={() => _slider1Ref.snapToPrev()}>
                          <AntDesign name="caretleft" size={normalize(14)} color={Colors.button} />
                          <Text style={Styles.skiptext}>Prev</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.carouselStyle1} onPress={() => _slider1Ref.snapToNext()}>
                          <Text style={Styles.skiptext}>Next</Text>
                          <AntDesign name="caretright" size={normalize(14)} color={Colors.button} />
                        </TouchableOpacity>
                      </View>
                      <Carousel
                        ref={c => _slider1Ref = c}
                        data={attachments}
                        renderItem={_renderItem_Carousel}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        hasParallaxImages={true}
                        firstItem={SLIDER_1_FIRST_ITEM}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.4}
                        containerCustomStyle={Styles.slider}
                        contentContainerCustomStyle={Styles.tasksliderContentContainer}
                        onSnapToItem={(index) => setslider1ActiveSlide(index)}
                      />
                      <Pagination
                        dotsLength={attachments?.length}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={Styles.paginationContainer}
                        dotColor={"rgba(255, 255, 255, 0.92)"}
                        dotStyle={Styles.paginationDot}
                        inactiveDotColor={Colors.black}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                      />
                    </View>
                  )}
                  <View style={Styles.With95NoFlex}>
                    {
                      Task_detail?.trackings?.map((value, index) => {
                        return (
                          <View key={index} style={Styles.With100}>
                            <View style={Styles.FlexRow2}>
                              <View style={{ width: "8%", alignItems: "center", justifyContent: "center" }}>
                                <View style={[
                                  Styles.DoneTask,
                                ]}>
                                </View>
                                <View style={[Task_detail?.trackings?.length - 1 !== index ? Styles.BorderDash :
                                  { height: normalize(60) }]}>
                                </View>
                              </View>
                              <TouchableOpacity onPress={() => {
                                GLOBAL.ProjectId = value.projectId;
                                Navigate_Url("Project_Sites");
                              }} style={{ width: "92%" }}>
                                <View style={Styles.ViewItems_center_transparent_row}>
                                  <Text style={[Styles.txt_left]}>{value.by}</Text>
                                  <Text style={[Styles.txtRight, {
                                    fontSize: normalize(12),
                                    color: "#b4b4b4",
                                    marginLeft: "auto",
                                  }]}>{value.date}</Text>
                                </View>
                                <View style={[Styles.ViewItems_center_transparent_row, { marginTop: 4 }]}>
                                  <Text style={[Styles.txt_left, {
                                    fontSize: normalize(12),
                                    color: "#b4b4b4",
                                  }]}>{value.notes}</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })
                    }
                    {Task_detail?.taskStatusName !== "Cancelled" && Task_detail?.taskStatusName !== "Completed" &&
                    <>
                      <Text style={[Styles.txtLightColorLeft, { marginTop: normalize(15) }]}>Chat Message</Text>
                      <TextInput
                        value={Discuss}
                        style={[Styles.inputStyleTask, { paddingVertical: "4%" }]}
                        onContentSizeChange={(e) => {
                          numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                        }}
                        onChangeText={(val) => setDiscuss(val)}
                        multiline={true}
                        placeholderTextColor={"#fff"} />
                      <View style={[Styles.ViewItems_center]}>
                        <ButtonI style={[Styles.btn, {
                          flexDirection: "row",
                          width: "40%",
                          paddingVertical: 6,
                          marginTop: normalize(30),
                          backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,
                        }]}
                                 onpress={Add_Discuss}
                                 categoriIcon={"FontAwesome5"}
                                 title={"Send"}
                                 styleTxt={Styles.txtbtn2} sizeIcon={27} />
                      </View>
                    </>
                    }

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
                </View>
              </ScrollView>
              {
                <>
                  {
                    attachments?.length !== 0 ?
                      scroll === false ?
                        <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn23]}>
                          <TouchableOpacity transparent onPress={() => {
                            scrollRef.current.scrollToEnd({ animated: true });
                            setscroll(true);
                          }}>
                            <AntDesign name="down" size={20} color="#fff" />
                          </TouchableOpacity>
                        </LinearGradient> :
                        <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={[Styles.scrollBtn23]}>
                          <TouchableOpacity transparent onPress={() => {
                            scrollRef.current?.scrollTo({
                              y: 0,
                              animated: true,
                            });
                            setscroll(false);
                          }}>
                            <AntDesign name="up" size={20} color="#fff" />
                          </TouchableOpacity>
                        </LinearGradient> : null
                  }
                </>
              }
            </>
            {ShowMessage === true ?
              <View style={{ width: "100%", alignItems: "center" }}>
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
            {Task_detail !== "" &&
            Task_detail?.taskStatusName !== "Cancelled" && Task_detail?.taskStatusName !== "In Progress" && Task_detail?.taskStatusName !== "Completed" && Task_detail?.taskStatusName !== "Rejected" && GLOBAL.selectItem === 2
              ?
              <View style={Styles.BtnStyle}>
                <LinearGradient colors={["#d54d4d", "#dc3d3d", "#cc0000"]} style={Styles.btnList32}>
                  <TouchableOpacity onPress={() => {
                    setshowModalReject(true);
                  }}>
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Reject</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={["#28892f", "#1a7222", "#03570d"]} style={Styles.btnList15}>
                  <TouchableOpacity onPress={() => {
                    setshowModalAccept(true);
                  }}>
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Accept</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View> : null
            }
            {GLOBAL.selectItem === 1 && Task_detail !== "" &&
            Task_detail?.taskStatusName !== "Cancelled" && Task_detail?.taskStatusName !== "Rejected" && Task_detail?.taskStatusName !== "In Progress" && Task_detail?.taskStatusName !== "Completed" ?
              <View style={Styles.BtnStyle24}>
                <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnList15}>
                  <TouchableOpacity onPress={() => {
                    setchangestatus(true);
                  }}>
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Cancel</Text>
                  </TouchableOpacity>
                </LinearGradient>
                {/*<LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList15}>*/}
                {/*  <TouchableOpacity onPress={() => {*/}
                {/*    GLOBAL.Subtask = Task_detail?.taskId*/}
                {/*    navigation.navigate("AddNewTask");*/}
                {/*  }}>*/}
                {/*    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Add SubTask</Text>*/}
                {/*  </TouchableOpacity>*/}
                {/*</LinearGradient>*/}
              </View> : null
            }
            {GLOBAL.selectItem === 1 && Task_detail !== "" &&
            Task_detail?.taskStatusName === "Completed" ?
              <View style={Styles.BtnStyle2}>
                <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnList15}>
                  <TouchableOpacity onPress={() => {
                    setchangestatus_Reopen(true);
                  }}>
                    <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}>Reopen</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View> : null
            }
            <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
          </Container>
      }
    </>
  );
}

export default TaskDetail;
