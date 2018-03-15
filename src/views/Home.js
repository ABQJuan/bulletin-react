import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import { getAllPosts } from '../graphql/queries/posts'
import PostPreview from '../components/PostPreview'

import Navbar from '../components/Navbar'

class Home extends Component {
  render () {
    const posts = this.props.data.posts
    return (
      <div>
        <Navbar />
        {!posts && <h1>Loading...</h1>}
        {posts &&
          posts.edges.map(post => {
            if (post.node.featuredImage) {
              return (
                <PostPreview
                  key={post.node.id}
                  id={post.node.id}
                  date={post.node.date}
                  imageURL={post.node.featuredImage.sourceUrl}
                  title={post.node.title}
                />
              )
            } else {
              return (
                <PostPreview
                  key={post.node.id}
                  id={post.node.id}
                  date={post.node.date}
                  imageURL='http://via.placeholder.com/500x500'
                  title={post.node.title}
                />
              )
            }
          })}
      </div>
    )
  }
}

export default graphql(getAllPosts)(Home)
