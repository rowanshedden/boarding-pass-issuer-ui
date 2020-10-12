import React, { useState, useRef } from 'react'

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

  :after {
    content: '*';
    color: ${(props) => props.theme.negative_color};
  }
`

const Select = styled.select`
  color: ${(props) => props.theme.text_color};
  font-size: 1.5em;
  height: 30px;
  width: 50%;
`

function FormContacts(props) {
  console.log(props)

  // Assigning contact values from props
  const id = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.id))
    : ''
  const mpid = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.mpid))
    : ''
  const first_name = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.demographics.first_name))
    : ''
  const middle_name = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.demographics.middle_name))
    : ''
  const last_name = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.demographics.last_name))
    : ''
  const date_of_birth = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.date_of_birth)
      )
    : ''
  const gender = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.demographics.gender))
    : ''
  const phone = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.demographics.phone))
    : ''
  const address_1 = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.address.address_1)
      )
    : ''
  const address_2 = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.address.address_2)
      )
    : ''
  const city = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.address.city)
      )
    : ''
  const state = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.address.state)
      )
    : ''
  const zip_code = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.address.zip_code)
      )
    : ''
  const country = props.contactSelected
    ? JSON.parse(
        JSON.stringify(props.contactSelected.demographics.address.country)
      )
    : ''
  const connection_status = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.connection_status))
    : ''
  const credential_status = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.credential_status))
    : ''

  const contactForm = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(contactForm.current)

    // Assembling contact JSON
    const contact = {}
    contact.id = form.get('id')
    contact.mpid = form.get('mpid')
    contact.demographics = {}
    contact.demographics.first_name = form.get('first_name')
    contact.demographics.middle_name = form.get('mid_name')
    contact.demographics.last_name = form.get('last_name')
    contact.demographics.date_of_birth = form.get('date_of_birth')
    contact.demographics.gender = form.get('gender')
    contact.demographics.phone = form.get('phone')
    contact.demographics.address = {}
    contact.demographics.address.address_1 = form.get('address_1')
    contact.demographics.address.address_2 = form.get('address_2')
    contact.demographics.address.city = form.get('city')
    contact.demographics.address.state = form.get('state')
    contact.demographics.address.zip_code = form.get('zip_code')
    contact.demographics.address.country = form.get('country')
    contact.connection_status = form.get('connection_status')
    contact.credential_status = form.get('credential_status')

    // update existing contact if calling the form from contact page
    if (props.source === 'contact') {
      props.updateContact(contact)
    }
    props.submitNewContact(e)
    props.closeContactModal()
  }

  function closeModal() {
    props.closeContactModal()
  }

  return (
    <StyledPopup
      open={props.contactModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Add New Contact</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit} ref={contactForm}>
              <InputBox>
                <ModalLabel htmlFor="mpid">MPID</ModalLabel>
                <InputField
                  type="text"
                  name="mpid"
                  defaultValue={mpid}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="first_name">First Name</ModalLabel>
                <InputField
                  type="text"
                  name="first_name"
                  defaultValue={first_name}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="mid_name">Middile Name</ModalLabel>
                <InputField
                  type="text"
                  name="mid_name"
                  defaultValue={middle_name}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="last_name">Last Name</ModalLabel>
                <InputField
                  type="text"
                  name="last_name"
                  defaultValue={last_name}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_birth">Date Of Birth</ModalLabel>
                <InputField
                  type="date"
                  name="date_of_birth"
                  defaultValue={date_of_birth}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="gender">Gender</ModalLabel>
                <Select name="gender" defaultValue={gender}>
                  <option defaultValue="" hidden>
                    Choose gender
                  </option>
                  <option defaultValue="male">Male</option>
                  <option defaultValue="female">Female</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="phone">Phone</ModalLabel>
                <InputField
                  type="text"
                  name="phone"
                  defaultValue={phone}
                  placeholder="123-456-7890"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="address_1">Address 1</ModalLabel>
                <InputField
                  type="text"
                  name="address_1"
                  defaultValue={address_1}
                  placeholder="123 Main St"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="address_2">Address 2</ModalLabel>
                <InputField
                  type="text"
                  name="address_2"
                  defaultValue={address_2}
                  placeholder="Apt #382"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="city">City</ModalLabel>
                <InputField
                  type="text"
                  name="city"
                  defaultValue={city}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="state">State</ModalLabel>
                <InputField
                  type="text"
                  name="state"
                  defaultValue={state}
                  maxLength="2"
                  placeholder="ID"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="zip_code">Zip Code</ModalLabel>
                <InputField
                  type="text"
                  name="zip_code"
                  defaultValue={zip_code}
                  placeholder="83440"
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="country">Country</ModalLabel>
                <InputField
                  type="text"
                  name="country"
                  defaultValue={country}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="connection_status">
                  Connection Status
                </ModalLabel>
                <InputField
                  type="text"
                  name="connection_status"
                  defaultValue={connection_status}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="credential_status">
                  Credential Status
                </ModalLabel>
                <InputField
                  type="text"
                  name="credential_status"
                  defaultValue={credential_status}
                ></InputField>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="id"></ModalLabel>
                <InputField
                  type="hidden"
                  name="id"
                  defaultValue={id}
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

export default FormContacts
