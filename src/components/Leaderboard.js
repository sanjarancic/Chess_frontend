import React from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

export default function Leaderboard(props) {
  const data = props.stats;
  const columns = React.useMemo(
    () => [
          {
            Header: "Username",
            accessor: "username",
          },
          {
            Header: "Points",
            accessor: "n_points",
          },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="leaderboard">
      <div className="form-group">
        <div className="leaderboard-title">
          
        <strong className="thead-dark">Leaderboard</strong>
        </div>
        <div className="leaderboard-table">
        <Table bordered {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const { render, getHeaderProps } = column;
                  return <th {...getHeaderProps()}>{render("Header")}</th>;
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        </div>
      </div>
      <div className="form-group">
        <button
          onClick={props.onOver}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
