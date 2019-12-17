import React from "react"
import PropTypes from "prop-types"

const Testimonial = props => {
  return (
    <div className="row my-5 mx-1">
      <div className="testimonial">
        <div className="testimonial__text">{props.quote}</div>
        <div className="testimonial__author my-3">{props.author}</div>
      </div>
    </div>
  )
}
Testimonial.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
export default Testimonial
