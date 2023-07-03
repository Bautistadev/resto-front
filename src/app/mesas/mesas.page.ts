import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import axios from 'axios';
import { QrCodeModule } from 'ng-qrcode';


interface users{
  id:Number,
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

interface table{
  id:Number,
  token:string,
  estado:boolean,
  empleado:{
    id:Number,
    userName:string
  }
}
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,QrCodeModule],

})


export class MesasPage implements OnInit {


  formularioNewTable:FormGroup;
  users:users[]=[];
  tables:table[]=[];
  table:any;
  qrCode:string = ""
  isAlertOpen=false;
  selectedValue: any;
  isButtonDisabled = true;
  crudOperation:string | undefined;
  isModalUpdateOpen:boolean = false;


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

  async retriveAllTable(){
    var table = await axios.get("http://localhost:8080/api/v1/Mesa/retriveAll",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })
   this.tables = table.data;
  }

  async saveTable(){

    var newTable: table ={
      estado:false,
      token:this.qrCode,
      empleado:{
        id:(this.formularioNewTable.value).empleado,
        userName:''
      },
      id:0

    };

    console.log(newTable)
    if(newTable.token !==''){
      await axios.post("http://localhost:8080/api/v1/Mesa/add",newTable,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
        }
      }).then((res)=>{
        if(res.status === 200){
          this.tables.push(res.data);
          this.formularioNewTable.reset();
        }
      }).catch(()=>{
        console.log("error")
      })
    }
  }

  updateButtonStatus() {
    // Verificar si hay una selección válida
    this.isButtonDisabled = !this.selectedValue;
  }

  generateCode(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    const codeLength = 21;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    this.qrCode = code

  }

  printQRCode() {
    window.print(); // Imprimir
  }

  setOpenAlert(status:boolean){
    this.isAlertOpen = status;
  }

  Logout(){
    sessionStorage.removeItem("sessionToken")
    this.redirigir('login')
  }

  setModalUpdateOpen(operation:string, mesa:table){

    this.table = mesa
    this.qrCode = mesa.token;
    this.crudOperation = operation;
    this.isModalUpdateOpen = true;
  }
  setModalUpdateClose(){
    this.isModalUpdateOpen=false;
  }


  customActionSheetOptions = {
    header: 'Empleados',
    subHeader: 'Selecciona el empleado',
  };

  constructor(public navControl:NavController,public pb:FormBuilder) {

    this.retriveAllEmployed()

    this.retriveAllTable()
//
  //  setInterval(()=>{
    //  this.retriveAllTable()
   // },5000)



    this.formularioNewTable = this.pb.group({
      'empleado':new FormControl("",Validators.required),
    })
   }

  ngOnInit() {
  }

}
