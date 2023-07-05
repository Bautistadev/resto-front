import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-draw';



@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class GeolocalizacionPage implements OnInit {

  map!: L.Map;
  drawnItems!: L.FeatureGroup;
  polygon!: L.Polygon;


  initMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.drawnItems = L.featureGroup().addTo(this.map);

    this.map.on('click', (event) => {
      const latlng = event.latlng;

      if (this.polygon) {
        this.polygon.addLatLng(latlng);
      } else {
        this.polygon = L.polygon([latlng], { color: 'red' }).addTo(this.drawnItems);
      }
    });
  }
  Logout(): void{
    sessionStorage.removeItem("sessionToken")
    this.redirigir('login')
  }

  redirigir(route:string){
    this.navControl.navigateRoot(route)
  }

  constructor(public navControl:NavController) { }

  ngOnInit() {
    this.initMap();
  }

}
