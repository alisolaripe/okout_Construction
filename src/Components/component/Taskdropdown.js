import {Text,View} from "react-native";
import {Styles} from "../Styles";
import normalize from "react-native-normalize/src/index";
import React, {useEffect,useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
const GLOBAL = require("../Global");
function Taskdropdown({value,getLists,SubCategory_List,setRelatedId,setEntityIdList,entityIdList,textStyle,dropdownStyle,placeholderStyle,
                        selectedTextStyle,containerStyle,setRelatedName
                      }) {
  const [selectedTaskName,setselectedTaskName]=useState('');
  const [isFocusrelated, setIsFocusrelated] = useState(false);
  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return(
    <>
      {console.log(value,'value')}
      <View style={Styles.ItemModalFilter}>
      <Text style={textStyle}>{value.label}</Text>
      </View>
      <Dropdown
        style={dropdownStyle}
        placeholderStyle={placeholderStyle}
        selectedTextStyle={selectedTextStyle}
        iconStyle={Styles.iconStyle}
        itemTextStyle={Styles.itemTextStyle}
        containerStyle={containerStyle}
        data={value.data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusrelated ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={selectedTaskName}
        renderItem={renderItem}
        onFocus={() => setIsFocusrelated(true)}
        onBlur={() => setIsFocusrelated(false)}
        onChange={item=> {
          let List = [...entityIdList];
          const Index=SubCategory_List.findIndex((p)=>parseInt(p.value)===parseInt(value.value))
          const categoryId= SubCategory_List?.[Index+1]?.value;

          getLists(categoryId,item.value);
         let Exist = List?.findIndex((p) => p.categoryId ===item.value);
          if (Exist === -1) {
            List.push({
              categoryName: item.label,
              categoryId: item.value,
              EntityName: SubCategory_List?.[Index]?.label
            })
          }
          else {
            List?.find((p) => p.categoryId ===item.value);
            let index = List?.findIndex((p) => p.categoryId ===item.value);
            let markers = [...List];
            markers[index] = { ...markers[index],  categoryName: item.label,
              categoryId: item.value };
          }
          setEntityIdList(List)
          if(categoryId===undefined){
            GLOBAL.SelectId=SubCategory_List?.[Index]?.value;
            GLOBAL.SelectName=SubCategory_List?.[Index]?.label
            setRelatedId(item.value)
            setRelatedName(item.label)
          }
        }}
      />

    </>
  )
}
export { Taskdropdown };
