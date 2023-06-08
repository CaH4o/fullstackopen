const listHelper = require('../utils/list_helper')
const dummy_blogs = require('../utils/dummy_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes:', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  const listWithOneBlog = dummy_blogs.listWithOneBlog

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithManyBlog = dummy_blogs.listWithManyBlog

  test('of a bigger list is calculate right', () => {
    const result = listHelper.totalLikes(listWithManyBlog)
    expect(result).toBe(36)
  })
})

describe('favorite blog:', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  const listWithOneBlog = dummy_blogs.listWithOneBlog
  const favoriteBlogWithSingleBlog = dummy_blogs.favoriteBlogWithSingleBlog

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(favoriteBlogWithSingleBlog)
  })

  const listWithManyBlog = dummy_blogs.listWithManyBlog
  const favoriteBlog = dummy_blogs.favoriteBlog

  test('of a bigger list blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlog)
    expect(result).toEqual(favoriteBlog)
  })
})

describe('most blogs by author:', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  const listWithOneBlog = dummy_blogs.listWithOneBlog
  const mostBlogWithSingleBlog = dummy_blogs.mostBlogWithSingleBlog

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(mostBlogWithSingleBlog)
  })

  const listWithManyBlog = dummy_blogs.listWithManyBlog
  const mostBlog = dummy_blogs.mostBlog

  test('of a bigger list blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlog)
    expect(result).toEqual(mostBlog)
  })
})

describe('most likes author:', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  const listWithOneBlog = dummy_blogs.listWithOneBlog
  const mostLikesWithSingleBlog = dummy_blogs.mostLikesWithSingleBlog

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(mostLikesWithSingleBlog)
  })

  const listWithManyBlog = dummy_blogs.listWithManyBlog
  const mostLikes = dummy_blogs.mostLikes

  test('of a bigger list blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlog)
    expect(result).toEqual(mostLikes)
  })
})
