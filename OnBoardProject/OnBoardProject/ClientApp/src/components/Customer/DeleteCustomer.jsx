import React from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";

const deleteCustomer = (user, fetchDataFun, toggleModal) => {
  console.log(`call delete function`);
  axios
    .delete(`/Customers/DeleteCustomer/${user.id}`)
    .then(({ data }) => {
      toggleModal({ name: "", address: "" }, false);
      fetchDataFun();
    })
    .catch((err) => {
      console.log(err);
      toggleModal({ name: "", address: "" }, false);
    });
};

const DeleteCustomer = (props) => {
  const { toggleModal, isVisible, user, fetchData } = props;
  return (
    <Modal size="tiny" open={isVisible}>
      <Modal.Content>
        <p>Are you sure you want to delete the customer</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({ name: "", address: "" }, false)}>
          No
        </Button>
        <Button
          negative
          color="red"
          onClick={() => deleteCustomer(user, fetchData, toggleModal)}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteCustomer;
