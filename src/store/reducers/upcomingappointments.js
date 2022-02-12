import {SET_UPCOMING_DOCTOR_APPOINTMENTS} from '../constants';
const initialState = {
    upcomingAppointments:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_UPCOMING_DOCTOR_APPOINTMENTS:
            return{
                upcomingAppointments:action.upcomingAppointments,
            };
    }
    return state;
}