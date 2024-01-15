const db = require('../../../dataBase/db');

const allCategory = (req,res) =>{
    try {
        let sql = 'SELECT * FROM category'
        db.query(sql,(err,rows,field) =>{
            if(!err){
                if(rows.length < 1){
                    res.json({data: `Error no found categorys`})
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
    allCategory
}