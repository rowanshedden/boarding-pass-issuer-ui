const localTheme = JSON.parse(localStorage.getItem('recentTheme'))
const defaultTheme = {
  primary_color: '#407CD4',
  secondary_color: '#40ADD4',
  neutral_color: '#091C40',
  negative_color: '#ed003c',
  warning_color: '#e49b13',
  positive_color: '#008a00',
  text_color: '#555',
  text_light: '#fff',
  border: '#e3e3e3',
  drop_shadow: '3px 3px 3px rgba(0, 0, 0, 0.3)',
  background_primary: '#fff',
  background_secondary: '#f5f5f5',
}

const initialState = {
  schemas: {},
  organizationName: null,
  smtp: null,
  logo: null,
  theme: localTheme ? localTheme : defaultTheme,
  siteTitle: '',
}

const SET_LOGO = 'SET_LOGO'
const SET_SCHEMAS = 'SET_SCHEMAS'
const SET_ORGANIZATION_NAME = 'SET_ORGANIZATION_NAME'
const SET_SMTP = 'SET_SMTP'
const SET_THEME = 'SET_THEME'
const SET_SITE_TITLE = 'SET_SITE_TITLE'
const CLEAR_SETTINGS_STATE = 'CLEAR_SETTINGS_STATE'

export function setLogo(logo) {
  return {
    type: SET_LOGO,
    payload: logo,
  }
}

export function setSchemas(schemas) {
  return {
    type: SET_SCHEMAS,
    payload: schemas,
  }
}

export function setOrganizationName(organizationName) {
  return {
    type: SET_ORGANIZATION_NAME,
    payload: organizationName,
  }
}

export function setSmtp(smtp) {
  return {
    type: SET_SMTP,
    payload: smtp,
  }
}

export function setTheme(theme) {
  return {
    type: SET_THEME,
    payload: theme,
  }
}

export function setSiteTitle(siteTitle) {
  return {
    type: SET_SITE_TITLE,
    payload: siteTitle,
  }
}

export function clearSettingsState() {
  return {
    type: CLEAR_SETTINGS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCHEMAS:
      return { ...state, schemas: action.payload }

    case SET_ORGANIZATION_NAME:
      return { ...state, organizationName: action.payload }

    case SET_SMTP:
      return { ...state, smtp: action.payload }

    case SET_LOGO:
      return { ...state, logo: action.payload }

    case SET_THEME:
      return { ...state, theme: action.payload }

    case SET_SITE_TITLE:
      return { ...state, siteTitle: action.payload }

    case CLEAR_SETTINGS_STATE:
      return { ...state, organizationName: null, smtp: null }

    default:
      return state
  }
}