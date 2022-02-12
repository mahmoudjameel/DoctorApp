export const FETCH_USERS = 'FETCH_USERS'
export const ADD_USERS = 'ADD_USERS'
export const VIDEO_CALL_OPPONENTS = 'VIDEO_CALL_OPPONENTS'


export const fetchUsers = users => ({ type: FETCH_USERS, users })
export const addUsers = users => ({ type: ADD_USERS, users })
export const videoCallOpponentsIds = opponentsIds => ({ type: VIDEO_CALL_OPPONENTS, opponentsIds: opponentsIds })
