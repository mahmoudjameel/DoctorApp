
import {SET_DOCTORS} from '../constants';
const initialState = {
    doctors:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DOCTORS:
            return{
                doctors:action.doctors
            };
    }
    return state;
}

 