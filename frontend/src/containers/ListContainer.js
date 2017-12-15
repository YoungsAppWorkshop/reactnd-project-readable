import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import { fetchPosts, addPost } from '../actions'
import * as API from '../utils/api'

const SORT_BY = {
  'MOST_RECENT': (post1, post2) => post2.timestamp - post1.timestamp,
  'MOST_VOTED': (post1, post2) => post2.voteScore - post1.voteScore,
  'TITLE': (post1, post2) => (
    post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
    post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
  )
}

Modal.setAppElement('#root')

class ListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    currentCategory: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    postsOrder: 'MOST_RECENT',
    isModalOpen: false,
    postForm: { title: '', body: '', author: '' }
  }

  componentDidMount() {
    const currentCategory = this.props.match.params.category
    this.props.dispatch(fetchPosts(currentCategory))
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    if (nextProps.match.params.category !== previousCategory) {
      this.props.dispatch(fetchPosts(nextProps.match.params.category))
    }
  }

  sortPosts = (postsOrder) => { this.setState({ postsOrder }) }

  openModal = () => this.setState({ isModalOpen: true })
  closeModal = () => this.setState({ isModalOpen: false })

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  handleSubmit = () => {
    const { postForm } = this.state
    const { posts, dispatch } = this.props

    const id = uuidv1()
    const timestamp = Date.now()
    const category = this.categorySelector.value
    const newPost = {
      id, timestamp, title: postForm.title,
      body: postForm.body, author: postForm.author,
      category, voteScore: 1, deleted: false, commentCount: 0
    }

    let newPosts = Array.from(posts)
    newPosts.push(newPost)

    dispatch(addPost(newPosts))
    API.addPost(newPost)
    this.setState({ postForm: { title: '', body: '', author: '' }})
  }

  render() {
    const { postsOrder, isModalOpen, postForm } = this.state
    const { categories, posts, currentCategory } = this.props
    let sortedPosts = Array.from(posts).sort(SORT_BY[postsOrder])

    return (
      <div>

        Order by:
        <select value={postsOrder} onChange={e => this.sortPosts(e.target.value)}>
          <option value="MOST_RECENT">Date</option>
          <option value="MOST_VOTED">Vote Score</option>
          <option value="TITLE">Title</option>
        </select>

        <ul className="posts-list">
          {sortedPosts.map((post) => (
            <li key={post.id}><Link to={`/${post.category}/${post.id}`}>{post.title} | {post.timestamp} | {post.voteScore}</Link></li>
          ))}
        </ul>

        <button onClick={this.openModal}>Add a New Post</button>

        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
        >
          <div>
            <p>Add a New Post</p>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={postForm.title}
              onChange={this.handleInputChange}
            />
            <input
              name="author"
              type="text"
              placeholder="Author"
              value={postForm.author}
              onChange={this.handleInputChange}
            />
            <select
              name="category"
              defaultValue={currentCategory}
              ref={(el) => { this.categorySelector = el }}
            >
              {categories.map((category) => (
                <option key={category.path} value={category.name}>{category.name}</option>
              ))}
            </select>
            <br/>
            <textarea
              name="body"
              rows="10" cols="60"
              placeholder="Post Contents Here..."
              value={postForm.body}
              onChange={this.handleInputChange}
            />
            <br/>
            <button onClick={this.handleSubmit}>Submit</button>
            <button onClick={this.closeModal}>Close</button>
          </div>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  currentCategory: state.posts.category,
  isFetching: state.posts.isFetching,
  posts: state.posts.items
})

export default connect(
  mapStateToProps
)(ListContainer)
