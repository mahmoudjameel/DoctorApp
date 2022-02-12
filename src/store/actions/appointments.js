import { LOADING,FAIL,SUCCESS,ONSUCCESS,SET_DOCTOR_APPOINTMENTS,SET_UPCOMING_DOCTOR_APPOINTMENTS,SET_DOCTOR_APPOINTMENTS_HISTORY, APPOINTMENT_RESPONSE,BASE_URL, SET_PATIENT_APPOINTMENTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const addDoctorAppointment = (doctor_id,user_id,selected_date,time_slot,slot_id)=>{
  
    return async dispatch => {
        // any async code you want!
        const token = await AsyncStorage.getItem('token')
        try{const response = await fetch(
          BASE_URL+'/doctor/api/add/appointment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctor_id:doctor_id,
                patient_id:user_id,
                appointment_date:selected_date,
                time_slot:time_slot,
                appointment_slot_id:slot_id
          })
          }
          
        );
          if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        if(response.ok){
          const resData = await response.json(); 
          
          dispatch(fetchDoctorAppointments(doctor_id));
          await dispatch({ type: APPOINTMENT_RESPONSE, doctorAppointmentResponse:resData,});
          dispatch(checkAppointmentSlot(resData.appointment_id))
        }
        }
        catch(err){
          throw err;
        }
      };
}
export const deleteAppointmentSlot =(appointment_id,doctor_id)=>{
  return async dispatch =>{

    // any async code you want!
    try{

      const response = fetch(
      BASE_URL+'/doctor/api/delete/appointment',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:appointment_id,
      })
      }
    );

    console.log(response);
    
    if (!response.ok) {
      
      throw new Error('Something went wrong in delete!');
    }

  }catch(err){
      throw err;
    }
  }
}
export const checkAppointmentSlot =(appointment_id)=>{
  return async dispatch =>{
    // any async code you want!
    try{
      console.log(appointment_id);
      const response = fetch(
      BASE_URL+'/doctor/api/check/appointment',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:appointment_id,
      })
      }
    );
    if (!response.ok) {
            
      throw new Error('Something went wrong!');
    }
  }catch(err){
      throw err;
    }
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const fetchDoctorAppointments = (doctor_id) => {
    return async dispatch => {
      
      var date = moment(new Date()).format("YYYY-MM-DD");
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/doctor/appointments',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            doctor_id:doctor_id,
            date_now:date
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();                
        throw new Error('Something went wrong!');
      }
      if(response.ok){
        const resData = await response.json();        
      
      dispatch({ type: SET_DOCTOR_APPOINTMENTS, doctorAppointments:resData,});
      }
      
    }catch(err){
        throw err;
      }
    };
  };
export const fetchDoctorAppointmentsAfterDelete = (doctor_id) => {
    return async dispatch => {
      dispatch({
        type:LOADING
      });
      dispatch({ type: SET_DOCTOR_APPOINTMENTS, doctorAppointments:null});
      var date = moment(new Date()).format("YYYY-MM-DD");
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/doctor/appointments',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            doctor_id:doctor_id,
            date_now:date
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        console.log(resData);
        
        throw new Error('Something went wrong!');
      }
      if(response.ok){
        const resData = await response.json();   
        dispatch({ type: SET_DOCTOR_APPOINTMENTS, doctorAppointments:resData});
        
        dispatch({
          type:SUCCESS
        });
        dispatch({
          type:ONSUCCESS
        })
      }
      
    }catch(err){
        throw err;
      }
    };
  };


  export const fetchPatientAppointments = (patient_id) => {
    return async dispatch => {
      
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/patient/appointments',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            patient_id:patient_id,
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_PATIENT_APPOINTMENTS, patientAppointments:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  export const fetchDoctorAppointmentsHistory = (doctor_id) => {
    return async dispatch => {
      
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/doctor/appointments/history',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            doctor_id:doctor_id,
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_DOCTOR_APPOINTMENTS_HISTORY, doctorAppointmentsHistory:resData,});
    }catch(err){
        throw err;
      }
    };
  };

  
  export const fetchUpcomingAppointments = (doctor_id) => {
    return async dispatch => {
      var date = moment(new Date()).format("YYYY-MM-DD");
      var today = new Date()
      var time = today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds();
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/doctor/upcoming/appointments',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            doctor_id:doctor_id,
            time_now:time,
            date_now:date
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_UPCOMING_DOCTOR_APPOINTMENTS, upcomingAppointments:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  
  
