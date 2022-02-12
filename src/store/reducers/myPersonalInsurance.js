import {SET_PERSONAL_INSURANCE} from '../constants';
const initialState = {
    myPersonallInsurance:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_PERSONAL_INSURANCE:
            return{
                myPersonallInsurance:action.myPersonallInsurance
            };
    }
    return state;
}

 