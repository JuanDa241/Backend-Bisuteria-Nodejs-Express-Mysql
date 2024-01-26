const db = require('../../dataBase/db')
const { comparePassword  } = require('../../config/bcrypt');
const jwt = require('../../config/jwt');

//Iniciar sesión
const inicioSesion = async (req, res) => {
    const { userName, password } = req.body;
    console.log(userName)
    console.log(password)
    console.log(req.body)

    try {
      let sql = 'SELECT * FROM worker WHERE userName = ?';
      db.query(sql, userName, async (err, rows) => {
        if (!err) {
          if (rows.length < 1) {
            res.json({ data: 'Usuario no encontrado' });
          } else {
            const storedHashedPassword = rows[0].password;
            const isPasswordMatch = await comparePassword(password, storedHashedPassword);
  
            if (isPasswordMatch) {
              // Contraseña válida, genera un token JWT
              const idCardWorker = rows[0].idCardWorker; 
              const idRole = rows[0].idRole;
              const token = jwt.generateJwtToken(idCardWorker, idRole);
  
              // Devuelve el token en la respuesta
              res.json({ data: 'Inicio de sesión exitoso', token });
            } else {
              // Contraseña inválida
              res.status(401).json({ error: 'Credenciales incorrectas' });
            }
          }
        } else {
          throw err;
        }
      });
    } catch (err) {
      console.log({ data: `Internal Server Error: ${err}` });
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  inicioSesion
}