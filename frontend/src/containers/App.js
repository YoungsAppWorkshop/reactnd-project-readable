import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../containers/Header'
import ListContainer from '../containers/ListContainer'
import PostContainer from '../containers/PostContainer'

const App = () => (
  <div id="app" className="app">
    <Header />
    <Switch>
      <Route path="/:category/:post_id" component={PostContainer}/>
      <Route path="/:category" component={ListContainer}/>
      <Route exact path="/" component={ListContainer}/>
    </Switch>
  </div>
)

export default App;
