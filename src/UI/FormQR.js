import React, { useCallback, useEffect, useState } from 'react'

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

  const [waitingForConnection, setWaitingForConnection] = useState(false)

  useEffect(() => {
    if (props.invitationURL !== '' && waitingForConnection === false) {
      setWaitingForConnection(true)
    } else if (props.invitationURL === '' && waitingForConnection === true) {
      setWaitingForConnection(false)
      closeModal()
    }
  }, [props.invitationURL, closeModal, waitingForConnection])

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
            {props.invitationURL ? (
              <QR value={props.invitationURL} size={256} renderAs="svg" />
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
