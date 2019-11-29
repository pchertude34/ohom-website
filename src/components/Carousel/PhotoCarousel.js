import React from "react"
import PropTypes from "prop-types"
import {
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselCaption,
  CarouselControl,
} from "reactstrap"

class PhotoCarousel extends React.Component {
  state = {
    activeIndex: 0,
  }

  onExiting = () => {
    this.animating = true
  }

  onExited = () => {
    this.animating = false
  }

  next = () => {
    if (this.animating) {
      return
    }
    const nextIndex =
      this.state.activeIndex >= this.props.items.length - 1
        ? 0
        : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous = () => {
    if (this.animating) return
    const prevIndex =
      this.state.activeIndex <= 0
        ? this.props.items.length - 1
        : this.state.activeIndex - 1

    this.setState({ activeIndex: prevIndex })
  }

  goToIndex = newIndex => {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    const slides = (this.props.items || []).map((item, index) => {
      return (
        <CarouselItem
          data-test="photo-slide"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={`${item._key}-${index}`}
        >
          <img
            src={item.url}
            alt={item.title}
            style={{ height: 500, width: "100%", overflow: "hidden" }}
          />
          <CarouselCaption
            captionText={item.title || ""}
            captionHeader={item.description}
          />
        </CarouselItem>
      )
    })

    return (
      <Carousel
        data-test="component-carousel"
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={this.props.items || []}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          id="carousel-prev-button"
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
          key={"carousel-prev-button"}
        />
        <CarouselControl
          id="carousel-next-button"
          data-test="carousel-next-button"
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
          key={"carousel-next-button"}
        />
      </Carousel>
    )
  }
}

PhotoCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      _key: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default PhotoCarousel
