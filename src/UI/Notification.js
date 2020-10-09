import React from 'react'

import styled from 'styled-components'

const NotificationWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) =>
    props.background === 'notice'
      ? `${props.theme.positive_color}`
      : props.background === 'warning'
      ? `${props.theme.warning_color}`
      : props.background === 'error'
      ? `${props.theme.negative_color}`
      : `${props.theme.negative_color}`};
  color: #fff;
  margin-bottom: 15px;
  position: fixed;
  top: 0;
  margin-left: 20%;
  width: 40%;
  text-align: center;
  opacity: ${(props) => props.opacity};
  display: ${(props) => props.state};
  transition: 6s;
`

const NotificationCloseBtn = styled.span`
  margin-left: 15px;
  color: #fff;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
`

function Notification(props) {
  function closeNotification() {
    props.closeNotification()
  }
  let background = '#f80'

  switch (props.type) {
    case 'notice':
      background = 'notice'
      break
    case 'warning':
      background = 'warning'
      break
    case 'error':
      background = 'error'
      break
    default:
      background = 'error'
  }

  let state = 'none'
  let opacity = '0'
  if (props.state === 'open') {
    state = 'block'
    opacity = '1'
  } else {
    state = 'none'
    opacity = '0'
  }

  return (
    <NotificationWrapper
      background={background}
      state={state}
      opacity={opacity}
    >
      <NotificationCloseBtn
        onClick={() => {
          closeNotification()
        }}
      >
        &times;
      </NotificationCloseBtn>
      {props.message}
    </NotificationWrapper>
  )
}

export default Notification
