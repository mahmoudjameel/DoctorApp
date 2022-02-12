
import { SET_MEDICATIONS_CATEGORIES } from '../constants';
const initialState = {
    medicationCategories:[]
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_MEDICATIONS_CATEGORIES:
            return{
                medicationCategories:action.medicationCategories,
            };
    }
    return state;
}

 