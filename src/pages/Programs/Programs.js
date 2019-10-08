import PropTypes from "prop-types"
import React, { Component } from "react"
import Separator from "../../components/Separator/Separator"
import ProgramContent from "../../components/ProgramContent/ProgramContent"
import PageHeader from "../../components/PageHeader/PageHeader"

import headerImage from "../../images/programs_header.jpg"

class Programs extends Component {
  constructor(props) {
    super(props)
    console.log(props.pageContext)
  }

  render() {
    const { programs } = this.props.pageContext
    const locations = programs ? Object.keys(programs) : []
    const locationContent = locations.map(location => {
      const category = location === "null" ? "No Location" : location
      const content = programs[location].map(locationData => (
        <ProgramContent
          content={locationData}
          key={`content-${locationData.slug}`}
        />
      ))

      return (
        <div key={`location-${programs[location].slug}`}>
          <Separator text={category} style="mb-2" />
          {content}
        </div>
      )
    })
    return (
      <React.Fragment>
        <PageHeader
          title={"Our Programs"}
          photoUrl={headerImage}
          text={`Open Hearts Open Minds continues to broaden its scope, providing
          services and life-skills training to prison inmates, as well as
        expanding awareness and understanding for those on the outside of
        prison systems both in Oregon and abroad.`}
        />
        {locationContent}
      </React.Fragment>
    )
  }
}

export default Programs
