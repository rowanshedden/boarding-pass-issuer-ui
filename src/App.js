import React, { useState, useEffect, useRef } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import AppHeader from './UI/AppHeader'
import Contact from './UI/Contact'
import Contacts from './UI/Contacts'
import Credential from './UI/Credential'
import Credentials from './UI/Credentials'
import Home from './UI/Home'
import Notification from './UI/Notification'
import Settings from './UI/Settings'

import logo from './logo.gif'

import './App.css'

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
const Main = styled.main`
  flex: 9;
  padding: 30px;
`

function App() {
  //(JamesKEbert)Note: We may want to abstract the websockets out into a high-order component for better abstraction, especially potentially with authentication/authorization

  //Websocket reference hook
  const controllerSocket = useRef()

  //used for websocket auto reconnect
  const [websocket, setWebsocket] = useState(false)

  //Perform First Time Setup. Connect to Controller Server via Websockets
  useEffect(() => {
    //console.log('Performing first time setup')

    let url = new URL('/api/ws', window.location.href)
    url.protocol = url.protocol.replace('http', 'ws')

    //console.log(url)
    //console.log(websocket)
    controllerSocket.current = new WebSocket(url.href)
  }, [websocket])

  //Define Websocket event listeners
  useEffect(() => {
    //Perform operation on websocket open
    controllerSocket.current.onopen = () => {
      //console.log('Websocket Connection established, requesting data')
      sendMessage('CONTACTS', 'GET_ALL', {
        additional_tables: ['Demographic', 'Passport'],
      })

      sendMessage('CREDENTIALS', 'GET_ALL', {})
      sendMessage('SETTINGS', 'GET_THEME', {})
    }

    controllerSocket.current.onclose = (event) => {
      //console.log('Websocket Connection Closed', event)

      //Auto Reopen websocket connection
      //(JamesKEbert)TODO: Converse on sessions, session timeout and associated UI
      setWebsocket(!websocket)
    }

    //Error Handler
    controllerSocket.current.onerror = (event) => {
      //console.error('Websocket error:', event)

      setNotification('Client Error - Websockets')
      setNotificationType('error')
      setNotificationState('open')
    }

    //Receive new message from Controller Server
    controllerSocket.current.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data)
      //console.log('New Websocket Message:', parsedMessage)

      messageHandler(
        parsedMessage.context,
        parsedMessage.type,
        parsedMessage.data
      )
    }
  })

  //Send a message to the Controller server
  function sendMessage(context, type, data = {}) {
    controllerSocket.current.send(JSON.stringify({ context, type, data }))
  }

  //Handle inbound messages
  const messageHandler = async (context, type, data = {}) => {
    try {
      console.log(`New Message with context: '${context}' and type: '${type}'`)
      switch (context) {
        case 'ERROR':
          switch (type) {
            case 'SERVER_ERROR':
              setNotification(
                `Server Error - ${data.errorCode} \n Reason: '${data.errorReason}'`
              )
              setNotificationType('error')
              setNotificationState('open')

              break
            default:
              //console.error(`Unrecognized Message Type: ${type}`)

              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`
              )
              setNotificationType('error')
              setNotificationState('open')
              break
          }

          break
        case 'INVITATIONS':
          switch (type) {
            case 'INVITATION':
              //console.log(data)

              setQRCodeURL(data.invitation_record.invitation_url)

              break
            case 'SINGLE_USE_USED':
              //console.log(data)

              setQRCodeURL('')
              break
            default:
              //console.error(`Unrecognized Message Type: ${type}`)

              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`
              )
              setNotificationType('error')
              setNotificationState('open')
              break
          }

          break
        case 'CONTACTS':
          switch (type) {
            case 'CONTACTS':
              let oldContacts = contacts
              let newContacts = data.contacts
              let updatedContacts = []

              // Loop through the new contacts and check them against the existing array
              newContacts.forEach((newContact) => {
                oldContacts.forEach((oldContact, index) => {
                  if (
                    oldContact !== null &&
                    newContact !== null &&
                    oldContact.contact_id === newContact.contact_id
                  ) {
                    // If you find a match, delete the old copy from the old array
                    oldContacts.splice(index, 1)
                  }
                })
                updatedContacts.push(newContact)
              })

              // When you reach the end of the list of new contacts, simply add any remaining old contacts to the new array
              updatedContacts = [...updatedContacts, ...oldContacts]

              // Sort the array by data created, newest on top
              updatedContacts.sort((a, b) =>
                a.created_at < b.created_at ? 1 : -1
              )

              setContacts(updatedContacts)

              break
            default:
              //console.error(`Unrecognized Message Type: ${type}`)

              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`
              )
              setNotificationType('error')
              setNotificationState('open')
              break
          }

          break
        case 'CREDENTIALS':
          switch (type) {
            case 'CREDENTIALS':
              let oldCredentials = credentials
              let newCredentials = data.credential_records
              let updatedCredentials = []

              // Loop through the new credentials and check them against the existing array
              newCredentials.forEach((newCredential) => {
                oldCredentials.forEach((oldCredential, index) => {
                  if (
                    oldCredential.credential_exchange_id ===
                    newCredential.credential_exchange_id
                  ) {
                    // If you find a match, delete the old copy from the old array
                    oldCredentials.splice(index, 1)
                  }
                })
                updatedCredentials.push(newCredential)
              })

              // When you reach the end of the list of new credentials, simply add any remaining old credentials to the new array
              updatedCredentials = [...updatedCredentials, ...oldCredentials]

              // Sort the array by data created, newest on top
              updatedCredentials.sort((a, b) =>
                a.created_at < b.created_at ? 1 : -1
              )

              setCredentials(updatedCredentials)

              break
            default:
              //console.error(`Unrecognized Message Type: ${type}`)

              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`
              )
              setNotificationType('error')
              setNotificationState('open')
              break
          }

          break
        case 'SETTINGS':
          switch (type) {
            case 'THEME_SETTINGS':
              //console.log(data)
              setTheme(data.value)

              break
            default:
              //console.error(`Unrecognized Message Type: ${type}`)

              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`
              )
              setNotificationType('error')
              setNotificationState('open')
              break
          }

          break
        default:
          //console.error(`Unrecognized Message Context: ${context}`)

          setNotification(
            `Error - Unrecognized Websocket Message Context: ${context}`
          )
          setNotificationType('error')
          setNotificationState('open')
          break
      }
    } catch (error) {
      //console.error('Error In Websocket Message Handling', error)

      setNotification('Client Error - Websockets')
      setNotificationType('error')
      setNotificationState('open')
    }
  }

  const defaultTheme = {
    primary_color: '#0068B6',
    secondary_color: '#00B0F1',
    neutral_color: '#808080',
    negative_color: '#e33636',
    warning_color: '#ff8c42',
    positive_color: '#4CB944',
    text_color: '#555',
    text_light: '#fff',
    border: '#e3e3e3',
    drop_shadow: '3px 3px 3px rgba(0, 0, 0, 0.3)',
    background_primary: '#fff',
    background_secondary: '#f5f5f5',
  }

  // Fetch the initial state from DB
  const [theme, setTheme] = useState(defaultTheme)

  // Logo change test state
  const [logoPath, setLogoPath] = useState(logo)

  // Styles to change array
  // const [resource, setResource] = useState([])
  const [stylesArray, setStylesArray] = useState([])

  // Update theme state locally
  const updateTheme = (update) => {
    return setTheme({ ...theme, ...update })
  }

  // Update theme in the database
  const saveTheme = () => {
    sendMessage('SETTINGS', 'SET_THEME', theme)
  }

  const addStylesToArray = (key) => {
    let position = stylesArray.indexOf(key)
    //if cannot find indexOf style
    if (!~position) {
      setStylesArray((oldArray) => [...oldArray, `${key}`])
    }
  }

  const removeStylesFromArray = (undoKey) => {
    // removing a style from an array of styles
    let index = stylesArray.indexOf(undoKey)
    if (index > -1) {
      stylesArray.splice(index, 1)
      setStylesArray(stylesArray)
    }
  }

  // Undo theme change
  const undoStyle = (undoKey) => {
    if (undoKey !== undefined) {
      for (let key in defaultTheme)
        if ((key = undoKey)) {
          const undo = { [`${key}`]: defaultTheme[key] }
          return setTheme({ ...theme, ...undo })
        }
    }
  }

  //Change logo test
  function changeLogo() {
    setLogoPath(window.location.origin + '/assets/uploads/logo.gif')
  }

  const [contacts, setContacts] = useState([])
  const [credentials, setCredentials] = useState([])
  const [QRCodeURL, setQRCodeURL] = useState('')

  const [notification, setNotification] = useState('')
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  return (
    <ThemeProvider theme={theme}>
      <Notification
        type={notificationType}
        message={notification}
        state={notificationState}
        closeNotification={closeNotification}
      ></Notification>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={({ match }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <Home sendRequest={sendMessage} QRCodeURL={QRCodeURL} />
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path="/invitations"
            render={({ match }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <p>Invitations</p>
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path="/contacts"
            exact
            render={({ match, history }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    {/*(JamesKEbert)Note:sendRequest Prop the technique to use to send websocket messages to the Controller Server in other components:*/}
                    <Contacts
                      history={history}
                      sendRequest={sendMessage}
                      contacts={contacts}
                      QRCodeURL={QRCodeURL}
                    />
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path={`/contacts/:contactId`}
            render={({ match, history }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <Contact
                      history={history}
                      sendRequest={sendMessage}
                      contactId={match.params.contactId}
                      contacts={contacts}
                      credentials={credentials}
                    />
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path="/credentials"
            exact
            render={({ match, history }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <Credentials history={history} credentials={credentials} />
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path={`/credentials/:credentialId`}
            render={({ match, history }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <Credential
                      history={history}
                      credential={match.params.credentialId}
                      credentials={credentials}
                    />
                  </Main>
                </Frame>
              )
            }}
            credentials={credentials}
          />
          <Route
            path="/verification"
            render={({ match }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <p>Verification</p>
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path="/messages"
            render={({ match }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <p>Messages</p>
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path="/settings"
            render={({ match }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader logoPath={logoPath} match={match} />
                  <Main>
                    <Settings
                      updateTheme={updateTheme}
                      saveTheme={saveTheme}
                      undoStyle={undoStyle}
                      changeLogo={changeLogo}
                      stylesArray={stylesArray}
                      addStylesToArray={addStylesToArray}
                      removeStylesFromArray={removeStylesFromArray}
                    />
                  </Main>
                </Frame>
              )
            }}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
