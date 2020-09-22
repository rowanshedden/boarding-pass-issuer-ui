import React from 'react'

import styled from 'styled-components'

import theme from '../theme.js'

const Header = styled.header`
  margin-bottom: 30px;
  padding: 20px 25px;
  width: 100%;
  font-size: 1.5em;
  text-transform: uppercase;
  color: ${theme.text_color};
  box-shadow: ${theme.drop_shadow};
  background: ${theme.background};
`

function PageHeader(props) {
  return (
    <Header>
      {props.title}
      {props.children}
    </Header>
  )
}

export default PageHeader
