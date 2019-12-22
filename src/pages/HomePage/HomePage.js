import React from "react"
import { Button } from "reactstrap"
import { Link } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import PhotoCarousel from "../../components/Carousel/PhotoCarousel"
import YouTube from "react-youtube"
import moment from "moment"

import UpcomingEventCard from "../../components/Event/UpcomingEventCard"
import ProgramCard from "../../components/ProgramCard/ProgramCard"
import Separator from "../../components/Separator/Separator"
import Testimonial from "../../components/Testimonial/Testimonial"

import "../../sass/main.scss"

const MAX_FEATURE_PROGRAM_SIZE = 3
const YOUTUBE_ID = "N0TMVSvMiVE"

function HomePage(props) {
  const homePageData = (props.pageContext || {}).homePageData || {}

  const featuredProgramCards = (homePageData.featuredPrograms || [])
    .slice(0, MAX_FEATURE_PROGRAM_SIZE)
    .map(program => (
      <div
        className="col-md-6 col-lg-4 d-flex align-items-stretch mb-3"
        key={`program-${program._id}`}
      >
        <ProgramCard
          key={program._id}
          title={program.title}
          subtitle={program.location}
          caption={program.caption}
          imageUrl={program.imageUrl}
          link={`/programs/${(program.slug || {}).current}`}
        />
      </div>
    ))

  const featuredTestimonies = (
    homePageData.featuredTestimonies || []
  ).map(testimony => (
    <Testimonial
      key={testimony._id}
      quote={testimony.testimony}
      author={testimony.authorName}
    />
  ))
  const upcomingEvents = (homePageData.upcomingEvents || []).reduce(
    (accum, event) => {
      event.eventTimes.forEach(eventTime => {
        if (moment(eventTime.startDate).isAfter(Date.now())) {
          accum.push(
            <UpcomingEventCard
              key={`event-${event._id}-${eventTime.startDate}`}
              startDate={eventTime.startDate}
              title={event.title}
              subtitle={event.subtitle}
              caption={event.caption}
              slug={event.slug.current}
              imageUrl={event.imageUrl}
            />
          )
        }
      })

      return accum
    },
    []
  )

  return (
    <div>
      <PhotoCarousel items={homePageData.carouselImages} />
      <Separator text={"Who are we?"} className={"mb-5"} />
      <div className="mb-3 text-center">
        <YouTube videoId={YOUTUBE_ID} className="youtube-player" />
      </div>
      <div className="row mb-3">
        <div className="col-lg-10 offset-lg-1 col-md-12">
          <div className="px-2">
            <BlockContent blocks={homePageData.whoAreWe} />
            <div className="text-center mt-4">
              <Link to="about-us">
                <Button
                  color="secondary font-italic text-white"
                  className="px-5"
                >
                  Learn More!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {featuredProgramCards.length > 0 && (
        <div>
          <Separator text={"Featured Programs"} className="my-5" />
          <div className="row text-center">{featuredProgramCards}</div>
        </div>
      )}
      {featuredTestimonies.length > 0 && (
        <div>
          <Separator text={"Testimonials"} className="my-5" />
          {featuredTestimonies}
        </div>
      )}
      {upcomingEvents.length > 0 && (
        <div>
          <Separator text="Upcoming Events" className="my-5" />
          {upcomingEvents}
        </div>
      )}
    </div>
  )
}

export default HomePage
