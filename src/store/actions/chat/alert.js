export const TOGOLE_ALERT = 'TOGOLE_ALERT'
export const SET_NAIVGATION = 'SET_NAVIGATION'
export const SET_CALLER_NAME = 'SET_CALLER_NAME'

export const togoleAlert = show => ({ type: TOGOLE_ALERT, show: show })
export const setNavigation = navigation => ({ type: SET_NAIVGATION, navigation: navigation })
export const setCallerName = name => ({ type: SET_CALLER_NAME, name: name })

