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

  indexSuppression: number; //va remfermer l'index trouvé
  indexToUpdate: number;
  
  editMode: boolean = false;

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

  //récupération de l'index pour le donner à la modal de confirmation
  recupIndex(index){
    this.indexSuppression = index;
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

  onDeleteAgent(){
    if (this.agents[this.indexSuppression].photo && this.agents[this.indexSuppression].photo !== ''){
      this.agentsService.removeFile(this.agents[this.indexSuppression].photo);
    }
    this.agentsService.deleteAgent(this.indexSuppression);
  }

  onSubmitAgentForm(){
    const newAgent: Agent = this.agentForm.value; 
    newAgent.photo = this.photoUrl ? this.photoUrl : "";

    if (this.editMode) {
      this.agentsService.updateAgent(newAgent, this.indexToUpdate);
    } else {
      this.agentsService.createAgent(newAgent);
    }
  }

  resetForm(){
    this.agentForm.reset();
    this.editMode = false;
    this.photoUrl = '';
  }

  onEditAgent(agent: Agent, content){
    this.open(content);
    this.editMode = true;
    this.agentForm.get('firstname').setValue(agent.firstname);
    this.agentForm.get('lastname').setValue(agent.lastname);
    this.agentForm.get('phone').setValue(agent.phone);
    this.photoUrl = agent.photo ? agent.photo : "";
    const index = this.agents.findIndex(
      (agentEl) => {
        if (agentEl === agent) {
          return true;
        }
      }
    );
    this.indexToUpdate = index;;
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

  onRemovePhoto(){
    this.agentsService.removeFile(this.photoUrl);
    this.photoUrl = '';
  }


}
