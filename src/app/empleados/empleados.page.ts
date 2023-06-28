import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import axios from 'axios';

interface users{
  id:Number
  userName:string,
  nombre:string,
  apellido:string,
  dni:Number,
  rol:{
    id:Number,
    rol:string
  }
}
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EmpleadosPage implements OnInit {

  users:users[]=[];

  async retriveAllEmployed(){
    var employed = await axios.get("http://localhost:8080/api/v1/Empleado/retiveAll",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })
    employed.data.map((e:any)=>{
      this.users.push(e)
      console.log(e)
    })
  }


  constructor() {
    this.retriveAllEmployed()
  }

  ngOnInit() {
  }

}
