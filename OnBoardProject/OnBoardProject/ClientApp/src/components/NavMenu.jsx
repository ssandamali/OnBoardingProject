import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";

export default class NavMenu extends Component {
  state = { activeItem: "Home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <header>
        <Menu
          borderless={true}
          style={{ backgroundColor: "black" }}
          className="navMenu"
        >
          <Menu.Item
            as={NavLink}
            to="/"
            name="React"
            active={activeItem === "Home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/components/Customer/Customer"
            name="Customers"
            active={activeItem === "Customer"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/components/Product/Product"
            name="Products"
            active={activeItem === "Product"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/components/Store/Store"
            name="Stores"
            active={activeItem === "Store"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/components/Sales/Sales"
            name="Sales"
            active={activeItem === "Sales"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </header>
    );
  }
}
