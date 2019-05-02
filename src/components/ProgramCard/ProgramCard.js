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

const programCard = props => {
  return (
    <Card className="">
      <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText>{props.description}</CardText>
        <Button className="bg-white text-secondary px-5">Button</Button>
      </CardBody>
    </Card>
  )
}

export default programCard
