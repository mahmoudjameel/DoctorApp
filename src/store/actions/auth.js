// import ConnectyCube from 'react-native-connectycube'
import {LOADING,FAIL,SUCCESS,ALERT_DISPOSE, GET_USER,ONSUCCESS,SET_DOCTOR_AVAILABLITY,BASE_URL,SELECT_LANGUAGE,DRFAIL,DRLOADING,DRONSUCCESS,DR_ALERT_DISPOSE,DR_AUTH_USER_FAIL,DRSUCCESS,SET_CURRENT_USER,RESET_CURRENT_USER,UPDATE_CURRENT_USER} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../models/user'
import {languages} from '../../data/languages'
// import ChatService from '../chatServices/chat-service'
import RNKommunicateChat from 'react-native-kommunicate-chat';
import { preparationUploadImg, getImageLinkFromUID } from '../../helpers/file'

export const signup = (name,email,gender,blood_group,date,mobile, password,disease,language) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: LOADING
      });
      
      const response = await fetch(
        BASE_URL+'/accounts/api/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
                username:email, password:password,email:email
            },
            name:name,
            gender:gender,
            blood_group:blood_group,
            dob: date,
            phone:mobile,
            app_user_diseases:disease,
            user_language:language
        })
        }
      );
      if(response.ok){
        resData=await response.json()
        dispatch(signin(email,password));
      }else{
        let message;
        if(response.status === 404){
          message="Somthing went wrong!"
        }       
        else if (response.status === 400){
          const errorRes = await response.json()
          
        if (errorRes.user.username[0]==="A user with that Email id already exists."){
          message="user already exist!"
        }
        }else if(response.status === 500){
          message="internal server error"
        }
        throw message
        
      }  
    }catch(error){
        dispatch({
          type:FAIL,
          error:error
        });
        dispatch({
          type:ALERT_DISPOSE,
          error:error
        });
    }
    
    
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: LOADING
      });

      const response = await fetch(
        BASE_URL+'/accounts/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:email,password:password
        })
        }
      );
      if(response.ok){
        const resData=await response.json()
        await AsyncStorage.setItem('authData', JSON.stringify(resData))
        await AsyncStorage.setItem('token',resData.token)
        const userData = {login:resData.id,password:resData.token,name:resData.name}
        // await dispatch(chatsignIn(userData)).then(()=>
        // {
        //   ChatService.setUpListeners()
        // }).catch(error=>{
        //   console.log(error);
        // })
        let user_language =languages.en
        if(resData.user_language == "en"){
           user_language = languages.en
        }
        else if(resData.user_language == "ar"){
           user_language = languages.ar
        }
        else if(resData.user_language=="hi"){ 
          user_language = languages.hi
        }
        else if(resData.user_language=="ur"){ 
          user_language = languages.ur
        }
        else if(resData.user_language=="fr"){ 
          user_language = languages.fr
        }
        await AsyncStorage.setItem('selectedLanguage',JSON.stringify(user_language))
        await dispatch({ type: 'USER_TYPE', userType:"Patient" })
        var kmUser = {
          'userId' : resData.email,
          'applicationId' : '2b20861496264a48dafb6f26c442fe1b',  //replace this with your APP_ID from Kommunicate Dashboard
          'deviceApnsType' : 1    //Set 0 for Development and 1 for Distribution (Release)
          };
          RNKommunicateChat.loginUser(kmUser, (response, message) => {
            if(response == 'Success') {
                console.log(message);
            }else if (response == 'Error') {
                console.log(message);
            }
        });
        await dispatch({
          type:GET_USER,
          user:resData
        });
        dispatch({
          type:SUCCESS
        });
        await dispatch({
          type:SELECT_LANGUAGE,
          language:user_language
        })
        
        dispatch({
          type:ONSUCCESS
        })
      
      }else{
        let message;
        if(response.status == 404){
          message="Somthing went wrong!"
        }       
        else if (response.status == 400){
          const errorRes = await response.json()
          message = errorRes.non_field_errors[0]
        }else if(response.status == 500){
          message="internal server error"
        }
        throw message
        
      }  
    }catch(error){
        dispatch({
          type:FAIL,
          error:error
        });
        dispatch({
          type:ALERT_DISPOSE,
          error:error
        });
    }
    
    
  };
};

export const doctorSignup = (name,email,gender,blood_group,date,mobile,password,residentCountryId,workAddress,userName,drAddress,specialityId,employeeId,jobType,hospitalId,clinicId,language) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: DRLOADING
      });
      
      const response = await fetch(
        BASE_URL+'/accounts/api/doctor/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
                username:userName, password:password,email:email
            },
            name:name,
            email:email,
            gender:gender,
            blood_group:blood_group,
            dob:date,
            phone:mobile,
            spicality:specialityId,
            hospital:hospitalId,
            clinic:clinicId,
            resident_address:drAddress,
            resident_country:residentCountryId,
            work_address:workAddress,
            employee_id:employeeId,
            job:jobType,
            user_language:language
        })
        }
      );
      if(response.ok){
        resData=await response.json()
        await dispatch({
          type:DRSUCCESS
        });
        dispatch({
          type:DRONSUCCESS
        });
      }else{
        let message;
        if(response.status == 404){
          message="Somthing went wrong!"
        }       
        else if (response.status == 400){
          const errorRes = await response.json()
          
        if (errorRes.user.username[0]=="A user with that username already exists."){
          message="A user with that username already exists.!"
        }
        }else if(response.status == 500){
          message="internal server error"
        }
        throw message
        
      }  
    }catch(error){
        dispatch({
          type:DRFAIL,
          error:error
        });
        dispatch({
          type:DR_ALERT_DISPOSE,
          error:error
        });
    }
    
    
  };
};

