import axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../Models/user";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - Please comeback later.");
  }

  const { status, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }

  if (status == 400 && config.method === "get") {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Internal server error...");
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/Activities"),
  details: (id: string) => requests.get(`/Activities/${id}`),
  create: (activity: IActivity) =>
    requests.post("/Activities/create", activity),
  update: (activity: IActivity) =>
    requests.put(`/Activities/update/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/Activities/delete/${id}`),
  attend: (id: string) => requests.post(`/Activities/${id}/attend`, {}),
  unattend: (id: string) => requests.delete(`Activities/${id}/attend`)
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

export default {
  Activities,
  User,
};
