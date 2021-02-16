import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[];
  propertiesSubject = new Subject<Property[]>();

  constructor() { }


createProperty(property: Property) {
  this.properties.push(property);
  this.emitProperties;
}

deleteProperty(index){
  this.properties.splice(index, 1);
  this.emitProperties;
}

updateProperty(property: Property, index) {
  this.properties[index] = property;
  console.log(property);
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
