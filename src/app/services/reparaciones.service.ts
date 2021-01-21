import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {  map  } from 'rxjs/operators';

import { Product } from '../shared/productos.interface';
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
        const idRep = this.afs.createId();
        reparacion.id = idRep;
        return this.reparacionesCollection.add(reparacion);
    }

    removeReparacion(id:string){
        return this.reparacionesCollection.doc(id).delete();
    }

    uodateReparacion(reparacion:ReparacionesInterface){
        const reparacionRef : AngularFirestoreDocument<ReparacionesInterface> = this.afs.doc(`reparaciones`);

        const data : ReparacionesInterface = {
            id: reparacion.id,
            color :reparacion.color,
            password: reparacion.password,
            telefono: reparacion.telefono,
            descripcion : reparacion.descripcion,
            encendido: reparacion.encendido,
            fecha_dejaron:reparacion.fecha_dejaron,
            fecha_entrega: reparacion.fecha_entrega,
            marca : reparacion.marca,
            modelo : reparacion.modelo,
            nombre_cliente: reparacion.nombre_cliente,
            partes_reparar: reparacion.partes_reparar,
        };
        return reparacionRef.set(data, {merge:true});
    }

    updateReparacion(id, reparacion:ReparacionesInterface){
       var reparacionRef = this.afs.collection('reparaciones').doc(`${id}`);

       console.log(reparacionRef);

    //    return reparacionRef.update({
    //     id: reparacion.id,
    //     color :reparacion.color,
    //     password: reparacion.password,
    //     telefono: reparacion.telefono,
    //     descripcion : reparacion.descripcion,
    //     encendido: reparacion.encendido,
    //     fecha_dejaron:reparacion.fecha_dejaron,
    //     fecha_entrega: reparacion.fecha_entrega,
    //     marca : reparacion.marca,
    //     modelo : reparacion.modelo,
    //     nombre_cliente: reparacion.nombre_cliente,
    //     partes_reparar: reparacion.partes_reparar
    //    })
    }

    getCollectionParameter(path:string, pararametro:string, value: string){
        this.reparacionesCollection = this.afs.collection(path, ref=> ref.where(pararametro,'==',value));
        return this.reparacionesCollection.valueChanges();
    }
}