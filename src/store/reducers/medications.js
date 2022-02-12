
import { SET_MEDICATIONS } from '../constants';
const initialState = {
    medications:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_MEDICATIONS:
            return{
                medications:action.medications,
            };
    }
    return state;
}

 