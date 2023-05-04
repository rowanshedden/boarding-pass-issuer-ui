import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import PageHeader from './PageHeader'
import PageSection from './PageSection'

import { DataTable, DataRow, DataHeader, DataCell } from './CommonStylesTables'

function Presentations(props) {
  let presentations = useSelector(
    (state) => state.presentations.presentationReports
  )

  function openPresentation(history, id) {
    if (history !== undefined) {
      history.push('/presentations/' + id)
    }
  }

  const presentationRows = presentations.map((presentation_record) => {
    const presentation_id = presentation_record.presentation_exchange_id
    const presentationState =
      presentation_record.state.replaceAll('_', ' ') || ''
    const dateCreated =
      new Date(presentation_record.created_at).toLocaleString() || ''
    const requestName = JSON.parse(presentation_record.presentation_request)
      .name

    return (
      <DataRow
        key={presentation_id}
        onClick={() => {
          openPresentation(props.history, presentation_id)
        }}
      >
        <DataCell>{presentation_record.contact_label}</DataCell>
        <DataCell>{requestName}</DataCell>
        <DataCell className="title-case">{presentationState}</DataCell>
        <DataCell>{dateCreated}</DataCell>
      </DataRow>
    )
  })

  return (
    <>
      <div id="presentations">
        <PageHeader title={'Presentations'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Label</DataHeader>
                <DataHeader>Request Name</DataHeader>
                <DataHeader>Status</DataHeader>
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{presentationRows}</tbody>
          </DataTable>
        </PageSection>
      </div>
    </>
  )
}

export default Presentations
