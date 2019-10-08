import React from "react"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap"
import LinesEllipsis from "react-lines-ellipsis"

const programCard = props => {
  return (
    <Card className="">
      <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" />
      <CardBody style={{ paddingTop: "0px" }}>
        <CardTitle>
          <h4>{props.title}</h4>
        </CardTitle>
        {/* <CardSubtitle>{props.subtitle}</CardSubtitle> */}
        <CardText className="text-left">{props.caption}</CardText>
        <Button className="bg-white text-secondary px-5">
          <i>Read More!</i>
        </Button>
      </CardBody>
    </Card>
  )
}

export default programCard
