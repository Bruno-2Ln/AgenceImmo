import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.css'],
  
})
export class SearchPropertiesComponent implements OnInit {

  searchPropertiesForm: FormGroup;
  properties: Property[] = [];
  search: Property[] = [];

  categories: string[] = [];
  cities: string[] = [];
  prices: string[] = [
    "moins de 100000",
    "de 100000 à 300000",
    "de 300001 à 500000",
    "plus de 500000"
  ];
  
  value: string;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
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

  onSubmitSearchPropertiesForm(){
    //Récupération des données du formulaire..
    let city = this.searchPropertiesForm.get('city').value;
    let category = this.searchPropertiesForm.get('category').value;
    let price = this.searchPropertiesForm.get('price').value;
    //pour concaténation dans la variable value
    this.value = city + "_"+ category + "_" + price

    //recherche de l'existence de la value dans le tableau des propriétés
    this.properties.forEach(element => {
      if (element.indexSearch == this.value){
        //la valeur similaire trouvée, l'objet est push dans le tableau search[]
        this.search.push(element)
      }
    });
    //si le tableau est vide
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
