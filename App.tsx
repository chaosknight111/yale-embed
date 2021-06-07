import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./app/navigation/index";
import { useFonts } from "expo-font";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import useAxios from "axios-hooks";
import { API_URL } from "./app/config/constants";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid/non-secure";
import { AppProvider } from "./app/contexts/app-context/app-context";

export default function App() {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/Roboto-Medium.ttf"),
  });

  const [{ data, loading, error }, registerDevice] = useAxios(
    {
      url: `${API_URL}/device/register`,
      method: "POST",
    },
    { manual: true }
  );

  const [reqDevice, getDevice] = useAxios(
    {
      url: `${API_URL}/getDevice`,
      method: "GET",
    },
    { manual: true }
  );

  React.useEffect(() => {
    _checkDeviceToken();
  }, []);

  const _checkDeviceToken = async () => {
    const createDevice = async () => {
      const newDevice = await registerDevice({
        params: {
          type: Platform.OS === "ios" ? "iphone" : "android",
          model: Device.modelName,
          os: Device.osName,
        },
      });
      console.log("createDevice", JSON.stringify(newDevice));
      if (newDevice.data?.id) {
        console.log("new device ID", newDevice.data.id);
        
        await AsyncStorage.setItem("@device", newDevice.data.id);
      } else {
        throw new Error(newDevice.data.message);
      }
    };

    try {
      // const deviceToken = await AsyncStorage.getItem("@device");
      // if (deviceToken) {
      //   const device = await getDevice({
      //     params: {
      //       externalId: deviceToken,
      //     },
      //   });
      //   if (device.data) {
      //     if (device.data.message) {
      //       createDevice();
      //     } else {
      //       await AsyncStorage.setItem("@device", device.data.externalId);
      //     }
      //   }
      // } else {
        createDevice();
      // }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppProvider>
          <Navigator />
        </AppProvider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
