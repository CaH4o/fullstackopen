import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((responce) => responce.data);
};

const countryService = { getAll };
export default countryService;
