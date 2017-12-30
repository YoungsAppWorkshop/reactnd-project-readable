import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableNavBar from '../components/CollapsableNavBar'
import { getCategories } from '../actions'

class Header extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
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
    const { categories } = this.props

    return (
      <CollapsableNavBar
        categories={categories}
        isCollapsedNavBarOpen={isCollapsedNavBarOpen}
        toggleCollapsedNavBar={this.toggleCollapsedNavBar}
      />
    )

  }
}

const mapStateToProps = state => ({
  isFetching: state.categories.isFetching,
  categories: state.categories.items
})

export default connect(
  mapStateToProps
)(Header)
