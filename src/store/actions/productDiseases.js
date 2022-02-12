import { SET_PRODUCT_DISEASES,BASE_URL } from '../constants';
import Product from '../../models/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import *as favouritesAction from './favourites';

export const fetchProductsDiseases = (user_id) => {
    return async dispatch => {
      // any async code you want!
      const token = await AsyncStorage.getItem('token')
      try{const response = await fetch(
        BASE_URL+'/api/productdiseases',{
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
      
      
      dispatch({ type: SET_PRODUCT_DISEASES, product_diseases:resData });

      
      dispatch(favouritesAction.fetchFavouriteList(user_id));
    }
      
      catch(err){
        throw err;
      }
    };
  };
