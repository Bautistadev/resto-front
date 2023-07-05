import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GeolocalizacionPage } from './geolocalizacion.page';
import { GeolocalizacionPageRoutingModule } from './Geolocalizacion-Routing.module';
import {QrCodeModule} from 'ng-qrcode'

import * as L from 'leaflet';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocalizacionPageRoutingModule,GeolocalizacionPage,
    QrCodeModule,

  ],

})
export class GeolocalizacionPageModule {}
