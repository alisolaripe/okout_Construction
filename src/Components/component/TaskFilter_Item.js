import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize/src/index";
import React, { useState } from "react";
const GLOBAL = require("../Global");
function TaskFilter_Item({ FilterFunc, setShowDateRange,ShowFilter,FilterTimeList }) {
  const [SelectItem,setSelectItem]= useState(0);

  return(

    <View style={Styles.FilterBoxtask}>
      { ShowFilter===true?
        FilterTimeList.map((value,index) => {
          return (
            <TouchableOpacity key={index} onPress={()=> {
              setSelectItem(value.value);
              FilterFunc(value?.value,value.label);
              setShowDateRange(false)
            }}
             style={[SelectItem===value.value?Styles.FilterBoxItemsSelect:Styles.FilterBoxItems]}>
              {value.Icon==='status'?<View style={[Styles.btntask1,{backgroundColor:value.statusColorCode}]}/>:
              value.Icon==='prioriti'?<View style={[Styles.triangle1,{borderBottomColor:value.taskPriorityColor}]} />:
              <MaterialCommunityIcons name={value.Icon} size={20} color={SelectItem===value.value?GLOBAL.OFFICIAL_WITE_COLOR:GLOBAL.OFFICIAL_background}  />
              }
              <Text style={[SelectItem===value.value?[Styles.txtCenter_filter]:Styles.txtCenter]}>
                {value.label}
              </Text>
            </TouchableOpacity>
          )}):null}
    </View>
  )
}
export { TaskFilter_Item };
