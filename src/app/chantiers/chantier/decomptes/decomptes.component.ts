import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DecompteModule } from './decompte/decompte.module';
import { Chantier } from 'src/app/interfaces/chantier';
import { DO } from 'src/app/interfaces/do';
import { ActivatedRoute } from '@angular/router';
import { ChantierService } from 'src/app/services/chantier.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Decomptes } from 'src/app/interfaces/decomptes';

@Component({
  selector: 'app-decomptes',
  templateUrl: './decomptes.component.html',
  styleUrls: ['./decomptes.component.css']
})
export class DecomptesComponent implements OnInit {
  chantier: Chantier = new Chantier();
  decomptes: SelectItem[] = [];
  dos: DecompteModule[];
  @Output() emit: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  constructor(private route: ActivatedRoute,private chApi: ChantierService,private msg: MessageService) { }

  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => {
      this.chantier = data;
      this.decomptes = [];
      let d: DecompteModule[]=[];
      data.decomptes.forEach(
        (value) => {
          d=[];
          value.dos.forEach(
            (v) => {
              data.aoc.soumission.so.forEach(
                (vs) => {
                  if(vs.ouv.idOuvrage === v.ouv.idOuvrage) 
                    d.push(new DecompteModule(v,vs));
                }
              );
            }
          );
        let s : string = value.date.toString().split("T")[0];
      this.decomptes.push({label:s,value:d});
    });
  });
}
  onSelect(event){
    this.dos = [];
    if(event.value)  this.dos = event.value;
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
  
  updateQte(doss: DO){
    let dec:number = 0;
      this.chantier.decomptes.forEach(
        decompte =>{
          decompte.dos.forEach(
            dosss =>{
              if(dosss.idDO === doss.idDO)
              dec = decompte.idD;
            }
          );
        }
      );
    this.chApi.editDO(dec,doss).subscribe(data => this.chApi.getChantier(this.chantier.numCh),error => console.log(error));
  }

  
}
