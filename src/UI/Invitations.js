import React, { useEffect, useState } from 'react'

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
  const error = props.errorMessage
  const success = props.successMessage

  const localUser = props.loggedInUserState

  const [createInvModalIsOpen, setCreateInvModalIsOpen] = useState(false)
  const closeCreateInvModal = () => setCreateInvModalIsOpen(false)

  const setNotification = useNotification()

  useEffect(() => {
    if (props.connectionReuse) {
      const message = `Connection reused for ${props.connectionReuse.connection_id}`
      setNotification(message, 'notice')
      props.clearConnectionReuse()
    }
  }, [props.connectionReuse])

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
          paginationData={props.invitations}
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
