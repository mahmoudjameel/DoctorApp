import { SET_DOCTOR_DETAILS, BASE_URL } from '../constants';


export const fetchDoctorDetails = (userid) => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/accounts/api/doctor',{
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
      
      dispatch({ type: SET_DOCTOR_DETAILS, doctorDetails:resData,});
    }catch(err){
        throw err;
      }
    };
  };
