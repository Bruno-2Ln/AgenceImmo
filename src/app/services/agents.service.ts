import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import { Agent } from '../interfaces/agent';

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

  deleteAgent(index){
    this.agents.splice(index, 1);
    this.saveAgents();
    this.emitAgents();
  }

  updateAgent(agent: Agent, index){
    firebase.database().ref('/agents/' + index).update(agent).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  saveAgents(){
    firebase.database().ref('/agents').set(this.agents);
  }

  getAgents(){
    firebase.database().ref('/agents').on('value', (data) => {
      this.agents = data.val() ? data.val() : [];
      this.emitAgents();
    });
  }

  emitAgents(){
    this.agentsSubject.next(this.agents);
  }

  removeFile(fileLink: string){
    if (fileLink){
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/agents/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement....');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  

}
