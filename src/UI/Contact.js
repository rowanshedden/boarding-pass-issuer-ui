import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { CanUser } from './CanUser'
import FormContacts from './FormContacts'
import { useNotification } from './NotificationProvider'
import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

import { setContactSelected } from '../redux/contactsReducer'
import { clearNotificationsState } from '../redux/notificationsReducer'

import {
  DataTable,
  DataRow,
  DataHeader,
  DataCell,
  AttributeTable,
  AttributeRow,
} from './CommonStylesTables'

// const EditContact = styled.button`
//   float: right;
//   padding: 10px;
//   color: ${(props) => props.theme.text_light};
//   border: none;
//   box-shadow: ${(props) => props.theme.drop_shadow};
//   background: ${(props) => props.theme.primary_color};
// `
// const IssueCredential = styled.button`
//   float: right;
//   padding: 10px;
//   color: ${(props) => props.theme.text_light};
//   border: none;
//   box-shadow: ${(props) => props.theme.drop_shadow};
//   background: ${(props) => props.theme.primary_color};
//   :hover {
//     cursor: pointer;
//   }
// `

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  margin: 0;
  background: transparent;
  border-top: 3px solid
    ${(props) => (props ? props.theme.primary_color : 'green')};
  border-right: 3px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`
const LoadingHolder = styled.div`
  font-size: 1.5em;
  color: ${(props) => props.theme.text_color};
  height: 200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function Contact(props) {
  // Accessing notification context
  const setNotification = useNotification()
  const dispatch = useDispatch()

  // const localUser = useSelector((state) => state.login.loggedInUserState)
  const error = useSelector((state) => state.notifications.errorMessage)
  const success = useSelector((state) => state.notifications.successMessage)
  const credentials = useSelector((state) => state.credentials.credentials)
  const contactsState = useSelector((state) => state.contacts)
  const contactSelected = contactsState.contactSelected

  // const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  // const [travelerModalIsOpen, setTravelerModalIsOpen] = useState(false)

  // const closeContactModal = () => setContactModalIsOpen(false)
  // const closeTravelerModal = () => setTravelerModalIsOpen(false)

  const history = props.history
  const contactId = props.contactId

  const [index, setIndex] = useState(false)

  const [connections, setConnections] = useState([])
  const [waitingForContact, setWaitingForContact] = useState(false)

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      dispatch(clearNotificationsState())
    } else if (error) {
      setNotification(error, 'error')
      dispatch(clearNotificationsState())
      setIndex(index + 1)
    }
  }, [error, success])

  useEffect(() => {
    //(AmmonBurgi) Stop waiting for contactSelected if the contact_id matches the target ID. If no match is found, fetch the needed contact.
    if (contactSelected && contactSelected.contact_id === contactId) {
      setWaitingForContact(false)
      setConnections(contactSelected.Connections)
    } else {
      setWaitingForContact(true)
      props.sendRequest('CONTACTS', 'GET', {
        contact_id: contactId,
        additional_tables: [],
      })
    }
  }, [contactSelected, credentials, contactId])

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Submits the credential form and shows notification
  // function submitNewCredential(newCredential, e) {
  //   e.preventDefault()
  //   props.sendRequest('CREDENTIALS', 'ISSUE_USING_SCHEMA', newCredential)
  // }

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
        {!waitingForContact ? (
          <>
            <PageHeader
              title={'Contact Details: ' + (contactSelected.label || '')}
            />
            <PageSection>
              {/* <CanUser
                user={localUser}
                perform="contacts:update"
                yes={() => (
                  <EditContact onClick={() => setContactModalIsOpen((o) => !o)}>
                    Edit
                  </EditContact>
                )}
              /> */}
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
            </PageSection>
            <PageSection>
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
                    <DataHeader>Created At</DataHeader>
                  </DataRow>
                </thead>
                <tbody>{connectionRows}</tbody>
              </DataTable>
            </PageSection>
          </>
        ) : (
          <LoadingHolder>
            <p>Fetching contacts, please wait...</p>
            <Spinner />
          </LoadingHolder>
        )}
      </div>
    </>
  )
}

export default Contact
