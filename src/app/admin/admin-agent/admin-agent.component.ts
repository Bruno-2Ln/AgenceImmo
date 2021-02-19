import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from 'https';

import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminAgentComponent implements OnInit {

  agentForm: FormGroup;

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
  }

  open(content){
    this.modalService.open(content);
  }

  initAgentForm() {
    this.agentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      photo: [''],
      phone: ['', Validators.required],
    });
  }

  onSubmitAgentForm(){
    const newAgent: Agent = this.agentForm.value; 

    this.agentsService.createAgent(newAgent)
  }

  resetForm(){
    this.agentForm.reset();
  }



}
