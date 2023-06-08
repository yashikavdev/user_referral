import React, { useEffect, useState } from 'react';
import Header from './UI/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

function Dashboard() {
  type rowType  = {
    id : number,
    email : string,
    status : string,
    created_at : string,

  }

  const token = localStorage.getItem("token");
  const [rowData, setRowData] = useState<Array<any>>([]);
  const headers: any = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  };

  useEffect(() => {
    axios.get('http://localhost:3000/invitations.json', {headers:headers}).then((response) => {
      setRowData(response.data)
    })
  }, [token]);

  return (
    <div>
      <Header />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component='th'>Invited Email</TableCell>
            <TableCell component='th'>Invitation Status</TableCell>
            <TableCell component='th'>Invitation Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData?.map((row:rowType) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.created_at}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default Dashboard;
