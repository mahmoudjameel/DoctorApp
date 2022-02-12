
import { PRODUCT_DETAILS } from '../constants';
const initialState = {
    productDetails:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case PRODUCT_DETAILS:
            return{
                productDetails:action.productDetails,
            };
    }
    return state;
}

 