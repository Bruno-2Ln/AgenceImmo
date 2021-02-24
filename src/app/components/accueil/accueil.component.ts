import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  title_section_2: string = "Visitez nos supers coups de coeurs !"

  constructor() { }

  ngOnInit(): void {
  }

}