export const doctorSignin = (username, password,props) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: DRLOADING
      });

      const response = await fetch(
        BASE_URL+'/accounts/api/doctor/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:username,password:password
        })
        }
      );
      if(response.ok){
        const resData=await response.json()  
        await AsyncStorage.setItem('authDoctor', JSON.stringify(resData))
        await AsyncStorage.setItem('token',resData.token)
        
        const userData = {login:resData.user_id,password:resData.token,name:resData.username}
        // dispatch(chatsignIn(userData)).then(()=>
        // {
        //   ChatService.setUpListeners()
        // }).catch(error=>{
        //   console.log(error);
        // })
        let user_language =languages.en
        if(resData.user_language == "en"){
           user_language = languages.en
        }
        else if(resData.user_language == "ar"){
           user_language = languages.ar
        }
        else if(resData.user_language=="hi"){ 
          user_language = languages.hi
        }
        else if(resData.user_language=="ur"){ 
          user_language = languages.ur
        }
        else if(resData.user_language=="fr"){ 
          user_language = languages.fr
        }
        await AsyncStorage.setItem('selectedLanguage',JSON.stringify(user_language))
        await dispatch({ type: 'USER_TYPE', userType:"Doctor" })
        await dispatch({
          type:GET_USER,
          user:resData
        });
        dispatch({
          type:DRSUCCESS
        });
        await dispatch({
          type:SELECT_LANGUAGE,
          language:user_language
        })
        dispatch({
          type:DRONSUCCESS
          
        })
        
      
      }else{
        let message;
        if(response.status == 404){
          message="Somthing went wrong!"
        }       
        else if (response.status == 400){
          const errorRes = await response.json()
          
          
          message = errorRes.non_field_errors[0]
        }else if(response.status == 500){
          message="internal server error"
        }
        throw message
        
      }  
    }catch(error){
        dispatch({
          type:DRFAIL,
          error:error
        });
        dispatch({
          type:DR_ALERT_DISPOSE,
          error:error
        });
    }
    
    
  };
};

export const signOut = (props)=>{
  return async (dispatch) => {
    await AsyncStorage.removeItem('authData');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('authDoctor');
    await AsyncStorage.removeItem('CURRENT_CHAT_USER_SESSION_KEY')
    // await ConnectyCube.logout()
    await dispatch({ type: 'LOG_OUT'})
    props.navigation.navigate('Auth')
    RNKommunicateChat.logout((response) => {
      if(response == "Success") {
          //logout successful
      } else {
          //error logging out
      }
  })
  };
};

export const fetchDoctorAvailablity = (doctorId) => {
  
  return async dispatch => {
    // any async code you want!
    try{const response = await fetch(
      BASE_URL+'/accounts/api/doctor/availability',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:doctorId
      })
      }
    );
    if (!response.ok) {
      const resData = await response.json();       
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();        
    
    dispatch({ type: SET_DOCTOR_AVAILABLITY, doctorAvailablity:resData,});
  }
  catch(err){
      throw err;
    }
  };
};


// export const chatsignIn = (params)=>{
//   return async (dispatch)=>{
//     try{
//       ConnectyCube.createSession().then(session => {
//         const token = ConnectyCube.service.sdkInstance.session.token;
//         ConnectyCube.login(params)
//             .then((user) => {
//               const res = fetch(
//                 BASE_URL+'/accounts/api/add/chat/id',
//                 {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify({
//                     user_id:params.login,chat_id:user.id
//                 })
//                 }
//               );
//               console.log(res);
             
//               if(user.full_name==null){
//               const updateData = {full_name:params.name}
//               ConnectyCube.users.update(updateData).then((user)=>{
//                 console.log({user})
//               const currentUser = new User(user.user)
//               user.avatar = getImageLinkFromUID(user.avatar)
//               dispatch({type:SET_CURRENT_USER,chatCurrentUser:user})
//               const customSession = Object.assign({}, currentUser, { password: params.password,login_id:params.login })
//               AsyncStorage.setItem("CURRENT_CHAT_USER_SESSION_KEY", JSON.stringify(customSession))
//               const chatConnectParam = {userId:currentUser.id,password:token}
//               ConnectyCube.chat.connect( chatConnectParam )
//               }).catch((error) => { console.log(error);});
//               }
//               const currentUser = new User(user)
//               user.avatar = getImageLinkFromUID(user.avatar)
//               dispatch({type:SET_CURRENT_USER,chatCurrentUser:user})
//               const customSession = Object.assign({}, currentUser, { password: params.password,login_id:params.login })
//               AsyncStorage.setItem("CURRENT_CHAT_USER_SESSION_KEY", JSON.stringify(customSession))
//               const chatConnectParam = {userId:currentUser.id,password:token}
//               ConnectyCube.chat.connect( chatConnectParam )
//             })
//           .catch((error) => {
//             console.log(error);
//           });        
//      }) .catch(error => {
     
//      });
     
//     }
//     catch(err){
//       console.log(err);
//       throw err;
//     }
//   };
// };

