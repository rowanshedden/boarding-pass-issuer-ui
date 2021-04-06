import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import FormCredentials from './FormCredentials'
import FormTrustedTraveler from './FormTrustedTraveler'
import FormContacts from './FormContacts'
import Notification from './Notification'
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

const EditContact = styled.button`
  float: right;
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};
`

const IssueCredential = styled.button`
  float: right;
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};
`

function Contact(props) {
  // const setNotification = useNotification()

  const history = props.history
  const contactId = props.contactId
  const credentials = props.credentials

  let contactSelected = ''

  for (let i = 0; i < props.contacts.length; i++) {
    if (props.contacts[i].contact_id == contactId) {
      contactSelected = props.contacts[i]
      break
    }
  }

  useEffect(() => {
    setSelectedContact(contactSelected)
  }, [contactSelected])

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Contact form customization (no contact search dropdown)
  const [contactSearch, setContactSearch] = useState(false)

  // Notification states
  const [notification, setNotification] = useState(
    'No notifications to display'
  )
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  // Modal state
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  const [travelerModalIsOpen, setTravelerModalIsOpen] = useState(false)
  const [credentialModalIsOpen, setCredentialModalIsOpen] = useState(false)

  //const history = props.history

  //const contact = props.contact

  const closeContactModal = () => setContactModalIsOpen(false)
  const closeTravelerModal = () => setTravelerModalIsOpen(false)
  const closeCredentialModal = () => setCredentialModalIsOpen(false)

  const [selectedContact, setSelectedContact] = useState(contactSelected)

  let rawImage = contactSelected.Passport.photo
  const handleImageSrc = (rawImage) => {
    let bytes = new Uint8Array(rawImage)
    bytes = Buffer.from(rawImage).toString('base64')
    console.log('I ran')
    let result = atob(bytes)
    return result
  }
  let test = handleImageSrc(rawImage)
  // console.log(test)
  function updateContact(updatedDemographic, e) {
    e.preventDefault()
    const Demographic = {
      Demographic: { ...updatedDemographic },
    }

    props.sendRequest('DEMOGRAPHICS', 'UPDATE_OR_CREATE', updatedDemographic)

    setNotification('Contact was updated!', 'notice')

    setSelectedContact({ ...selectedContact, ...Demographic })
  }

  function beginIssuance() {
    props.sendRequest('PRESENTATIONS', 'REQUEST', {
      connectionID: contactSelected.Connections[0].connection_id,
    })
  }

  // Submits the credential form and shows notification
  function submitNewCredential(newCredential, e) {
    e.preventDefault()

    props.sendRequest('CREDENTIALS', 'ISSUE_USING_SCHEMA', newCredential)

    setNotificationState('open')
    setNotification('Credential was successfully added!')
  }

  // Closes notification
  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  const credentialRows = props.credentials.map((credential_record) => {
    if (
      selectedContact.Connections[0].connection_id ===
      credential_record.connection_id
    ) {
      const credential_id = credential_record.credential_exchange_id
      const credentialState = credential_record.state.replaceAll('_', ' ') || ''
      const dateCreated =
        new Date(credential_record.created_at).toLocaleString() || ''

      let credentialName = ''
      if (
        credential_record.credential_proposal_dict !== null &&
        credential_record.credential_proposal_dict !== undefined
      ) {
        credentialName = credential_record.credential_proposal_dict.schema_name.replaceAll(
          '_',
          ' '
        )
      }

      // let testName = ''
      // let testResult = ''
      // if (
      //   credential_record.credential !== null &&
      //   credential_record.credential !== undefined
      // ) {
      //   testName = credential_record.credential.values.lab_description.raw || ''
      //   testResult = credential_record.credential.values.result.raw || ''
      // }

      return (
        <DataRow
          key={credential_id}
          onClick={() => {
            openCredential(history, credential_id)
          }}
        >
          <DataCell>{credentialName}</DataCell>
          <DataCell className="title-case">{credentialState}</DataCell>
          {/* <DataCell>{testName}</DataCell> */}
          {/* <DataCell className="title-case">{testResult}</DataCell> */}
          <DataCell>{dateCreated}</DataCell>
        </DataRow>
      )
    }
  })

  return (
    <>
      <Notification
        type={notificationType}
        message={notification}
        state={notificationState}
        closeNotification={closeNotification}
      />
      <div id="contact">
        <PageHeader
          title={'Contact Details: ' + (selectedContact.label || '')}
        />
        <PageSection>
          <EditContact onClick={() => setContactModalIsOpen((o) => !o)}>
            Edit
          </EditContact>
          <h2>General Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Contact ID:</th>
                <td>{selectedContact.contact_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Connection Status:</th>
                <td>
                  {selectedContact.Connections !== undefined
                    ? selectedContact.Connections[0].state || ''
                    : ''}
                </td>
              </AttributeRow>
              {/*<AttributeRow>
                <th>Credential Status:</th>
                <td>{selectedContact.credential_status || ''}</td>
              </AttributeRow>*/}
            </tbody>
          </AttributeTable>

          <h2>Demographic Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Name:</th>
                <td>{selectedContact.label || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Email:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined
                    ? selectedContact.Demographic.email || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Phone:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined
                    ? selectedContact.Demographic.phone || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Address 1:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined &&
                  selectedContact.Demographic.address
                    ? selectedContact.Demographic.address.address_1 || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Address 2:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined &&
                  selectedContact.Demographic.address
                    ? selectedContact.Demographic.address.address_2 || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>City:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined &&
                  selectedContact.Demographic.address
                    ? selectedContact.Demographic.address.city || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>State:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined &&
                  selectedContact.Demographic.address
                    ? selectedContact.Demographic.address.state || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Zip Code:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined &&
                  selectedContact.Demographic.address
                    ? selectedContact.Demographic.address.zip_code || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Country:</th>
                <td>
                  {selectedContact.Demographic !== null &&
                  selectedContact.Demographic !== undefined &&
                  selectedContact.Demographic.address
                    ? selectedContact.Demographic.address.country || ''
                    : ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
          <h2>Passport Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Passport Number:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.passport_number || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Surname:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.surname || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Given Name(s):</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.given_names || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Sex:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.sex || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Date of Birth:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.date_of_birth || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Place of Birth:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.place_of_birth || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Nationality:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.nationality || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Date of Issue:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.date_of_issue || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Date of Expiration:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.date_of_expiration || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Type:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.type || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Code:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.code || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Authority:</th>
                <td>
                  {selectedContact.Passport !== null &&
                  selectedContact.Passport !== undefined
                    ? selectedContact.Passport.authority || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Photo:</th>
                <td></td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
          <img src={test} alt="Error" />
        </PageSection>
        <PageSection>
          {/* <IssueCredential onClick={() => setTravelerModalIsOpen((o) => !o)}> */}
          <IssueCredential onClick={() => beginIssuance()}>
            Issue Trusted Traveler Credential
          </IssueCredential>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Credential</DataHeader>
                <DataHeader>Status</DataHeader>
                {/* <DataHeader>Test Name</DataHeader> */}
                {/* <DataHeader>Test Results</DataHeader> */}
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{credentialRows}</tbody>
          </DataTable>
        </PageSection>
        <FormContacts
          contactSelected={contactSelected}
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitContact={updateContact}
        />
        <FormTrustedTraveler
          contactSelected={contactSelected}
          travelerModalIsOpen={travelerModalIsOpen}
          closeTravelerModal={closeTravelerModal}
          submitCredential={submitNewCredential}
        />
      </div>
    </>
  )
}

export default Contact
