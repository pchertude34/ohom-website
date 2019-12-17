import React from "react"
import PropTypes from "prop-types"

const pageHeader = props => {
  return (
    <div
      className="image-box"
      style={{ backgroundImage: `url(${props.photoUrl})` }}
    >
      {(props.title || props.text) && (
        <div className="header-box">
          <h3>{props.title}</h3>
          <p>{props.text}</p>
        </div>
      )}
    </div>
  )
}

pageHeader.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
}

export default pageHeader
