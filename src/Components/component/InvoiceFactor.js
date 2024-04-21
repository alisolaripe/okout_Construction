import React, { useEffect, useState } from "react";
import {
  Text,
  View, TextInput, TouchableOpacity,
} from "react-native";
import { Styles } from "../Styles";
function InvoiceFactor({
                         value,
                         Invoice
                       }) {
  const [QTYNumber,setQTYNumber] = useState('0');
  const [QTYCount,setQTYCount] = useState(1);
  const [totalPrice,settotalPrice] = useState(0);
  const IncreaseCounter=(QTY,Price,Id,Discount)=>{

    if(QTYCount>=0) {
      let discount=0
      setQTYCount((prev) => prev-1);
      // setQTYNumber(String(QTYCount));
      // let total=parseInt(QTYCount)*parseInt(Price)
      // console.log(QTYNumber,'QTYNumber : Increase')
      // if(Discount!=='0'||Discount!==0) {
      // discount = percentage(total, Discount);
      // settotalPrice(total-discount)
      // }
      // else {
      //   settotalPrice(total)
      // }
      // Invoice(QTYCount,total,Id)
    }
    console.log(QTYCount,'QTYCount')
  }
  const DecreaseCounter=(QTY,Price,Id,Discount)=>{
    console.log('DecreaseCounter:DecreaseCounter')
    if(QTYCount<=QTY) {
      let discount=0;
      console.log(QTYCount,'QTYCount before + 1')
         setQTYCount((prev) => prev+1);
      // setQTYNumber(String(QTYCount));
      // let total=parseInt(QTYCount)*parseInt(Price);
       console.log(QTYCount,'QTYCount after + 1');
      // console.log(QTYNumber,'QTYNumber');
      // if(Discount!=='0'||Discount!==0) {
      // discount = percentage(total,Discount);
      // settotalPrice(total-discount);
      // console.log(QTYNumber,'QTYNumber : DecreaseCounter')
      }
    // else {
    //      settotalPrice(total)
    //   }
    //    Invoice(QTYCount,total,Id)
    console.log(QTYCount,'QTYCount')
    }
   // }
  const percentage=(num, per)=> {
    return (num/100)*per;
  }
  return (
    <View  style={Styles.ItemFoctorBox}>
      <View style={Styles.With100Flex_End}>
        {
          value.Discount!=='0'&&
          <View style={Styles.Discount}>
            <Text style={Styles.DiscountText}>
              {value.Discount}%
            </Text>
          </View>
        }
      </View>
      <View style={Styles.With90}>
        <View style={Styles.With100}>
          <View style={Styles.With100_row}>
            <View style={Styles.Width60}>
              <Text style={[Styles.txt_left_Pos]}>{value.Name}</Text>
            </View>
            <View style={Styles.Width40}>
              <View style={Styles.QTYList}>
                <TouchableOpacity onPress={()=>IncreaseCounter(value.QTY,value.Price,value.Id,value.Discount)} style={Styles.QTYBtn}>
                  <Text style={Styles.QTYBtntext}>-</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity  style={Styles.QTYInpute}>*/}
                {/*  <Text style={Styles.QTYInputeText}>{QTYNumber}</Text>*/}
                {/*</TouchableOpacity>*/}
                <TextInput
                  value={QTYNumber}
                  style={Styles.QTYInpute}
                  keyboardType={"numeric"}
                  onChangeText={(val)=> {
                    setQTYNumber(val);
                  }}
                  multiline={true}
                  placeholderTextColor={'#fff'}/>
                <TouchableOpacity onPress={()=>DecreaseCounter(value.QTY,value.Price,value.Id,value.Discount)} style={Styles.QTYBtn}>
                  <Text style={Styles.QTYBtntext}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[Styles.BtnListStyle,{paddingBottom:10}]}>
            <View style={Styles.Width60}>
            <Text style={[Styles.txt_left_Pos]}>{value.Price}$</Text>
            </View>
              <View style={Styles.Width40}>
            <Text style={[Styles.txt_left_Pos]}>QTY : {value.QTY}</Text>
                <Text style={[Styles.txt_left_Pos]}>totalPrice : {totalPrice}</Text>
              </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default InvoiceFactor;
