import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./AdminForm.scss";
import Panel from "../Panel/Panel";
import Spinnerf from "../../../Components/Spinnerf";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function AdminForm() {
  const [formData, setformData] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const admin = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (admin.isAdmin) {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/admin/get-formdata`,
            {
              headers: {
                Authorization: `Bearer ${admin.token}`,
              },
            }
          );
          console.log(response.data.formData);
          setformData(response.data.formData);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoading(false);
          return navigate(`/`);
        }
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            {error.response.data.error}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setLoading(false);
      }
    };

    fetchData();
  }, [admin]);

  return (
    <div id="AdminForm" className="AdminForm flex">
      <Panel tab="Form" />
      <Stack spacing={2}>{alert}</Stack>
      {loading ? (
        <Spinnerf />
      ) : (
        <>
          {formData && formData.length > 0 && (
            <TableContainer
              className="flex flex-wrap md:flex-col justify-between gap-8 w-3/4 h-full md:items-center"
              style={{ marginLeft: "1vw", marginTop: "10vh" }}
            >
              <Table aria-label="basic table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell>companyName</TableCell>
                    <TableCell>companyGST</TableCell>
                    <TableCell>productQuantity</TableCell>
                    <TableCell>productQuantity</TableCell>
                    <TableCell>date</TableCell>
                    <TableCell>time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.map((item, index) => (
                    <TableRow>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>{" "}
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.companyName}</TableCell>
                      <TableCell>{item.companyGST}</TableCell>
                      <TableCell>{item.productQuantity}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </div>
  );
}
