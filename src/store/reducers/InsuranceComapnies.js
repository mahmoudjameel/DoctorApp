
import {INSURANCE_COMPANIES} from '../constants';
const initialState = {
    insuranceCompanies:[],
}


export default(state = initialState, action) => {
    switch (action.type){
        case INSURANCE_COMPANIES:
            return{
                insuranceCompanies:action.insuranceCompanies
            };
    }
    return state;
}

 