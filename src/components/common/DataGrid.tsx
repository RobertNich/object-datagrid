import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { DataItem } from "../../types/DataItem";
import { getColumnTitle } from "../../utils/DataGridUtil";
import { DataItemValue } from "./DataItemValue";

interface IProps {
  data: any;
  cellProperties: DataItem[];
}

export const DataGrid = ({ data, cellProperties }: IProps) => {
  const [orderDirection, setOrderDirectiony] = useState<any>("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  function descendingComparator(a: any, b: any, orderBy: any) {
    const aa = _.get(a, orderBy, "");
    const bb = _.get(b, orderBy, "");
    if (bb < aa) return -1;
    if (bb > aa) return 1;
    return 0;
  }

  function getComparator(order: any, orderBy: any) {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray: any, comparator: any) => {
    const stabilizedRowArray = rowArray.map((el: any, index: number) => [
      el,
      index,
    ]);
    stabilizedRowArray.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el: any) => el[0]);
  };

  const handleRequestSort = (_event: any, property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirectiony(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property: string) => (event: any) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {cellProperties.map((column) => {
              const columnHeading = getColumnTitle(column);
              return (
                <TableCell key={column.value}>
                  <TableSortLabel
                    active={valueToOrderBy === column.value}
                    direction={orderDirection}
                    onClick={createSortHandler(column.value)}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {columnHeading}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRowInformation(
            data,
            getComparator(orderDirection, valueToOrderBy)
          )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: DataItem, index: number) => {
              return (
                <TableRow key={index}>
                  {cellProperties.map((cell: DataItem, index: number) => {
                    return (
                      <TableCell key={index}>
                        <DataItemValue itemData={row} itemProperties={cell} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[
              1,
              25,
              50,
              100,
              250,
              { label: "All", value: -1 },
            ]}
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
