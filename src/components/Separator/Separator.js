import React from "react"

const separator = props => {
  return (
    <div className={`col py-1 pl-5 bg-secondary text-white ${props.className}`}>
      <h2 className="font-weight-light font-italic">{props.text}</h2>
    </div>
  )
}

export default separator
