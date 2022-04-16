import React, {useState, useEffect} from "react";
import "../css/helper.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Snackbar from '@mui/material/Snackbar';
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from "@mui/icons-material/Cancel";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {db} from "../../database/index";
import HashLoader from "react-spinners/HashLoader";

const customStyle = {
    width: "95%",
    borderRadius: "6px",
    padding: "6px",
    fontSize: "large",
    borderColor: "#051367",
};



export default function TopicDetails(props) {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();

    // STATES
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [author, setAuthor] = useState(null);
    const [snackbar, toggleSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null)

    //EFFECTS
    useEffect(() => {
        if(localStorage.getItem('user')) {
            setAuthor(localStorage.getItem('user'));
        }
    }, [])

    // METHODS
    function handleCreateTopic() {
        if(title && description) {
            let newTopic = {
                author,
                title,
                description,
                createdOn: new Date().getTime()
            }

            db.topics.add(newTopic).then(response => {
                navigateTo();
            }).catch(error => {
                console.log(error);
                setSnackbarMessage("Something went wrong");
                toggleSnackbar(true);
            })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        toggleSnackbar(false);
      };

    function navigateTo() {
        navigate("/dashboard");
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    return (
        <div className="topic_details">
            <h2>Title</h2>
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Enter title"
                onChange={(event) => setTitle(event.target.value)}
                minRows={3}
                maxRows={6}
                style={customStyle}
            />
            <h2>Description</h2>
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Enter description"
                onChange={(event) => setDescription(event.target.value)}
                minRows={6}
                maxRows={12}
                style={customStyle}
            />

            <br />
            <br />

            <div className="topicButtons">
                <Button variant="contained" startIcon={<CancelIcon />}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateTopic}
                >
                    Create
                </Button>
            </div>

            <br />

            <Snackbar
                open={snackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={action}
            />
        </div>
    );
}
