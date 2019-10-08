import React from "react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { findByTestAttr } from "../../../test/testUtils"

import HomePage from "../pages/HomePage/HomePage"

Enzyme.configure({ adapter: new Adapter() })
const defaultState = {
  carouselImages: [],
  featuredPrograms: [],
  whoAreWe: "",
}

const setup = (props = {}, state = null) => {
  const homepageState = { ...defaultState, ...state }
  const homepageProps = { ...props }
  const wrapper = shallow(<HomePage {...homepageProps} />)

  wrapper.setState({ ...homepageState })
  return wrapper
}

test("home page component renders without error", () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, "component-home")

  expect(component.length).toBe(1)
})

test("carousel does not render without carouselImages", () => {
  const wrapper = setup(null, {})
  const photoCarousel = findByTestAttr(wrapper, "photo-carousel")

  expect(photoCarousel.length).toBe(0)
})

test("carousel renders with atleast one carousel image", () => {
  const homepageState = {
    carouselImages: [{ src: "", altText: "", description: "" }],
  }
  const wrapper = setup(null, homepageState)
  wrapper.update()
  const photoCarousel = findByTestAttr(wrapper, "photo-carousel")

  expect(photoCarousel.length).toBe(1)
})

describe("featured programs load and display correctly", () => {
  let wrapper

  test("no featured programs are displayed, and the featured program section is not displayed when there are no featured programs", () => {
    wrapper = setup()
    wrapper.setState({ featuredPrograms: [] })
    wrapper.update()

    const featuredProgramCard = findByTestAttr(wrapper, "featured-program-card")
    const featuredProgramSection = findByTestAttr(
      wrapper,
      "featured-program-section"
    )

    expect(featuredProgramCard.length).toBe(0)
    expect(featuredProgramSection.length).toBe(0)
  })

  test("three featured programs are displayed when three featured programs are loaded", () => {
    wrapper = setup()
    wrapper.setState({ featuredPrograms: [1, 2, 3] })
    wrapper.update()

    const featuredProgramCard = findByTestAttr(wrapper, "featured-program-card")

    const featuredProgramSection = findByTestAttr(
      wrapper,
      "featured-program-section"
    )

    expect(featuredProgramCard.length).toBe(3)
    expect(featuredProgramSection.length).toBe(1)
  })

  test("three featured programs are displayed when more then three featured programs are laoded", () => {
    wrapper = setup()
    wrapper.setState({ featuredPrograms: [1, 2, 3, 4, 5] })
    wrapper.update()

    const featuredProgramCard = findByTestAttr(wrapper, "featured-program-card")

    const featuredProgramSection = findByTestAttr(
      wrapper,
      "featured-program-section"
    )

    expect(featuredProgramSection.length).toBe(1)
    expect(featuredProgramCard.length).toBe(3)
  })
})

describe("upcoming events display correctly", () => {
  test("upcoming event card loads when there is atleast one upcoming event", () => {
    const wrapper = setup()
    wrapper.setState({ upcomingEvents: [{ title: "test" }] })
    const upcomingEventCard = findByTestAttr(wrapper, "upcoming-event-card")
    const upcomingEventSection = findByTestAttr(
      wrapper,
      "upcoming-events-section"
    )

    expect(upcomingEventSection.length).toBe(1)
    expect(upcomingEventCard.length).toBe(1)
  })

  describe("upcoming events section doesn't render if there are no events", () => {
    const wrapper = setup()
    wrapper.setState({ upcomingEvents: [] })
    const upcomingEventCard = findByTestAttr(wrapper, "upcoming-event-card")
    const upcomingEventSection = findByTestAttr(
      wrapper,
      "upcoming-events-section"
    )

    expect(upcomingEventSection.length).toBe(0)
    expect(upcomingEventCard.length).toBe(0)
  })

  describe("upcoming events list displays 3 options when there are three upcoming events", () => {
    const wrapper = setup()
    wrapper.setState({
      upcomingEvents: [
        { title: "test1" },
        { title: "test2" },
        { title: "test3" },
      ],
    })
    const upcomingEventMenu = findByTestAttr(wrapper, "upcoming-event-menu")

    expect(upcomingEventMenu.length).toBe(1)
  })
})
