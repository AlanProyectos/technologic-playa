export interface ReparacionesInterface{
    id:string;
    nombre_cliente: string;
    telefono:string;
    fecha_dejaron:Date;
    fecha_entrega ?:Date;
    entregado ?:boolean;
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
}
