import React, { useState, useEffect } from "react";
import "./todo.scss";
import { Button } from "react-bootstrap";
import CreateTaskForm from "./createTaskForm";
import axios from "axios";
import { URLS } from "../../global/urls";
import { ACCESS_TOKEN } from "../../global/key";
import TaskCard from "./TaskCard";

function Todo({ setLoggedIn }) {
  const [showTaskCreate, setShowTaskCreate] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        URLS.createTask,
        {
          name: formObj.name,
          description: formObj.description,
          completed: formObj?.completed ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("task created successfully", res);
        setShowTaskCreate(false);
        fetchTasks();
      })
      .catch((err) => {
        console.log("error in creating tasks", err);
      });
  };

  const changeStatus = (id, status) => {
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);
    axios
      .put(
        URLS.changeStatus,
        {
          taskId: id,
          taskStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("task status changed successfully", res.data);
        fetchTasks();
      })
      .catch((err) => {
        console.log("error in changing task status", err);
      });
  };

  const handleDelete = (id) => {
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);
    console.log(id, access_token);

    axios
      .delete(URLS.deleteTask, {
        data: {
          taskId: id,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("task deleted successfully", res.data);
        fetchTasks();
      })
      .catch((err) => {
        console.log("error in deleting task", err);
      });
  };

  const fetchTasks = () => {
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);
    axios
      .get(URLS.getTasks, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setCompletedTasks(res.data.data.filter((item) => item.completed));
        setPendingTasks(res.data.data.filter((item) => !item.completed));
      })
      .catch((err) => {
        console.log("error in getting tasks", err);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-container">
      <div className="navbar-container">
        <div className="heading">
          <div className="welcome">Welcome</div>
          <Button
            onClick={() => {
              setShowTaskCreate(true);
            }}
          >
            Create new Task
          </Button>
        </div>
        <Button
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            setLoggedIn(false);
          }}
        >
          Logout
        </Button>
      </div>
      <div className="task-view-container">
        <div className="section">
          <div className="title">Pending tasks</div>
          <div className="task-list">
            {pendingTasks.map((item, index) => (
              <TaskCard
                data={item}
                key={item._id}
                changeStatus={changeStatus}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <div className="section">
          <div className="title">Completed tasks</div>
          <div className="task-list">
            {completedTasks.map((item, index) => (
              <TaskCard
                data={item}
                key={item._id}
                changeStatus={changeStatus}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
      <CreateTaskForm
        show={showTaskCreate}
        onDismiss={() => setShowTaskCreate(false)}
        handleCreateTask={handleCreateTask}
      />
    </div>
  );
}

export default Todo;
