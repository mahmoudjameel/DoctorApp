import { SET_COSMETICS,SET_COSMETICS_CATEGORIES,BASE_URL,SET_COSMETICS_DETAILS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchCosmetics = () => {
    return async dispatch => {
      // any async code you want!      
      try{const response = await fetch(
        BASE_URL+'/cosmetic/api',{
        }
      );
        if (!response.ok) {
            
        throw new Error('Something went wrong!');
      }
      const resData = await response.json(); 
      
      
      dispatch({ type: SET_COSMETICS, cosmetics:resData });
    }
      
      catch(err){
        throw err;
      }
    };
};

export const fetchCosmeticsCategories = ()=>{
  return async dispatch=>{
    try{const response = await fetch(
      BASE_URL+'/cosmetic/api/categories',{
      }
    );
      if (!response.ok) {

      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    console.log(resData);
    
    
    dispatch({ type: SET_COSMETICS_CATEGORIES, cosmeticsCategories:resData });
  }
    
    catch(err){
      throw err;
    }
  };
};
export const fetchCosmeticsDetails = (id)=>{
  
  return async dispatch=>{
    try{const response = await fetch(
      BASE_URL+'/cosmetic/api/'+id,{
      }
    );
      if (!response.ok) {
          
      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    
    
    dispatch({ type: SET_COSMETICS_DETAILS, cosmeticDetails:resData });
  }
    
    catch(err){
      throw err;
    }
  };
};