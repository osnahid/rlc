import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chantier } from 'src/app/interfaces/chantier';
import { LocationCh } from 'src/app/interfaces/location-ch';
import { ChantierService } from 'src/app/services/chantier.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-engin',
  templateUrl: './list-engin.component.html',
  styleUrls: ['./list-engin.component.css']
})
export class ListEnginComponent implements OnInit {
  ch: Chantier= new Chantier();
  constructor(private chs:ChantierService, private message: MessageService) { }

  ngOnInit() {
    this.chs.currentChantier.subscribe(data => this.ch = data);
  }
  onDelete(ri: number,loc: LocationCh){
    this.chs.deleteLoc(loc).subscribe(data => {
      this.message.add({severity:"info",detail:"la suppression du location a ete bien faites"});
      this.chs.getChantier(this.ch.numCh);
        }
      );
  }

}
