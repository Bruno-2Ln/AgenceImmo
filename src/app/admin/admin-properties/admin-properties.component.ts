import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
  properties: any[] = [];
  indexSuppression: number;

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
      (properties) => {
        this.properties = properties
      }
      );
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
    });
  }

  onSubmitPropertiesForm(){
    const newProperty = this.propertiesForm.value;
    this.propertiesService.createProperty(newProperty);
    console.log(this.properties);

  }

  //les champs du formulaire sont réinitialisés
  resetForm(){
    this.propertiesForm.reset();
  }

  onDeleteProperty(){
      this.propertiesService.deleteProperty(this.indexSuppression);
  }

  //récupération de l'index pour le donner à la modal de confirmation
  recupIndex(index){
    this.indexSuppression = index;
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
