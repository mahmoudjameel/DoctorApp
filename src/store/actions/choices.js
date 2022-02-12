import { CHOICES, BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchChoices = () => {
    return async dispatch => {
      // any async code you want!
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(
        BASE_URL+'/settings/api/choices',
        {
          headers: {
            Authorization:"Token "+token
          },
        }
      );
  
      const resData = await response.json();
      
      dispatch({ type: CHOICES, choices:resData});
    };
  };
  