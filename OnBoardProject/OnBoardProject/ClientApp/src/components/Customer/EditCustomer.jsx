import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const EditCustomer = (props) => {
  const { toggleModal, isVisible, user, fetchData } = props;
  const [customer, setCustomer] = useState(user);
  useEffect(() => {
    setCustomer(user);
  }, [user]);

  const handleCustomerChange = (field, value) => {
    setCustomer({
      ...customer,
      [field]: value,
    });
  };

  const saveCustomer = () => {
    axios
      .put(`/Customers/PutCustomer/${customer.id}`, customer)
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
      <Modal.Header>Edit Customer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder={customer.name}
              onChange={(e) => handleCustomerChange("name", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder={customer.address}
              onChange={(e) => handleCustomerChange("address", e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({ name: "", address: "" }, false)}>
          Cancel
        </Button>
        <Button color="blue" onClick={() => saveCustomer()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditCustomer;
