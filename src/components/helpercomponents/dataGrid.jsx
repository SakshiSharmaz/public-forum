import React from "react";
import "../css/helper.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function DataGrid(props) {
  let navigate = useNavigate();

  const gotoTopic = (id) => {
    navigate(`./forum/${id}`)
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {props.columns.map(function (object, i) {
              return <th> {object.headerName} </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function (object, i) {
            return (
              <tr key={object.id}>
                <td style={{ width: "40px", color: "blue", textDecoration: "underline", cursor: "pointer"}} onClick={() => gotoTopic(object.id)}>{object.id}</td>
                <td style={{ width: "500px", color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => gotoTopic(object.id)}>{object.title}</td>
                <td style={{ width: "200px" }}>{object.createdBy}</td>
                <td style={{ width: "100px" }}>{object.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
