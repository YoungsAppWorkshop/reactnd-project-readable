import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Footer from '../components/Footer'
import Header from '../containers/Header'
import ListView from '../containers/ListView'
import PostDetailView from '../containers/PostDetailView'
import '../styles/App.css'

const App = () => (
  <div id="app" className="app">
    <Header />
    <Switch>
      <Route path="/:category/:post_id" component={PostDetailView}/>
      <Route path="/:category" component={ListView}/>
      <Route exact path="/" component={ListView}/>
    </Switch>
    <Footer />
  </div>
)

export default App;
