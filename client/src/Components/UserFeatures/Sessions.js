import * as React from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store/User";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const delayFetch = setTimeout(async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/sessions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            sessionToken: token,
          },
        }
      );

      if (response.ok) {
        const sessions = await response.json();
        setSessions(sessions.data);
      }
    });
  }, []);

  return (
    <>
      <Typography sx={{ mt: 10 }} align="center" variant="h5" component="h1">
        Sessions
      </Typography>
      <Container component={Paper}>
        <Table
          sx={{
            minWidth: 300,
            mt: "20px",
          }}
          aria-label="customized table"
        >
          <TableHead sx={{ backgroundColor: "#2196F3" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S.No</TableCell>
              <TableCell sx={{ color: "white" }}>IP Address</TableCell>
              <TableCell sx={{ color: "white" }} align="left">
                Login Time
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Logout Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions &&
              sessions.map((session, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {session.ipAddress}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {new Date(session.loginTime).toLocaleTimeString()}
                  </StyledTableCell>
                  {session.logoutTime ? (
                    <StyledTableCell align="right">
                      {new Date(session.logoutTime).toLocaleTimeString()}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell  sx={{color:'green',fontWeight:'bold'}} align="right">online</StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default Sessions;
