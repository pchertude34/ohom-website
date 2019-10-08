import sanityClient from "../sanitClient"

export function loadUpcomingEventsData() {
  const formattedDate = getFormattedDate()

  let query = `*[_type == 'event']{
    ...,
    "imageUrl": image.asset->url,
    "eventTimes": eventTimes[startDate > '${formattedDate}'] | order(startDate) { startDate }
  }[count(eventTimes) > 0]`

  return sanityClient.fetch(query)
}

export function loadUpcomingEventsByProgram(programId) {
  const formattedDate = getFormattedDate()

  let query = `*[_type == 'event' && references('${programId}')]{
    _id,
    title,
    subtitle,
    description,
    slug,
    "imageUrl": image.asset->url,
    "eventTimes": eventTimes[startDate > '${formattedDate}'] | order(startDate) { startDate }
  }[count(eventTimes) > 0]`

  return sanityClient.fetch(query)
}

function getFormattedDate() {
  const d = new Date(Date.now())
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  const formattedDate = [year, month, day].join("-")

  return formattedDate
}
