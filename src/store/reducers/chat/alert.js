import {
  TOGOLE_ALERT,
  SET_CALLER_NAME,
  SET_NAIVGATION,
} from '../../actions/chat/alert';

const initialState = {
  name: '',
  navigation: {},
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGOLE_ALERT:
        console.log({
            ...state,
            show: action.show,
          })
      return {
        ...state,
        show: action.show,
      };
    case SET_NAIVGATION:
      return {
        ...state,
        navigation: action.navigation,
      };
    case SET_CALLER_NAME:
      return {
        ...state,
        name: action.name,
      };

    default:
      return state;
  }
};
