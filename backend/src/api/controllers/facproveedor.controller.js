import { validationResult } from 'express-validator';

export const guardarFacturaProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreProducto,
      precioUnitario,
      stock,
      unidadMedida,
      precioTotal,
      fechaEntrega,
      fk_producto,
      fk_proveedor
    } = req.body;

    const result = await facturaProveedorModel.guardarFacturaProveedor(nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la factura de proveedor." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la factura de proveedor." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarFacturaProveedor: " + e });
  }
};

export const listarFacturasProveedor = async (req, res) => {
  try {
    const result = await facturaProveedorModel.listarFacturasProveedor();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron facturas de proveedor."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar facturas de proveedor: " + e,
    });
  }
};

export const buscarFacturaProveedor = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await facturaProveedorModel.buscarFacturaProveedor(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar factura de proveedor: ' + e });
  }
};

export const actualizarFacturaProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let {
      nombreProducto,
      precioUnitario,
      stock,
      unidadMedida,
      precioTotal,
      fechaEntrega,
      fk_producto,
      fk_proveedor
    } = req.body;

    const result = await facturaProveedorModel.actualizarFacturaProveedor(id, nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la factura de proveedor" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la factura de proveedor" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar factura de proveedor: ' + e });
  }
};

