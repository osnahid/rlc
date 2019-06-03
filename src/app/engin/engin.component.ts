import { Component, OnInit } from '@angular/core';
import { EnginService } from '../services/engin.service';
import { Engin } from '../interfaces/engin';

@Component({
  selector: 'app-engin',
  templateUrl: './engin.component.html',
  styleUrls: ['./engin.component.css']
})
export class EnginComponent implements OnInit {
  enginIntern: Engin[];
  enginExtern: Engin[];
  enginCamion: Engin[];
  enginVehicule: Engin[];
  engina: Engin = new Engin();
  addC: boolean=false;
  addV: boolean=false;
  addI: boolean=false;
  addE: boolean=false;
  constructor(private api:EnginService) { }

  ngOnInit() {
    this.api.getEnginCamion().subscribe(data => this.enginCamion = data);
    this.api.getEnginExterne().subscribe(data => this.enginExtern = data);
    this.api.getEnginInterne().subscribe(data => this.enginIntern = data);
    this.api.getEnginVehicule().subscribe(data => this.enginVehicule = data);
  }

  onRowEditSave(engin: Engin){
    this.api.editEngin(engin).subscribe(data => console.log(data));
  }
  onRowEditInit(engin: Engin){

  }
  onRowEditCancel(engin: Engin, i: number){

  }
  addExtern(){
    if(this.engina){
      this.api.addEnginExterne(this.engina).subscribe(data => this.enginExtern.push(data));
    }
    this.engina = new Engin();
    this.addE = false;
  }
  addIntern(){
    if(this.engina){
      this.api.addEnginInterne(this.engina).subscribe(data => this.enginIntern.push(data));
    }
    this.engina = new Engin();
    this.addI = false;
  }
  addCamion(){
    if(this.engina){
      this.api.addEnginCamion(this.engina).subscribe(data => this.enginCamion.push(data));
    }
    this.engina = new Engin();
    this.addC = false;
  }
  addVehicule(){
    if(this.engina){
      this.api.addEnginVehicule(this.engina).subscribe(data => this.enginVehicule.push(data));
    }
    this.engina = new Engin();
    this.addV = false;
  }

}
