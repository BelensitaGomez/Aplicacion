class Venta {
    constructor({ id, idUsuario, idProducto, fecha, hora, estatus = "vendido" }) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idProducto = idProducto;
        this.fecha = fecha || new Date().toISOString().split('T')[0]; // Si no se especifica, usa la fecha actual
        this.hora = hora || new Date().toISOString().split('T')[1];  // Si no se especifica, usa la hora actual
        this.estatus = estatus;
    }

    get getVenta() {
        return {
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            estatus: this.estatus
        };
    }
}

module.exports = Venta;
