import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize/src/index";
import React, { useState } from "react";
const GLOBAL = require("../Global");
function TaskFilter({ FilterFunc,Filtertype,setFiltertype,setFilterName }) {
  const [FilterList,setFilterList]=useState([{id:0,Filtername:'Time',Icon:'calendar-month'},{id:1,Filtername:'Status',Icon:'checkbox-marked-circle-outline'},{id:2,Filtername:'Priority',Icon:'podium'}]);
  const [SelectItem,setSelectItem]=useState(0);

  return(
  <View style={Styles.FilterBoxtask}>
    { Filtertype===true?
      FilterList.map((value,index) => {
        return (
          <TouchableOpacity key={index} onPress={()=> {
            setSelectItem(value.id);
            FilterFunc(value.id);
            console.log(SelectItem,'SelectItem')
          }} style={[SelectItem===value.id?Styles.FilterBoxItemsSelect:Styles.FilterBoxItems]}>
            <MaterialCommunityIcons name={value.Icon} size={20} color={SelectItem===value.id?GLOBAL.OFFICIAL_WITE_COLOR:GLOBAL.OFFICIAL_background}  />
            <Text style={[SelectItem===value.id?[Styles.txtCenter_filter]:Styles.txtCenter]}>
              {value.Filtername}
            </Text>
          </TouchableOpacity>
        )}):null}

    <TouchableOpacity onPress={()=> {
      setFiltertype(!Filtertype);
      FilterFunc(0);
      setSelectItem(0)
      setFilterName(5)
    }}  style={[Styles.FilterBoxItems,{marginLeft:'auto',marginRight:normalize(0),backgroundColor:'rgb(42,48,82)'}]}>
      <MaterialCommunityIcons name={'filter'} size={17} color={GLOBAL.OFFICIAL_WITE_COLOR}  />
      <Text style={[Styles.txtCenter_filter]}>
        Sort By
      </Text>
    </TouchableOpacity>
  </View>


)

}
export { TaskFilter };
