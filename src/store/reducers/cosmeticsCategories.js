
import { SET_COSMETICS_CATEGORIES } from '../constants';
const initialState = {
    cosmeticsCategories:[]
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_COSMETICS_CATEGORIES:
            return{
                cosmeticsCategories:action.cosmeticsCategories,
            };
    }
    return state;
}

 