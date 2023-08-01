import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import axios from 'axios';

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
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class EmpleadosPage implements OnInit {

  users:users[]=[];
  formularioNewEmployed: FormGroup;
  isAlertOpen=false;
  selectedUser:any;
  isModalUpdateOpen = false;
  crudOperation:string | undefined;




  async saveEmployed(){

    var employedData = this.formularioNewEmployed.value;

    employedData
    //TRANFORMAMOS EL ID PARA QUE SEA IGUAL A LA PROPORCIONADA POR LA INTERFACE USUARIO
    if(employedData.rol == 1){
      employedData.rol = {id:employedData.rol,rol:"ROLE_ADMIN"}
    }else{
      employedData.rol = {id:employedData.rol,rol:"ROLE_USER"}
    }

    console.log(employedData)

    //GUARDAMOS AL NUEVO EMPLEADO
    await axios.post("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Empleado/add",{employedData,foto:null},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    }).then((res)=>{
      if(res.status === 200){
        this.users.push(res.data);
        this.formularioNewEmployed.reset();
      }

    })

  }

  async updateEmployed(){
    var employedData = this.formularioNewEmployed.value;
    console.log(employedData)
  }
  async retriveAllEmployed(){
    var employed = await axios.get("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Empleado/retiveAll",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })
    employed.data.map((e:any)=>{
      this.users.push(e)
    })
  }

  //funcion que valida las contraseñas
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
  setOpenAlert(status:boolean){
    this.isAlertOpen = status;
  }


   //Funcion que cambia el estado de la bandera
  setModalUpdateOpen(user:users,operation:string){
    this.selectedUser = user;
    this.crudOperation = operation;
    this.isModalUpdateOpen = true;
  }
  setModalUpdateClose(){
    this.isModalUpdateOpen=false;
  }

  redirigir(route:string){
    this.navControl.navigateRoot(route)
  }
  constructor(public pb:FormBuilder,public navControl:NavController) {
    this.retriveAllEmployed()

    this.formularioNewEmployed = this.pb.group({
      'userName': new FormControl("",Validators.required),
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'dni':["",[Validators.required,Validators.minLength(8)]],
      'rol':new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmPassword':new FormControl("",Validators.required)
    },{
      validator:this.passwordMatchValidator
    })
  }

  ngOnInit() {
  }

}
