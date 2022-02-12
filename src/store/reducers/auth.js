import {LOADING,
        FAIL,
        SUCCESS,
        ALERT_DISPOSE,ONSUCCESS} from '../constants'
export default (state = {}, action) => {
    switch (action.type) {
        case LOADING:
            return {
              isLoading: true,
              isError: false,
              isSuccess: false,
              errors: null,

            }

        case SUCCESS:
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null
            }
            
        case FAIL:
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.error
            }
        case ALERT_DISPOSE:
              return{
                isLoading: false,
                isError: false,
                isSuccess: false,
                errors: action.error
              }
        case ONSUCCESS:
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
