import gql from 'graphql-tag'

export const getAllCategories = gql`
  query getAllCategories {
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`
