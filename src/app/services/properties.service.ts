import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];
  propertiesHeart: Property[] = [];

  proprietiesAccess = firebase.database().ref("properties")

  propertiesSubject = new Subject<Property[]>();
  propertiesHeartSubject = new Subject<Property[]>();


  constructor() {}

createProperty(property: Property) {
  this.properties.push(property);
  this.saveProperties();
  this.emitProperties();
}

deleteProperty(index){
  this.properties.splice(index, 1);
  this.saveProperties();
  this.emitProperties();
}

//2 solutions pour l'update
updateProperty(property: Property, index) {
  // this.properties[index] = property;
  // this.saveProperties();
  // this.emitProperties;
  // ou alors
  firebase.database().ref('/properties/' + index).update(property).catch(
    (error) => {
      console.error(error);
    }
  );
}

saveProperties(){
  firebase.database().ref('/properties').set(this.properties);
}

getProperties() {
  firebase.database().ref('/properties').on('value', (data) => {
    this.properties = data.val() ? data.val() : [];
    this.emitProperties();
  });
}

getPropertiesOrderBy(){
  firebase.database().ref('/properties')
                      .orderByChild("price")
                      .on("child_added", snap => {
                          //console.log(snap.val());
                      });
}

getPropertiesByProprietyObject(propriety: string, value: string|boolean|number){
    
  this.proprietiesAccess.orderByChild(propriety).equalTo(value).on("child_added", (snap) => {
    this.propertiesHeart = snap.val() ? snap.val() : [];
    this.emitPropertiesHeart();
  }
);
}

//Selectionne une propriété par sa référence
getSinglePropertyByRef(ref){
  return new Promise(
    (resolve, reject) => {

  this.proprietiesAccess.orderByChild("reference").equalTo(ref).on("child_added",
      (data) => {
        resolve(data.val());
        console.log(data.val())
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    
  )})
}


uploadFile(file: File){
  return new Promise(
    (resolve, reject) => {
      const uniqueId = Date.now().toString();
      const fileName = uniqueId + file.name;
      const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement') //pending
        },
        (error) => { //error
          console.error(error);
          reject(error);
        },
        () => { //success
          upload.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    }
  );
}

  removeFile(fileLink: string){
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  //on emet les données à chaque modification de données.
  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  emitPropertiesHeart() {
    this.propertiesHeartSubject.next(this.propertiesHeart);
  }

  propertiesSearchSubject = new Subject<Property[]>();
  value;

  recup(data){
    this.value = data;
    console.log(this.value)
    this.emitSearchProperties();
  }

  emitSearchProperties() {
    // this.propertiesSearchSubject.next(this.search);
    this.propertiesSearchSubject.next(this.value);
  }

  // getProperties() { //promesse
  // //   return new Promise(
  // //     (resolve, reject) => {
  // //       if (this.properties && this.properties.length > 0){
  // //         resolve(this.properties);
  // //       } else {
  // //         const error = new Error('Properties does not exist or is empty');
  // //         reject(error);
  // //       }
  // //     }
  // //   );
  // // }
                    // Observable
  //     return new Observable((observer) =>{
  //       if (this.properties && this.properties.length > 0){
  //         observer.next(this.properties);
  //         observer.complete();
  //       } else {
  //         const error = new Error('Properties does not exist or is empty');
  //         observer.error(error);
  //       }
  //     })
  //   }

// getSingleProperty(id) {
//   return new Promise(
//     (resolve, reject) => {
//       firebase.database().ref('/properties/' + id).once('value').then(
//         (data) => {
//           resolve(data.val());
//           //console.log(data.val());
//         }
//       ).catch(
//         (error) => {
//           reject(error);
//         }
//       );
//     }
//   );
// }
}
