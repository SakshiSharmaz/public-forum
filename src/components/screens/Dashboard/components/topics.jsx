import React, { useState, useEffect } from "react";
import "../../../css/helper.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../helpercomponents/Header";
import DataGrid from "../../../helpercomponents/dataGrid";
import {db} from "../../../../database/index";
import HashLoader from "react-spinners/HashLoader";

import { useParams, useNavigate, useLocation } from "react-router-dom";
export default function Topics(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  // STATES
  const [loading, setLoading] = useState(false);
  const [topics, updateTopics] = useState([]);

  // EFFECTS
  useEffect(() => {
    setLoading(true);

    db.topics.toArray().then(response => {
      let topicsMap = response.map(topic => ({
        id: topic.id,
        createdBy: topic.author,
        title: topic.title,
        createdAt: topic?.createdOn ? new Date(topic.createdOn).toLocaleDateString() : new Date().toLocaleDateString(),
      }));

      updateTopics(topicsMap);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    })
  }, [])

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

      <div className="datagrid">
        {
          loading ?
            <div className="topics-loader">
              <HashLoader color="#243836" loading={loading} size={50} />
            </div>
            :
            topics && topics?.length ?
              <DataGrid columns={columns} rows={topics} />
              :
              <div>
                <h3>No Topics found</h3>
              </div>
        }
        
      </div>
    </div>
  );
}
