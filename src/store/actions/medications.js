import { SET_MEDICATIONS,SET_MEDICATIONS_CATEGORIES,BASE_URL,SET_MEDICATIONS_DETAILS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchMedications = () => {
    return async dispatch => {
      // any async code you want!      
      try{const response = await fetch(
        BASE_URL+'/medication/api',{
        }
      );
        if (!response.ok) {
            
        throw new Error('Something went wrong!');
      }
      const resData = await response.json(); 
      
      
      dispatch({ type: SET_MEDICATIONS, medications:resData });
    }
      
      catch(err){
        throw err;
      }
    };
};

export const fetchMedicationCategories = ()=>{
  return async dispatch=>{
    try{const response = await fetch(
      BASE_URL+'/medication/api/categories',{
      }
    );
      if (!response.ok) {
          
      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    
    
    dispatch({ type: SET_MEDICATIONS_CATEGORIES, medicationCategories:resData });
  }
    
    catch(err){
      throw err;
    }
  };
};
export const fetchMedicationDetails = (id)=>{
  
  return async dispatch=>{
    try{const response = await fetch(
      BASE_URL+'/medication/api/'+id,{
      }
    );
      if (!response.ok) {
          
      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    
    
    dispatch({ type: SET_MEDICATIONS_DETAILS, medicationDetails:resData });
  }
    
    catch(err){
      throw err;
    }
  };
};