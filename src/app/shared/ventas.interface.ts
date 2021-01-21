export interface Ventas{
    ordenVentaId ?:string;
    emailCliente: string;
    fechaOrden: Date;
    telefonoCliente: number;
    vendedor:string;
    vendedorId:string;
    idProducto: string;
    cantidadVenta: number;
    totalPrecio: number;
}

//aqui se generaran las propiedades 