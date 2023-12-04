const uuid = require('uuid')
const db = require('../dataBase/db')

//Generate a new Id
const generateId = (table, callback) =>{
    let newId = uuid.v4()
    checkId(table, newId,(exists) =>{
        if(exists){
            return generateId(table, callback)
        }
        callback(newId)
    })
}

const checkId = (table, id, callback) =>{
    const sql = `SELECT COUNT(*) AS count FROM ${table} WHERE idProduct = ?`
    db.query(sql,id,(err, results) =>{
        if(err) throw err
        const count = results[0].count
        callback(count != 0)
    })
}

module.exports = generateId