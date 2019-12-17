import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import moment from "moment"

function UpcomingEventCard(props) {
  const eventDay = moment(props.startDate).format("DD")
  const eventMonth = moment(props.startDate)
    .format("MMM")
    .toUpperCase()

  const handlCardClicked = () => {
    navigate(`/events/${props.slug}`)
  }

  return (
    <div
      className="row no-gutters upcoming-event-card-body mb-3"
      onClick={handlCardClicked}
    >
      <div className="col-2 col-md-1 align-self-center">
        <div className="upcoming-event-card-date">
          <h1>{eventDay}</h1>
          <h2>{eventMonth}</h2>
        </div>
      </div>
      <div className="col-10 col-md-8">
        <div className="upcoming-event-card-description">
          <h1 className="color-primary">{props.title}</h1>
          {props.subtitle && <h2>{props.subtitle}</h2>}
          {props.caption}
        </div>
      </div>
      <div
        className="col-md-3 upcoming-event-card-image"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      />
    </div>
  )
}

UpcomingEventCard.propTypes = {
  startDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  caption: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
}

export default UpcomingEventCard
