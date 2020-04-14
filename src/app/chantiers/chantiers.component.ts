import { Component, OnInit } from '@angular/core';
import { ChantierService } from '../services/chantier.service';
import { Chantier } from '../interfaces/chantier';
import { AppelOffreService } from '../services/appel-offre.service';
import { AppelOffre } from '../interfaces/appel-offre';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-chantiers',
  templateUrl: './chantiers.component.html',
  styleUrls: ['./chantiers.component.css'],
  providers: [MessageService]
})

export class ChantiersComponent implements OnInit {
  cols:any[] = [
    { field: 'numCh', header: 'numCh' },
    { field: 'date', header: 'Date' },
    { field: 'aoc.localisation', header: 'maitre d\'ouvrage' },
    { field: 'aoc.numAO', header: 'AppelOffre' },
    { field: 'aoc.estimation', header: 'Estimation' }
  ];
  chantierEnCours: Chantier[] = [];
  chantierFini: Chantier[] = [];
  chantier: Chantier= new Chantier();
  aos: AppelOffre[] = [];
  addC: boolean = false;
  editC: boolean = false;
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"ajouter un chantier",icon:"pi pi-plus",command: () => this.onAdd()}
  ];
  
  constructor(private api: ChantierService, private apiAo: AppelOffreService,private messageService: MessageService) { }

  ngOnInit() {
    this.getCh();
  }

  onRowSelect(event){
    this.api.getChantierR(event.data.numCh);
  }

  getCh(){
    this.chantierEnCours=[];
    this.chantierFini=[];
    this.apiAo.getAllAO().subscribe(data =>{ 
      let a : AppelOffre[]= [];
      data.forEach(
      (value)=>{
        if(!value.ch) a.push(value);
      }
    );
    this.aos = a;
  });
    this.api.getChantiers().subscribe(data => data.forEach(
      (value)=>{
        if(value.etat == "enCours")
          this.chantierEnCours.push(value);
        else
          this.chantierFini.push(value);
      }
    ));
  }

  add(){
    if(this.chantier){
      this.api.addChantier(this.chantier).subscribe(data => {
        this.getCh();
        this.messageService.add({severity:'success', summary: '', detail:'le Chantier numero: '+ data.numCh +' a été enregistré'});
      } );
      this.addC = !this.addC;
      this.chantier = new Chantier();
    }
  }

  edit(){
    if(this.chantier){
      this.api.editChantier(this.chantier).subscribe(data => 
        {
          this.getCh();
          this.messageService.add({severity:'success', summary: '', detail:'le Chantier numero: '+ data.numCh +' a été modifié'});
        } );
      this.chantier = new Chantier();
      this.editC = !this.editC;
    }
  }

  cancelAdd(){
    this.chantier = new Chantier();
    this.addC = !this.addC;
  }

  cancelEdit(){
    this.chantier = new Chantier();
    this.editC = !this.editC;
  }
  
  onAdd(){
    this.chantier = new Chantier();
    
    this.addC = !this.addC;
  }

  onRowEdit(ch: Chantier){
    this.chantier = ch;
    
    this.editC = !this.editC;
  }
  onRowDelete(chantier: Chantier){
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary: '', detail:'voulez-vous supprimé le Chantier numero: '+ chantier.numCh,data: chantier});
  }
  onConfirmDelete(chantier: Chantier){
    this.api.deleteChantier(chantier.numCh).subscribe(data => this.getCh());
  }
  onReject(){
    this.messageService.clear('c');
  }

}
