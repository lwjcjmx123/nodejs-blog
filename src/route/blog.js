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

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })

    }

    if (method === 'GET' && path == '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const author = 'zhangsan'
        req.body.author = author // 假数据
        const result = newBlog(req.body)

        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    if (method === 'POST' && path === '/api/blog/update') {

        const result = updateBlog(id, blogData)
        return result.then(val => {
            console.log(val)
            if (val) {
                return new SuccessModel()
            }
            else {
                return new ErrorModel('更新博客失败')
            }
        })

    }

    if (method === 'POST' && path === '/api/blog/delete') {
        const author = 'hailong'
        const result = deleteBlog(id, author)
        return result.then(result => {
            if (result) {
                return new SuccessModel()
            } else
                return new ErrorModel('删除博客失败')
        })

    }

}

module.exports = handleBlogRouter