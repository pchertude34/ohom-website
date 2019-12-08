import React, { useEffect, useState } from "react"
import moment from "moment"
import PageHeader from "../../components/PageHeader/PageHeader"
import Separator from "../../components/Separator/Separator"
import UpcomingEventCard from "../../components/Event/UpcomingEventCard"
import headerImage from "../../images/events_header.jpg"

function EventsPage(props) {
  const events = (props.pageContext || {}).events
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [previousEvents, setPreviousEvents] = useState([])

  useEffect(() => {
    const currentDate = Date.now()
    const futureEvents = []
    const pastEvents = []

    events.forEach(event => {
      if (moment(event.time).isAfter(currentDate)) {
        futureEvents.push(event)
      } else {
        pastEvents.push(event)
      }
    })

    setUpcomingEvents(futureEvents)
    setPreviousEvents(pastEvents)
  }, [events])

  const upcomingEventsCards = upcomingEvents.map(event => (
    <UpcomingEventCard
      key={`${event._id}-${event.time}`}
      startDate={event.time}
      title={event.title}
      subtitle={event.subtitle}
      caption={event.caption}
      slug={event.slug.current}
      imageUrl={event.imageUrl}
    />
  ))
  const previousEventsCards = previousEvents.map(event => (
    <UpcomingEventCard
      key={`${event._id}-${event.time}`}
      startDate={event.time}
      title={event.title}
      subTitle={event.subTitle}
      caption={event.caption}
      slug={event.slug.current}
      imageUrl={event.imageUrl}
    />
  ))

  return (
    <div>
      <PageHeader
        title="Events"
        photoUrl={headerImage}
        text={`Open Hearts Open Minds puts on several events each year.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.`}
      />
      {upcomingEvents.length > 0 && (
        <div>
          <Separator text="Upcoming Events" className="mb-4" />
          {upcomingEventsCards}
        </div>
      )}
      {previousEvents.length > 0 && (
        <div>
          <Separator text="Previous Events" className="mb-4" />
          {previousEventsCards}
        </div>
      )}
    </div>
  )
}

export default EventsPage
