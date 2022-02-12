import {LOADING,FAIL,SUCCESS,ALERT_DISPOSE, GET_USER,ONSUCCESS, BASE_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const updatePassword=(email,current_password,new_password)=>
{
    return async (dispatch)=>{
        const token = await AsyncStorage.getItem('token')
        try{
            dispatch({
                type:LOADING
            });
            
            const response = await fetch(
                BASE_URL+'/accounts/api/updatepassword',
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization:"Token "+token
                    },
                    body: JSON.stringify({                    
                      email:email,
                      password:new_password,
                      current_password:current_password
                  })
                  }
            );
            console.log(response);
            
            if(response.status==204){
                dispatch({
                    type:SUCCESS
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
    }
}

export const forgetPassword=(email,new_password,props)=>
{
    return async (dispatch)=>{
      console.log(props);
        try{
            dispatch({
                type:LOADING
            });
            
            const response = await fetch(
                BASE_URL+'/accounts/api/forgetpassword',
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({                    
                      email:email,
                      password:new_password,
                  })
                  }
            );
            
            if(response.status==204){
              await dispatch({
                    type:SUCCESS
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
    }
}