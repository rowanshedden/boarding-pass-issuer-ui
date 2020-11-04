import React, { useRef } from 'react'

import styled from 'styled-components'
import Popup from 'reactjs-popup'

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
`

const InputBox = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;

  &.active {
    display: none;
  }
`

const Modal = styled.div`
  font-size: 12px;
  margin: auto;
  background: ${(props) => props.theme.background_primary};
  width: 500px;
  padding: 5px;
  border: 1px solid #d7d7d7;
`

const ModalHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 1.8em;
  text-align: center;
  padding: 5px;
`

const ModalContentWrapper = styled.div`
  overflow: hidden;
  height: 700px;
  width: 100%;
`

const ModalContent = styled.div`
  height: 99%;
  width: 100%;
  padding: 10px 5px;
  overflow-y: scroll;
  padding-right: 17px;
  box-sizing: content-box;
`

const CloseBtn = styled.button`
  cursor: pointer;
  outline: inherit;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: ${(props) => props.theme.negative_color};
  border-radius: 18px;
  border: 1px solid ${(props) => props.theme.negative_color};

  &:focus {
    box-shadow: 0 0 1pt 1pt #000;
  }
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 5px;
  margin: auto;
  text-align: center;
`

const CancelBtn = styled.button`
  border: none;
  color: ${(props) => props.theme.text_light};
  background: ${(props) => props.theme.negative_color};
  padding: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
  width: 25%;
  font-size: 1.3em;
`

const SubmitBtn = styled.button`
  border: none;
  color: ${(props) => props.theme.text_light};
  background: ${(props) => props.theme.positive_color};
  padding: 5px;
  box-shadow: ${(props) => props.theme.drop_shadow};
  padding: 10px;
  width: 25%;
  font-size: 1.3em;
`

const ModalLabel = styled.label`
  color: ${(props) => props.theme.text_color};
  font-size: 1.5em;
  width: 30%;
  margin-right: 10px;
`

const InputField = styled.input`
  color: ${(props) => props.theme.text_color};
  font-size: 1.5em;
  height: 30px;
  width: 50%;
`

const Select = styled.select`
  color: ${(props) => props.theme.text_color};
  font-size: 1.5em;
  height: 30px;
  width: 50%;
`
const TextArea = styled.textarea`
  color: ${(props) => props.theme.text_color};
  font-size: 1.5em;
  height: 30px;
  width: 50%;
