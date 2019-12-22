import React, { useState } from "react"
import {
  Collapse,
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

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false)
  const programItems = (props.programs || []).map(program => {
    return (
      <Link
        to={`/programs/${(program.slug || {}).current}`}
        key={`drop-down-item-${program.slug.current}`}
      >
        <DropdownItem>{program.title}</DropdownItem>
      </Link>
    )
  })

  const handleNavbarToggle = () => setIsOpen(!isOpen)

  return (
    <Navbar color="primary" dark expand="md">
      <Link to="/" style={{ color: "white" }}>
        <NavbarBrand tag="span">Open Hearts Open Minds</NavbarBrand>
      </Link>
      <NavbarToggler onClick={handleNavbarToggle} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret style={{ color: "white" }}>
              Our Programs
            </DropdownToggle>
            <DropdownMenu right>
              <Link to="/programs/">
                <DropdownItem>All Programs</DropdownItem>
              </Link>
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
          <NavItem>
            <NavLink tag="span">
              <Link to="/get-involved" style={{ color: "white" }}>
                Get Involved
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavBar
