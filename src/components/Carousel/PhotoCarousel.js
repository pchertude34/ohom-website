import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselCaption,
  CarouselControl,
} from "reactstrap"

const PhotoCarousel = props => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const onExiting = () => {
    setAnimating(true)
  }

  const onExited = () => {
    setAnimating(false)
  }

  const next = () => {
    if (animating) {
      return
    }
    const nextIndex =
      activeIndex >= props.items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const prevIndex =
      activeIndex <= 0
        ? props.items.length - 1
        : setActiveIndex(activeIndex - 1)

    setActiveIndex(prevIndex)
  }

  const goToIndex = newIndex => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = (props.items || []).map((item, index) => {
    return (
      <CarouselItem
        data-test="photo-slide"
        onExiting={onExiting}
        onExited={onExited}
        key={`${item._key}-${index}`}
      >
        <img
          src={item.url}
          alt={item.title}
          style={{ height: "auto", width: "100%", overflow: "hidden" }}
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
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={props.items || []}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        id="carousel-prev-button"
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
        key={"carousel-prev-button"}
      />
      <CarouselControl
        id="carousel-next-button"
        data-test="carousel-next-button"
        direction="next"
        directionText="Next"
        onClickHandler={next}
        key={"carousel-next-button"}
      />
    </Carousel>
  )
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
