
import { CHOICES } from '../constants';
const initialState = {
    choices:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case CHOICES:
            return{
                choices:action.choices
            }
    }
    return state;
}

 