import { Component, OnInit } from '@angular/core';
import { Categorie } from '../interfaces/categorie';
import { CategorieService } from '../services/categorie.service';
import { OuvrageService } from '../services/ouvrage.service';
import { Ouvrage } from '../interfaces/ouvrage';
import { MenuItem, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ouvrages',
  templateUrl: './ouvrages.component.html',
  styleUrls: ['./ouvrages.component.css']
})

export class OuvragesComponent implements OnInit {
  ouvrage: Ouvrage = new Ouvrage();
  categorie: Categorie = new Categorie();
  displayO = false;
  displayC = false;
  categories: Categorie[];
  cols: any[];
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter une categorie",icon:"pi pi-plus",command: () =>{
      this.showDialogC();
    }},
    {label:"Ajouter un ouvrages",icon:"pi pi-plus",command: () =>{
      this.showDialogO();
    }},
  ];
  constructor(private cs : CategorieService, private os : OuvrageService, private message : MessageService) { }
  addO(){
    this.os.addOuvrage(this.ouvrage.categorie.idCategorie,this.ouvrage).subscribe(data => {this.refresh();
      this.message.add(
        {severity:"succes", summary:"l'ouvrage a été enregistré"}
      );
    },
    error=>{
      this.message.add(
        {severity:"eroor", summary:"l'ouvrage n'a pas été enregistré",detail:"verifié votre donnée"}
      );
    });
    this.ouvrage = new Ouvrage();
    this.displayO = false;
  }
  addC(form: NgForm){
    this.categorie.designation = form.control.controls['designationC'].value;    
    this.cs.addCategorie(this.categorie).subscribe(data => {this.refresh();
      this.message.add(
        {severity:"succes", summary:"la categorie a été enregistré"}
      );
    },
    error=>{
      this.message.add(
        {severity:"eroor", summary:"la categorie n'a pas été enregistré",detail:"verifié votre donnée"}
      );
    });
    this.categorie = new Categorie();
    this.displayC = false;
  }
  refresh(){
    this.cs.getCategories().subscribe(data => this.categories = data);
  }
  ngOnInit() {
    this.refresh();
    this.cols = [
      { field: 'designation', header: 'designation' },
      { field: 'unite', header: 'unite' },
      { field: 'prixU', header: 'prix unitaire' },
      { field: 'prixV', header: 'prix vente' }
  ];
  }
  uniteGroups = [
    {
      label: "unite",
      items: [
        {label: "U",value: "U"},
        {label: "",value: ""}
      ]
    },
    {
      label: "Masse",
      items: [
        {label: "kg",value: "kg"},
        {label: "t",value: "t"}
      ]
    },
    {
      label: "Distance",
      items: [
        {label: "km",value: "km"},
        {label: "m",value: "m"}
      ]
    },
    {
      label: "Volume",
      items: [
        {label: "m³",value: "m³"},
        {label: "ml",valeu: "ml"}
      ]
    }, 
    {
      label: "Superficie",
      items: [
        {label: "m²",value: "m²"}
      ]
    }   
  ];
  showDialogO(){
    this.displayO = true;
  }
  showDialogC(){
    this.displayC = true;
  }
  onRowDelete(ouv: Ouvrage){
    this.os.deleteOuvrage(ouv.idOuvrage).subscribe(data => {
      this.message.add({
        severity:"succes",
        summary:"l'ouvrage a été supprimé"
      });
      this.refresh();
    },
      error =>{
        this.message.add({
          severity:"error",
          summary:"l'ouvrage n'a pas été supprimé",
          detail:"il est déjà utilisé dans une soumission où une etude de prix"
        });
    });
  }
  
}
