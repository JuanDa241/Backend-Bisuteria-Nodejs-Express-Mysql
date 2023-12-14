const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
 const hashedPassword = await bcrypt.hash(password, saltRounds);
 return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
 const isMatch = await bcrypt.compare(password, hashedPassword);
 return isMatch;
};

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
