
import {SET_CONSULTATIONS} from '../constants';
const initialState = {
    consultations:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_CONSULTATIONS:
            return{
                consultations:action.consultations,
            };
    }
    return state;
}

 