import { StyleSheet, Dimensions, ImageBackground, I18nManager, Platform } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { RFValue } from "react-native-responsive-fontsize";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const SPACING = {
  space_25:20,
  space_35:35,
  space_40:40,
  space_95:50,
  space_45:240,
};
const GLOBAL = require("./Global");
import Color, { Colors } from "../Components/Colors";
import normalize from "react-native-normalize";

const Styles = StyleSheet.create({
  ViewItems_center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GLOBAL.OFFICIAL_background,
    width: "100%",
    zIndex:100
  },
  ViewItems_center_row: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GLOBAL.OFFICIAL_background,
    width: "100%",
    zIndex:100,
    flexDirection:'row'
  },
  ViewItems_center_task: {
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    zIndex:100
  },
  ViewItems_center_transparent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  ViewItems_center_transparent_row:{
    width:'100%',flexDirection:'row',
    alignItems:'center'
  },
  ViewItems_center_transparent_row_task:{
    width:'65%',
    alignItems:'center',
    justifyContent:'space-between',
  },
  txt: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(15),
    fontFamily:'OpenSansBold',
  },
  txtbtn2: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(15),
    fontFamily:'OpenSansBold',
  },
  txtMenu: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    fontFamily:'OpenSansBold',
  },
  txtbtn: {
    color: '#fff',
    fontSize: normalize(15),
    fontFamily:'OpenSansBold',
  },
  txt_center_login: {
    color: "#fff",
    fontSize: normalize(15),
    fontFamily:'OpenSansBold',
    textAlign:'center'
  },
  txtMenuHome: {
    fontSize: normalize(15),
    textAlign: "left",
    color: '#fff',
    paddingBottom: 15,
    fontFamily:'OpenSansBold'
  },
  txtMenuHome2: {
    fontSize: normalize(15),
    textAlign: "left",
    color: '#fff',
    paddingVertical: 15,
    fontFamily:'OpenSansBold',
  },
  txtMenuHome23: {
    fontSize: normalize(15),
    textAlign: "left",
    color: Colors.button,
    paddingVertical: 15,
    fontFamily:'OpenSansBold',
  },
  txt_left:{
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(15),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txt_left_Pos:{
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txt_left_small2:{
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(12),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txt_left3:{
    color: Colors.button,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txt_left_task:{

    textAlign: "left",
    fontWeight:'bold',
    fontSize:normalize(12),color:'#b4b4b4'
  },
  txt_Left_padding_horizontal: {
    color: Colors.button,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
    paddingHorizontal:normalize(8)
  },
  Filter_txt: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(12),
    marginVertical: 5,
    textAlign: "left",
  },
  Filter_txt3: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(12),
    marginVertical: 5,
    textAlign: "left",
  },
  Update_txt: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(12),
    paddingBottom: 18,
    textAlign: "center",
    fontFamily:'OpenSansBold',
    paddingVertical:10

  },
  txt_left_Padding_bottom: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    marginTop: normalize(5),
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txt_left_small: {
    color:'#fff',
    fontSize: normalize(12),
    marginBottom: 3,
    textAlign: "left",

  },
  txt_left_small_padding_top: {
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(12),
    textAlign: "left",
    fontFamily:'aSignboardCpsNrBoldItalic',
    paddingTop: normalize(8)

  },
  txtCenter: {
    color: GLOBAL.OFFICIAL_background,
    fontSize: normalize(14),
    margin: 5,
    textAlign: "left",
    fontWeight:'bold'
  },
  txtCenter_filter2: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    margin: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txtCenter_filter: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    margin: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txt_leftDropdown: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(13),
    marginVertical:normalize (8),
    textAlign: "left",
    fontFamily:'OpenSansBold',
    paddingLeft:normalize (7)
  },
  txt_leftDropdown23: {
    color: Colors.Light,
    fontSize: normalize(13),
    marginVertical:normalize (8),
    textAlign: "left",
    fontWeight:'bold',
    paddingLeft:normalize (7)
  },
  txt_left2: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    textAlign: "center",
    fontFamily:'OpenSansBold',
  },txt_left23: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    textAlign: "center",
    fontWeight:'bold'
  },
  txt_left_big: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(17),
    textAlign: "center",
    fontWeight:'bold'
  },
  txt_left2_padding_vertical: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    textAlign: "center",
    fontWeight:'bold',
    paddingVertical:normalize(4)
  },
  txtCenterPaddingHorizontal: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    textAlign: "center",
    fontFamily:'OpenSansBold',
    paddingHorizontal:normalize(8)
  },
  txtcenter: {
    color: "#fff",
    fontSize:normalize(14),textAlign:"center",
    fontFamily:'OpenSansBold',
  },
  txtRight: {
    color: "#fff",
    fontSize: normalize(14),
    margin: 5,
    textAlign: "right",
  },
  txtLightColor: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    margin: 7,
    fontFamily:'OpenSansBold',
  },
  txtLightColorLeft: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    margin: 7,
    fontFamily:'OpenSansBold',
    textAlign:'left'
  },
  txtLightColor2: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    fontFamily:'OpenSansBold',
  },
  txtDarkColor: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    margin: 7,
    fontFamily:'OpenSansBold',
  },
  txtLightColorNumber: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    margin: 7,
    fontFamily:'aSignboardCpsNrBoldItalic',
  },
  txtLightColor5: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    margin: 7,
    fontWeight:'bold'
  },
  txtTasktitle: {
    color: "#fff",
    fontSize: normalize(17),
    fontFamily:'OpenSansBold',
  },
  txtLightColortask: {
    margin: 2,
    fontSize:normalize(13),color:'#fff',
    textAlign:"left",
    marginTop:normalize(18),
    paddingBottom:normalize(25),
    lineHeight: normalize(20)
  },
  txtLightColortaskdescription: {
    margin: 2,
    fontSize:normalize(13),color:'#fff',
    textAlign:"left",
    marginTop:normalize(4),
    paddingBottom:normalize(5),
    lineHeight: normalize(20),
    fontFamily:'TisaSansProBoldItalic'
  },
  txtLightColortaskDescription: {
    margin: 2,
    fontWeight:'bold',
    fontSize:normalize(15),color:'#fff',
    textAlign:"left"
  },
  Description:{
    width:'90%',
    alignItems:'flex-start',
  },
  borderBotomWidth:{
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
justifyContent: 'center',
alignItems: 'center',
paddingVertical: normalize(10),
  width: '100%',
  borderWidth: 20,
borderTopRightRadius: 800,
  borderTopLeftRadius: 800,
    marginTop:normalize(40),
borderColor:GLOBAL.OFFICIAL_backgroundItem,
    position: 'absolute', //Here is the trick
    bottom: normalize(52), //Here is the trick
  },
  txtLightColortask_Items: {
    marginLeft: normalize(10),
    fontFamily:'OpenSansBold',
    fontSize:normalize(13),color:'#fff',
  },
  txtLightColortask_Items33: {
    marginLeft: normalize(10),
    fontFamily:'OpenSansBold',
    fontSize:normalize(13),color:GLOBAL.OFFICIAL_BLUE_COLOR,
  },
  txtLightColortask_Items_Number: {
    marginLeft: normalize(10),
    fontFamily:'OpenSansBold',
    fontSize:normalize(13),color:'#fff',
  },
  txtLightColortask_Items_Date: {
    marginLeft: normalize(2),
    fontWeight:'bold',
    fontSize:normalize(12),color:'#fff',
  },
  txtLightColor_Left: {
    color: Colors.button,
    fontSize: normalize(14),
    margin: 7,
    fontFamily:'OpenSansBold',
    textAlign:'left'
  },
  txtLightColor_samall: {
    color:Colors.green,
    fontSize: normalize(12),
    margin: 7,
    fontWeight:'bold',

  },
  txtLightColorLocation: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    textAlign:"left",
    paddingVertical:normalize(7),
    fontFamily:'GascogneSerialBoldDB',
  },
  txtGrayColor: {
    color: GLOBAL.OFFICIAL_Button,
    fontSize: normalize(14),
    margin: 7,
    fontFamily:'OpenSansBold',
  },
  txtGrayLightColor: {
    color: '#aaaaaa',
    fontSize: normalize(12),
    margin: 7,
    fontWeight:'bold'
  },
  txtLight: {
    color: "#fff",
    fontSize: normalize(14),
    margin: 7,
    marginTop:normalize(10),textAlign:"left"
  },
  txtLightcenter: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    margin: 7,
    marginTop:normalize(10),textAlign:"center",
    paddingVertical:normalize(5),
    fontFamily:'OpenSansBold',
  },
  txtFeature: {
    fontSize: normalize(14),
    marginTop:normalize(10),
    color: "#fff",
    marginVertical:normalize(6),
    textAlign:"center",
    marginLeft:normalize(10),
    fontFamily:'OpenSansBold',
  },
  txtFeatureNumber: {
    fontSize: normalize(14),
    marginTop:normalize(10),
    color: "#fff",
    marginVertical:normalize(6),
    textAlign:"center",
    marginLeft:normalize(10),
    fontFamily:'aSignboardCpsNrBoldItalic',
  },
  txtLightcenterNoPadding: {
    color: "#fff",
    fontSize: normalize(14),
    margin: 2,
    marginTop:normalize(5),textAlign:"center",

  },
  txtImageBox: {
    color: "#fff",
    fontSize: normalize(13),
    marginVertical:normalize(6),
    textAlign:"center",
    marginLeft:normalize(7),
    fontFamily:'OpenSansBold',

  },
  txtImageBoxnumber: {
    color: "#fff",
    fontSize: normalize(13.5),
    marginVertical:normalize(6),
    textAlign:"center",
    marginLeft:normalize(7),
    fontFamily:'GascogneSerialBoldDB',


  },
  txtLightLeftNoPadding: {
    color: '#fff',
    fontSize: normalize(14),
    margin: 2,
    marginTop:normalize(5),textAlign:"left",

  },

  btn: {
    backgroundColor: GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",

  },
  btnFullWith: {
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: '100%',
    paddingVertical: 2,
    marginTop: normalize(30),
  },
  btnNOBackColor: {

    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",

  },
  btnTask: {
    backgroundColor: GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width:'93%',
    paddingVertical:normalize (9),
    marginTop: normalize(24),
  },
 btnTaskAdd: {
    backgroundColor: GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width:'100%',
    paddingVertical:normalize (9),
    marginTop: normalize(24),
  },
  btn23: {
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: '40%',
    marginVertical: normalize(40),
  },
  btn_add_Photo: {
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: '40%',
    marginBottom: normalize(40),
  },
  btnFilter: {
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: '40%',
    marginVertical: normalize(5),
    color:GLOBAL.OFFICIAL_BLUE_COLOR
  },
  btnDYBListDetail: {
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: '40%',
    marginBottom: normalize(40),
  },
  btnDYB: {
    borderRadius: normalize(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: '45%',
    marginVertical: normalize(40),
  },

  littleImage: {
    width: '100%', height: normalize(35),
  },

  Icon: {
    width: normalize(40), height: normalize(40),
  },
  HeaderBackColor: {
    backgroundColor: GLOBAL.OFFICIAL_background,
  },
 taskBackColor: {
    backgroundColor: GLOBAL.OFFICIAL_backgroundItem,
  },
  Backcolor: {
    backgroundColor: GLOBAL.OFFICIAL_background,
  },
  Backcolor2: {
    backgroundColor: Colors.button,
  },
  BackcolorHome: {
    backgroundColor: '#f6f9f9',
  },
  HeaderText2:{
    fontFamily:'OpenSansBold',color: Colors.button,
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center'
  },

  HeaderText4:{
   color: '#4a6e8e',
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center',
    fontFamily:'TisaSansProBlack'
  },
  HeaderText45:{
   color: '#4a6e8e',
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center',
    fontFamily:'OpenSansBold',
  },
  MenuBtn:{ width: "100%", flexDirection: "row", justifyContent: "center",color:'#fff',},
  linearView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  liner: {
    height: normalize(2.3), flex: 0.8,
    backgroundColor: "#252A41",
  },
  btnGoogel: {
    height: normalize(38),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#424867",
    borderRadius: normalize(7),
    flexDirection: "row",
  },

  viewExplain: {
    backgroundColor: "red",
    borderRadius: normalize(6),
    paddingVertical: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  minLabel: {
    alignSelf: "center",
    alignItems: "center",
  },
  playLabel: {
    alignSelf: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1, paddingVertical: 5,
    alignSelf: "center",
  },
  label: {
    alignSelf: "center",
    alignItems: "center",
  },
  content: {
    alignSelf: "center",
    alignItems: "center",
  },
  flashMessage: {
    backgroundColor: "#CC0000",
    width: '95%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    flexDirection: "row",
    borderRadius: normalize(6),
    zIndex: 10,
  },
  flashMessageSuccsess: {
    backgroundColor: "#03570d",
    width:'90%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: normalize(6),
    zIndex: 10, marginTop: 10,
    alignSelf:'center'
  },
  flashMessageSuccsess2: {
    backgroundColor: "#03570d",
    width:'90%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: normalize(6),
    zIndex: 10,
    alignSelf:'center'
  },
  flashMessageWarning: {
    backgroundColor: 'rgb(250,186,46)',
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: normalize(6),
    zIndex: 10, marginVertical: normalize(15),
    alignSelf:'center',
    flexDirection:'row',
    position:'absolute'
  },
  flashMessageWarning2: {
    backgroundColor: 'rgba(250,186,46,0.7)',
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: normalize(6),
    zIndex: 10, marginVertical: normalize(15),
    alignSelf:'center',
    flexDirection:'row',
  },
  flashMessageWarning6: {

    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    marginVertical: normalize(2),
    alignSelf:'center',
    flexDirection:'row',
  },
  flashMessageWarning4: {
    backgroundColor: 'rgba(250,186,46,0.7)',
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: normalize(6),
    zIndex: 10, marginVertical: normalize(15),
    alignSelf:'center',

  },
  flashMessageWarning3: {
    backgroundColor: 'rgba(250,186,46,0.7)',
    width:'87%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: normalize(6),
    zIndex: 10, marginVertical: normalize(15),
    alignSelf:'center',
    flexDirection:'row',
  },
  flashMessageAdded: {
    width:'90%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: normalize(5),
    borderRadius: normalize(6),
    zIndex: 10, marginTop: normalize(4),
    alignSelf:'center',

  },
  responsiveimage: {
    width: 20, height: 25,
  },
  Footertxt: {
    color: "#fff",
    fontSize: normalize(13),
    paddingTop: 3,
    fontFamily:'OpenSansBold',
  },
  Footertxt_Home: {
    color: '#4a6e8e',
    fontSize: normalize(13),
    paddingTop: 3,
    fontFamily:'OpenSansBold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  container_task: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  container_task2: {
    flex: 1,

    alignItems: "center",

  },
  container2: {
    flex: 1,
    justifyContent: "center",

  },
  containerList: {
    flex: 1,
    alignItems: "center",

  },
  editBtn: {
    width: "100%", alignItems: "center", justifyContent: "center",
    marginRight: "4%", paddingVertical: 2,
  },
  editBtn2: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: normalize(15),
    backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,
    marginRight: "4%",
  },
  FloatBtn: {

    alignItems: "center",
    justifyContent: "center",
    width: normalize(57),
    position: "absolute",
    bottom: normalize(62),
    right: normalize(16),
    height: normalize(57),
    backgroundColor: GLOBAL.OFFICIAL_Buttondark,
    borderRadius: 100,
    marginTop:normalize(20)
  },
  FloatBtn_action: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(58),
    position: "absolute",
    bottom: normalize(55),
    right: normalize(16),
    height: normalize(58),
    marginTop:normalize(20)
  },
  scrollBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(45),
    position: "absolute",
    bottom: normalize(135),
    right: normalize(16),
    height: normalize(45),
    borderRadius: 100,

  },
  scrollBtn2: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(45),
    position: "absolute",
    bottom: normalize(70),
    right: normalize(16),
    height: normalize(45),
    borderRadius: 100,

  },
  scrollBtn23: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(45),
    position: "absolute",
    bottom: normalize(112),
    right: normalize(16),
    height: normalize(45),
    borderRadius: 100,

  },

  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  FlexWrap: {
    flexDirection: "row", flexWrap: "wrap", margin: normalize(4), justifyContent: "space-between", width: "100%",
  },
  FlexWrap_flatlist: {
    margin: normalize(4), width: "100%",
  },
  FlexWrapDyb: {
     margin: normalize(4), justifyContent: "center", width: "100%",  alignItems: "center",
  },
  FlexWrap2: {
    flexDirection: "row", flexWrap: "wrap", margin: normalize(4), justifyContent: "space-between", width: "90%",
  },
  FlexWrapHome: {
    flexDirection: "row", flexWrap: "wrap", marginTop: normalize(40), justifyContent: "space-between", width: "90%",
  },
  FlexWrapHome2: {
    flexDirection: "row", flexWrap: "wrap", marginTop: normalize(20), justifyContent: "space-between", width: "90%", alignItems:"center",
  },
  WarningBox:{
    flexDirection: "row",marginTop: normalize(25), justifyContent: "space-between", width: "90%",backgroundColor:"#f5e8d3",
    borderRadius:normalize(6)
  },
  WarningBoxItems:{
  width:'3%',backgroundColor:"#f3b04e",borderBottomLeftRadius:normalize(6),borderTopLeftRadius:normalize(6),paddingVertical:normalize(10)
  },
  WarningBoxItems2:{
    width:'97%', flexDirection: "row",paddingVertical:normalize(10)
  },
  WarningBoxItemsTest:{
    fontWeight: "bold", color: Colors.black,
    fontSize: normalize(14),
    textAlign:'center',
  },
  Flexrow:{
    flexDirection:"row",margin: normalize(4),justifyContent:"space-between",width: "90%",
  },
  MenuText: {
    fontWeight: "bold", color: Colors.withe,
    fontSize: normalize(20), paddingVertical: 6,
    textAlign: "center",
  },
  Menu:{
    width:'100%',
    paddingVertical:7,
    borderBottomWidth:1,
    borderBottomColor:Colors.backgroundTab,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  ModuleBox:{
  width:width/2.3,backgroundColor:"rgba(244,244,251,0)",
  marginBottom: "5%", borderTopRightRadius: normalize(35),
    borderRadius: normalize(5),  justifyContent:"center",
    alignItems:"center",
  },
  ModuleBox2:{
    width:width/2.6,
    marginBottom: "5%", borderRadius: normalize(15),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#fff'
  },
  FooterFloatBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a6e8e",
    width: Platform.OS === "ios" ? 50 : 60,
    height: Platform.OS === "ios" ? 50 : 60,
    top: Platform.OS === "ios" ? -10 : -15,
    borderRadius: Platform.OS === "ios" ? 25 : 30,
  },
  FooterFloatBtn_home: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a6e8e",
    width: Platform.OS === "ios" ? 50 : 60,
    height: Platform.OS === "ios" ? 50 : 60,
    borderRadius: Platform.OS === "ios" ? 25 : 30,
  },
  FooterFloatBtn_home1: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f9f9",
    width: Platform.OS === "ios" ? 60 : 72,
    height: Platform.OS === "ios" ? 60 : 72,
    top: Platform.OS === "ios" ? -20 : -25,
    borderRadius: Platform.OS === "ios" ? 35 : 42,
  },
  FooterTab:{
    backgroundColor:GLOBAL.OFFICIAL_background,
    shadowColor:"#000",
    shadowOffset:{width:0,height:6},
    shadowOpacity:0.39,
    shadowRadius:8.30,
    elevation:13,
    borderTopWidth:0.2,
    borderTopColor:"rgba(255,255,255,0.18)",
  },
  FooterTab_Home:{
    backgroundColor:'#fff',
    borderTopWidth:0.2,
    borderTopColor:"rgba(255,255,255,0.18)",
  },
  UnitDetailTextBox: {
    width: "100%",
    backgroundColor: "rgb(42,48,82)",
    paddingVertical: 5,
    borderBottomRightRadius: normalize(6),
    borderBottomLeftRadius: normalize(6),
  },
  UnitDetailAddTextBox: {
    width: "22%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.51)",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",

    borderRadius: normalize(10),
    alignItems: "center",
    margin: normalize(5),

    backgroundColor: "rgba(56,46,46,0.93)",

  },
  UnitDetailAddTextBox23: {
    width: "98%",
    paddingVertical: 5,
    justifyContent: "center",
    borderRadius: normalize(5),
    alignItems: "center",
    margin: normalize(5),
paddingHorizontal:7,


  },
  UnitDetailAddTextBox24: {
    width: "98%",
    justifyContent: "center",
    borderRadius: normalize(5),
    alignItems: "center",
    margin: normalize(5),
    paddingHorizontal:7,


  },
  FeatureDetailBox: {
    width: "95%",

    alignItems: "flex-start",
    margin: normalize(5)

  },
  UnitDetailAddTextBoxFullImage: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: normalize(2),
    paddingLeft: normalize(10)
  },
  AddTextBoxFullImage: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: normalize(2),
    paddingLeft: normalize(10),
  },
  UnitDetailAddTextBox2: {
    width: "25%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.51)",
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.22)",
    borderRadius: normalize(10),
    alignItems: "center",
    margin: normalize(6),
  },

  UnitDetailImageBoxStyle: { width: "44%", height: normalize(120), marginTop: normalize(30) },
  UnitDetailImageBoxFeatureStyle: {
    width: "48%",
    marginTop: normalize(13),
    borderRadius: normalize(6),

  },
  UnitDetailImageBoxFeatureStyle2: {
    width: "49%",
    marginTop: normalize(13),
    borderRadius: normalize(6),


  },
  DetailImageTask: {
    width: "49%",
    marginTop: normalize(13),
    borderRadius: normalize(6),


  },
  FatureDetailImagestyleFullScreen: {borderTopLeftRadius: normalize(6),borderTopRightRadius:normalize(6),
    width: "100%", height: normalize(286),alignItems:'center',justifyContent:'center' },

  UnitDetailImagestyle: { width:'100%', height: normalize(200)},
  UnitDetailImagestyleFullScreen: { width: "100%", height: normalize(390),alignItems:'center',justifyContent:'center' },
  unitDetailUploadImagebox: {
    width: "48%", height: normalize(200), borderRadius: normalize(6),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: GLOBAL.OFFICIAL_Button, justifyContent: "center", alignItems: "center", marginTop: normalize(13),
  },

  ListDetailUploadImagebox: {
    width: "100%", height: normalize(376), borderRadius: normalize(6),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: GLOBAL.OFFICIAL_Button, justifyContent: "center", alignItems: "center",
  },
 TaskUploadImagebox: {
    width: "100%", height: normalize(270), borderRadius: normalize(6),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: GLOBAL.OFFICIAL_Button, justifyContent: "center", alignItems: "center",
  },
  FeatureDetailUploadTitebox: {
    width: "44%", paddingVertical: normalize(10), borderRadius: normalize(6),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: GLOBAL.OFFICIAL_Button, justifyContent: "center", alignItems: "center", marginTop: normalize(30),
  },
  UploadImageText2: { fontSize: normalize(14), color:'#fff', fontFamily:'OpenSansBold', paddingBottom: 8 },

  UploadImageText: { fontSize: normalize(14), color: GLOBAL.OFFICIAL_BLUE_COLOR, fontFamily:'OpenSansBold', paddingBottom: 8 },
  UploadNotesText: { fontSize: normalize(14), color: "#fff", fontFamily: GLOBAL.FONT_FAMILY,},
  ModalizeDetalStyle: {
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flex: 0.3,
    width: "100%",
    alignSelf: "center",
    backgroundColor: GLOBAL.OFFICIAL_background,
    zIndex:1000
  },
  ModalizetaskStyle: {
    alignItems: "center",

    flex: 0.2,
    width: "100%",
    alignSelf: "center",
    backgroundColor: GLOBAL.OFFICIAL_background,
    zIndex:1000
  },
  BtnBox: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: normalize(12),
  },
  BtnBoxtask: {
    width: "100%",
    backgroundColor: 'rgba(163,152,151,0.87)',
    height: '100%',
    justifyContent:'flex-end'
  },
  BtnBoxtask2: {
    width: "100%",
    backgroundColor:GLOBAL.OFFICIAL_background,
    paddingVertical: normalize(15),
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

  },
  UploadBtn: {
    width: "80%", backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR
    , marginTop: "6%", borderRadius: normalize(5),
    paddingVertical: 9, flexDirection: "row", justifyContent: "center",
  },
  TextUploadBtn: {
    color: "#fff",
    fontSize: normalize(14),
    textAlign: "center",
    paddingLeft: normalize(10),
    fontFamily:'OpenSansBold',
  },
  dropdown2: {
    height: normalize(35),
    borderColor: GLOBAL.OFFICIAL_Button,
    borderWidth: 0.5,
    borderRadius: normalize(6),
    paddingHorizontal: 8,
    width: "100%",
    marginTop: normalize(25),
  },
  dropdowntask: {
    height: normalize(35),
    borderColor: GLOBAL.OFFICIAL_Button,
    borderWidth: 0.5,
    borderRadius: normalize(6),
    paddingHorizontal: 8,
    width: "100%",
    marginTop: normalize(4),
  },
  icon: {
    marginRight: 5,
  },
  icon_Location: {
    marginRight:normalize(2),
  },
  placeholderStyle: {
    fontSize: normalize(14),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
  },
  placeholderStyle5: {
    fontSize: normalize(14),
    color: Colors.Light,
  },
  containerStyle: {
    backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,
  },
  containerStyle12: {
    backgroundColor: Colors.Light,
  },
  containerStyle3: {
    backgroundColor:Colors.Light,
  },
  itemTextStyle: {
    fontSize: normalize(14),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
  },
  selectedTextStyle: {
    fontSize: normalize(14),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
  },
  selectedTextStyle12: {
    fontSize: normalize(14),
    color: Colors.Light,
  },
  renderItemStyle:{flexDirection:'row',alignItems:'center',paddingVertical:normalize(5)},
  renderItemDetailStyle:{flexDirection:'row',alignItems:'center',paddingVertical:normalize(7)},

  renderItemDetailStyle2:{width:'100%',backgroundColor:GLOBAL.OFFICIAL_backgroundItem,marginBottom:'4%'
    ,alignItems:"center",height:normalize(69),borderRadius:normalize(6),paddingVertical:8},

  iconStyle: {
    width: 20,
    height: 20,
  },
  DeleteModalStyle:{ backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR, paddingVertical:normalize(5),
    alignItems: "center", borderRadius: 10,justifyContent:"center",marginTop:'20%' },
  taskModalStyle:{ backgroundColor:GLOBAL.OFFICIAL_background, paddingVertical:normalize(5),
    alignItems: "center", borderRadius: 10,justifyContent:"center",marginTop:'19%',borderWidth:1,borderColor:GLOBAL.OFFICIAL_BLUE_COLOR },
  DeleteModalStyle2:{backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR, paddingVertical:normalize(5),
    alignItems: "center",justifyContent:"center", borderWidth:1,
    borderRadius: normalize(10), borderColor:GLOBAL.OFFICIAL_Button,width:'90%',},



  DeleteModalStyle23:{backgroundColor:Colors.Light, paddingVertical:normalize(5),
    alignItems: "center",justifyContent:"center", borderWidth:1,
    borderRadius: normalize(10), borderColor:GLOBAL.OFFICIAL_Button,width:'90%',},
  warningModalStyle2:{backgroundColor:'rgb(250,186,46)', paddingVertical:normalize(5),
    alignItems: "center",justifyContent:"center", borderWidth:1,
    borderRadius: normalize(10), borderColor:GLOBAL.OFFICIAL_Button,width:'90%',},
  DeleteModalTotalStyle:{
    alignItems: "center",justifyContent:"center",marginTop:'40%',
    borderRadius: normalize(10), width:'100%',},


  TaskModalTotalStyle:{
    alignItems: "center",justifyContent:"center",marginTop:'17%',
    borderRadius: normalize(10), width:'100%',},
  LocationModalStyle:{ backgroundColor:GLOBAL.OFFICIAL_background, paddingVertical:normalize(30),
    alignItems: "center", borderRadius: 10,justifyContent:"center",marginTop:'auto' },
  inputSearchStyle: {
    height: normalize(40),
    fontSize: normalize(14),
    backgroundColor: Colors.button,
    color: "#fff",
  },
  inputSearchStyle34: {
    height: normalize(40),
    fontSize: normalize(14),
    backgroundColor: Colors.Light,
    color: "#fff",
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.button,

  },
  item_status: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e233b",
    width:'100%'
  },
  textItem: {
    flex: 1,
    fontSize: normalize(14),
    color: "#fff",
    fontFamily:'OpenSansBold',
  },
  textItem_status: {
    flex: 1,
    fontSize: normalize(12),
    color: "#fff",
  },
  selectedTextStyle2: {
    fontSize: normalize(14),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    paddingRight: normalize(8),
  },
  selectedStyle2: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: normalize(6),
    marginTop: normalize(16),
    borderWidth: 1,
    borderColor: "#1e233b",
    marginRight: normalize(12),
    paddingHorizontal: normalize(9),
    paddingVertical: normalize(8),
  },
  BtnListStyle:{width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: normalize(8),},
  BtnListStyle3:{width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: normalize(13),},
  BtnListStyleDyb:{width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: normalize(17),},
  BtnListStyle2:
    {
    width: "30%",
    alignItems: "center",
    },
  TaskListStyle:{width: "100%",

    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: normalize(7),}
  ,
  taskbtnStyle:{width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: normalize(7),},
  btnList:
    {
      backgroundColor: "#7953FAFF", filter: "blur(15)", width: "37%", paddingVertical: normalize(7),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btnFactor:
    {
      backgroundColor: "#f6f9f9", filter: "blur(15)", width: "85%", paddingVertical: normalize(7),
      borderRadius: normalize(6),
      marginBottom: normalize(13),

    },
  btnListTask:
    {
      width: "20%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btnPos:
    {
      width: "45%",
      backgroundColor: "#7953FAFF", filter: "blur(15)", paddingVertical: normalize(7),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btnListTask2:
    {
      width: "100%", paddingVertical: normalize(7),
      borderTopRightRadius: normalize(15),
      borderBottomRightRadius: normalize(15),
      marginRight: normalize(7),

    },
  btnList1:
    {
      backgroundColor: "#4B75FCFF", filter: "blur(15)", width: "37%", paddingVertical: normalize(7),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
 btntask:
    {
      backgroundColor: "#4B75FCFF", filter: "blur(15)",paddingHorizontal:normalize(10), paddingVertical: normalize(10),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btntaskCircel:
    {
      backgroundColor: GLOBAL.OFFICIAL_background, filter: "blur(15)",paddingHorizontal:normalize(10), paddingVertical: normalize(10),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btntask1:
    {
      backgroundColor: "#4B75FCFF", filter: "blur(15)",paddingHorizontal:normalize(4), paddingVertical: normalize(4),
      borderRadius: normalize(6),
      marginRight: normalize(2),
    },
  triangle:{
    width:0,
    height:0,
    backgroundColor:"transparent",
    borderStyle:"solid",
    borderLeftWidth:9,
    borderRightWidth:9,
    borderBottomWidth:19,
    borderLeftColor:"transparent",
    borderRightColor:"transparent",
    borderBottomColor:GLOBAL.OFFICIAL_background
  },
  triangle1:{
    width:0,
    height:0,
    backgroundColor:"transparent",
    borderStyle:"solid",
    borderLeftWidth:6,
    borderRightWidth:6,
    borderBottomWidth:12,
    borderLeftColor:"transparent",
    borderRightColor:"transparent",
  },
  guide:{
    width:'100%',
    flexDirection:"row",
    paddingVertical:normalize(10)
  },
  guideItem:{
    width:'20%',
    justifyContent:"flex-start",
    flexDirection:"row",
  },
  guideItembox:{
    width:'80%',
    justifyContent:"flex-start",
    flexDirection:"row",
    flexWrap: "wrap",
  },
  btnList2:
    {
      backgroundColor: "rgb(55,167,239)", filter: "blur(15)", width: "37%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
      marginRight: normalize(7),
    },
  btnListDelete:
    {
    width:"20%",paddingVertical:normalize(5),
    borderRadius:normalize(6),
    marginHorizontal:normalize(20),
    },
  btnList3:
    {
      backgroundColor: "rgb(55,167,239)", filter: "blur(15)", width: "35%", paddingVertical: normalize(7),
      borderRadius: normalize(6),
      marginRight: normalize(7),
      flexDirection:'row',alignItems:'center',justifyContent:'center'
    },
  btnListedit:
    {
      width: "37%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
    },
  btnList32:
    {
       width: width/3, paddingVertical: normalize(10),
      borderRadius: normalize(6),
      marginRight: normalize(15),
      flexDirection:'row',alignItems:'center',justifyContent:'center',
    },
  btnList15:
    {
      width: width/3, paddingVertical: normalize(10),
      borderRadius: normalize(6),
    },
  btnUpdateNote:
    {
      width: "32%", paddingVertical: normalize(10),
      borderRadius: normalize(6),
      marginBottom: 6
    },
  inputStyleBox: {
    borderBottomWidth: 1,
    borderBottomColor: GLOBAL.OFFICIAL_Button,

    padding: 12,
    marginBottom: 5,
    width: '50%',
    color: "#fff",

  },
  inputStyleBox2: {
    padding:12,
    marginBottom: 5,
    width:'100%',
    color:"#fff",
  },
  inputStyleBoxPadding0: {

    marginBottom: 5,
    width:'100%',
    color:"#fff",
  },
  inputStyleFeature: {
    borderWidth:1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:6,
    marginBottom:5,
    width:'100%',
    color:Colors.button,
    fontFamily:'OpenSansBold',
  },
  inputStyleTask: {
    borderWidth:0.5,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:4,
    width:'100%',
    color:Colors.button,
    fontFamily:'OpenSansBold',
  },
  inputetext:{
    color:"#fff",
    fontSize:normalize(14),
    paddingTop:normalize(10),
    paddingHorizontal:4
  },
  viewinputStyleTask: {
    padding:4,
    width:'100%',
    color:"#fff",

  },
  inputFeatureNote: {
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:normalize(6),
    backgroundColor:'#fff',
    padding:6,
    marginVertical:normalize(12),
    width:'96%',
    color:"#fff",
    flexDirection:'row'
  },
  CenterItems:{alignItems:'center',justifyContent:'center'},
  ItemsBox:{
    margin:normalize(15) ,marginBottom:normalize(50),justifyContent:'space-between',
    width: '92%',alignItems:'center'
  },
  ItemsBox2:{
    margin:normalize(20),justifyContent:'space-between',
    width: width-SPACING.space_25,alignItems:'center',marginBottom:normalize(55)
  },
  ItemsBoxDyb:{
    marginBottom:normalize(20),justifyContent:'space-between',
    width: width-SPACING.space_25,alignItems:'center',
  },
  Header:{
    width: '100%',
    paddingVertical:7,
    borderBottomWidth:1,
    borderBottomColor: Colors.backgroundTab,
    flexDirection:"row",
    justifyContent:'center',
    alignItems:'center',
  },
  HeaderStyle:{

    borderBottomWidth:1,
    borderBottomColor: Colors.backgroundTab,
    backgroundColor:GLOBAL.OFFICIAL_background
  },
  HeaderStyle2:{

    borderBottomWidth:1,
    borderBottomColor: Colors.Light,
    backgroundColor:GLOBAL.OFFICIAL_background
  },
  HeaderStyleHome:{
    backgroundColor:'#fff',
    flexDirection:'row'
  },
  HeaderStyleHome1:{
    backgroundColor:'#fff',
    width:'100%',
    borderBottomRightRadius:50,borderBottomLeftRadius:50
  },
  HeaderText:{
    color: Colors.withe,
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center',
    fontFamily:'OpenSansBold',
  },
  CancelBtn:{ width: "100%" ,justifyContent:'center',marginTop:15,alignItems:'center'},
  CancelBtnLeft:{ width: "100%" ,justifyContent:'flex-start',marginTop:15,alignItems:'center'},
  CancelBtnLeftAlign:{ width: "90%" ,justifyContent:'flex-start',marginTop:15,},
  CancelBtnLeftAlign2:{ width: "90%" ,justifyContent:'flex-start',zIndex:0},
  CancelBtnLeftAlign3:{ width: "90%" ,justifyContent:'flex-start',
    backgroundColor:GLOBAL.OFFICIAL_background,position:'absolute', top:normalize( 46),zIndex:10,paddingVertical: normalize(18),},
  CancelBtnLeftAlignwarn:{ width: "20%" ,alignItems:'flex-start',marginLeft:normalize(10)},
  infocirlce:{ width: "10%" ,alignItems:'center'},
  WarningBoxItemsTestBox:{ width: "80%" ,alignItems:'flex-start'},
  closecircleo:{ width: "10%" ,alignItems:'flex-start'},
  CancelBtnMargin0:{ width: "90%" ,justifyContent:'flex-start',},
  AlertTxt:{
    color: "white",

    textAlign:'center',
    fontFamily:'OpenSansBold',
  },
  AddedtTxt:{
    color: "white",

    textAlign:'center',
    lineHeight:normalize(25),
    fontFamily:'OpenSansBold',
  },
  Backbtn:{ width: "100%", flexDirection: "row", justifyContent: "center" },
  menubtn:{ width: "100%", flexDirection: "row", justifyContent: "flex-start" },
  modalStyle:{

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flex:0.8,
    width: "100%",
    alignSelf: "center",
    backgroundColor:GLOBAL.OFFICIAL_background
  },
  ItemDetailBox:{
    width:width-SPACING?.space_25,
    backgroundColor:GLOBAL.OFFICIAL_WITE_COLOR,
     marginBottom:'2%'
    ,borderRadius:normalize(6),
    alignItems:"center",
    paddingVertical:normalize(15),
    flex:1,
    borderWidth:0.7,
    borderColor:"#eee"
  },
  ItemFoctorBox:{
    width:width-SPACING?.space_25,
    backgroundColor:GLOBAL.OFFICIAL_WITE_COLOR,
    marginBottom:'2%'
    ,borderRadius:normalize(6),
    alignItems:"center",

    flex:1,
    borderWidth:0.7,
    borderColor:"#eee"
  },
  ItemDetailBox2:{width:width-SPACING?.space_25,
     backgroundColor:Colors.withe,marginBottom:'2%'
    ,alignItems:"center",height:normalize(90),borderRadius:normalize(6),paddingVertical:8},
  ItemDetailBox1:{width:'100%',backgroundColor:'rgba(246,249,249,0.45)',
    alignItems:"center",flex:1,borderRadius:normalize(6),position:'absolute',height:normalize(90)},
  ItemDetailFeatureBox:{backgroundColor:'#fff'
   ,alignItems:"center",paddingVertical:normalize(7),
     width:'100%',
    marginTop: normalize(15),
    borderRadius: normalize(6),
  },
  With90:{width:'90%',flexDirection:'row'},
 With93_row:{width:'93%',flexDirection:'row'},
  With100_row:{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'},
  With65:{width:'65%'},

  With35:{width:'35%'},
  With90_zIndex:{width:'90%',flexDirection:'row',zIndex:-1},
  With90Center:{width:'90%',alignItems:'center'},
  With90Center_Margin:{width:'90%',alignItems:'center',marginBottom:normalize(20)},
  With90CenterVertical:{width:'90%',alignItems:'center',justifyContent:'center',marginTop:normalize(90)},
  With100CenterVertical:{width:'100%',alignItems:'center',justifyContent:'center',marginTop:normalize(90)},
  Items:{width:'100%',flexDirection:'row',alignItems:'center',marginTop:4},
  DropDownFull:{backgroundColor:GLOBAL.OFFICIAL_background,width:'100%',borderBottomWidth:1,borderRadius:normalize(6),borderColor:GLOBAL.OFFICIAL_BLUE_COLOR},
  DropDown:{backgroundColor:GLOBAL.OFFICIAL_background,borderBottomWidth:1,borderRadius:normalize(6),borderColor:GLOBAL.OFFICIAL_BLUE_COLOR},
  DropDownIcon:{width:'100%',paddingVertical:4,alignItems:"flex-end" },
  DropDownIconFull:{width:'100%',paddingVertical:4,alignItems:"flex-start", },
  With90CenterVertical3:{width:'100%',alignItems:'center',justifyContent:'center',marginTop:normalize(160)},
  ModalStyle:{
    borderRadius: normalize(15),
    backgroundColor:GLOBAL.OFFICIAL_background,
    width:'100%',
    alignItems:'center',
    marginTop:'auto',
    zIndex:120,
    paddingVertical:normalize(10),

  },
  ModalStyleFullImage:{
    borderRadius: normalize(15),
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:GLOBAL.OFFICIAL_background,

  },
  ModalStyleFullImageDetails:{
    borderRadius: normalize(15),
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:GLOBAL.OFFICIAL_background,
    flex:1

  },
  ModalStyleFullImageFeature:{
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
flex:1,
    flexDirection:'row'
  },
  ModalFullImageFeature:{
    borderRadius: normalize(15),
    width:'95%',
    alignItems:'center',
    justifyContent:'center',
  },
  cardContainer: {
    justifyContent: 'center',

    alignItems:'center',
    width:'100%',

  },
  cardNotesContainer: {
    justifyContent: 'center',
    marginTop:normalize(15),
    alignItems:'center'

  },
  card: {
    justifyContent: 'center',
    marginHorizontal: normalize(8),
    width: '100%',
    backgroundColor:'#878787',
    borderRadius:normalize(6)
  },
  cardAddimage: {
    justifyContent: 'center',
    marginHorizontal: normalize(8),
    width: '100%',
    backgroundColor:'#878787',
    marginTop:normalize(14)
  },
  cardNotes: {
    justifyContent: 'center',
    width: '95%',
  },
  Center_100:{justifyContent:'center',width:'100%',alignItems:'center'
  },
  Center:{margin:normalize(10),justifyContent:'space-between',width:'93%',alignItems:'center'
  },
  Center_margin_Bottom:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(65),
  },
  Center_margin_Bottom2:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(20),
  },
  Center_margin_Bottom3:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(5),
  },
  Center_margin_Bottom_details:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(38),
  },
  DYB:{width:'100%',flexDirection:'row',alignItems:'center',flexWrap:'wrap',marginTop:normalize(7)},
  AddTextStyleFullImageFeature:{justifyContent:'space-between',width:'100%',backgroundColor:Colors.button,
    borderBottomLeftRadius:normalize(6) ,borderBottomRightRadius:normalize(6)},
  AddTextStyle:{justifyContent:'center',width:'100%',backgroundColor:"rgb(42,48,82)", borderBottomLeftRadius:normalize(6),borderBottomRightRadius:normalize(6) },
  AddTextStyleFullImage:{justifyContent:'space-between',width:'100%',backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    borderBottomLeftRadius:normalize(6),borderBottomRightRadius:normalize(6) },
  AdddateStyle:{justifyContent:'center',width:'100%'},
  DYBtitleInpute:{  width:'45%' ,
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    paddingVertical: 4,
    color: '#fff',},
  DYBtitleInpute2:{  width:'45%' ,
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 10,
    marginBottom: 5,
    paddingVertical: 4,
    color: '#fff',},
  DYBDatteInpute2:{
    width:'100%' ,
    padding: 4,
    paddingVertical: normalize(3),
    color: '#fff',flexDirection:'row',alignItems:'center'},
  DatteInpute:{
    width:'100%' ,
    padding: 10,
    marginVertical:'2%',
    paddingVertical: normalize(3),
    color: '#fff',alignItems:'center'},
  TaskBox:{marginTop:normalize(15),justifyContent:'space-between', width: '100%',alignItems:'center',

  },
  SectionFooter:{width:'100%',height:normalize(60)},
  SectionHeader:{width:'100%',height:normalize(10)},
  With100Flex_End:{width:'100%',justifyContent:'flex-end',paddingBottom:normalize(15)},
  With100:{width:'100%'
    ,alignItems:"center",flex:1},
  With94:{width:'94%'
    ,alignItems:"center",flex:1},
  With100NoFlex:{width:'100%'
    ,alignItems:"center"},
  With100_NoFlex:{width:'100%'
    ,justifyContent:"center"},
  With100Padding:{width:width
    ,alignItems:"center",paddingBottom:normalize(15),},
  With100NoFlexLeft:{width:'100%'
    ,alignItems:"flex-start"},
   With100NoFlexMarginBotoom:{width:'100%'
    ,alignItems:"center",marginBottom:normalize(15)},

  With95:{width:'95%'
    ,alignItems:"center"},
  With95NoFlex:{width:'95%'
    ,marginBottom:normalize(45)},
  With100Row:{
    marginVertical: normalize(22),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  With95Row:{
    marginVertical: normalize(22),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  With95Row2:{
    marginVertical: normalize(25),
    width: "95%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop:normalize(35)

  },
  With100Row2:{
    marginTop: normalize(8),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  With90Row:{
    marginVertical: normalize(22),
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  With100List:{
    width: "94%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding:normalize(10),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    marginBottom:normalize(10),
    borderRadius:normalize(6)
  },
  With100List2:{
    width: "94%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom:normalize(5),
  },
  With50List:{
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  With100DYBbtn:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  FlexRow:{width:'94%',flexDirection:'row',backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    marginBottom:normalize(10),paddingVertical:normalize(10),borderRadius:normalize(6)},
  FlexRow2:{width:'94%',flexDirection:'row'},
  FlexnoRow:{width:'94%'},
  With80:{width:'80%',alignItems:'center',borderRadius:150/2, margin: 5,},
  DoneTask:{width:'60%',
    paddingVertical:normalize(10),alignItems:'center',borderRadius:normalize(550),
    backgroundColor:'#786b6b'},
  DoneTask2:{width:'70%',
    paddingVertical:normalize(6),alignItems:'center',borderRadius:normalize(550),
    backgroundColor:'#CC0000',marginRight:normalize(7)},
  NotDoneTask: {borderWidth:1,borderColor:'#656464',width:'90%',paddingVertical:normalize(9),alignItems:'center',borderRadius:normalize(550), marginTop: normalize(6)},
  Task_satus:{
    paddingVertical:normalize(5),width:'20%',alignItems:'center',borderRadius:150/2, margin: 5,},
  BorderDash:{
    height:normalize(45),
    borderRightWidth:1.5,
    borderStyle: 'dashed',
    borderRightColor:'rgba(144,144,144,0.56)',
  },
  DoneTaskDetaisl:{width:'5%',
    borderTopRightRadius:normalize(550),
    borderBottomRightRadius:normalize(550)
    ,marginTop: normalize(9),height:normalize(16)},
  DoneTaskDetaislFloat:{paddingHorizontal:normalize(10),
    borderRadius:normalize(6)
    ,paddingVertical:normalize(4),position:'absolute',top:normalize(0),
    zIndex:100,left:normalize(25),alignItems:'center'},
  FilterBox:{
    flexDirection: "row", flexWrap: "wrap",  width: width-SPACING.space_35,marginVertical:normalize(4)
  },
  FilterBoxtask:{
    flexDirection: "row", flexWrap: "wrap",  width: width-SPACING.space_25,marginVertical:normalize(4),justifyContent:"flex-start",
  },
  FilterBoxtaskItems:{
    flexDirection: "row", flexWrap: "wrap",  width: width-SPACING.space_25,marginVertical:normalize(4),
  },
  FilterBoxItems: {
    backgroundColor: "#fff",
    width: width/4.7
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',marginRight:normalize(8),
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(3),
    borderWidth:1,borderColor:GLOBAL.OFFICIAL_BLUE_COLOR
  },

  FilterBoxItemsSelect: {
    backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,
    width: width/4.7
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',marginRight:normalize(8),
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(2)
  },
  FilterBoxItemstask: {
    backgroundColor: "#F4F4FB",
    width: '30.5%'
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',marginRight:normalize(8),
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(3),
    borderWidth:1,borderColor:GLOBAL.OFFICIAL_BLUE_COLOR
  },
  FilterBoxItemsSelecttasl: {
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    width:'23.70%'
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',marginRight:normalize(3),
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(2),

  },
  FilterBoxItemsSelectcategory: {
    backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,
    paddingHorizontal: normalize(10)
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(2),
    marginLeft:2
  },
  HeaderItems:{
    width: '100%',
    paddingVertical:18,

    flexDirection:"row",
    justifyContent:'center',
    alignItems:'center',
  },
  ViewAbsolute:{
    width:'100%',
    position:'absolute',
    backgroundColor:GLOBAL.OFFICIAL_background,top:68,
    paddingVertical:20,
    borderTopRightRadius:20,borderTopLeftRadius:20
  },
  ViewAbsoluteHome:{
    width:'100%',
    position:'absolute',
    backgroundColor:'#fff',top:0,
    paddingVertical:50,
    borderBottomRightRadius:50,borderBottomLeftRadius:50
  },
  ViewAbsoluteDrawer:{
    width:'100%',alignItems:'center',paddingVertical:normalize(14)
  },
  ViewAbsolutedoshboard:{
    width:'100%',
  alignItems:'center',justifyContent:'center',marginTop:normalize(30)
  },
  ViewAbsolute_header:{
    width:'100%',
    position:'absolute',
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,top:68,
    paddingVertical:20,
    borderTopRightRadius:20,borderTopLeftRadius:20
  },
  View_Task:{
    width:'100%',
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    borderBottomRightRadius:22,
    borderBottomLeftRadius:22,
    height:50,
  },
  Circle:{
    width:'10%',
    position:'absolute',
    backgroundColor:'red',bottom:0,left: 0,
    height:70,
    borderRadius:200,
  },
  ImageBtn:{
    width:'20%',

    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    backgroundColor: '#f29a50',
    elevation: 4},
  ImageBtnFeature:{
    width:'10%',
    justifyContent:'center',
    alignItems:'center',
    borderBottomRightRadius:80,
    borderBottomLeftRadius:80,
    elevation:4,
    position:'absolute',
    top:0,left:0
  },
  ProfileForm:{
      width:'100%',
      paddingHorizontal:20,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
  },
  mainSystemDesigner: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    //backgroundColor: 'rgba(33,34,182,0.45)',
    paddingHorizontal:normalize(5) ,
    paddingVertical:normalize(15),
    borderRadius: normalize(6),
    flex:1,marginVertical:normalize(10),zIndex:100
  },
  mainSystemDesignerProfile: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    //backgroundColor: 'rgba(33,34,182,0.45)',
    paddingHorizontal:normalize(5) ,
    paddingVertical:normalize(15),
    borderRadius: normalize(6),
    flex:1,marginVertical:normalize(10),zIndex:100,
    marginBottom:normalize(30)
  },
  bottomView: {
    width: "100%",
     bottom :0,
    position:'absolute',
    zIndex:-11111
  },
  bottomViewFixed:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginTop:normalize(9)
  },
  selectedDateContainerStyle: {
    paddingVertical: '5%',
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GLOBAL.OFFICIAL_backgroundItem,
    borderRadius: normalize(6),
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
  Calender:{
    width:'100%',
    zIndex:1000,
    borderRadius: normalize(6),
    alignItems:'center',
    maxHeight:normalize(250)
  },
  CalenderBox:{backgroundColor:'#f6f9f9',
    paddingVertical:'4%',
    width:'60%',
    alignItems:'center',
    borderRadius:normalize(6),
   position:'absolute',
    zIndex:10000,
    top:normalize(44),
    alignSelf: 'center',
    borderWidth:1,borderColor:GLOBAL.OFFICIAL_BLUE_COLOR

  },
  WeekFilterBox:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:'4%'
  },
  dateBox:{
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'space-between',

  },
  dateBoxitems:{
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'space-between',

    flexDirection:'row',
  },
  GeoBox:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:'2%'
  },
  txtFilter: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(12),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txtFilternumber: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(12),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'GascogneSerialBoldDB',
  },
  txtFilter3: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(13),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  WeekFilterBoxItem:{
    width:'30%',

    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    paddingVertical:normalize(3),
    alignItems:'center',
  } ,

  txtdate: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  txtdate2: {
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontFamily:'OpenSansBold',
  },
  dateBoxItem:{
    width:'48%',
    borderColor: GLOBAL.OFFICIAL_Button,
    borderWidth: 0.5,
    borderRadius: normalize(6),
    paddingVertical:normalize(5),
    alignItems:'flex-start',
    paddingHorizontal: 8,
  } ,
  dateBoxItem1:{
    width:'48%',
    paddingVertical:normalize(5),
    alignItems:'flex-start',
    paddingHorizontal: 8,
  } ,
  dateBoxItemBorder:{
    width:'48%',
    borderRadius: normalize(6),
    alignItems:'flex-start',
    paddingHorizontal: 4,
  } ,
  dateBoxItemtransparent:{
    width:'48%',
    borderRadius:normalize(6),
    paddingVertical:normalize(3),
    alignItems:'flex-start',
  } ,
  GeoBoxItem:{
    width:'30%',

    borderRadius:normalize(6),
    backgroundColor:'#1e233b',
    paddingVertical:normalize(3),
    alignItems:'center',
  },
  TextStyleFullImage:{justifyContent:'space-between',width:'100%',backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    borderBottomLeftRadius:normalize(6),borderBottomRightRadius:normalize(6),paddingVertical:normalize(12) },
  With96: {
    width: '96%',
    paddingVertical: normalize(10), color: '#fff',
  },
  With96_: {
    width: '96%',
    paddingVertical: normalize(10), color: Colors.button,
    fontFamily:'OpenSansBold',
    paddingHorizontal:normalize(8)
  },
  containerloadingpage: {
    flex: 1,
    backgroundColor: '#181b2c'
  },
  EmptyText:{
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize:normalize(16),
    fontWeight:'bold',
    paddingVertical:normalize(8)

  },
  EmptyText2:{
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize:normalize(16),
    fontWeight:'bold',
    paddingVertical:normalize(8)

  },
  Text_actionbtn:{
    color:'#fff',
    fontSize:normalize(14),
    fontWeight:'bold',
    paddingVertical:normalize(4)

  },
  paginationContainer: {
    paddingTop: normalize(10),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
  paginationDot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: 4,
    marginHorizontal: 8
  },
  slider: {
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: normalize(2) // for custom animation
  },
  tasksliderContentContainer: {
    paddingVertical: normalize(12) // for custom animation
  },
  exampleContainer: {
    paddingVertical: 30
  },
  WeekFilterText:{
    color:'#fff',
    fontSize:normalize(14),
    fontFamily:'GascogneSerialBoldDB'
  } ,
  WeekFilterTextMiddel:{
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize:normalize(14),
    fontFamily:'OpenSansBold',
    paddingBottom:normalize(8)
  },
  LocationBox:{
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    paddingVertical:'4%',
    width:'100%',
    alignItems:'center',
    borderRadius:normalize(6),

    alignSelf: 'center',
    flex:1

  },
  InputeRow:{
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    flexWrap: "wrap",
  },
  InputeRowItems:{
    width:'49%',
    alignItems:'flex-start',

  },
  InputeRowLocation:{
    width:'100%',
    justifyContent:'flex-start',
    flexDirection:'row',
    alignItems:'center',
  },
  InputeRowItems2:{
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'center',

  },
  InputeRowItemstask:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderStyle: "dashed",
    borderColor:'rgba(147,147,147,0.71)'
  },
  InputeRowItemstask3:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
  },
  InputeRowItemstask4:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:normalize(45)
  },
  InputeRowItemstask44:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',

  },
  InputeRowItemstask445:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',

  },
  InputeRowItemstask2:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderStyle: "dashed",
    borderColor:'rgba(147,147,147,0.71)'
  },
  InputeRowItemstask23:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    borderTopWidth:1,
    borderStyle: "dashed",
    borderColor:'rgba(147,147,147,0.71)',
    marginBottom:normalize(40),
  },
  InputeRowItemstask235:{
    width:'95%',
    alignItems:'center',
    justifyContent:'center',
    borderTopWidth:1,
    borderStyle: "dashed",
    borderColor:'rgba(147,147,147,0.71)',
    marginBottom:normalize(40),
  },
  formContainer: {
    padding: 10,
    width:'95%'
  },
  formContainertask: {
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyleLocation : {
    borderWidth:0.7,
    borderColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    borderRadius:normalize(6),
    backgroundColor:'#f6f9f9',
    padding:5,
    marginBottom:5,
    width:'100%',
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    marginVertical: normalize(8),
    paddingVertical: 2,

  },

  inputStyletask : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    padding:6,
    width:'100%',
    color:"#fff",
    marginTop: normalize(15),
    paddingVertical: normalize(20),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask3 : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    padding:6,
    width:'100%',
    color:"#fff",
    marginTop: normalize(25),
    paddingVertical: normalize(20),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask5 : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    padding:6,
    width:'100%',
    color:"#fff",
    marginTop: normalize(2),
    paddingVertical: normalize(20),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask55 : {
    borderBottomRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    padding:6,
    width:'100%',
    color:"#fff",
    paddingVertical: normalize(15),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask2 : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    padding:6,
    width:'100%',
    color:"#fff",
    paddingVertical: normalize(16),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask24 : {
    borderRadius:normalize(6),
    padding:6,
    width:'100%',
    color:"#fff",
    paddingVertical: normalize(16),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask23 : {
    borderRadius:normalize(6),
    backgroundColor:'#f89696',
    padding:6,
    width:'100%',
    color:"#fff",
    paddingVertical: normalize(16),
    alignItems:'center',
    justifyContent:'center',
  },
  inputStyletask25 : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    padding:6,
    width:'100%',
    color:"#fff",
    paddingTop: normalize(16),
    alignItems:'center',
    justifyContent:'center',

  },
  inputStyletask26 : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    padding:6,
    width:'100%',
    color:"#fff",
    paddingTop: normalize(16),
    alignItems:'center',
    justifyContent:'center',

  },
  inputStyletask4 : {
    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    padding:6,
    width:'100%',
    color:"#fff",
    paddingVertical: normalize(16),
    alignItems:'center',
    justifyContent:'center',
    marginBottom:normalize(10)
  },
  inputStyleLocationAdd : {
    borderWidth:1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(8),
    paddingVertical: 4,
  },
  inputStyleLocationAdd2 : {
    borderWidth:0.8,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:5,
    marginBottom:5,
    width:'100%',
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    marginVertical: normalize(6),
    paddingVertical: 3,
    fontFamily:'OpenSansBold',
  },
  inputStyleorderDetails : {
    borderWidth:1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:5,
    marginBottom:5,
    width:'100%',
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    paddingVertical: 3,
    fontFamily:'OpenSansBold',
  },
  inputStyleorderDetailsnotes : {
    borderWidth:1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:5,
    marginBottom:15,
    width:'100%',
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    paddingVertical: 3,
    fontFamily:'OpenSansBold',
  },
  inputStyleLocationError : {
    borderWidth:1,
    borderColor:'#FF0D10',
    borderRadius:normalize(6),
    backgroundColor:'#1e233b',
    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(8),
    paddingVertical: 4,


  },
  inputStyleLocationErrorAdd : {
    borderWidth:1,
    borderColor:'#FF0D10',
    borderRadius:normalize(6),

    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(8),
    paddingVertical: 4,


  },
  dropdownLocation: {
    height: normalize(35),
    borderColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    borderWidth:1,
    borderRadius: normalize(6),
    backgroundColor:'#f6f9f9',
    padding:7,
    width: "100%",
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    marginBottom:5,
    paddingVertical: '4%',
  },
  dropdownLocationCustomer: {
    height: normalize(35),
    borderRadius: normalize(6),
    backgroundColor:'#fff',
    padding:8,
    width: "100%",
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    marginBottom:5,
    paddingVertical: '4%',

  },
  dropdownLocationAdd: {
    height: normalize(35),
    borderColor:GLOBAL.OFFICIAL_Button,
    borderWidth:1,
    borderRadius: normalize(6),
    padding:7,
    width: "100%",
    color:"#fff",
    marginBottom:5,
    paddingVertical: '4%',
  },
  dropdownLocationError: {
    height: normalize(35),
    borderColor:'#FF0D10',
    borderWidth:1,
    borderRadius: normalize(6),
    backgroundColor:'#f6f9f9',
    padding:7,
    width: "100%",
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    marginBottom:5,
    paddingVertical: '4%',
  },
  dropdownLocationErrorAdd: {
    height: normalize(35),
    borderColor:'#FF0D10',
    borderWidth:1,
    borderRadius: normalize(6),

    padding:7,
    width: "100%",
    color:"#fff",
    marginBottom:5,
    paddingVertical: '4%',
  },
  ModalLocationStyle:{
    borderRadius: normalize(15),
    backgroundColor:GLOBAL.OFFICIAL_background,
    width:'100%',
    alignItems:'center',
    marginTop:'auto',

    paddingVertical:normalize(15),

  },
  ModalTaskStyle:{
    borderRadius: normalize(15),
    backgroundColor:GLOBAL.OFFICIAL_background,
    width:'100%',
    alignItems:'center',
    marginTop:'auto',

    paddingVertical:normalize(25),

  },
  ModalTaskStyle2:{
    borderRadius: normalize(15),
    backgroundColor:GLOBAL.OFFICIAL_background,
    width:'100%',
    alignItems:'center',
    marginBottom:'auto',

    paddingBottom:normalize(70),

  },
  item_dropdownLocation: {
    padding: normalize(7),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,

  },
  inputSearchStyle_dropdownLocation: {
    fontSize: normalize(14),
    color: '#fff',
    fontWeight:'bold',
  },
  TitleValidate:{
    fontSize: normalize(13),
    textAlign: "left",
    color:'#CC0000',
    fontWeight:'bold',
    paddingTop:normalize(4)
  },
  loaderStyle:{
   width:'100%',
    paddingVertical:normalize(10),
    alignItems:'center',justifyContent:'center'
  },
  formContainer2: {
    width:'100%',
  },
  formContainer23: {
    width:'100%',
    alignItems:'center',justifyContent:'center'
  },
  Horizental_Menu:{
    width:'100%',
    marginBottom:normalize(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:GLOBAL.OFFICIAL_background,
    borderBottomRightRadius:22,
  },
  Horizental_Menu_Box:{
    width:'94%',
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection:'row',flexWrap:"wrap",
    paddingBottom:normalize(20),
  },
  Horizental_Menu_Item:{
    width:'100%',paddingVertical:normalize(2),
    alignItems: "center",
    justifyContent: "center",
    borderRadius:normalize(6),

  },
  Horizental_Menu_Item_notselect:{
    width:'100%',paddingVertical:normalize(2),
    alignItems: "center",
    justifyContent: "center",
    borderRadius:normalize(6),
    borderWidth:2,
    borderColor:'#27405c'
  },
  Horizental_Menu_Item_text:{
    fontSize: normalize(14),
    textAlign: "center",
    color:'#fff',
    fontWeight:'bold',
    paddingVertical:normalize(8)
  },
  RowTask:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'center',
    alignItems:'center'
  },
  RowTask1:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
 RowTaskDate:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'center'
    ,marginTop:normalize(10),
    alignItems:'center'
  },

  RowTask_Items:{
    flexDirection:'row',
    width:'50%',

  },
  TaskImage:{ width: "100%",paddingBottom:normalize(25), alignItems: "center",
  position:'absolute',bottom:normalize(50)
  },
  home:{
    width:'100%',
    height:350,
    backgroundColor:"red"
  },
  BtnStyle:
    {
      width:'90%',flexDirection:"row",
      alignItems:"center",flexWrap:"wrap",
      justifyContent:'space-between',alignSelf:'center',marginBottom:'7%'
    },
  skiptext:{
    fontSize: normalize(13),
    textAlign: "left",
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
  },
  carouselBtnStyle:
    {
      width:'90%',flexDirection:"row",
      alignItems:"center",flexWrap:"wrap",
      justifyContent:'space-between',alignSelf:'center',

    },
  carouselBtnStyle3:
    {
      width:'86%',flexDirection:"row",
      alignItems:"center",flexWrap:"wrap",
      justifyContent:'space-between',alignSelf:'center',marginBottom:'3%'
    },
  carouselStyle:{
    width:'45%',flexDirection:"row",
    alignItems:"center",
    justifyContent:'flex-start',alignSelf:'center',
  },
  carouselStyle1:{
    width:'45%',flexDirection:"row",
    alignItems:"center",
    justifyContent:'flex-end',alignSelf:'center',
  },
    BtnStyle2:
    {
      width:'90%',flexDirection:"row",
      alignItems:"center",flexWrap:"wrap",
      justifyContent:'center',alignSelf:'center',marginBottom:'7%'
    },
  BtnStyle24:
    {
      width:'90%',flexDirection:"row",
      alignItems:"center",flexWrap:"wrap",
      justifyContent:'space-between',alignSelf:'center',marginBottom:'7%'
    },
  inputStyle :{
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width: '100%',
    paddingVertical: 4,
    color: '#fff',
  } ,
  inputStyle_with :{
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_BLUE_COLOR,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width: '100%',
    paddingVertical: 4,
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
  } ,
  inputStyle66 :{
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width: '100%',
    paddingVertical: 4,
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
  },
  infobox:{
    width:'98%',
    alignItems:'center',
    justifyContent:'space-between',

    flexDirection:"row",
  },
  Width30:{
    width:'30%',
  },
  Width70:{width:'70%',},
  FilterText:{
    color: '#4a6e8e',
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center',
    fontFamily:'NexaBold'
  },
  ModalFilterBox:{
    width:'95%',
    flexDirection:"row",
    paddingVertical:normalize(10)
  },
  ModalFilterBoxItems:{
    width:'100%',
    justifyContent:"space-between",
    flexDirection:"row",
    flexWrap: "wrap",
  },
  ModalFilterBoxItemsList:
    {
      width: "30%",
      alignItems: "center",
      backgroundColor:Colors.withe,
      flexDirection:"row",
      paddingVertical:normalize(7),marginBottom:normalize(8),
      borderRadius:normalize(5),

    },
  txt_leftModalFilter:{
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
   fontFamily:'OpenSansBold',

  },
  btntaskModalFilter:
    {
     paddingHorizontal:normalize(10), paddingVertical: normalize(10),
      borderRadius: normalize(6),
      marginHorizontal: normalize(7),

    },
  ItemModalFilter:{
    width:'95%',
    justifyContent:"flex-start",
    flexDirection:"row",
  },
  triangleModalFilter:{
    width:0,
    height:0,
    backgroundColor:"transparent",
    borderStyle:"solid",
    borderLeftWidth:9,
    borderRightWidth:9,
    borderBottomWidth:19,
    borderLeftColor:"transparent",
    borderRightColor:"transparent",
    borderBottomColor:GLOBAL.OFFICIAL_background,
    marginHorizontal: normalize(7),
  },
  dropdownModalFilter: {
    height: normalize(40),
    backgroundColor:Colors.withe,
    borderRadius: normalize(6),
    paddingHorizontal: 8,
    width: "95%",
    marginTop: normalize(4),
    borderWidth:1,borderColor:Colors.button
  },
  placeholderStyleModalFilter: {
    fontSize: normalize(14),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
    backgroundColor:'#fff'
  },
  btnModalFilter:
    {
      width:"33%",paddingVertical:normalize(7),
      borderRadius:normalize(6),

      backgroundColor:Colors.withe
    },
  btnModalFilter1:
    {
      width:"33%",paddingVertical:normalize(7),
      borderRadius:normalize(6),

      backgroundColor:Colors.withe,
      borderWidth:1,
      borderColor:Colors.button
    },
  txt_CenterModalFilter:{
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "center",
    fontFamily:'OpenSansBold',

  },
  containerModalFilter: {
    backgroundColor: Colors.withe,
  },
  textItemModalFilter: {
    flex: 1,
    fontSize: normalize(14),
    color:GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
  },
  itemModalFilter: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.withe,

  },
  selectedTextModalFilter: {
    fontSize: normalize(14),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
  },
  selectedIconModalFilter:{
    position:'absolute',
    right:0,
    bottom:-4
  },
  DoshbordAmonttext:{
    fontSize: normalize(15),
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'OpenSansBold',
    paddingVertical:normalize(25)
  },
  Width60:{
    width:'60%',
    justifyContent:"flex-start",

  },
  Width40:{
    width:'40%',

  },
  QTYList:{
    width:'100%',
    flexDirection:'row'
  },
  QTYBtn:{width:'33%',backgroundColor:GLOBAL.OFFICIAL_BLUE_COLOR,paddingVertical:normalize(2),borderRadius:normalize(6),
  alignItems:'center',justifyContent:'center'
  },
  QTYInpute:{width:'33%',
    paddingVertical: normalize(5),
    color: Colors.button,
    fontFamily:'OpenSansBold',
    borderWidth:0.5,borderColor:'#000',
    borderRadius:normalize(6),alignItems:'center',justifyContent:'center',
    textAlign:'center'
  },
  QTYBtntext:{
    fontSize: normalize(20),
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontFamily:'OpenSansBold',
  },
  QTYInputeText:{
    fontSize: normalize(15),
    color: Colors.button,
    fontFamily:'OpenSansBold',
  },
  Discount:{
    backgroundColor:GLOBAL.OFFICIAL_ORANGE_COLOR,
    width:'13%',
    paddingVertical:normalize(6),
    borderTopLeftRadius:normalize(25),
    borderBottomLeftRadius:normalize(25),
    marginLeft:'auto'
  },
  DiscountText:{
    fontSize: normalize(13),
    color: Colors.button,
    fontFamily:'OpenSansBold',
    textAlign:'center'
  },
  Width50:{
    width:'50%',
  },
  Width25:{
    width:'25%',
  },
  TotalFactor:{
    width:'100%',
    paddingVertical:normalize(12),
    borderRadius:normalize(6),
    flexDirection:'row'
  },
  TotalFactorText:{
    fontSize: normalize(14),
    color: Colors.withe,
    fontFamily:'OpenSansBold',
    textAlign:'left',
    paddingLeft:normalize(20),
    paddingVertical:normalize(5)
  },
  Width30_flex:{
    width:'30%',
    alignItems:'center',justifyContent:'center',
  },
  mainRenderUser: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: GLOBAL.OFFICIAL_BLUE_COLOR,
    borderRadius: 5,
    /* alignItems: 'flex-end',
     justifyContent: 'flex-start',*/
    padding: 20
  },
  txtRenderUser: {
    margin: 2,
    color: '#fff',
    fontSize: normalize(14),
    fontFamily:GLOBAL.FONT_FAMILY,
    paddingVertical:normalize(13)
  },
  dashRenderUser: {
    width: '100%',
    borderTopWidth: 1,
    borderColor:'#fff'
  },
  submitted: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    marginBottom: 5,
    width: '100%',
    padding: 10,
    borderRadius: 5
  },
  txtTitleSubmitted: {

    fontFamily: GLOBAL.FONT_FAMILY,
    textAlign: 'center',
    color: '#fff',
    fontSize: normalize(14),
    lineHeight: 20

  },
  itemSubmitted: {
    //marginHorizontal: 25,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.OFFICIAL_PURPLE_COLOR
  },
  whiteView: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    marginBottom: 2,
    width: '100%',
    padding: 10,
    borderRadius: 5
  },
  whiteView2: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: 2,
    width: '100%',
   paddingVertical:normalize(8),
    borderRadius: 5,

  },
  txtGreenView2: {
    fontFamily: GLOBAL.FONT_FAMILY,
    textAlign: 'center',
    color: '#000',
    fontSize: normalize(14),
    lineHeight: 15,paddingHorizontal:2,paddingVertical:3
  },
  background:{
    width:'100%'
  },
  Width47:{
    width:'48%',

  },
  map:{
   flex:1,
    width:'100%',
    height:460,marginTop:normalize(10)
  },
  imageProfile: {
    borderWidth: 2,
    borderColor: GLOBAL.OFFICIAL_BLUE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  imageProfileDrawer: {
    borderWidth: 2,
    borderColor: GLOBAL.OFFICIAL_BLUE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: 95,
    height: 95,
    // marginTop: normalize(15)
  },
  btnSelectImage: {
    width: '100%',
   paddingVertical:normalize(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
    /* marginVertical: 10,*/

  },


});
export { Styles };
