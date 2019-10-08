import React, { Component } from "react"
import { Spinner } from "reactstrap"
import Separator from "../components/Separator/Separator"
import PageHeader from "../components/PageHeader/PageHeader"
import { UpcomingEventCard } from "../components/Event"

import { loadUpcomingEventsData } from "../apiUtils/eventsAPIUtils"
import headerImage from "../images/events_header.jpg"

class EventsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      upcomingEvents: [],
      previousEvents: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    loadUpcomingEventsData().then(response => {
      this.setState({
        upcomingEvents: response,
        isLoading: false,
      })
    })
  }

  render() {
    const upcomingEventCards = this.state.upcomingEvents.map(event => {
      return event.eventTimes.map(eventTime => {
        const eventData = { ...event, eventTimes: [...eventTime] }
        return (
          <UpcomingEventCard
            data-test="upcoming-event-card"
            className="flex-grow-1 bd-highlight"
            event={eventData}
            key={`upcoming-event-${event._id}-${eventTime.startDate}`}
          />
        )
      })
    })
    return (
      <React.Fragment>
        <PageHeader
          title="Events"
          photoUrl={headerImage}
          text={`Open Hearts Open Minds puts on several events each year. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
          enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat.`}
        />
        <Separator text="Upcoming Events" />
        <div className="my-5">{upcomingEventCards}</div>
      </React.Fragment>
    )
  }
}

export default EventsPage
