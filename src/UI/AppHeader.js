import React from 'react'

import styled from 'styled-components'

import AppMenu from './AppMenu.js'

import theme from '../theme.js'

import logo from '../logo.gif'

const Header = styled.header`
  flex: 3;
  max-width: 240px;
  min-height: 100vh;
  background: ${theme.background};
`

const Logo = styled.img`
  padding: 20px;
  width: 240px;
`

function AppHeader(match) {
  return (
    <Header id="app-header">
      <Logo src={logo} alt="Logo" />
      <AppMenu match={match} />
    </Header>
  )
}

export default AppHeader
