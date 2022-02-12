import { UNITS, BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUnits = () => {
    return async dispatch => {
      // any async code you want!
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(
        BASE_URL+'/settings/api/units',{
          headers: {
            Authorization:"Token "+token
          },
        }
      );
  
      const resData = await response.json();
      
      dispatch({ type: UNITS, units:resData});
    };
  };
  