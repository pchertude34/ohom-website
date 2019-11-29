import React from "react"
import Separator from "../../components/Separator/Separator"
import PageHeader from "../../components/PageHeader/PageHeader"
import headerImage from "../../images/get-involved-header.jpg"
import BlockContent from "@sanity/block-content-to-react"

function GetInvolved(props) {
  const pageContext = (props.pageContext || {}).getInvolvedData || {}

  const handleContactFormSubmit = event => {
    event.preventDefault()

    console.log("Form submit")
  }

  const handleEmailSubscribe = event => {
    event.preventDefault()

    console.log("Email subscribe")
  }
  return (
    <div>
      <PageHeader
        title="Get Involved"
        photoUrl={headerImage}
        text="If what we do here at Open Hearts Open Minds inspires you, please feel free to send to contact us and we would be happy to help you get involved. Another extremely helpful way to assist is to donate!"
      />
      <Separator text="Get Involved" style="mb-4" />
      <div className="row mb-4">
        <div className="col-md-5 col-xs-12 d-flex">
          <div className="info-box">
            <div className="info-box__header">Donate</div>
            <div className="info-box__body">
              <BlockContent blocks={pageContext.donationInfo} />
            </div>
          </div>
        </div>
        <div className="col-md-7 col-xs-12 d-flex">
          <div className="info-box">
            <div className="info-box__header">News Letter</div>
            <div className="info-box__body">
              <BlockContent blocks={pageContext.newsLetterInfo} />
            </div>
            <form onSubmit={handleEmailSubscribe} className="text-center">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <button className="btn btn-primary mt-2">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Separator text="Contact Us" style="mb-4" />
      <div className="info-box mb-4">
        <form onSubmit={handleContactFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label required htmlFor="email">
              Email
            </label>
            <input type="text" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              type="text"
              className="form-control"
              placeholder="Select a Subject"
            >
              <option> </option>
              <option>Volunteers</option>
              <option>General Information</option>
              <option>News Letter Signup</option>
              <option>ODOC Staff</option>
              <option>Former Inmates</option>
            </select>
          </div>
          <div className="form-group">
            <label required htmlFor="name">
              Message
            </label>
            <textarea className="form-control" rows="5" placeholder="Message" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default GetInvolved
