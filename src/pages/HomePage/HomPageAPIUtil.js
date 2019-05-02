import sanityClient from "../../sanitClient"

/**
 * Load the data from sanity to display on the home page.
 */
export function loadHomepageData() {
  let query = `*[_id == '123']{
      carouselImages[]{"id": ^._id , "src": image.asset->url, title, description },
      featuredPrograms[]->{_id, "image": programImage.asset->url, title, location, description},
      whoAreWe
    }[0]`

  return sanityClient.fetch(query)
}

export function loadUpcomingEvents() {
  let query = `*[_type == 'event']{
    ...,
    "imageUrl": image.asset->url,
    "eventTimes": eventTimes[startDate > '2019-01-01'] | order(startDate) { startDate }
  }[count(eventTimes) > 0]`

  return sanityClient.fetch(query)
}
