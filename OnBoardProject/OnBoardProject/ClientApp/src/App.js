import React, { Component } from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Customer from "./components/Customer/Customer";
import Product from "./components/Product/Product";
import Store from "./components/Store/Store";
import Sales from "./components/Sales/Sales";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;
  ø;
  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/components/Customer/Customer" component={Customer} />
        <Route path="/components/Product/Product" component={Product} />
        <Route path="/components/Store/Store" component={Store} />
        <Route path="/components/Sales/Sales" component={Sales} />
      </Layout>
    );
  }
}
