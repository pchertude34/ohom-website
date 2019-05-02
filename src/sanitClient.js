const sanityClient = require("@sanity/client")

module.exports = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
})
