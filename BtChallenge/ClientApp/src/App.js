import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Persoane } from './components/Persoane';
import { Produse } from './components/Produse';
import { Vanzari } from './components/Vanzari';
import { Remuneratii } from './components/Remuneratii';
import { SituatieVanzari } from './components/SituatieVanzari';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/produse' component={Produse} />
            <Route path='/persoane' component={Persoane} />
            <Route path='/vanzari' component={Vanzari} />
            <Route path='/remuneratii' component={Remuneratii} />
            <Route path='/situatieVanzari' component={SituatieVanzari} />
      </Layout>
    );
  }
}
