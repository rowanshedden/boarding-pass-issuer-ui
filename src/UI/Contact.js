import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CanUser } from './CanUser'
import FormContacts from './FormContacts'
import FormTrustedTraveler from './FormTrustedTraveler'
import { useNotification } from './NotificationProvider'
import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

import {
  DataTable,
  DataRow,
  DataHeader,
  DataCell,
  AttributeTable,
  AttributeRow,
} from './CommonStylesTables'

const EditContact = styled.button`
  float: right;
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};
`

const IssueCredential = styled.button`
  float: right;
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};
  :hover {
    cursor: pointer;
  }
`

function Contact(props) {
  // Accessing notification context
  const setNotification = useNotification()

  const localUser = useSelector((state) => state.login.loggedInUserState)
  const error = useSelector((state) => state.notifications.errorMessage)
  const success = useSelector((state) => state.notifications.successMessage)
  const privileges = props.privileges
  const credentials = useSelector((state) => state.credentials.credentials)
  const contacts = useSelector((state) => state.contacts.contacts)

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  const [travelerModalIsOpen, setTravelerModalIsOpen] = useState(false)
  const [credentialModalIsOpen, setCredentialModalIsOpen] = useState(false)

  const closeContactModal = () => setContactModalIsOpen(false)
  const closeTravelerModal = () => setTravelerModalIsOpen(false)

  const history = props.history
  const contactId = props.contactId

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      props.clearResponseState()
    } else if (error) {
      setNotification(error, 'error')
      props.clearResponseState()
      setIndex(index + 1)
    }
  }, [error, success])

  const isMounted = useRef(null)

  const [index, setIndex] = useState(false)

  const [contactSelected, setContactSelected] = useState('')
  const [connections, setConnections] = useState([])

  useEffect(() => {
    for (let i = 0; i < contacts.rows.length; i++) {
      if (contacts.rows[i].contact_id == contactId) {
        console.log(contacts.rows[i])
        setContactSelected(contacts.rows[i])
        setConnections(contacts.rows[i].Connections)

        break
      }
    }
  }, [contacts, credentials])

  // Get governance privileges
  useEffect(() => {
    isMounted.current = true
    props.sendRequest('GOVERNANCE', 'GET_PRIVILEGES', {})
    return () => {
      isMounted.current = false
    }
  }, [])

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Contact form customization (no contact search dropdown)
  // const [contactSearch, setContactSearch] = useState(false)
  let travelerData = ''
  let passportData = ''

  if (
    contactSelected.Passport !== null &&
    contactSelected.Passport !== undefined
  ) {
    let rawImage = contactSelected.Passport.photo

    passportData = (
      <>
        <h2>Passport Information</h2>
        <AttributeTable>
          <tbody>
            <AttributeRow>
              <th>Passport Number:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_number || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Surname:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_surnames || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Given Name(s):</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_given_names || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Sex:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_gender_legal || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Date of Birth:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined &&
                contactSelected.Passport.passport_date_of_birth
                  ? contactSelected.Passport.passport_date_of_birth.split(
                      'T'
                    )[0] || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Nationality:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_nationality || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Date of Issue:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined &&
                contactSelected.Passport.passport_date_of_issue
                  ? contactSelected.Passport.passport_date_of_issue.split(
                      'T'
                    )[0] || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Date of Expiration:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined &&
                contactSelected.Passport.passport_date_of_expiration
                  ? contactSelected.Passport.passport_date_of_expiration.split(
                      'T'
                    )[0] || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Authority:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_authority || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Issuing State:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_issuing_state || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>DTC:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_dtc || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>UPK:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined
                  ? contactSelected.Passport.passport_upk || ''
                  : ''}
              </td>
            </AttributeRow>
            <AttributeRow>
              <th>Created Date:</th>
              <td>
                {contactSelected.Passport !== null &&
                contactSelected.Passport !== undefined &&
                contactSelected.Passport.passport_created_date
                  ? contactSelected.Passport.passport_created_date.split(
                      'T'
                    )[0] || ''
                  : ''}
              </td>
            </AttributeRow>
            {/* <AttributeRow>
              <th>Photo:</th>
              <td></td>
            </AttributeRow> */}
          </tbody>
        </AttributeTable>
      </>
    )
  }

  function updateTraveler(updatedTraveler, e) {
    e.preventDefault()
    const Traveler = {
      Traveler: { ...updatedTraveler },
    }

    props.sendRequest('TRAVELERS', 'UPDATE_OR_CREATE', updatedTraveler)

    setNotification('Contact was updated!', 'notice')

    setContactSelected({ ...contactSelected, ...Traveler })
  }

  function updatePasport(updatedPassport, e) {
    e.preventDefault()
    const Passport = {
      Passport: { ...updatedPassport },
    }

    props.sendRequest('PASSPORTS', 'UPDATE_OR_CREATE', updatedPassport)

    setNotification('Passport info was updated!', 'notice')

    setContactSelected({ ...contactSelected, ...Passport })
  }

  function beginIssuance(type) {
    props.sendRequest('PRESENTATIONS', 'REQUEST', {
      connectionID: contactSelected.Connections[0].connection_id,
      type: type,
    })
    setNotification('Credential offer was successfully sent!', 'notice')
  }

  // Submits the credential form and shows notification
  function submitNewCredential(newCredential, e) {
    e.preventDefault()
    props.sendRequest('CREDENTIALS', 'ISSUE_USING_SCHEMA', newCredential)
  }

  let credentialRows = null

  if (credentials && contactSelected) {
    credentialRows = credentials.map((credential_record) => {
      if (
        contactSelected.Connections[0].connection_id ===
        credential_record.connection_id
      ) {
        const credential_id = credential_record.credential_exchange_id
        const credentialState =
          credential_record.state.replaceAll('_', ' ') || ''
        const dateCreated =
          new Date(credential_record.created_at).toLocaleString() || ''

        let credentialName = ''
        if (
          credential_record.credential_proposal_dict !== null &&
          credential_record.credential_proposal_dict !== undefined
        ) {
          credentialName = credential_record.credential_proposal_dict.schema_name.replaceAll(
            '_',
            ' '
          )
        }
        return (
          <DataRow
            key={credential_id}
            onClick={() => {
              openCredential(history, credential_id)
            }}
          >
            <DataCell>{credentialName}</DataCell>
            <DataCell className="title-case">{credentialState}</DataCell>
            <DataCell>{dateCreated}</DataCell>
          </DataRow>
        )
      }
    })
  }

  const connectionRows = connections.map((connection) => {
    return (
      <DataRow key={connection.connection_id}>
        <DataCell>{connection.connection_id}</DataCell>
        <DataCell className="title-case">{connection.state}</DataCell>
        <DataCell>{new Date(connection.created_at).toLocaleString()}</DataCell>
      </DataRow>
    )
  })

  return (
    <>
      <div id="contact">
        <PageHeader
          title={'Contact Details: ' + (contactSelected.label || '')}
        />
        <PageSection>
          <CanUser
            user={localUser}
            perform="contacts:update"
            yes={() => (
              <EditContact onClick={() => setContactModalIsOpen((o) => !o)}>
                Edit
              </EditContact>
            )}
          />
          <h2>General Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Contact ID:</th>
                <td>{contactSelected.contact_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Connection Status:</th>
                <td>
                  {contactSelected.Connections !== undefined
                    ? contactSelected.Connections[0].state || ''
                    : ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>

          <h2>Traveler Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Name:</th>
                <td>{contactSelected.label || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Email:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.traveler_email || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Phone:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.traveler_phone || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Country:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.traveler_country || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Country of Origin:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.traveler_country_of_origin || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Arrival Airline:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.arrival_airline || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Arrival Date:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined &&
                  contactSelected.Traveler.arrival_date
                    ? contactSelected.Traveler.arrival_date.split('T')[0] || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Arrival Destination Code:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler
                        .arrival_destination_country_code || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Arrival Destination Port Code:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.arrival_destination_port_code ||
                      ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Arrival Flight Number:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.arrival_flight_number || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Departure Airline:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.departure_airline || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Departure Date:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined &&
                  contactSelected.Traveler.departure_date
                    ? contactSelected.Traveler.departure_date.split('T')[0] ||
                      ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Departure Destination Code:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler
                        .departure_destination_country_code || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Departure Destination Port Code:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler
                        .departure_destination_port_code || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Departure Flight Number:</th>
                <td>
                  {contactSelected.Traveler !== null &&
                  contactSelected.Traveler !== undefined
                    ? contactSelected.Traveler.departure_flight_number || ''
                    : ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
          {passportData}
        </PageSection>
        <PageSection>
          <CanUser
            user={localUser}
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_trusted_traveler')
                    ? beginIssuance('default')
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Trusted Traveler (governance)
              </IssueCredential>
            )}
          />
          <CanUser
            user={localUser}
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_trusted_traveler')
                    ? beginIssuance('Result')
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Trusted Traveler - Lab Result
              </IssueCredential>
            )}
          />
          <CanUser
            user={localUser}
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_trusted_traveler')
                    ? beginIssuance('Exemption')
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Trusted Traveler - Exemption
              </IssueCredential>
            )}
          />
          <CanUser
            user={localUser}
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_trusted_traveler')
                    ? beginIssuance('Vaccine')
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Trusted Traveler - Vaccine
              </IssueCredential>
            )}
          />
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Credential</DataHeader>
                <DataHeader>Status</DataHeader>
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{credentialRows}</tbody>
          </DataTable>
        </PageSection>
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Connection</DataHeader>
                <DataHeader>Status</DataHeader>
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{connectionRows}</tbody>
          </DataTable>
        </PageSection>
        <FormContacts
          contactSelected={contactSelected}
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitTraveler={updateTraveler}
          submitPassport={updatePasport}
        />
        <FormTrustedTraveler
          contactSelected={contactSelected}
          travelerModalIsOpen={travelerModalIsOpen}
          closeCredentialModal={closeTravelerModal}
          submitCredential={submitNewCredential}
        />
      </div>
    </>
  )
}

export default Contact
