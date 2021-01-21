import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable,of } from 'rxjs';
import { switchMap, map  } from 'rxjs/operators';

import { Product } from '../shared/productos.interface';
import { Ventas } from '../shared/ventas.interface';
import { AlertService } from './alert-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ : Observable<User>


  //Usuarios
  private usuariosCollection: AngularFirestoreCollection<User>;
  private usuarios : Observable<User[]>;

  //Productos
  private productsCollection: AngularFirestoreCollection<Product>;
  private pantallaCollection: AngularFirestoreCollection<Product>;
  private productos : Observable<Product[]>;
  //Pantalla


  constructor(public afAuth: AngularFireAuth,private afs :AngularFirestore, private alertSvc : AlertService ) { 


    this.usuariosCollection = afs.collection<User>('users');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return{ id, ...data}
          })
        }
      )
    )

    this.productsCollection = afs.collection<Product>('productos');
    this.productos = this.productsCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a =>{
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return{ id, ...data};
            }
          );
        }
      )
    );


    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else{
          return of(null);
        }
      })
    );


  }

  getProductos(){
    return this.productos;
  }
  getUsuarios(){
    return this.usuarios;
  }
  

  getCollectionParametro(path:string, parametro:string, value:string){
    this.usuariosCollection = this.afs.collection(path,ref => ref.where(parametro,'==',value));

    return this.usuariosCollection.valueChanges();

  }

  async actualizarProducto(id,prod:Product){
    const userRef : AngularFirestoreDocument<Product> = this.afs.doc(`productos/${id}`);


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


  async updateProducto(prod: Product, venta: Ventas){
    const userRef : AngularFirestoreDocument<Product> = this.afs.doc(`productos/${venta.idProducto}`);

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

  getProducto(id:string){
    // alert('He Recibido el Producto Scaneado tal '+ id);
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  getUsuario(id:string){
    // alert('He Recibido el Producto Scaneado tal '+ id);
    return this.usuariosCollection.doc<User>(id).valueChanges();
  }

  // updateProducto(prod: Product, id :string){
  //   return this.productsCollection.doc(id).update(prod);
  // }

  updateUsuario(user: User, id:string){
    return this.usuariosCollection.doc(id).update(user)
  }

  addProducto(prod:Product){
    return this.productsCollection.add(prod);
  }

  removeProducto(id: string){
    return this.productsCollection.doc(id).delete();
  }



  async resetPassword(email:string): Promise<void> { 
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch(error){
      console.log('error  ->', error);
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    }
    catch (error) {
      console.log('Error ->', error);
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifiedEmail();
      this.updateUserData(user);
      return user;
    }
    catch (error) {
      console.log('Error ->', error)
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    }
    catch (error) {
      console.log('Error ->', error)
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }
  }

  async sendVerifiedEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch (error) {
      console.log('error  ->', error);
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }
  }

  isEmailVerified(user):boolean{
    return user.emailVerified === true ? true : false;
  }



  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch (error) {
      console.log('Error ->', error);
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }
  }

  private updateUserData(user:User){
    const userRef : AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data : User ={
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, {merge:true});
  }



}
