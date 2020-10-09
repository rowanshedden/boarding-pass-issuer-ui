import React from 'react'

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

const ModalContent = styled.div`
  width: 100%;
  padding: 10px 5px;
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
  border-radius: 10px;
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
  border-radius: 10px;
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

function FormCredentials(props) {
  const handleSubmit = (e) => {
    props.submitNewCredential(e)
    props.closeModal()
  }

  function closeModal() {
    props.closeModal()
  }

  return (
    <StyledPopup
      open={props.modalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Add New Credential</ModalHeader>
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
