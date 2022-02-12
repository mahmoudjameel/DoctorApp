
import { SET_PESTICIDE_CATEGORIES } from '../constants';
const initialState = {
    pesticideCategories:[]
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PESTICIDE_CATEGORIES:
            return{
                pesticideCategories:action.pesticideCategories,
            };
    }
    return state;
}

 