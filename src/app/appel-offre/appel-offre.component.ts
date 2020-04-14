import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppelOffre } from '../interfaces/appel-offre';
import { AppelOffreService } from '../services/appel-offre.service';
import { InstallationChantier } from '../interfaces/installation-chantier';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-appel-offre',
  templateUrl: './appel-offre.component.html',
  styleUrls: ['./appel-offre.component.css']
})
export class AppelOffreComponent implements OnInit {
  ao: AppelOffre = new AppelOffre();
  modIc:boolean= false;
  info:{displayAL:boolean;displayAEP:boolean;displayIC:boolean;select:number};
  ic: InstallationChantier = new InstallationChantier();
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/AppelOffres"},
    {separator:true},
    {label:"instalation chantier",icon:"pi pi-plus",command: () =>{
      this.info.displayIC=!this.info.displayIC;
      this.info.select=1;
      this.ic = new InstallationChantier();
    }},
    {label:"Soumission",icon:"pi",items:[
      {label:"insertion",icon:"pi pi-plus",command: () =>{
        this.info.displayAL=!this.info.displayAL;
        this.info.select=2;
      }},
      {label:"telecharger",icon:"pi pi-download",url: "http://localhost:8080/AppelOffres/"+this.route.snapshot.params['id']+"/soumissionDownload"}
    ]},
    {label:"etude de prix",icon:"pi",items:[
      {label:"insertion",icon:"pi pi-plus",command: () =>{
        this.info.displayAEP=!this.info.displayAEP;
        this.info.select=3;
      }}]},
    
  ];
  constructor(private route: ActivatedRoute, private router: Router,private aos: AppelOffreService,private message : MessageService) { }
  ngOnInit() {
    this.aos.info.subscribe(data => this.info = data);
    this.aos.currentAO.subscribe(data => {
      if(data) this.ao = data;
      else this.router.navigate(['/AppelOffres']);
    });
  }
  addIC(){
    if(this.ic) {
      this.aos.addIc(this.ic,this.ao.numAO).subscribe(data => {
        this.getAO(this.ao.numAO);
        this.message.add({
          severity:"success",
          summary:"l'installation chantier "+this.ic.designation+" a été ajouté !"
        });
        this.info.displayIC=false;
        this.info.select=1;
      },error => {
        this.message.add({
          severity:"error",
          summary:"l'installation chantier "+this.ic.designation+" n'a pas été ajouté !"
        });
        this.info.displayIC=false;
        this.info.select=1;
      });
    }
    this.ic = new InstallationChantier(); 
  }
  modIC(i: InstallationChantier){
    this.modIc=!this.modIc;
    this.ic = i;
  }
  deleteIc(i: InstallationChantier){
    this.aos.deleteIc(i).subscribe(data => {
      this.getAO(this.ao.numAO);
      this.message.add({
        severity:"info",
        summary:"installation du chantier a été supprimer"
      });
    });
  }
  cancelModIc(){
    this.modIc = !this.modIc;
    this.ic = new InstallationChantier();
  }
  saveModIc(){
    this.aos.editIc(this.ic,this.ao.numAO).subscribe(data => {
      this.getAO(this.ao.numAO);
      this.message.add({
        severity:"success",
        summary:"l'installation chantier "+this.ic.designation+" a été modifié !"
      });
      this.modIc=false;
    },error=>{
      this.message.add({
        severity:"error",
        summary:"l'installation chantier "+this.ic.designation+" n'a pas été modifié !"
      });
      this.modIc=false;
    });
  }
  
  getAO(id: string){
    this.aos.getAO(id);
  }
  getTotalInsC(): number{
    let t:number=0;
    this.ao.ic.forEach(
      (value)=>{
        t += value.montant;
      }
    );
    return t;
  }
  onAdded(added: boolean){
    if(added) this.getAO(this.ao.numAO);
  }
  addS(added: boolean){
    if(added) {
      this.getAO(this.ao.numAO);
      this.info.displayAL=!this.info.displayAL;
    }
  }
  addEP(added: boolean){
    if(added) {
      this.getAO(this.ao.numAO);
      this.info.displayAEP=!this.info.displayAEP;
      this.message.add({
        severity:"success",
        summary:"l'etude de prix a été ajouté"
      });
    }else{
      this.message.add({
        severity:"error",
        summary:"l'etude de prix n'a pas été ajouté",
        detail:"verifiez les champs entrer"
      });
      this.info.displayAEP=!this.info.displayAEP;
    }
  }
}
