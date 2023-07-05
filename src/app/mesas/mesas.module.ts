import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MesasPage } from './mesas.page';
import { MesasPageRoutingModule } from './Mesas-Routing.module';
import {QrCodeModule} from 'ng-qrcode'





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesasPageRoutingModule,MesasPage,
    QrCodeModule,


  ],

})
export class MesasPageModule {}
