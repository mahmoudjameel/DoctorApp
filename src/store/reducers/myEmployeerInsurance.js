import {SET_EMPLOYEER_INSURANCE} from '../constants';
const initialState = {
    myEmployeerInsurance:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_EMPLOYEER_INSURANCE:
            return{
                myEmployeerInsurance:action.myEmployeerInsurance
            };
    }
    return state;
}

 