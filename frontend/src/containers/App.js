import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Footer from '../components/Footer'
import Header from '../containers/Header'
import ListPage from '../containers/ListPage'
import PostDetailPage from '../containers/PostDetailPage'
import '../styles/App.css'

const App = () => (
  <div id="app" className="app">
    <Header />
    <Switch>
      <Route path="/:category/:post_id" component={PostDetailPage}/>
      <Route path="/:category" component={ListPage}/>
      <Route exact path="/" component={ListPage}/>
    </Switch>
    <Footer />
  </div>
)

export default App;
