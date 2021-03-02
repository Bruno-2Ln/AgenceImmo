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
    this.propertiesService.getProperties();

  //souscription à l'observable implémenté dans le service mais appelé dans le component frère search, ceci n'est possible que par le fait de fournir le component frère ici (ligne 10 : providers: [SearchPropertiesComponent] ) 
    this.propertiesSearchSubcription = this.propertiesService.propertiesSearchSubject.subscribe(search => {
      this.search = search;
      console.log(this.search)
    });
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
