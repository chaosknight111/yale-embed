import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxios from "axios-hooks";
import React from "react";
import { API_URL } from "../../config/constants";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { nanoid } from "nanoid/non-secure";

type State = {
  switchFlag: boolean;
  setSwitchFlag: React.Dispatch<React.SetStateAction<boolean>>;
  disorderFlag: string;
  setDisorderFlag: React.Dispatch<React.SetStateAction<string>>;
  withdrawalSeverity: number;
  setWithdrawalSeverity: React.Dispatch<React.SetStateAction<number>>;
  readinessFlag: string;
  setreadinessFlag: React.Dispatch<React.SetStateAction<string>>;
  createDevice: () => Promise<void>;
  fetching: boolean;
  registering: boolean;
  initialDisorder: boolean;
  setinitialDisorder: React.Dispatch<React.SetStateAction<boolean>>;
  initialWithrawal: boolean;
  setinitialWithrawal: React.Dispatch<React.SetStateAction<boolean>>;
  intialTreatment: boolean;
  setintialTreatment: React.Dispatch<React.SetStateAction<boolean>>;
  clearAssessment: boolean;
  setClearAssessment: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: State = {
  switchFlag: false,
  setSwitchFlag: () => {},
  disorderFlag: "",
  setDisorderFlag: () => {},
  withdrawalSeverity: 0,
  setWithdrawalSeverity: () => {},
  readinessFlag: "",
  setreadinessFlag: () => {},
  createDevice: async () => {},
  fetching: true,
  registering: false,
  initialDisorder: true,
  setinitialDisorder: () => {},
  initialWithrawal: true,
  setinitialWithrawal: () => {},
  intialTreatment: true,
  setintialTreatment: () => {},
  clearAssessment: false,
  setClearAssessment: () => {},
};

export const AppContext = React.createContext<State>(initialState);

export const AppProvider: React.FC = ({ children }) => {
  const [switchFlag, setSwitchFlag] = React.useState(false);
  const [disorderFlag, setDisorderFlag] = React.useState("");
  const [withdrawalSeverity, setWithdrawalSeverity] = React.useState(0);
  const [readinessFlag, setreadinessFlag] = React.useState("");
  const [initialDisorder, setinitialDisorder] = React.useState(true);
  const [initialWithrawal, setinitialWithrawal] = React.useState(true);
  const [intialTreatment, setintialTreatment] = React.useState(true);
  const [clearAssessment, setClearAssessment] = React.useState(false);

  const [{ loading: loadingUsedisorder }, getUseDisorder] = useAxios(
    {
      url: `${API_URL}/assessment/getUsedisorder`,
      method: "GET",
    },
    { manual: true }
  );

  const [{ loading: loadingWithdrawal }, getWithdrawal] = useAxios(
    {
      url: `${API_URL}/assessment/getWithdrawal`,
      method: "GET",
    },
    { manual: true }
  );

  const [{ loading: loadingTreatment }, getTreatment] = useAxios(
    {
      url: `${API_URL}/assessment/getTreatment`,
      method: "GET",
    },
    { manual: true }
  );

  // React.useEffect(() => {
  //   _getDeviceToken();
  // }, []);

  const [{loading: registering}, clearSessionOnDevice] = useAxios(
    {
      method: "GET",
    },
    { manual: true }
  );

  const createDevice = async () => {
    const deviceId = await AsyncStorage.getItem("@device");

    const newDevice = await clearSessionOnDevice({
      url: `${API_URL}/device/${deviceId}/session/clear`,
      params: {
        externalId:deviceId
      },
    });
    if (newDevice.data?.device) {
      console.log("Device session cleared");
      //console.log("new device ID", newDevice.data.externalId);
      //await AsyncStorage.setItem("@device", newDevice.data.externalId);
    } else {
      throw new Error(newDevice.data.message);
    }
  };

  // React.useEffect(() => {
  //   _getDeviceToken();
  // }, []);

  const _getDeviceToken = async () => {
    const token = await AsyncStorage.getItem("@device");
    if (token) {
      _getInitialDisorder(token);
      _getInitialWithdrawal(token);
      _getTreatment(token);
    }
  };

  const _getInitialDisorder = async (token: any) => {
    try {
      const useDisorder = await getUseDisorder({
        params: { deviceId: token },
      });
      if (useDisorder.data) {
        const { data } = useDisorder;
        if (!data.message) {
          let total = 0;
          Object.keys(data).forEach((key) => {
            if (data[key] === 1) {
              total = total + 1;
            }
          });
          setDisorderFlag(total >= 4 ? "yes" : "no");
        }
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  const _getTreatment = async (token: any) => {
    try {
      const { data } = await getTreatment({
        params: {
          deviceId: token,
        },
      });
      if (data) {
        if (!data.message)
          if (data.readinessScale > 0) {
            setreadinessFlag("yes");
          } else {
            setreadinessFlag("no");
          }
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  const _getInitialWithdrawal = async (token: any) => {
    try {
      const { data } = await getWithdrawal({
        params: { deviceId: token },
      });

      if (data) {
        if (!data.message) {
          let total = 0;
          Object.keys(data).forEach((key) => {
            if (data[key]) {
              total = total + Number(data[key]);
            }
          });

          let withdrawal = 0;
          if (total <= 8) {
            withdrawal = (total * 100) / 8;
          }
          if (total > 8 && total <= 12) {
            withdrawal = 100 + ((total - 8) * 100) / 4;
          }
          if (total > 12) {
            withdrawal = 200 + ((total - 12) * 100) / 36;
          }

          setWithdrawalSeverity(withdrawal);
        }
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        switchFlag,
        setSwitchFlag,
        disorderFlag,
        setDisorderFlag,
        withdrawalSeverity,
        setWithdrawalSeverity,
        readinessFlag,
        setreadinessFlag,
        createDevice,
        fetching: loadingUsedisorder || loadingWithdrawal || loadingTreatment,
        registering,
        initialDisorder,
        setinitialDisorder,
        initialWithrawal,
        setinitialWithrawal,
        intialTreatment,
        setintialTreatment,
        clearAssessment,
        setClearAssessment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
