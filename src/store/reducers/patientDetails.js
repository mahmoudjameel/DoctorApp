
import {SET_PATIENT_DETAILS} from '../constants';
const initialState = {
    patientDetails:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PATIENT_DETAILS:
            return{
                patientDetails:action.patientDetails,
            };
    }
    return state;
}
