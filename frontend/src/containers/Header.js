import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableNavBar from '../components/CollapsableNavBar'
import { getCategories } from '../actions'

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

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategories())
  }

  toggleCollapsedNavBar = () => {
    this.setState((prevState) => ({
      isCollapsedNavBarOpen: !prevState.isCollapsedNavBarOpen
    }))
  }

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
