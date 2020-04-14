import { Component, OnInit } from '@angular/core';
import { AppelOffreService } from '../services/appel-offre.service';
import { AppelOffre } from '../interfaces/appel-offre';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-appel-offres',
  templateUrl: './appel-offres.component.html',
  styleUrls: ['./appel-offres.component.css'],
  providers: [MessageService]
})
export class AppelOffresComponent implements OnInit {
  appelOffre: AppelOffre=new AppelOffre();
  appelOffres: AppelOffre[];
  cols: any[];
  display=false;
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"ajouter un appel offre",icon:"pi pi-plus",command: () => this.display = !this.display}
  ];
  constructor(private aos: AppelOffreService, private router: Router,private message: MessageService) { }
  
  ngOnInit() {
    this.getAO();
    this.cols = [
      { field: 'numAO', header: 'numero' },
      { field: 'objet', header: 'objet' },
      { field: 'dateAO', header: 'date' },
      { field: 'localisation', header: 'maître d\'ouvrage' }
    ];
  }
  getAO(){
    this.aos.getAllAO().subscribe(data => this.appelOffres = data);
  }
  onRowSelect(event){
    this.aos.getAOS(event.data.numAO);
  }
  onRowDelete(_ao:AppelOffre){
    this.message.add({key: 'c', sticky: true, severity:'warn', summary:'vous etes sure que vous voulez supprimer cet appel d\'offre ?', detail:'toutes informations liees a cet appel offre sera supprimer, ainsi que pour le chantier lie a cet appel offre!!',data:_ao.numAO});

  }
  onConfirm(_ao:string){
    console.log(_ao);
    this.aos.deleteAo(_ao).subscribe(
      data => {
        this.message.add({severity:"success",summary:"l'appel d'offre numero "+_ao+" a ete supprimé!!!"});
        this.getAO();
      }, error => {
        this.message.add({severity:"success",summary:"l'appel d'offre numero "+_ao+" n'a pas ete supprimé!!!"});
      }
    );
    this.message.clear('c');
  }
  onReject(){
    this.message.clear('c');
  }
  addAo(){
    this.aos.addAo(this.appelOffre).subscribe(data => {
      this.getAO();
      this.message.add({severity:"success",summary:"l'appel d'offre numero : "+data.numAO+" a été ajouté"});
    },error=>{
      this.message.add({severity:"error",summary:"l'appel d'offre numero : "+this.appelOffre.numAO+" n'a pas été ajouté"});
    }
    );
    this.appelOffre = new AppelOffre();
    this.display = false;
    
  }
}
