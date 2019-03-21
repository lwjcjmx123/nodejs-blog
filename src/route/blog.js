const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id
    const blogData = req.body
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    }

    if (method === 'GET' && path == '/api/blog/detail') {
        const id = req.query.id || ''
        const data = getDetail(id)

        return new SuccessModel(data)
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    if (method === 'POST' && path === '/api/blog/update') {

        const result = updateBlog(id, blogData)
        if (result) {
            return new SuccessModel()
        } else
            return new ErrorModel('更新博客失败')

    }

    if (method === 'POST' && path === '/api/blog/delete') {
        const result = deleteBlog(id)
        if (result) {
            return new SuccessModel()
        } else
            return new ErrorModel('更新博客失败')
    }

}

module.exports = handleBlogRouter