import React, { useEffect, useState } from "react";
import {
  View, Image, StatusBar,  Dimensions,Animated,Text

} from "react-native";

const GLOBAL = require("../Global");
import {Container} from "native-base";
import VersionCheck from "react-native-version-check";
const width = Dimensions.get('window').width;



function Splash() {

  const [fadeAnim,setfadeAnim] = useState(new Animated.Value(0));
  const [Version,setVersionCheck] = useState('');
  useEffect(()=>{
    setVersionCheck(VersionCheck.getCurrentVersion())

    Animated.timing(

      fadeAnim,// The animated value to drive
      {
        toValue: 1,// Animate to opacity: 1 (opaque)
        duration: 2500,// 2000ms
        useNativeDriver: true
      },
    ).start();
  }, []);

  return(
    <Container style={{backgroundColor:GLOBAL.OFFICIAL_background,justifyContent:'center',flex:2}}>
      <StatusBar
        animated={true}
        backgroundColor={GLOBAL.OFFICIAL_background}
      />

      <View style={{ justifyContent: "flex-end" ,width:'100%',alignItems:'center',flex:0.95,}}>
        <Animated.View style={[ {  opacity: fadeAnim}]}>
          <Image  resizeMode={"contain"} source={require("../../Picture/png/OkoutLogo.png")}
                 style={{width:width/2}}
          />
        </Animated.View>

      </View>
      <View style={{width:'100%',alignItems:'flex-end',flex:1.05}}>
        <Image tintColor={GLOBAL.OFFICIAL_backgroundItem} resizeMode={"contain"} source={require("../../Picture/png/SplashBilding.png")}
               style={{width:'100%' }}
        />
      </View>
    </Container>
  )

}


export default Splash;
