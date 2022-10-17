import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import FormInvitation from './FormInvitation'
import PageHeader from './PageHeader'
import PaginationSection from './PaginationSection'

import { ActionButton } from './CommonStylesForms'

import { CanUser } from './CanUser'
import { useNotification } from './NotificationProvider'

import styled from 'styled-components'

export const JumpToPage = styled.input`
  margin: auto 10px auto 0;
  width: 60px;
  font-size: 1em;
  color: ${(props) => props.theme.primary_color};
`

function Invitations(props) {
  const localUser = useSelector((state) => state.login.loggedInUserState)
  const error = useSelector((state) => state.notifications.errorMessage)
  const success = useSelector((state) => state.notifications.successMessage)
  const invitationsState = useSelector((state) => state.invitations)

  const [createInvModalIsOpen, setCreateInvModalIsOpen] = useState(false)
  const closeCreateInvModal = () => setCreateInvModalIsOpen(false)

  const setNotification = useNotification()

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      props.clearResponseState()
    } else if (error) {
      setNotification(error, 'error')
      props.clearResponseState()
    }
  }, [error, success, setNotification, props])

  return (
    <>
      <div id="invitations">
        <PageHeader title={'Invitations'} />
        <PaginationSection
          history={props.history}
          sendRequest={props.sendRequest}
          paginationData={invitationsState.invitations}
          paginationFocus={'INVITATIONS'}
        />
        <CanUser
          user={localUser}
          perform="invitations:create"
          yes={() => (
            <ActionButton
              title="Add a New Invitation"
              onClick={() => {
                setCreateInvModalIsOpen((o) => !o)
              }}
            >
              +
            </ActionButton>
          )}
        />
        <FormInvitation
          createInvModalIsOpen={createInvModalIsOpen}
          closeCreateInvModal={closeCreateInvModal}
          sendRequest={props.sendRequest}
        />
      </div>
    </>
  )
}

export default Invitations
