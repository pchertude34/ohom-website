import React from "react"
import BlockContent from "@sanity/block-content-to-react"
import PageHeader from "../../components/PageHeader/PageHeader"
import VolunteerCard from "../../components/VolunteerCard/VolunteerCard"
import Separator from "../../components/Separator/Separator"
import { Modal } from "reactstrap"
import headerImage from "../../images/about_header.jpg"

const BOARD_MEMBER_TYPE = "board-member"
const ADVISORY_BOARD_TYPE = "advisory-board-member"
const VOLUNTEER_TYPE = "volunteer"

class AboutUs extends React.Component {
  render() {
    const teamMemberData = this.props.pageContext.teamMemberData || []
    const ourStory = this.props.pageContext.ourStory || []

    const boardMembers = []
    const advisoryBoardMembers = []
    const volunteers = []

    if (teamMemberData) {
      teamMemberData.forEach(teamMember => {
        const { name, position, title, background, photoUrl } = teamMember
        const volunteerCard = (
          <div className="col-md-3 col-xs-12">
            <VolunteerCard
              name={name}
              position={position}
              title={title}
              background={background}
              photoUrl={photoUrl}
            />
          </div>
        )

        if (position === BOARD_MEMBER_TYPE) boardMembers.push(volunteerCard)
        else if (position === ADVISORY_BOARD_TYPE)
          advisoryBoardMembers.push(volunteerCard)
        else if (position === VOLUNTEER_TYPE) volunteers.push(volunteerCard)
      })
    }

    return (
      <React.Fragment>
        <PageHeader
          title="About Us"
          photoUrl={headerImage}
          text={`Open Hearts Open Minds’ mission is to nurture inner transformation through 
          dialogue, silence, education and the arts, in order to promote peace, love and 
          understanding.`}
        />
        <div className="mb-4">
          <Separator text="Our Story" style="mb-2" />
          <div className="offset-lg-1 col-lg-10">
            <BlockContent blocks={ourStory} />
          </div>
        </div>
        {boardMembers.length > 0 ? (
          <BoardCategory text={"Our Board"}>{boardMembers}</BoardCategory>
        ) : null}
        {advisoryBoardMembers.length > 0 ? (
          <BoardCategory text="Advisory Board">
            {advisoryBoardMembers}
          </BoardCategory>
        ) : null}
        {volunteers.length > 0 ? (
          <BoardCategory text={"Volunteers"}>{volunteers}</BoardCategory>
        ) : null}
      </React.Fragment>
    )
  }
}

const BoardCategory = props => (
  <React.Fragment>
    <Separator text={props.text} />
    <div className="row my-3">{props.children}</div>
  </React.Fragment>
)

export default AboutUs
