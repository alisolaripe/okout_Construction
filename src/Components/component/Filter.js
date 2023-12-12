import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize/src/index";
import React, { useState } from "react";
const GLOBAL = require("../Global");
function Filter({ FilterFunc, setShowDateRange,ShowFilter,setShowFilter }) {
  const [FilterList, setFilterList] = useState([{id:0,Filtername:'All',Icon:'calendar-month'},{id:1,Filtername:'Week',Icon:'calendar-week'},{id:2,Filtername:'Day',Icon:'calendar-today'}]);
  const [SelectItem,setSelectItem]= useState(0);

  return(

  <View style={Styles.FilterBox}>
    { ShowFilter===true?
      FilterList.map((value,index) => {
        return (
          <TouchableOpacity key={index} onPress={()=> {
            setSelectItem(value.id);
            FilterFunc(value.id);
            setShowDateRange(false)
          }} style={[SelectItem===value.id?Styles.FilterBoxItemsSelect:Styles.FilterBoxItems]}>
            <MaterialCommunityIcons name={value.Icon} size={20} color={SelectItem===value.id?GLOBAL.OFFICIAL_WITE_COLOR:GLOBAL.OFFICIAL_background}  />
            <Text style={[SelectItem===value.id?[Styles.txtCenter_filter]:Styles.txtCenter]}>
              {value.Filtername}
            </Text>
          </TouchableOpacity>
        )}):null}

    <TouchableOpacity onPress={()=> {
      setShowFilter(!ShowFilter);
      setShowDateRange(false);
      FilterFunc(0);
      setSelectItem(0)
    }}  style={[Styles.FilterBoxItems,{marginLeft:'auto',marginRight:normalize(0),backgroundColor:'rgb(42,48,82)'}]}>
      <MaterialCommunityIcons name={'filter'} size={17} color={GLOBAL.OFFICIAL_WITE_COLOR}  />
      <Text style={[Styles.txtCenter_filter]}>
        Sort By
      </Text>
    </TouchableOpacity>
  </View>


)

}
export { Filter };
