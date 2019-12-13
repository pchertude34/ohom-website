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
      <DropdownItem key={`drop-down-item-${program.slug.current}`}>
        <Link to={`/programs/${(program.slug || {}).current}`}>
          {program.title}
        </Link>
      </DropdownItem>
    )
  })

  const handleNavbarToggle = () => setIsOpen(!isOpen)

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand tag="span">
        <Link to="/" style={{ color: "white" }}>
          Open Hearts Open Minds
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={handleNavbarToggle} />
      <Collapse navbar isOpen={isOpen}>
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
