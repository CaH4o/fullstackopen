import axios from 'axios'
const baseUrl = '/api/comments'

const create = async (newComment) => {
  const response = await axios.post(baseUrl, newComment)
  return response.data
}

export default { create }
