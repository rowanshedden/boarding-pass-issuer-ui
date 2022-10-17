import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CanUser } from './CanUser'

import FormInvitationDelete from './FormInvitationDelete'
import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'
import ReactDOMServer from 'react-dom/server'
import QRCode from 'qrcode.react'
import { useNotification } from './NotificationProvider'

import { Button } from './CommonStylesForms'
import { QRHolder, SubmitBtn } from './CommonStylesForms'
import { AttributeTable, AttributeRow } from './CommonStylesTables'
const QR = styled(QRCode)`
  display: block;
  margin: auto;
  padding: 10px;
  width: 300px;
`

function Invitation(props) {
  const invitationsState = useSelector((state) => state.invitations)
  const localUser = useSelector((state) => state.login.loggedInUserState)
  const error = useSelector((state) => state.notifications.errorMessage)
  const success = useSelector((state) => state.notifications.successMessage)

  const [index] = useState(false)
  const [invitationSelected, setInvitationSelected] = useState({})

  const [
    deleteInvitationModalIsOpen,
    setDeleteInvitationModalIsOpen,
  ] = useState(false)
  const closeDeleteModal = () => setDeleteInvitationModalIsOpen(false)
  const deleteInvitation = () => {
    setDeleteInvitationModalIsOpen(true)
  }

  const invitationId = props.invitationId

  // Accessing notification context
  const setNotification = useNotification()

  useEffect(() => {
    if (invitationsState.invitations) {
      for (let i = 0; i < invitationsState.invitations.rows.length; i++) {
        if (
          invitationsState.invitations.rows[i].invitation_id ===
          parseInt(invitationId)
        ) {
          console.log('Invitation accepted!')
          setInvitationSelected(invitationsState.invitations.rows[i])
          break
        }
      }
    }
  }, [invitationsState.invitations, invitationId])

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      closeDeleteModal()
      props.clearResponseState()
    } else if (error) {
      setNotification(error, 'error')
      props.clearResponseState()
    }
  }, [error, success, setNotification])

  return (
    <>
      <div id="contact">
        <PageHeader
          title={'Invitation Details: ' + (invitationSelected.label || '')}
        />
        <PageSection>
          <h2>General Information</h2>
          <QRHolder style={{ float: 'right', textAlign: 'center' }}>
            {invitationSelected.invitation_url ? (
              <>
                <QR
                  value={invitationSelected.invitation_url}
                  size={256}
                  renderAs="svg"
                />
                <a
                  href={
                    'data:image/svg+xml;charset=utf-8,' +
                    encodeURIComponent(
                      ReactDOMServer.renderToString(
                        <QR
                          value={invitationSelected.invitation_url}
                          size={256}
                          renderAs="svg"
                          xmlns="http://www.w3.org/2000/svg"
                        />
                      )
                    )
                  }
                  download="qrcode.svg"
                  href-lang="image/svg+xml"
                >
                  Download
                </a>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </QRHolder>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Invitation ID:</th>
                <td>{invitationSelected.invitation_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Connection ID:</th>
                <td>{invitationSelected.connection_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Invitation Key:</th>
                <td>{invitationSelected.invitation_key || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Invitation Mode:</th>
                <td>{invitationSelected.invitation_mode || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Accept:</th>
                <td>{invitationSelected.accept || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Their Role:</th>
                <td>{invitationSelected.their_role || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Their Label:</th>
                <td>{invitationSelected.their_label || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Service Endpoint:</th>
                <td>{invitationSelected.service_endpoint || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Domain:</th>
                <td>{invitationSelected.domain || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Path:</th>
                <td>{invitationSelected.path || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Workflow Status:</th>
                <td>{invitationSelected.workflow_status || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Invitation State:</th>
                <td>{invitationSelected.state || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Description:</th>
                <td>{invitationSelected.description || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Active Starting Time:</th>
                <td>{invitationSelected.active_starting_at || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Active Ending Time:</th>
                <td>{invitationSelected.active_ending_at || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Uses Allowed:</th>
                <td>{invitationSelected.uses_allowed || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Uses Remaining:</th>
                <td>{invitationSelected.uses_remaining || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Created At:</th>
                <td>{invitationSelected.created_at || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Updated At:</th>
                <td>{invitationSelected.updated_at || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>My DID:</th>
                <td>{invitationSelected.my_did || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>User ID:</th>
                <td>{invitationSelected.user_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Invitation URL:</th>
                <td
                  style={{
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    maxWidth: '400px',
                  }}
                >
                  {invitationSelected.invitation_url || ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
          <CanUser
            user={localUser}
            perform="invitations:delete"
            yes={() => (
              <Button
                title="Delete Invitation"
                onClick={() => {
                  deleteInvitation(invitationSelected.invitation_id)
                }}
              >
                Remove
              </Button>
            )}
          />
        </PageSection>

        <FormInvitationDelete
          sendRequest={props.sendRequest}
          error={index}
          history={props.history}
          invitationId={invitationId}
          deleteInvitationModalIsOpen={deleteInvitationModalIsOpen}
          closeDeleteModal={closeDeleteModal}
        />
      </div>
    </>
  )
}

export default Invitation
