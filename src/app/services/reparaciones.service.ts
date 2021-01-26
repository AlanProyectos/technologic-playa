import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {  map  } from 'rxjs/operators';

import { ReparacionesInterface } from '../shared/reparaciones.interface';

@Injectable({
    providedIn:'root'
})

export class ReparacionesService{
    private reparacionesCollection:AngularFirestoreCollection<ReparacionesInterface>;
    private reparaciones :Observable<ReparacionesInterface[]>

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore ){
        this.reparacionesCollection = afs.collection<ReparacionesInterface>('reparaciones');

        this.reparaciones = this.reparacionesCollection.snapshotChanges().pipe(map( actions => {
            return actions.map(a=>{
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;

                return{id,...data}
            })
        }))
    }

    getReparaciones(){
        return this.reparaciones;
    }

    getReparacion(id:string){
        return this.reparacionesCollection.doc<ReparacionesInterface>(id).valueChanges();
    }

    addReparacion(reparacion: ReparacionesInterface){
        return this.reparacionesCollection.add(reparacion);
    }

    removeReparacion(id:string){
        return this.reparacionesCollection.doc(id).delete();
    }

    updateReparacion(id, reparacion:ReparacionesInterface){
       var reparacionRef = this.afs.collection('reparaciones').doc(`${id}`);

       console.log(id);

       return reparacionRef.update({
        nombre_cliente: reparacion.nombre_cliente,
        telefono:reparacion.telefono,
        fecha_dejaron:reparacion.fecha_dejaron,
        marca:reparacion.marca,
        modelo:reparacion.modelo,
        color:reparacion.color,
        encendido:reparacion.encendido,
        password:reparacion.password,
        descripcion:reparacion.descripcion,
        partes_reparar:reparacion.partes_reparar,
        persona_reparo: reparacion.persona_reparo,
        persona_entrego: reparacion.persona_entrego,
        adicional: reparacion.adicional,
        cantidad_adicional: reparacion.cantidad_adicional,
        fecha_entrega: reparacion.fecha_entrega,
        entregado : reparacion.entregado,
        detalle_reparacion : reparacion.detalle_reparacion
       })
    }

    getCollectionParameter(path:string, pararametro:string, value: string){
        this.reparacionesCollection = this.afs.collection(path, ref=> ref.where(pararametro,'==',value));
        return this.reparacionesCollection.valueChanges();
    }
}