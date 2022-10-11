import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

import PageSection from './PageSection'

import { DataTable, DataRow, DataHeader, DataCell } from './CommonStylesTables'
import { SubmitBtn, Button, SortSelected } from './CommonStylesForms'

const JumpToPage = styled.input`
  margin: auto 10px auto 0;
  width: 60px;
  font-size: 1em;
  color: ${(props) => props.theme.primary_color};
`
const PaginationFormWrapper = styled.div`
  overflow: hidden;
  bottom-padding: 3px;
`

function PaginationSection(props) {
  //(AmmonBurgi) Prop used for identifying which data is being passed for pagination.
  const paginationFocus = props.paginationFocus

  const paginationParams = props.paginationData
    ? props.paginationData.params
      ? props.paginationData.params
      : {}
    : {}

  const paginationRows = props.paginationData
    ? props.paginationData.rows
      ? props.paginationData.rows
      : []
    : []

  const paginationRef = useRef()

  const [paginationPageSize, setPaginationPageSize] = useState(
    paginationParams.pageSize
  )
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(
    paginationParams.currentPage ? paginationParams.currentPage : 1
  )
  const [paginationPageCount, setPaginationPageCount] = useState(
    paginationParams.pageCount
  )
  const [PaginationItemCount, setPaginationItemCount] = useState(
    paginationParams.itemCount
  )

  const [paginationJumpPage, setPaginationJumpPage] = useState(
    paginationParams.currentPage ? paginationParams.currentPage : 1
  )

  const [paginationSortSelected, setPaginationSortSelected] = useState([
    ['updated_at', 'DESC'],
  ])
  const [paginationSort, setPaginationSort] = useState(paginationSortSelected)

  useEffect(() => {
    setPaginationSort(paginationSortSelected)
    setPaginationPageSize(paginationParams.pageSize)
    setPaginationCurrentPage(paginationParams.currentPage)
    setPaginationPageCount(paginationParams.pageCount)
    setPaginationItemCount(paginationParams.itemCount)

    setPaginationJumpPage(paginationParams.currentPage)
  }, [props.paginationData])

  const openContact = (history, id) => {
    if (history !== undefined) {
      history.push('/contacts/' + id)
    }
  }

  const openInvitation = (history, id) => {
    if (history !== undefined) {
      history.push('/invitations/' + id)
    }
  }

  const handlePaginationRequest = (pageFocus, sortChoice) => {
    const requestParams = {
      sort: sortChoice ? sortChoice : paginationSort,
      pageSize: paginationPageSize,
      currentPage: pageFocus,
      pageCount: Math.ceil(paginationRows.count / paginationPageSize),
      itemCount: PaginationItemCount,
    }

    switch (paginationFocus) {
      case 'CONTACTS':
        props.sendRequest('CONTACTS', 'GET_ALL', {
          params: requestParams,
          additional_tables: ['Demographic', 'Passport'],
        })

        break

      case 'INVITATIONS':
        props.sendRequest('INVITATIONS', 'GET_ALL', {
          params: requestParams,
        })

        break

      case 'PENDING_CONNECTIONS':
        props.sendRequest('CONNECTIONS', 'PENDING_CONNECTIONS', {
          params: requestParams,
        })

        break

      default:
        console.log('WARNING: Pagination focus is not being handled!')
    }
  }

  const nextPage = () => {
    let nextPage = Math.min(
      parseInt(paginationCurrentPage) + 1,
      paginationPageCount
    )

    setPaginationCurrentPage(nextPage)
    setPaginationJumpPage(nextPage)

    handlePaginationRequest(nextPage)
  }

  const prevPage = () => {
    let prevPage = Math.max(parseInt(paginationCurrentPage) - 1, 1)

    setPaginationCurrentPage(prevPage)
    setPaginationJumpPage(prevPage)

    handlePaginationRequest(prevPage)
  }

  const jumpToPage = (e) => {
    e.preventDefault()

    const paginationForm = new FormData(paginationRef.current)

    let jumpToPage = paginationForm.get('jumpPage')

    if (jumpToPage > paginationPageCount) jumpToPage = paginationPageCount
    if (jumpToPage < 1) jumpToPage = 1

    setPaginationCurrentPage(jumpToPage)
    setPaginationJumpPage(jumpToPage)

    handlePaginationRequest(jumpToPage)
  }

  const handleSortChoice = (e) => {
    e.preventDefault()
    let sortChoices = [
      ['updated_at', 'DESC'],
      ['updated_at', 'ASC'],
      ['label', 'ASC'],
      ['label', 'DESC'],
    ]
    let sorted = sortChoices[e.target.value]
    setPaginationSortSelected([sortChoices[e.target.value]])

    handlePaginationRequest(1, [sorted])
  }

  let displaySortSelect = (
    <span style={{ float: 'right' }}>
      <SortSelected name="sortSelected" onChange={handleSortChoice}>
        <option value={0}>Newest to Oldest</option>
        <option value={1}>Oldest to Newest</option>
        <option value={2}>Contact: A - Z</option>
        <option value={3}>Contact: Z - A</option>
      </SortSelected>
    </span>
  )

  const displayFocusRows = paginationRows.map((row) => {
    switch (paginationFocus) {
      case 'CONTACTS':
        return (
          <DataRow
            key={row.contact_id}
            onClick={() => {
              openContact(props.history, row.contact_id, row)
            }}
          >
            <DataCell>{row.label}</DataCell>
            <DataCell>
              {row.Demographic !== null && row.Demographic !== undefined
                ? row.Demographic.mpid || ''
                : ''}
            </DataCell>
            <DataCell>{row.Connections[0].state}</DataCell>
            <DataCell>{new Date(row.created_at).toLocaleString()}</DataCell>
          </DataRow>
        )

      case 'INVITATIONS':
        return (
          <DataRow
            key={row.invitation_id}
            onClick={() => {
              openInvitation(props.history, row.invitation_id, row)
            }}
          >
            <DataCell>{row.alias}</DataCell>
            <DataCell>{row.connection_id}</DataCell>
            <DataCell>{row.invitation_mode}</DataCell>
            <DataCell>{new Date(row.created_at).toLocaleString()}</DataCell>
          </DataRow>
        )

      case 'PENDING_CONNECTIONS':
        return (
          <DataRow key={row.connection_id}>
            <DataCell>{row.connection_id}</DataCell>
            <DataCell>{row.state}</DataCell>
            <DataCell>{new Date(row.created_at).toLocaleString()}</DataCell>
          </DataRow>
        )

      default:
        console.log('WARNING: Pagination rows are not being handled!')

        return (
          <DataRow>
            <DataCell>{''}</DataCell>
            <DataCell>{''}</DataCell>
            <DataCell>{''}</DataCell>
            <DataCell>{''}</DataCell>
          </DataRow>
        )
    }
  })

  const displayFocusTable = () => {
    switch (paginationFocus) {
      case 'CONTACTS':
        return (
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Contact Name</DataHeader>
                <DataHeader></DataHeader>
                <DataHeader>Connection Status</DataHeader>
                <DataHeader>Created At{displaySortSelect}</DataHeader>
              </DataRow>
            </thead>
            <tbody>{displayFocusRows}</tbody>
          </DataTable>
        )

      case 'INVITATIONS':
        return (
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Alias</DataHeader>
                <DataHeader>Connection ID</DataHeader>
                <DataHeader>Type</DataHeader>
                <DataHeader>Created At</DataHeader>
              </DataRow>
            </thead>
            <tbody>{displayFocusRows}</tbody>
          </DataTable>
        )

      case 'PENDING_CONNECTIONS':
        return (
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Pending Connection</DataHeader>
                <DataHeader>Connection Status</DataHeader>
                <DataHeader>Created At{displaySortSelect}</DataHeader>
              </DataRow>
            </thead>
            <tbody>{displayFocusRows}</tbody>
          </DataTable>
        )

      default:
        console.log('WARNING: Pagination rows are not being handled!')

        return (
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Table</DataHeader>
              </DataRow>
            </thead>
            <tbody>{displayFocusRows}</tbody>
          </DataTable>
        )
    }
  }

  let paginationDisplay = (
    <PaginationFormWrapper>
      <form
        onSubmit={jumpToPage}
        ref={paginationRef}
        style={{ float: 'right' }}
      >
        <JumpToPage
          onChange={(e) => setPaginationJumpPage(e.target.value)}
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
    </PaginationFormWrapper>
  )

  return (
    <PageSection>
      {displayFocusTable()}
      {paginationDisplay}
    </PageSection>
  )
}

export default PaginationSection
