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
import { Link } from "gatsby"

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
    <Navbar color="primary" dark expand="md">
      <NavbarBrand tag="span">
        <Link to="/" style={{ color: "white" }}>
          Open Hearts Open Minds
        </Link>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav caret style={{ color: "white" }}>
            Our Programs
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link to="/programs/" style={{ color: "black" }}>
                Programs
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            {programLocationItems}
            {otherLocationPrograms}
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink tag="span">
            <Link to="/events/" style={{ color: "white" }}>
              Events
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag="span">
            <Link to="/about-us" style={{ color: "white" }}>
              About Us
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default navBar
