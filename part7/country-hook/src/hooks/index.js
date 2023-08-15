import { useState, useEffect } from 'react'

import countryService from '../services/countries'
import { formatCountry } from '../utils'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    countryService
      .getOne(name)
      .then((country) => {
        setCountry({ data: formatCountry(country), found: true })
      })
      .catch(() => setCountry({ data: null, found: false }))
  }, [name])

  return country
}
