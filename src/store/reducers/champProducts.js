
import { CHAMP_PRODUCTS } from '../constants';
const initialState = {
    champProducts:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case CHAMP_PRODUCTS:
            return{
                champProducts:action.products,
            };
    }
    return state;
}

 