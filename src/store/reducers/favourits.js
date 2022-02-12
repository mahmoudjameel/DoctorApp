
import { FAVOURITS } from '../constants';
const initialState = {
    favourites:null
}


export default(state = initialState, action) => {
    switch (action.type){
        case FAVOURITS:
            return{
                favourites:action.favourites
            }
    }
    return state;
}

 