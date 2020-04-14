import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';
import { Materiel } from 'src/app/interfaces/materiel';
import { MaterielService } from 'src/app/services/materiel.service';
import { Chantier } from 'src/app/interfaces/chantier';
import { ChantierService } from 'src/app/services/chantier.service';
import { AchatMaterielCh } from 'src/app/interfaces/achat-materiel-ch';

@Component({
  selector: 'app-select-achat',
  templateUrl: './select-achat.component.html',
  styleUrls: ['./select-achat.component.css'],
  providers: [FormBuilder]

})
export class SelectAchatComponent implements OnInit {

  achatform: FormGroup;

  achat: AchatMaterielCh = new AchatMaterielCh();

  @Output() emiter= new EventEmitter<boolean>();
  chantier: Chantier;
  materiels: Materiel[] = []; 
  constructor(private fb: FormBuilder, private messageService: MessageService,private matSer: MaterielService,private chApi: ChantierService) {}
  
  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => this.chantier = data);
      this.achatform = this.fb.group({
          'materiel': new FormControl('', Validators.required),
          'date': new FormControl('', Validators.required),
          'prix': new FormControl('', Validators.required),
          'Quantite': new FormControl('',Validators.required)
      });
      this.matSer.getMateriel().subscribe(data => this.materiels = data);
  }

  onSubmit(form :FormGroup) {
    this.chApi.addAchat(this.chantier.numCh,this.achat).subscribe(
      data=>{
        this.messageService.add({severity:'success', summary:'Achats a été enregistré', detail:''});
        this.emiter.emit(true);
      },error =>{
        this.messageService.add({severity:'error', summary:'Achats n\'a pas été enregistré', detail:''});
        this.emiter.emit(true);
      }
    );
    
  }

  onselect(event){
    this.achat.prix = event.value.prix;
  }
}

