import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNotification } from './NotificationProvider'

import { CanUser } from './CanUser'
import FormQR from './FormQR'
import PageHeader from './PageHeader'
import PaginationSection from './PaginationSection'

import { ActionButton } from './CommonStylesForms'
import { DataRow, DataCell } from './CommonStylesTables'

function Contacts(props) {
  const setNotification = useNotification()

  const contactsState = useSelector((state) => state.contacts)
  const localUser = useSelector((state) => state.login.loggedInUserState)
  const notificationsState = useSelector((state) => state.notifications)

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  const closeContactModal = () => setContactModalIsOpen(false)

  useEffect(() => {
    if (notificationsState.successMessage) {
      setNotification(notificationsState.successMessage, 'notice')
      props.clearResponseState()
    }
  }, [notificationsState.successMessage])

  // const contactRows = contacts.map((contact) => {
  //   return (
  //     <DataRow
  //       key={contact.contact_id}
  //       onClick={() => {
  //         openContact(history, contact.contact_id, contact)
  //       }}
  //     >
  //       <DataCell>{contact.label}</DataCell>
  //       <DataCell>
  //         {contact.Demographic !== null && contact.Demographic !== undefined
  //           ? contact.Demographic.mpid || ''
  //           : ''}
  //       </DataCell>
  //       <DataCell>{contact.Connections[0].state}</DataCell>
  //       <DataCell>{new Date(contact.created_at).toLocaleString()}</DataCell>
  //     </DataRow>
  //   )
  // })

  console.log('contacts', contactsState.contacts)

  return (
    <>
      <div id="contacts">
        <PageHeader title={'Contacts'} />
        <PaginationSection
          history={props.history}
          sendRequest={props.sendRequest}
          paginationData={contactsState.contacts}
          paginationFocus={'CONTACTS'}
        />
        <PaginationSection
          history={props.history}
          sendRequest={props.sendRequest}
          paginationData={contactsState.pendingConnections}
          paginationFocus={'PENDING_CONNECTIONS'}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <ActionButton
              title="Add a New Contact"
              onClick={() => {
                setContactModalIsOpen((o) => !o)
                props.sendRequest('INVITATIONS', 'CREATE_SINGLE_USE', {})
              }}
            >
              +
            </ActionButton>
          )}
        />
        <FormQR
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
        />
      </div>
    </>
  )
}

export default Contacts
