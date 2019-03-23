const { exec } = require('../db/mysql')

//获取 blog 列表
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
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        console.log(rows)
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // data 是博客对象
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author) 
        values ('${title}', '${content}', '${createtime}','${author}');
    `

    return exec(sql).then(insertData => {
        console.log('insertData', insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' 
        where id = '${id}';
    `
    return exec(sql).then(updateData => {
        console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    // id 就是删除博客的id 
    const sql = `
        delete from blogs where id='${id}' and author = '${author}' ;
    `
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}