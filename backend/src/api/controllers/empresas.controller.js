import { validationResult } from 'express-validator';

export const guardarEmpresa = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreEmpresa,
      telefonoEmpresa,
      tipoEmpresa,
      direccionEmpresa,
      departamentoEmpresa,
      municipioEmpresa,
      nitEmpresa,
      logoEmpresa,
      correoEmpresa,
      estado,
      fk_contrato
    } = req.body;

    const result = await empresaModel.guardarEmpresa(nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la empresa." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la empresa." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarEmpresa: " + e });
  }
};

export const listarEmpresas = async (req, res) => {
  try {
    const result = await empresaModel.listarEmpresas();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron empresas."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar empresas: " + e,
    });
  }
}

export const buscarEmpresa = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await empresaModel.buscarEmpresa(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar empresa: ' + e });
  }
};

export const actualizarEmpresa = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let {
      nombreEmpresa,
      telefonoEmpresa,
      tipoEmpresa,
      direccionEmpresa,
      departamentoEmpresa,
      municipioEmpresa,
      nitEmpresa,
      logoEmpresa,
      correoEmpresa,
      estado,
      fk_contrato
    } = req.body;

    const result = await empresaModel.actualizarEmpresa(id, nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la empresa" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la empresa" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar empresa: ' + e });
  }
};

export const deshabilitarEmpresa = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await empresaModel.deshabilitarEmpresa(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se deshabilitó con éxito la empresa" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo deshabilitar al empresa" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al deshabilitar la empresa: ' + e });
  }
};

export const habilitarEmpresa = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await empresaModel.habilitarEmpresa(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se habilitó con éxito la empresa" });
    } else {
      res.status(404).json({ status: 404, message: "No se encontró la empresa para habilitar" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al habilitar empresa: ' + e });
  }
};