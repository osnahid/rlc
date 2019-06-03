import { Component, OnInit } from '@angular/core';
import { Categorie } from '../interfaces/categorie';
import { CategorieService } from '../services/categorie.service';
import { OuvrageService } from '../services/ouvrage.service';
import { Ouvrage } from '../interfaces/ouvrage';

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
  constructor(private categorieService : CategorieService, private ouvrageService : OuvrageService) { }
  addO(){
    this.ouvrageService.addOuvrage(this.ouvrage.categorie.idCategorie,this.ouvrage).subscribe(data => this.refresh());
    this.ouvrage = new Ouvrage();
    this.displayO = false;
  }
  addC(){
    this.categorieService.addCategorie(this.categorie).subscribe(data => this.refresh());
    this.categorie = new Categorie();
    this.displayC = false;
  }
  refresh(){
    this.categorieService.getCategories().subscribe(data => this.categories = data);
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

}
