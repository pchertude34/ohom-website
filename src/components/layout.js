import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Navbar from "./NavBar/NavBar"
import Footer from "./Footer/Footer"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        sanityConfig(_id: { eq: "123" }) {
          _rawFooterText
        }
        allSanitySponsor {
          edges {
            node {
              _id
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
              _id
              location
              title
              slug {
                current
              }
            }
          }
        }
      }
    `}
    render={data => {
      const footerText = data.sanityConfig._rawFooterText
      const programs = data.allSanityProgram.edges.map(edge => edge.node)
      const sponsors = data.allSanitySponsor.edges.map(edge => {
        const imageUrl = edge.node.image ? edge.node.image.asset.url : null
        return {
          _id: edge.node._id,
          name: edge.node.name,
          link: edge.node.link,
          imageUrl,
        }
      })

      return (
        <React.Fragment>
          <Navbar programs={programs} />
          <div className="container">{children}</div>
          <Footer
            sponsorList={sponsors}
            footerText={footerText}
            className="footer mt-5 pb-3"
          />
        </React.Fragment>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
