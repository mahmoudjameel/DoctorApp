import {
    SET_CURRENT_USER,
    UPDATE_CURRENT_USER,
    RESET_CURRENT_USER
  } from '../constants/index'
  
  export default (chatCurrentUser = null, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return action.chatCurrentUser
  
      case UPDATE_CURRENT_USER: {
        const result = Object.assign(chatCurrentUser, action.chatCurrentUser)
        chatCurrentUser = result
        return { ...chatCurrentUser }
      }
  
      case RESET_CURRENT_USER:
        return null
  
      default:
        return chatCurrentUser
    }
  }