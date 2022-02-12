
import { SET_PESTICIDE_DETAILS } from '../constants';
const initialState = {
    pesticideDetails:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PESTICIDE_DETAILS:
            return{
                pesticideDetails:action.pesticideDetails,
            };
    }
    return state;
}

 