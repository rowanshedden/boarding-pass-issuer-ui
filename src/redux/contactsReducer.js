const initialState = {
  contacts: {},
  pendingConnections: {},
  contactSelected: '',
}

const SET_CONTACTS = 'SET_CONTACTS'
const SET_PENDING_CONNECTIONS = 'SET_PENDING_CONNECTIONS'
const SET_CONTACT_SELECTED = 'SET_CONTACT_SELECTED'
const CLEAR_CONTACTS_STATE = 'CLEAR_CONTACTS_STATE'

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  }
}

export function setPendingConnections(connections) {
  return {
    type: SET_PENDING_CONNECTIONS,
    payload: connections,
  }
}

export function setContactSelected(contactSelected) {
  return {
    type: SET_CONTACT_SELECTED,
    payload: contactSelected,
  }
}

export function clearContactsState() {
  return {
    type: CLEAR_CONTACTS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload }

    case SET_PENDING_CONNECTIONS:
      return { ...state, pendingConnections: action.payload }

    case SET_CONTACT_SELECTED:
      return { ...state, contactSelected: action.payload }

    case CLEAR_CONTACTS_STATE:
      return initialState

    default:
      return state
  }
}
