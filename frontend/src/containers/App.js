import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from '../containers/Header'
import ListContainer from '../containers/ListContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Route exact path="/" component={ListContainer}/>
        <Route path="/:category" component={ListContainer}/>
      </div>
    );
  }
}

export default App;
