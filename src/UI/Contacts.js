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

function Contacts(props) {
  function openContact(history, id) {
    if (history !== undefined) {
      history.push('/contacts/' + id)
    }
  }
  
  function addContact() {
    alert("Invite a contact")
  }

  const history = props.history
  
  const contacts = props.contacts

  const contactRows = contacts.map(contact => {
    return (
      <DataRow key={contact.id} onClick={() => {openContact(history, contact.id)}}>
        <DataCell><FirstName>{contact.demographics.first_name}</FirstName> <MiddleInitial>{contact.demographics.middle_initial}</MiddleInitial> <LastName>{contact.demographics.last_name}</LastName></DataCell>
        <DataCell>{contact.mpid}</DataCell>
        <DataCell>{contact.connection_status}</DataCell>
        <DataCell>{contact.credential_status}</DataCell>
        <DataCell><Icon name="delete" /></DataCell>
      </DataRow>
    )
  })

  return (
    <div id="contacts">
      <PageHeader title={"Contacts"} />
      <PageSection>
        <DataTable>
          <thead>
            <DataRow>
              <DataHeader>Contact Name</DataHeader>
              <DataHeader>MPID</DataHeader>
              <DataHeader>Connection Status</DataHeader>
              <DataHeader>Credential Status</DataHeader>
              <DataHeader>Delete</DataHeader>
            </DataRow>
          </thead>
          <tbody>
            {contactRows}
          </tbody>
        </DataTable>
      </PageSection>
      <ActionButton title="Add a New Contact" onClick={() => {addContact()}}>+</ActionButton>
    </div>
  )
}

export default Contacts
