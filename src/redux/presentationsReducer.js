const initialState = {
  presentationReports: [],
}

const SET_PRESENTATION_REPORTS = 'SET_PRESENTATION_REPORTS'
const CLEAR_PRESENTATIONS_STATE = 'CLEAR_PRESENTATIONS_STATE'

export function setPresentationReports(presentationReports) {
  return {
    type: SET_PRESENTATION_REPORTS,
    payload: presentationReports,
  }
}

export function clearPresentationsState() {
  return {
    type: CLEAR_PRESENTATIONS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRESENTATION_REPORTS:
      return { ...state, presentationReports: action.payload }

    case CLEAR_PRESENTATIONS_STATE:
      return initialState

    default:
      return state
  }
}
