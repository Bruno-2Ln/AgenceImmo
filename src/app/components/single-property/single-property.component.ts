import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css']
})

export class SinglePropertyComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //const id = this.route.snapshot.params['id'];
    this.propertiesService.getSingleProperties(id).then(
      (property: Property) => {
        this.property = property;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }



}
