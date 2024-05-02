import pool from '../../config/conexion.js';

const authByEmailPwd = async (correoUsuario, password) => {
  const [authUser] = await pool.query(`SELECT * FROM usuarios WHERE correoUsuario = '${correoUsuario}' AND password = '${password}';`);
  if (!authUser) throw new Error();

  if (authUser.password !== password) throw new Error();

  return authUser;
};

export default authByEmailPwd;