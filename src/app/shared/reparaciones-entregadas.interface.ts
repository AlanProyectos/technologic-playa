export interface ReparacionesFinalizadasInterface{
    id:string;
    nombre:string;
    telefono:string;
    fecha_dejaron:Date;

    marca:string;
    modelo:string;
    color:string;
    encedido:boolean;
    password:string;
    descripcion:string;
    partes_reparar:[];
    persona_reparo:string;
    persona_entrego:string;
    detalle_reparacion:string;
    adicional:string;
    cantidad_adicional:number;
    fecha_entrega:string;
    entregado:boolean;
    


}