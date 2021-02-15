import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css'],
  providers: [NgbModalConfig, NgbModal] //modal
})

export class AdminPropertiesComponent implements OnInit {

  constructor(
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  // Ouverture Modal
  open(content){
    this.modalService.open(content);
  }

  onSubmitPropertiesForm(form: NgForm){
    // console.log(form.value);
    const title = form.value['title'];
    console.log(title);
    
  }

}
