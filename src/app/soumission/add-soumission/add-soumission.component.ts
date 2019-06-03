import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { AppelOffre } from 'src/app/interfaces/appel-offre';
import { So } from 'src/app/interfaces/so';
import { Ouvrage } from 'src/app/interfaces/ouvrage';
import { OuvrageService } from 'src/app/services/ouvrage.service';
import { SoService } from 'src/app/services/so.service';


@Component({
  selector: 'app-add-soumission',
  templateUrl: './add-soumission.component.html',
  styleUrls: ['./add-soumission.component.css']
})
export class AddSoumissionComponent implements OnInit {
  @Input() ao: AppelOffre;
  @Output() added = new EventEmitter<boolean>();

  so: So = new So();
  ouvrages: Ouvrage[];
  constructor(private apiO : OuvrageService, private apiSo : SoService) { }
  addS(){
    if(this.so.ouv)
    this.apiSo.addSo(this.ao.numAO,this.so).subscribe(
      data => this.added.emit(true)
    );
  }
  ngOnInit() {
    this.getOuvrage();
  }
  getOuvrage(){
    this.apiO.getOuvrage().subscribe(
      data => this.ouvrages = data
      );
  }

}
