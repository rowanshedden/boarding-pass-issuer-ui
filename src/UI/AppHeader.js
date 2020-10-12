import React from 'react'

import styled from 'styled-components'

import AppMenu from './AppMenu.js'

const Header = styled.header`
  flex: 3;
  max-width: 240px;
  min-height: 100vh;
  background: ${(props) => props.theme.background_primary};
`

const Logo = styled.img`
  padding: 20px;
  width: 240px;
`

function AppHeader(props) {
  return (
    <Header id="app-header">
      <Logo src={props.logoPath} alt="Logo" />
      <AppMenu match={props.match} />
    </Header>
  )
}

export default AppHeader
