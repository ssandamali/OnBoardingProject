import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const AddCustomer = (props) => {
  const { toggleModal, isVisible, fetchData, customers, products, stores } =
    props;

  const customerDropdown = customers.map((x) => ({
    key: x.id,
    text: x.name,
    value: x.id,
  }));

  const productDropdown = products.map((x) => ({
    key: x.id,
    text: x.name,
    value: x.id,
  }));

  const storesDropdown = stores.map((x) => ({
    key: x.id,
    text: x.name,
    value: x.id,
  }));
  const [soldDate, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [store, setStore] = useState("");

  useEffect(() => {}, [soldDate, customer, product, store]);

  const saveSales = () => {
    axios
      .post("/Sales/PostSales", {
        dateSold: soldDate,
        customerId: customer,
        productId: product,
        storeId: store,
      })
      .then((res) => {
        console.log(res.data);
        toggleModal(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        toggleModal(false);
      });
  };

  return (
    <Modal open={isVisible}>
      <Modal.Header>Add New Sale</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Date Sold</label>
            <input
              required
              type="Date"
              placeholder="YYYY-MM-DD"
              onChange={(e) => setDate(e.target.value)}
            />
            <Form.Select
              fluid
              required
              label="Customer"
              options={customerDropdown}
              placeholder="Please Select the Customer"
              onChange={(e, { value }) => setCustomer(value)}
            />
            <Form.Select
              fluid
              required
              label="Product"
              options={productDropdown}
              placeholder="Please Select the Product"
              onChange={(e, { value }) => setProduct(value)}
            />
            <Form.Select
              fluid
              required
              label="Store"
              options={storesDropdown}
              placeholder="Please Select the Store"
              onChange={(e, { value }) => setStore(value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal(false)}>Cancel</Button>
        <Button color="blue" onClick={() => saveSales()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddCustomer;
