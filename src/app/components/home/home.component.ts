import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import { SearchPropertiesComponent } from '../search-properties/search-properties.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SearchPropertiesComponent]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private propertiesService: PropertiesService,
    private searchPropertiesComponent: SearchPropertiesComponent) { }

  properties = [];
  search = [];
  propertiesSubcription: Subscription;
  propertiesSearchSubcription: Subscription;
  valueSubscription: Subscription;
  value;

  ngOnInit(): void {
    this.propertiesSubcription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
        console.log(this.properties);
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
    // this.valueSubscription = this.searchPropertiesComponent.valueSubject.subscribe(
    //   (data: any) => {
    //     this.value = data;
    //     console.log(this.value);
    //     console.log("search");
    //   }
    // )
    this.propertiesService.getProperties();
  
    this.propertiesSearchSubcription = this.propertiesService.propertiesSearchSubject.subscribe(search => {
      this.search = search;
      console.log(this.search)
    });
    // this.searchPropertiesComponent.onSubmitSearchPropertiesForm()
    //this.propertiesService.emitProperties();
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
