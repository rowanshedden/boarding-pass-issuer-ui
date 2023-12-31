import React from 'react'
import { useSelector } from 'react-redux'

import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

import { AttributeTable, AttributeRow } from './CommonStylesTables'

function Credential(props) {
  const credential = props.credential
  const credentials = useSelector((state) => state.credentials.credentials)

  let credentialSelected = ''
  let attributesArray = ''

  for (let i = 0; i < credentials.length; i++) {
    if (credentials[i].credential_exchange_id == credential) {
      credentialSelected = credentials[i]
      if (credentialSelected.credential_proposal_dict) {
        attributesArray =
          credentialSelected.credential_proposal_dict.credential_proposal
            .attributes
      }

      break
    }
  }

  // Initialize variables to blank (to prevent errors during loading)
  let showCredential = {
    name: '',
    credential_exchange_id: '',
    state: '',
    date_created: '',
  }

  //New mapped Attributes
  let mappedAttributes = ''
  let patient_given = ''
  let patient_sur = ''
  let patient_name = ''

  // Now set the values if we have a credential
  if (credentialSelected !== '') {
    if (credentialSelected.credential_proposal_dict) {
      showCredential.name =
        credentialSelected.credential_proposal_dict.schema_name.replaceAll(
          '_',
          ' '
        ) || ''
    } else {
      const schemaParts = credentialSelected.schema_id.split(':')
      showCredential.name = schemaParts[2].replaceAll('_', ' ')
    }
    showCredential.credential_exchange_id =
      credentialSelected.credential_exchange_id || ''
    showCredential.state = credentialSelected.state || ''
    showCredential.created_at =
      new Date(credentialSelected.created_at).toISOString().substring(0, 10) ||
      ''
    if (attributesArray.length) {
      patient_given = attributesArray.find(function (attribute, index) {
        if (attribute.name == 'traveler_given_names') return attribute
      })
      patient_sur = attributesArray.find(function (attribute, index) {
        if (attribute.name == 'traveler_surnames') return attribute
      })

      patient_name = patient_given.value + ' ' + patient_sur.value
    }
    // Values that depend on the credential being issued
    if (
      credentialSelected.credential !== null &&
      credentialSelected.credential !== undefined &&
      attributesArray !== undefined
    ) {
      mappedAttributes = attributesArray.map((attribute, index) => {
        return (
          <AttributeRow atttribute={attribute} key={attribute.name}>
            <th>{attribute.name}</th>
            <td>{attribute.value}</td>
          </AttributeRow>
        )
      })
    }
  }

  return (
    <div id="contact">
      <PageHeader
        title={
          patient_name
            ? showCredential.name + ' for ' + patient_name
            : showCredential.name
        }
      />
      <PageSection>
        <h2>General Information</h2>
        <AttributeTable>
          <tbody>
            <AttributeRow>
              <th>Credential Name:</th>
              <td>{showCredential.name}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Credential ID:</th>
              <td>{showCredential.credential_exchange_id}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Credential State:</th>
              <td>{showCredential.state}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Date Created:</th>
              <td>{showCredential.created_at}</td>
            </AttributeRow>
          </tbody>
        </AttributeTable>
        <h2>Attributes</h2>
        <AttributeTable>
          <tbody>{mappedAttributes}</tbody>
        </AttributeTable>
      </PageSection>
    </div>
  )
}

export default Credential
