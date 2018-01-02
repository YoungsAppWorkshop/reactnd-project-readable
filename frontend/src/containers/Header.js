import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableNavBar from '../components/CollapsableNavBar'
import { getCategories } from '../actions'

class Header extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    selectedCategory: PropTypes.string
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
    const { categories, selectedCategory } = this.props

    return (
      <CollapsableNavBar
        categories={categories}
        isCollapsedNavBarOpen={isCollapsedNavBarOpen}
        selectedCategory={selectedCategory}
        toggleCollapsedNavBar={this.toggleCollapsedNavBar}
      />
    )

  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  isFetching: state.categories.isFetching,
  selectedCategory: state.categories.selectedCategory
})

export default connect(
  mapStateToProps
)(Header)
