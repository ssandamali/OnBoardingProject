import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const AddStore = (props) => {
  const { toggleModal, isVisible, fetchData } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {}, [name, address]);

  const saveStore = () => {
    axios
      .post("/Stores/PostStore", {
        name: name,
        address: address,
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
      <Modal.Header>Add New Store</Modal.Header>
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
            <label>Address</label>
            <input
              placeholder="Please enter the address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal(false)}>Cancel</Button>
        <Button color="blue" onClick={() => saveStore()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddStore;
