import React from "react"
import BlockContent from "@sanity/block-content-to-react"
import Separator from "../../components/Separator/Separator"
import PageHeader from "../../components/PageHeader/PageHeader"
import UpcomingEventCard from "../../components/Event/UpcomingEventCard"

function Program(props) {
  const program = props.pageContext.program
  const programEventCards = program.events.map(event => {
    return event.eventTimes.map(eventTime => (
      <UpcomingEventCard
        key={`event-${event._id}`}
        className="flex-grow-1 bd-highlight"
        startDate={eventTime.startDate}
        titel={event.title}
        subtitle={event.subtitle}
        caption={event.caption}
        slug={event.slug.current}
        imageUrl={event.imageUrl}
      />
    ))
  })

  return (
    <div>
      <PageHeader photoUrl={program.photoUrl} />
      <Separator text={program.title} style="mb-2" />
      <div>
        <div className="mb-5 row">
          <div className="col-md-8">
            <h4 className="mb-3 text-center">{program.title}</h4>
            {program.body && <BlockContent blocks={program.body} />}
          </div>
          <div className="col-md-4">
            {program.photoUrl ? (
              <img src={program.photoUrl} className="content-photo" />
            ) : null}
          </div>
        </div>
        {programEventCards.length > 0 ? (
          <React.Fragment>
            <Separator text="Upcoming Events" style="mb-4" />
            <div className="mb-5">{programEventCards}</div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  )
}

export default Program
