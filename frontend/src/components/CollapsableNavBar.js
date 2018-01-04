import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import Loading from 'react-loading'

import { capitalize } from '../utils/helpers'
import { FETCHING, READY } from '../constants/Status'

const CollapsableNavBar = ({
  categories, isCollapsedNavBarOpen, selectedCategory, status, toggleCollapsedNavBar
}) => (

  <Navbar id="header" color="faded" light expand="md">

    <Container>

      <NavbarBrand tag={Link} to="/">Readable</NavbarBrand>

      <NavbarToggler onClick={toggleCollapsedNavBar} />

      <Collapse isOpen={isCollapsedNavBarOpen} navbar>

        { status === FETCHING && <Loading delay={200} type="spin" color="#222" height={32} width={32} className="mx-auto"/> }

        { status === READY &&
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/" active={!selectedCategory}>All Categories</NavLink>
            </NavItem>

            {categories.map((category) => (
              <NavItem key={category.path}>
                <NavLink tag={Link} to={`/${category.path}`} active={selectedCategory===category.path}>
                  {capitalize(category.name)}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        }

      </Collapse>

    </Container>

  </Navbar>
)

CollapsableNavBar.propTypes = {
  categories: PropTypes.array.isRequired,
  isCollapsedNavBarOpen: PropTypes.bool.isRequired,
  selectedCategory: PropTypes.string,
  status: PropTypes.string.isRequired,
  toggleCollapsedNavBar: PropTypes.func.isRequired
}

export default CollapsableNavBar
