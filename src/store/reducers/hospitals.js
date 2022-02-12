
import {SET_HOSPITALS} from '../constants';
const initialState = {
    hospitals:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_HOSPITALS:
            return{
                hospitals:action.hospitals
            };
    }
    return state;
}

 