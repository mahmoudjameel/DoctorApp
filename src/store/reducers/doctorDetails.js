
import {SET_DOCTOR_DETAILS} from '../constants';
const initialState = {
    doctorDetails:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DOCTOR_DETAILS:
            return{
                doctorDetails:action.doctorDetails,
            };
    }
    return state;
}

 