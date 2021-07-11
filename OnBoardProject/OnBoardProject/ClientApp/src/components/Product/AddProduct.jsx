import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const AddProduct = (props) => {
  const { toggleModal, isVisible, fetchData } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {}, [name, price]);

  const saveProduct = () => {
    axios
      .post("/Products/PostProduct", {
        name: name,
        price: price,
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
      <Modal.Header>Add New Product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Please enter the name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              placeholder="Please enter the Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal(false)}>Cancel</Button>
        <Button color="blue" onClick={() => saveProduct()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddProduct;
