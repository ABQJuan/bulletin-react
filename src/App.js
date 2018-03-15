import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './App.css'

// Import Views
import Category from './views/Category'
// import CreatePost from './views/CreatePost'
import Home from './views/Home'
import PostDetail from './views/PostDetail'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const compostEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  compostEnhancers(applyMiddleware(logger, thunk))
)

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://jesseweigel.com/graphql' }),
  cache: new InMemoryCache()
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/:category' component={Category} />
              <Route path='/:category/:post_id' component={PostDetail} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default App
