import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { CanUser, check } from './CanUser'
import { useNotification } from './NotificationProvider'

import FormQR from './FormQR'
import PageHeader from './PageHeader'
import PaginationSection from './PaginationSection'

import { clearNotificationsState } from '../redux/notificationsReducer'

import { ActionButton } from './CommonStylesForms'
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

function Contacts(props) {
  const dispatch = useDispatch()
  const setNotification = useNotification()

  const contactsState = useSelector((state) => state.contacts)
  const localUser = useSelector((state) => state.login.loggedInUserState)
  const notificationsState = useSelector((state) => state.notifications)

  const success = notificationsState.successMessage
  const error = notificationsState.errorMessage

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  const closeContactModal = () => setContactModalIsOpen(false)

  useEffect(() => {
    if (notificationsState.successMessage) {
      setNotification(notificationsState.successMessage, 'notice')
      dispatch(clearNotificationsState())
    }
  }, [notificationsState.successMessage])

  useEffect(() => {
    if (check('contacts:read')) {
      props.sendRequest('CONTACTS', 'GET_ALL', {
        params: {
          sort: [['updated_at', 'DESC']],
          pageSize: '6',
        },
        additional_tables: [],
      })

      props.setWaitingForContacts(true)
    }

    if (check('contacts:read')) {
      props.sendRequest('CONNECTIONS', 'PENDING_CONNECTIONS', {
        params: {
          sort: [['updated_at', 'DESC']],
          pageSize: '6',
        },
      })

      props.setWaitingForPendingConnections(true)
    }
  }, [])

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      dispatch(clearNotificationsState())
    } else if (error) {
      setNotification(error, 'error')
      dispatch(clearNotificationsState())
    }
  }, [error, success])

  return (
    <div id="contacts">
      {!props.waitingForContacts && !props.waitingForPendingConnections ? (
        <div>
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
                  props.sendRequest('INVITATIONS', 'CREATE', {
                    alias: 'Invitation',
                    invitationMode: 'once',
                    accept: 'auto',
                    public: false,
                    invitationStatus: 'active',
                    invitationDescription: 'Invited from DTC Issuer',
                  })
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
      ) : (
        <LoadingHolder>
          <p>Fetching contacts, please wait...</p>
          <Spinner />
        </LoadingHolder>
      )}
    </div>
  )
}

export default Contacts
