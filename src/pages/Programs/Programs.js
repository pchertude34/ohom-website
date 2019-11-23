import React from "react"
import PropTypes from "prop-types"
import Separator from "../../components/Separator/Separator"
import PageHeader from "../../components/PageHeader/PageHeader"
import ProgramCard from "../../components/ProgramCard/ProgramCard"

import headerImage from "../../images/programs_header.jpg"

const Programs = props => {
  console.log("props", props)
  const programs = props.pageContext.programs || []

  const programCards = programs.map(program => {
    return (
      <div
        className="col-md-4 d-flex align-items-stretch mb-4"
        key={`program-${program._id}`}
      >
        <ProgramCard
          imageUrl={program.photoUrl}
          title={program.title}
          subtitle={program.location}
          caption={program.caption}
          link={`/programs/${(program.slug || {}).current}`}
        />
      </div>
    )
  })

  return (
    <div>
      <PageHeader
        title={"Our Programs"}
        photoUrl={headerImage}
        text={`Open Hearts Open Minds continues to broaden its scope, providing
            services and life-skills training to prison inmates, as well as
          expanding awareness and understanding for those on the outside of
          prison systems both in Oregon and abroad.`}
      />
      <Separator text="Programs" style="mb-4" />
      <div className="row text-center">{programCards}</div>
    </div>
  )
}

export default Programs
