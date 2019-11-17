import React from "react"
import Separator from "../components/Separator/Separator"
import PageHeader from "../components/PageHeader/PageHeader"
import ProgramContent from "../components/ProgramContent/ProgramContent"

class Program extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    const program = this.props.pageContext.program || {}
    return (
      <React.Fragment>
        <PageHeader photoUrl={program.photoUrl} />
        <Separator text={program.title} style="mb-2" />
        <ProgramContent content={program} />
      </React.Fragment>
    )
  }
}

export default Program
