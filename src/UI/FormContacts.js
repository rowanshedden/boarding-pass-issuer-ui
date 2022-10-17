import React, { useRef } from 'react'

import {
  StyledPopup,
  InputBox,
  Modal,
  ModalHeader,
  ModalSubHeader,
  ModalContentWrapper,
  ModalContent,
  CloseBtn,
  Actions,
  CancelBtn,
  SubmitBtnModal,
  ModalLabel,
  InputFieldModal,
} from './CommonStylesForms'

function FormContacts(props) {
  // Assigning contact values from props
  const contact_id = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.contact_id))
    : ''
  const email =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.traveler_email)
        )
      : ''
  const phone =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.traveler_phone)
        )
      : ''
  const country =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.traveler_country)
        )
      : ''
  const traveler_country_of_origin =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.traveler_country_of_origin
          )
        )
      : ''
  const arrival_airline =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.arrival_airline)
        )
      : ''
  const arrival_date =
    props.contactSelected &&
    props.contactSelected.Traveler &&
    props.contactSelected.Traveler.arrival_date
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.arrival_date.split('T')[0]
          )
        )
      : ''
  const arrival_destination_country_code =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.arrival_destination_country_code
          )
        )
      : ''
  const arrival_destination_port_code =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.arrival_destination_port_code
          )
        )
      : ''
  const arrival_flight_number =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.arrival_flight_number)
        )
      : ''

  const departure_airline =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.departure_airline)
        )
      : ''
  const departure_date =
    props.contactSelected &&
    props.contactSelected.Traveler &&
    props.contactSelected.Traveler.departure_date
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.departure_date.split('T')[0]
          )
        )
      : ''
  const departure_destination_country_code =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.departure_destination_country_code
          )
        )
      : ''
  const departure_destination_port_code =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Traveler.departure_destination_port_code
          )
        )
      : ''
  const departure_flight_number =
    props.contactSelected && props.contactSelected.Traveler
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Traveler.departure_flight_number)
        )
      : ''

  const passport_number =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_number)
        )
      : ''
  const surname =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_surnames)
        )
      : ''
  const given_names =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_given_names)
        )
      : ''
  const sex =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_gender_legal)
        )
      : ''
  const date_of_birth =
    props.contactSelected &&
    props.contactSelected.Passport &&
    props.contactSelected.Passport.passport_date_of_birth
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.passport_date_of_birth.split('T')[0]
          )
        )
      : ''
  const nationality =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_nationality)
        )
      : ''
  const date_of_issue =
    props.contactSelected &&
    props.contactSelected.Passport &&
    props.contactSelected.Passport.passport_date_of_issue
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.passport_date_of_issue.split('T')[0]
          )
        )
      : ''
  const date_of_expiration =
    props.contactSelected &&
    props.contactSelected.Passport &&
    props.contactSelected.Passport.passport_date_of_expiration
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.passport_date_of_expiration.split(
              'T'
            )[0]
          )
        )
      : ''
  const authority =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_authority)
        )
      : ''
  const issuing_state =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_issuing_state)
        )
      : ''
  const dtc =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.passport_dtc))
      : ''
  const upk =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.passport_upk))
      : ''
  const created_date =
    props.contactSelected &&
    props.contactSelected.Passport &&
    props.contactSelected.Passport.passport_created_date
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.passport_created_date.split('T')[0]
          )
        )
      : ''

  const contactForm = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(contactForm.current)

    // Assembling traveler JSON
    const traveler = {}
    traveler.contact_id = props.contactSelected.contact_id
    traveler.traveler_email = form.get('email')
    traveler.traveler_phone = form.get('phone')
    // traveler.address = {}
    traveler.traveler_country = form.get('country')
    traveler.traveler_country_of_origin = form.get('traveler_country_of_origin')
    traveler.arrival_airline = form.get('arrival_airline')
    traveler.arrival_date = form.get('arrival_date')
    traveler.arrival_destination_country_code = form.get(
      'arrival_destination_country_code'
    )
    traveler.arrival_destination_port_code = form.get(
      'arrival_destination_port_code'
    )
    traveler.arrival_flight_number = form.get('arrival_flight_number')

    traveler.departure_airline = form.get('departure_airline')
    traveler.departure_date = form.get('departure_date')
    traveler.departure_destination_country_code = form.get(
      'departure_destination_country_code'
    )
    traveler.departure_destination_port_code = form.get(
      'departure_destination_port_code'
    )
    traveler.departure_flight_number = form.get('departure_flight_number')

    props.submitTraveler(traveler, e)

    const passport = {}
    passport.contact_id = props.contactSelected.contact_id
    passport.passport_number = form.get('passport_number')
    passport.passport_surnames = form.get('surname')
    passport.passport_given_names = form.get('given_names')
    passport.passport_gender_legal = form.get('sex')
    passport.passport_date_of_birth = form.get('date_of_birth')
    passport.passport_nationality = form.get('nationality')
    passport.passport_date_of_issue = form.get('date_of_issue')
    passport.passport_date_of_expiration = form.get('date_of_expiration')
    passport.passport_authority = form.get('authority')
    passport.passport_issuing_state = form.get('issuing_state')
    passport.passport_dtc = form.get('dtc')
    passport.passport_upk = form.get('upk')
    passport.passport_created_date = form.get('created_date')
    // passport.photo = props.contactSelected.Passport ? props.contactSelected.Passport.photo.data : ''

    props.submitPassport(passport, e)

    props.closeContactModal()
    // window.location.reload()
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
        <ModalHeader>Edit Contact</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit} ref={contactForm}>
              <ModalSubHeader>Traveler</ModalSubHeader>
              <InputBox>
                <ModalLabel htmlFor="email">Email</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="email"
                  defaultValue={email}
                  placeholder="name@email.com"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="phone">Phone</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="phone"
                  defaultValue={phone}
                  placeholder="123-456-7890"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="country">Country</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="country"
                  defaultValue={country}
                  // placeholder="123 Main St"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="traveler_country_of_origin">
                  Country of Origin
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="traveler_country_of_origin"
                  defaultValue={traveler_country_of_origin}
                  // placeholder="Apt. #382"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="arrival_airline">
                  Arrival Airline
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="arrival_airline"
                  defaultValue={arrival_airline}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="arrival_date">Arrival Date</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="arrival_date"
                  defaultValue={arrival_date}
                  // maxLength="2"
                  // placeholder="ID"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="arrival_destination_country_code">
                  Arrival Destination Country Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="arrival_destination_country_code"
                  defaultValue={arrival_destination_country_code}
                  // placeholder="83440"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="arrival_destination_port_code">
                  Arrival Destination Port Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="arrival_destination_port_code"
                  defaultValue={arrival_destination_port_code}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="arrival_flight_number">
                  Arrival Flight Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="arrival_flight_number"
                  defaultValue={arrival_flight_number}
                ></InputFieldModal>
              </InputBox>

              <InputBox>
                <ModalLabel htmlFor="departure_airline">
                  Departure Airline
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="departure_airline"
                  defaultValue={departure_airline}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="departure_date">Departure Date</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="departure_date"
                  defaultValue={departure_date}
                  // maxLength="2"
                  // placeholder="ID"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="departure_destination_country_code">
                  Departure Destination Country Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="departure_destination_country_code"
                  defaultValue={departure_destination_country_code}
                  // placeholder="83440"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="departure_destination_port_code">
                  Departure Destination Port Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="departure_destination_port_code"
                  defaultValue={departure_destination_port_code}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="departure_flight_number">
                  Departure Flight Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="departure_flight_number"
                  defaultValue={departure_flight_number}
                ></InputFieldModal>
              </InputBox>

              <InputBox>
                <ModalLabel htmlFor="contact_id"></ModalLabel>
                <InputFieldModal
                  type="hidden"
                  name="contact_id"
                  defaultValue={contact_id}
                ></InputFieldModal>
              </InputBox>
              <ModalSubHeader>Passport</ModalSubHeader>
              <InputBox>
                <ModalLabel htmlFor="passport_number">
                  Passport Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="passport_number"
                  defaultValue={passport_number}
                  placeholder="444561807"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="surname">Surname</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="surname"
                  defaultValue={surname}
                  placeholder="Doe"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="given_names">Given Names</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="given_names"
                  defaultValue={given_names}
                  placeholder="Jon"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="sex">Official Gender</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="sex"
                  defaultValue={sex}
                  placeholder="Female"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_birth">Date of Birth</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="date_of_birth"
                  defaultValue={date_of_birth}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="nationality">Nationality</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="nationality"
                  defaultValue={nationality}
                  placeholder="United States of America"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_issue">Date of Issue</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="date_of_issue"
                  defaultValue={date_of_issue}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_expiration">
                  Date of Expiration
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="date_of_expiration"
                  defaultValue={date_of_expiration}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="authority">Authority</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="authority"
                  defaultValue={authority}
                  placeholder="United States Department of State"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="issuing_state">Issuing State</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="issuing_state"
                  defaultValue={issuing_state}
                  placeholder=""
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="dtc">DTC</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="dtc"
                  defaultValue={dtc}
                  placeholder=""
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="upk">UPK</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="upk"
                  defaultValue={upk}
                  placeholder=""
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="created_date">Created Date</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="created_date"
                  defaultValue={created_date}
                  placeholder=""
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="contact_id"></ModalLabel>
                <InputFieldModal
                  type="hidden"
                  name="contact_id"
                  defaultValue={contact_id}
                ></InputFieldModal>
              </InputBox>

              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtnModal type="submit">Submit</SubmitBtnModal>
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
