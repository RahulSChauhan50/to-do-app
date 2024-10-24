const BASE_URL = "http://localhost:8000";

export const URLS = {
  login: BASE_URL + "/api/v1/user/login",
  refresh: BASE_URL + "/api/v1/user/refresh",
  createTask: BASE_URL + "/api/v1/task/tasks",
  getTasks: BASE_URL + "/api/v1/task/tasks",
  changeStatus: BASE_URL + "/api/v1/task/tasks",
};
