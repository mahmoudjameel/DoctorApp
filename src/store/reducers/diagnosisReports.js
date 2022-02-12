
import {SET_DIGNOSIS_REPORT} from '../constants';
const initialState = {
    dignosisReports:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_DIGNOSIS_REPORT:
            return{
                dignosisReports:action.dignosisReports,
            };
    }
    return state;
}

 