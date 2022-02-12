
import {SET_JOBTYPES} from '../constants';
const initialState = {
    jobTypes:null,
}


export default(state = initialState, action) => {
    switch (action.type){
        case SET_JOBTYPES:
            return{
                jobTypes:action.jobTypes
            };
    }
    return state;
}

 