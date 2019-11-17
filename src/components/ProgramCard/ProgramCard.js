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
import LinesEllipsis from "react-lines-ellipsis"

const ProgramCard = props => {
  return (
    <Card className="">
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
          <Button className="bg-white text-secondary px-5 flex-d align-items-bottom">
            <Link to={props.link}>
              <i>Read More!</i>
            </Link>
          </Button>
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
