import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import CustomerTable from "./CustomerTable";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";

import "./Customer.css";

export default class Customer extends Component {
  static displayName = Customer.name;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      customers: [],
      start: 0,
      recordsPerPage: 5,
      activePage: 1,
      numPages: 1,
      isAddModalVisible: false,
      isDeleteModalVisible: false,
      isEditModalVisible: false,
      user: { name: "", address: "" },
    };
  }

  componentDidCatch() {}

  componentDidMount() {
    this.fetchCustomers();
  }
  componentDidUpdate() {}

  componentWillUnmount() {}

  fetchCustomers = () => {
    axios
      .get("/Customers/GetCustomers")
      .then(({ data }) => {
        this.setState({
          data: data,
          start: 0,
          activePage: 1,
          customers: data.slice(0, this.state.recordsPerPage),
          numPages: Math.ceil(data.length / this.state.recordsPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModalAddCustomer = (isVisible) => {
    this.setState({
      isAddModalVisible: isVisible,
    });
  };

  toggleModalDeleteCustomer = (user, isVisible) => {
    this.setState({
      isDeleteModalVisible: isVisible,
      user: user,
    });
  };

  toggleModalEditCustomer = (user, isVisible) => {
    this.setState({
      isEditModalVisible: isVisible,
      user: user,
    });
  };

  handleOnChangeDropDown = (e, { value }) => {
    console.log("Dropdown index", value);
    this.setState({
      start: 0,
      customers: this.state.data.slice(0, value),
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
      customers: this.state.data.slice(start, end),
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
      customers,
      activePage,
      numPages,
      isAddModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,
      user,
    } = this.state;

    console.log("New State", this.state);
    return (
      <div>
        <AddCustomer
          toggleModal={this.toggleModalAddCustomer}
          isVisible={isAddModalVisible}
          fetchData={this.fetchCustomers}
        />
        <DeleteCustomer
          toggleModal={this.toggleModalDeleteCustomer}
          isVisible={isDeleteModalVisible}
          user={user}
          fetchData={this.fetchCustomers}
        />
        <EditCustomer
          toggleModal={this.toggleModalEditCustomer}
          isVisible={isEditModalVisible}
          user={user}
          fetchData={this.fetchCustomers}
        />
        <Button color="blue" onClick={() => this.toggleModalAddCustomer(true)}>
          New Customer
        </Button>
        <CustomerTable
          customers={customers}
          toggleModalDelete={this.toggleModalDeleteCustomer}
          toggleModalEdit={this.toggleModalEditCustomer}
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
            {/* <Menu.Item
              as={activePage !== "1" ? "a" : null}
              name="1"
              active={activePage === "1"}
              onClick={this.handlePageClick}
            />
            <Menu.Item
              as={activePage !== "2" ? "a" : null}
              name="2"
              active={activePage === "2"}
              onClick={this.handlePageClick}
            />
            <Menu.Item
              as={activePage !== "3" ? "a" : null}
              name="3"
              active={activePage === "3"}
              onClick={this.handlePageClick}
            /> */}
          </Menu>
        </div>
      </div>
    );
  }
}
