import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCategories } from '../actions'
import CollapsableNavBar from '../components/CollapsableNavBar'

/**
 *
 * Container Component which represent the Header
 *
 */
class Header extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
    status: PropTypes.string.isRequired
  }

  state = {
    isCollapsedNavBarOpen: false
  }

  // Fetch Categories Info from API server on component mount
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategories())
  }

  // Toggle Collapsable Navigation Bar on small device
  toggleCollapsedNavBar = () => {
    this.setState((prevState) => ({
      isCollapsedNavBarOpen: !prevState.isCollapsedNavBarOpen
    }))
  }

  // Render CollapsableNavBar component
  render() {
    const { isCollapsedNavBarOpen } = this.state
    const { categories, selectedCategory, status } = this.props

    return (
      <CollapsableNavBar
        categories={categories}
        isCollapsedNavBarOpen={isCollapsedNavBarOpen}
        selectedCategory={selectedCategory}
        status={status}
        toggleCollapsedNavBar={this.toggleCollapsedNavBar}
      />
    )

  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  status: state.categories.status,
  selectedCategory: state.categories.selectedCategory
})

export default connect(
  mapStateToProps
)(Header)
