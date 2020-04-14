import { Component, OnInit } from '@angular/core';
import { ChantierService } from 'src/app/services/chantier.service';
import { Reparation } from 'src/app/interfaces/reparation';
import { Entretien } from 'src/app/interfaces/entretien';
import { MessageService } from 'primeng/api';
import { Chantier } from 'src/app/interfaces/chantier';
import { Calendar } from 'primeng/primeng';

@Component({
  selector: 'app-list-maintenance',
  templateUrl: './list-maintenance.component.html',
  styleUrls: ['./list-maintenance.component.css']
})
export class ListMaintenanceComponent implements OnInit {

  reparations: Reparation[]=[];
  entretiens: Entretien[]=[];

  colsE: any[]=[
    { field: 'designation', header: 'Designation' },
    { field: 'date', header: 'date' },
    { field: 'pu', header: 'montant' }
  ];
  colsR: any[]=[
    { field: 'designation', header: 'Designation' },
    { field: 'date', header: 'date' },
    { field: 'pu', header: 'montant' }
  ];


  constructor(private chApi: ChantierService, private message: MessageService) { }

  chantier= new Chantier();
  ngOnInit() {
    this.chApi.currentChantier.subscribe(
      data =>{
        this.chantier = data;
        this.entretiens = data.entretiensC;
        this.reparations = data.reparationsC;
      }
    );
  }
  onRowEditDate(maint: any,c: Calendar){
    maint.date = c.value;
    if((maint as Entretien).idE){
      this.chApi.editEntretien(this.chantier.numCh,maint).subscribe(
        data => {
        },error =>{
          console.log(error);
        }
      );
    }else if((maint as Reparation).idR){
      this.chApi.editReparation(this.chantier.numCh,maint).subscribe(
        data => {
        },error =>{
          console.log(error);
        }
      );
    }
  }
  onRowEdit(maint: any){
    if((maint as Entretien).idE){
      this.chApi.editEntretien(this.chantier.numCh,maint).subscribe(
        data => {
        },error =>{
          console.log(error);
        }
      );
    }else if((maint as Reparation).idR){
      this.chApi.editReparation(this.chantier.numCh,maint).subscribe(
        data => {
        },error =>{
          console.log(error);
        }
      );
    }
  }
  getTotalR(): number{
    let i = 0;
    if(this.reparations){
      this.reparations.forEach(
        element=>
        i += +element.pu
      );
    return i;
      }
  }
  getTotalE(): number{
    let i = 0;
    if(this.entretiens){
      this.entretiens.forEach(
        element=>
        i += +element.pu
      );
    return i;
    }
}
onDeleteE(maintenance: Entretien){
  this.chApi.deleteEntretien(maintenance.idE).subscribe(
    data => {
      this.chApi.getChantier(this.chantier.numCh);
      this.message.add({
        severity:"success",
        summary:"l'entretien est supprimé"
      });
    },
    error => {
      this.message.add({
        severity:"error",
        summary:"l'entretien n'est pas supprimé"
      });
    }
  );
}
onDeleteR(maintenance: Reparation){
  this.chApi.deleteReparation(maintenance.idR).subscribe(data => {
    this.chApi.getChantier(this.chantier.numCh);
    this.message.add({
      severity:"success",
      summary:"la reparation est supprimée"
    });
  },
  error => {
    this.message.add({
      severity:"error",
      summary:"la reparation n'est pas supprimée"
    });
  });
}
}
