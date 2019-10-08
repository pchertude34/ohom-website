import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
// import BlockContent from "../BlockContent/BlockContent"
import BlockContent from "@sanity/block-content-to-react"

import { UpcomingEventCard } from "../Event/index"
import "./ProgramContent.scss"

import { loadUpcomingEventsByProgram } from "../../apiUtils/eventsAPIUtils"

const programContent = props => {
  console.log(props.content)
  const [programEvents, setProgramEvents] = useState([])

  // Get the upcoming events that are at the
  useEffect(() => {
    loadUpcomingEventsByProgram(props.content._id)
      .then(response => setProgramEvents(response))
      .catch(err => console.log(err))
  }, [programEvents.length])

  const programEventCards = programEvents.map(event => {
    return (
      <UpcomingEventCard
        data-test="upcoming-event-card"
        className="flex-grow-1 bd-highlight"
        event={event}
        key={`event-${event._id}`}
      />
    )
  })

  return (
    <React.Fragment>
      <div className="mb-5 row">
        <div className="col-md-8">
          <h4 className="mb-3 text-center">{props.content.title}</h4>
          <p className="program-content">{props.content.description}</p>
          {props.content.block && <BlockContent blocks={props.content.block} />}
        </div>
        <div className="col-md-4">
          {props.content.photoUrl ? (
            <img src={props.content.photoUrl} className="content-photo" />
          ) : null}
        </div>
      </div>
      {programEventCards.length > 0 ? (
        <div className="mb-5 col-md-9">{programEventCards}</div>
      ) : null}
    </React.Fragment>
  )
}

programContent.propTypes = {}

export default programContent
