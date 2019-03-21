const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // where 1=1 占位符 防止author 和 keyword 为空, sql报错
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    // 返回的 promise
    return exec(sql)
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题1',
        content: 'content 1',
        createTime: 1552896727427,
        author: 'zhangsan'
    }
}

const newBlog = (data = {}) => {
    // data 是博客对象
    return {
        id: 3 // 插入到表里的id
    }
}

const updateBlog = (id, data = {}) => {
    return true
}

const deleteBlog = (id) => {
    // id 就是删除博客的id 
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}