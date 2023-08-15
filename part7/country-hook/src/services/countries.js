import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getOne = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getOne }
