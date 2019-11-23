import React from "react"
import { Link } from "gatsby"
import Separator from "../Separator/Separator"
import PageHeader from "../PageHeader/PageHeader"
import BlockContent from "@sanity/block-content-to-react"
import moment from "moment"

const Event = props => {
  const event = (props.pageContext || {}).event
  const eventTimes = event.eventTimes.map(eventTime => (
    <div
      key={eventTime._key}
      className="event-time-card__box event-time-card__box--time"
    >
      {moment(eventTime.startDate).format("MMM D, YYYY h:mma")}
    </div>
  ))

  const programs = event.programs.map(program => (
    <div
      key={program._key}
      className="event-time-card__box event-time-card__box--program"
    >
      <Link to={`/programs/${program.slug.current}`}>{program.title}</Link>
    </div>
  ))

  return (
    <div>
      <PageHeader photoUrl={event.imageUrl} />
      <Separator text={event.title} style="mb-4" />
      <div className="row mb-4">
        <div className="col-md-9">
          <div>
            <h4 className="text-center">{event.title}</h4>
            <BlockContent blocks={event.description} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="event-time-card">
            <div className="event-time-card__heading">{`Event Time${
              eventTimes.length > 1 ? "s" : ""
            }`}</div>
            {eventTimes}
            <div className="event-time-card__heading">{`Program${
              programs.length > 1 ? "s" : ""
            }`}</div>
            {programs}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
