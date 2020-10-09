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
  const credentials = [
    {
      id: 1,
      name: 'COVID-19 Test',
      status: 'Accepted',
      result: 'negative',
      normality: 'normal',
      result_status: 'determined',
      comment: 'Good to go to the Bahamas!',
      date_time_of_message: '2001-08-25 03:11:33',
      sending_facility: 'Bronx RHIO',
      ordering_facility_name: 'Bronx RHIO Travel Dept.',
      ordering_facility_address: '456 E. 200 N. Bronx',
      performing_lab: 'Lab 2345',
      visit_location: '123 S. 200 W. Brooklyn',
      lab_order_id: '12345',
      lab_code: '67890',
      lab_coding_qualifer: 'PCR',
      lab_description: 'COVID-19 swab test',
      lab_specimen_collected_date: '2020-08-05',
      observation_date_time: '14:27',
      mpid: '34537912',
      patient_local_id: '1',
      patient_first_name: 'Sherry',
      patient_last_name: 'Smith',
      patient_date_of_birth: '1967-08-25',
      patient_gender_legal: 'female',
      patient_phone: '567-456-7890',
      patient_street_address: '123 Main St',
      patient_city: 'Anytown',
      patient_state: 'TX',
      patient_postalcode: '34101',
      patient_country: 'United States',
    },
    {
      id: 2,
      name: 'COVID-19 Test',
      status: 'Offered',
      result: 'positive',
      normality: 'normal',
      result_status: 'determined',
      comment: 'Uh-oh!',
      date_time_of_message: '2001-08-25 03:11:33',
      sending_facility: 'Bronx RHIO',
      ordering_facility_name: 'Bronx RHIO Travel Dept.',
      ordering_facility_address: '456 E. 200 N. Bronx',
      performing_lab: 'Lab 2345',
      visit_location: '123 S. 200 W. Brooklyn',
      lab_order_id: '12345',
      lab_code: '67890',
      lab_coding_qualifer: 'PCR',
      lab_description: 'COVID-19 swab test',
      lab_specimen_collected_date: '2020-09-14',
      observation_date_time: '14:27',
      mpid: '34537912',
      patient_local_id: '1',
      patient_first_name: 'Sherry',
      patient_last_name: 'Smith',
      patient_date_of_birth: '1967-08-25',
      patient_gender_legal: 'female',
      patient_phone: '567-456-7890',
      patient_street_address: '123 Main St',
      patient_city: 'Anytown',
      patient_state: 'TX',
      patient_postalcode: '34101',
      patient_country: 'United States',
    },
  ]

  const history = props.history

  const credential = props.credential

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
      </PageSection>
      <PageSection>
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
