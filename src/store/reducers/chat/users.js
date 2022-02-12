import {
  FETCH_USERS,
  ADD_USERS,
  VIDEO_CALL_OPPONENTS
} from '../../actions/chat/users'

import { fetchUsers } from './reducer-function'

const initialState = {
	userIsLogging: false,
	user: null,
  opponentsIds: null,
  users:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS: {
      let users = fetchUsers(action.users, users)
      return {...state,users}
    }

    case ADD_USERS: {

    }
    case VIDEO_CALL_OPPONENTS: {
			let res = {
				...state,
				opponentsIds: action.opponentsIds,
			}
      return res;
    }


    default:
      return state
  }
}