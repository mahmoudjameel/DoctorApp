import {LOG_OUT} from '../constants'

export default (state , action)=>{
    if (action.type == LOG_OUT){
        state = {}
    }
    return state;
}