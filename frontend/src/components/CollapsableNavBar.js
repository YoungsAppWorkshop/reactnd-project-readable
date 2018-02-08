import PropTypes from 'prop-types'
import React from 'react'
import Loading from 'react-loading'
import { Link } from 'react-router-dom'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'

import { ERROR_CONNECTION_REFUSED, FETCHING, READY } from '../constants/Status'
import { capitalize } from '../utils/helpers'

/**
 * Presentational Component which represent a Collapsable Navigation Bar on header
 */
const CollapsableNavBar = ({
  categories, isCollapsedNavBarOpen, selectedCategory, status, toggleCollapsedNavBar
}) => (

  <Navbar id="header" color="faded" light expand="md">

    <Container>

      <NavbarBrand tag={Link} to="/">Readable</NavbarBrand>

      <NavbarToggler onClick={toggleCollapsedNavBar} />

      <Collapse isOpen={isCollapsedNavBarOpen} navbar>

        { status === ERROR_CONNECTION_REFUSED && <p className="text-danger my-auto mx-auto">ERROR_CONNECTION_REFUSED: Connection Refused. Check your Network Connection</p> }
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
  /**
   * All categories in the app
   */
  categories: PropTypes.array.isRequired,
  /**
   * A flag variable which represents if CollapsedNavBar is open on mobile devices
   */
  isCollapsedNavBarOpen: PropTypes.bool.isRequired,
  /**
   * The path of current category which is part of url
   */
  selectedCategory: PropTypes.string,
  /**
   * The status of AJAX request fetching categories data from API server
   */
  status: PropTypes.string.isRequired,
  /**
   * Open/Close CollapsedNavBar on mobile devices
   */
  toggleCollapsedNavBar: PropTypes.func.isRequired
}

export default CollapsableNavBar
