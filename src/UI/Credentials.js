import React, { useState } from 'react'
import styled from 'styled-components'

import FormCredentials from './FormCredentials'
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

function Credentials(props) {
  const [notification, setNotification] = useState(
    'There is no notification to display'
  )
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => setModalIsOpen(false)

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Submits the form and shows notification
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

  const history = props.history

  const credentials = props.credentials

  const credentialRows = credentials.map((credential) => {
    console.log(credential)
    return (
      <DataRow
        key={credential.id}
        onClick={() => {
          openCredential(history, credential.id)
        }}
      >
        <DataCell>{credential.name}</DataCell>
        <DataCell>
          {credential.patient_first_name || ''}{' '}
          {credential.patient_last_name || ''}
        </DataCell>
        <DataCell>{credential.date_issued}</DataCell>
        <DataCell>{credential.status}</DataCell>
        <DataCell>
          <Icon name="revoke" />
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
      <div id="credentials">
        <PageHeader title={'Credentials'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Credential</DataHeader>
                <DataHeader>Recipient</DataHeader>
                <DataHeader>Date Issued</DataHeader>
                <DataHeader>Credential Status</DataHeader>
                <DataHeader>Delete</DataHeader>
              </DataRow>
            </thead>
            <tbody>{credentialRows}</tbody>
          </DataTable>
        </PageSection>
        <ActionButton
          title="Manually Issue a Credential"
          onClick={() => setModalIsOpen((o) => !o)}
        >
          +
        </ActionButton>
        <FormCredentials
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          submitNewCredential={submitNewCredential}
        ></FormCredentials>
      </div>
    </>
  )
}

export default Credentials
