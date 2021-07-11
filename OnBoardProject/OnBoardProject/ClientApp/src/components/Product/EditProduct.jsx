import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const EditProduct = (props) => {
  const { toggleModal, isVisible, product, fetchData } = props;
  const [item, setProduct] = useState(product);
  useEffect(() => {
    setProduct(product);
  }, [product]);

  const handleProductChange = (field, value) => {
    setProduct({
      ...item,
      [field]: value,
    });
  };

  const saveProduct = () => {
    axios
      .put(`/Products/PutProduct/${item.id}`, item)
      .then((res) => {
        console.log(res.data);
        toggleModal({ name: "", price: "" }, false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        toggleModal({ name: "", price: "" }, false);
      });
  };

  return (
    <Modal open={isVisible}>
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder={item.name}
              onChange={(e) => handleProductChange("name", e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder={item.price}
              onChange={(e) => handleProductChange("price", e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => toggleModal({ name: "", price: "" }, false)}>
          Cancel
        </Button>
        <Button color="blue" onClick={() => saveProduct()}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditProduct;
