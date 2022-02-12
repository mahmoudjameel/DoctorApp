import {SELECT_LANGUAGE} from '../constants'
import {languages} from '../../data/languages'
const initialState = {
    selectdLanguage:languages.en
}
export default (state = initialState, action)=>{
    switch (action.type){
        case SELECT_LANGUAGE:
            return{
                selectdLanguage:action.language,
            };
    }
    return state;
}