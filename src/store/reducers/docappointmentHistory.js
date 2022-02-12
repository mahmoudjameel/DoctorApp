
import {SET_DOCTOR_APPOINTMENTS_HISTORY} from '../constants';
const initialState = {
    doctorAppointmentsHistory:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DOCTOR_APPOINTMENTS_HISTORY:
            return{
                doctorAppointmentsHistory:action.doctorAppointmentsHistory,
            };
    }
    return state;
}

 