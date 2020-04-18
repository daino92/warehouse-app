import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import Page404 from './pages/404';
import Products from './components/Products';
import asyncComponent from './hoc/asyncComponent';
import ProductDetails from './pages/ProductDetails';
import './App.css';

const AsyncNewProduct = asyncComponent(() => {
  return import('./pages/NewProduct');
});

const asyncHistory = asyncComponent(() => {
  return import('./pages/History');
});

const asyncCategory = asyncComponent(() => {
  return import('./pages/CategoryPage');
});

const asyncCategoryDetails = asyncComponent(() => {
  return import('./pages/CategoryDetails');
});

const AsyncNewCategory = asyncComponent(() => {
  return import('./pages/NewCategory');
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
            { auth ? <Route exact path="/product/new-product" component={AsyncNewProduct} /> : null }
            { auth ? <Route exact path="/categories" component={asyncCategory} /> : null }
            { auth ? <Route path="/categories/new-category" component={AsyncNewCategory} /> : null }
            { auth ? <Route path={`/categories/:id`} component={asyncCategoryDetails} /> : null }
            { auth ? <Route path="/history" component={asyncHistory} /> : null }
            {/* <Route exact path="/products" component={HomePage} /> */}
            <Route path={`/products/:address/:page?`} component={Products} />
            <Route path={`/product/:productId`} component={ProductDetails} />
            <Redirect exact from="/" to="/products/Kifisia/1"/>
            <Route render={() => <Page404 />}/>
          </Switch>
      </div>
    );
  }
}

export default App;