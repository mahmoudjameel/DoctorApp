import { SET_CLINICS, BASE_URL } from '../constants';


  export const fethClinics = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/settings/api/clinics',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: SET_CLINICS, clinics:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  