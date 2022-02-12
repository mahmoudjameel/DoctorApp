
import { SET_MEDICATIONS_DETAILS } from '../constants';
const initialState = {
    medicationDetails:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_MEDICATIONS_DETAILS:
            return{
                medicationDetails:action.medicationDetails,
            };
    }
    return state;
}

 