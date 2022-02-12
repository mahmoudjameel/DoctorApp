import { SET_PRODUCTS,PRODUCT_DETAILS,BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import *as favouritesAction from './favourites';

export const fetchProducts = (user_id) => {
    return async dispatch => {
      
      // any async code you want!
      const token = await AsyncStorage.getItem('token')
      try{const response = await fetch(
        BASE_URL+'/api/products',{
          headers: {
            Authorization:"Token "+token
          },
        }

      );
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      
      const resData = await response.json(); 
      
      // const loadedProducts = [];
      // for(const key in resData){
          
      //     loadedProducts.push(
      //         new Product(
      //             resData[key].id,
      //             resData[key].product_name,
      //             resData[key].product_key,
      //             resData[key].description,
      //             resData[key].product_category,
      //             resData[key].disease_category,
      //             resData[key].period,
      //             resData[key].choice,
      //         )
      //     )
          
      // }
      
      
      dispatch({ type: SET_PRODUCTS, products:resData });

      
      dispatch(favouritesAction.fetchFavouriteList(user_id));
    }
      
      catch(err){
        throw err;
      }
    };
  };
  
export const fetchContentList =(id) => {
  return async dispatch => {
    // any async code you want!
    const token = await AsyncStorage.getItem('token')
    try{const response = await fetch(
      BASE_URL+'/api/product/details',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:"Token "+token
        },
        body: JSON.stringify({
          id:id,
      })
      }
      
    );
    
      if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await response.json(); 
    dispatch({ type: PRODUCT_DETAILS, productDetails:resData });
    
    }
    catch(err){
      throw err;
    }
  };
};