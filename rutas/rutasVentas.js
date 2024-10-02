var ruta = require("express").Router();
var { mostrarVentas, nuevaVenta, cancelarVenta,buscarPorId } = require("../bd/ventasBD");

// Ruta para mostrar todas las ventas
ruta.get("/mostrarVentas", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

// Ruta para buscar una venta por ID
ruta.get("/buscarVentaPorId/:id", async (req, res) => {
    var ventaValida = await buscarPorId(req.params.id);
    res.json(ventaValida);
});

// Ruta para crear una nueva venta
ruta.post("/nuevaVenta", async (req, res) => {
    if (!req.body.estatus) {
        req.body.estatus = "vendido";
    }
    var ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});

//Ruta para cambiar el estatus
ruta.put("/cancelarVenta/:id", async (req, res) => {
    const resultado = await cancelarVenta(req.params.id);
    if (resultado.error) {
        return res.status(400).json(resultado);
    }
    res.json(resultado);
});


module.exports = ruta;
