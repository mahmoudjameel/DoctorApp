import { SET_PESTICIDE,SET_PESTICIDE_CATEGORIES,BASE_URL,SET_PESTICIDE_DETAILS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchPesticides = () => {
    return async dispatch => {
      // any async code you want!      
      try{const response = await fetch(
        BASE_URL+'/pesticide/api',{
        }
      );
        if (!response.ok) {
            
        throw new Error('Something went wrong!');
      }
      const resData = await response.json(); 
      
      
      dispatch({ type: SET_PESTICIDE, pesticides:resData });
    }
      
      catch(err){
        throw err;
      }
    };
};

export const fetchPesticideCategories = ()=>{
  return async dispatch=>{
    try{const response = await fetch(
      BASE_URL+'/pesticide/api/categories',{
      }
    );
      if (!response.ok) {
          
      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    
    
    dispatch({ type: SET_PESTICIDE_CATEGORIES, pesticideCategories:resData });
  }
    
    catch(err){
      throw err;
    }
  };
};
export const fetchPesticideDetails = (id)=>{
  
  return async dispatch=>{
    try{const response = await fetch(
      BASE_URL+'/pesticide/api/'+id,{
      }
    );
      if (!response.ok) {
          
      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    
    
    dispatch({ type: SET_PESTICIDE_DETAILS, pesticideDetails:resData });
  }
    
    catch(err){
      throw err;
    }
  };
};