import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Collapse, Container,
  Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink
} from 'reactstrap'

const CollapsableNavBar = ({
  categories, isCollapsedNavBarOpen, toggleCollapsedNavBar
}) => (
  <Navbar id="header" color="faded" light expand="md">
    <Container>
      <NavbarBrand href="/">Readable</NavbarBrand>
      <NavbarToggler onClick={toggleCollapsedNavBar} />
      <Collapse isOpen={isCollapsedNavBarOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">All Categories</NavLink>
          </NavItem>
          {categories.map((category) => (
            <NavItem key={category.path}>
              <NavLink tag={Link} to={`/${category.path}`}>
                {category.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Container>
  </Navbar>
)

CollapsableNavBar.propTypes = {
  categories: PropTypes.array.isRequired,
  isCollapsedNavBarOpen: PropTypes.bool.isRequired,
  toggleCollapsedNavBar: PropTypes.func.isRequired
}

export default CollapsableNavBar
