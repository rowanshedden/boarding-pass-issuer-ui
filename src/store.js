import { createStore, combineReducers } from 'redux'

// import { composeWithDevTools } from 'redux-devtools-extension'

import loginReducer from './redux/loginReducer'
import contactsReducer from './redux/contactsReducer'
import usersReducer from './redux/usersReducer'
import settingsReducer from './redux/settingsReducer'
import presentationsReducer from './redux/presentationsReducer'
import credentialsReducer from './redux/credentialsReducer'
import notificationsReducer from './redux/notificationsReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  contacts: contactsReducer,
  users: usersReducer,
  settings: settingsReducer,
  presentations: presentationsReducer,
  credentials: credentialsReducer,
  notifications: notificationsReducer,
})

export default createStore(
  rootReducer
  // composeWithDevTools(),
)
