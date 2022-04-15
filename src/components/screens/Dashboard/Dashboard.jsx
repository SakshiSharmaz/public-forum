import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import Header from "../../helpercomponents/Header";

export default function Dashboard(props) {
    let navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("user")) {
            navigate("/");
        }
    }, [])

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
