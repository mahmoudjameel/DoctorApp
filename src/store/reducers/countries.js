
import {SET_COUNTRIES} from '../constants';
const initialState = {
    countries:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_COUNTRIES:
            return{
                countries:action.countries
            };
    }
    return state;
}

 