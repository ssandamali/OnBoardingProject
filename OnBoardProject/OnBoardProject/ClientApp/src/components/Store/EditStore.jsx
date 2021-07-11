import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const EditStore = (props) => {
  const { toggleModal, isVisible, store, fetchData } = props;
  const [item, setStore] = useState(store);
  useEffect(() => {
    setStore(store);
  }, [store]);

  const handleStoreChange = (field, value) => {
    setStore({
      ...item,
      [field]: value,
    });
  };

  const saveStore = () => {
    axios
      .put(`/Stores/PutStore/${item.id}`, item)
      .then((res) => {
        console.log(res.data);
        toggleModal({ name: "", address: "" }, false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        toggleModal({ name: "", address: "" }, false);
      });
  };

  return (
    <Modal open={isVisible}>
      <Modal.Header>Edit Store</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder={item.name}
              onChange={(e) => handleStoreChange("name", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder={item.address}
              onChange={(e) => handleStoreChange("address", e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({ name: "", address: "" }, false)}>
          Cancel
        </Button>
        <Button color="blue" onClick={() => saveStore()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditStore;
