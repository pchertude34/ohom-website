import React from "react"
import PropTypes from "prop-types"

const BlockContent = props => {
  console.log(props)
  const createChild = (marks, text) => {
    // console.log(marks)
    // console.log(elementType)
    const elementType = marks[0]
    const remainingMarks = marks.slice(1, marks.length)

    // console.log("creating element: " + elementType)
    return React.createElement(
      elementType,
      null,
      remainingMarks.length > 0 ? createChild(remainingMarks, text) : text
    )
  }

  const renderElements = () => {
    const content = props.content.map(element => {
      const children = element.children.map(child => {
        console.log("creating element: " + child._type)
        return React.createElement(
          child._type,
          null,
          child.marks.length > 0
            ? createChild(child.marks, child.text)
            : child.text
        )
      })
      console.log("creating element: " + element.style)
      return React.createElement(element.style, null, children)
    })

    return content
    // return <div>content</div>
  }

  // return <React.Fragment>{renderElements()}</React.Fragment>
  return <React.Fragment>{renderElements()}</React.Fragment>
}

// BlockContent.propTypes = {
//   elementType: PropTypes.string.isRequired,
//   childElements: PropTypes.arrayOf({
//     _key: PropTypes.string,
//     text: PropTypes.string,
//     marks: propTypes.array,
//   }),
// }

export default BlockContent
