import React from "react"
import PropTypes from "prop-types"
import BlockContent from "@sanity/block-content-to-react"
import "./Footer.scss"

function Footer(props) {
  const sponsors = props.sponsorList.map(sponsor => {
    let sponsorImage = sponsor.imageUrl ? (
      <img className="sponsor" src={sponsor.imageUrl} alt={sponsor.name} />
    ) : (
      <h3>{sponsor.name}</h3>
    )

    return (
      <div className="sponsor my-4 mx-4">
        <a href={sponsor.link || ""}>{sponsorImage}</a>
      </div>
    )
  })

  return (
    <div className="footer">
      <div className="container">
        <h2 className="text-inverse pt-3">Our Sponsors</h2>
        {sponsors}
        <BlockContent blocks={props.footerText} />
      </div>
    </div>
  )
}

Footer.propTypes = {
  footerText: PropTypes.array.isRequired,
  sponsorList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      link: PropTypes.string,
    }).isRequired
  ),
}

export default Footer
