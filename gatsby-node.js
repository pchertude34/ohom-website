const sanityClient = require("./src/sanitClient")
const { groupBy } = require("lodash/collection")
const { sortBy } = require("lodash/collection")
const moment = require("moment")

async function createHomePage(graphql, actions, reporter) {
  const { createPage } = actions
  const currentDate = moment(Date.now()).format("YYYY-MM-DD")
  const results = await sanityClient.fetch(`
  *[_id == '123']{
    carouselImages[]{_key, "url": image.asset->url, title, description },
    featuredPrograms[]->{_id, "imageUrl": programImage.asset->url, title, location, caption, slug},
    whoAreWe,
    featuredTestimonies[]->{...},
    "upcomingEvents": *[_type == 'event']{
      ...,
      "imageUrl": image.asset->url,
      "eventTimes": (eventTimes[startDate > '${currentDate}'] | order(startDate) {startDate})
    }[count(eventTimes) > 0]
  }[0]`)

  if (results.errors) throw results.errors

  reporter.info(`Creating project home page`)

  createPage({
    path: "/",
    component: require.resolve("./src/pages/HomePage/HomePage"),
    context: { homePageData: results },
  })

  return Promise.resolve()
}

async function createProgramPage(graphql, actions, reporter) {
  const { createPage } = actions
  const results = await sanityClient.fetch(`
  *[_type == 'program']{
    "_id": _id,
     ...,
    "photoUrl": programImage.asset->url,
    "events": *[_type=='event' && references(^._id)]{
      ...,
      "imageUrl": image.asset->url
    }
  }
  `)

  if (results.error) throw results.error
  if (results) locationCategorizedPrograms = groupBy(results, "location")

  reporter.info("Createing program page")

  results.map(program => {
    createPage({
      path: `programs/${program.slug.current}`,
      component: require.resolve("./src/pages/Programs/Program"),
      context: { program },
    })
  })

  createPage({
    path: "/programs",
    component: require.resolve("./src/pages/Programs/Programs"),
    context: { programs: results },
  })

  return Promise.resolve()
}

async function createAboutUsPage(graphql, actions, reporter) {
  const { createPage } = actions
  const results = await sanityClient.fetch(`
  {
    "teamMembers" :*[_type == 'teamMember'] {
      ...,
      "photoUrl": image.asset->url,
    },
     "ourStory": *[_id == '123']{ ourStory }[0].ourStory
  }`)

  if (results.error) throw results.error
  reporter.info("Creating about us page")

  createPage({
    path: "/about-us",
    component: require.resolve("./src/pages/AboutUs/AboutUs"),
    context: {
      teamMemberData: results.teamMembers,
      ourStory: results.ourStory,
    },
  })
}

async function createEventsPage(graphql, actions, reporter) {
  const { createPage } = actions
  const events = []
  const results = await sanityClient.fetch(`*[_type == 'event']{
    ...,
      programs[]->{_id, caption, location, title, slug, 'imageUrl': programImage.asset->url},
    'imageUrl': image.asset->url
  }`)

  if (results.error) throw results.error

  results.forEach(event => {
    event.eventTimes.forEach(eventTime => {
      events.push({
        id: event._id + event.key,
        title: event.title,
        subtitle: event.subtitle,
        caption: event.caption,
        time: eventTime.startDate,
        imageUrl: event.imageUrl,
        slug: event.slug,
      })
    })

    createPage({
      path: `/events/${event.slug.current}`,
      component: require.resolve("./src/components/Event/Event"),
      context: { event },
    })
  })

  const dateSortedEvents = sortBy(events, "time")

  createPage({
    path: `/events`,
    component: require.resolve("./src/pages/Events/Events"),
    context: { events: dateSortedEvents },
  })
}

async function createGetInvolvedPage(graphql, actions, reporter) {
  const { createPage } = actions
  const results = await sanityClient.fetch(`
    *[_id == '123']{
      donationInfo,
      newsLetterInfo
    }[0]
  `)

  if (results.error) throw results.error

  reporter.info("Creating Get Involved page")

  createPage({
    path: "/get-involved",
    component: require.resolve("./src/pages/GetInvolved/GetInvolved"),
    context: { getInvolvedData: results },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const pagePromises = []

  pagePromises.push(createHomePage(graphql, actions, reporter))
  pagePromises.push(createProgramPage(graphql, actions, reporter))
  pagePromises.push(createAboutUsPage(graphql, actions, reporter))
  pagePromises.push(createEventsPage(graphql, actions, reporter))
  pagePromises.push(createGetInvolvedPage(graphql, actions, reporter))
  return Promise.all(pagePromises)
}
