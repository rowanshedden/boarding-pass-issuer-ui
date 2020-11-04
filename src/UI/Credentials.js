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
  // Notification states
  const [notification, setNotification] = useState(
    'No notifications to display'
  )
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Closes notification
  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  const history = props.history

  const credentials = props.credentials

  const credentialRows = credentials.map((credential_record) => {
    const credential_id = credential_record.credential_exchange_id
    const credentialState = credential_record.state.replaceAll('_', ' ') || ''
    const dateCreated =
      new Date(credential_record.created_at).toLocaleString() || ''

    let credentialName = ''
    if (
      credential_record.credential_proposal_dict !== null &&
      credential_record.credential_proposal_dict !== undefined
    ) {
      credentialName =
        credential_record.credential_proposal_dict.schema_name.replaceAll(
          '_',
          ' '
        ) || ''
    }

    let patientName = ''
    let testName = ''
    let testResult = ''
    if (
      credential_record.credential !== null &&
      credential_record.credential !== undefined
    ) {
      patientName =
        credential_record.credential.values.patient_first_name.raw +
        ' ' +
        credential_record.credential.values.patient_last_name.raw
      testName = credential_record.credential.values.lab_description.raw || ''
      testResult = credential_record.credential.values.result.raw || ''
    }

    return (
      <DataRow
        key={credential_id}
        onClick={() => {
          openCredential(history, credential_id)
        }}
      >
        <DataCell>{patientName}</DataCell>
        <DataCell>{credentialName}</DataCell>
        <DataCell>{testName}</DataCell>
        <DataCell>{dateCreated}</DataCell>
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
      />
      <div id="credentials">
        <PageHeader title={'Credentials'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Patient Name</DataHeader>
                <DataHeader>Credential</DataHeader>
                <DataHeader>Test Name</DataHeader>
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{credentialRows}</tbody>
          </DataTable>
        </PageSection>
      </div>
    </>
  )
}

export default Credentials
