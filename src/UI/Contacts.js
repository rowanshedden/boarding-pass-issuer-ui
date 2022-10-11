import React, { useState, useEffect, useRef } from 'react'

import { useNotification } from './NotificationProvider'
import { CanUser } from './CanUser'

// import FormContacts from './FormContacts'
import FormQR from './FormQR'
import PageHeader from './PageHeader'
import PaginationSection from './PaginationSection'

import { ActionButton } from './CommonStylesForms'

function Contacts(props) {
  const localUser = props.loggedInUserState

  // Accessing notification context
  const setNotification = useNotification()

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)

  const closeContactModal = () => setContactModalIsOpen(false)

  useEffect(() => {
    if (props.connectionReuse) {
      const message = `Connection reused for ${props.connectionReuse.connection_id}`
      setNotification(message, 'notice')
      props.clearConnectionReuse()
    }
  }, [props.connectionReuse])

  return (
    <>
      <div id="contacts">
        <PageHeader title={'Contacts'} />
        <PaginationSection
          history={props.history}
          sendRequest={props.sendRequest}
          paginationData={props.contacts}
          paginationFocus={'CONTACTS'}
        />
        <PaginationSection
          history={props.history}
          sendRequest={props.sendRequest}
          paginationData={props.pendingConnections}
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
          invitationURL={props.invitationURL}
        />
        {/*<FormContacts
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitContact={submitNewContact}
        />*/}
      </div>
    </>
  )
}

export default Contacts
