
import {SET_DAYS_TIMES} from '../constants';
const initialState = {
    days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    timing:['6AM','7AM'],
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DAYS_TIMES:
            return{
                days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                timing:['6AM','7AM'],
            };
    }
    return state;
}

 