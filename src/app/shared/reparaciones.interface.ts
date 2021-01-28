export interface ReparacionesInterface{
    nombre_cliente: string;
    telefono:string;
    fecha_dejaron:Date;
    marca:string;
    modelo:string;
    color:string;
    encendido:boolean;
    password:string;
    descripcion:string;
    partes_reparar:[];

    //Nueva Parte
    persona_reparo?:string;
    persona_entrego?:string;
    adicional?:string;
    cantidad_adicional?:number;
    fecha_entrega ?:Date;
    entregado ?:boolean;
    detalle_reparacion ?: string;
    precio_reparacion?:number;
}
