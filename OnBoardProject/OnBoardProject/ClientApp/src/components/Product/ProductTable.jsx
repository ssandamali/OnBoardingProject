import _ from "lodash";
import React, { useReducer, useEffect } from "react";
import { Icon, Table, Button } from "semantic-ui-react";

const sortByColumn = (state, action) => {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    case "IGNORE_SORT":
      console.log("IGNORE_SORT");
      return {
        ...state,
        data: action.initData,
      };
    default:
      throw new Error();
  }
};

const ProductTable = (props) => {
  const { products, toggleModalDelete, toggleModalEdit } = props;
  console.log("data in table", products);
  const [state, dispatch] = useReducer(sortByColumn, {
    column: null,
    data: products,
    direction: null,
  });

  useEffect(() => {
    if (products.length !== 0) {
      dispatch({ type: "IGNORE_SORT", column: null, initData: products });
    }
  }, [products]);

  const { column, data, direction } = state;
  console.log("data in table state", data);

  return (
    <Table striped sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "name" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "name",
                initData: products,
              })
            }
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "price" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "price",
                initData: products,
              })
            }
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>${product.price}</Table.Cell>
            <Table.Cell>
              <Button
                color="yellow"
                icon
                onClick={() => toggleModalEdit(product, true)}
              >
                <Icon name="edit" />
                Edit
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                color="red"
                icon
                onClick={() => toggleModalDelete(product, true)}
              >
                <Icon name="trash" />
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProductTable;
