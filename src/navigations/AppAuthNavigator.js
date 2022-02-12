import { createStackNavigator } from 'react-navigation-stack';
import LoggedOut from '../screens/auth/LoggedOut1';
import SignUp from '../screens/auth/SignUp';
import SignIn from '../screens/auth/SignIn';
import ForgetPassword from '../screens/auth/ForgetPassword'

import DrSignUpScreen from '../screens/auth/Doctor/DrSignUpScreen'
import DrForgetPasswordScreen from '../screens/auth/Doctor/DrForgetPasswordScreen';


const AppAuthNavigator = createStackNavigator({
    Welcome:{
      screen:LoggedOut,      
      navigationOptions: { header: null, }
    },
    SignUp:{ 
      screen:SignUp,
      navigationOptions: { header: null, }
    },
    ForgetPassword:{
      screen:ForgetPassword,
      navigationOptions: { header: null, }
    },
    DrSignUp:{
      screen:DrSignUpScreen,
      navigationOptions: { header: null,}
    },
    DrForgetPassword:{
      screen:DrForgetPasswordScreen,
      navigationOptions: { header: null,}
    }
  });
  

export default AppAuthNavigator;
  