import {Text,View} from "react-native";
import {Styles} from "../Styles";
import normalize from "react-native-normalize/src/index";
import React, {useEffect,useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
const GLOBAL = require("../Global");
function Taskdropdown({ DateItems,setDateItems,Status,setStatus,Priority,setPriority,FilterList,setFilterList}) {
  const [SelectItem,setSelectItem]=useState(4);
  const [isFocusrelated, setIsFocusrelated] = useState(false);
  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === value && (
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
  return(
    <>
      <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Site</Text>
      <Dropdown
        style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
        placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
        selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
        iconStyle={Styles.iconStyle}
        itemTextStyle={Styles.itemTextStyle}
        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
        data={SiteList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusrelated ? 'Select Site' : '...'}
        searchPlaceholder="Search..."
        value={selectedTaskSiteName}

        renderItem={renderItem}
        onFocus={() => setIsFocusrelated(true)}
        onBlur={() => setIsFocusrelated(false)}
        onChange={item=> {
          console.log(item,'item')
          // GLOBAL.SiteId=item.value;
          // writeDataStorage(GLOBAL.siteId_Last_Info,item.value)
          // if(RelatedNameLvalue==='Site') {
          //   setselectedTaskSiteName(item);
          //   setRelatedId(item.value)
          //   writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
          // }
          // else {
          //   const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='3')?.value
          //   getUnits(categoryId,item.value);
          //   setselectedTaskSiteName(item);
          //   setTaskSiteId(item.value)
          // }
        }}
      />

    </>
  )
}
export { Taskdropdown };
