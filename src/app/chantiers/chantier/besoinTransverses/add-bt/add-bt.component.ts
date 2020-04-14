import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BesoinT } from 'src/app/interfaces/besoin-t';
import { FormGroup } from '@angular/forms';
import { Chantier } from 'src/app/interfaces/chantier';
import { ChantierService } from 'src/app/services/chantier.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-bt',
  templateUrl: './add-bt.component.html',
  styleUrls: ['./add-bt.component.css']
})
export class AddBtComponent implements OnInit {
  chantier: Chantier;
  types = [
    {label:"Topographe",value:"Topographe"},
    {label:"Laboratoire",value:"Laboratoire"},
    {label:"Architecte",value:"Architecte"},
    {label:"Bureau d'étude",value:"Bureau d'étude"},
    {label:"Bureau control",value:"Bureau control"}];
  bt : BesoinT= new BesoinT();
  
  @Output() emitter = new EventEmitter<boolean>();
  constructor(private chApi: ChantierService,private message: MessageService) { }

  ngOnInit() {
    this.chApi.currentChantier.subscribe(
      data => {
        this.chantier = data;
      }
    );
  }
  onSubmit(form: FormGroup){
    this.chApi.addBT(this.chantier.numCh,this.bt).subscribe(data => 
      this.message.add({severity:"success",summary:"le besoin transverse a été enregistré"})
    );
    this.emitter.emit(true);
  }

}
