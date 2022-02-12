import { SET_DOCTORS, BASE_URL, DOCTOR_PRICING } from '../constants';


  export const fetchDoctor = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/doctor/api/doctors',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: SET_DOCTORS, doctors:resData,});
    }catch(err){
        throw err;
      }
    };
  };

  export const fetchDoctorPricing = ()=>{
    return async dispatch =>{
      try{const response = await fetch(
        BASE_URL+'/doctor/api/pricing'
      );
      if (!response.ok){
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: DOCTOR_PRICING, doctorPricing:resData,});
    }catch(err){
          throw err;
      }
    };
  };
  