import { pool } from "../../database/conexion.js";


// Función para registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreUsuario,
      rolUsuario,
      documentoUsuario,
      correoUsuario,
      password,
      fk_empresa
    } = req.body;

    // Verificar si el usuario ya existe en la tabla de usuarios
    const [existingUser] = await pool.query(
      "SELECT idUsuario FROM usuarios WHERE correoUsuario = ?",
      [correoUsuario]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: 409,
        message: "El usuario ya existe, no se pueden registrar datos repetidos."
      });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si el usuario no existe, procedemos con la inserción
    const sql = "INSERT INTO usuarios (nombreUsuario, rolUsuario, documentoUsuario, correoUsuario, password, fk_empresa) VALUES (?, ?, ?, ?, ?, ?)";
    const [rows] = await pool.query(sql, [nombreUsuario, rolUsuario, documentoUsuario, correoUsuario, hashedPassword, fk_empresa]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el usuario." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el usuario." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en registrarUsuario: " + e });
  }
};

// Función para listar todos los usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM usuarios`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron usuarios."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar usuarios: " + e,
    });
  }
};

// Función para buscar un usuario por su ID
export const buscarUsuario = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuario = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar usuario: ' + e });
  }
};

// Función para actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { nombreUsuario, rolUsuario, documentoUsuario, correoUsuario, password, fk_empresa } = req.body;

    // Hash de la contraseña antes de actualizarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    let sql = `UPDATE usuarios SET nombreUsuario=?, rolUsuario=?, documentoUsuario=?, correoUsuario=?, password=?, fk_empresa=? WHERE idUsuario=?`;
    const [rows] = await pool.query(sql, [nombreUsuario, rolUsuario, documentoUsuario, correoUsuario, hashedPassword, fk_empresa, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el usuario" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el usuario" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar usuario: ' + e });
  }
};

// Función para deshabilitar un usuario
export const deshabilitarUsuario = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE usuarios SET estado = 0 WHERE idUsuario = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se deshabilitó con éxito el usuario" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo deshabilitar el usuario" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al deshabilitar usuario: ' + e });
  }
};

// Función para habilitar un usuario
export const habilitarUsuario = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE usuarios SET estado = 1 WHERE idUsuario = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se habilitó con éxito el usuario" });
    } else {
      res.status(404).json({ status: 404, message: "No se encontró el usuario para habilitar" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al habilitar usuario: ' + e });
  }
};