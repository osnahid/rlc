import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Chantier } from 'src/app/interfaces/chantier';
import { ChantierService } from 'src/app/services/chantier.service';
import { DecompteModule } from '../decomptes/decompte/decompte.module';
import { DO } from 'src/app/interfaces/do';

@Component({
  selector: 'app-avancement',
  templateUrl: './avancement.component.html',
  styleUrls: ['./avancement.component.css']
})
export class AvancementComponent implements OnInit {
  
  dos: DecompteModule[];

  constructor(private chApi:ChantierService) { }
  
  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => this.getDecomptes(data));
  }
  getDecomptes(ch: Chantier){
    this.dos = [];
      ch.aoc.soumission.so.forEach(
        (value)=>{
          let ds:DO = new DO();
          ds.ouv = value.ouv;
          ds.qte = 0;
          ch.decomptes.forEach(
            (v)=>{
              v.dos.forEach(
                (vi)=>{
                  if(vi.ouv.idOuvrage === value.ouv.idOuvrage){
                    ds.qte += vi.qte;
                  }
                }
              );
            }
          );
          this.dos.push(new DecompteModule(ds,value));
        }
      );
  }
  getTotal():number{
    let n:number=0;
    if(this.dos) this.dos.forEach(
      (value)=>{
        n += (value.do.qte + value.so.qte) * value.so.prix;
      }
    );
    return n;
  }
}
