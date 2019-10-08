/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"
import Layout from "./src/components/layout"
import { useStaticQuery, graphql } from "gatsby"

function something() {
  const test = graphql`
    query {
      allSanityProgram {
        edges {
          node {
            location
          }
        }
      }
    }
  `

  console.log(test)
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
