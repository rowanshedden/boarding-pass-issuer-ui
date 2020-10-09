import React, { useRef, useState } from 'react'

import axios from 'axios'
import styled from 'styled-components'

import Notification from './Notification'
import PageHeader from './PageHeader'
import PageSection from './PageSection'

const PrimaryColorTest = styled.input`
  background: ${(props) => props.theme.primary_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const SecondaryColorTest = styled.input`
  background: ${(props) => props.theme.secondary_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const NeutralColorTest = styled.input`
  background: ${(props) => props.theme.neutral_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const NegativeColorTest = styled.input`
  background: ${(props) => props.theme.negative_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const WarningColorTest = styled.input`
  background: ${(props) => props.theme.warning_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const PositiveColorTest = styled.input`
  background: ${(props) => props.theme.positive_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const TextColorTest = styled.input`
  background: ${(props) => props.theme.text_color};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const TextLightTest = styled.input`
  background: ${(props) => props.theme.text_light};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const BorderTest = styled.input`
  background: ${(props) => props.theme.secondary_color};
  border: ${(props) => props.theme.border};
  margin-left: 50px;
  width: 17px;
`
const DropShadowTest = styled.input`
  background: ${(props) => props.theme.neutral_color};
  border: none;
  margin-left: 50px;
  width: 17px;
  box-shadow: ${(props) => props.theme.drop_shadow};
`
const PrimaryBackgroundTest = styled.input`
  background: ${(props) => props.theme.background_primary};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const SecondaryBackgroundTest = styled.input`
  background: ${(props) => props.theme.background_secondary};
  border: none;
  margin-left: 50px;
  width: 17px;
`
const UndoStyle = styled.button`
  width: 60px;
  background: ${(props) => props.theme.warning_color};
  padding: 5px;
  color: ${(props) => props.theme.text_light};
  border: none;
  margin-left: 20px;
  box-shadow: ${(props) => props.theme.drop_shadow};
  display: none;

  &.active {
    display: inline-block;
  }
`

const SaveStyle = styled.button`
  width: 80px;
  background: ${(props) => props.theme.primary_color};
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  float: right;
  box-shadow: ${(props) => props.theme.drop_shadow};
`

const SubmitFormBtn = styled.button``
const ColorInput = styled.input``
const FileInput = styled.input``
const Form = styled.form`
  margin-bottom: 15px;
  height: 72px;
`

function Settings(props) {
  //Notification state
  const [notification, setNotification] = useState(
    'There is no notification to display'
  )
  const [notificationState, setNotificationState] = useState('closed')
  const [notificationType, setNotificationType] = useState('notice')

  // File state
  const [selectedFile, setSelectedFile] = useState('')
  const [fileName, setFileName] = useState('Choose file')
  const [uploadedFile, setUploadedFile] = useState({})

  // Input References
  const primaryColorInput = useRef(null)
  const secondaryColorInput = useRef(null)
  const neutralColorInput = useRef(null)
  const negativeColorInput = useRef(null)
  const warningColorInput = useRef(null)
  const positiveColorInput = useRef(null)
  const textColorInput = useRef(null)
  const textLightInput = useRef(null)
  const borderInput = useRef(null)
  const dropShadowInput = useRef(null)
  const primaryBackgroundInput = useRef(null)
  const secondaryBackgroundInput = useRef(null)

  // Closes notification
  const closeNotification = (e) => {
    setNotificationState('closed')
  }

  const handleColorSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
  }

  // Theme style attribute change
  const changeThemeStyles = (key, value) => {
    if (value) {
      props.updateTheme({ [`${key}`]: value })
      props.addStylesToArray(key)
    }
  }

  // Setting the style to the default value
  const undoStyle = (key) => {
    props.undoStyle(key)
    props.removeStylesFromArray(key)
  }

  function saveStyle() {
    setNotificationState('open')
    setNotification('The style was successfully changed')
  }

  // File upload
  let fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setFileName(event.target.files[0].name)
  }

  const handleFileSubmit = async (e) => {
    e.preventDefault()
    props.changeLogo()
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const { fileName, filePath } = res.data

      setUploadedFile({ fileName, filePath })
      // push it the public/assets folder

      // console.log(uploadedFile)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        // console.log(err.response.data.msg)
        console.log('The file is not being saved because there is not backend')
      }
    }
  }

  return (
    <>
      <Notification
        type={notificationType}
        message={notification}
        state={notificationState}
        closeNotification={closeNotification}
      ></Notification>
      <PageHeader title={'Settings'} />
      <PageSection>
        <h2>Change logo</h2>
        <Form onSubmit={handleFileSubmit}>
          <FileInput type="file" onChange={fileSelectHandler}></FileInput>
          <SubmitFormBtn type="submit">Upload</SubmitFormBtn>
        </Form>
      </PageSection>
      <PageSection>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change primary color</h2>
          <ColorInput placeholder="hex or string" ref={primaryColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'primary_color',
                primaryColorInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <PrimaryColorTest disabled></PrimaryColorTest>
          <UndoStyle
            className={
              props.stylesArray.includes('primary_color') ? 'active' : ''
            }
            onClick={() => undoStyle('primary_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change secondary color</h2>
          <ColorInput placeholder="hex or string" ref={secondaryColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'secondary_color',
                secondaryColorInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <SecondaryColorTest disabled></SecondaryColorTest>
          <UndoStyle
            className={
              props.stylesArray.includes('secondary_color') ? 'active' : ''
            }
            onClick={() => undoStyle('secondary_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change neutral color</h2>
          <ColorInput placeholder="hex or string" ref={neutralColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'neutral_color',
                neutralColorInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <NeutralColorTest disabled></NeutralColorTest>
          <UndoStyle
            className={
              props.stylesArray.includes('neutral_color') ? 'active' : ''
            }
            onClick={() => undoStyle('neutral_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change negative color</h2>
          <ColorInput placeholder="hex or string" ref={negativeColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'negative_color',
                negativeColorInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <NegativeColorTest disabled></NegativeColorTest>
          <UndoStyle
            className={
              props.stylesArray.includes('negative_color') ? 'active' : ''
            }
            onClick={() => undoStyle('negative_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change warning color</h2>
          <ColorInput placeholder="hex or string" ref={warningColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'warning_color',
                warningColorInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <WarningColorTest disabled></WarningColorTest>
          <UndoStyle
            className={
              props.stylesArray.includes('warning_color') ? 'active' : ''
            }
            onClick={() => undoStyle('warning_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change positive color</h2>
          <ColorInput placeholder="hex or string" ref={positiveColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'positive_color',
                positiveColorInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <PositiveColorTest disabled></PositiveColorTest>
          <UndoStyle
            className={
              props.stylesArray.includes('positive_color') ? 'active' : ''
            }
            onClick={() => undoStyle('positive_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change text color</h2>
          <ColorInput placeholder="hex or string" ref={textColorInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles('text_color', textColorInput.current.value)
            }
          >
            Change
          </SubmitFormBtn>
          <TextColorTest disabled></TextColorTest>
          <UndoStyle
            className={props.stylesArray.includes('text_color') ? 'active' : ''}
            onClick={() => undoStyle('text_color')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change text light</h2>
          <ColorInput placeholder="hex or string" ref={textLightInput} />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles('text_light', textLightInput.current.value)
            }
          >
            Change
          </SubmitFormBtn>
          <TextLightTest disabled></TextLightTest>
          <UndoStyle
            className={props.stylesArray.includes('text_light') ? 'active' : ''}
            onClick={() => undoStyle('text_light')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change border</h2>
          <ColorInput
            placeholder="5px solid #ff0000 or string"
            ref={borderInput}
          />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles('border', borderInput.current.value)
            }
          >
            Change
          </SubmitFormBtn>
          <BorderTest disabled></BorderTest>
          <UndoStyle
            className={props.stylesArray.includes('border') ? 'active' : ''}
            onClick={() => undoStyle('border')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change drop shadow</h2>
          <ColorInput
            placeholder="3px 3px 3px rgba(0, 0, 0, 0.3)"
            ref={dropShadowInput}
          />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles('drop_shadow', dropShadowInput.current.value)
            }
          >
            Change
          </SubmitFormBtn>
          <DropShadowTest disabled></DropShadowTest>
          <UndoStyle
            className={
              props.stylesArray.includes('drop_shadow') ? 'active' : ''
            }
            onClick={() => undoStyle('drop_shadow')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change primary background</h2>
          <ColorInput
            placeholder="hex or string"
            ref={primaryBackgroundInput}
          />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'background_primary',
                primaryBackgroundInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <PrimaryBackgroundTest disabled></PrimaryBackgroundTest>
          <UndoStyle
            className={
              props.stylesArray.includes('background_primary') ? 'active' : ''
            }
            onClick={() => undoStyle('background_primary')}
          >
            Undo
          </UndoStyle>
        </Form>
        <Form onSubmit={handleColorSubmit}>
          <h2>Change secondary background</h2>
          <ColorInput
            placeholder="hex or string"
            ref={secondaryBackgroundInput}
          />
          <SubmitFormBtn
            type="submit"
            onClick={() =>
              changeThemeStyles(
                'background_secondary',
                secondaryBackgroundInput.current.value
              )
            }
          >
            Change
          </SubmitFormBtn>
          <SecondaryBackgroundTest disabled></SecondaryBackgroundTest>
          <UndoStyle
            className={
              props.stylesArray.includes('background_secondary') ? 'active' : ''
            }
            onClick={() => undoStyle('background_secondary')}
          >
            Undo
          </UndoStyle>
          <SaveStyle onClick={saveStyle}>Save all</SaveStyle>
        </Form>
      </PageSection>
    </>
  )
}

export default Settings
