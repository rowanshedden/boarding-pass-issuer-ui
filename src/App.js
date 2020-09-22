import React from 'react'

import { useContext } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import styled from 'styled-components'
import { ThemeContext, ThemeProvider } from 'styled-components'

import AppHeader from './UI/AppHeader.js'
import Contact from './UI/Contact.js'
import Contacts from './UI/Contacts.js'
import Credential from './UI/Credential.js'
import Credentials from './UI/Credentials.js'

//import theme from './theme.js'
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

function App(theme) {
  const themeContext = useContext(ThemeContext)

  const contacts = [
    {
      id: 1,
      mpid: '34537657',
      demographics: {
        first_name: 'John',
        middle_name: null,
        last_name: 'Doe',
        date_of_birth: '2001-08-25 03:11:33',
        gender: 'male',
        phone: '123-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Anytown',
          state: 'PA',
          zip_code: '17101',
          country: 'United States'
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
        date_of_birth: '1967-08-25 03:11:33',
        gender: 'female',
        phone: '567-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Anytown',
          state: 'TX',
          zip_code: '34101',
          country: 'United States'
        },
      },
      connection_status: 'Connected',
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
                  <AppHeader match={match} />
                  <Main>
                    <p>Home</p>
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
                  <AppHeader match={match} />
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
                  <AppHeader match={match} />
                  <Main>
                    <Contact history={history} contact={match.params.contactId} />
                  </Main>
                </Frame>
              )
            }}
            contacts={contacts}
          />
          <Route
            path="/contacts/invitations"
            render={({ match }) => {
              return (
                <Frame id="app-frame">
                  <AppHeader match={match} />
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
                  <AppHeader match={match} />
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
                  <AppHeader match={match} />
                  <Main>
                    <Credential history={history} credential={match.params.credentialId} />
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
                  <AppHeader match={match} />
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
                  <AppHeader match={match} />
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
                  <AppHeader match={match} />
                  <Main>
                    <p>Settings</p>
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
