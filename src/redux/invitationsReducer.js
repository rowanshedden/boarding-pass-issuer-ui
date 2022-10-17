const initialState = {
  invitations: [],
  invitationURL: '',
}

const SET_INVITATIONS = 'SET_INVITATIONS'
const SET_INVITATION_URL = 'SET_INVITATION_URL'
const CLEAR_INVITATIONS = 'CLEAR_INVITATIONS'

export function setInvitations(invitations) {
  return {
    type: SET_INVITATIONS,
    payload: invitations,
  }
}
export function setInvitationURL(invitation) {
  return {
    type: SET_INVITATION_URL,
    payload: invitation,
  }
}
export function clearInvitationsState() {
  return {
    type: CLEAR_INVITATIONS,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_INVITATIONS:
      return { ...state, invitations: action.payload }

    case SET_INVITATION_URL:
      return { ...state, invitationURL: action.payload }

    case CLEAR_INVITATIONS:
      return initialState

    default:
      return state
  }
}
