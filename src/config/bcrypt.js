const bcrypt = require('bcrypt');


const saltRounds = 10;
contraseña = '1a1'
encriptada ='$2b$10$dosYnYZhXoOZ7.L06.14tOjiJCRVzwzSXbAsewxzHEzmxJkc/w7VS'


const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword)
  return hashedPassword;
};

hashPassword(contraseña)

const comparePassword = async (password, hashedPassword) => {
  console.log('Comparando contraseñas...');
  console.log('Contraseña proporcionada:', password);
  console.log('Contraseña cifrada almacenada:', hashedPassword);

 const isMatch = await bcrypt.compare(password, hashedPassword);
 console.log('Coincidencia de contraseña:', isMatch);
 return isMatch;
};

comparePassword(contraseña, encriptada)

// Función para autenticar un usuario
const authenticateUser = async (enteredPassword, storedPasswordHash) => {
  try {
    const isPasswordMatch = await comparePassword(enteredPassword, storedPasswordHash);
    return isPasswordMatch;
  } catch (error) {
    console.error('Error de autenticación:', error);
    throw error;
  }
};

module.exports = {
 hashPassword,
 comparePassword,
 authenticateUser,
};
