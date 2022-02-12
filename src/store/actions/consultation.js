import {LOADING,FAIL,SUCCESS,ALERT_DISPOSE, GET_USER,ONSUCCESS,BASE_URL,DRONSUCCESS,DR_ALERT_DISPOSE,DR_AUTH_USER_FAIL,DRSUCCESS, SET_CONSULTATIONS, SET_PRESCRIPTIONS, SET_DIGNOSIS_REPORT} from '../constants';

export const addConsultationReports = (appointment_id,doctor_id,patient_id,consultation_name,blood_pressur_systolic,blood_pressur_diastolic,body_temprature,height,weight,notes,for_diseases,prescriptions,test_reports)=>{    
    return async(dispatch)=>{
        try{
            dispatch({
                type: LOADING
              });
            const response  = await fetch(
                BASE_URL+'/doctor/api/add/consultation',
                {
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                    },
                    body:JSON.stringify({
                    appointment_id:appointment_id,
                    doctor_id:doctor_id,
                    patient_id:patient_id,
                    consultation_name:consultation_name,
                    blood_pressur_systolic:blood_pressur_systolic,
                    blood_pressur_diastolic:blood_pressur_diastolic,
                    body_temprature:body_temprature,
                    height:height,
                    weight:weight,
                    notes:notes,
                    for_diseases:for_diseases,
                    prescriptions:prescriptions,
                    test_reports:test_reports                       
                    })
                }
            );
            console.log(response);
            if(response.ok){
                dispatch({
                    type:SUCCESS
                  });
                  dispatch({
                    type:ONSUCCESS
                  });
                
            }else{
                const errorRes = await response.json()                
                dispatch({
                  type:FAIL,
                  errors:errorRes
                });
            }
        }
        catch(error){

          const errorRes = error
                dispatch({
                  type:FAIL,
                  errors:errorRes
                });
                dispatch({
                  type:ALERT_DISPOSE,
                  error:errorRes
                });
        }
    }
}

  export const fetchConsultations = (user_id) => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/consultations',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id:user_id,
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_CONSULTATIONS, consultations:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  
  export const fetchPrescriptions = (consultaion_id) => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/prescriptions',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            consultaion_id:consultaion_id,
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_PRESCRIPTIONS, prescriptions:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  
  export const fetchDiagnosisReports = (consultaion_id) => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/dignosisreports',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            consultaion_id:consultaion_id,
        })
        }
      );
      if (!response.ok) {
        const resData = await response.json();        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_DIGNOSIS_REPORT, dignosisReports:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  
  export const homeScreen = ()=>{
   return async (dispatch)=>{
    dispatch({
      type:ALERT_DISPOSE,
      error:errorRes
    });
   }
  }