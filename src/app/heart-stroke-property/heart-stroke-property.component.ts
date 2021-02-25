import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from '../interfaces/property';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-heart-stroke-property',
  templateUrl: './heart-stroke-property.component.html',
  styleUrls: ['./heart-stroke-property.component.css']
})
export class HeartStrokePropertyComponent implements OnInit, OnDestroy {

  constructor(
    private propertiesService: PropertiesService,
  ) { }

  propertiesSubcription: Subscription;
  properties: Property[] = [];

  ngOnInit(): void {

    this.propertiesSubcription = this.propertiesService.propertiesHeartSubject.subscribe(
      (properties: any) => {
        this.properties.push(properties);
      })

    this.propertiesService.getPropertiesByProprietyObject("heart_stroke", true);
  }

  ngOnDestroy() {
    this.propertiesSubcription.unsubscribe();
  }

}
