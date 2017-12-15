import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../containers/Header'
import ListContainer from '../containers/ListContainer'
import PostContainer from '../containers/PostContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/:category/:post_id" component={PostContainer}/>
          <Route path="/:category" component={ListContainer}/>
          <Route exact path="/" component={ListContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
