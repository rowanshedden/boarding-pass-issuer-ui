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

function AppHeader(match) {
  return (
    <Header id="app-header">
      <Logo src={match.logoPath} alt="Logo" />
      <AppMenu match={match} />
    </Header>
  )
}

export default AppHeader
