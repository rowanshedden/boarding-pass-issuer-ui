import React from 'react'

import styled from 'styled-components'

import theme from '../theme.js'

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

function Contact(props) {
  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  const contacts = [
    {
      id: 1,
      mpid: '34537657',
      demographics: {
        first_name: 'John',
        middle_name: null,
        last_name: 'Doe',
        date_of_birth: '2001-08-25 03:11:33',
        gender: 'male',
        phone: '123-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Anytown',
          state: 'PA',
          zip_code: '17101',
          country: 'United States'
        },
      },
      connection_status: 'Connected',
      credential_status: 'None',
    },
    {
      id: 2,
      mpid: '34537912',
      demographics: {
        first_name: 'Sherry',
        middle_name: null,
        last_name: 'Smith',
        date_of_birth: '1967-08-25 03:11:33',
        gender: 'female',
        phone: '567-456-7890',
        address: {
          address_1: '123 Main St',
          address_2: 'Apt #382',
          city: 'Anytown',
          state: 'TX',
          zip_code: '34101',
          country: 'United States'
        },
      },
      connection_status: 'Connected',
      credential_status: 'None',
    },
  ]

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
 
  const contact = props.contact

  let contactSelected = ''

  for (let i=0; i < contacts.length; i++) {
    if (contacts[i].id == contact) {
      contactSelected = contacts[i]
      break
    }
  }

  const credentialRows = credentials.map(credential => {
    console.log(credential)
    return (
      <DataRow key={credential.id} onClick={() => {openCredential(history, credential.id)}}>
        <DataCell>{credential.name}</DataCell>
        <DataCell>{credential.status}</DataCell>
        <DataCell>{credential.result}</DataCell>
        <DataCell>{credential.lab_specimen_collected_date}</DataCell>
        <DataCell><Icon name="revoke" /></DataCell>
      </DataRow>
    )
  })

  return (
    <div id="contact">
      <PageHeader title={'Contact Details: ' + (contactSelected.demographics.first_name || '') + ' ' + (contactSelected.demographics.middle_name || '') + ' ' + (contactSelected.demographics.last_name || '')} />
      <PageSection>
        <h2>General Information</h2>
        <AttributeTable>
          <tbody>
            <AttributeRow>
              <th>ID:</th>
              <td>{(contactSelected.id || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>MPID:</th>
              <td>{(contactSelected.mpid || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Connection Status:</th>
              <td>{(contactSelected.connection_status || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Credential Status:</th>
              <td>{(contactSelected.credential_status || '')}</td>
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
              <td>{(contactSelected.demographics.first_name || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Middle Name:</th>
              <td>{contactSelected.demographics.middle_name || ''}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Last Name:</th>
              <td>{(contactSelected.demographics.last_name || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Date of Birth:</th>
              <td>{(contactSelected.demographics.date_of_birth || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Gender:</th>
              <td>{(contactSelected.demographics.gender || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Phone:</th>
              <td>{(contactSelected.demographics.phone || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Address 1:</th>
              <td>{contactSelected.demographics.address.address_1 || ''}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Address 2:</th>
              <td>{contactSelected.demographics.address.address_2 || ''}</td>
            </AttributeRow>
            <AttributeRow>
              <th>City:</th>
              <td>{(contactSelected.demographics.address.city || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>State:</th>
              <td>{(contactSelected.demographics.address.state || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Zip Code:</th>
              <td>{(contactSelected.demographics.address.zip_code || '')}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Country:</th>
              <td>{(contactSelected.demographics.address.country || '')}</td>
            </AttributeRow>
          </tbody>
        </AttributeTable>
      </PageSection>
      <PageSection>
        <DataTable>
          <thead>
            <DataRow>
              <DataHeader>Credential Name</DataHeader>
              <DataHeader>Status</DataHeader>
              <DataHeader>Result</DataHeader>
              <DataHeader>Date</DataHeader>
              <DataHeader>Revoke</DataHeader>
            </DataRow>
          </thead>
          <tbody>
            {credentialRows}
          </tbody>
        </DataTable>
      </PageSection>
    </div>
  )
}

export default Contact
