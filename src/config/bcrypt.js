const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Contraseña cifrada:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Coincidencia de contraseña:', isMatch);
  return isMatch;
};

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
