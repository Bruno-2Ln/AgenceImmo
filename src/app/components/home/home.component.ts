import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private propertiesService: PropertiesService,
) { }

  properties: Property[] = [];
  search = [];
  result = [];
  propertiesSubcription: Subscription;
  propertiesSearchSubcription: Subscription;
  valueSubscription: Subscription;
  value;

  ngOnInit(): void {

    this.propertiesSubcription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
        //console.log(this.properties);
      }
      //Cette partie n'est nécessaire que pour gérer l'observable sans emit.
      // ,
      // (error) => {
      //   console.error(error);
      // },
      // () => {
      //   console.log('Observable complete!')
      // }
    )
    this.propertiesService.getProperties();
  }
  
  getSoldValue(index) {
    if (this.propertiesService.properties[index].sold) {
      return 'red';
    } else {
      return 'green';
    }
  }

  ngOnDestroy() {
    this.propertiesSubcription.unsubscribe();

  }

}
