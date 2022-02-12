
import {SET_DISEASES} from '../constants';
const initialState = {
    diseasesCategories:null,
    diseases:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DISEASES:
            return{
                diseasesCategories:action.diseasesCategories,
                diseases:action.diseases
            };
    }
    return state;
}

 