
import {SET_CLINICS} from '../constants';
const initialState = {
    clinics:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_CLINICS:
            return{
                clinics:action.clinics
            };
    }
    return state;
}

 