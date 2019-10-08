import React from "react"
import PropTypes from "prop-types"
import LinesEllipsis from "react-lines-ellipsis"
import moment from "moment"

import "./UpcomingEventCard.scss"

function UpcomingEventCard(props) {
  const eventDay = moment(props.event.eventTimes[0].startDate).format("DD")
  const eventMonth = moment(props.event.eventTimes[0].startDate)
    .format("MMM")
    .toUpperCase()
  return (
    <div className="row no-gutters upcoming-event-card-body mb-3">
      <div className="col-2 col-md-1 align-self-center">
        <div className="upcoming-event-card-date">
          <h1>{eventDay}</h1>
          <h2>{eventMonth}</h2>
        </div>
      </div>
      <div className="col-10 col-md-8">
        <div className="upcoming-event-card-description">
          <h1 className="color-primary">{props.event.title}</h1>
          {props.event.subtitle && <h2>{props.event.subtitle}</h2>}
          {props.event.description && (
            <LinesEllipsis
              text={props.event.description}
              maxLine={2}
              ellipsis="..."
              trimRight
              basedOn="letters"
              component="p"
            />
          )}
        </div>
      </div>
      <div className="col-md-3 upcoming-event-card-image">
        <img src={props.event.imageUrl} alt={props.event.title} />
      </div>
    </div>
  )
}

UpcomingEventCard.propTypes = {
  event: PropTypes.shape({
    eventTimes: PropTypes.arrayOf(
      PropTypes.shape({
        startDate: PropTypes.string,
      })
    ).isRequired,
    // image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
}

export default UpcomingEventCard
