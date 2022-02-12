
import { SET_PRODUCT_DISEASES } from '../constants';
const initialState = {
    product_diseases:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PRODUCT_DISEASES:
            return{
                product_diseases:action.product_diseases,
            };
    }
    return state;
}

 