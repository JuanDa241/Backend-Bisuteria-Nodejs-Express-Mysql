const db = require('../../../dataBase/db');

//Crear un cliente 
const createClient = (req,res) => {
  const { idCardClient, clientname, clientAddress, clientPhone } = req.body

  const client = {
    idCardClient: idCardClient,
    clientname: clientname,
    clientAddress: clientAddress,
    clientPhone: clientPhone
  };

  try {
    const sql = 'INSERT INTO client (idCardClient, clientname, clientAddress, clientPhone ) VALUES (?,?,?,?)'
    db.query(sql, [client.idCardClient,client.clientname, client.clientAddress, client.clientPhone], (err, result) =>{
      if(err){
        throw err
      } else {
        res.json({ data: result })
      }
    })
  } catch (error) {
    console.log({ data: ` Internal Server Error: ${error}`})
  };
};

module.exports = {
  createClient,
};