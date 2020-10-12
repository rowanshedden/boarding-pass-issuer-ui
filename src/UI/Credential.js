import React from 'react'

import styled from 'styled-components'

import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

const AttributeTable = styled.table`
  margin-bottom: 1em;
  border-collapse: collapse;
`

const AttributeRow = styled.tr`
  th {
    padding: 0 6px;
    text-align: right;
  }
`

const FirstName = styled.span``
const MiddleInitial = styled.span``
const LastName = styled.span``
const Icon = styled.span``

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

function Credential(props) {
  const history = props.history
  const credential = props.credential
  const credentials = props.credentials

  let credentialSelected = ''

  for (let i = 0; i < credentials.length; i++) {
    if (credentials[i].id == credential) {
      credentialSelected = credentials[i]
      break
    }
  }

  return (
    <div id="contact">
      <PageHeader
        title={
          (credentialSelected.name || '') +
          ' for ' +
          (credentialSelected.patient_first_name || '') +
          ' ' +
          (credentialSelected.patient_last_name || '')
        }
      />
      <PageSection>
        <h2>General Information</h2>
        <AttributeTable>
          <tbody>
            <AttributeRow>
              <th>ID:</th>
              <td>{credentialSelected.id || ''}</td>
            </AttributeRow>
          </tbody>
        </AttributeTable>
        <h2>Demographic Information</h2>
        <AttributeTable>
          <tbody>
            <AttributeRow>
              <th>First Name:</th>
              <td>{credentialSelected.patient_first_name || ''}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Last Name:</th>
              <td>{credentialSelected.patient_last_name || ''}</td>
            </AttributeRow>
          </tbody>
        </AttributeTable>
      </PageSection>
    </div>
  )
}

export default Credential
