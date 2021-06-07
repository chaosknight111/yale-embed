import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BuprenorphineInitiationScreen,
  OpioidAssessementScreen,
  OpioidWidthdrawalScreen,
  OpioidTreatmentScreen,
  CarePathwayScreen,
} from "../screens/index";

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="beurophine"
        component={BuprenorphineInitiationScreen}
      />
      <Stack.Screen name="opioid" component={OpioidAssessementScreen} />
      <Stack.Screen
        name="opioidWidthrawal"
        component={OpioidWidthdrawalScreen}
      />
      <Stack.Screen name="opioidTreatment" component={OpioidTreatmentScreen} />
      <Stack.Screen name="carePathway" component={CarePathwayScreen} />
    </Stack.Navigator>
  );
};
