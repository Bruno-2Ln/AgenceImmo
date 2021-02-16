import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'agence';

  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyAVwQalbu3MbhOvGE3oGNTebu5kHU_uMEM",
      authDomain: "monagence-75193.firebaseapp.com",
      projectId: "monagence-75193",
      storageBucket: "monagence-75193.appspot.com",
      messagingSenderId: "810081087062",
      appId: "1:810081087062:web:950ad6adc272d3941915f7"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
