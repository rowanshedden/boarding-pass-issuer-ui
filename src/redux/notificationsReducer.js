const initialState = {
  errorMessage: null,
  successMessage: null,
  warningMessage: null,
}

const SET_ERROR_MESSAGE = 'ERROR_MESSAGE'
const SET_SUCCESS_MESSAGE = 'SUCCESS_MESSAGE'
const SET_WARNING_MESSAGE = 'WARNING_MESSAGE'
const CLEAR_NOTIFICATION_STATE = 'CLEAR_NOTIFICATION_STATE'

export function setErrorMessage(errorMessage) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  }
}

export function setSuccessMessage(successMessage) {
  return {
    type: SET_SUCCESS_MESSAGE,
    payload: successMessage,
  }
}

export function setWarningMessage(warningMessage) {
  return {
    type: SET_WARNING_MESSAGE,
    payload: warningMessage,
  }
}

export function clearNotificationsState() {
  return {
    type: CLEAR_NOTIFICATION_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }

    case SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }

    case SET_WARNING_MESSAGE:
      return { ...state, warningMessage: action.payload }

    case CLEAR_NOTIFICATION_STATE:
      return initialState

    default:
      return state
  }
}
