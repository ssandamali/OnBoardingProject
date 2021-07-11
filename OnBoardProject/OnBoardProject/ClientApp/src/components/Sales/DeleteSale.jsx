import React from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";

const deleteSale = (sale, fetchDataFun, toggleModal) => {
  axios
    .delete(`/Sales/DeleteSales/${sale.id}`)
    .then(({ data }) => {
      toggleModal({}, false);
      fetchDataFun();
    })
    .catch((err) => {
      console.log(err);
      toggleModal({}, false);
    });
};

const DeleteSale = (props) => {
  const { toggleModal, isVisible, sale, fetchData } = props;
  return (
    <Modal size="tiny" open={isVisible}>
      <Modal.Content>
        <p>Are you sure you want to delete the sales info</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({}, false)}>No</Button>
        <Button
          negative
          color="red"
          onClick={() => deleteSale(sale, fetchData, toggleModal)}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteSale;
