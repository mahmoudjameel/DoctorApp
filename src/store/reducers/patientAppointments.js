
import {SET_PATIENT_APPOINTMENTS} from '../constants';
const initialState = {
    doctorAppointments:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PATIENT_APPOINTMENTS:
            return{
                patientAppointments:action.patientAppointments,
            };
    }
    return state;
}

 