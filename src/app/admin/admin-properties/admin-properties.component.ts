import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css'],
  providers: [NgbModalConfig, NgbModal] //modal
})

export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;
  propertiesSubcription: Subscription;
  properties: Property[] = [];

  indexSuppression: number;

  indextoUpdate: number;
  editMode: boolean = false;

  photoUploading: boolean = false;
  photoUploaded: boolean = false;
  photosAdded: any[] = [];

  ranking: string;

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties
        //console.log(properties);
      }
      );
      this.propertiesService.getProperties();
      //this.propertiesService.emitProperties();
  }

  // Ouverture Modal
  open(content){
    this.modalService.open(content);
  }

  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      bathrooms : ['', Validators.required],
      bedrooms : ['', Validators.required],
      postal_code : ['', Validators.required],
      city : ['', Validators.required],
      description: 'N\'attendez plus ! Appelez-nous pour avoir plus d\'informations et organisons une visite (Les petits gâteaux sont à notre charge)',
      price: ['', Validators.required],
      sold: '',
      heart_stroke: '',
    });
  }

  onSubmitPropertiesForm(){
    const value =  +this.propertiesForm.get('price').value

    if (value < 100000){
      this.ranking = "moins de 100000"
    } else if (value <= 300000){
      this.ranking = "de 100000 à 300000"
    } else if (value <= 500000){
      this.ranking = "de 300001 à 500000"
    } else if (value > 500001){
      this.ranking = "plus de 500000"
    }

    const newProperty: Property = this.propertiesForm.value;
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false;
    newProperty.heart_stroke = this.propertiesForm.get('heart_stroke').value ? this.propertiesForm.get('heart_stroke').value : false;
    newProperty.photos = this.photosAdded ? this.photosAdded : [];
    newProperty.indexSearch = this.propertiesForm.get('city').value + "_" + this.propertiesForm.get('category').value + "_" + this.ranking
    if (this.editMode){
      this.propertiesService.updateProperty(newProperty, this.indextoUpdate);
    } else {
      newProperty.reference = Date.now();
      this.propertiesService.createProperty(newProperty);
    }

  }

  //les champs du formulaire sont réinitialisés
  resetForm(){
    this.propertiesForm.reset();
    this.editMode = false;
    this.photosAdded = [];
  }

  onDeleteProperty(){

    //suppression d'une seule photo
    // if (this.properties[this.indexSuppression].photo && this.properties[this.indexSuppression].photo !== '') {

    // this.propertiesService.removeFile(this.properties[this.indexSuppression].photo);
    // }

    //suppression de toutes les photos SI elles existent
    if (this.properties[this.indexSuppression].photos){
      this.properties[this.indexSuppression].photos.forEach(
        (photo) => {
          this.propertiesService.removeFile(photo);
        }
      );
    }

      this.propertiesService.deleteProperty(this.indexSuppression);
  }

  //récupération de l'index pour le donner à la modal de confirmation
  recupIndex(index){
    this.indexSuppression = index;
  }

  onEditProperty(property: Property, content){
    this.open(content);
    this.editMode = true;
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('bathrooms').setValue(property.bathrooms);
    this.propertiesForm.get('bedrooms').setValue(property.bedrooms);
    this.propertiesForm.get('postal_code').setValue(property.postal_code);
    this.propertiesForm.get('city').setValue(property.city);
    this.propertiesForm.get('description').setValue(property.description ? property.description : "N'attendez plus ! Appelez-nous pour avoir plus d'informations et organisons une visite");
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.propertiesForm.get('heart_stroke').setValue(property.heart_stroke);
    this.photosAdded = property.photos ? property.photos : [];
    const index = this.properties.findIndex(
      (propertyEl) => {
        if (propertyEl === property){
          return true;
        }
      }
    );
    this.indextoUpdate = index;
  }

  onUploadFile(event){
    this.photoUploading = true;

    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false
        }, 5000)
      });
   // this.propertiesService.uploadFile()
  }

  onRemoveAddedPhoto(index) {
    this.propertiesService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1); 
  
  }

  // indexP(index){
  //   console.log(this.properties[index].title);
  // }

  // Formulaire méthode template
  // onSubmitPropertiesForm(form: NgForm){
  //   // console.log(form.value);
  //   const title = form.value['title'];
  //   console.log(title);
    
  // }

}
