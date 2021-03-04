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

  //------------------------------------------
  //--------tests requètes firebase-----------
  //------------------------------------------

  //récupère un tableau des objets Agent
  selectAllAgents(){

  let testRef = firebase.database().ref('agents/');
  testRef.on('value', (snapshot) => {
    const data = snapshot.val();
  console.log(data);
  }) 

}

//Sélectionne les agents en les classant par leur prénoms
selectByNames() {

  let testRef = firebase.database().ref("agents")
  testRef.orderByChild("firstname").on("child_added", snap => console.log(snap.val()))

}

//Sélectionne les objets Agent venant après le prénom spécifié
selectObjectAfterName(){

  let testRef = firebase.database().ref("agents")
  testRef.orderByChild("firstname").startAt("Tory").on("child_added", (snap) => {
  console.log(snap.val())})
}

//Selectionne les agents par une propriété et la valeur souhaitée
selectAgents(propriety: string, value: string){
  let testRef = firebase.database().ref("agents")
  testRef.orderByChild(propriety).equalTo(value).on("child_added", (snap) => {
  console.log(snap.val())})

}

//----------------------------------------------
//----------------------------------------------
//----------------------------------------------

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
      console.log(this.agents)
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
