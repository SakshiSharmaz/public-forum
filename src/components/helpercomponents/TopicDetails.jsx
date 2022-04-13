import React from "react";
import "../css/helper.css"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import {
    useParams,
    useNavigate,
    useLocation,
  } from "react-router-dom";

export default function TopicDetails(props) {


    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    function navigateTo(){

        navigate("/dashboard");

    }

    const customStyle = {
        width: "95%",
        borderRadius: "6px",
        padding: "6px",
        fontSize: "large",
        borderColor: "#051367"
    }
    return <div className="topic_details" >

        <h2>Title</h2>
        <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter title"
            minRows={3}
            maxRows={6}
            style={customStyle}
        />
        <h2>Description</h2>
        <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter description"
            minRows={6}
            maxRows={12}
            style={customStyle}
        />

    
<br />
<br />

    <div className="topicButtons" >
    <Button variant="contained" startIcon={<CancelIcon />}>
  Cancel
</Button>
    <Button variant="contained" startIcon={<AddIcon />} onClick={navigateTo} >
  Create
</Button>

</div>

<br />

    </div>


};