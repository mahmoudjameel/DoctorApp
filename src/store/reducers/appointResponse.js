
import {APPOINTMENT_RESPONSE} from '../constants';
const initialState = {
    doctorAppointmentResponse:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case APPOINTMENT_RESPONSE:
            return{
                doctorAppointmentResponse:action.doctorAppointmentResponse,
            };
    }
    return state;
}

 