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

const navBar = props => {
  const programItems = (props.programs || []).map(program => {
    return (
      <DropdownItem key={`drop-down-item-${program.slug.current}`}>
        <Link to={`/programs/${(program.slug || {}).current}`}>
          {program.title}
        </Link>
      </DropdownItem>
    )
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
                All Programs
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            {programItems}
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
