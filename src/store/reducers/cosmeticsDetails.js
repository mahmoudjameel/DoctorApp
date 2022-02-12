
import { SET_COSMETICS_DETAILS } from '../constants';
const initialState = {
    cosmeticDetails:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_COSMETICS_DETAILS:
            return{
                cosmeticDetails:action.cosmeticDetails,
            };
    }
    return state;
}

 