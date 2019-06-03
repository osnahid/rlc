import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppelOffre } from 'src/app/interfaces/appel-offre';
import { So } from 'src/app/interfaces/so';
import { OuvrageService } from 'src/app/services/ouvrage.service';
import { SoService } from 'src/app/services/so.service';
import { AddEtudePrixComponent } from 'src/app/etude-prix/add-etude-prix/add-etude-prix.component';

@Component({
  selector: 'app-add-soumissions',
  templateUrl: './add-soumissions.component.html',
  styleUrls: ['./add-soumissions.component.css']
})
export class AddSoumissionsComponent implements OnInit {
  @Input() ao: AppelOffre;
  @Output() added= new EventEmitter();
  pickFrom: So[] = [];
  picks:So[] = [];
  constructor(private os: OuvrageService,private sos: SoService) {
    
    
   }
   save(){
     if(this.picks.length > 0){
      this.sos.addListSo(this.ao.numAO,this.picks).subscribe(data => this.added.emit(true));
     }
   }

  ngOnInit() {
    this.picks = this.ao.soumission.so;
    
    this.os.getOuvrage().subscribe(data =>{
      data.forEach(
        (value)=>{
          let checkIx: boolean = false;
          this.picks.forEach(
            (val)=>{
              if(val.ouv.designation === value.designation){
                checkIx = true;
              }
            }
          );
          if(!checkIx){
            let so: So = new So();
            so.ouv= value;
            so.qte = 1;
            this.pickFrom.push(so);
          }
        }
      );
    });
    
  }


}
