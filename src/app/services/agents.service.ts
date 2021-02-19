import { Injectable } from '@angular/core';
import { Agent } from 'https';
import { Subject } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  agents: Agent[] = [];

  agentsSubject = new Subject<Agent[]>();

  constructor() { }

  createAgent(agent: Agent){
    this.agents.push(agent);
    this.saveAgents();
    this.emitAgents();
  }

  saveAgents(){
    firebase.database().ref('/agents').set(this.agents);
  }

  emitAgents(){
    this.agentsSubject.next(this.agents);
  }


}
