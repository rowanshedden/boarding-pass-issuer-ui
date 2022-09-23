import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useNotification } from './NotificationProvider'
import { CanUser } from './CanUser'

// import FormContacts from './FormContacts'
import FormQR from './FormQR'
import { useNotification } from './NotificationProvider'
import PageHeader from './PageHeader'
import PageSection from './PageSection'

import { DataTable, DataRow, DataHeader, DataCell } from './CommonStylesTables'
import {
  ActionButton,
  SubmitBtn,
  Button,
  contactsSortSelected,
} from './CommonStylesForms'

const JumpToPage = styled.input`
  margin: auto 10px auto 0;
  width: 60px;
  font-size: 1em;
  color: ${(props) => props.theme.primary_color};
`

function Contacts(props) {
  const localUser = props.loggedInUserState
  const contactsPagination = props.contacts
    ? props.contacts.params
      ? props.contacts.params
      : {}
    : {}
  const connectionsPagination = props.pendingConnections
    ? props.pendingConnections.params
      ? props.pendingConnections.params
      : {}
    : {}

  // Accessing notification context
  const setNotification = useNotification()

  const contactsPaginationRef = useRef()
  const connectionsPaginationRef = useRef()

  // Contacts pagination
  const [contactsPageSize, setContactsPageSize] = useState(
    contactsPagination.pageSize
  )
  const [contactsCurrentPage, setContactsCurrentPage] = useState(
    contactsPagination.currentPage ? contactsPagination.currentPage : 1
  )
  const [contactsPageCount, setContactsPageCount] = useState(
    contactsPagination.pageCount
  )
  const [contactsItemCount, setContactsItemCount] = useState(
    contactsPagination.itemCount
  )

  const [contactsJumpPage, setContactsJumpPage] = useState(
    contactsPagination.currentPage ? contactsPagination.currentPage : 1
  )

  const [contactsSortSelected, setContactsSortSelected] = useState([
    ['updated_at', 'DESC'],
  ])
  const [contactsPaginationSort, setContactsPaginationSort] = useState(
    contactsSortSelected
  )

  // Pending Connections pagination
  const [connectionsPageSize, setConnectionsPageSize] = useState(
    contactsPagination.pageSize
  )
  const [connectionsCurrentPage, setConnectionsCurrentPage] = useState(
    contactsPagination.currentPage ? contactsPagination.currentPage : 1
  )
  const [connectionsPageCount, setConnectionsPageCount] = useState(
    contactsPagination.pageCount
  )
  const [connectionsItemCount, setConnectionsItemCount] = useState(
    contactsPagination.itemCount
  )

  const [connectionsJumpPage, setConnectionsJumpPage] = useState(
    contactsPagination.currentPage ? contactsPagination.currentPage : 1
  )

  const [connectionsSortSelected, setConnectionsSortSelected] = useState([
    ['updated_at', 'DESC'],
  ])
  const [connectionsPaginationSort, setConnectionsPaginationSort] = useState(
    contactsSortSelected
  )

  useEffect(() => {
    setContactsPaginationSort(contactsSortSelected)
    setContactsPageSize(contactsPagination.pageSize)
    setContactsCurrentPage(contactsPagination.currentPage)
    setContactsPageCount(contactsPagination.pageCount)
    setContactsItemCount(contactsPagination.itemCount)

    setContactsJumpPage(contactsPagination.currentPage)
  }, [props.contacts])

  useEffect(() => {
    setConnectionsSortSelected(connectionsSortSelected)
    setConnectionsPageSize(connectionsPagination.pageSize)
    setConnectionsCurrentPage(connectionsPagination.currentPage)
    setConnectionsPageCount(connectionsPagination.pageCount)
    setConnectionsItemCount(connectionsPagination.itemCount)

    setConnectionsJumpPage(connectionsPagination.currentPage)
  }, [props.pendingConnections])

  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)

  const closeContactModal = () => setContactModalIsOpen(false)

  function openContact(history, id) {
    if (history !== undefined) {
      history.push('/contacts/' + id)
    }
  }

  const history = props.history

  const contacts = props.contacts
    ? props.contacts.rows
      ? props.contacts.rows
      : []
    : []

  const pendingConnections = props.pendingConnections
    ? props.pendingConnections.rows
      ? props.pendingConnections.rows
      : []
    : []

  function nextPage(paginationType) {
    if (paginationType === 'CONTACTS') {
      // const paginationForm = new FormData(contactsPaginationRef.current)

      let nextPage = Math.min(
        parseInt(contactsCurrentPage) + 1,
        contactsPageCount
      )

      setContactsCurrentPage(nextPage)
      setContactsJumpPage(nextPage)

      props.sendRequest('CONTACTS', 'GET_ALL', {
        params: {
          sort: contactsPaginationSort,
          pageSize: contactsPageSize,
          currentPage: nextPage,
          pageCount: Math.ceil(contacts.count / contactsPageSize),
          itemCount: contactsItemCount,
        },
        additional_tables: ['Demographic', 'Passport'],
      })
    } else if (paginationType === 'CONNECTIONS') {
      // const paginationForm = new FormData(contactsPaginationRef.current)

      let nextPage = Math.min(
        parseInt(connectionsCurrentPage) + 1,
        connectionsCurrentPage
      )

      setConnectionsCurrentPage(nextPage)
      setConnectionsJumpPage(nextPage)

      props.sendRequest('CONNECTIONS', 'GET_ALL_PAGINATION', {
        params: {
          sort: connectionsPaginationSort,
          pageSize: connectionsPageSize,
          currentPage: prevPage,
          pageCount: Math.ceil(pendingConnections.count / connectionsPageSize),
          itemCount: connectionsItemCount,
        },
      })
    } else {
      setNotification('Failed to change page!', 'error')
    }
  }
  function prevPage(paginationType) {
    if (paginationType === 'CONTACTS') {
      // const paginationForm = new FormData(contactsPaginationRef.current)

      let prevPage = Math.max(parseInt(contactsCurrentPage) - 1, 1)

      setContactsCurrentPage(prevPage)
      setContactsJumpPage(prevPage)

      props.sendRequest('CONTACTS', 'GET_ALL', {
        params: {
          sort: contactsPaginationSort,
          pageSize: contactsPageSize,
          currentPage: prevPage,
          pageCount: Math.ceil(contacts.count / contactsPageSize),
          itemCount: contactsItemCount,
        },
        additional_tables: ['Demographic', 'Passport'],
      })
    } else if (paginationType === 'CONNECTIONS') {
      // const paginationForm = new FormData(connectionsPaginationRef.current)

      let prevPage = Math.max(parseInt(connectionsCurrentPage) - 1, 1)

      setConnectionsCurrentPage(prevPage)
      setConnectionsJumpPage(prevPage)

      props.sendRequest('CONNECTIONS', 'GET_ALL_PAGINATION', {
        params: {
          sort: connectionsPaginationSort,
          pageSize: connectionsPageSize,
          currentPage: prevPage,
          pageCount: Math.ceil(pendingConnections.count / connectionsPageSize),
          itemCount: connectionsItemCount,
        },
      })
    } else {
      setNotification('Failed to change page!', 'error')
    }
  }

  function jumpToPage(e, paginationType) {
    e.preventDefault()

    if (paginationType === 'CONTACTS') {
      const paginationForm = new FormData(contactsPaginationRef.current)

      let jumpToPage = paginationForm.get('jumpPage')

      if (jumpToPage > contactsPageCount) jumpToPage = contactsPageCount
      if (jumpToPage < 1) jumpToPage = 1

      setContactsCurrentPage(jumpToPage)
      setContactsJumpPage(jumpToPage)

      props.sendRequest('CONTACTS', 'GET_ALL', {
        params: {
          sort: contactsPaginationSort,
          pageSize: contactsPageSize,
          currentPage: jumpToPage,
          pageCount: Math.ceil(contacts.count / contactsPageSize),
          itemCount: contactsItemCount,
        },
        additional_tables: ['Demographic', 'Passport'],
      })
    } else if (paginationType === 'CONNECTIONS') {
      const paginationForm = new FormData(connectionsPaginationRef.current)

      let jumpToPage = paginationForm.get('jumpPage')

      if (jumpToPage > connectionsPageCount) jumpToPage = connectionsPageCount
      if (jumpToPage < 1) jumpToPage = 1

      setConnectionsCurrentPage(jumpToPage)
      setConnectionsJumpPage(jumpToPage)

      props.sendRequest('CONNECTIONS', 'GET_ALL_PAGINATION', {
        params: {
          sort: connectionsPaginationSort,
          pageSize: connectionsPageSize,
          currentPage: prevPage,
          pageCount: Math.ceil(pendingConnections.count / connectionsPageSize),
          itemCount: connectionsItemCount,
        },
      })
    } else {
      setNotification('Failed to change page!', 'error')
    }
  }

  const handleJumpPageChange = (e) => {
    setContactsJumpPage(e.target.value)
  }

  const contactRows = contacts.map((contact) => {
    return (
      <DataRow
        key={contact.contact_id}
        onClick={() => {
          openContact(history, contact.contact_id, contact)
        }}
      >
        <DataCell>{contact.label}</DataCell>
        <DataCell>
          {contact.Demographic !== null && contact.Demographic !== undefined
            ? contact.Demographic.mpid || ''
            : ''}
        </DataCell>
        <DataCell>{contact.Connections[0].state}</DataCell>
        <DataCell>{new Date(contact.created_at).toLocaleString()}</DataCell>
      </DataRow>
    )
  })

  const connectionRows = pendingConnections.map((connection) => {
    return (
      <DataRow key={connection.connection_id}>
        <DataCell>{connection.connection_id}</DataCell>
        <DataCell>{connection.state}</DataCell>
        <DataCell>{new Date(connection.created_at).toLocaleString()}</DataCell>
      </DataRow>
    )
  })

  let paginationUI = (
    <div style={{ overflow: 'hidden', paddingBottom: '3px' }}>
      <form
        onSubmit={jumpToPage}
        ref={contactsPaginationRef}
        style={{ float: 'right' }}
      >
        <JumpToPage
          onChange={handleJumpPageChange}
          type="text"
          name="jumpPage"
          value={contactsJumpPage}
        />
        / {contactsPageCount} pages
        <SubmitBtn style={{ marginLeft: '10px' }}>GO</SubmitBtn>
      </form>
      <div style={{ float: 'right', paddingTop: '15px' }}>
        <Button
          disabled={contactsCurrentPage > 1 ? false : true}
          style={
            contactsCurrentPage > 1
              ? { marginRight: '10px' }
              : { visibility: 'hidden', marginRight: '10px' }
          }
          onClick={prevPage}
        >
          Prev
        </Button>
        <Button
          disabled={contactsCurrentPage < contactsPageCount ? false : true}
          style={
            contactsCurrentPage < contactsPageCount
              ? { marginRight: '10px' }
              : { visibility: 'hidden', marginRight: '10px' }
          }
          onClick={nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )

  let handleSortChoice = async (e) => {
    e.preventDefault()
    let sortChoices = [
      ['updated_at', 'DESC'],
      ['updated_at', 'ASC'],
      ['label', 'ASC'],
      ['label', 'DESC'],
    ]
    let sorted = sortChoices[e.target.value]
    await setContactsSortSelected([sortChoices[e.target.value]])

    const paginationForm = new FormData(contactsPaginationRef.current)

    props.sendRequest('CONTACTS', 'GET_ALL', {
      params: {
        sort: [sorted],
        pageSize: contactsPageSize,
        currentPage: 1,
        pageCount: Math.ceil(contacts.count / contactsPageSize),
        itemCount: contactsItemCount,
      },
      additional_tables: ['Demographic', 'Passport'],
    })
  }

  let sortSelect = (
    <span style={{ float: 'right' }}>
      <contactsSortSelected
        name="contactsSortSelected"
        onChange={handleSortChoice}
        style={{}}
      >
        <option value={0}>Newest to Oldest</option>
        <option value={1}>Oldest to Newest</option>
        <option value={2}>Contact: A - Z</option>
        <option value={3}>Contact: Z - A</option>
      </contactsSortSelected>
    </span>
  )

  return (
    <>
      <div id="contacts">
        <PageHeader title={'Contacts'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Contact Name</DataHeader>
                <DataHeader></DataHeader>
                <DataHeader>Connection Status</DataHeader>
                <DataHeader>Created At</DataHeader>
              </DataRow>
            </thead>
            <tbody>{contactRows}</tbody>
          </DataTable>
          {paginationUI}
        </PageSection>
        {/* <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Pending Connection</DataHeader>
                <DataHeader></DataHeader>
                <DataHeader>Connection Status</DataHeader>
                <DataHeader>Created At</DataHeader>
              </DataRow>
            </thead>
            <tbody>{connectionRows}</tbody>
          </DataTable>
        </PageSection> */}
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <ActionButton
              title="Add a New Contact"
              onClick={() => {
                setContactModalIsOpen((o) => !o)
                props.sendRequest('INVITATIONS', 'CREATE_SINGLE_USE', {})
              }}
            >
              +
            </ActionButton>
          )}
        />
        <FormQR
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          QRCodeURL={props.QRCodeURL}
        />
        {/*<FormContacts
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitContact={submitNewContact}
        />*/}
      </div>
    </>
  )
}

export default Contacts