`

function FormCredentials(props) {
  const credentialForm = useRef(null)
  const contacts = props.contacts

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(credentialForm.current)

    let demographic_attributes = {}
    if (props.selectedContact && props.selectedContact.Demographic != null) {
      const demographics = props.selectedContact.Demographic
      demographic_attributes = [
        {
          name: 'mpid',
          value: demographics.mpid || '',
        },
        {
          name: 'patient_local_id',
          value: props.selectedContact.contact_id.toString() || '',
        },
        {
          name: 'patient_first_name',
          value: demographics.first_name || '',
        },
        {
          name: 'patient_last_name',
          value: demographics.last_name || '',
        },
        {
          name: 'patient_date_of_birth',
          value: demographics.date_of_birth || '',
        },
        {
          name: 'patient_gender_legal',
          value: demographics.gender || '',
        },
        {
          name: 'patient_phone',
          value: demographics.phone || '',
        },
      ]

      const address = demographics.address
      let address_attributes = [
        {
          name: 'patient_street_address',
          value: address.address_1 + address.address_2 || '',
        },
        {
          name: 'patient_city',
          value: address.city || '',
        },
        {
          name: 'patient_state',
          value: address.state || '',
        },
        {
          name: 'patient_postalcode',
          value: address.zip_code || '',
        },
        {
          name: 'patient_country',
          value: address.country || '',
        },
      ]

      demographic_attributes = demographic_attributes.concat(address_attributes)
    } else {
      demographic_attributes = [
        {
          name: 'mpid',
          value: '',
        },
        {
          name: 'patient_local_id',
          value: '',
        },
        {
          name: 'patient_first_name',
          value: '',
        },
        {
          name: 'patient_last_name',
          value: '',
        },
        {
          name: 'patient_date_of_birth',
          value: '',
        },
        {
          name: 'patient_gender_legal',
          value: '',
        },
        {
          name: 'patient_phone',
          value: '',
        },
      ]

      let address_attributes = [
        {
          name: 'patient_street_address',
          value: '',
        },
        {
          name: 'patient_city',
          value: '',
        },
        {
          name: 'patient_state',
          value: '',
        },
        {
          name: 'patient_postalcode',
          value: '',
        },
        {
          name: 'patient_country',
          value: '',
        },
      ]

      demographic_attributes = demographic_attributes.concat(address_attributes)
    }

    let attributes = [
      {
        name: 'result',
        value: form.get('result'),
      },
      {
        name: 'normality',
        value: form.get('normality'),
      },
      {
        name: 'result_status',
        value: form.get('result_status'),
      },
      {
        name: 'comment',
        value: form.get('comment'),
      },
      {
        name: 'date_time_of_message',
        value: form.get('date_time_of_message'),
      },
      {
        name: 'sending_facility',
        value: form.get('sending_facility'),
      },
      {
        name: 'ordering_facility_name',
        value: form.get('ordering_facility_name'),
      },
      {
        name: 'ordering_facility_address',
        value: form.get('ordering_facility_address'),
      },
      {
        name: 'performing_lab',
        value: form.get('performing_lab'),
      },
      {
        name: 'visit_location',
        value: form.get('visit_location'),
      },
      {
        name: 'lab_order_id',
        value: form.get('lab_order_id'),
      },
      {
        name: 'lab_code',
        value: form.get('lab_code'),
      },
      {
        name: 'lab_coding_qualifer',
        value: form.get('lab_coding_qualifer'),
      },
      {
        name: 'lab_description',
        value: form.get('lab_description'),
      },
      {
        name: 'lab_specimen_collected_date',
        value: form.get('lab_specimen_collected_date'),
      },
      {
        name: 'observation_date_time',
        value: form.get('observation_date_time'),
      },
    ]

    attributes = attributes.concat(demographic_attributes)

    let newCredential = {
      connectionID: props.selectedContact.Connections[0].connection_id,
      schemaID: 'W1vtCQVTy1aMJAjsHt5UK4:2:Covid_19_Lab_Result:1.3',
      schemaVersion: '1.3',
      schemaName: 'Covid_19_Lab_Result',
      schemaIssuerDID: 'W1vtCQVTy1aMJAjsHt5UK4',
      comment: form.get('comment'),
      attributes: attributes,
    }

    props.submitCredential(newCredential, e)
    props.closeCredentialModal()
  }

  function closeModal() {
    props.closeCredentialModal()
  }

  const getContacts = () => {
    if (contacts) {
      return (
        <>
          <ModalLabel htmlFor="contact">Contacts</ModalLabel>
          <Select name="gender">
            <option value="" hidden>
              Choose contact
            </option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.label}
              </option>
            ))}
          </Select>
        </>
      )
    } else return
  }

  return (
    <StyledPopup
      open={props.credentialModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Add New Credential</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form onSubmit={handleSubmit} ref={credentialForm}>
              <InputBox
                className={props.contactSearch === false ? 'active' : ''}
              >
                {getContacts()}
              </InputBox>
              {/*<InputBox>
                <ModalLabel htmlFor="name">Test Name</ModalLabel>
                <InputField
                  type="text"
                  name="name"
                  placeholder="COVID-19 Test"
                ></InputField>
              </InputBox>*/}
              {/*<InputBox>
                <ModalLabel htmlFor="date_issued">Date-Time Issued</ModalLabel>
                <InputField
                  type="datetime-local"
                  name="date_issued"
                ></InputField>
              </InputBox>*/}
              {/*<InputBox>
                <ModalLabel htmlFor="result_status">Status</ModalLabel>
                <Select name="result_status">
                  <option value="" hidden>
                    Choose status
                  </option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </Select>
              </InputBox>*/}
              <InputBox>
                <ModalLabel htmlFor="result">Result</ModalLabel>
                <InputField
                  type="text"
                  name="result"
                  placeholder="Negative"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="normality">Normality</ModalLabel>
                <InputField type="text" name="normality"></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="result_status">Result Status</ModalLabel>
                <InputField type="text" name="result_status"></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="comment">Comment</ModalLabel>
                <TextArea
                  name="comment"
                  rows="4"
                  cols="50"
                  placeholder="Your comment ..."
                ></TextArea>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_time_of_message">
                  Date-Time Of Message
                </ModalLabel>
                <InputField
                  type="datetime-local"
                  name="date_time_of_message"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="sending_facility">
                  Sending Facility
                </ModalLabel>
                <InputField
                  type="text"
                  name="sending_facility"
                  placeholder="Bronx RHIO"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_name">
                  Ordering Facility Name
                </ModalLabel>
                <InputField
                  type="text"
                  name="ordering_facility_name"
                  placeholder="Bronx RHIO Travel Dept."
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_address">
                  Ordering Facility Address
                </ModalLabel>
                <InputField
                  type="text"
                  name="ordering_facility_address"
                  placeholder="456 E. 200 N. Bronx"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_lab">Performing Lab</ModalLabel>
                <InputField
                  type="text"
                  name="performing_lab"
                  placeholder="Lab 2345"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="visit_location">Visit Location</ModalLabel>
                <InputField
                  type="text"
                  name="visit_location"
                  placeholder="123 S. 200 W. Brooklyn"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_order_id">Lab Order Id</ModalLabel>
                <InputField
                  type="text"
                  name="lab_order_id"
                  placeholder="12345"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_code">Lab Code</ModalLabel>
                <InputField
                  type="text"
                  name="lab_code"
                  placeholder="67890"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_coding_qualifer">
                  Lab Coding Qualifer
                </ModalLabel>
                <InputField
                  type="text"
                  name="lab_coding_qualifer"
                  placeholder="PCR"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_description">
                  Lab Description
                </ModalLabel>
                <InputField
                  type="text"
                  name="lab_description"
                  placeholder="COVID-19 swab test"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_specimen_collected_date">
                  Lab Specimen Collected Date
                </ModalLabel>
                <InputField
                  type="date"
                  name="lab_specimen_collected_date"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="observation_date_time">
                  Observation Date & Time
                </ModalLabel>
                <InputField
                  type="datetime-local"
                  name="observation_date_time"
                ></InputField>
              </InputBox>
              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtn type="submit">Submit</SubmitBtn>
              </Actions>
            </form>
          </ModalContent>
        </ModalContentWrapper>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormCredentials
