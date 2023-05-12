import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = process.env.REACT_APP_API_KEY;

const getWeather = (city) => {
  const request = axios.get(
    `${baseUrl}?q=${city}&units=metric&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

const weatherService = { getWeather };
export default weatherService;
