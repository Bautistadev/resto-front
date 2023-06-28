import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import axios from 'axios'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  isAlertOpen=false;


  setOpenAlert(status:boolean){
    this.isAlertOpen = status;
  }


  async login(){
    //TRAEMOS VALORES DEL FOMULARIO
    var sessionCredential = this.formularioLogin.value;

    await axios.post('http://localhost:8080/security/login',{
      userName:sessionCredential.usuario,
      password:sessionCredential.password
    }).then((res)=>{

        //SI LA SESSION INICIO
        sessionStorage.setItem('sessionToken',res.data.access_token);
        //VALIDAMOS EL TOKEN
        this.navControl.navigateRoot('inicio')

    }).catch((res)=>{
      this.setOpenAlert(true)
    })
  }



  constructor(public pb:FormBuilder,public navControl:NavController) {

   this.formularioLogin = this.pb.group({
    'usuario': new FormControl("",Validators.required),
    'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

}
