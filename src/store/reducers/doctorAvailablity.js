
import {SET_DOCTOR_AVAILABLITY} from '../constants';
const initialState = {
    doctorAvailablity:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DOCTOR_AVAILABLITY:
            return{
                doctorAvailablity:action.doctorAvailablity,
            };
    }
    return state;
}

 