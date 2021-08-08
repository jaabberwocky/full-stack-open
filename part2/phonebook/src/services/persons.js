import axios from "axios";

const BASE_URL = "http://localhost:3001/api/persons";

const createPerson = (nameObject) => {
  const req = axios.post(BASE_URL, nameObject).then((resp) => resp.data);
  return req;
};

const getAll = () => {
  const req = axios.get(BASE_URL).then((resp) => resp.data);
  return req;
};

const deletePerson = (id) => {
  const req = axios.delete(BASE_URL + `/${id}`).then((resp) => resp.data);
  return req;
};

const updatePerson = (id, obj) => {
  const req = axios.put(BASE_URL + `/${id}`, obj).then((resp) => resp.data);
  return req;
};

const exportFunctions = {
  createPerson,
  getAll,
  deletePerson,
  updatePerson,
};

export default exportFunctions;
