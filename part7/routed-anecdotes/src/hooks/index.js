import { useState } from 'react'

export const useField = ({ name, type = 'text' }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    setValue('')
  }

  return {
    name,
    type,
    value,
    onChange: handleChange,
    reset:handleReset,
  }
}
