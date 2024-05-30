import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function User(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="user">
      <h1>{props.firstName} {props.lastName}</h1>
      <p>CIN: {props.cin}</p>
      <p>Email: {props.email}</p>
      <p>Role: {props.role}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default User;
