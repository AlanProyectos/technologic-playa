import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable,of } from 'rxjs';
import { switchMap, map  } from 'rxjs/operators';
import { Ventas } from '../shared/ventas.interface';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class VentasService {

    private ventasCollection : AngularFirestoreCollection<Ventas>;
    private ventas : Observable<Ventas[]>;

    constructor(public afAuth: AngularFireAuth,private afs :AngularFirestore, private prod : AuthService ) {
        this.ventasCollection = afs.collection<Ventas>('ventas');

        this.ventas = this.ventasCollection.snapshotChanges().pipe(
            map(
                actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return {id, ...data}
                    })
                }
            )
        );
    }

    getCollectionParametro(path:string, parametro:string, value:string){
        this.ventasCollection = this.afs.collection(path,ref => ref.where(parametro,'==',value));
        return this.ventasCollection.valueChanges();
    
      }

    getVentas(){
        return this.ventas;
    }
    getVenta(id:string){
        return this.ventasCollection.doc<Ventas>(id).valueChanges();
      }

    addVenta(venta:Ventas){
        return this.ventasCollection.add(venta);
    }

    removeVenta(id:string){
        return this.ventasCollection.doc(id).delete();
    }

    updateVenta(venta:Ventas){
        const ventaRef : AngularFirestoreDocument<Ventas> = this.afs.doc(`ventas/${venta.ordenVentaId}`);

        const data : Ventas ={
            ordenVentaId : venta.ordenVentaId,
            emailCliente : venta.emailCliente,
            fechaOrden : venta.fechaOrden,
            telefonoCliente: venta.telefonoCliente,
            vendedor : venta.vendedor,
            vendedorId: venta.vendedorId,
            idProducto: venta.idProducto,
            cantidadVenta: venta.cantidadVenta,
            totalPrecio: venta.totalPrecio
        }
        return ventaRef.set(data, {merge:true});
    }


}