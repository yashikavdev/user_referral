import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./UI/Header";


type HeadersInit = Headers | string[][] | { [key: string]: string };

type rowType = {
  id: number;
  email: string;
  status: string;
  created_at: string;
};

function Dashboard() {
  const token = localStorage.getItem("token");
  const [rowData, setRowData] = useState<Array<any>>([]);
  const [open, setOpen] = useState<boolean>(false);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,

      "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
      },
    },
  });

  useEffect(() => {
    axios.get("/user_invitations", { headers: headers }).then((response) => {
      setRowData(response.data);
    });
  }, [token, open]);

  const classes = useStyles();

  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <div className="dashboard-table">
        <TableContainer
          component={Paper}
          sx={{ margin: "30px auto 0", maxWidth: 1200 }}
        >
          <Table
            className={classes.table}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead sx={{ backgroundColor: "#7cb342" }}>
              <TableRow>
                <TableCell component="th">Email</TableCell>
                <TableCell component="th">Status</TableCell>
                <TableCell component="th">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.map((row: rowType) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Dashboard;
