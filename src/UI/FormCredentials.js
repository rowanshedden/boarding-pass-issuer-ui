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

    // constructing JSON to send to the backend
    const newContact = {}
    newContact.contactID = '3'
    newContact.schemaID = 'W1vtCQVTy1aMJAjsHt5UK4:2:Covid_19_Lab_Result:1.3'
    newContact.schemaVersion = '1.3'
    newContact.schemaName = 'Covid_19_Lab_Result'
    newContact.schemaIssuerDID = 'W1vtCQVTy1aMJAjsHt5UK4'
    newContact.comment = ' '
    newContact.attributes = []
    newContact.attributes[0] = {}
    newContact.attributes[0].name = 'result'
    newContact.attributes[0]['mime-type'] = 'string'
    newContact.attributes[0].value = form.get('result')
    newContact.attributes[1] = {}
    newContact.attributes[1].name = 'sending_facility'
    newContact.attributes[1]['mime-type'] = 'string'
    newContact.attributes[1].value = form.get('sending_facility')
    newContact.attributes[2] = {}
    newContact.attributes[2].name = 'lab_specimen_collected_date'
    newContact.attributes[2].value = form.get('lab_specimen_collected_date')
    newContact.attributes[3] = {}
    newContact.attributes[3].name = 'patient_first_name'
    newContact.attributes[3].value = props.selectedContact
      ? props.selectedContact.demographics.first_name
      : ''
    newContact.attributes[4] = {}
    newContact.attributes[4].name = 'patient_last_name'
    newContact.attributes[4].value = props.selectedContact
      ? props.selectedContact.demographics.last_name
      : ''
    newContact.attributes[5] = {}
    newContact.attributes[5].name = 'lab_description'
    newContact.attributes[5].value = form.get('lab_description')
    newContact.attributes[6] = {}
    newContact.attributes[6].name = 'normality'
    newContact.attributes[6].value = form.get('normality')
    newContact.attributes[7] = {}
    newContact.attributes[7].name = 'result_status'
    newContact.attributes[7].value = form.get('status')
    newContact.attributes[8] = {}
    newContact.attributes[8].name = 'comment'
    newContact.attributes[8].value = form.get('comment')
    newContact.attributes[9] = {}
    newContact.attributes[9].name = 'date_time_of_message'
    newContact.attributes[9].value = form.get('date_time_of_message')
    newContact.attributes[10] = {}
    newContact.attributes[10].name = 'ordering_facility_name'
    newContact.attributes[10].value = form.get('ordering_facility_name')
    newContact.attributes[11] = {}
    newContact.attributes[11].name = 'ordering_facility_address'
    newContact.attributes[11].value = form.get('ordering_facility_address')
    newContact.attributes[12] = {}
    newContact.attributes[12].name = 'performing_lab'
    newContact.attributes[12].value = form.get('performing_lab')
    newContact.attributes[13] = {}
    newContact.attributes[13].name = 'visit_location'
    newContact.attributes[13].value = form.get('visit_location')
    newContact.attributes[14] = {}
    newContact.attributes[14].name = 'lab_order_id'
    newContact.attributes[14].value = form.get('lab_order_id')
    newContact.attributes[15] = {}
    newContact.attributes[15].name = 'lab_code'
    newContact.attributes[15].value = form.get('lab_code')
    newContact.attributes[16] = {}
    newContact.attributes[16].name = 'lab_coding_qualifer'
    newContact.attributes[16].value = form.get('lab_coding_qualifer')
    newContact.attributes[17] = {}
    newContact.attributes[17].name = 'observation_date_time'
    newContact.attributes[17].value = form.get('observation_date_time')
    newContact.attributes[18] = {}
    newContact.attributes[18].name = 'mpid'
    newContact.attributes[18].value = props.selectedContact
      ? props.selectedContact.mpid
      : ''
    newContact.attributes[19] = {}
    newContact.attributes[19].name = 'patient_local_id'
    newContact.attributes[19].value = props.selectedContact
      ? props.selectedContact.id
      : ''
    newContact.attributes[20] = {}
    newContact.attributes[20].name = 'patient_date_of_birth'
    newContact.attributes[20].value = props.selectedContact
      ? props.selectedContact.demographics.date_of_birth
      : ''
    newContact.attributes[21] = {}
    newContact.attributes[21].name = 'patient_gender_legal'
    newContact.attributes[21].value = props.selectedContact
      ? props.selectedContact.demographics.gender
      : ''
    newContact.attributes[22] = {}
    newContact.attributes[22].name = 'patient_phone'
    newContact.attributes[22].value = props.selectedContact
      ? props.selectedContact.demographics.phone
      : ''
    newContact.attributes[23] = {}
    newContact.attributes[23].name = 'patient_street_address'
    newContact.attributes[23].value = props.selectedContact
      ? props.selectedContact.demographics.address.address_1 +
        ' ' +
        props.selectedContact.demographics.address.address_2
      : ''
    newContact.attributes[24] = {}
    newContact.attributes[24].name = 'patient_city'
    newContact.attributes[24].value = props.selectedContact
      ? props.selectedContact.demographics.address.city
      : ''
    newContact.attributes[25] = {}
    newContact.attributes[25].name = 'patient_state'
    newContact.attributes[25].value = props.selectedContact
      ? props.selectedContact.demographics.address.state
      : ''
    newContact.attributes[26] = {}
    newContact.attributes[26].name = 'patient_postalcode'
    newContact.attributes[26].value = props.selectedContact
      ? props.selectedContact.demographics.address.zip_code
      : ''
    newContact.attributes[27] = {}
    newContact.attributes[27].name = 'patient_country'
    newContact.attributes[27].value = props.selectedContact
      ? props.selectedContact.demographics.address.country
      : ''

    console.log(JSON.stringify(newContact))

    props.submitNewCredential(e)
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
                {contact.demographics.first_name +
                  ' ' +
                  contact.demographics.last_name}
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
            <InputBox className={props.contactSearch === false ? 'active' : ''}>
              {getContacts()}
            </InputBox>
            <form onSubmit={handleSubmit} ref={credentialForm}>
              <InputBox>
                <ModalLabel htmlFor="name">Test Name</ModalLabel>
                <InputField
                  type="text"
                  name="name"
                  placeholder="COVID-19 Test"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_issued">Date-Time Issued</ModalLabel>
                <InputField
                  type="datetime-local"
                  name="date_issued"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="status">Status</ModalLabel>
                <Select name="status">
                  <option value="" hidden>
                    Choose status
                  </option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="result">Result</ModalLabel>
                <Select name="result">
                  <option value="" hidden>
                    Choose result
                  </option>
                  <option value="negative">Negative</option>
                  <option value="positive">Positive</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="normality">Normality</ModalLabel>
                <Select name="normality">
                  <option value="" hidden>
                    Choose normality
                  </option>
                  <option value="normal">Normal</option>
                  <option value="weird">Weird</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="result_status">Result Status</ModalLabel>
                <Select name="result_status">
                  <option value="" hidden>
                    Choose result status
                  </option>
                  <option value="determined">Determined</option>
                  <option value="stuff">Something else</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="comment">Credential</ModalLabel>
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
                  Credential
                </ModalLabel>
                <InputField
                  type="time"
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
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <InputBox>
              <ModalLabel htmlFor="credential">Credential</ModalLabel>
              <InputField type="test" name="credential"></InputField>
            </InputBox>
            <InputBox>
              <ModalLabel htmlFor="recipient">Recipient</ModalLabel>
              <InputField type="test" name="recipient"></InputField>
            </InputBox>
            <InputBox>
              <ModalLabel htmlFor="dateIssued">Date Issued</ModalLabel>
              <InputField type="test" name="dateIssued"></InputField>
            </InputBox>
            <Actions>
              <CancelBtn type="button" onClick={closeModal}>
                Cancel
              </CancelBtn>
              <SubmitBtn type="submit">Submit</SubmitBtn>
            </Actions>
          </form>
        </ModalContent>
        <CloseBtn onClick={props.closeModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormCredentials
