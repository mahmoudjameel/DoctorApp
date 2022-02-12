
import { PERIODS,CHOICES } from '../constants';
const initialState = {
    choices:null,
    periods:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case PERIODS:
            return{
                periods:action.periods,
            };
    }
    return state;
}

 