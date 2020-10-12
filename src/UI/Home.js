import React, { useState } from 'react'

import styled from 'styled-components'

import FormContacts from './FormContacts'
import FormCredentials from './FormCredentials'
import Notification from './Notification'

const HeaderHolder = styled.div`
  display: flex;
  justify-content: space-between;
`

const ContentFlexBox = styled.div`
  width: 32%;
  height: 150px;
  margin-bottom: 30px;
  padding: 20px 25px;
  font-size: 2.5vw;
  text-transform: uppercase;
  background: ${(props) => props.theme.primary_color};
  color: ${(props) => props.theme.text_light};
  box-shadow: ${(props) => props.theme.drop_shadow};
  text-align: center;
  line-height: 100px;

  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.background_primary};
    color: ${(props) => props.theme.text_color};
  }
`

function Home(props) {
  const [notification, setNotification] = useState(
    'There is no notification to display'
  )
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  const [credentialModalIsOpen, setCredentialModalIsOpen] = useState(false)

  const closeContactModal = () => setContactModalIsOpen(false)
  const closeCredentialModal = () => setCredentialModalIsOpen(false)

  // Submits the contact form and shows notification
  function submitNewContact(e) {
    console.log('new contact submitted')
    e.preventDefault()
    setNotificationState('open')
    setNotification('Contact was successfully added!')
  }

  // Submits the credential form and shows notification
  function submitNewCredential(e) {
    console.log('new credential submitted')
    e.preventDefault()
    setNotificationState('open')
    setNotification('Credential was successfully added!')
  }

  // Closes notification
  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  return (
    <>
      <Notification
        type={notificationType}
        message={notification}
        state={notificationState}
        closeNotification={closeNotification}
      />
      <HeaderHolder>
        <ContentFlexBox onClick={() => setCredentialModalIsOpen((o) => !o)}>
          Add Credential
        </ContentFlexBox>
        <ContentFlexBox onClick={() => setContactModalIsOpen((o) => !o)}>
          Add Contact
        </ContentFlexBox>
        <ContentFlexBox></ContentFlexBox>
      </HeaderHolder>
      <FormContacts
        contactModalIsOpen={contactModalIsOpen}
        closeContactModal={closeContactModal}
        submitNewContact={submitNewContact}
      ></FormContacts>
      <FormCredentials
        contacts={props.contacts}
        credentialModalIsOpen={credentialModalIsOpen}
        closeCredentialModal={closeCredentialModal}
        submitNewCredential={submitNewCredential}
      ></FormCredentials>
    </>
  )
}

export default Home
