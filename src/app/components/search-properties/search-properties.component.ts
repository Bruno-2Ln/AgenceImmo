import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';
import {Location} from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.css'],

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

  valueSubject = new Subject<string>();
  value: string;
  valueX;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
    private location: Location,
    private router: Router
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
    this.propertiesService.getPropertiesOrderBy();
  }

  initSearchPropertiesForm(){
    this.searchPropertiesForm = this.formBuilder.group({
      city: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],

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

  search: Property[] = [];

  onSubmitSearchPropertiesForm(){
    let city = this.searchPropertiesForm.get('city').value;
    let category = this.searchPropertiesForm.get('category').value;
    let price = this.searchPropertiesForm.get('price').value;

    this.value = city + "_"+ category + "_" + price

    //console.log(this.value)

    this.properties.forEach(element => {
      if (element.indexSearch == this.value){
        this.search.push(element)
      }
    });
  
    if(!this.search.length){
      console.log("vide")
    } else {
    //console.log(this.search)
  }
  this.propertiesService.recup(this.search)
  this.propertiesService.emitSearchProperties()
  this.router.navigate(['/home'])
  }



}
