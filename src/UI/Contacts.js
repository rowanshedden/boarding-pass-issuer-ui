import React, { useState } from 'react'
import styled from 'styled-components'

// import FormContacts from './FormContacts'
import FormQR from './FormQR'
import Notification from './Notification'
import PageHeader from './PageHeader'
import PageSection from './PageSection'

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

const FirstName = styled.span``
const MiddleInitial = styled.span``
const LastName = styled.span``
const Icon = styled.span``

function Contacts(props) {
  const [notification, setNotification] = useState('')
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)

  const closeContactModal = () => setContactModalIsOpen(false)

  function openContact(history, id) {
    if (history !== undefined) {
      history.push('/contacts/' + id)
    }
  }

  // Submits the form and shows notification
  function submitNewContact(e) {
    console.log('new contact submitted')
    e.preventDefault()
    setNotificationState('open')
    setNotification('Contact was successfully added!')
  }

  // Closes notification
  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  const history = props.history

  const contacts = props.contacts

  const contactRows = contacts.map((contact) => {
    return (
      <DataRow
        key={contact.id}
        onClick={() => {
          openContact(history, contact.id, contact)
        }}
      >
        <DataCell>
          <FirstName>{contact.demographics.first_name}</FirstName>{' '}
          <MiddleInitial>{contact.demographics.middle_initial}</MiddleInitial>{' '}
          <LastName>{contact.demographics.last_name}</LastName>
        </DataCell>
        <DataCell>{contact.mpid}</DataCell>
        <DataCell>{contact.connection_status}</DataCell>
        <DataCell>{contact.credential_status}</DataCell>
        <DataCell>
          <Icon name="delete" />
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
      <div id="contacts">
        <PageHeader title={'Contacts'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Contact Name</DataHeader>
                <DataHeader>MPID</DataHeader>
                <DataHeader>Connection Status</DataHeader>
                <DataHeader>Credential Status</DataHeader>
                <DataHeader>Delete</DataHeader>
              </DataRow>
            </thead>
            <tbody>{contactRows}</tbody>
          </DataTable>
        </PageSection>
        <ActionButton
          title="Add a New Contact"
          onClick={() => setContactModalIsOpen((o) => !o)}
        >
          +
        </ActionButton>
        <FormQR
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitNewContact={submitNewContact}
        ></FormQR>
      </div>
    </>
  )
}

export default Contacts
