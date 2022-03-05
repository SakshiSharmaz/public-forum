import React from "react";
import "../css/helper.css"
export default function TextInput(props){


return <div className="textInputParent" >
        <label  className="textInputChild1" for={props.name} >{props.title}</label>
        <input  className="textInputChild2" name={props.name}  title={props.name} type={props.type} ></input>
</div>


};