import { SET_DOCTOR_AVAILABLITY, BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addDoctorAvailablity = (user_id,day,time,order_by)=>{
    return async dispatch => {
        // any async code you want!
        const token = await AsyncStorage.getItem('token')
        try{const response = await fetch(
          BASE_URL+'/accounts/api/doctor/availability/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctor_id:user_id,
                day:day,
                time_slot:time,
                order_by:order_by
          })
          }
          
        );
        
          if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const resData = await response.json(); 
          dispatch(fetchDoctorAvailablity(userid=user_id));
        }
        catch(err){
          throw err;
        }
      };
}

export const fetchDoctorAvailablity = (userid) => {
    return async dispatch => {
      
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/accounts/api/doctor/availability',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:userid
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        console.log(resData);
        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      
      
      dispatch({ type: SET_DOCTOR_AVAILABLITY, doctorAvailablity:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  
  


  
  