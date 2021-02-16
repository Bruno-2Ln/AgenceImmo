import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signInUser(email: string, password: string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }
          ).catch(
            (error) => reject(error));
      }
    );
  }

  signOutUser(){
    firebase.auth().signOut().then()
  }

  // Promesse pour enregistrer un admin
  // signUpUser(email: string, password: string) {
  //   return new Promise (
  //     (resolve, reject) => {
  //       firebase.auth().createUserWithEmailAndPassword(email, password).then(
  //         () => {
  //           console.log('Connecté');
  //           resolve(void 0);
  //         }
  //         ).catch(
  //           (error) => reject(error));
  //     }
  //   );
  // }

}
