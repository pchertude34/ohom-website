/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { uniqBy } from "lodash"

import Navbar from "./NavBar/NavBar"
import Footer from "./Footer/Footer"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        allSanitySponsor {
          edges {
            node {
              name
              link
              image {
                asset {
                  url
                }
              }
            }
          }
        }
        allSanityProgram {
          edges {
            node {
              location
            }
          }
        }
      }
    `}
    render={data => {
      const programLocations = uniqBy(
        data.allSanityProgram.edges.map(edge => {
          const title = edge.node.location
            ? edge.node.location
            : "Other Programs"
          const slug = title.replace(/\s+/g, "-").toLowerCase()

          return { title, slug }
        }),
        "title"
      )

      const sponsors = data.allSanitySponsor.edges.map(edge => {
        const imageUrl = edge.node.image ? edge.node.image.asset.url : null
        return {
          name: edge.node.name,
          link: edge.node.link,
          imageUrl,
        }
      })

      return (
        <React.Fragment>
          <Navbar programLocations={programLocations} />
          <div className="container">{children}</div>
          <Footer sponsorList={sponsors} className="footer mt-5 pb-3" />
        </React.Fragment>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
