import React from "react"
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarBrand,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap"

const OTHER_PROGRAMS = "Other Programs"

const navBar = props => {
  const programLocationItems = (props.programLocations || []).map(location => {
    return location.title !== OTHER_PROGRAMS ? (
      <DropdownItem
        href={`/programs#${location.slug}`}
        key={`drop-down-item-${location.slug}`}
      >
        {location.title}
      </DropdownItem>
    ) : null
  })

  // Map other locations sepratly in order to separate in the dropdown list.
  const otherLocationPrograms = (props.programLocations || []).map(location => {
    return location.title === OTHER_PROGRAMS ? (
      <React.Fragment key={`drop-down-item-${location.slug}`}>
        <DropdownItem divider />
        <DropdownItem>{location.title}</DropdownItem>
      </React.Fragment>
    ) : null
  })

  return (
    <Navbar color="primary" dark>
      <NavbarBrand href="/">Open Hearts Open Minds</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav caret>
            Our Programs
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="/programs">Programs</DropdownItem>
            <DropdownItem divider />
            {programLocationItems}
            {otherLocationPrograms}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  )
}

export default navBar
