import { LIST_SPECIALIST, BASE_URL } from '../constants';


  export const fetchDoctorSpicalists = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/settings/api/doctorspicalist',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: LIST_SPECIALIST, specialist:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  