const api = "https://api.youngsappworkshop.com"

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// Get all categories for the app
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

// Add a new post
export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post })
  }).then(res => res.json())

// Delete a post
export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

// Downvote a post
export const downVotePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' })
  }).then(res => res.json())

// Get the details of a single post
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'GET',
    headers
  }).then(res => res.json())

// Get all of the posts for a particular category
// If category is undefined, get all of the posts
export const getPosts = (category) =>
  fetch(category ? `${api}/${category}/posts` : `${api}/posts`, {
    method: 'GET',
    headers
  }).then(res => res.json())

// Edit a post
export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post })
  }).then(res => res.json())

// UpVote a post
export const upVotePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json())

// Add a new comment
export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...comment })
  }).then(res => res.json())

// Delete a comment
export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

// Downvote a comment
export const downVoteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' })
  }).then(res => res.json())

// Get all the comments for a single post
export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, {
    method: 'GET',
    headers
  }).then(res => res.json())

// Edit a comment
export const updateComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...comment })
  }).then(res => res.json())

// Upvote a comment
export const upVoteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json())
