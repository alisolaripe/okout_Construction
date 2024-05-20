import React, { useEffect, useState } from "react";
import { View, Image, StatusBar, Dimensions, Animated } from "react-native";

const GLOBAL = require("../Global");
import { Container } from "native-base";

const Photoes = require("../Photoes");
const width = Dimensions.get("window").width;

function Splash() {
  const [fadeAnim, setfadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      },
    ).start();
  }, []);
  return (
    <Container style={{ backgroundColor: GLOBAL.OFFICIAL_background, justifyContent: "center", flex: 2 }}>
      <StatusBar
        animated={true}
        backgroundColor={GLOBAL.OFFICIAL_background}
      />
      <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "center", flex: 0.95 }}>
        <Animated.View style={[{ opacity: fadeAnim }]}>
          <Image resizeMode={"contain"} source={Photoes.OkoutLogo}
                 style={{ width: width / 2 }}
          />
        </Animated.View>
      </View>
      <View style={{ width: "100%", alignItems: "flex-end", flex: 1.05 }}>
        <Image tintColor={GLOBAL.OFFICIAL_BLUE_COLOR} resizeMode={"contain"} source={Photoes.Splash_background}
               style={{ width: "100%" }}
        />
      </View>
    </Container>
  );
}

export default Splash;
