import React from "react";
import { Form } from "react-bootstrap";

function TaskCard({ data, changeStatus }) {
  return (
    <div className="task-card-container">
      <div className="name">{data?.name}</div>
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
