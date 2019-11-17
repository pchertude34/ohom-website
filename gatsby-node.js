/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const sanityClient = require("./src/sanitClient")
const { groupBy } = require("lodash/collection")

// exports.createPages = () => {
// let query = `*[_id == '123']{
//     carouselImages[]{"id": ^._id , "src": image.asset->url, title, description },
//     featuredPrograms[]->{_id, "image": programImage.asset->url, title, location, description},
//     whoAreWe
//   }[0]`
// return sanityClient.fetch(query).then(response => {
//   console.log(response)
// })
// }
async function createHomePage(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      sanityConfig {
        carouselImages {
          _key
          title
          description
          image {
            asset {
              url
            }
          }
        }
        featuredPrograms {
          title
          location
          caption
          description
          programImage {
            asset {
              url
            }
          }
        }
        whoAreWe
        featuredTestimonies {
          testimony
          authorName
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const homepageData = result.data.sanityConfig || {}
  // Flatten out the URL of the image
  homepageData.carouselImages = (homepageData.carouselImages || []).map(
    carouselImage => {
      return {
        ...carouselImage,
        url: carouselImage.image ? carouselImage.image.asset.url : "",
      }
    }
  )

  homepageData.featuredPrograms = (homepageData.featuredPrograms || []).map(
    program => {
      return {
        ...program,
        url: program.programImage ? program.programImage.asset.url : "",
      }
    }
  )

  reporter.info(`Creating project home page`)

  createPage({
    path: "/",
    component: require.resolve("./src/pages/HomePage/HomePage"),
    context: { homepageData },
  })

  return Promise.resolve()
}

async function createProgramPage(graphql, actions, reporter) {
  const { createPage } = actions
  const results = await sanityClient.fetch(`
    *[_type == 'program']{
      ...,
      "photoUrl": programImage.asset->url
    }
  `)

  if (results.error) throw results.error
  if (results) locationCategorizedPrograms = groupBy(results, "location")

  reporter.info("Createing program page")

  results.map(program => {
    createPage({
      path: `programs/${program.slug.current}`,
      component: require.resolve("./src/pages/program"),
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
  const teamMemberResults = await sanityClient.fetch(`
  *[_type == 'teamMember'] {
    ...,
    "photoUrl": image.asset->url
  }`)

  if (teamMemberResults.error) throw teamMemberResults.error
  reporter.info("Creating about us page")

  createPage({
    path: "/about-us",
    component: require.resolve("./src/pages/AboutUs/AboutUs"),
    context: { teamMemberData: teamMemberResults },
  })
}
// async function createEventPages(graphql, actions, reporter) {}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const pagePromises = []

  pagePromises.push(createHomePage(graphql, actions, reporter))
  pagePromises.push(createProgramPage(graphql, actions, reporter))
  pagePromises.push(createAboutUsPage(graphql, actions, reporter))

  return Promise.all(pagePromises)
}
