import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PizzasPage } from './pizzas.page';
import { PizzasPageRoutingModule } from './Pizzas-Routing.module';
import {QrCodeModule} from 'ng-qrcode'
import {EditorModule} from '@tinymce/tinymce-angular'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzasPageRoutingModule,PizzasPage,
    QrCodeModule,
    EditorModule

  ],

})
export class PizzasPageModule {}
