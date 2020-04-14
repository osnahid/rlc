import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Reparation } from 'src/app/interfaces/reparation';
import { Chantier } from 'src/app/interfaces/chantier';
import { Engin } from 'src/app/interfaces/engin';
import { MessageService } from 'primeng/api';
import { EnginService } from 'src/app/services/engin.service';
import { ChantierService } from 'src/app/services/chantier.service';

@Component({
  selector: 'app-reparation-ajout',
  templateUrl: './reparation-ajout.component.html',
  styleUrls: ['./reparation-ajout.component.css']
})
export class ReparationAjoutComponent implements OnInit {
  entr: Reparation = new Reparation();
  @Output() emiter= new EventEmitter<boolean>();
  chantier: Chantier;
  engins: Engin[] = []; 
  reparations: Reparation[]=[];
  colsR: any[]=[
    { field: 'designation', header: 'Designation' },
    { field: 'date', header: 'date' },
    { field: 'pu', header: 'prix unitaire' }
  ];
  constructor(private messageService: MessageService,private chApi: ChantierService) {}
  
  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => {this.chantier = data;
      data.locations.forEach(
          (value) => {
            if(value.engin.type === "interne") this.engins.push(value.engin);
          }
        );
      });
  }

  onSubmit(form :FormGroup) {
    this.reparations.push(this.entr);
    this.entr = new Reparation();
  }
  onDelete(index: number){
    this.reparations.splice(index,1);
  }
  onCancel(){
    this.emiter.emit(true);
  }
  onSave(){
    if(this.reparations.length !== 0)
    this.chApi.addReparation(this.chantier.numCh,this.reparations).subscribe(data =>
      {
        this.messageService.add({severity:'success', summary:'Les reparations ont été enregistrés', detail:''});
        this.emiter.emit(true);
        this.reparations = [];
      },
      error => {
        this.messageService.add({severity:'error', summary:'Les reparations n\'ont pas été enregistrés', detail:''});
        this.emiter.emit(true);
      });
      else
      this.messageService.add({
        severity:'error',
        summary:'veuillez inserez des reparations à enregistrer'
      });
  }
  getTotalR(): number{
    let i: number = 0;
    if(this.reparations){
      this.reparations.forEach(
        element=>{
          i =+element.pu + +i;
        }
      );
    }
    return i;
  }

}
