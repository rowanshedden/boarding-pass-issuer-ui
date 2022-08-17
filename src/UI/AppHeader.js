import Axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import AppMenu from './AppMenu.js'

import { Logo, LogoHolder } from './CommonStylesForms'

const Header = styled.header`
  flex: 3;
  min-width: 240px;
  max-width: 240px;
  min-height: 100vh;
  background: ${(props) => props.theme.background_primary};
`

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  width: 100%;
`

const OrganizationName = styled.h3`
  margin: 10px 0;
  color: ${(props) => props.theme.secondary_color};
  text-align: center;
  text-transform: uppercase;
`

const UserName = styled.h4`
  color: ${(props) => props.theme.primary_color};
  margin: 0;

  text-transform: uppercase;

  // &:hover {
  //   text-decoration: underline;
  //   cursor: pointer;
  // }
`

const Logout = styled.button`
  margin: 5px 12px 0 12px;
  border: none;
  background: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

function AppHeader(props) {
  const loginState = useSelector((state) => state.login)
  const organizationName = useSelector(
    (state) => state.settings.organizationName
  )
  const logo = useSelector((state) => state.settings.logo)

  const handleLogout = (history) => {
    Axios({
      method: 'POST',
      url: '/api/user/log-out',
      withCredentals: true,
    }).then((res) => {
      console.log('the thing', window.location)
      window.location.assign('/admin/login')
    })
  }

  const handleUserProfile = (e) => {
    e.preventDefault()
  }

  return (
    <Header id="app-header">
      <LogoHolder>
        <Logo src={logo} alt="Logo" />
      </LogoHolder>
      <OrganizationName>{organizationName}</OrganizationName>
      <LogoutWrapper>
        <UserName onClick={handleUserProfile}>
          {loginState.loggedInUsername}
        </UserName>
        <Logout onClick={handleLogout}>Log Out</Logout>
      </LogoutWrapper>
      <AppMenu match={props.match} />
    </Header>
  )
}

export default AppHeader
