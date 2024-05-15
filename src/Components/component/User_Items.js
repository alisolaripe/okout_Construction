import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize/src/index";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import { ButtonI } from "./ButtonI";
const GLOBAL = require("../Global");
function User_Items({ key, item,ShowFilter,setShowFilter }) {
  const [isSelectedCoordinator, setSelectionCoordinator] = useState(false);
  const [isSelectedCoordinatorno, setSelectionCoordinatorno] = useState(false);
  const [isSelectedCreate, setSelectedCreate] = useState(false);
  const [isSelectedCreateno, setSelectedCreateno] = useState(false);

  const [isSelectedApproved, setSelectedApproved] = useState(false);
  const [isSelectedApprovedno, setSelectedApprovedno] = useState(false);
  const [isSelectedVersions, setSelectedVersions] = useState(false);
  const [isSelectedVersionsno, setSelectedVersionsno] = useState(false);
  const [isSelecteddraftversion, setSelecteddraftversion] = useState(false);
  const [isSelecteddraftversionno, setSelecteddraftversionno] = useState(false);
  const [isSelectedDocument, setSelectedDocument] = useState(false);
  const [isSelectedDocumentno, setSelectedDocumentno] = useState(false);
  const [isSelectedDocumentComments, setSelectedDocumentComments] = useState(false);
  const [isSelectedDocumentCommentsno, setSelectedDocumentCommentsno] = useState(false);
  const [isSelectedDelete, setSelectedDelete] = useState(false);
  const [isSelectedDeleteno, setSelectedDeleteno] = useState(false);
  const [isSelectedSignature, setSelectedSignature] = useState(false);
  const [isSelectedSignatureno, setSelectedSignatureno] = useState(false);
  const [isSelectedSubDirectory, setSelectedSubDirectory] = useState(false);
  const [isSelectedSubDirectoryno, setSelectedSubDirectoryno] = useState(false);
  const [isSelectedDirectory, setSelectedDirectory] = useState(false);
  const [isSelectedDirectoryno, setSelectedDirectoryno] = useState(false);
  const [isSelectedDirectoryComments, setSelectedDirectoryComments] = useState(false);
  const [isSelectedDirectoryCommentsno, setSelectedDirectoryCommentsno] = useState(false);

  const handleSubmit=()=>{

  }
  return(
      <View key={key} style={Styles.ButtonCarouselviewdoc1}>
        <View style={[Styles.docDetaislFloat]}>
          <Text numberOfLines={3} style={Styles.txtDarkColor}>{item?.Username}</Text>
        </View>
        <View style={[Styles.InputeRowItemsdoc24]}>
          <View style={[Styles.inputStyledoc]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Coordinator
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectionCoordinator(!isSelectedCoordinator)
                    setSelectionCoordinatorno(false)
                  }}
                  isChecked={isSelectedCoordinator}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectionCoordinatorno(!isSelectedCoordinatorno)
                    setSelectionCoordinator(false)
                  }}
                  isChecked={isSelectedCoordinatorno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Create
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedCreate(!isSelectedCreate)
                    setSelectedCreateno(false)
                  }}
                  isChecked={isSelectedCreate}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedCreateno(!isSelectedCreateno)
                    setSelectedCreate(false)
                  }}
                  isChecked={isSelectedCreateno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Read Approved
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedApproved(!isSelectedApproved)
                    setSelectedApprovedno(false)

                  }}
                  isChecked={isSelectedApproved}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedApprovedno(!isSelectedApprovedno)
                    setSelectedApproved(false)
                  }}
                  isChecked={isSelectedApprovedno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Read Older Versions
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedVersions(!isSelectedVersions)
                    setSelectedVersionsno(false)
                  }}
                  isChecked={isSelectedVersions}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedVersionsno(!isSelectedVersionsno)
                    setSelectedVersions(false)
                  }}
                  isChecked={isSelectedVersionsno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Read draft version
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelecteddraftversion(!isSelecteddraftversion)
                    setSelecteddraftversionno(false)
                  }}
                  isChecked={isSelecteddraftversion}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelecteddraftversionno(!isSelecteddraftversionno)
                    setSelecteddraftversion(false)
                  }}
                  isChecked={isSelecteddraftversionno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Comment on Document
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDocument(!isSelectedDocument)
                    setSelectedDocumentno(false)
                  }}
                  isChecked={isSelectedDocument}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDocumentno(!isSelectedDocumentno)
                    setSelectedDocument(false)
                  }}
                  isChecked={isSelectedDocumentno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Read Document Comments
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDocumentComments(!isSelectedDocumentComments)
                    setSelectedDocumentCommentsno(false)
                  }}
                  isChecked={isSelectedDocumentComments}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDocumentCommentsno(!isSelectedDocumentCommentsno)
                    setSelectedDocumentComments(false)
                  }}
                  isChecked={isSelectedDocumentCommentsno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Delete
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDelete(!isSelectedDelete)
                    setSelectedDeleteno(false)
                  }}
                  isChecked={isSelectedDelete}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDeleteno(!isSelectedDeleteno)
                    setSelectedDelete(false)
                  }}
                  isChecked={isSelectedDeleteno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Send Signature
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>

                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedSignature(!isSelectedSignature)
                    setSelectedSignatureno(false)
                  }}
                  isChecked={isSelectedSignature}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedSignatureno(!isSelectedSignatureno)
                    setSelectedSignature(false)
                  }}
                  isChecked={isSelectedSignatureno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Create Sub-Directory
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedSubDirectory(!isSelectedSubDirectory)
                    setSelectedSubDirectoryno(false)
                  }}
                  isChecked={isSelectedSubDirectory}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedSubDirectoryno(!isSelectedSubDirectoryno)
                    setSelectedSubDirectory(false)
                  }}
                  isChecked={isSelectedSubDirectoryno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Comment on Directory
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDirectory(!isSelectedDirectory)
                    setSelectedDirectoryno(false)
                  }}
                  isChecked={isSelectedDirectory}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDirectoryno(!isSelectedDirectoryno)
                    setSelectedDirectory(false)
                  }}
                  isChecked={isSelectedDirectoryno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.InputeRowItemsdoc244]}>
          <View style={[Styles.inputStyledocew]}>
            <View style={Styles.RowTask3}>
              <View style={Styles.RowTask_Items}>
                <Text numberOfLines={10} style={[Styles.txtLightColortask_Items55]}>Read Directory Comments
                </Text>
              </View>
              <View style={Styles.RowTask_Items}>
                {/*<CheckBox*/}
                {/*  value={isSelected}*/}
                {/*  onValueChange={setSelection}*/}
                {/*/>*/}
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDirectoryComments(!isSelectedDirectoryComments)
                    setSelectedDirectoryCommentsno(false)
                  }}
                  isChecked={isSelectedDirectoryComments}
                  leftText={"Yes"}
                />
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={()=>{
                    setSelectedDirectoryCommentsno(!isSelectedDirectoryCommentsno)
                    setSelectedDirectoryComments(false)
                  }}
                  isChecked={isSelectedDirectoryCommentsno}
                  leftText={"No"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[Styles.ViewItems_center_task]}>
          <ButtonI style={[Styles.btn, {
            //margin:normalize(15),
            flexDirection: "row",
            width:'35%',
            paddingVertical: 2,
            marginVertical: normalize(8),
          }]}//handleSubmit
                   onpress={handleSubmit}
                   categoriIcon={""}
                   title={'Submit'}
                   colorsArray={['#a39898','#786b6b','#382e2e']}
                   styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
        </View>
      </View>

  )

}
export { User_Items };
