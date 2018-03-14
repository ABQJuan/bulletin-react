import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostDetail extends Component {
  render () {
    return [
      <h1 key='1'>PostDetail</h1>,
      <p key='2'>This is the post detail page</p>
    ]
  }
}

const mapStateToProps = state => ({
  posts: state.getPosts
})

export default connect(mapStateToProps)(PostDetail)
