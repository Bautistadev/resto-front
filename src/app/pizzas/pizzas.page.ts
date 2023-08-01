import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import axios from 'axios';


interface pizza{
  id:Number,
  nombre:string,
  descripcion:string,
  precio:Float32Array,
  dateCreated:string,
  dateDeleted:string,
  categoria:{
    id:Number,
    categoria:string
  }
}

interface bebida{
    id: Number,
    nombre: string,
    descripcion: string,
    dateCreated: string,
    dateDeleted: string,
    marca: {
      id: Number,
      nombre: string
    },
    precio: Float32Array

}

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.page.html',
  styleUrls: ['./pizzas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,EditorModule]
})
export class PizzasPage implements OnInit {

  formularioNewPizza:FormGroup;
  formularioNewBebida:FormGroup;
  pizzas:pizza[]=[];
  bebidas:bebida[]=[];


  async savePizza(){


    var pizzaData = this.formularioNewPizza.value

    pizzaData.categoria = {id:pizzaData.categoria};



    await axios.post("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Plato/addPlato",pizzaData,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    }).then((e)=>{
      if(e.status == 200){
        console.log("Guardado exitoso")
        this.pizzas.push(e.data)
        this.formularioNewPizza.reset();
      }
    })
  }

  async retriveAllPizzas(){
    var pizza = await axios.get("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Plato/retriveAllPlato",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })
    this.pizzas = pizza.data;
  }

  async retriveAllBebidas(){
    var bebida = await axios.get("http://192.168.100.30:8080/resto-0.0.1-SNAPSHOT/api/v1/Plato/retriveAllBebida",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`  // Ejemplo de encabezado de autorización
      }
    })
    this.bebidas = bebida.data;
  }

  redirigir(route:string){
    this.navControl.navigateRoot(route)
  }


  constructor(public navControl:NavController, public pb:FormBuilder) {

    this.retriveAllPizzas();
    this.retriveAllBebidas();

    this.formularioNewPizza = this.pb.group({
      'nombre': new FormControl("",Validators.required),
      'descripcion': new FormControl("",Validators.required),
      'categoria': new FormControl("",Validators.required),
      'precio': new FormControl("",Validators.required)
    })

    this.formularioNewBebida = this.pb.group({
      'nombre': new FormControl("",Validators.required),
      'descripcion': new FormControl("",Validators.required),
      'marca': new FormControl("",Validators.required),
      'precio': new FormControl("",Validators.required)

    })
   }


  ngOnInit() {
  }

}
