const ventasBD = require("./conexion").ventas;  // Referencia a la colección de ventas
const Venta = require("../clases/ventasClase");  // Importa la clase Venta

// Validar que los datos de una venta sean correctos
function validarVenta(venta2) {
    var datosCorrectos = false;
    if (venta2.idUsuario !== undefined && venta2.idProducto !== undefined && venta2.fecha !== undefined && venta2.hora !== undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
}

// Mostrar todas las ventas
async function mostrarVentas() {
    const ventas = await ventasBD.get();
    var ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        const venta2 = venta1.getVenta;
        if (validarVenta(venta2)) {
            ventasValidas.push(venta2);
        }
    });
    return ventasValidas;
}

// Buscar una venta por ID
async function buscarPorId(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    var ventaValida = { error: true };
    if (validarVenta(venta1.getVenta)) {
        ventaValida = venta1.getVenta;
    }
    return ventaValida;
}

// Crear una nueva venta
async function nuevaVenta(data) {
    const venta1 = new Venta(data);
    if (!venta1.getVenta.estatus) {
        venta1.getVenta.estatus = "vendido";
    }
    var ventaValida = false;
    if (validarVenta(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    return ventaValida;
}

// Cancelar una venta (sin borrarla)
async function cancelarVenta(id) {
    if (!id) {
        return { error: true, message: "ID no proporcionado" };
    }

    const venta = await buscarPorId(id);
    
    if (venta.error) {
        return { error: true, message: "Venta no encontrada" };
    }

    if (venta.estatus !== "vendido") {
        return { error: true, message: "La venta no puede ser cancelada porque no está en estado vendido." };
    }

    try {
        await ventasBD.doc(id).update({ estatus: 'cancelado' });
        return { success: true, message: "Venta cancelada correctamente." };
    } catch (error) {
        return { error: true, message: error.message };
    }
}


module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta
};

// Ejemplos de uso

/* 
// Crear nueva venta
data = {
    idUsuario: "usuario1",
    idProducto: "producto1",
    fecha: "2024-09-30",  // Opcional, si no se especifica se usará la fecha actual
    hora: "12:30:00"      // Opcional, si no se especifica se usará la hora actual
};
nuevaVenta(data);

// Cancelar venta por ID
cancelarVenta("idDeVenta");

// Mostrar todas las ventas
mostrarVentas();

// Buscar venta por ID
buscarPorId("idDeVenta");
*/
