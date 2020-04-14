import { Component, OnInit } from '@angular/core';
import { Chantier } from 'src/app/interfaces/chantier';
import { ChantierService } from 'src/app/services/chantier.service';
import { BesoinT } from 'src/app/interfaces/besoin-t';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-besoin-transverses',
  templateUrl: './besoin-transverses.component.html',
  styleUrls: ['./besoin-transverses.component.css']
})
export class BesoinTransversesComponent implements OnInit {
  chantier : Chantier= new Chantier();
  cols = [
    { field: 'designation', header: 'designation' },
    { field: 'adresse', header: 'adresse' },
    { field: 'type', header: 'type' },
    { field: 'tel', header: 'tel' },
    { field: 'montant', header: 'montant' }
];
types = [
  {label:"Topographe",value:"Topographe"},
  {label:"Laboratoire",value:"Laboratoire"},
  {label:"Architecte",value:"Architecte"},
  {label:"Bureau d'étude",value:"Bureau d'étude"},
  {label:"Bureau control",value:"Bureau control"}];
  constructor(private api: ChantierService,private message: MessageService) { }

  ngOnInit() {
    this.api.currentChantier.subscribe(data => this.chantier = data);
  }

  getTotal(): number{
    let i = 0;
    if(this.chantier.bt)
    this.chantier.bt.forEach((value)=>{
      i += value.montant;
    });
    return i;
  }
  onDelete(bt: BesoinT){
    this.api.deleteBT(bt.idBT).subscribe(data => {
      this.message.add(
        {severity:"success",summary:"le besoin transeverse a été supprimé"}
      );
      this.api.getChantier(this.chantier.numCh);
    },error =>{
      this.message.add(
        {severity:"error",summary:"le besoin transeverse n'a pas été supprimé"}
      );
    });
  }
  onUpdate(bt: BesoinT){
    this.api.editBT(this.chantier.numCh,bt).subscribe(data => {
    },error =>{
      this.message.add(
        {severity:"error",summary:"le besoin transeverse n'a pas été modifé"}
      );
    });
  }
}
