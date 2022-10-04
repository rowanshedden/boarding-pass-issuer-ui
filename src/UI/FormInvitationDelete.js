import React, { useRef, useEffect } from 'react'

import {
  StyledPopup,
  Modal,
  ModalHeader,
  ModalContentWrapper,
  ModalContent,
  CloseBtn,
  Actions,
  CancelBtn,
  SubmitBtnModal,
} from './CommonStylesForms'

function FormInvitationDelete(props) {
  const invitationID = props.invitationId
  const success = props.successMessage

  const error = props.error

  const submitBtn = useRef()

  useEffect(() => {
    if (error && submitBtn.current) {
      submitBtn.current.removeAttribute('disabled')
    }
  }, [error])

  // Disable button on submit
  const onBtnClick = (e) => {
    if (submitBtn.current) {
      submitBtn.current.setAttribute('disabled', 'disabled')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onBtnClick()
    closeDeleteModal()
    props.sendRequest('INVITATIONS', 'DELETE', invitationID)
    if (props.history !== undefined) {
      props.history.push('/invitations/')
    }
  }

  function closeDeleteModal() {
    props.closeDeleteModal()
  }

  return (
    <StyledPopup
      open={props.deleteInvitationModalIsOpen}
      closeOnDocumentClick
      onClose={closeDeleteModal}
    >
      <Modal className="modal">
        <ModalHeader>
          Are you sure you want to delete this invitation?
        </ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit}>
              <Actions>
                <CancelBtn type="button" onClick={closeDeleteModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtnModal type="submit" ref={submitBtn}>
                  Remove
                </SubmitBtnModal>
              </Actions>
            </form>
          </ModalContent>
        </ModalContentWrapper>
        <CloseBtn onClick={closeDeleteModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormInvitationDelete
