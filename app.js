const handleBlogRouter = require('./src/route/blog')
const handleUserRouter = require('./src/route/user')

const querystring = require('querystring')

// 处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })

    return promise
}

const serverHandle = (req, res) => {

    // 设置返回格式 JSON
    res.setHeader('content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]
    // 解析 query
    req.query = querystring.parse(url.split('?')[1])
    // 解析 post data
    getPostData(req).then(postData => {
        req.body = postData

        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    res.end(
                        JSON.stringify(blogData)
                    )
                    return
                }
            })
        }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
                return
            })
        }
    })



    res.writeHead(404, { 'content-type': 'text/plain' })
    res.write('404 not found')
    res.end()
}

module.exports = serverHandle
