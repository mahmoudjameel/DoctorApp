
import {DOCTOR_PRICING} from '../constants';
const initialState = {
    doctorPricing:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case DOCTOR_PRICING:
            return{
                doctorPricing:action.doctorPricing,
            };
    }
    return state;
}

 