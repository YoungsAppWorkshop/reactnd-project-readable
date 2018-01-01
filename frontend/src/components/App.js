import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Footer from '../components/Footer'
import Header from '../containers/Header'
import ListView from '../containers/ListView'
import NotFound from '../containers/NotFound'
import PostDetailView from '../containers/PostDetailView'
import '../styles/App.css'

const App = () => (
  <div id="app" className="app">

    <Header />

    <Switch>
      <Route exact path="/404" component={NotFound}/>
      <Route exact path="/" component={ListView}/>
      <Route path="/:category/:post_id" component={PostDetailView}/>
      <Route path="/:category" component={ListView}/>
    </Switch>

    <Footer />

  </div>
)

export default App;
