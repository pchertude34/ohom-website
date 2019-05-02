import React from "react"
import PropTypes from "prop-types"
import "./ProgramContent.scss"

const programContent = props => {
  console.log(props)
  return (
    <div className="mb-5 row">
      <div className="col-md-8">
        <h4 className="mb-3 text-center">{props.content.title}</h4>
        <p className="program-content">{props.content.description}</p>
      </div>
      <div className="col-md-4">
        {props.content.photoUrl ? (
          <img src={props.content.photoUrl} className="content-photo" />
        ) : null}
      </div>
    </div>
  )
}

programContent.propTypes = {}

export default programContent
