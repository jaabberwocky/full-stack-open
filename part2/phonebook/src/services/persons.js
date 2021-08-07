import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const createPerson = (nameObject) => {
  const req = axios.post(BASE_URL, nameObject).then((resp) => resp.data);
  return req;
};

const getAll = () => {
  const req = axios.get(BASE_URL).then((resp) => resp.data);
  return req;
};

const exportFunctions = {
    createPerson,
    getAll,
}

export default exportFunctions;
