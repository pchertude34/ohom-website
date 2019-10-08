import React, { useState } from "react"
import infoCircle from "../../images/info-circle.svg"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import "./VolunteerCard.scss"

const volunteerCard = props => {
  const [isModalOpen, toggleModal] = useState(false)

  const photoUrl = props.photoUrl || ""

  return (
    <React.Fragment>
      <Modal
        isOpen={isModalOpen}
        toggle={() => toggleModal(!isModalOpen)}
        centered
      >
        {/* <div>{props.name}</div> */}

        <div className="row align-items-center">
          <div className="col-md-6 pl-5">
            <h3>{props.name}</h3>
            <p>{props.title}</p>
          </div>
          <div className="col-md-6">
            <div className="v-container-modal">
              <img
                src={photoUrl}
                alt={`${props.name} photo`}
                className="container-img "
              />
            </div>
          </div>
        </div>
        <ModalBody>{props.background}</ModalBody>
      </Modal>
      <div
        className="v-card"
        style={props.style}
        onClick={() => toggleModal(!isModalOpen)}
      >
        <div className="">
          <div className="v-container">
            <img
              src={photoUrl}
              alt={`${props.name} photo`}
              className="container-img "
            />
          </div>
        </div>
        <div className="d-flex flex-row">
          <p className="mb-0">{props.name}</p>
        </div>
        <div className="d-flex flex-row">
          <p className="" style={{ color: "gray" }}>
            {props.title}
          </p>
          <div className="ml-auto">
            <img src={infoCircle} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default volunteerCard
