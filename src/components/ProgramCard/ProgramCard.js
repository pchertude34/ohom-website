import React from "react"
import { Link } from "gatsby"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap"
import PropTypes from "prop-types"

const ProgramCard = props => {
  return (
    <Card>
      <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" />
      <CardBody style={{ paddingTop: "0px" }}>
        <CardTitle>
          <h4>{props.title}</h4>
        </CardTitle>
        {props.subtitle && (
          <CardSubtitle className="mb-1">{props.subtitle}</CardSubtitle>
        )}
        <CardText className="text-left">{props.caption}</CardText>
        {props.link && (
          <Link to={props.link}>
            <Button className="bg-white text-secondary px-5 flex-d align-items-bottom">
              <i>Read More!</i>
            </Button>
          </Link>
        )}
      </CardBody>
    </Card>
  )
}

ProgramCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  caption: PropTypes.string.isRequired,
  link: PropTypes.string,
}

export default ProgramCard
