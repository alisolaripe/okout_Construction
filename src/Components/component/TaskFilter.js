import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize/src/index";
import React, { useEffect, useState } from "react";
const GLOBAL = require("../Global");
function TaskFilter({ DateItems,setDateItems,Status,setStatus,Priority,setPriority,FilterList,setFilterList
                    }) {

  const [SelectItem,setSelectItem]=useState(4);

  const FilterFunc1 = (id) => {
    if(id===0){

      setDateItems(!DateItems)
      setPriority(false)
      setStatus(false)
    }
    else   if(id===1){
      setStatus(!Status)
      setDateItems(false)
    }
    else   if(id===2){
      setPriority(!Priority)
      setDateItems(false)
      setStatus(false)
    }
  };
  return(
    <>
      <View style={Styles.FilterBoxtask}>
        {FilterList.map((value, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {
              setSelectItem(value.id);
              FilterFunc1(value.id);
              console.log(SelectItem, "SelectItem");
            }} style={[SelectItem === value.id ? Styles.FilterBoxItemsSelecttasl : Styles.FilterBoxItemstask]}>
              <MaterialCommunityIcons name={value.Icon} size={20}
                                      color={SelectItem === value.id ? GLOBAL.OFFICIAL_WITE_COLOR : GLOBAL.OFFICIAL_background} />
              <Text style={[SelectItem === value.id ? [Styles.txtCenter_filter] : Styles.txtCenter]}>
                {value.Filtername}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </>

)

}
export { TaskFilter };
