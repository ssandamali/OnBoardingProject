import React from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";

const deleteProduct = (product, fetchDataFun, toggleModal) => {
  console.log(`call delete function`);
  axios
    .delete(`/Products/deleteProduct/${product.id}`)
    .then(({ data }) => {
      toggleModal({ name: "", price: "" }, false);
      fetchDataFun();
    })
    .catch((err) => {
      console.log(err);
      toggleModal({ name: "", price: "" }, false);
    });
};

const DeleteProduct = (props) => {
  const { toggleModal, isVisible, product, fetchData } = props;
  return (
    <Modal size="tiny" open={isVisible}>
      <Modal.Content>
        <p>Are you sure you want to delete the Product</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({ name: "", price: "" }, false)}>
          No
        </Button>
        <Button
          negative
          color="red"
          onClick={() => deleteProduct(product, fetchData, toggleModal)}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteProduct;
