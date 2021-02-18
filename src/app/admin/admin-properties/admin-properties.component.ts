import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';

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
  photoUrl: string;

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
      }
      );
      this.propertiesService.getProperties();
      this.propertiesService.emitProperties();
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
      description: '',
      price: ['', Validators.required],
      sold: false,
    });
  }

  onSubmitPropertiesForm(){
    const newProperty: Property = this.propertiesForm.value;
    newProperty.photo = this.photoUrl ? this.photoUrl : '';
    if (this.editMode){
      this.propertiesService.updateProperty(newProperty, this.indextoUpdate);
    } else {
      this.propertiesService.createProperty(newProperty);
    }

  }

  //les champs du formulaire sont réinitialisés
  resetForm(){
    this.propertiesForm.reset();
    this.editMode = false;
  }

  onDeleteProperty(){
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
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
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
        this.photoUrl = url;
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false
        }, 5000)
      });
   // this.propertiesService.uploadFile()
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
