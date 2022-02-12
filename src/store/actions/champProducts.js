import { CHAMP_PRODUCTS} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProductsByBarcode = (barcode) => {
    return async dispatch => {
      console.log(barcode);
      // any async code you want!
      try{const response = await fetch(
        'https://chompthis.com/api/v2/food/branded/barcode.php?api_key=AzytdeSquiOMuvoH&code='+barcode,{
        }

      );
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }
     
      const resData = await response.json(); 
      console.log(resData);
      dispatch({ type: CHAMP_PRODUCTS, products:resData });
    }
      
      catch(err){
        throw err;
      }
    };
  };
  
  export const fetchProductsByName = (name) => {
    return async dispatch => {
      console.log(name);
      
      // any async code you want!
      try{const response = await fetch(
        'https://chompthis.com/api/v2/food/branded/name.php?api_key=AzytdeSquiOMuvoH&name='+name+'&limit=10&page=1',{
        }

      );
      console.log(response);
      
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }
     
      const resData = await response.json(); 
      console.log(resData);
      dispatch({ type: CHAMP_PRODUCTS, products:resData });
    }
      
      catch(err){
        throw err;
      }
    };
  };
  
  export const fetchProductsByCategories = (categories) => {
    return async dispatch => {
      console.log(categories);
      
      // any async code you want!
      try{const response = await fetch(
        'https://chompthis.com/api/v2/food/branded/search.php?api_key=AzytdeSquiOMuvoH&category='+categories+'&limit=10&page=1',{
        }

      );
      console.log(response);
      
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }
     
      const resData = await response.json(); 
      console.log(resData);
      dispatch({ type: CHAMP_PRODUCTS, products:resData });
    }
      
      catch(err){
        throw err;
      }
    };
  };

  export const fetchProductsByBrand = (brand) => {
    return async dispatch => {
      
      // any async code you want!
      try{const response = await fetch(
        'https://chompthis.com/api/v2/food/branded/search.php?brand='+brand+'&limit=10&page=1&api_key=AzytdeSquiOMuvoH',{
        }

      );
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }
     
      const resData = await response.json(); 
      console.log(resData);
      dispatch({ type: CHAMP_PRODUCTS, products:resData });
    }
      
      catch(err){
        throw err;
      }
    };
  };

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
      console.log(diseasesCategories);
    }catch(err){
        throw err;
      }
    };
  };