import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import SaleTable from "./SaleTable";
import AddSale from "./AddSale";
import DeleteSale from "./DeleteSale";
import EditSale from "./EditSale";

import "./Sale.css";

export default class Sale extends Component {
  static displayName = Sale.name;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sales: [],
      start: 0,
      recordsPerPage: 5,
      activePage: 1,
      numPages: 1,
      isAddModalVisible: false,
      isDeleteModalVisible: false,
      isEditModalVisible: false,
      sale: {},
      products: [],
      customers: [],
      stores: [],
    };
  }

  componentDidCatch() {}

  componentDidMount() {
    this.fetchSales();
  }
  componentDidUpdate() {}

  componentWillUnmount() {}

  fetchSales = () => {
    axios
      .get("/Sales/GetSales")
      .then(({ data }) => {
        this.setState({
          data: data,
          start: 0,
          activePage: 1,
          sales: data.slice(0, this.state.recordsPerPage),
          numPages: Math.ceil(data.length / this.state.recordsPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setCustomers = () => {
    axios
      .get("/Customers/GetCustomers")
      .then(({ data }) => {
        this.setState({
          customers: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setProducts = () => {
    axios
      .get("/Products/GetProducts")
      .then(({ data }) => {
        this.setState({
          products: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setStores = () => {
    return axios
      .get("/Stores/GetStores")
      .then(({ data }) => {
        this.setState({
          stores: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCustomers = () => {
    axios.get("/Sales/getSales", {
      params: { date: "2019-01-01T12:00:00.000Z" },
    });
  };

  toggleModalAddSale = (isVisible) => {
    this.setCustomers();
    this.setProducts();
    this.setStores();
    this.setState({
      isAddModalVisible: isVisible,
    });
  };

  toggleModalDeleteSale = (sale, isVisible) => {
    this.setState({
      isDeleteModalVisible: isVisible,
      sale: sale,
    });
  };

  toggleModalEditSale = (sale, isVisible) => {
    this.setCustomers();
    this.setProducts();
    this.setStores();
    this.setState({
      isEditModalVisible: isVisible,
      sale: sale,
    });
  };

  handleOnChangeDropDown = (e, { value }) => {
    this.setState({
      start: 0,
      sales: this.state.data.slice(0, value),
      activePage: 1,
      numPages: Math.ceil(this.state.data.length / value),
      recordsPerPage: value,
    });
  };

  handlePageClick = (e, { name }) => {
    let start = (name - 1) * this.state.recordsPerPage;
    let end = name * this.state.recordsPerPage;
    this.setState({
      start: start,
      sales: this.state.data.slice(start, end),
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
      sales,
      activePage,
      numPages,
      isAddModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,
      sale,
      customers,
      products,
      stores,
    } = this.state;

    return (
      <div>
        <AddSale
          toggleModal={this.toggleModalAddSale}
          isVisible={isAddModalVisible}
          fetchData={this.fetchSales}
          customers={customers}
          products={products}
          stores={stores}
        />
        <DeleteSale
          toggleModal={this.toggleModalDeleteSale}
          isVisible={isDeleteModalVisible}
          sale={sale}
          fetchData={this.fetchSales}
          customers={customers}
          products={products}
          stores={stores}
        />
        <EditSale
          toggleModal={this.toggleModalEditSale}
          isVisible={isEditModalVisible}
          sale={sale}
          fetchData={this.fetchSales}
          customers={customers}
          products={products}
          stores={stores}
        />
        <Button color="blue" onClick={() => this.toggleModalAddSale(true)}>
          New Sale
        </Button>
        <SaleTable
          sales={sales}
          toggleModalDelete={this.toggleModalDeleteSale}
          toggleModalEdit={this.toggleModalEditSale}
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
