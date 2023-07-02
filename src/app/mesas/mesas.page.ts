import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import axios from 'axios';
import { QrCodeModule } from 'ng-qrcode';





interface users{
  id:Number
  userName:string,
  nombre:string,
  apellido:string,
  dni:Number,
  password:string,
  rol:{
    id:Number,
    rol:string
  }
}

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,QrCodeModule],

})


export class MesasPage  {


  formularioNewTable:FormGroup;
  users:users[]=[];
  qrCode:string = ""

   redirigir(route:string){
    this.navControl.navigateRoot(route)
  }

  async retriveAllEmployed(){
    var employed = await axios.get("http://localhost:8080/api/v1/Empleado/retiveAll",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })
    employed.data.map((e:any)=>{
      this.users.push(e)
    })
  }

  generateCode(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    const codeLength = 32;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    this.qrCode = code

  }

  customActionSheetOptions = {
    header: 'Empleados',
    subHeader: 'Selecciona el empleado',
  };

  constructor(public navControl:NavController,public pb:FormBuilder) {

    this.retriveAllEmployed()

    this.formularioNewTable = this.pb.group({
      'token':new FormControl("",Validators.required),
      'estado':new FormControl("",Validators.required),
      'empleado': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

}
