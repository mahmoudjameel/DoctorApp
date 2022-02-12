import { FAVOURITS, BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addFavouritList = (user_id,product_id,period_id,choice_id)=>{
    return async dispatch => {
        // any async code you want!
        const token = await AsyncStorage.getItem('token')
        try{const response = await fetch(
          BASE_URL+'/favourites/api/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:"Token "+token
            },
            body: JSON.stringify({
              user_id:user_id,
              product_id:product_id,
              period_id:period_id,
              choice_id:choice_id
          })
          }
          
        );
        
          if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const resData = await response.json(); 
          dispatch(fetchFavouriteList(id=user_id));
        }
        catch(err){
          throw err;
        }
      };
}


export const fetchFavouriteList =(id) => {
  
    return async dispatch => {
      // any async code you want!
      const token = await AsyncStorage.getItem('token')
      try{const response = await fetch(
        BASE_URL+'/favourites/api/list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:"Token "+token
          },
          body: JSON.stringify({
            user_id:id,
        })
        }
        
      );
      
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json(); 
        dispatch({ type: FAVOURITS, favourites:resData });
      }
      catch(err){
        throw err;
      }
    };
  };