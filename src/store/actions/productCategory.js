import { PRODUCT_CATEGORY, BASE_URL } from '../constants';
import ProductCategory from '../../models/productCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const fetchProductCategory = () => {
    return async dispatch => {
      // any async code you want!
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(
        BASE_URL+'/settings/api/productcategory',{
          headers: {
            Authorization:"Token "+token
          },
        }
      );
  
      const resData = await response.json();
      
      const loadedProductsCategory = [];
      for(const key in resData){
          
          loadedProductsCategory.push(
              new ProductCategory(
                  resData[key].id,
                  resData[key].name
              )
          )
          
      }
  
      dispatch({ type: PRODUCT_CATEGORY, productCategories:loadedProductsCategory});
    };
  };
  