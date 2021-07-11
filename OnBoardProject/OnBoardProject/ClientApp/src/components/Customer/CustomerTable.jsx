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

const CustomerTable = (props) => {
  const { customers, toggleModalDelete, toggleModalEdit } = props;
  const [state, dispatch] = useReducer(sortByColumn, {
    column: null,
    data: customers,
    direction: null,
  });

  useEffect(() => {
    if (customers.length !== 0) {
      dispatch({ type: "IGNORE_SORT", column: null, initData: customers });
    }
  }, [customers]);

  const { column, data, direction } = state;

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
                initData: customers,
              })
            }
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "address" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "address",
                initData: customers,
              })
            }
          >
            Address
          </Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((customer) => (
          <Table.Row key={customer.id}>
            <Table.Cell>{customer.name}</Table.Cell>
            <Table.Cell>{customer.address}</Table.Cell>
            <Table.Cell>
              <Button
                color="yellow"
                icon
                onClick={() => toggleModalEdit(customer, true)}
              >
                <Icon name="edit" />
                Edit
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                color="red"
                icon
                onClick={() => toggleModalDelete(customer, true)}
              >
                <Icon name="trash" />
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      {/* <Table.Footer>
        <Table.Row>
          <Table.HeaderCell>
            <Dropdown
              inline
              options={[{ key: "10", text: "10", value: "10" }]}
              defaultValue={"10"}
            />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="4">
            <Pagination
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={3}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer> */}
    </Table>
  );
};

export default CustomerTable;
