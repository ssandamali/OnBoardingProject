import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const EditSale = (props) => {
  const {
    toggleModal,
    isVisible,
    sale,
    fetchData,
    customers,
    products,
    stores,
  } = props;
  const [item, setSale] = useState(sale);

  useEffect(() => {
    setSale(sale);
  }, [sale]);

  console.log("item", item);

  const handleSaleChange = (field, value) => {
    setSale({
      ...item,
      [field]: value,
    });
  };

  const handleCustomerChange = (e, { value }) =>
    handleSaleChange("customerId", value);

  const handleProductChange = (e, { value }) =>
    handleSaleChange("productId", value);

  const handleStoreChange = (e, { value }) =>
    handleSaleChange("storeId", value);

  const saveSale = () => {
    axios
      .put(`/Sales/PutSales/${item.id}`, item)
      .then((res) => {
        toggleModal({}, false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        toggleModal({}, false);
      });
  };

  const customerDropdown = customers.map((x) => ({
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

  return (
    <Modal open={isVisible}>
      <Modal.Header>Edit Sale</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Date Sold</label>
            <input
              type="Date"
              value={
                Object.keys(item).length !== 0
                  ? item.dateSold.split("T")[0]
                  : ""
              }
              onChange={(e) => handleSaleChange("dateSold", e.target.value)}
            />
            <Form.Select
              label="Customer"
              options={customerDropdown}
              defaultValue={sale.customerId}
              onChange={handleCustomerChange}
            />

            <Form.Select
              fluid
              label="Product"
              options={productDropdown}
              defaultValue={sale.productId}
              onChange={handleProductChange}
            />
            <Form.Select
              fluid
              label="Store"
              options={storesDropdown}
              defaultValue={sale.storeId}
              onChange={handleStoreChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({}, false)}>Cancel</Button>
        <Button color="blue" onClick={() => saveSale()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditSale;
