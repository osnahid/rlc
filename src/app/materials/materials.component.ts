import { Component, OnInit } from '@angular/core';
import { Materiel } from '../interfaces/materiel';
import { MaterielService } from '../services/materiel.service';
import { CategorieMateriel } from '../interfaces/categorie-materiel';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  materials: Materiel[];
  categories: CategorieMateriel[];
  mat: Materiel= new Materiel();
  cm: CategorieMateriel= new CategorieMateriel();
  cols: any[]=[
    { field: 'designation', header: 'designation' },
    { field: 'prix', header: 'Prix' },
    { field: 'cm.designation', header: 'Categorie' },
  ];
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un material",icon:"pi pi-plus",command: () =>{
      this.addm=true;
    }},
    {label:"Ajouter une categorie",icon:"pi pi-plus",command: () =>{
      this.addcm=true;
    }}
  ];
  addm: boolean= false;
  addcm: boolean=false;
  constructor(private ms: MaterielService,private message : MessageService) {

   }

  ngOnInit() {
    this.ms.getMateriel().subscribe(data => this.materials = data);
    this.ms.getCatMat().subscribe(data => this.categories = data);
  }
  addMat(){
    if(this.mat){
      this.ms.addMateriel(this.mat).subscribe(data => {this.materials.push(data);
        this.message.add({severity:"success",summary:"material a été ajouté"});
      },error => this.message.add({severity:"error",summary:"material n'a pas été ajouté"}));
    }
    this.addm = !this.addm;
    this.mat = new Materiel();
  }
  onRowDelete(materiel: Materiel){
    this.ms.deleteMateriel(materiel).subscribe(
      data => {this.message.add({severity:"success",summary:"material a été supprimé"});
      this.ms.getMateriel().subscribe(data => this.materials = data);
    },error => this.message.add({severity:"error",summary:"material n'a pas été supprimé"})
    );
  }
  onUpdate(materiel: Materiel){
    this.ms.editMateriel(materiel).subscribe();
  }
  cancel(){
    this.addm = false;
    this.mat = new Materiel();
  }
  cancelCm(){
    this.addcm = false;
    this.cm = new CategorieMateriel();
  }
  addCatMat(){
    this.ms.addCatMat(this.cm).subscribe(
      data => {
        this.message.add({severity:"success",summary:"la categorie a été bien enregistré"});
        this.cm = new CategorieMateriel();
        this.ms.getCatMat().subscribe(data => this.categories = data);
        this.addcm = false;
      },
      error =>{
        this.addcm = false;
        this.message.add({severity:"error",summary:"la categorie n'a pas été enregistré",detail:"verifier les donnees entrées"});
      }
    );
  }
}
