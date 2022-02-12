
import { SET_PESTICIDE } from '../constants';
const initialState = {
    pesticides:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PESTICIDE:
            return{
                pesticides:action.pesticides,
            };
    }
    return state;
}

 