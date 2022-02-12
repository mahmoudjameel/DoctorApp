import {USER_TYPE} from '../constants'

export default (state = {}, action)=>{
    switch (action.type){
        case USER_TYPE:
            return{
                userType:action.userType,
            };
    }
    return state;
}