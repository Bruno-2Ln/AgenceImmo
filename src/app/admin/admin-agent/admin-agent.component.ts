import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from 'src/app/interfaces/agent';

import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminAgentComponent implements OnInit {

  agentForm: FormGroup;
  agents: Agent[] = [];

  //les différents états de l'envoi d'une photo
  photoUploading = false; // pending
  photoUploaded = false; // complete
  photoUrl : string;
  

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private agentsService: AgentsService
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initAgentForm();
    this.agentsService.agentsSubject.subscribe(
      (agents: Agent[]) => {
        this.agents = agents
      }
    );
    this.agentsService.getAgents();
    this.agentsService.emitAgents();
  }

  open(content){
    this.modalService.open(content);
  }

  initAgentForm() {
    this.agentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmitAgentForm(){
    const newAgent: Agent = this.agentForm.value; 
    newAgent.photo = this.photoUrl ? this.photoUrl : "";

    this.agentsService.createAgent(newAgent)
  }

  resetForm(){
    this.agentForm.reset();
  }

  onUploadFile(event){
    //la photo est en cours de chargement donc ça passe à true
    this.photoUploading = true;
    this.agentsService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoUrl = url;
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }



}
