import { PRODUCT_CATEGORY } from '../constants/index';
import { ProductCategory } from '../../models/productCategory';
import PRODUCT_CATEGORIES from '../../data/dummy-data'


const initialState = {
    availableProductCategories:null
}

export default(state= initialState,action)=>{
    switch (action.type){
        case PRODUCT_CATEGORY:
            return{
                availableProductCategories:action.productCategories
            };
    }
    return state;
};