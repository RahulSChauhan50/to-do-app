import React from "react";
import { Form, Button } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

function TaskCard({ data, changeStatus, onDelete }) {
  return (
    <div className="task-card-container">
      <div className="name-container">
        <div className="name">{data?.name}</div>
        <Button
          className="delete"
          onClick={() => {
            onDelete(data._id);
          }}
        >
          <IoCloseOutline size={20} />
        </Button>
      </div>
      <div className="description">{data?.description}</div>
      <Form.Check
        type="checkbox"
        label={data.completed ? "Completed" : "Pending"}
        defaultChecked={data.completed}
        onChange={(e) => {
          changeStatus(data._id, e.target.checked);
        }}
      />
    </div>
  );
}

export default TaskCard;
