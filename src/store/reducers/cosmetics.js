
import { SET_COSMETICS } from '../constants';
const initialState = {
    cosmetics:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_COSMETICS:
            return{
                cosmetics:action.cosmetics,
            };
    }
    return state;
}

 