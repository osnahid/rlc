import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../services/personnel.service';
import { Personnel } from '../interfaces/personnel';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  personnels: Personnel[];
  cols:any[] = [
    { field: 'nom', header: 'Nom' },
    { field: 'prenom', header: 'Prenom' },
    { field: 'qualification', header: 'Qualification' },
    { field: 'fonction', header: 'Fonction' },
    { field: 'cnss', header: 'CNSS' },
    { field: 'tele', header: 'Telephone' },
    { field: 'salaire', header: 'Salaire' },
    { field: 'dateEm', header: 'Date d\'Embauche' }
  ];
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un personnel",icon:"pi pi-plus",command: () =>{
      this.onAdd();
    }}
  ];
  addP: boolean = false;
  editP: boolean = false;
  personnel: Personnel = new Personnel();
  constructor(private api: PersonnelService,private msg : MessageService) {
  
   }

  ngOnInit() {
    this.getP();
  }

  getP(){
    this.api.getPersonnels().subscribe(data => this.personnels = data);
  }


  onAdd(){
    this.personnel = new Personnel();
    this.addP=!this.addP;
  }

  onRowEdit(p :Personnel){
    this.personnel = p;
    this.editP=!this.editP;
  }

  onRowDelete(p :Personnel){
    this.api.deletePersonnel(p.idP).subscribe(data => {
      this.getP();
      this.msg.add({
        severity:"success",
        summary:"le personnel a été supprimé"
      });
    },error=>{
      this.msg.add({
        severity:"error",
        summary:"le personnel n'a pas été supprimé"
      });
    } );
  }
  addPersonnel(){
    if(this.personnel) {
    this.api.addPersonnel(this.personnel).subscribe(data => {
      this.getP();
      this.msg.add({
        severity:"success",
        summary:"le personnel a été ajouté"
      });
    },error =>
    this.msg.add({
      severity:"error",
      summary:"le personnel n'a pas été ajouté"
    })
    );
    this.addP=!this.addP;
  }
  }
  editPersonnel(){
    if(this.personnel) {
      this.api.editPersonnel(this.personnel).subscribe(data => {
        this.getP();
        this.msg.add({
          severity:"success",
          summary:"le personnel a été modifé"
        });
      },error =>
      this.msg.add({
        severity:"error",
        summary:"le personnel n'a pas été modifé"
      })
      );
      this.editP=!this.editP;
    }
  }

  cancelEdit(){
    this.personnel = new Personnel();
    this.editP=!this.editP;
  }

  cancelAdd(){
    this.personnel = new Personnel();
    this.addP=!this.addP;
  }


}
