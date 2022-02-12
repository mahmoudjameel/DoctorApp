
import {SET_PRESCRIPTIONS} from '../constants';
const initialState = {
    prescriptions:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PRESCRIPTIONS:
            return{
                prescriptions:action.prescriptions,
            };
    }
    return state;
}

 