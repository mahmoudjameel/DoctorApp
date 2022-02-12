import {LOADING,FAIL,SUCCESS,ALERT_DISPOSE, GET_USER,ONSUCCESS, BASE_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendMail=(product_name,product_barcode,description,email,username,type)=>
{
    return async (dispatch)=>{
        const token = await AsyncStorage.getItem('token')
        try{
            dispatch({
                type:LOADING
            });
            
            const response = await fetch(
                BASE_URL+'/appmails/api/create/email/',
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization:"Token "+token
                    },
                    body: JSON.stringify({
                      user_name:username,
                      email:email,
                      product_name:product_name,
                      product_barcode:product_barcode,
                      product_description: description,
                      product_type:type
                  })
                  }
            );
            
            if(response.ok){
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
    }
}