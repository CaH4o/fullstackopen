import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('<BlogForm /> fill textboxs and calls onSubmit (create)', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'Title...')
  await user.type(inputs[1], 'Author...')
  await user.type(inputs[2], 'url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title...')
  expect(createBlog.mock.calls[0][0].author).toBe('Author...')
  expect(createBlog.mock.calls[0][0].url).toBe('url...')
})
