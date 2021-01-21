import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {  map  } from 'rxjs/operators';

import { Product } from '../shared/productos.interface';
import { ReparacionesFinalizadasInterface } from '../shared/reparaciones-entregadas.interface';
import { ReparacionesInterface } from '../shared/reparaciones.interface';

@Injectable({
    providedIn:'root'
})
export class ReparacionesFinalizadasService{
    private reparacionesFinalizadasCollection: AngularFirestoreCollection<ReparacionesFinalizadasInterface>
    private reparacionesFinalizadas:Observable<ReparacionesFinalizadasInterface[]>
    constructor(public afAuth:AngularFireAuth, private afs: AngularFirestore){
        this.reparacionesFinalizadasCollection = afs.collection<ReparacionesFinalizadasInterface>('reparaciones_finalizadas');

        this.reparacionesFinalizadas = this.reparacionesFinalizadasCollection.snapshotChanges().pipe(map(actions =>{
            return actions.map(a=>{
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;

                return {id,...data}
            })
        }))
    }

    getReparacionesFinalizadas(){
        return this.reparacionesFinalizadas;
    }
    getReparacionFinalizada(id:string){
        return this.reparacionesFinalizadasCollection.doc<ReparacionesFinalizadasInterface>(id).valueChanges();
    }

    addReparacionFinalizada(reparacionFinalizada:ReparacionesFinalizadasInterface){
        return this.reparacionesFinalizadasCollection.add(reparacionFinalizada);

    }
    removeReparacion(id:string){
        return this.reparacionesFinalizadasCollection.doc(id).delete();
    }

    updateReparacion(reparacionFinalizada:ReparacionesFinalizadasInterface){
        const reparacionRef : AngularFirestoreDocument<ReparacionesFinalizadasInterface> = this.afs.doc('reparaciones_finalizadas');

        const data: ReparacionesFinalizadasInterface = {
            id:reparacionFinalizada.id,
            nombre:reparacionFinalizada.nombre,
            telefono: reparacionFinalizada.telefono,
            fecha_dejaron:reparacionFinalizada.fecha_dejaron,
            marca:reparacionFinalizada.marca,
            modelo:reparacionFinalizada.modelo,
            color:reparacionFinalizada.color,
            encedido:reparacionFinalizada.encedido,
            password:reparacionFinalizada.password,
            descripcion:reparacionFinalizada.descripcion,
            partes_reparar:reparacionFinalizada.partes_reparar,
            persona_reparo:reparacionFinalizada.persona_reparo,
            persona_entrego:reparacionFinalizada.persona_entrego,
            detalle_reparacion: reparacionFinalizada.detalle_reparacion,
            adicional:reparacionFinalizada.adicional,
            fecha_entrega:reparacionFinalizada.fecha_entrega,
            entregado:reparacionFinalizada.entregado,
            cantidad_adicional:reparacionFinalizada.cantidad_adicional
        }
        return reparacionRef.set(data, {merge:true});
    }

    getCollectionParameter(path:string, parametro:string, value:string){
        this.reparacionesFinalizadasCollection= this.afs.collection(path,ref=> ref.where(parametro,'==',value));
        return this.reparacionesFinalizadasCollection.valueChanges();
    }
}