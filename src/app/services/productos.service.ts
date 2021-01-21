import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable,of } from 'rxjs';
import { switchMap, map  } from 'rxjs/operators';
import { Product } from '../shared/productos.interface';
import { Ventas } from '../shared/ventas.interface';
import { ReparacionesFinalizadasInterface } from '../shared/reparaciones-entregadas.interface';

@Injectable({
    providedIn: 'root'
  })
  export class ProductosService {
  
      private productosCollection : AngularFirestoreCollection<Product>;
      private productos : Observable<Product[]>;
  
      constructor(public afAuth: AngularFireAuth,private afs :AngularFirestore) {
          this.productosCollection = afs.collection<Product>('productos');
  
          this.productos = this.productosCollection.snapshotChanges().pipe(
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

      async actualizarProducto(id,prod:Product){
        const userRef : AngularFirestoreDocument<Product> = this.afs.doc(`productos/${id}`);
        console.log(prod.cantidadProducto);
    
        const data : Product ={
          id : id,
          modeloProducto : prod.modeloProducto,
          marcaProducto : prod.marcaProducto,
          precioUnitario : prod.precioUnitario,
          cantidadProducto : prod.cantidadProducto,
          producto : prod.producto
    
        };
    
        return userRef.set(data, {merge:true});
      }

      getProducto(id:string){
        // alert('He Recibido el Producto Scaneado tal '+ id);
        return this.productosCollection.doc<Product>(id).valueChanges();
      }
  
      getProductos(){
          return this.productos;
      }
  
      addProducto(producto: Product){
        
         return this.productosCollection.add(producto);
      }
  
      removeProducto(id:string){
          return this.productosCollection.doc(id).delete();
      }
  
      updateProducto(id,producto:Product){
          const prodRef : AngularFirestoreDocument<Product> = this.afs.doc(`productos/${id}`);
  
          const data : Product ={
              id : producto.id,
              cantidadProducto : producto.cantidadProducto,
              marcaProducto : producto.marcaProducto,
              precioUnitario: producto.precioUnitario,
              modeloProducto: producto.modeloProducto,
              producto: producto.producto
          }
          return prodRef.set(data, {merge:true});
      }

      getCollectionParametro(path:string, parametro:string, value:string){
        this.productosCollection = this.afs.collection(path,ref => ref.where(parametro,'==',value));
        return this.productosCollection.valueChanges();
      }

      async ventaProducto(prod: Product, venta: Ventas){
        const userRef : AngularFirestoreDocument<Product> = this.afs.doc(`productos/${venta.idProducto}`);
        console.log(prod.cantidadProducto);
        console.log(venta.cantidadVenta);
    
        const data : Product ={
          id : venta.idProducto,
          modeloProducto : prod.modeloProducto,
          marcaProducto : prod.marcaProducto,
          precioUnitario : prod.precioUnitario,
          cantidadProducto : prod.cantidadProducto - venta.cantidadVenta,
          producto : prod.producto
    
        };
    
        return userRef.set(data, {merge:true});
      }

      async rebajaProductobyReparacion(prod:Product, reparacion:ReparacionesFinalizadasInterface ){

        console.log(prod);
        console.log(reparacion);

        const userRef : AngularFirestoreDocument<Product> = this.afs.doc(`productos/${reparacion.adicional}`);

        const data : Product ={
          id : reparacion.adicional,
          modeloProducto : prod.modeloProducto,
          marcaProducto : prod.marcaProducto,
          precioUnitario : prod.precioUnitario,
          cantidadProducto : prod.cantidadProducto - reparacion.cantidad_adicional,
          producto : prod.producto
    
        };
    
        return userRef.set(data, {merge:true});
      }
  
  
  }