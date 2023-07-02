import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MarcasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
