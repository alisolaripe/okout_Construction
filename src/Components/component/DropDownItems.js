import {Text,View} from "react-native";
import {Styles} from "../Styles";
import React, {useEffect,useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
const GLOBAL = require("../Global");
function DropDownItems({labale,data,setIsFocus,textStyle,dropdownStyle,placeholderStyle,
                    selectedTextStyle,containerStyle,inputSearchStyle,searchBoolean,Onpres,setId,setname,Function,name,
                  }) {
  const [selectedTaskName,setselectedTaskName]=useState('');
  const [isFocusrelated, setIsFocusrelated] = useState(false);

  useEffect(()=>{
    if(labale==='Country'||labale==='City')
    setselectedTaskName(name)
    else {
      console.log(name.label,'namename')
      setselectedTaskName(name.label);
    }
  }, []);
  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return(
    <>
      <View style={Styles.ItemModalFilter}>
        <Text style={textStyle}>{labale}</Text>
      </View>
      <Dropdown
        style={dropdownStyle}
        placeholderStyle={placeholderStyle}
        selectedTextStyle={selectedTextStyle}
        iconStyle={Styles.iconStyle}
        itemTextStyle={Styles.itemTextStyle}
        containerStyle={containerStyle}
        inputSearchStyle={inputSearchStyle}
        data={data}
        search={searchBoolean}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={selectedTaskName}
        searchPlaceholder="Search..."
        value={selectedTaskName}
        renderItem={renderItem}
        onFocus={() => setIsFocusrelated(true)}
        onBlur={() => setIsFocusrelated(false)}
        onChange={item=> {
          setIsFocus(false);
          setname(item.label)
          setId(item.value);
          Onpres(item.value);
          Function(item.label,item.value,item);
        }}
      />

    </>
  )
}
export { DropDownItems };
