import React from 'react'

import styled from 'styled-components'

import theme from '../theme.js'

const SectionDiv = styled.div`
  margin-bottom: 30px;
  padding: 20px 25px;
  width: 100%;
  color: ${theme.text_color};
  box-shadow: ${theme.drop_shadow};
  background: ${theme.background};
`

function PageSection(props) {
  return (
    <SectionDiv>
      {props.children}
    </SectionDiv>
  )
}

export default PageSection
