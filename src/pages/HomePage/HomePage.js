import React from "react"
import { Button } from "reactstrap"
import PhotoCarousel from "../../components/Carousel/PhotoCarousel"

import { UpcomingEventCard } from "../../components/Event"
import ProgramCard from "../../components/ProgramCard/ProgramCard"
import Separator from "../../components/Separator/Separator"
// import '../../index.css';

import { loadHomepageData, loadUpcomingEvents } from "./HomPageAPIUtil"

const MAX_FEATURE_PROGRAM_SIZE = 3

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    const { homepageData } = props.pageContext

    this.state = {
      carouselImages: homepageData.carouselImages || [],
      featuredPrograms: homepageData.featuredPrograms || [],
      upcomingEvents: [],
      whoAreWe: homepageData.whoAreWe || "",
    }

    console.log(this.state)
  }

  componentDidMount() {
    loadUpcomingEvents().then(response => {
      if (response.length > 0) {
        this.setState({
          upcomingEvents: response,
        })
      }
    })
  }

  render() {
    const featuredProgramCards = this.state.featuredPrograms
      .slice(0, MAX_FEATURE_PROGRAM_SIZE)
      .map((program, index) => {
        return (
          <div className="col-md-4" key={`program-card-${index}`}>
            <ProgramCard
              data-test="featured-program-card"
              title={program.title}
              subtitle={program.location}
              description={program.description}
              imageUrl={program.url}
            />
          </div>
        )
      })

    const upcomingEvents = this.state.upcomingEvents.map(event => {
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
      <div data-test="component-home" className="container">
        {this.state.carouselImages.length > 0 && (
          <PhotoCarousel
            data-test="photo-carousel"
            items={this.state.carouselImages}
          />
        )}
        <Separator text={"Who are we?"} style={"mb-5"} />

        <div className="row mb-3">
          <div className="col-md-6 text-center">
            <p>Video player will go here</p>
          </div>
          <div className="col-md-6">
            <div className="px-2">
              {this.state.whoAreWe}

              <div className="text-center mt-4">
                <Button
                  color="secondary font-italic text-white"
                  className="px-5"
                >
                  Learn More!
                </Button>
              </div>
            </div>
          </div>
        </div>
        {featuredProgramCards.length > 0 && (
          <div data-test="featured-program-section">
            <Separator text={"Featured Programs"} style={"my-5"} />
            <div className="row text-center">{featuredProgramCards}</div>
          </div>
        )}

        {this.state.upcomingEvents.length > 0 && (
          <div data-test="upcoming-events-section">
            <Separator text={"Upcoming events"} style={"my-5"} />
            {upcomingEvents}
          </div>
        )}
      </div>
    )
  }
}

export default HomePage
