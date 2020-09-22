import React from 'react'

import styled from 'styled-components'

import theme from '../theme.js'

import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

const DataTable = styled.table`
  box-sizing: content-box;
  margin-top: -16px;
  margin-left: -25px;
  width: calc(100% + 50px);
  border-collapse: collapse;
`

const DataRow = styled.tr`
  :nth-child(2n+2) td {
    background: ${theme.background_secondary};
  }
  :hover td {
    cursor: pointer;
    background: #ffc;
  }
`

const DataHeader = styled.th`
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid ${theme.primary};
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
  color: ${theme.text_light};
  border-radius: 32px;
  box-shadow: ${theme.drop_shadow};
  background: ${theme.primary};

  :hover {
    cursor: pointer;
  }
`

const FirstName = styled.span``
const MiddleInitial = styled.span``
const LastName = styled.span``
const Icon = styled.span``

function Credentials(props) {
  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }
  
  function addCredential() {
    alert("Create a new credential")
  }

  const history = props.history
  
  const credentials = props.credentials

  const credentialRows = credentials.map(credential => {
    console.log(credential)
    return (
      <DataRow key={credential.id} onClick={() => {openCredential(history, credential.id)}}>
        <DataCell>{credential.name}</DataCell>
        <DataCell>{(credential.patient_first_name || '')} {(credential.patient_last_name || '')}</DataCell>
        <DataCell>{credential.date_issued}</DataCell>
        <DataCell>{credential.status}</DataCell>
        <DataCell><Icon name="revoke" /></DataCell>
      </DataRow>
    )
  })

  return (
    <div id="credentials">
      <PageHeader title={"Credentials"} />
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
          <tbody>
            {credentialRows}
          </tbody>
        </DataTable>
      </PageSection>
      <ActionButton title="Manually Issue a Credential" onClick={() => {addCredential()}}>+</ActionButton>
    </div>
  )
}

export default Credentials
