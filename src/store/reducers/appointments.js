
import {SET_DOCTOR_APPOINTMENTS} from '../constants';
const initialState = {
    doctorAppointments:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DOCTOR_APPOINTMENTS:
            return{
                doctorAppointments:action.doctorAppointments,
            };
    }
    return state;
}

 