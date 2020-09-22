import React from 'react'

import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import theme from '../theme.js'

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;

  & ul {
    display: none;
    position: relative;
    top: -12px;
    padding: 0 0 0 20px;
  }
`

const Item = styled.li`
  border-bottom: 1px solid ${theme.border};

  &:first-child {
    border-top: 1px solid ${theme.border};
  }

  & li,
  & li:first-child {
    border: none;
  }

  & a.active {
    border-right: 3px solid ${theme.primary};
    background: ${theme.background_secondary};
  }

  &.active ul {
    display: block;
  }
`

const StyledLink = styled(NavLink)`
  display: block;
  padding: 20px 0 20px 20px;

  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  color: ${theme.text_color};

  &:hover,
  &.active {
    text-decoration: underline;
    color: ${theme.primary};
  }
`

const StyledSubLink = styled(NavLink)`
  display: block;
  padding: 10px 0 10px 20px;

  font-size: 14px;
  text-decoration: none;
  color: ${theme.text_color};

  &:hover,
  &.active {
    text-decoration: underline;
    color: ${theme.primary};
  }
`

function AppMenu(match) {
  let pathMatch = ''
  if (match.path !== undefined) {
    pathMatch = match.path
  }

  return (
    <nav id="app-menu">
      <List>
        <Item className={pathMatch === '/' ? 'active' : undefined}>
          <StyledLink exact to="/">
            Home
          </StyledLink>
        </Item>
        <Item className={pathMatch === '/contacts' ? 'active' : undefined}>
          <StyledLink to="/contacts">Contacts</StyledLink>
          {/*<List>
            <Item>
              <StyledSubLink exact to="/contacts">
                Contacts
              </StyledSubLink>
            </Item>
            <Item>
              <StyledSubLink to="/contacts/invitations">
                Invitations
              </StyledSubLink>
            </Item>
          </List>*/}
        </Item>
        <Item className={pathMatch === '/credentials' ? 'active' : undefined}>
          <StyledLink to="/credentials">Credentials</StyledLink>
        </Item>
        <Item className={pathMatch === '/settings' ? 'active' : undefined}>
          <StyledLink to="/settings">Settings</StyledLink>
        </Item>
      </List>
    </nav>
  )
}

export default AppMenu
