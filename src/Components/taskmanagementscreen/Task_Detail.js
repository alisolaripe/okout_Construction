import { Button, Container, Content } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import React, { useState, useEffect, useRef } from "react";
import { Footer1 } from "../component/Footer";
import { Dimensions, Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import AntDesign from "react-native-vector-icons/AntDesign";
const Api = require("../Api");
import { Colors } from "../Colors";
import { readOnlineApi } from "../ReadPostApi";
import Carousel, { Pagination } from "react-native-snap-carousel";
import TaskDetailImage from "../component/Task_Detail_Image";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GLOBAL = require("../Global");
const { width: viewportWidth } = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 0;
function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(83);
const itemHorizontalMargin = wp(3);
const  sliderWidth=viewportWidth
const itemWidth= slideWidth + itemHorizontalMargin * 2.2
function TaskDetail({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [Task_detail, setTask_detail] = useState('');
  const [slider1ActiveSlide,setslider1ActiveSlide] = useState(0);
  const [attachments,setattachments] = useState([]);
  let _slider1Ref = useRef(null);
  useEffect(() => {
    GetTaskDetail()
  }, []);
  const Navigate_Url= (Url) => {
    navigation.navigate(Url);
  };
  const GetTaskDetail =async () => {
    if(GLOBAL.isConnected===true) {
      readOnlineApi(Api.Task_detail+`&taskId=${GLOBAL.TaskId}`).then(json => {

        let A=[]
        json?.singleTask?.attachments?.forEach((obj) => {
          A.push({
            taskId:json?.singleTask?.taskId,
            attachmentUrl:GLOBAL?.OrgAppLink_value + "/"+obj?.attachmentUrl
          })
        })
        setattachments(A)
        setTask_detail(json?.singleTask)
        if(json?.singleTask)
        Save_Details_Online(json?.singleTask)
        Save_attachments_Online(A)
      });
    }
    else {
      let Modules = await AsyncStorage.getItem(GLOBAL.Task_Detail)
      let Filter=JSON.parse(Modules)?.find((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId))
      let Modules_attachments = await AsyncStorage.getItem(GLOBAL.Task_attachments)
      let Filter_attachments=JSON.parse(Modules_attachments)?.filter((p) => parseInt(p?.taskId) === parseInt(GLOBAL.TaskId))
      setTask_detail(Filter)
      setattachments(Filter_attachments)
      }
  };
  const Save_Details_Online=async (A)=>{
   //removeDataStorage(GLOBAL.Task_Detail)
    let B=[]
    B.push(A)

    let AllList=[];
    let Filter=[];
    let TaskDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));

    Filter=TaskDetailList?.filter((p) =>parseInt(p?.taskId)!==parseInt(GLOBAL.TaskId))

    if(TaskDetailList!==null&&Filter!==null) {
      AllList =[].concat(Filter,B)
    }
    else {
      AllList=B
    }

    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(AllList));
  }
  const Save_attachments_Online=async (B)=>{
    let AllList=[];
    let Filter=[];
    let TaskDetailList=JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));

    Filter=TaskDetailList?.filter((p) =>parseInt(p?.taskId)!==parseInt(GLOBAL.TaskId))

    if(TaskDetailList!==null&&Filter!==null) {
      AllList =[].concat(Filter,B)
    }
    else {
      AllList=B
    }

    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(AllList));
  }
  const logout_Url= () => {
    setshowModalDelete(true)
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
  const _renderItem_Carousel = ({item, index}) => {

    return (
      <TaskDetailImage item={item} key={index}
                                   colors={ ['#a39898','#786b6b','#382e2e'] }
                                   IconColor={"#786b6b"} />
    );
  }
  return (
  <Container style={[Styles.Backcolor]}>
    <Header colors={['#a39898','#786b6b','#382e2e']} StatusColor={'#a39897'} onPress={goBack} Title={'Task Details'}/>
    <Content>
      {
        showModalDelete &&
        <View>
          {
            _showModalDelete()
          }
        </View>
      }
      <View style={Styles.container}>
        <View style={Styles.InputeRowItemstask2}>
          <View style={[Styles.DoneTaskDetaislFloat,{backgroundColor:Task_detail?.taskStatusColor}]}>
            <Text numberOfLines={3} style={[Styles.txtLightColor]}>{Task_detail?.taskStatusName}</Text>
          </View>
          <View style={[Styles.inputStyletask3]}>
            <View style={{ width:'90%'}}>
              <Text numberOfLines={3} style={[Styles.txtTasktitle]}>{Task_detail?.taskTitle}</Text>
            </View>
            <View style={Styles.Description}>
              <Text numberOfLines={100} style={[Styles.txtLightColortaskdescription]}>{Task_detail?.taskDescription}
              </Text>
            </View>
          </View>
        </View>
        <View style={Styles.InputeRowItemstask}>
          <View style={[Styles.inputStyletask2]}>
            <View style={Styles.RowTask}>
              <View style={Styles.RowTask_Items}>
                <AntDesign name="loading1" size={normalize(14)} color={Colors.withe} />
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Status</Text>
              </View>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskStatusName}</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={Styles.InputeRowItemstask}>
          <View style={[Styles.inputStyletask2]}>
            <View style={Styles.RowTask}>
              <View style={Styles.RowTask_Items}>
                <AntDesign name="pushpino" size={normalize(14)} color={Colors.withe} />
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Created By</Text>
              </View>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskRequestBy}</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={Styles.InputeRowItemstask}>
          <View style={[Styles.inputStyletask2]}>
            <View style={Styles.RowTask}>

              <View style={Styles.RowTask_Items}>
                <AntDesign name="adduser" size={normalize(14)} color={Colors.withe} />
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>AssignedTo</Text>
              </View>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskAssignedTo}</Text>
              </View>
            </View>
            {/*<View style={Styles.RowTask}>*/}

            {/*  <View style={Styles.RowTask_Items}>*/}

            {/*    <Text numberOfLines={10} style={[Styles.txtLightColortask_Items_Date]}>RequestedBy :{Task_detail?.taskRequestBy}</Text>*/}
            {/*  </View>*/}
            {/*  <View style={Styles.RowTask_Items}>*/}
            {/*    <AntDesign name="calendar" size={normalize(14)} color={Colors.withe} />*/}
            {/*    <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskRequestDate}</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>

        </View>
        <View style={Styles.InputeRowItemstask}>
          <View style={[Styles.inputStyletask2]}>
            <View style={Styles.RowTask}>
              <View style={Styles.RowTask_Items}>
                <AntDesign name="calendar" size={normalize(14)} color={Colors.withe} />
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Creat Date</Text>
              </View>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskCreatedOn}</Text>
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
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskPriorityName}</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={Styles.InputeRowItemstask4}>
          <View style={[Styles.inputStyletask2]}>
            <View style={Styles.RowTask}>
              <View style={Styles.RowTask_Items}>
                <AntDesign name="tago" size={normalize(14)} color={Colors.withe} />
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>Labels</Text>
              </View>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items]}>{Task_detail?.taskStatusClass}</Text>
              </View>
            </View>
          </View>

        </View>
        {attachments?.length!==0 && (
          <View style={Styles.With100NoFlexMarginBotoom}>

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
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={Styles.paginationDot}
              inactiveDotColor={Colors.black}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        )}
      </View>
         </Content>

    <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url}/>
  </Container>
  )
    }

export default TaskDetail;
