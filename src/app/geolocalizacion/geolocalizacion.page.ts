import { Component, OnInit, ViewChild, ElementRef,Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,NgForm } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import * as L from 'leaflet';
import { booleanPointInPolygon } from '@turf/turf';
import axios from 'axios';

interface vertice{
  lat:number,
  lng:number
}
interface Geolocalizacion{
  id:number,
  x1:number,
  x2:number,
  x3:number,
  x4:number,
  y1:number,
  y2:number,
  y3:number,
  y4:number,
}

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})

export class GeolocalizacionPage implements OnInit {

  map!: L.Map;
  polygon!: L.Polygon;
  polygonDB!:L.Polygon;
  vertices: L.LatLng[] = [];
  verticesFront:vertice[]=[];
  idGeo!:number;
  nombre:string = "juan"

//  dataForm!:Geolocalizacion;
  private isMouseDown = false;


  async retriveAll(){
    var coordenadasDB = await axios.get("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Geolocalizacion/retriveAll",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })

    this.idGeo = coordenadasDB.data[0].id;
    var verticesFrontDB=[
      {lat:(coordenadasDB.data)[0].x1,lng:(coordenadasDB.data)[0].y1},
      {lat:(coordenadasDB.data)[0].x2,lng:(coordenadasDB.data)[0].y2},
      {lat:(coordenadasDB.data)[0].x3,lng:(coordenadasDB.data)[0].y3},
      {lat:(coordenadasDB.data)[0].x4,lng:(coordenadasDB.data)[0].y4}];


      this.polygonDB = L.polygon(verticesFrontDB, { color: "blue" }).addTo(this.map);
      this.verticesFront = verticesFrontDB

  }

  async update(){

    var verticesUpdate={
      id:this.idGeo,
      x1:this.verticesFront[0].lat,
      x2:this.verticesFront[1].lat,
      x3:this.verticesFront[2].lat,
      x4:this.verticesFront[3].lat,
      y1:this.verticesFront[0].lng,
      y2:this.verticesFront[1].lng,
      y3:this.verticesFront[2].lng,
      y4:this.verticesFront[3].lng,
    }
    console.log(verticesUpdate)

    await axios.put("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Geolocalizacion/update",verticesUpdate,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    }).then((e)=>{
      this.clearPolygon(this.polygonDB)
      this.clearPolygon(this.polygon)
      this.retriveAll()
    })
  }

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
        this.verticesFront = this.vertices

      }

      if (this.polygon) {
        this.map.removeLayer(this.polygon);
      }

      this.polygon = L.polygon(this.vertices, { color: "red" }).addTo(this.map);

    });

    this.map.on('contextmenu', () => {
      this.clearPolygon(this.polygon);
    });

    this.map.on('mousedown', () => {
      this.isMouseDown = true;
      this.updateCursor();
    });

    this.map.on('mouseup', () => {
      this.isMouseDown = false;
      this.updateCursor();
    });

    this.map.on('mouseover', () => {
      this.updateCursor();
    });

    this.map.on('mouseout', () => {
      this.updateCursor();
    });
  }


  updateCursor() {
    if (this.isMouseDown) {
      this.renderer.addClass(this.map.getContainer(), 'grabbing-cursor');
      this.renderer.removeClass(this.map.getContainer(), 'map-cursor');
    } else {
      this.renderer.removeClass(this.map.getContainer(), 'grabbing-cursor');
      this.renderer.addClass(this.map.getContainer(), 'map-cursor');
    }
  }

  clearPolygon(polygon:any ) {
    this.vertices = [];
    this.verticesFront=[{lat:0,lng:0},{lat:0,lng:0},{lat:0,lng:0},{lat:0,lng:0}];
    if (this.polygon) {
      this.map.removeLayer(polygon);

    }
  }
  Logout(): void{
    sessionStorage.removeItem("sessionToken")
    this.redirigir('login')
  }

  redirigir(route:string){
    this.navControl.navigateRoot(route)
  }


  constructor(public navControl:NavController,private renderer: Renderer2,public pb:FormBuilder) {
    this.verticesFront.push({lat:0,lng:0},{lat:0,lng:0},{lat:0,lng:0},{lat:0,lng:0});

    this.retriveAll()


   }

  ngOnInit() {
    this.initMap();
  }

}
