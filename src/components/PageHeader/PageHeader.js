import React from "react"
import PropTypes from "prop-types"

import "./PageHeader.scss"

const pageHeader = props => {
  return (
    <div className="header-image">
      <img src={props.photoUrl} />
      <div className="header-box">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default pageHeader
