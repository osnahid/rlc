import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChantierService } from 'src/app/services/chantier.service';
import { Chantier } from 'src/app/interfaces/chantier';
import {MenuItem, MessageService} from 'primeng/api';


@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
  chantier: Chantier= new Chantier();
  info :{
    addD: boolean;
    addB: boolean;
    addE: boolean;
    addP: boolean;
    addEn: boolean;
    addR: boolean;
    addA: boolean;
    select: number;} = {
      addD: false,
      addB: false,
      addE: false,
      addP: false,
      addEn: false,
      addR: false,
      addA: false,
      select: 0,
  };
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/Chantiers"},
    {separator:true},
    {label:'maintenance des Engins',icon:'pi', items: [
      {label:'Reparation', icon:'pi', command: () => {
        this.info.addR = !this.info.addR;
      } },
      {label:'Entretien', icon:'pi', command: () => {
        this.info.addEn = !this.info.addEn;
      }}
    ]},
    
    {
      label:'Affectation',
      icon:'pi pi-plus',
      items:[
        {label:'Engins',icon:'pi custom-icon-engin', command: () => {
          this.info.addE = !this.info.addE;
        }},
        {label:'Personnels',icon:'pi pi-user-plus', command: () => {
          this.info.addP = true;
        }},
        {label:'Achat des materiaux',icon:'pi', command: () => {
          this.info.addA = !this.info.addA;
        }},
        {label:'Besoin transverses',icon:'pi', command: () => {
          this.info.addB = !this.info.addB;
        }}
      ]
    },
    {label:'ajouter decomptes',icon:'pi pi-plus',command: () => {
      this.info.addD = !this.info.addD;
    }}
  ];
  constructor(private router: Router,private route: ActivatedRoute,private apiCH: ChantierService,private message: MessageService) {
    
   }

  ngOnInit() {
    this.apiCH.currentChantier.subscribe(data => {
      if(data) this.chantier = data;
      else this.router.navigate(['/Chantiers']);
    });
    this.apiCH.currentInfo.subscribe(data => this.info = data);
    
  }
  fini(){
    this.chantier.etat = "fini";
      this.apiCH.editChantier(this.chantier).subscribe(
        data => this.message.add({
          severity:"succees",
          summary:"chantier est fini"
        })
      );
  }

  getChantier(id:string){
    this.apiCH.getChantier(id);
  }
  addDecomptes(added: boolean){
    this.getChantier(this.route.snapshot.params['id']);
      this.info.addD= !this.info.addD;
      this.info.select = 2;
  }
  addEngin(added: boolean){
    this.getChantier(this.route.snapshot.params['id']);
    this.info.addE = !this.info.addE;
    this.info.select = 4;
  }
  onUpdate(added:boolean){
    this.getChantier(this.route.snapshot.params['id']);
    if(added) this.getChantier(this.route.snapshot.params['id']);
  }
  addPersonnels(added:boolean){
    if(added) this.getChantier(this.route.snapshot.params['id']);
    this.info.addP = false;
    this.info.select = 3;
  }
  addAchat(added:boolean){
    this.getChantier(this.route.snapshot.params['id']);
    this.info.addA=!this.info.addA;
    this.info.select = 5;
  }
  addRepration(added:boolean){
    this.getChantier(this.route.snapshot.params['id']);
    this.info.addR=!this.info.addR;
    this.info.select = 6;
  }
  addEntretien(added:boolean){
    this.getChantier(this.route.snapshot.params['id']);
    this.info.addEn=!this.info.addEn;
    this.info.select = 6;
  }
  addBt(added:boolean){
    this.getChantier(this.route.snapshot.params['id']);
    this.info.addB=!this.info.addB;
    this.info.select = 1;
  }
}
