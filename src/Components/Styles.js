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
  txt: {
    color: "#fff",
    fontSize: normalize(15),
    fontWeight:'bold'
  },
  txt_center_login: {
    color: "#fff",
    fontSize: normalize(15),
    fontWeight:'bold',
    textAlign:'center'
  },
  txtMenuHome: {
    fontSize: normalize(15),
    textAlign: "left",
    color: '#fff',
    paddingBottom: 15,
    fontWeight:'bold'
  },
  txt_left:{
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontWeight:'bold'
  },
  txt_Left_padding_horizontal: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
    fontWeight:'bold',
    paddingHorizontal:normalize(8)
  },
  Filter_txt: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(12),
    marginVertical: 5,
    textAlign: "left",
  },
  txt_left_Padding_bottom: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    marginTop: normalize(5),
    textAlign: "left",
    fontWeight:'bold'
  },
  txt_left_small: {
    color:'#fff',
    fontSize: normalize(12),
    marginBottom: 3,
    textAlign: "left",

  },
  txt_left_small_padding_top: {
    color:'#fff',
    fontSize: normalize(12),
    textAlign: "left",
    fontWeight:'bold',
    paddingTop: normalize(8)

  },
  txtCenter: {
    color: GLOBAL.OFFICIAL_background,
    fontSize: normalize(14),
    margin: 5,
    textAlign: "left",
    fontWeight:'bold'
  },
  txtCenter_filter: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    margin: 5,
    textAlign: "left",
    fontWeight:'bold'
  },
  txt_leftDropdown: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
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
    fontWeight:'bold',
    paddingHorizontal:normalize(8)
  },
  txtcenter: {
    color: "#fff",
    fontSize:normalize(14),textAlign:"center",
    fontWeight:'bold'
  },
  txtRight: {
    color: "#fff",
    fontSize: normalize(14),
    margin: 5,
    textAlign: "right",
  },
  txtLightColor: {
    color: "#fff",
    fontSize: normalize(14),
    margin: 7,
    fontWeight:'bold'
  },
  txtLightColor_Left: {
    color: "#fff",
    fontSize: normalize(14),
    margin: 7,
    fontWeight:'bold',
    textAlign:'left'
  },
  txtLightColor_samall: {
    color:GLOBAL.OFFICIAL_ORANGE_COLOR,
    fontSize: normalize(12),
    margin: 7,
    fontWeight:'bold',

  },
  txtLightColorLocation: {
    color: "#fff",
    fontSize: normalize(13),
    textAlign:"left",
    paddingVertical:normalize(9)
  },
  txtGrayColor: {
    color: GLOBAL.OFFICIAL_Button,
    fontSize: normalize(14),
    margin: 7,
    fontWeight:'bold'
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
    color: "#fff",
    fontSize: normalize(14),
    margin: 7,
    marginTop:normalize(10),textAlign:"center",
    paddingVertical:normalize(5)
  },
  txtFeature: {
    fontSize: normalize(14),
    marginTop:normalize(10),
    color: "#fff",
    marginVertical:normalize(6),
    textAlign:"center",
    marginLeft:normalize(10),
    fontWeight:'bold'
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
    fontWeight:'bold'

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
    width: '40%', height: normalize(80),
  },

  Icon: {
    width: normalize(40), height: normalize(40),
  },
  HeaderBackColor: {
    backgroundColor: GLOBAL.OFFICIAL_background,
  },
  Backcolor: {
    backgroundColor: GLOBAL.OFFICIAL_background,
  },
  HeaderText2:{
    fontWeight: "bold", color: '#fff',
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center'
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
    fontSize: normalize(12),
    paddingTop: 3,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    justifyContent: "center",
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
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: normalize(58),
    position: "absolute",
    bottom: normalize(55),
    right: normalize(16),
    height: normalize(58),
    backgroundColor: GLOBAL.OFFICIAL_Buttondark,
    borderRadius: 100,
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
  Flexrow: {
    flexDirection: "row",  margin: normalize(4), justifyContent: "space-between", width: "90%",
  },

  MenuText: {
    fontWeight: "bold", color: Colors.withe,
    fontSize: normalize(20), paddingVertical: 6,
    textAlign: "center",
  },
  Menu: {
    width: '100%',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundTab,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ModuleBox: {
    width: width/2.3, backgroundColor: "#F4F4FB"
    , marginBottom: "5%", borderRadius: normalize(15),
  },
  FooterFloatBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e233b",
    width: Platform.OS === "ios" ? 50 : 60,
    height: Platform.OS === "ios" ? 50 : 60,
    top: Platform.OS === "ios" ? -10 : -15,
    borderRadius: Platform.OS === "ios" ? 25 : 30,
  },
  FooterTab: {
    backgroundColor: GLOBAL.OFFICIAL_background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    borderTopWidth: 0.2,
    borderTopColor: "rgba(255,255,255,0.18)",
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

    backgroundColor: "rgba(0,0,0,0.47)",

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
  FeatureDetailUploadTitebox: {
    width: "44%", paddingVertical: normalize(10), borderRadius: normalize(6),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: GLOBAL.OFFICIAL_Button, justifyContent: "center", alignItems: "center", marginTop: normalize(30),
  },
  UploadImageText: { fontSize: normalize(14), color: "#fff", fontFamily: GLOBAL.FONT_FAMILY, paddingBottom: 8 },
  UploadNotesText: { fontSize: normalize(14), color: "#fff", fontFamily: GLOBAL.FONT_FAMILY,},
  ModalizeDetalStyle: {
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flex: 0.3,
    width: "100%",
    alignSelf: "center",
    backgroundColor: GLOBAL.OFFICIAL_background,
  },
  BtnBox: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: normalize(12),
  },
  UploadBtn: {
    width: "80%", backgroundColor: "rgb(42,48,82)"
    , marginTop: "6%", borderRadius: normalize(5),
    paddingVertical: 9, flexDirection: "row", justifyContent: "center",
  },
  TextUploadBtn: {
    color: "#fff",
    fontSize: normalize(14),
    textAlign: "center",
    paddingLeft: normalize(10),
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
    color: "#fff",
  },
  containerStyle: {
    backgroundColor: "#1e233b",
  },
  itemTextStyle: {
    fontSize: normalize(14),
    color: "#fff",
  },
  selectedTextStyle: {
    fontSize: normalize(14),
    color: "#fff",
  },
  renderItemStyle:{flexDirection:'row',alignItems:'center',paddingVertical:normalize(5)},
  renderItemDetailStyle:{flexDirection:'row',alignItems:'center',paddingVertical:normalize(7)},

  renderItemDetailStyle2:{width:'100%',backgroundColor:GLOBAL.OFFICIAL_backgroundItem,marginBottom:'4%'
    ,alignItems:"center",height:normalize(69),borderRadius:normalize(6),paddingVertical:8},

  iconStyle: {
    width: 20,
    height: 20,
  },
  DeleteModalStyle:{ backgroundColor:GLOBAL.OFFICIAL_backgroundItem, paddingVertical:normalize(5),
    alignItems: "center", borderRadius: 10,justifyContent:"center",marginTop:'20%' },
  DeleteModalStyle2:{backgroundColor:GLOBAL.OFFICIAL_backgroundItem_Lighter, paddingVertical:normalize(5),
    alignItems: "center",justifyContent:"center", borderWidth:1,
    borderRadius: normalize(10), borderColor:GLOBAL.OFFICIAL_Button,width:'90%',},
  warningModalStyle2:{backgroundColor:'rgb(250,186,46)', paddingVertical:normalize(5),
    alignItems: "center",justifyContent:"center", borderWidth:1,
    borderRadius: normalize(10), borderColor:GLOBAL.OFFICIAL_Button,width:'90%',},
  DeleteModalTotalStyle:{
    alignItems: "center",justifyContent:"center",marginTop:'40%',
    borderRadius: normalize(10), width:'100%',},
  LocationModalStyle:{ backgroundColor:GLOBAL.OFFICIAL_background, paddingVertical:normalize(30),
    alignItems: "center", borderRadius: 10,justifyContent:"center",marginTop:'auto' },
  inputSearchStyle: {
    height: normalize(40),
    fontSize: normalize(14),
    backgroundColor: "#1e233b",
    color: "#fff",
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e233b",

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
  },
  textItem_status: {
    flex: 1,
    fontSize: normalize(12),
    color: "#fff",
  },
  selectedTextStyle2: {
    fontSize: normalize(14),
    color: "#fff",
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
    marginTop: normalize(7),},
  btnList:
    {
      backgroundColor: "#7953FAFF", filter: "blur(15)", width: "37%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btnList1:
    {
      backgroundColor: "#4B75FCFF", filter: "blur(15)", width: "37%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },

  btnList2:
    {
      backgroundColor: "rgb(55,167,239)", filter: "blur(15)", width: "37%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
      marginRight: normalize(7),

    },
  btnListDelete:
    {
    width: "20%", paddingVertical: normalize(5),
      borderRadius: normalize(6),
      marginHorizontal: normalize(20),

    },
  btnList3:
    {
      backgroundColor: "rgb(55,167,239)", filter: "blur(15)", width: "35%", paddingVertical: normalize(5),
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
    color:"#fff",
  },
  inputStyleTask: {
    borderWidth:0.5,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:4,
    width:'100%',
    color:"#fff",
  },
  inputFeatureNote: {
    borderWidth:1,
    borderColor:'#1e233b',
    borderRadius:normalize(6),
    backgroundColor:'#1e233b',
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
    margin:normalize(20),justifyContent:'space-between',
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
  HeaderText:{
    fontWeight: "bold", color: Colors.withe,
    fontSize: normalize(20), paddingVertical: 6,
    textAlign:'center'
  },
  CancelBtn:{ width: "100%" ,justifyContent:'center',marginTop:15,alignItems:'center'},
  CancelBtnLeft:{ width: "100%" ,justifyContent:'flex-start',marginTop:15,alignItems:'center'},
  CancelBtnLeftAlign:{ width: "90%" ,justifyContent:'flex-start',marginTop:15,},
  CancelBtnLeftAlign2:{ width: "90%" ,justifyContent:'flex-start',zIndex:0},
  CancelBtnLeftAlign3:{ width: "90%" ,justifyContent:'flex-start',
    backgroundColor:GLOBAL.OFFICIAL_background,position:'absolute', top:normalize( 46),zIndex:10,paddingVertical: normalize(18),},
  CancelBtnLeftAlignwarn:{ width: "20%" ,alignItems:'flex-start',marginLeft:normalize(10)},
  CancelBtnMargin0:{ width: "90%" ,justifyContent:'flex-start',},
  AlertTxt:{
    color: "white",
    fontFamily: GLOBAL.FONT_FAMILY_BOLD,
    textAlign:'center',

  },
  AddedtTxt:{
    color: "white",
    fontFamily: GLOBAL.FONT_FAMILY_BOLD,
    textAlign:'center',
    lineHeight:normalize(25),
    fontWeight:'bold'
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
  ItemDetailBox:{width:width-SPACING?.space_25,backgroundColor:GLOBAL.OFFICIAL_backgroundItem,marginBottom:'4%'
    ,borderRadius:normalize(6),alignItems:"center",paddingVertical:9,flex:1},
  ItemDetailBox2:{width:width-SPACING?.space_25,backgroundColor:GLOBAL.OFFICIAL_backgroundItem,marginBottom:'4%'
    ,alignItems:"center",height:normalize(69),borderRadius:normalize(6),paddingVertical:8},
  ItemDetailBox1:{width:'100%',backgroundColor:'rgba(42,48,82,0.82)',
    alignItems:"center",flex:1,borderRadius:normalize(6),position:'absolute',height:normalize(69)},
  ItemDetailFeatureBox:{backgroundColor:GLOBAL.OFFICIAL_backgroundItem
   ,alignItems:"center",paddingVertical:normalize(7),
     width:'100%',
    marginTop: normalize(15),
    borderRadius: normalize(6),
  },
  With90:{width:'90%',flexDirection:'row'},
  With65:{width:'65%'},
  With35:{width:'35%'},
  With90_zIndex:{width:'90%',flexDirection:'row',zIndex:-1},
  With90Center:{width:'90%',alignItems:'center'},
  With90Center_Margin:{width:'90%',alignItems:'center',marginBottom:normalize(20)},
  With90CenterVertical:{width:'90%',alignItems:'center',justifyContent:'center',marginTop:normalize(90)},
  Items:{width:'100%',flexDirection:'row',alignItems:'center',marginTop:4},
  DropDownFull:{backgroundColor:GLOBAL.OFFICIAL_background,width:'100%',borderBottomWidth:1,borderRadius:normalize(6),borderColor:GLOBAL.OFFICIAL_BLUE_COLOR},
  DropDown:{backgroundColor:GLOBAL.OFFICIAL_background,borderBottomWidth:1,borderRadius:normalize(6),borderColor:GLOBAL.OFFICIAL_BLUE_COLOR},
  DropDownIcon:{width:'100%',paddingVertical:4,alignItems:"flex-end" },
  DropDownIconFull:{width:'100%',paddingVertical:4,alignItems:"flex-start", },
  ModalStyle:{
    borderRadius: normalize(15),
    backgroundColor:GLOBAL.OFFICIAL_background,
    width:'100%',
    alignItems:'center',
    marginTop:'auto',

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
  Center:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center'
  },
  Center_margin_Bottom:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(65),
  },
  Center_margin_Bottom2:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(20),
  },
  Center_margin_Bottom_details:{margin:normalize(10),justifyContent:'space-between', width: '93%',alignItems:'center',
    marginBottom: normalize(38),
  },
  DYB:{width:'100%',flexDirection:'row',alignItems:'center',flexWrap:'wrap',marginTop:normalize(7)},
  AddTextStyleFullImageFeature:{justifyContent:'space-between',width:'100%',backgroundColor:"rgb(42,48,82)",
    borderBottomLeftRadius:normalize(6) ,borderBottomRightRadius:normalize(6)},
  AddTextStyle:{justifyContent:'center',width:'100%',backgroundColor:"rgb(42,48,82)", borderBottomLeftRadius:normalize(6),borderBottomRightRadius:normalize(6) },
  AddTextStyleFullImage:{justifyContent:'space-between',width:'100%',backgroundColor:"rgb(42,48,82)",
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
  TaskBox:{marginTop:normalize(50),justifyContent:'space-between', width: '94%',alignItems:'center'
  },
  With100:{width:'100%'
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
  With100Row:{
    marginVertical: normalize(22),
    width: "100%",
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
    backgroundColor:GLOBAL.OFFICIAL_background,
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
  FlexRow:{width:'100%',flexDirection:'row'},
  With80:{width:'80%',alignItems:'center',borderRadius:150/2, margin: 5,},
  DoneTask:{backgroundColor:'#786b6b',borderWidth:1,
    paddingVertical:normalize(5),borderColor:'#382e2e'},
  NotDoneTask: {borderWidth:1,borderColor:'#656464',paddingVertical:normalize(12),},
  Task_satus:{
    paddingVertical:normalize(5),width:'20%',alignItems:'center',borderRadius:150/2, margin: 5,},
  BorderDash:{
    height:normalize(60),
    borderRightWidth:2,
    borderStyle: 'dashed',
    borderRightColor:'#656464',
  },
  FilterBox:{
    flexDirection: "row", flexWrap: "wrap",  width: width-SPACING.space_35,marginVertical:normalize(4)
  },
  FilterBoxItems: {
    backgroundColor: "#F4F4FB",
    width: width/4.7
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',marginRight:normalize(8),
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(3)
  },
  FilterBoxItemsSelect: {
    backgroundColor: 'rgb(42,48,82)',
    width: width/4.7
    , marginTop: "2%", borderRadius: normalize(5),
    alignItems:'center',marginRight:normalize(8),
    flexDirection:'row',
    paddingLeft:normalize(6),
    paddingVertical:normalize(2)
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
  },
  CalenderBox:{backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    paddingVertical:'4%',
    width:'60%',
    alignItems:'center',
    borderRadius:normalize(6),
   position:'absolute',
    zIndex:10000,
    top:normalize(44),
    alignSelf: 'center',

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
  },
  WeekFilterBoxItem:{
    width:'30%',

    borderRadius:normalize(6),
    backgroundColor:GLOBAL.OFFICIAL_backgroundItem,
    paddingVertical:normalize(3),
    alignItems:'center',
  } ,

  txtdate: {
    color: GLOBAL.OFFICIAL_WITE_COLOR,
    fontSize: normalize(14),
    marginVertical: 5,
    textAlign: "left",
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
  TextStyleFullImage:{justifyContent:'space-between',width:'100%',backgroundColor:"rgb(42,48,82)",
    borderBottomLeftRadius:normalize(6),borderBottomRightRadius:normalize(6),paddingVertical:normalize(12) },
  With96: {
    width: '96%',
    paddingVertical: normalize(10), color: '#fff',
  },
  With96_: {
    width: '96%',
    paddingVertical: normalize(10), color: '#fff',
    fontWeight:'bold',
    paddingHorizontal:normalize(8)
  },
  containerloadingpage: {
    flex: 1,
    backgroundColor: '#181b2c'
  },
  EmptyText:{
    color:'#fff',
    fontSize:normalize(16),
    fontWeight:'bold',
    paddingVertical:normalize(8)

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
  exampleContainer: {
    paddingVertical: 30
  },
  WeekFilterText:{
    color:'#fff',
    fontSize:normalize(14),
    fontWeight:'bold',
  } ,
  WeekFilterTextMiddel:{
    color:'#fff',
    fontSize:normalize(11),
    fontWeight:'bold',
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
  formContainer: {
    padding: 10,
    width:'95%'
  },
  inputStyleLocation : {
    borderWidth:1,
    borderColor:'#1e233b',
    borderRadius:normalize(6),
    backgroundColor:'#1e233b',
    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(8),
    paddingVertical: 4,

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
    borderWidth:1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius:normalize(6),
    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(6),
    paddingVertical: 3,
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
    borderColor:'#1e233b',
    borderWidth:1,
    borderRadius: normalize(6),
    backgroundColor:'#1e233b',
    padding:7,
    width: "100%",
    color:"#fff",
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
    backgroundColor:'#1e233b',
    padding:7,
    width: "100%",
    color:"#fff",
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
  item_dropdownLocation: {
    padding: normalize(7),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e233b",

  },
  inputSearchStyle_dropdownLocation: {
    fontSize: normalize(14),
    color: "#fff",
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
  }
});
export { Styles };
