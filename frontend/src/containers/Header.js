import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCategories } from '../actions'

class Header extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
  }

  render() {
    const { categories } = this.props

    return (
      <ul className="categories-list">
        <li><Link to='/'>All</Link></li>
        {categories.map((category) => (
          <li key={category.path}><Link to={`/${category.path}`}>{category.name}</Link></li>
        ))}
      </ul>
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
