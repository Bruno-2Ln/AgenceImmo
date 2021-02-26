import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';


@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.css']
})
export class SearchPropertiesComponent implements OnInit {

  searchPropertiesForm: FormGroup;
  properties: Property[] = [];
  
  categories: string[] = [];
  cities: string[] = [];
  prices: string[] = [
    "moins de 100000",
    "de 100000 à 300000",
    "de 300001 à 500000",
    "plus de 500000"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
  ) { }

  ngOnInit(): void {
    this.initSearchPropertiesForm();

    this.propertiesService.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties
  
    this.getAllCategories()
    this.getAllCities()
    });
    this.propertiesService.getProperties();
    //console.log(this.categories)
    //console.log(this.cities)

  }

  initSearchPropertiesForm(){
    this.searchPropertiesForm = this.formBuilder.group({
      city: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      surface: ['', Validators.required],
    });
  }

  getAllCategories(){
    
    this.properties.forEach((property: Property) => {

      if(this.categories.indexOf(property.category) !== -1){
        } else {
        this.categories.push(property.category);
      }
  });
      return this.categories
  }

  getAllCities(){
    
    this.properties.forEach((property: Property) => {

      if(this.cities.indexOf(property.city) !== -1){
        } else {
        this.cities.push(property.city);
      }
  });
      return this.cities
  }


}
