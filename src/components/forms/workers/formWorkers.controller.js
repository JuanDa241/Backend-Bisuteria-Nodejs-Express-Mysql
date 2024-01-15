const db = require('../../../dataBase/db');

const allBanks = (req,res) =>{
    try {
        let sql = 'SELECT * FROM bank'
        db.query(sql,(err,rows,field) =>{
            if(!err){
                if(rows.length < 1){
                    res.json({data: `Error no found products`})
                } else {
                    res.json({data: rows})
                }
            } else {
                throw err
            }
        })
    } catch (err) {
        console.log({data: `Internal Server Error: ${err}`})
    }
};

const allRoles = (req,res) =>{
    try {
        let sql = 'SELECT * FROM role WHERE roles IN ("Artesano","Vendedor")'
        db.query(sql,(err,rows,field) =>{
            if(!err){
                if(rows.length < 1){
                    res.json({data: `Error no found products`})
                } else {
                    res.json({data: rows})
                }
            } else {
                throw err
            }
        })
    } catch (err) {
        console.log({data: `Internal Server Error: ${err}`})
    }
};

module.exports = {
    allBanks,
    allRoles
}