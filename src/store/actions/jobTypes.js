import { SET_JOBTYPES, BASE_URL } from '../constants';


  export const fetchJobTypes = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/settings/api/jobtypes',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: SET_JOBTYPES, jobTypes:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  