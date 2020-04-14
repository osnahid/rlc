import { Component, OnInit } from '@angular/core';
import { EnginService } from '../services/engin.service';
import { Engin } from '../interfaces/engin';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

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
  clonedEngin: Engin[]=[];
  addC: boolean=false;
  addV: boolean=false;
  addI: boolean=false;
  addE: boolean=false;
  showf: boolean=false;
  edit: boolean=false;
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un engin",icon:"pi pi-plus",command: () =>{
      this.showf=!this.showf;
    }}
  ];
  cols: any[]=[
    { field: 'designation', header: 'designation' },
    { field: 'caratrestique', header: 'caratrestique' },
    { field: 'prixLocation', header: 'prixLocation' },
    { field: 'poids', header: 'poids' },
    { field: 'consommationH', header: 'consommationH' },
    { field: 'prixAchat', header: 'prixAchat' },
  ];
  constructor(private api:EnginService,private router: Router) { }

  ngOnInit() {
    this.api.getEnginCamion().subscribe(data => this.enginCamion = data);
    this.api.getEnginExterne().subscribe(data => this.enginExtern = data);
    this.api.getEnginInterne().subscribe(data => this.enginIntern = data);
    this.api.getEnginVehicule().subscribe(data => this.enginVehicule = data);
  }

  onRowEditSave(){
    this.api.editEngin(this.engina).subscribe(data => console.log(data),error => console.log(error));
    this.edit = false;
  }
  onRowSelect(event) {
    this.router.navigate(['Engins/'+event.data.idEngin]);
  }
  onRowEditInit(engin: Engin){
    this.engina = engin;
    this.edit = true;
  }
  onRowEditCancel(){
    this.engina = new Engin();
    this.edit = false;
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
  check(i:string){
    if(i === "interne"){ 
      this.addI=true;
      this.addE=false;
      this.addC=false;
      this.addV=false;
    }
    if(i === "camion"){ 
      this.addC=true;
      this.addE=false;
      this.addI=false;
      this.addV=false;
    }
    if(i === "extern"){ 
      this.addE=true;
      this.addI=false;
      this.addC=false;
      this.addV=false;
    }
    if(i === "vehicule"){ 
      this.addV=true;
      this.addE=false;
      this.addC=false;
      this.addI=false;
    }
  }
}
