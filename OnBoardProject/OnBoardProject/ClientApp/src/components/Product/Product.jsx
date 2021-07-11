import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

import "./Product.css";

export default class Product extends Component {
  static displayName = Product.name;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      products: [],
      start: 0,
      recordsPerPage: 5,
      activePage: 1,
      numPages: 1,
      isAddModalVisible: false,
      isDeleteModalVisible: false,
      isEditModalVisible: false,
      product: { name: "", price: "" },
    };
  }

  componentDidCatch() {}

  componentDidMount() {
    this.fetchProducts();
  }
  componentDidUpdate() {}

  componentWillUnmount() {}

  fetchProducts = () => {
    axios
      .get("/Products/GetProducts")
      .then(({ data }) => {
        this.setState({
          data: data,
          start: 0,
          activePage: 1,
          products: data.slice(0, this.state.recordsPerPage),
          numPages: Math.ceil(data.length / this.state.recordsPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModalAddProduct = (isVisible) => {
    this.setState({
      isAddModalVisible: isVisible,
    });
  };

  toggleModalDeleteProduct = (product, isVisible) => {
    this.setState({
      isDeleteModalVisible: isVisible,
      product: product,
    });
  };

  toggleModalEditProduct = (product, isVisible) => {
    this.setState({
      isEditModalVisible: isVisible,
      product: product,
    });
  };

  handleOnChangeDropDown = (e, { value }) => {
    console.log("Dropdown index", value);
    this.setState({
      start: 0,
      products: this.state.data.slice(0, value),
      activePage: 1,
      numPages: Math.ceil(this.state.data.length / value),
      recordsPerPage: value,
    });
  };

  handlePageClick = (e, { name }) => {
    console.log("Pagination value:", name);
    let start = (name - 1) * this.state.recordsPerPage;
    let end = name * this.state.recordsPerPage;
    this.setState({
      start: start,
      products: this.state.data.slice(start, end),
      activePage: name,
    });
  };

  render() {
    const dropdown = [
      { key: 5, text: "5", value: 5 },
      { key: 10, text: "10", value: 10 },
      { key: 15, text: "15", value: 15 },
      { key: 20, text: "20", value: 20 },
    ];

    const {
      products,
      activePage,
      numPages,
      isAddModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,
      product,
    } = this.state;

    console.log("New State", this.state);
    return (
      <div>
        <AddProduct
          toggleModal={this.toggleModalAddProduct}
          isVisible={isAddModalVisible}
          fetchData={this.fetchProducts}
        />
        <DeleteProduct
          toggleModal={this.toggleModalDeleteProduct}
          isVisible={isDeleteModalVisible}
          product={product}
          fetchData={this.fetchProducts}
        />
        <EditProduct
          toggleModal={this.toggleModalEditProduct}
          isVisible={isEditModalVisible}
          product={product}
          fetchData={this.fetchProducts}
        />
        <Button color="blue" onClick={() => this.toggleModalAddProduct(true)}>
          New Product
        </Button>
        <ProductTable
          products={products}
          toggleModalDelete={this.toggleModalDeleteProduct}
          toggleModalEdit={this.toggleModalEditProduct}
        />
        <div className="footer">
          <Dropdown
            inline
            options={dropdown}
            defaultValue={5}
            onChange={this.handleOnChangeDropDown}
          />
          <Menu floated="right" pagination>
            {_.times(numPages, (i) => (
              <Menu.Item
                as={activePage !== i + 1 ? "a" : null}
                name={i + 1}
                active={activePage === i + 1}
                onClick={this.handlePageClick}
              />
            ))}
          </Menu>
        </div>
      </div>
    );
  }
}
