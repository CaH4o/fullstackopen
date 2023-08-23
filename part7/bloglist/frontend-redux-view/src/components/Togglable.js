import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <Button
          onClick={toggleVisibility}
          variant='outlined'
          size='small'
          color='primary'
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }}>
        <Button
          onClick={toggleVisibility}
          variant='outlined'
          size='small'
          color='primary'
          sx={{ marginBottom: '0.5rem' }}
        >
          cancel
        </Button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
