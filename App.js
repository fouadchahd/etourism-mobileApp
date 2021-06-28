import React from "react";
import AppNavigationContainer from "./app/components/AppNavigationContainer";
import { AuthProvider } from "./app/contexts/AuthContext";
import Toast,{BaseToast} from 'react-native-toast-message';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { Dimensions } from "react-native";
import colors from "./app/res/colors";

const toastConfig = {
  error: ({ text1,text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: colors.alertErrorBackGroundColor ,backgroundColor:colors.alertErrorBackGroundColor,width:Dimensions.get('window').width-10,height:55}}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '700',
        color:colors.roseWhite
      }}
      leadingIcon={require('./app/assets/box_important_25px.png')}
      leadingIconStyle={{width:25,height:25}}
      text1={text1}
      text2={text2}
    />
  ),
  success:({text1,text2,...rest})=>(
    <BaseToast {...rest}
    style={{borderLeftColor:colors.buttonBackGroundPrimaryColor,backgroundColor:colors.buttonBackGroundPrimaryColor,width:Dimensions.get('window').width-10,height:55}}
    contentContainerStyle={{ paddingHorizontal: 0 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '700',
        color:colors.darkGreen
      }}
      leadingIcon={require('./app/assets/ok_25px.png')}
      leadingIconStyle={{width:25,height:25}}
      text1={text1}
      text2={text2} />
  )
};
export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigationContainer />
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    </AuthProvider>
  );
}
