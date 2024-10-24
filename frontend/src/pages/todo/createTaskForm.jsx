import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CreateTaskForm({ onDismiss, show, handleCreateTask }) {
  return (
    <Modal show={show} onHide={onDismiss} className="task-create-modal">
      <Modal.Body className="task-create-modal-body">
        <div className="task-create-container">
          <div className="title">Create new Task</div>
          <Form onSubmit={handleCreateTask}>
            <Form.Group className="mb-3">
              <Form.Label>Enter name</Form.Label>
              <Form.Control placeholder="Enter name" name="name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                required
                name="description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Completed" name="completed" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTaskForm;
