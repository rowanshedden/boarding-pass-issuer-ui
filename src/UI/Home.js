import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CanUser } from './CanUser'
import FormInvitationAccept from './FormInvitationAccept'
import FormQR from './FormQR'
import { useNotification } from './NotificationProvider'

const DashboardRow = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`

const DashboardButton = styled.div`
  width: 24%;
  min-width: 240px;
  height: 150px;
  margin: 30px 1% 0px 0px;
  padding: 0 25px;
  font-size: calc(12px + 1vw);
  line-height: 150px;
  vertical-align: center;
  text-transform: uppercase;
  background: ${(props) => props.theme.primary_color};
  color: ${(props) => props.theme.text_light};
  box-shadow: ${(props) => props.theme.drop_shadow};
  text-align: center;

  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.background_primary};
    color: ${(props) => props.theme.text_color};
  }
`

function Home(props) {
  const error = useSelector((state) => state.notifications.errorMessage)
  const success = useSelector((state) => state.notifications.successMessage)
  const warning = useSelector((state) => state.notifications.warningMessage)
  const localUser = useSelector((state) => state.login.loggedInUserState)
  const privileges = props.privileges

  const [oob, setOOB] = useState(false)

  const [index, setIndex] = useState(false)
  const [scanModalIsOpen, setScanModalIsOpen] = useState(false)
  const [displayModalIsOpen, setDisplayModalIsOpen] = useState(false)

  const closeScanModal = () => setScanModalIsOpen(false)
  const closeDisplayModal = () => setDisplayModalIsOpen(false)

  // Accessing notification context
  const setNotification = useNotification()

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      props.clearResponseState()
    } else if (error) {
      setNotification(error, 'error')
      props.clearResponseState()
      setIndex(index + 1)
    } else if (warning) {
      setNotification(warning, 'warning')
      props.clearResponseState()
      setIndex(index + 1)
    } else return
  }, [error, success, warning])

  const scanInvite = (type) => {
    type === 'oob' ? setOOB(true) : setOOB(false)

    setScanModalIsOpen((o) => !o)
  }

  const presentOutOfBand = () => {
    if (privileges && privileges.includes('verify_identity')) {
      setDisplayModalIsOpen((o) => !o)
      props.sendRequest('OUT_OF_BAND', 'CREATE_INVITATION', {})
    } else {
      setNotification("Error: you don't have the right privileges", 'error')
    }
  }

  const presentInvitation = () => {
    if (privileges && privileges.includes('verify_identity')) {
      setDisplayModalIsOpen((o) => !o)
      props.sendRequest('INVITATIONS', 'CREATE_SINGLE_USE', {})
    } else {
      setNotification("Error: you don't have the right privileges", 'error')
    }
  }

  return (
    <>
      <DashboardRow>
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={() => scanInvite('connection')}>
              Scan QR Code
            </DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={presentInvitation}>
              Display QR Code
            </DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={() => scanInvite('oob')}>
              Scan OOB
            </DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={presentOutOfBand}>
              Display OOB
            </DashboardButton>
          )}
        />
      </DashboardRow>
      <FormInvitationAccept
        oob={oob}
        contactModalIsOpen={scanModalIsOpen}
        closeContactModal={closeScanModal}
        sendRequest={props.sendRequest}
      />
      <FormQR
        contactModalIsOpen={displayModalIsOpen}
        closeContactModal={closeDisplayModal}
        QRCodeURL={props.QRCodeURL}
        sendRequest={props.sendRequest}
      />
    </>
  )
}

export default Home
