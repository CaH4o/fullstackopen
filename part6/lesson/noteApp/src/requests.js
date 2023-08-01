// ======================================================== //
// ========================= 7 ============================ //
// ======================================================== //
/*
import axios from 'axios'

export const getNotes = () =>
  axios.get('http://localhost:3001/notes').then((res) => res.data) */

// ======================================================== //
// ========================= 8 ============================ //
// ======================================================== //

import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => axios.get(baseUrl).then((res) => res.data)

export const createNote = (newNote) =>
  axios.post(baseUrl, newNote).then((res) => res.data)

export const updateNote = (updatedNote) =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then((res) => res.data)
