import React from "react";
import "../css/helper.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Header(props) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  };

  return (
    <div className="headerType">
      <span>Public Forum</span>
      <button onClick={handleLogout}>Logout</button> 
    </div>
  ) 
  
}
