
import {INSURANCE_EMPLOYEER_COMANIES} from '../constants';
const initialState = {
    employers:[],
}


export default(state = initialState, action) => {
    switch (action.type){
        case INSURANCE_EMPLOYEER_COMANIES:
            return{
                employers:action.employers
            };
    }
    return state;
}

 