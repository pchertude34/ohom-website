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
          description
          programImage {
            asset {
              url
            }
          }
        }
        whoAreWe
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
    path: "/home",
    component: require.resolve("./src/pages/HomePage/HomePage"),
    context: { homepageData },
  })

  return Promise.resolve()
}

async function createProgramPages(graphql, actions, reporter) {
  const { createPage } = actions
  const results = await graphql(`
    {
      allSanityProgram {
        edges {
          node {
            title
            location
            description
            programImage {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `)

  if (results.error) throw results.error

  const programsData = results.data.allSanityProgram.edges.map(program => {
    let photoUrl = null
    if (program.node.programImage) {
      photoUrl = program.node.programImage.asset.url
    }
    // Replace spaces with dashes and make lowercase
    const slug = program.node.title.replace(/\s+/g, "-").toLowerCase()

    return { ...program.node, slug, photoUrl }
  })
  const locationCategorizedPrograms = groupBy(programsData, "location")

  reporter.info("Createing program page")

  createPage({
    path: "/programs",
    component: require.resolve("./src/pages/Programs/Programs"),
    context: { programs: locationCategorizedPrograms },
  })

  return Promise.resolve()
}

async function createEventPages(graphql, actions, reporter) {}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const pagePromises = []

  pagePromises.push(createHomePage(graphql, actions, reporter))
  pagePromises.push(createProgramPages(graphql, actions, reporter))

  return Promise.all(pagePromises)
}
