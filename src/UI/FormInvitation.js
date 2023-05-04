import React, { useState, useRef, useEffect } from 'react'

import {
  Actions,
  CancelBtn,
  CloseBtn,
  InputBox,
  InputFieldModal,
  Modal,
  ModalContentWrapper,
  ModalContent,
  ModalHeader,
  ModalLabel,
  Select,
  StyledPopup,
  SubmitBtnModal,
} from './CommonStylesForms'

import { useNotification } from './NotificationProvider'

function FormInvitation(props) {
  const error = props.error

  useEffect(() => {
    if (error && submitBtn.current) {
      submitBtn.current.removeAttribute('disabled')
    }
  }, [error])

  // Accessing notification context
  const setNotification = useNotification()

  const invitationForm = useRef()
  const submitBtn = useRef()
  const [multiUse, setMultiUse] = useState(false)
  const [outOfBand, setOutOfBand] = useState(false)

  // Disable button on submit
  const onBtnClick = (e) => {
    if (submitBtn.current) {
      submitBtn.current.setAttribute('disabled', 'disabled')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onBtnClick()

    const form = new FormData(invitationForm.current)
    let invitation = {}

    const oob = form.get('oob') === 'true' ? true : false
    const protocol = form.get('protocol')

    if (protocol !== 'DID_EXCHANGE') {
      invitation.handshakeProtocol =
        'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0'
    } else {
      invitation.handshakeProtocol =
        'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/didexchange/1.0'
    }

    invitation.alias = form.get('alias')
    invitation.invitationMode = form.get('invitationMode')
    invitation.accept = form.get('accept')
    invitation.public = form.get('public') === 'true' ? true : false
    invitation.invitationRole = form.get('invitationRole')
    invitation.invitationLabel = form.get('invitationLabel')
    invitation.invitationStatus = form.get('invitationStatus')
    invitation.invitationDescription = form.get('invitationDescription')
    invitation.invitationActiveStartingAt = form.get(
      'invitationActiveStartingAt'
    )
    invitation.invitationActiveEndingAt = form.get('invitationActiveEndingAt')
    invitation.usesAllowed = form.get('usesAllowed')

    if (invitation.public && invitation.invitationMode === 'multi') {
      return setNotification(
        'Cannot create public invitation with multi use.',
        'error'
      )
    }

    if (oob) {
      props.sendRequest('OUT_OF_BAND', 'CREATE_INVITATION', invitation)
    } else {
      props.sendRequest('INVITATIONS', 'CREATE', invitation)
    }
    setNotification('Invitation was successfully added!', 'notice')
    setOutOfBand(false)
    setMultiUse(false)
    closeCreateInvModal(false)
  }

  function closeCreateInvModal() {
    setOutOfBand(false)
    setMultiUse(false)
    props.closeCreateInvModal()
  }

  return (
    <StyledPopup
      open={props.createInvModalIsOpen}
      closeOnDocumentClick
      onClose={closeCreateInvModal}
    >
      <Modal>
        <ModalHeader>Create New Invitation</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit} ref={invitationForm}>
              <InputBox>
                <ModalLabel htmlFor="oob">OOB Invitation</ModalLabel>
                <Select
                  onChange={(e) => setOutOfBand(e.target.value === 'true')}
                  name="oob"
                  id="oob"
                  required
                >
                  <option value=""></option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select>
              </InputBox>
              {outOfBand ? (
                <InputBox>
                  <ModalLabel htmlFor="protocol">Protocol</ModalLabel>
                  <Select name="protocol" id="protocol" required>
                    <option value={'DID_EXCHANGE'}>DID Exchange</option>
                    <option value={'CONNECTIONS_V1'}>Connections v.1</option>
                  </Select>
                </InputBox>
              ) : null}
              <InputBox>
                <ModalLabel htmlFor="alias">Alias</ModalLabel>
                <InputFieldModal
                  type="alias"
                  name="alias"
                  id="alias"
                  required
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="Invitation Mode">
                  Invitation Mode
                </ModalLabel>
                <Select
                  onChange={(e) => setMultiUse(e.target.value === 'multi')}
                  name="invitationMode"
                  id="invitationMode"
                  required
                >
                  <option value=""></option> <option value="once">Once</option>
                  <option value="multi">Multi</option>
                </Select>
              </InputBox>
              {multiUse ? (
                <InputBox>
                  <ModalLabel htmlFor="Uses Allowed">Uses Allowed</ModalLabel>
                  <InputFieldModal
                    type="usesAllowed"
                    name="usesAllowed"
                    id="usesAllowed"
                  />
                </InputBox>
              ) : null}
              <InputBox>
                <ModalLabel htmlFor="Accept">Accept</ModalLabel>
                <Select name="accept" id="accept" required>
                  <option value=""></option>
                  <option value="auto">Auto</option>
                  <option value="manual">Manual</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="public">Public</ModalLabel>
                <Select name="public" id="public" required>
                  <option value=""></option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="Role">Their Role</ModalLabel>
                <InputFieldModal
                  type="invitationRole"
                  name="invitationRole"
                  id="invitationRole"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="Label">Their Label</ModalLabel>
                <InputFieldModal
                  type="invitationLabel"
                  name="invitationLabel"
                  id="invitationLabel"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="Status">Workflow Status</ModalLabel>
                <Select name="invitationStatus" id="invitationStatus" required>
                  <option value=""></option> {' '}
                  <option value="active">Active</option> {' '}
                  <option value="inactive">Inactive</option>
                  <option value="deleted">Deleted</option>
                </Select>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="Description">Description</ModalLabel>
                <InputFieldModal
                  type="invitationDescription"
                  name="invitationDescription"
                  id="invitationDescription"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="invitationActiveStartingAt">
                  Active Starting Time
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="invitationActiveStartingAt"
                  id="invitationActiveStartingAt"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="invitationActiveEndingAt">
                  Active Ending Time
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="invitationActiveEndingAt"
                  id="invitationActiveEndingAt"
                />
              </InputBox>
              <Actions>
                <CancelBtn type="button" onClick={closeCreateInvModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtnModal type="submit" ref={submitBtn}>
                  Submit
                </SubmitBtnModal>
              </Actions>
            </form>
          </ModalContent>
        </ModalContentWrapper>
        <CloseBtn onClick={closeCreateInvModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormInvitation
