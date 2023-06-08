const dummy_blogs = require('../utils/dummy_blogs')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, blog) => prev + blog.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const initBlog = {
    title: '',
    author: '',
    likes: -1,
  }
  const reducer = (resultBlog, blog) => {
    return resultBlog.likes > blog.likes
      ? resultBlog
      : { 'title': blog.title, 'author': blog.author, 'likes': blog.likes }
  }
  return blogs.length === 0 ? {} : blogs.reduce(reducer, initBlog)
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : _.chain(blogs)
        .groupBy('author')
        .mapValues((blogs) => blogs.length)
        .transform((result, value, key) => {
          return result.push({ 'author': key, 'blogs': value })
        }, [])
        .maxBy('blogs')
        .value()
}

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : _.chain(blogs)
        .groupBy('author')
        .mapValues((blogs) => _.sumBy(blogs, (blog) => blog.likes))
        .transform((result, value, key) => {
          return result.push({ 'author': key, 'likes': value })
        }, [])
        .maxBy('likes')
        .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
