import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import AppHeader from './UI/AppHeader'
import Contact from './UI/Contact'
import Contacts from './UI/Contacts'
import Credential from './UI/Credential'
import Credentials from './UI/Credentials'
import Home from './UI/Home'
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

  // Update theme
  const updateTheme = (update) => {
    return setTheme({ ...theme, ...update })
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
    console.log(undoKey)
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
    setLogoPath(
      window.location.origin + '/assets/uploads/fashion-logo-design.jpg'
    )
  }

  const contacts = [
    {
      id: 1,
      mpid: '34537657',
      demographics: {
        first_name: 'John',
        middle_name: null,
        last_name: 'Doe',
        date_of_birth: '2001-08-25',
        gender: 'male',
        phone: '123-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Anytown',
          state: 'PA',
          zip_code: '17101',
          country: 'United States',
        },
      },
      connection_status: 'Connected',
      credential_status: 'None',
    },
    {
      id: 2,
      mpid: '34537912',
      demographics: {
        first_name: 'Sherry',
        middle_name: null,
        last_name: 'Smith',
        date_of_birth: '1967-08-25',
        gender: 'female',
        phone: '567-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Anytown',
          state: 'TX',
          zip_code: '34101',
          country: 'United States',
        },
      },
      connection_status: 'Connected',
      credential_status: 'None',
    },
    {
      id: 3,
      mpid: '',
      demographics: {
        first_name: 'Carlos',
        middle_name: 'Ray',
        last_name: 'Norris',
        date_of_birth: '1940-03-10',
        gender: 'male',
        phone: '567-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Ausitn',
          state: 'TX',
          zip_code: '34101',
          country: 'United States',
        },
      },
      connection_status: 'Disconnected',
      credential_status: 'None',
    },
  ]

  const credentials = [
    {
      id: 1,
      name: 'COVID-19 Test',
      date_issued: '2020-08-25 03:11:33',
      status: 'Accepted',
      result: 'negative',
      normality: 'normal',
      result_status: 'determined',
      comment: 'Good to go to the Bahamas!',
      date_time_of_message: '2001-08-25 03:11:33',
      sending_facility: 'Bronx RHIO',
      ordering_facility_name: 'Bronx RHIO Travel Dept.',
      ordering_facility_address: '456 E. 200 N. Bronx',
      performing_lab: 'Lab 2345',
      visit_location: '123 S. 200 W. Brooklyn',
      lab_order_id: '12345',
      lab_code: '67890',
      lab_coding_qualifer: 'PCR',
      lab_description: 'COVID-19 swab test',
      lab_specimen_collected_date: '2020-08-05',
      observation_date_time: '14:27',
      mpid: '34537912',
      patient_local_id: '1',
      patient_first_name: 'Sherry',
      patient_last_name: 'Smith',
      patient_date_of_birth: '1967-08-25',
      patient_gender_legal: 'female',
      patient_phone: '567-456-7890',
      patient_street_address: '123 Main St',
      patient_city: 'Anytown',
      patient_state: 'TX',
      patient_postalcode: '34101',
      patient_country: 'United States',
    },
    {
      id: 2,
      name: 'COVID-19 Test',
      date_issued: '2020-08-27 03:11:33',
      status: 'Offered',
      result: 'positive',
      normality: 'normal',
      result_status: 'determined',
      comment: 'Uh-oh!',
      date_time_of_message: '2001-08-25 03:11:33',
      sending_facility: 'Bronx RHIO',
      ordering_facility_name: 'Bronx RHIO Travel Dept.',
      ordering_facility_address: '456 E. 200 N. Bronx',
      performing_lab: 'Lab 2345',
      visit_location: '123 S. 200 W. Brooklyn',
      lab_order_id: '12345',
      lab_code: '67890',
      lab_coding_qualifer: 'PCR',
      lab_description: 'COVID-19 swab test',
      lab_specimen_collected_date: '2020-09-14',
      observation_date_time: '14:27',
      mpid: '34537912',
      patient_local_id: '1',
      patient_first_name: 'Sherry',
      patient_last_name: 'Smith',
      patient_date_of_birth: '1967-08-25',
      patient_gender_legal: 'female',
      patient_phone: '567-456-7890',
      patient_street_address: '123 Main St',
      patient_city: 'Anytown',
      patient_state: 'TX',
      patient_postalcode: '34101',
      patient_country: 'United States',
    },
  ]

  return (
    <ThemeProvider theme={theme}>
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
                    <Home contacts={contacts} />
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
                    <Contacts history={history} contacts={contacts} />
                  </Main>
                </Frame>
              )
            }}
            contacts={contacts}
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
                      contact={match.params.contactId}
                      contacts={contacts}
                      credentials={credentials}
                    />
                  </Main>
                </Frame>
              )
            }}
          />
          <Route
            path="/contacts/invitations"
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
