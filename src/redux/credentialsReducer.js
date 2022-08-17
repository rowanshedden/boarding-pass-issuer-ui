const initialState = {
  credentials: [],
}

const SET_CREDENTIALS = 'SET_CREDENTIALS'
const CLEAR_CREDENTIALS_STATE = 'CLEAR_CREDENTIALS_STATE'

export function setCredentials(credentials) {
  return {
    type: SET_CREDENTIALS,
    payload: credentials,
  }
}

export function clearCredentialsState() {
  return {
    type: CLEAR_CREDENTIALS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CREDENTIALS:
      return { ...state, credentials: action.payload }

    case CLEAR_CREDENTIALS_STATE:
      return initialState

    default:
      return state
  }
}
