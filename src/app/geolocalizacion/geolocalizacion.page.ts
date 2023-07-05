import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import * as L from 'leaflet';
import { booleanPointInPolygon } from '@turf/turf';



@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class GeolocalizacionPage implements OnInit {

  map!: L.Map;
  polygon!: L.Polygon;
  vertices: L.LatLng[] = [];


  initMap() {
    this.map = L.map('map').setView([-34.90379084201353, -57.92483031749725], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (event) => {
      if (this.vertices.length >= 4) {
        return;
      }

      const { lat, lng } = event.latlng;
      const vertex = L.latLng(lat, lng);

      this.vertices.push(vertex);

      if(this.vertices.length == 4){


        console.log('Coordenadas del vértice:',
          this.vertices[0].lat,this.vertices[0].lng,
          this.vertices[1].lat,this.vertices[1].lng,
          this.vertices[2].lat,this.vertices[2].lng,
          this.vertices[3].lat,this.vertices[3].lng
        );

      }

      if (this.polygon) {
        this.map.removeLayer(this.polygon);
      }

      this.polygon = L.polygon(this.vertices, { color: 'red' }).addTo(this.map);
    });

    this.map.on('contextmenu', () => {
      this.clearPolygon();
    });
  }

  obtenerEntero(numero:number) {
    let entero = Math.floor(numero);
    return entero;
  }



  clearPolygon() {
    this.vertices = [];

    if (this.polygon) {
      this.map.removeLayer(this.polygon);

    }
  }
  Logout(): void{
    sessionStorage.removeItem("sessionToken")
    this.redirigir('login')
  }

  redirigir(route:string){
    this.navControl.navigateRoot(route)
  }

  constructor(public navControl:NavController) {


   }

  ngOnInit() {
    this.initMap();

  }

}
