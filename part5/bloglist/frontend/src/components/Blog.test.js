import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let updateBlog
  let removeBlog

  beforeEach(() => {
    const blog = {
      title: 'Blog One',
      author: 'Unknown',
      url: 'http://myblog.com/blogOne',
      likes: 0,
      user: {
        name: 'OTI',
      },
    }

    updateBlog = jest.fn()
    removeBlog = jest.fn()

    container = render(
      <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
    ).container
  })

  test('renders content by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Blog One')
    expect(div).toHaveTextContent('Unknown')
    expect(div).toHaveTextContent('Likes: 0')
    expect(div).toHaveTextContent('http://myblog.com/blogOne')
    expect(div).toHaveTextContent('OTI')

    const url = container.querySelector('.blog_url')
    expect(url).toHaveStyle('display: none')

    const likes = container.querySelector('.blog_likes')
    expect(likes).toHaveStyle('display: none')

    const userName = container.querySelector('.blog_user')
    expect(userName).toHaveStyle('display: none')

    const btnCollapsed = container.querySelector('.blog_btn_remove')
    expect(btnCollapsed).toHaveStyle('display: none')
  })

  test('clicking the button to view all content', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const url = container.querySelector('.blog_url')
    expect(url).not.toHaveStyle('display: none')

    const likes = container.querySelector('.blog_likes')
    expect(likes).not.toHaveStyle('display: none')

    const userName = container.querySelector('.blog_user')
    expect(userName).not.toHaveStyle('display: none')

    const btnCollapsed = container.querySelector('.blog_btn_remove')
    expect(btnCollapsed).not.toHaveStyle('display: none')
  })

  test('clicking the button two times to view and to hide content', async () => {
    const user = userEvent.setup()
    const buttonView = screen.getByText('view')

    await user.click(buttonView)

    const buttonHide = screen.getByText('hide')
    await user.click(buttonHide)

    const url = container.querySelector('.blog_url')
    expect(url).toHaveStyle('display: none')

    const likes = container.querySelector('.blog_likes')
    expect(likes).toHaveStyle('display: none')

    const userName = container.querySelector('.blog_user')
    expect(userName).toHaveStyle('display: none')

    const btnCollapsed = container.querySelector('.blog_btn_remove')
    expect(btnCollapsed).toHaveStyle('display: none')
  })
})
