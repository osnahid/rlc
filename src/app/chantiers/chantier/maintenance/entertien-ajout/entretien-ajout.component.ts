import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Entretien } from 'src/app/interfaces/entretien';
import { Chantier } from 'src/app/interfaces/chantier';
import { Engin } from 'src/app/interfaces/engin';
import { EnginService } from 'src/app/services/engin.service';
import { ChantierService } from 'src/app/services/chantier.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-entretien-ajout',
  templateUrl: './entretien-ajout.component.html',
  styleUrls: ['./entretien-ajout.component.css']
})
export class EntretienAjoutComponent implements OnInit {
  entretiens: Entretien[]=[];
  entr: Entretien = new Entretien();
  @Output() emiter= new EventEmitter<boolean>();
  chantier: Chantier;
  engins: Engin[] = []; 
  colsE: any[]=[
    { field: 'designation', header: 'Designation' },
    { field: 'date', header: 'date' },
    { field: 'pu', header: 'prix unitaire' }
  ];
  constructor(private messageService: MessageService,private engSer: EnginService,private chApi: ChantierService) {}
  
  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => 
      {
        this.chantier = data;
        data.locations.forEach(
          (value) => {
            if(value.engin.type === "interne") this.engins.push(value.engin);
          }
        );
      
      }
      );
  }
  onDelete(index: number){
    this.entretiens.splice(index,1);
  }
  onSubmit(form :FormGroup) {
    this.entretiens.push(this.entr);
    this.entr= new Entretien();
  }
  onSave(){
    
    this.chApi.addEntretien(this.chantier.numCh,this.entretiens).subscribe(data => {
      this.messageService.add({severity:'success', summary:'Les entretiens ont été enregistrés', detail:''});
      this.entretiens=[];
      this.emiter.emit(true);
    },error => {
      this.messageService.add({severity:'success', summary:'Les entretiens n\'ont pas été enregistrés', detail:'erreur en cour de la transaction'});
      this.emiter.emit(true);
    });
  }
  onCancel(){
    this.entretiens=[];
    this.emiter.emit(true);
  }
  getTotalE(): number{
    let i:number = 0;
    if(this.entretiens){
      this.entretiens.forEach(
        element=>
        i =+element.pu + +i
      );
    return i;
    }

}}
