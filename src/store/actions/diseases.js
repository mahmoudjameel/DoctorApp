import { DISEASE_CATEGORY,SET_DISEASES, BASE_URL } from '../constants';



export const fetchDiseaseCategories = () => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/settings/api/diseasescategory',{
        }
      );
      
      
      if (!response.ok) {
        const resData = await response.json();
        
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      dispatch(fetchDiseases({diseasesCategories:resData}));
     
    }catch(err){
        throw err;
      }
    };
  };

  export const fetchDiseases = ({diseasesCategories}) => {
    return async dispatch => {
      // any async code you want!
      try{const response = await fetch(
        BASE_URL+'/diseases/diseases/api',{
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();        
      dispatch({ type: SET_DISEASES, diseases:resData ,diseasesCategories:diseasesCategories});
    }catch(err){
        throw err;
      }
    };
  };
  