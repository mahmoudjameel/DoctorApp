import { SET_HOSPITALS, BASE_URL } from '../constants';


  export const fecthHospitals = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/settings/api/hospitals',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: SET_HOSPITALS, hospitals:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  