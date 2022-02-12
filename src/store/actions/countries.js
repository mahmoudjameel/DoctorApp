import { SET_COUNTRIES, BASE_URL } from '../constants';


  export const fetchCountries = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/settings/api/countries',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: SET_COUNTRIES, countries:resData,});
    }catch(err){
        throw err;
      }
    };
  };
  