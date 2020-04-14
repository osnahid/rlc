import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Decomptes } from 'src/app/interfaces/decomptes';
import { DecompteModule } from 'src/app/chantiers/chantier/decomptes/decompte/decompte.module';
import { Chantier } from 'src/app/interfaces/chantier';
import { DO } from 'src/app/interfaces/do';
import { MessageService } from 'primeng/api';
import { ChantierService } from 'src/app/services/chantier.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-decomptes',
  templateUrl: './add-decomptes.component.html',
  styleUrls: ['./add-decomptes.component.css']
})
export class AddDecomptesComponent implements OnInit {
  newDate: Date= new Date();
  decompte: Decomptes= new Decomptes();
  dos: DecompteModule[]= [];
  dosSelected: DecompteModule[]= [];
  chantier: Chantier= new Chantier();
  @Output() emit: EventEmitter<boolean> = new EventEmitter<boolean>();
  
 
  constructor(private messageapi: MessageService,private route: ActivatedRoute, private chApi: ChantierService) { }

  ngOnInit() {
    this.chApi.currentChantier.subscribe(data =>{ 
      data.aoc.soumission.so.forEach(
        (value) => {
          let ds: DO = new DO();
          ds.ouv = value.ouv;
          ds.qte = 0;
          this.dos.push(new DecompteModule(ds,value));
        }
      );
      this.chantier = data;
    });
  }

  getChantier(id:string){
    this.chApi.getChantier(id);
  }
  add(){
    if(this.dosSelected.length > 0 && this.decompte.date){
      this.dosSelected.forEach(
        (value) => {
          this.decompte.dos.push(value.do);
        }
      );
      
      this.chApi.addDecomptes(this.chantier.numCh,this.decompte).subscribe(data => {
        this.decompte.dos.forEach(
          (value)=>{
            this.chApi.addDO(data.idD,value).subscribe(data =>
              this.getChantier(this.route.snapshot.params['id'])
            );
          }
        );
        this.messageapi.add({severity:'success', summary:'le decomptes a été enregistré', detail:''});
        
      });
      
      this.emit.emit(true);
    }else{
      if(this.dosSelected.length === 0) this.messageapi.add({severity:'error', summary:'Erreur', detail:'vous devez selectionnez des ouvrages du tableau!'});
      if(!this.decompte.date) this.messageapi.add({severity:'error', summary:'Erreur', detail:'vous devez selectionnez des ouvrages du tableau!'});
    }
  }
  cancel(){
    this.decompte = new Decomptes();
    this.dosSelected = [];
    this.emit.emit(true);
  }
  getTotal():number{
    let n:number=0;
    if(this.dos) this.dos.forEach(
      (value)=>{
        n += value.do.qte * value.so.prix;
      }
    );
    return n;
  }
}
