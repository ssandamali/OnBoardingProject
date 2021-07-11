import React from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";

const deleteStore = (store, fetchDataFun, toggleModal) => {
  console.log(`call delete function`);
  axios
    .delete(`/Stores/DeleteStore/${store.id}`)
    .then(({ data }) => {
      toggleModal({ name: "", address: "" }, false);
      fetchDataFun();
    })
    .catch((err) => {
      console.log(err);
      toggleModal({ name: "", address: "" }, false);
    });
};

const DeleteStore = (props) => {
  const { toggleModal, isVisible, store, fetchData } = props;
  return (
    <Modal size="tiny" open={isVisible}>
      <Modal.Content>
        <p>Are you sure you want to delete the Store</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({ name: "", address: "" }, false)}>
          No
        </Button>
        <Button
          negative
          color="red"
          onClick={() => deleteStore(store, fetchData, toggleModal)}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteStore;
