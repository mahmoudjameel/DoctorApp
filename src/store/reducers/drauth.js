import {DRLOADING,
    DRFAIL,
    DRSUCCESS,
    DR_ALERT_DISPOSE,DRONSUCCESS} from '../constants'
export default (state = {}, action) => {
switch (action.type) {
    case DRLOADING:
        return {
          isLoading: true,
          isError: false,
          isSuccess: false,
          errors: null,

        }

    case DRSUCCESS:
        return {
            isLoading: false,
            isError: false,
            isSuccess: true,
            errors: null
        }
        
    case DRFAIL:
        return {
            isLoading: false,
            isError: true,
            isSuccess: false,
            errors: action.error
        }
    case DR_ALERT_DISPOSE:
          return{
            isLoading: false,
            isError: false,
            isSuccess: false,
            errors: action.error
          }
    case DRONSUCCESS:
        return{
            isLoading: false,
            isError: false,
            isSuccess: false,
            errors: null
        }  
          
      default:
          return state;
    }
}
