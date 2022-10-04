import React, { useEffect, useRef, useState } from 'react'

import FormInvitation from './FormInvitation'
import PageHeader from './PageHeader'
import PageSection from './PageSection'

import { DataTable, DataRow, DataHeader, DataCell } from './CommonStylesTables'

import { ActionButton, Button, SubmitBtn } from './CommonStylesForms'

import { CanUser } from './CanUser'
import { useNotification } from './NotificationProvider'

import styled from 'styled-components'

export const JumpToPage = styled.input`
  margin: auto 10px auto 0;
  width: 60px;
  font-size: 1em;
  color: ${(props) => props.theme.primary_color};
`

function Invitations(props) {
  const error = props.errorMessage
  const success = props.successMessage

  const localUser = props.loggedInUserState

  const [createInvModalIsOpen, setCreateInvModalIsOpen] = useState(false)
  const closeCreateInvModal = () => setCreateInvModalIsOpen(false)

  const history = props.history

  const setNotification = useNotification()

  useEffect(() => {
    if (props.connectionReuse) {
      const message = `Connection reused for ${props.connectionReuse.connection_id}`
      setNotification(message, 'notice')
      props.clearConnectionReuse()
    }
  }, [props.connectionReuse])

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      props.clearResponseState()
    } else if (error) {
      setNotification(error, 'error')
      props.clearResponseState()
    }
  }, [error, success, setNotification, props])

  function openInvitation(history, id) {
    if (history !== undefined) {
      history.push('/invitations/' + id)
    }
  }

  const invitations = props.invitations
    ? props.invitations.rows
      ? props.invitations.rows
      : []
    : []

  const invitationRows = invitations.map((invitation) => {
    return (
      <DataRow
        key={invitation.invitation_id}
        onClick={() => {
          openInvitation(history, invitation.invitation_id, invitation)
        }}
      >
        <DataCell>{invitation.alias}</DataCell>
        <DataCell>{invitation.connection_id}</DataCell>
        <DataCell>{invitation.invitation_mode}</DataCell>
        <DataCell>{new Date(invitation.created_at).toLocaleString()}</DataCell>
      </DataRow>
    )
  })

  const pagination = props.invitations
    ? props.invitations.params
      ? props.invitations.params
      : {}
    : {}

  const paginationRef = useRef()

  const [paginationSort, setPaginationSort] = useState(pagination.sort)
  const [paginationPageSize, setPaginationPageSize] = useState(
    pagination.pageSize
  )
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(
    pagination.currentPage ? pagination.currentPage : 1
  )
  const [paginationPageCount, setPaginationPageCount] = useState(
    pagination.pageCount
  )
  const [paginationItemCount, setPaginationItemCount] = useState(
    pagination.itemCount
  )

  const [paginationJumpPage, setPaginationJumpPage] = useState(
    pagination.currentPage ? pagination.currentPage : 1
  )

  useEffect(() => {
    setPaginationSort(pagination.sort)
    setPaginationPageSize(pagination.pageSize)
    setPaginationCurrentPage(pagination.currentPage)
    setPaginationPageCount(pagination.pageCount)
    setPaginationItemCount(pagination.itemCount)

    setPaginationJumpPage(pagination.currentPage)
  }, [props.invitations])

  function nextPage() {
    // const paginationForm = new FormData(paginationRef.current)

    let nextPage = Math.min(
      parseInt(paginationCurrentPage) + 1,
      paginationPageCount
    )

    setPaginationCurrentPage(nextPage)
    setPaginationJumpPage(nextPage)

    props.sendRequest('INVITATIONS', 'GET_ALL', {
      params: {
        sort: paginationSort,
        pageSize: paginationPageSize,
        currentPage: nextPage,
        pageCount: Math.ceil(invitations.count / paginationPageSize),
        itemCount: paginationItemCount,
      },
    })
  }

  function prevPage() {
    const paginationForm = new FormData(paginationRef.current)

    let prevPage = Math.max(parseInt(paginationCurrentPage) - 1, 1)

    setPaginationCurrentPage(prevPage)
    setPaginationJumpPage(prevPage)

    props.sendRequest('INVITATIONS', 'GET_ALL', {
      params: {
        sort: paginationSort,
        pageSize: paginationPageSize,
        currentPage: prevPage,
        pageCount: Math.ceil(invitations.count / paginationPageSize),
        itemCount: paginationItemCount,
      },
    })
  }

  function jumpToPage(e) {
    e.preventDefault()

    const paginationForm = new FormData(paginationRef.current)

    let jumpToPage = paginationForm.get('jumpPage')

    if (jumpToPage > paginationPageCount) jumpToPage = paginationPageCount
    if (jumpToPage < 1) jumpToPage = 1

    setPaginationCurrentPage(jumpToPage)
    setPaginationJumpPage(jumpToPage)

    props.sendRequest('INVITATIONS', 'GET_ALL', {
      params: {
        sort: paginationSort,
        pageSize: paginationPageSize,
        currentPage: jumpToPage,
        pageCount: Math.ceil(invitations.count / paginationPageSize),
        itemCount: paginationItemCount,
      },
    })
  }

  const handleJumpPageChange = (e) => {
    setPaginationJumpPage(e.target.value)
  }

  let paginationUI = (
    <div style={{ overflow: 'hidden', paddingBottom: '3px' }}>
      <form
        onSubmit={jumpToPage}
        ref={paginationRef}
        style={{ float: 'right' }}
      >
        <JumpToPage
          onChange={handleJumpPageChange}
          type="text"
          name="jumpPage"
          value={paginationJumpPage}
        />
        / {paginationPageCount} pages
        <SubmitBtn style={{ marginLeft: '10px' }}>GO</SubmitBtn>
      </form>
      <div style={{ float: 'right', paddingTop: '15px' }}>
        <Button
          disabled={paginationCurrentPage > 1 ? false : true}
          style={
            paginationCurrentPage > 1
              ? { marginRight: '10px' }
              : { visibility: 'hidden', marginRight: '10px' }
          }
          onClick={prevPage}
        >
          Prev
        </Button>
        <Button
          disabled={paginationCurrentPage < paginationPageCount ? false : true}
          style={
            paginationCurrentPage < paginationPageCount
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

  return (
    <>
      <div id="invitations">
        <PageHeader title={'Invitations'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Alias</DataHeader>
                <DataHeader>Connection ID</DataHeader>
                <DataHeader>Type</DataHeader>
                <DataHeader>Created At</DataHeader>
              </DataRow>
            </thead>
            <tbody>{invitationRows}</tbody>
          </DataTable>
          {paginationUI}
        </PageSection>
        <CanUser
          user={localUser}
          perform="invitations:create"
          yes={() => (
            <ActionButton
              title="Add a New Invitation"
              onClick={() => {
                setCreateInvModalIsOpen((o) => !o)
              }}
            >
              +
            </ActionButton>
          )}
        />

        <FormInvitation
          createInvModalIsOpen={createInvModalIsOpen}
          closeCreateInvModal={closeCreateInvModal}
          sendRequest={props.sendRequest}
        />
      </div>
    </>
  )
}

export default Invitations
