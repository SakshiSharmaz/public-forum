import React, { useState, useEffect } from "react";
import "../../../css/topic-discussion.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../helpercomponents/Header";
import DataGrid from "../../../helpercomponents/dataGrid";
import CancelIcon from "@mui/icons-material/Cancel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {db} from "../../../../database/index";
import HashLoader from "react-spinners/HashLoader";
import CircleIcon from '@mui/icons-material/Circle';

import { useParams, useNavigate, useLocation } from "react-router-dom";

const customStyle = {
  borderRadius: "6px",
  padding: "6px",
  fontSize: "large",
  borderColor: "#051367",
  resize: "none"
};

export default function TopicDiscussion(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const topicId = parseInt(params.id);
  const username = localStorage.getItem('user');

  // STATES
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState(null);
  const [posts, updatePosts] = useState([]);
  const [post, setPost] = useState(null);

  // EFFECTS
  useEffect(() => {
    handleFetchTopic();
    handleFetchPosts(0);
  }, []);

  // METHODS
  const handleFetchTopic = () => {
    setLoading(true);
    db.topics.get(topicId).then(response => {
      setTopic(response);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    })
  };

  const handleFetchPosts = (type) => {
    db.posts.where("topicId").equals(topicId).toArray().then(response => {
      updatePosts(response);
    });
  }

  const handleCreatePost = () => {
    if(post) {
      console.log("here");
      let newPost = {
        topicId,
        postBy: username,
        postedOn: new Date().getTime(),
        body: post
      };

      db.posts.add(newPost).then(response => {
        setPost("")
        handleFetchPosts(1);
      }).catch(error => {

      })
    }
  }

  return (
    <div className="topic-root">
      <div className="topic-container">
        <div className="topic-content">
          <div className="title-header">
            <p className="heading-1">{topic?.title}</p>
            <p className="subheading-2">{topic?.author} <CircleIcon sx={{fontSize: "10px"}} />  {new Date(topic?.createdOn).toLocaleString()}</p>
          </div>
          
          <div className="topic-description">
            <p className="body-1">{topic?.description}</p>
          </div>
        </div>

        <div className="topic-posts-content">
          {
            posts && posts?.length ?
              posts.map((pst, index) => (
                <div key={index} className="post-content">
                  <p className="subheading-2">{pst?.postBy} <CircleIcon sx={{fontSize: "10px"}}/>  {new Date(pst?.postedOn).toLocaleString()}</p>
                  <p className="heading-3">{pst?.body}</p>
                </div>
              ))
              :
              <div className="topic-posts-empty">
                <p className="heading-4">No has posted yet on this topic</p>
              </div>
          }
        </div>

        <div className="post-input-content">
          <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Your post"
              style={customStyle}
              onChange={(event) => setPost(event.target.value)}
              value={post}
              minRows={6}
          />

        <div className="post-action">
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreatePost}
            >
                Post
            </Button>

            <Button variant="outlined" startIcon={<CancelIcon />}>
                Cancel
            </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
