import React, { useState, useEffect } from "react";
import "../../../css/helper.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../helpercomponents/Header";
import DataGrid from "../../../helpercomponents/dataGrid";

import { useParams, useNavigate, useLocation } from "react-router-dom";
export default function Topics(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  function navigateTo() {
    navigate("../topic");
  }

  const columns = [
    { field: "id", headerName: "Id", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 500,
      editable: true,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 150,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 110,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      title: "Why Parrots can talk",
      createdBy: "Jon Snow",
      createdAt: "11:00 Am",
    },
    {
      id: 2,
      title: "Why Other birds cannot talk",
      createdBy: "Peabody",
      createdAt: "11:00 Am",
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <br />
      <div id="createTopicButton">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={navigateTo}
        >
          Create New Topic
        </Button>
      </div>
      <br />
      <hr style={{ width: "98%" }} />

      {/* <DataGrid
  columns={[{ field: 'id' },{ field: 'title', width: 150 },{field: 'author'}, {field: 'time'}]}
  rows={[
    { id: 1, title: 'Title',author : 'Sakshi Sharma' ,time: new Date()   },
    { id: 2, title: 'Title',author : 'Sakshi Sharma' ,time: new Date()   }
  ]}
/> */}
      <div className="datagrid">
        {/* <DataGrid  className="gridVal"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      /> */}
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
