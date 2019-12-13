import React, { useState, useCallback, useEffect } from "react"
import { Link } from "gatsby"
import Separator from "../Separator/Separator"
import PageHeader from "../PageHeader/PageHeader"
import BlockContent from "@sanity/block-content-to-react"
import Carousel, { Modal, ModalGateway } from "react-images"
import Gallery from "react-photo-gallery"
import moment from "moment"

const GALLERY_BREAK_POINT = 540

const Event = props => {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [galleryDirection, setGalleryDirection] = useState("row")

  const event = (props.pageContext || {}).event

  useEffect(() => {
    updateColCount(window.innerWidth)
    window.addEventListener("resize", event =>
      updateColCount(event.target.innerWidth)
    )
  }, [])

  const updateColCount = windowWidth => {
    if (windowWidth >= GALLERY_BREAK_POINT) setGalleryDirection("row")
    else setGalleryDirection("column")
  }

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

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
      key={program._id}
      className="event-time-card__box event-time-card__box--program"
    >
      <Link to={`/programs/${program.slug.current}`}>{program.title}</Link>
    </div>
  ))

  const photos = (event.photoAlbum || []).map(photo => ({
    src: photo.src,
    width: photo.dimensions.width,
    height: photo.dimensions.height,
  }))

  return (
    <div>
      <PageHeader photoUrl={event.imageUrl} />
      <Separator text={event.title} className="mb-4" />
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
      {photos.length > 0 && (
        <div className="mb-4">
          <Separator text="Photos" className="mb-4" />
          <Gallery
            photos={photos}
            direction={galleryDirection}
            columns={2}
            onClick={openLightbox}
          />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map(x => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      )}
    </div>
  )
}

export default Event
