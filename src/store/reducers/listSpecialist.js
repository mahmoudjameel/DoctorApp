
import {LIST_SPECIALIST} from '../constants';
const initialState = {
    specialistList:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case LIST_SPECIALIST:
            return{
                specialistList:action.specialist
            };
    }
    return state;
}

 