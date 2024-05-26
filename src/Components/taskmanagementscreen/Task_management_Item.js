import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions, Modal, ImageBackground, TextInput,
} from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputI } from "../component/TextInputI";
import { Dropdown } from "react-native-element-dropdown";
import { Content } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../Colors";
import { writeDataStorage } from "../Get_Location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native-compressor";
import FastImage from "react-native-fast-image";
import { selectPhotocamera, selectPhotoGallery, writePostApi } from "../writePostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import DatePicker from "react-native-date-picker";
import Moment from "moment";
import { ButtonI } from "../component/ButtonI";
import { readOnlineApi } from "../ReadPostApi";

const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes = require("../Photoes");
let ImageList = [];
let ImageListUpload = [];
let Full = "";
let numOfLinesCompany = 0;

function Task_management_Item({
                                value,
                                Navigate_Url,
                                data,
                                ChangeChecked,
                                index,
                                Update_Off_Assigned,
                                reasons
                                ,
                                DeleteAttachment,
                                ShowWarningMessage,
                                data3,
                                Assigned_TaskList_server,
                                Assigned_TaskList,
                                setShowWarningMessage,
                                ShowBackBtn,
                                setShowBackBtn,
                                My_TaskList_server,
                                My_TaskList,
                                Update_Off,
                                dataassigned2,
                                Update_Off_Reopen,
                              }) {
  const [visible, setvisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [taskId, settaskId] = useState(false);
  const [showModalAddImage, setshowModalAddImage] = useState(false);
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [ShowButton, setShowButton] = useState(true);
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [changestatus, setchangestatus] = useState(false);
  const [completedtask, setcompletedtask] = useState(false);
  const [changestatus_Reopen, setchangestatus_Reopen] = useState(false);
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateend, setDateend] = useState(new Date());
  const [openend, setOpenend] = useState(false);
  const [DateFormatplanend, setDateFormatplanend] = useState("");
  const [DateFormatplanstart, setDateFormatplanstart] = useState("");
  const [Cheked, setCheked] = useState(false);
  const [reasonId, setreasonId] = useState(false);
  const [reasonTitle, setreasonTitle] = useState("Select Reason");
  const [reasonDescription, setreasonDescription] = useState("");
  const [error, seterror] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState("");
  const [selectedrelated, setSelectedrelated] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [relatedId, setRelatedId] = useState(0);
  const [dateType, setdateType] = useState(false);
  const [Taskcategory, setTaskcategory] = useState([]);
  const [TaskRelated, setTaskRelated] = useState([]);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState("");
  const [selectedrelatedname, setselectedrelatedname] = useState("");
  const [RelatedNameList, setRelatedNameList] = useState([{ value: "0", label: "Project" }, {
    value: "1",
    label: "Site",
  },
    { value: "2", label: "Unit" }, { value: "3", label: "Section" }, { value: "4", label: "Feature" }]);
  const [selectedTaskProjectName, setselectedTaskProjectName] = useState("");
  const [selectedTaskSiteName, setselectedTaskSiteName] = useState("");
  const [selectedunitName, setselectedunitName] = useState("");
  const [selectedsectionName, setselectedsectionName] = useState("");
  const [selectedfeatureName, setselectedfeatureName] = useState("");
  const [TimeRelated, setTimeRelated] = useState([{ value: "0", label: "days" }, { value: "1", label: "hours" }]);
  const [TimeRelatedselct, setTimeRelatedselct] = useState("");
  const [startdate, setstartdate] = useState("");
  const [dateDifferenceHours, setdateDifferenceInHours] = useState("");
  const [dateDifferenceDays, setdateDifferenceInDays] = useState("");
  const [datecompleted, setDatecompleted] = useState(new Date());
  const [opencompleted, setOpencompleted] = useState(false);
  const [dateendcompleted, setDateendcompleted] = useState(new Date());
  const [openendcompleted, setOpenendcompleted] = useState(false);
  const [DateFormatplanendcompleted, setDateFormatplanendcompleted] = useState("");
  const [DateFormatplanstartcompleted, setDateFormatplanstartcompleted] = useState("");
  useEffect(() => {
    Task_category();
  }, []);
  ///get Category List for Add Task///
  const Task_category = async () => {
    let category_List = [];
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_category + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        let category_List = [];
        for (let item in json?.categories) {
          let obj = json?.categories?.[item];
          category_List.push({
            value: obj.categoryId,
            label: obj.categoryTitle,
          });
        }
        setTaskcategory(category_List);
      });
    } else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Category));
      for (let item in json?.categories) {
        let obj = json?.categories?.[item];
        category_List.push({
          value: obj.categoryId,
          label: obj.categoryTitle,
        });
      }
      setTaskcategory(category_List);
    }
  };
  const ClickManagement = (id) => {
    if (id === "1") {
      let attachment_List = [];
      let uri = "";
      settaskId(value.taskId);
      let mark2 = {
        attachmentUrl: "",
        type: "AddImage",
        fileName: "",
        attachmentId: "",
      };
      value?.attachments?.forEach((obj) => {
        if (obj.attachmentUrl?.split("/")?.[0] === "uploads") {
          uri = GLOBAL?.OrgAppLink_value + "/" + obj?.attachmentUrl;
        } else {
          uri = obj?.attachmentUrl;
        }
        attachment_List.push({
          attachmentUrl: uri,
          type: obj?.attachmentName?.split(".")?.[1],
          fileName: obj?.attachmentName,
          attachmentId: obj?.attachmentId,
        });
      });
      attachment_List = [mark2, ...attachment_List];
      setImageSourceviewarray(attachment_List);
      setvisible(true);
    } else if (id === "2") {
      GLOBAL.TaskId = value.taskId;
      setchangestatus(true);
    } else if (id === "4") {
      setDateFormatplanendcompleted(value?.taskPlanDueDate);
      setDateFormatplanstartcompleted(value?.taskPlanStartDate);
      setDatecompleted(new Date(value?.taskPlanStartDate));
      setDateendcompleted(new Date(value?.taskPlanDueDate));
      GLOBAL.TaskId = value.taskId;
      if (value?.taskPlanStartDate && value?.taskPlanDueDate) {
        let Days = dateDifferenceInDays(
          new Date(Moment(value?.taskPlanStartDate)?.format("YYYY-MM-DD ")),
          new Date(Moment(value?.taskPlanDueDate)?.format("YYYY-MM-DD")),
        );
        let hours = dateDifferenceInHours(
          new Date(Moment(value?.taskPlanStartDate)?.format("YYYY-MM-DD H:mm")),
          new Date(Moment(value?.taskPlanDueDate)?.format("YYYY-MM-DD H:mm")),
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
    } else if (id === "3") {

      setDateFormatplanend(value?.taskPlanDueDate);
      setDateFormatplanstart(value?.taskPlanStartDate);
      setDate(value?.Format_Dates_StartDate);
      setDateend(value?.Format_Dates_DueDate);
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;
      const Year = date.getFullYear();
      setDescription(value?.taskRequestNotes);
      Full = `${Year}-${Month}-${Day}`;
      let attachment_List = [];
      let uri = "";
      settaskId(value.taskId);
      let mark2 = {
        attachmentUrl: "",
        type: "AddImage",
        fileName: "",
        attachmentId: "",
      };

      value?.attachments?.forEach((obj) => {
        if (obj.attachmentUrl?.split("/")?.[0] === "uploads") {
          uri = GLOBAL?.OrgAppLink_value + "/" + obj?.attachmentUrl;
        } else {
          uri = obj?.attachmentUrl;
        }
        attachment_List.push({
          attachmentUrl: uri,
          type: obj?.attachmentName?.split(".")?.[1],
          fileName: obj?.attachmentName,
          attachmentId: obj?.attachmentId,
        });
      });

      attachment_List = [...attachment_List, mark2];
      setImageSourceviewarray(attachment_List);
      setvisible(true);
    } else if (id === "5") {
      GLOBAL.TaskId = value.taskId;
      setchangestatus_Reopen(true);
    }

  };
///change task status to cancell///
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
  const renderchangestatusModalContent = () => (
    <View style={[Styles.taskModalStyle]}>
      <TouchableOpacity onPress={() => setchangestatus(false)} style={Styles.CancelBtn}>
        <View style={{ width: "95%" }}>
          <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
        </View>
      </TouchableOpacity>
      <View style={Styles.With95}>

        {
          GLOBAL.selectItem === 1 ?
            <Text style={Styles.txt_left23}>
              Do you want to Cancel {value.taskTitle} ?
            </Text> :
            <Text style={Styles.txt_left23}>
              Did you Completed the {value.taskTitle} task ?
            </Text>
        }

      </View>
      <View style={[Styles.With90Row, { paddingVertical: normalize(10) }]}>
        <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => setchangestatus(false)}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
          <TouchableOpacity onPress={() => {
            if (GLOBAL.selectItem === 1)
              Updatestatus();
            else
              UpdatestatusCompleted();
            setchangestatus(false);
          }}>
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  ///change task status to completed///
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
                    numberValue={33} setOpen={setOpencompleted} tittlebtn={"Completed"} error={error}
                    setOpenend={setOpenendcompleted} DateFormatplanstart={DateFormatplanstartcompleted}
                    dateDifferenceDays={dateDifferenceDays}
                    setdateType={setdateType} DateFormatplanend={DateFormatplanendcompleted}
                    dateDifferenceHours={dateDifferenceHours}
                    ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked}
        />
      </View>
    </View>
  );
  ///Calculate days of between two dates///
  const dateDifferenceInDays = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 86_400_000;
  ///Calculate Hours of between two dates///
  const dateDifferenceInHours = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 3_600_000;
  ///change status to reopen///
  const _changestatus_Reopen = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={changestatus_Reopen}
          avoKeyboard={true}
          onBackdropPress={() => setchangestatus_Reopen(false)}
          transparent={true}
        >
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
            <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
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
            style={[Styles.inputStyle66, { paddingVertical: "4%" }]}
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
                     styleTxt={[Styles.txtbtn, { fontSize: normalize(16) }]} sizeIcon={27} />
          </View>
        </View>
      </View>
    </View>

  );
  ///cancel task and send to server.///
  const Updatestatus = () => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", GLOBAL.TaskId);
    formData.append("taskStatusId", "6");
    writePostApi("POST", Api.Change_Task_Status, formData).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          My_TaskList_server(json.msg,'Cancell');
          let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
          let mark = [...GLOBAL?.FilterList];
          mark[index] = { ...mark[index], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled", taskUpdated: "y" };
          GLOBAL.FilterList = mark;
          setchangestatus(false);
          setShowMessage(false);
        }
      } else {
        Update_Off(GLOBAL.TaskId);
        let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
        let mark = [...GLOBAL?.FilterList];
        mark[index] = { ...mark[index], taskStatusColor: "#5a5a5a", taskStatusName: "Cancelled", taskUpdated: "y" };
        GLOBAL.FilterList = mark;
        setMessage("Your task status successfully changed");
        setShowMessage(true);
        setchangestatus(false);
        setShowMessage(false);
      }
    });
  };
  ///completed task and send to sever///
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
          Assigned_TaskList_server();
          let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
          let mark = [...GLOBAL?.FilterList];
          mark[index] = { ...mark[index], taskStatusColor: "#0000FF", taskStatusName: "Completed", taskUpdated: "y" };
          GLOBAL.FilterList = mark;
          setchangestatus(false);
          setShowMessage(false);
        }
      } else {
        Update_Off_Assigned(GLOBAL.TaskId);
        let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
        let mark = [...GLOBAL?.FilterList];
        mark[index] = { ...mark[index], taskStatusColor: "#0000FF", taskStatusName: "Completed", taskUpdated: "y" };
        GLOBAL.FilterList = mark;
        setMessage("Your task status successfully changed");
        setShowMessage(true);
        setchangestatus(false);
        setShowMessage(false);
      }
    });
  };
  /// update task when use is offline///
  const Update_Task_Offline = async (value, taskId) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let Task_List = [];
    let Task_Detail = [];
    let Task_attachments = [];
    let ImageSource = [];

    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments = json_attachments;
    if (List_Item?.length !== 0) {
      Task_List = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      Task_Detail = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      Task_attachments = [...List_attachments];
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
      Task_List[index] = {
        ...Task_List[index],
        taskTitle: value?.Title,
        taskDescription: value?.TaskNote,
        attachments: ImageSource,
        taskUpdated: "y",
      };
      List_Item = Task_List;
      Task_Detail[index_detail] = {
        ...Task_Detail[index_detail],
        taskTitle: value?.Title,
        taskDescription: value?.TaskNote,
        attachments: ImageSource,
      };
      List_Item_detail = Task_Detail;
    } else {
      Task_List[index] = {
        ...Task_List[index],
        taskTitle: value?.Title,
        taskDescription: value?.TaskNote,
        taskUpdated: "y",
      };
      List_Item = Task_List;
      Task_Detail[index_detail] = {
        ...Task_Detail[index_detail],
        taskTitle: value?.Title,
        taskDescription: value?.TaskNote,
      };
      List_Item_detail = Task_Detail;
    }
    if (ImageSourceviewarrayUpload.length !== 0) {
      ImageSourceviewarrayUpload?.forEach((obj) => {
        Task_attachments.push({
          taskId: taskId,
          attachmentUrl: obj?.uri,
        });
      });
      List_attachments = Task_attachments;
    }
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    setImageSourceviewarrayUpload([]);
    My_TaskList();
  };
  ///reopen task and send to server///
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
            let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
            let mark = [...GLOBAL?.FilterList];
            mark[index] = { ...mark[index], taskStatusColor: "#ff4545", taskStatusName: "Reopen", taskUpdated: "y" };
            GLOBAL.FilterList = mark;
            setMessage(json?.msg);
            setShowMessage(true);
            My_TaskList_server();
            setShowMessage(false);
            setchangestatus_Reopen(false);
          }
        } else {
          Update_Off_Reopen(GLOBAL.TaskId, reasonDescription);
          let index = GLOBAL?.FilterList.findIndex((p) => p.taskId === GLOBAL.TaskId);
          let mark = [...GLOBAL?.FilterList];
          mark[index] = { ...mark[index], taskStatusColor: "#ff4545", taskStatusName: "Reopen", taskUpdated: "y" };
          GLOBAL.FilterList = mark;
          setMessage("Your task status successfully changed");
          setShowMessage(true);
          setchangestatus_Reopen(false);
          setShowMessage(false);
        }
      });
    }

  };
  ///user edit or update task and send to server///
  const Update_Task = async (value, taskId) => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", taskId);
    formData.append("title", value?.Title);
    if (GLOBAL?.selectItem === 1)
      formData.append("description", value?.TaskNote);

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
            My_TaskList_server();
            setMessage(json?.msg);
            setShowMessage(true);
            setImageSourceviewarrayUpload([]);
            setShowButton(true);
            setShowBackBtn(true);
            setvisible(false);
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
          Update_Task_Offline(value, taskId);
          setMessage("Your task successfully Updated");
          setShowMessage(true);
          My_TaskList_server();
          setImageSourceviewarrayUpload([]);
          setShowButton(true);
          setShowBackBtn(true);
          setvisible(false);
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
            if (GLOBAL?.selectItem === 1) {
              My_TaskList_server();
            } else {
              Assigned_TaskList_server();
            }
            setMessage(json?.msg);
            setShowMessage(true);
            setShowButton(true);
            setShowBackBtn(true);
            setvisible(false);
            const timerId = setInterval(() => {
              setShowMessage(false);

            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
          Update_Task_Offline(value, taskId);
          setMessage("Your task successfully Updated");
          setShowMessage(true);
          setShowButton(true);
          setShowBackBtn(true);
          setvisible(false);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    }
  };
  ///Technician edit or update task and send to server///
  const Update_AssignTask = async (value, taskId, Cheked) => {
    let Display = "";
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("taskId", taskId);
    formData.append("title", value?.Title);
    formData.append("description", value?.TaskNote);
    formData.append("planStartDate", DateFormatplanstart);
    formData.append("planEndDate", DateFormatplanend);
    if (Cheked === true) {
      formData.append("taskStatusId", "4");
    }
    if (value?.CaseNote?.split("\n")?.length === 1) {
      formData.append("requestNotes", value?.CaseNote);
    } else if (value?.CaseNote?.split("\n")?.length > 1) {
      if (value?.CaseNote?.split("\n")?.[2] === "") {
        formData.append("requestNotes", Description);
        Display = Description;
      } else {
        formData.append("requestNotes", value?.CaseNote?.split("\n")?.[0] + value?.CaseNote?.split("\n")?.[2]);
        Display = value?.CaseNote?.split("\n")?.[0] + value?.CaseNote?.split("\n")?.[2];
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
      writePostApi("POST", Api.ChangeStatusTask, formData, ImageSourceviewarrayUpload).then(json => {
        if (json) {
          if (json?.status === true) {
            Assigned_TaskList_server();
            setMessage(json?.msg);
            setShowMessage(true);
            setImageSourceviewarrayUpload([]);
            setShowButton(true);
            setShowBackBtn(true);
            const timerId = setInterval(() => {
              setShowMessage(false);
              setvisible(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
          Update_AssignTask_Offline(value, taskId, Display, Cheked);
          setMessage("Your task successfully Updated");
          setShowMessage(true);
          setImageSourceviewarrayUpload([]);
          setShowButton(true);
          setShowBackBtn(true);
          Assigned_TaskList();
          const timerId = setInterval(() => {
            setShowMessage(false);
            setvisible(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    } else {
      writePostApi("POST", Api.ChangeStatusTask, formData).then(json => {
        if (json) {
          if (json?.status === true) {
            Assigned_TaskList_server();
            setMessage(json?.msg);
            setShowMessage(true);
            setShowButton(true);
            setShowBackBtn(true);
            const timerId = setInterval(() => {
              setShowMessage(false);
              setvisible(false);
            }, 2000);
            return () => clearInterval(timerId);
          }
        } else {
          Update_AssignTask_Offline(value, taskId, Display, Cheked);
          setMessage("Your task successfully Updated");
          setShowMessage(true);
          setShowButton(true);
          setShowBackBtn(true);
          Assigned_TaskList();
          const timerId = setInterval(() => {
            setShowMessage(false);
            setvisible(false);
          }, 2000);
          return () => clearInterval(timerId);
        }
      });
    }
  };
  ///Technician edit or update task when app is offline///
  const Update_AssignTask_Offline = async (value, taskId, Display, Cheked) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Assigned_TaskList));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let AssignTask_List = [];
    let AssignTask_Detail = [];
    let AssignTask_attachments = [];
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
      AssignTask_List = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      AssignTask_Detail = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      AssignTask_attachments = [...List_attachments];
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
      AssignTask_List[index] = {
        ...AssignTask_List[index],
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
      List_Item = AssignTask_List;
      AssignTask_Detail[index_detail] = {
        ...AssignTask_Detail[index_detail],
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
      List_Item_detail = AssignTask_Detail;
    } else {
      AssignTask_List[index] = {
        ...AssignTask_List[index],
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
      List_Item = AssignTask_List;
      AssignTask_Detail[index_detail] = {
        ...AssignTask_Detail[index_detail],
        taskTitle: value?.Title,
        taskRequestNotes: Display,
        taskFeedback: value?.TaskNote,
        taskPlanStartDate: DateFormatplanstart,
        taskPlanDueDate: DateFormatplanend,
        Format_Dates_StartDate: new Date(DateFormatplanstart),
        Format_Dates_DueDate: new Date(DateFormatplanend),
        taskStatusColor: Status_color,
        taskStatusName: Status,
      };
      List_Item_detail = AssignTask_Detail;
    }
    if (ImageSourceviewarrayUpload.length !== 0) {
      ImageSourceviewarrayUpload?.forEach((obj) => {
        AssignTask_attachments.push({
          taskId: taskId,
          attachmentUrl: obj?.uri,
        });
      });
      List_attachments = AssignTask_attachments;
    }
    await AsyncStorage.setItem(GLOBAL.Assigned_TaskList, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    setImageSourceviewarrayUpload([]);
    Assigned_TaskList();
  };
  ///header back button =>if add photos and did not send server send message if not navigate back///
  const Back_navigate = (isValid) => {
    if (ShowBackBtn === false || isValid === false) {
      setShowWarningMessage(true);
      setShowBackBtn(true);
    } else {
      setvisible(false);
    }
  };
///Dropdown show when =>value?.taskStatusName!=='Cancelled' &&value?.taskStatusName!=='Completed'///
  const renderItem2 = (item, index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{ paddingLeft: 7 }}>
          <Entypo size={normalize(12)} color={Colors.button} name={item.Icon} />
        </View>
        <Text style={Styles.txt_leftDropdown}>{item.label}</Text>
      </View>
    );
  };
  ///Dropdown show reopen reason///
  const renderItem = (item, index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{ paddingLeft: 7 }}>
          <Entypo size={normalize(12)} color={Colors.button} name={item.Icon} />
        </View>
        <Text style={Styles.txt_leftDropdown23}>{item.label}</Text>
      </View>
    );
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
          let index = List_Item?.findIndex((p) => p.type === "AddImage");
          let markers = [...List_Item];
          markers?.splice(index, 1);
          ImageList = [...markers];
        }
        if (ImageSourceviewarrayUpload)
          ImageListUpload = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path?.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let attachmentId = 0;
          if (ImageList?.length !== 0) {
            attachmentId = parseInt(ImageList?.[ImageList?.length - 1]?.attachmentId) + 1;
          } else {
            attachmentId = attachmentId + 1;
          }
          ImageList.push({
            attachmentUrl: obj.path,
            type: obj.mime,
            fileName: imgName,
            attachmentId: attachmentId,
            taskId: taskId,
          });
          Image_compress(obj.path).then(res => {
            ImageListUpload.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              attachmentId: attachmentId,
              taskId: GLOBAL.TaskId,
            });
            if (ImageListUpload?.length === response?.length) {
              setImageSourceviewarrayUpload(ImageListUpload);
              ImageListUpload = [...ImageListUpload];
            }
          });
        }
        let mark2 = {
          attachmentUrl: "",
          type: "AddImage",
          fileName: "",
          attachmentId: "",
        };
        ImageList = [mark2, ...ImageList];
        setImageSourceviewarray(ImageList);
        setShowBackBtn(false);
        ImageList = [...ImageList];
      }
    });
  };
  //Reduce the size of the photo///
  const Image_compress = async (path) => {
    return await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    });
  };
  const selectPhoto = () => {
    onClosetask();
    selectPhotocamera().then(response => {
      var getFilename = response.path?.split("/");
      writeDataStorage(GLOBAL.ImageSourceviewarray, response);
      var imgName = getFilename[getFilename.length - 1];
      if (ImageSourceviewarray) {
        let List_Item = ImageSourceviewarray;
        let index = List_Item?.findIndex((p) => p.type === "AddImage");
        let markers = [...List_Item];
        markers?.splice(index, 1);
        ImageList = [...markers];
      }
      if (ImageSourceviewarrayUpload)
        ImageListUpload = [...ImageSourceviewarrayUpload];
      let attachmentId = 0;
      if (ImageList?.length !== 0) {
        attachmentId = parseInt(ImageList?.[ImageList?.length - 1]?.attachmentId) + 1;
      } else {
        attachmentId = attachmentId + 1;
      }
      ImageList.push({
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
        ImageListUpload.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          attachmentId: attachmentId,
          taskId: GLOBAL.TaskId,
        });
        setImageSourceviewarrayUpload(ImageListUpload);
        ImageListUpload = [...ImageListUpload];
      });
      let mark2 = {
        attachmentUrl: "",
        type: "AddImage",
        fileName: "",
        attachmentId: "",
      };
      ImageList = [mark2, ...ImageList];
      setImageSourceviewarray(ImageList);
      setShowBackBtn(false);
      ImageList = [...ImageList];

    });
  };
  ///deleted task photos//
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
  const onOpen = () => {
    setshowModalAddImage(true);
  };
  const onClosetask = () => {
    setshowModalAddImage(false);
  };
  return (
    <TouchableOpacity onPress={() => {
      GLOBAL.Task_detail = value;
      GLOBAL.TaskId = value.taskId;
      Navigate_Url("TaskDetail");
    }} index={index} style={Styles.ItemDetailBox}>

      <DatePicker modal
                  theme={"light"}
                  open={opencompleted}
                  date={datecompleted}
                  onConfirm={(date) => {
                    setOpencompleted(false);
                    setDatecompleted(date);
                    setDateFormatplanstartcompleted(Moment(date)?.format("YYYY-MM-DD H:mm"));
                    setShowButton(true);
                    setstartdate(date);
                    if (DateFormatplanendcompleted === "") {
                      let Days = dateDifferenceInDays(
                        new Date(Moment(date)?.format("YYYY-MM-DD")),
                        new Date(Moment(value?.taskPlanDueDate)?.format("YYYY-MM-DD")),
                      );
                      let hours = dateDifferenceInHours(
                        new Date(Moment(date)?.format("YYYY-MM-DD H:mm")),
                        new Date(Moment(value?.taskPlanDueDate)?.format("YYYY-MM-DD H:mm")),
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
                        new Date(Moment(DateFormatplanendcompleted)?.format("YYYY-MM-DD")),
                      );

                      let hours = dateDifferenceInHours(
                        new Date(Moment(date)?.format("YYYY-MM-DD H:mm")),
                        new Date(Moment(DateFormatplanendcompleted)?.format("YYYY-MM-DD H:mm")),
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
                    setOpencompleted(false);
                  }} />
      <DatePicker modal
                  theme={"light"}
                  open={openendcompleted}
                  date={dateendcompleted}
                  onConfirm={(date) => {
                    setOpenendcompleted(false);
                    setDateendcompleted(date);
                    setDateFormatplanendcompleted(Moment(date)?.format("YYYY-MM-DD H:mm"));
                    setShowButton(true);
                    if (DateFormatplanstartcompleted === "") {
                      let Days = dateDifferenceInDays(
                        new Date(Moment(value?.taskPlanStartDate)?.format("YYYY-MM-DD")),
                        new Date(Moment(date)?.format("YYYY-MM-DD")),
                      );
                      let hours = dateDifferenceInHours(
                        new Date(Moment(value?.taskPlanStartDate)?.format("YYYY-MM-DD H:mm")),
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
                        new Date(Moment(DateFormatplanstartcompleted)?.format("YYYY-MM-DD")),
                        new Date(Moment(date)?.format("YYYY-MM-DD")),
                      );
                      let hours = dateDifferenceInHours(
                        new Date(Moment(DateFormatplanstartcompleted)?.format("YYYY-MM-DD H:mm")),
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
                    setOpenendcompleted(false);
                  }} />

      <View style={Styles.With93_row}>
        {
          GLOBAL.UserInformation?.roleName === "Technician" && value?.taskUpdated === "y" &&
          <FastImage tintColor={GLOBAL.OFFICIAL_PROJECTCOLOR} resizeMode={"contain"} source={Photoes.ribbon}
                     style={{
                       width: "33%", position: "absolute", right: -23, transform: [{ rotate: "30deg" }],
                       top: -10,
                     }}>
            <Text style={[Styles.Update_txt]}>Updated</Text>
          </FastImage>
        }
        <View style={{ width: "65%" }}>
          <View style={{ width: "100%", alignItems: "center", justifyContent: "flex-start", flexDirection: "row" }}>

            <Text style={[Styles.txt_left]}>{value.taskTitle}</Text>
          </View>
          {
            value?.taskWorkType !== null &&
            <View style={Styles.TaskListStyle}>
              <Text style={[Styles.txt_left_task]}>WorkType : {value?.taskWorkType}</Text>
            </View>
          }
          <View style={Styles.TaskListStyle}>
            <Text style={[Styles.txt_left_task]}>{value?.Year}</Text>
          </View>
          <View style={Styles.TaskListStyle}>
            <Text style={[Styles.txt_left_task]}>{value?.taskDescription?.slice(0, 6)} ...</Text>
          </View>

          <View style={[Styles.BtnListStyle, { marginTop: normalize(7) }]}>
            <View style={[Styles.btntask, { backgroundColor: value.taskStatusColor }]} />
            <View style={[Styles.triangle, { borderBottomColor: value.taskPriorityColor }]} />
          </View>
        </View>
        <View style={{ width: "35%" }}>
          {(data.length !== 0 && value?.taskStatusName !== "Cancelled" && value?.taskStatusName !== "Completed" &&
            <Dropdown
              containerStyle={Styles.DropDown}
              selectedTextStyle={Styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              data={data}
              activeColor={Colors.Light}
              maxHeight={300}
              renderItem={renderItem2}
              renderRightIcon={() => (
                <View style={Styles.DropDownIcon}>
                  <AntDesign name="ellipsis1" size={normalize(20)} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                </View>
              )}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                ClickManagement(item.value, value.Id);
              }}
            />
          )}
          {(GLOBAL.selectItem === 2 && value?.taskStatusName === "In Progress" &&
            <Dropdown
              containerStyle={Styles.DropDown}
              selectedTextStyle={Styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              data={dataassigned2}
              activeColor={Colors.Light}
              maxHeight={300}
              renderItem={renderItem2}
              renderRightIcon={() => (
                <View style={Styles.DropDownIcon}>
                  <AntDesign name="ellipsis1" size={normalize(20)} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                </View>
              )}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                ClickManagement(item.value, value.Id);
              }}
            />
          )}
          {(GLOBAL.selectItem === 1 && value?.taskStatusName === "Completed" &&
            <Dropdown
              containerStyle={Styles.DropDown}
              selectedTextStyle={Styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              data={data3}
              activeColor={Colors.Light}
              maxHeight={300}
              renderItem={renderItem2}
              renderRightIcon={() => (
                <View style={Styles.DropDownIcon}>
                  <AntDesign name="ellipsis1" size={normalize(20)} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
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
        completedtask &&
        <View>
          {
            _Completestask()
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
        <Content contentContainerStyle={[{
          flexGrow: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center",
        }]}>
          <View style={[Styles.ModalLocationStyle]}>
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
                  <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
                    <TouchableOpacity onPress={() => {
                      setShowBackBtn(false);
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
              </View>
              }
              {
                GLOBAL.selectItem === 1 ?
                  <TextInputI onChangeText={(value) => {
                    Update_Task(value, taskId);
                  }} setShowWarningMessage={setShowWarningMessage}
                              numberValue={25} Full={Full} ChangeChecked={(value) => ChangeChecked(value)}
                              Cheked={Cheked} ShowButton={ShowButton}
                              Back_navigate={Back_navigate} setShowBackBtn={setShowBackBtn} tittlebtn={"Update Task"}
                              onOpen={onOpen} DeleteImage={DeleteImage_task} value={value}
                              ImageSourceviewarray={ImageSourceviewarray}
                              setSelectedcategory={setSelectedcategory} selectedcategory={selectedcategory}
                              selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated}
                              setRelatedId={setRelatedId} categoryId={categoryId}
                              setdateType={setdateType} Taskcategory={Taskcategory} setCategoryId={setCategoryId}
                              TaskRelated={TaskRelated} error={error}
                              RelatedNameList={RelatedNameList}
                              TaskRelatedNameId={TaskRelatedNameId} setTaskRelatedNameId={setTaskRelatedNameId}
                              selectedTaskProjectName={selectedTaskProjectName}
                              setselectedTaskProjectName={setselectedTaskProjectName}
                              selectedfeatureName={selectedfeatureName} setselectedfeatureName={setselectedfeatureName}
                              selectedTaskSiteName={selectedTaskSiteName}
                              setselectedTaskSiteName={setselectedTaskSiteName}
                              selectedunitName={selectedunitName} setselectedunitName={setselectedunitName}
                              selectedrelatedname={selectedrelatedname} setselectedrelatedname={setselectedrelatedname}
                              selectedsectionName={selectedsectionName} setselectedsectionName={setselectedsectionName}
                  /> :

                  <TextInputI onChangeText={(value) => {
                    Update_AssignTask(value, taskId, Cheked);
                  }} setShowWarningMessage={setShowWarningMessage} numberValue={29} Full={Full}
                              ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked} ShowButton={ShowButton}
                              Back_navigate={Back_navigate} setShowBackBtn={setShowBackBtn} tittlebtn={"Update Task"}
                              onOpen={onOpen} DeleteImage={DeleteImage_task} value={value}
                              ImageSourceviewarray={ImageSourceviewarray}
                              setOpenend={setOpenend} setOpen={setOpen} DateFormatplanstart={DateFormatplanstart}
                              DateFormatplanend={DateFormatplanend} setCheked={setCheked}
                              setSelectedcategory={setSelectedcategory} selectedcategory={selectedcategory}
                              selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated}
                              setRelatedId={setRelatedId} categoryId={categoryId}
                              setdateType={setdateType} Taskcategory={Taskcategory} setCategoryId={setCategoryId}
                              TaskRelated={TaskRelated} error={error}
                              RelatedNameList={RelatedNameList}
                              TaskRelatedNameId={TaskRelatedNameId} setTaskRelatedNameId={setTaskRelatedNameId}
                              selectedTaskProjectName={selectedTaskProjectName}
                              setselectedTaskProjectName={setselectedTaskProjectName}
                              selectedfeatureName={selectedfeatureName} setselectedfeatureName={setselectedfeatureName}
                              selectedTaskSiteName={selectedTaskSiteName}
                              setselectedTaskSiteName={setselectedTaskSiteName}
                              selectedunitName={selectedunitName} setselectedunitName={setselectedunitName}
                              selectedrelatedname={selectedrelatedname} setselectedrelatedname={setselectedrelatedname}
                              selectedsectionName={selectedsectionName} setselectedsectionName={setselectedsectionName}
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
                            setDateFormatplanend(Moment(date)?.format("YYYY-MM-DD"));
                          }}

                          textColor={GLOBAL.OFFICIAL_BLUE_COLOR}
                          onCancel={() => {
                            setOpenend(false);
                          }} />
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
        </Content>
      </Modal>

    </TouchableOpacity>
  );
}


export default Task_management_Item;
