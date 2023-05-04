import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import QRCode from 'qrcode.react'

import {
  StyledPopup,
  Modal,
  ModalHeader,
  QRModalContent,
  CloseBtn,
  QRHolder,
} from './CommonStylesForms'

const QR = styled(QRCode)`
  display: block;
  margin: auto;
  padding: 10px;
  width: 300px;
`

function FormQR(props) {
  const { closeContactModal } = props
  const closeModal = useCallback(() => {
    closeContactModal()
  }, [closeContactModal])

  const invitationURL = useSelector((state) => state.invitations.invitationURL)
  const [waitingForConnection, setWaitingForConnection] = useState(false)

  useEffect(() => {
    if (invitationURL !== '' && waitingForConnection === false) {
      setWaitingForConnection(true)
    } else if (invitationURL === '' && waitingForConnection === true) {
      setWaitingForConnection(false)
      closeModal()
    }
  }, [invitationURL, closeModal, waitingForConnection])

  return (
    <StyledPopup
      open={props.contactModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Add New Contact</ModalHeader>
        <QRModalContent>
          <QRHolder>
            {invitationURL ? (
              <QR value={invitationURL} size={256} renderAs="svg" />
            ) : (
              <p>Loading...</p>
            )}
          </QRHolder>
        </QRModalContent>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormQR
