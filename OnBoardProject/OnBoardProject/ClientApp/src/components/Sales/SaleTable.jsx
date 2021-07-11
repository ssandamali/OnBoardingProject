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

const formatDate = (dateStr) => {
  let date = new Date(dateStr);
  let fmt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return fmt.format(date);
};

const SaleTable = (props) => {
  const { sales, toggleModalDelete, toggleModalEdit } = props;
  const [state, dispatch] = useReducer(sortByColumn, {
    column: null,
    data: sales,
    direction: null,
  });

  useEffect(() => {
    if (sales.length !== 0) {
      dispatch({ type: "IGNORE_SORT", column: null, initData: sales });
    }
  }, [sales]);

  const { column, data, direction } = state;

  return (
    <Table striped sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "customer" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "customer",
                initData: data,
              })
            }
          >
            Customer
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "product" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "product",
                initData: data,
              })
            }
          >
            Product
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "store" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "store",
                initData: data,
              })
            }
          >
            Store
          </Table.HeaderCell>
          <Table.HeaderCell>Date Sold</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((sale) => (
          <Table.Row key={sale.id}>
            <Table.Cell>{sale.customer.name}</Table.Cell>
            <Table.Cell>{sale.product.name}</Table.Cell>
            <Table.Cell>{sale.store.name}</Table.Cell>
            <Table.Cell>{formatDate(sale.dateSold)}</Table.Cell>
            <Table.Cell>
              <Button
                color="yellow"
                icon
                onClick={() => toggleModalEdit(sale, true)}
              >
                <Icon name="edit" />
                Edit
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                color="red"
                icon
                onClick={() => toggleModalDelete(sale, true)}
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

export default SaleTable;
