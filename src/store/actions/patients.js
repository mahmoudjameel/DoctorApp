import { SET_PATIENT_DETAILS, BASE_URL } from '../constants';


export const fetchPatientDetails = (userid) => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/accounts/api/patient',{
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
        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      
      dispatch({ type: SET_PATIENT_DETAILS, patientDetails:resData,});
    }catch(err){
        throw err;
      }
    };
  };
