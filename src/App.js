import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import Page404 from './pages/404';
import asyncComponent from './hoc/asyncComponent';
import ProductDetails from './components/ProductDetails';
import './App.css';

const AsyncNewProduct = asyncComponent(() => {
  return import('./pages/NewProduct');
});

class App extends Component {
  state = {
    auth: true,
  }
  
  render() {
    const {auth} = this.state;
    return (
      <div className="App">
        <Header/>
          <Switch>
            { auth ? <Route path="/new-product" component={AsyncNewProduct} /> : null }
            <Route exact path="/products" component={HomePage} />
            <Route path={`/products/:productcode`} component={ProductDetails} />
            <Redirect exact from="/" to="/products"/>
            <Route render={() => <Page404 />}/>
          </Switch>
      </div>
    );
  }
}

export default App;// TODO: fix name conventions