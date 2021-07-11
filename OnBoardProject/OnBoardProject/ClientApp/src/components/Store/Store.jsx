import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import StoreTable from "./StoreTable";
import AddStore from "./AddStore";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";

import "./Store.css";

export default class Store extends Component {
  static displayName = Store.name;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      stores: [],
      start: 0,
      recordsPerPage: 5,
      activePage: 1,
      numPages: 1,
      isAddModalVisible: false,
      isDeleteModalVisible: false,
      isEditModalVisible: false,
      store: { name: "", address: "" },
    };
  }

  componentDidCatch() {}

  componentDidMount() {
    this.fetchStores();
  }
  componentDidUpdate() {}

  componentWillUnmount() {}

  fetchStores = () => {
    axios
      .get("/Stores/GetStores")
      .then(({ data }) => {
        this.setState({
          data: data,
          start: 0,
          activePage: 1,
          stores: data.slice(0, this.state.recordsPerPage),
          numPages: Math.ceil(data.length / this.state.recordsPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModalAddStore = (isVisible) => {
    this.setState({
      isAddModalVisible: isVisible,
    });
  };

  toggleModalDeleteStore = (store, isVisible) => {
    this.setState({
      isDeleteModalVisible: isVisible,
      store: store,
    });
  };

  toggleModalEditStore = (store, isVisible) => {
    this.setState({
      isEditModalVisible: isVisible,
      store: store,
    });
  };

  handleOnChangeDropDown = (e, { value }) => {
    console.log("Dropdown index", value);
    this.setState({
      start: 0,
      stores: this.state.data.slice(0, value),
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
      stores: this.state.data.slice(start, end),
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
      stores,
      activePage,
      numPages,
      isAddModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,
      store,
    } = this.state;

    console.log("New State", this.state);
    return (
      <div>
        <AddStore
          toggleModal={this.toggleModalAddStore}
          isVisible={isAddModalVisible}
          fetchData={this.fetchStores}
        />
        <DeleteStore
          toggleModal={this.toggleModalDeleteStore}
          isVisible={isDeleteModalVisible}
          store={store}
          fetchData={this.fetchStores}
        />
        <EditStore
          toggleModal={this.toggleModalEditStore}
          isVisible={isEditModalVisible}
          store={store}
          fetchData={this.fetchStores}
        />
        <Button color="blue" onClick={() => this.toggleModalAddStore(true)}>
          New Store
        </Button>
        <StoreTable
          stores={stores}
          toggleModalDelete={this.toggleModalDeleteStore}
          toggleModalEdit={this.toggleModalEditStore}
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
