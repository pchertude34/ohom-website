import sanityClient from "../sanitClient"

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
  const d = new Date(Date.now())
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  const formattedDate = [year, month, day].join("-")

  console.log('formattedDate', formattedDate)

  let query = `*[_type == 'event']{
    ...,
    "imageUrl": image.asset->url,
    "eventTimes": eventTimes[startDate > '${formattedDate}'] | order(startDate) { startDate }
  }[count(eventTimes) > 0]`

  return sanityClient.fetch(query)
}
