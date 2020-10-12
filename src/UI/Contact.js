import React, { useState } from 'react'

import styled from 'styled-components'

import FormCredentials from './FormCredentials'
import FormContacts from './FormContacts'
import Notification from './Notification'
import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

const AttributeTable = styled.table`
  margin-bottom: 1em;
  border-collapse: collapse;
`

const AttributeRow = styled.tr`
  th {
    padding: 0 6px;
    text-align: right;
  }
`

// const FirstName = styled.span``
// const MiddleInitial = styled.span``
// const LastName = styled.span``
const Icon = styled.span``

const DataTable = styled.table`
  box-sizing: content-box;
  margin-top: -16px;
  margin-left: -25px;
  width: calc(100% + 50px);
  border-collapse: collapse;
`

const DataRow = styled.tr`
  :nth-child(2n + 2) td {
    background: ${(props) => props.theme.background_secondary};
  }
  :hover td {
    cursor: pointer;
    background: #ffc;
  }
`

const DataHeader = styled.th`
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.primary_color};
`

const DataCell = styled.td`
  padding: 8px 12px;
  text-align: left;
`

const ActionButton = styled.span`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: block;
  height: 64px;
  width: 64px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: 64px;
  color: ${(props) => props.theme.text_light};
  border-radius: 32px;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};

  :hover {
    cursor: pointer;
  }
`

const EditContact = styled.button`
  width: 80px;
  background: ${(props) => props.theme.primary_color};
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  float: right;
  box-shadow: ${(props) => props.theme.drop_shadow};
`

function Contact(props) {
  const source = 'contact'
  const history = props.history
  const contact = props.contact

  let contactSelected = ''

  for (let i = 0; i < props.contacts.length; i++) {
    if (props.contacts[i].id == contact) {
      contactSelected = props.contacts[i]
      break
    }
  }

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Contact form customization (no contact search dropdown)
  const [contactSearch, setContactSearch] = useState(false)

  // Notification states
  const [notification, setNotification] = useState(
    'There is no notification to display'
  )
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  // Modal state
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  const [credentialModalIsOpen, setCredentialModalIsOpen] = useState(false)

  //const history = props.history

  //const contact = props.contact

  const closeContactModal = () => setContactModalIsOpen(false)
  const closeCredentialModal = () => setCredentialModalIsOpen(false)

  const [selectedContact, setSelectedContact] = useState(contactSelected)

  console.log(selectedContact)

  function updateContact(update) {
    console.log(update)
    return setSelectedContact({ ...selectedContact, ...update })
  }

  // Submits the form and shows notification
  function submitNewCredential(e) {
    console.log('new credential submitted')
    // e.preventDefault()

    setNotificationState('open')
    setNotification('Credential was successfully added!')
  }

  // Submits the contact form and shows notification
  function editContact(e) {
    console.log('new contact submitted')
    e.preventDefault()
    setNotificationState('open')
    setNotification('Contact was successfully updated!')
  }

  // Closes notification
  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  const credentialRows = props.credentials.map((credential) => {
    return (
      <DataRow
        key={credential.id}
        onClick={() => {
          openCredential(history, credential.id)
        }}
      >
        <DataCell>{credential.name}</DataCell>
        <DataCell>{credential.status}</DataCell>
        <DataCell>{credential.result}</DataCell>
        <DataCell>{credential.lab_specimen_collected_date}</DataCell>
        <DataCell>
          <Icon name="revoke" />
        </DataCell>
      </DataRow>
    )
  })

  return (
    <>
      <Notification
        type={notificationType}
        message={notification}
        state={notificationState}
        closeNotification={closeNotification}
      ></Notification>
      <div id="contact">
        <PageHeader
          title={
            'Contact Details: ' +
            (selectedContact.demographics.first_name || '') +
            ' ' +
            (selectedContact.demographics.middle_name || '') +
            ' ' +
            (selectedContact.demographics.last_name || '')
          }
        />
        <PageSection>
          <EditContact onClick={() => setContactModalIsOpen((o) => !o)}>
            Edit
          </EditContact>
          <h2>General Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>ID:</th>
                <td>{selectedContact.id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>MPID:</th>
                <td>{selectedContact.mpid || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Connection Status:</th>
                <td>{selectedContact.connection_status || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Credential Status:</th>
                <td>{selectedContact.credential_status || ''}</td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
          <h2>Demographic Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>First Name:</th>
                <td>{selectedContact.demographics.first_name || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Middle Name:</th>
                <td>{selectedContact.demographics.middle_name || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Last Name:</th>
                <td>{selectedContact.demographics.last_name || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Date of Birth:</th>
                <td>{selectedContact.demographics.date_of_birth || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Gender:</th>
                <td>{selectedContact.demographics.gender || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Phone:</th>
                <td>{selectedContact.demographics.phone || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Address 1:</th>
                <td>{selectedContact.demographics.address.address_1 || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Address 2:</th>
                <td>{selectedContact.demographics.address.address_2 || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>City:</th>
                <td>{selectedContact.demographics.address.city || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>State:</th>
                <td>{selectedContact.demographics.address.state || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Zip Code:</th>
                <td>{selectedContact.demographics.address.zip_code || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Country:</th>
                <td>{selectedContact.demographics.address.country || ''}</td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
        </PageSection>
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Credential Name</DataHeader>
                <DataHeader>Status</DataHeader>
                <DataHeader>Result</DataHeader>
                <DataHeader>Date</DataHeader>
                <DataHeader>Revoke</DataHeader>
              </DataRow>
            </thead>
            <tbody>{credentialRows}</tbody>
          </DataTable>
        </PageSection>
        <ActionButton
          title="Manually Issue a Credential"
          onClick={() => setCredentialModalIsOpen((o) => !o)}
        >
          +
        </ActionButton>
        <FormContacts
          source={source}
          updateContact={updateContact}
          contactSelected={contactSelected}
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitNewContact={editContact}
        ></FormContacts>
        <FormCredentials
          selectedContact={contactSelected}
          contactSearch={contactSearch}
          credentialModalIsOpen={credentialModalIsOpen}
          closeCredentialModal={closeCredentialModal}
          submitNewCredential={submitNewCredential}
        ></FormCredentials>
      </div>
    </>
  )
}

export default Contact
