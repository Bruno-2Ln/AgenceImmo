import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: "Maison dans écrin de verdure",
      category: "maison",
      price: "250 000",
      rooms: "5",
      surface: "150",
      sold: true
    },
    {
      title: "Appartement au bord de la mer",
      category: "appartement",
      sold: false,
      surface: "56"
    }, {
      title: "Villa d'architecte",
      category: "maison",
      sold: false
    }
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }


createProperty(property) {
  this.properties.push(property);
  this.emitProperties;
}

deleteProperty(index){
  this.properties.splice(index, 1);
  this.emitProperties;
}


  //on emet les données à chaque modification de données.
  emitProperties() {
    this.propertiesSubject.next(this.properties);
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



}
