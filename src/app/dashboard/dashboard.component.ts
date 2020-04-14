import { Component } from '@angular/core';
import { ChantierService } from '../services/chantier.service';
import { AppelOffreService } from '../services/appel-offre.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  items: {des:string;src:string;a:string;action?: ()=> void }[]=[
    {des:"Ouvrages",src:"assets/images/icons/ouvrages.png",a:"/Ouvrages",action: ()=>{}},
    {des:"Personnels",src:"assets/images/icons/personnels.png",a:"/Personnels",action: ()=>{}},
    {des:"Parc",src:"assets/images/icons/engin.png",a:"/Engins",action: ()=>{}},
    {des:"Materiaux",src:"assets/images/icons/materielles.png",a:"/Materials",action: ()=>{}},
    {des:"appel offres",src:"assets/images/icons/appelOffre.png",a:"/AppelOffres",action: ()=>{}},
    {des:"ajouter une etude du prix",src:"assets/images/icons/etudePrix.png",a:"/AppelOffres",action: ()=>{
      this.aoApi.setInfo({displayAL:false,displayAEP:true,displayIC:false,select:3});
    }},
    {des:"ajouter une soumission",src:"assets/images/icons/soumission.png",a:"/AppelOffres",action: ()=>{
      this.aoApi.setInfo({displayAL:true,displayAEP:false,displayIC:false,select:2});
    }},
    {des:"chantier",src:"assets/images/icons/chantier.png",a:"/Chantiers",action: ()=>{}},
    {des:"ajouter des reparations",src:"assets/images/icons/repairs.png",a:"/Chantiers",action: ()=>{
      this.chApi.setInfo({addD: false, addB: false, addE: false, addP: false, addEn: false, addR: true, addA: false, select: 6});
    }},
    {des:"ajouter des entretiens",src:"assets/images/icons/maintenance.png",a:"/Chantiers",action: ()=>{
      this.chApi.setInfo({addD: false, addB: false, addE: false, addP: false, addEn: true, addR: false, addA: false, select: 6});
    }},
    {des:"ajouter des decomptes",src:"assets/images/icons/decomptes.png",a:"/Chantiers",action: ()=>{
      this.chApi.setInfo({addD: true, addB: false, addE: false, addP: false, addEn: false, addR: false, addA: false, select: 2});
    }},
    {des:"Ajouter des achat des materiaux",src:"assets/images/icons/materielles.png",a:"/Chantiers",action: ()=>{
      this.chApi.setInfo({addD: false, addB: false, addE: false, addP: false, addEn: false, addR: false, addA: true, select: 5});
    }}
  ]; 
  constructor(private chApi: ChantierService,private aoApi: AppelOffreService) {}
}
