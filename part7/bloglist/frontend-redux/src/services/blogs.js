import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updateBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(
    `${baseUrl}/${updateBlog.id}`,
    updateBlog,
    config
  )
  return response.data
}

const remove = async (removeBlogId) => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${removeBlogId}`, config)
}

export default { setToken, getAll, create, update, remove }
