import {LOADING,FAIL,SUCCESS,ALERT_DISPOSE, GET_USER,ONSUCCESS,SELECT_LANGUAGE, BASE_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { languages } from '../../data/languages';

export const updateProfile = (id,name,email,gender,blood_group,date,mobile,disease,language) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    try{
      dispatch({
        type: LOADING
      });

      const response = await fetch(
        BASE_URL+'/accounts/api/update/user/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:"Token "+token
          },
          body: JSON.stringify({
            id:id,
            username:email,
            email:email,
            name:name,
            gender:gender,
            blood_group:blood_group,
            dob: date,
            phone:mobile,
            user_diseases:disease,
            user_language:language
        })
        }
      );
      
      if(response.ok){
        resData=await response.json()
        await AsyncStorage.setItem('authData', JSON.stringify(resData))
        if(resData.user_language=="en"){
           AsyncStorage.setItem('selectedLanguage',JSON.stringify(languages.en))
           dispatch({
            type:SELECT_LANGUAGE,
            language:languages.en
          })
        }
        else if(resData.user_language=="ar"){ 
          AsyncStorage.setItem('selectedLanguage',JSON.stringify(languages.ar))
          dispatch({
            type:SELECT_LANGUAGE,
            language:languages.ar
          })
        }
        else if(resData.user_language=="hi"){ 
          AsyncStorage.setItem('selectedLanguage',JSON.stringify(languages.hi))
          dispatch({
            type:SELECT_LANGUAGE,
            language:languages.hi
          })
        }
        else if(resData.user_language=="ur"){ 
          AsyncStorage.setItem('selectedLanguage',JSON.stringify(languages.ur))
          dispatch({
            type:SELECT_LANGUAGE,
            language:languages.ur
          })
        }
        else if(resData.user_language=="fr"){ 
          AsyncStorage.setItem('selectedLanguage',JSON.stringify(languages.fr))
          dispatch({
            type:SELECT_LANGUAGE,
            language:languages.fr
          })
        }
        
        dispatch({
            type:SUCCESS
          });
          dispatch({
            type:GET_USER,
            user:resData
          });
          dispatch({
            type:ONSUCCESS
          })
      }else{
        let message = "error";
        if(response.status == 404){
          message="Somthing went wrong!"
        }       
        else if (response.status == 400){
          const errorRes = await response.json()
          message=errorRes[0]
          
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