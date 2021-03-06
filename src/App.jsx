import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/containers/Layout/Layout';
import Welcome from './components/Welcome/Welcome';
import HomeFinder from './components/Homefinder/HomeFinder';
import HomeDetail from './components/homes/HomeDetail/HomeDetail';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        {/* header */}
        <Switch>
          <Route path="/home-finder" component={HomeFinder} />
          <Route path="/home/:id" component={HomeDetail} />
          <Route path="/" component={Welcome} />
        </Switch>
        {/* footer */}
      </Layout>
    );
  }
}

export default App;
