import React, {useEffect, useState} from "react";
import "../css/helper.css";
export default function TextInput(props) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if(!props.value) {
      setValue("");
    } else {
      setValue(props.value);
    }
  }, [props.value])

  return (
    <div className="textInputParent">
      <label className="textInputChild1" htmlFor={props.name}>
        {props.title}
      </label>
      <input
        className="textInputChild2"
        name={props.name}
        title={props.name}
        type={props.type}
        value={value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
}
