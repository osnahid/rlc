import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module'
import { MaterialModule } from "./material/material.module";
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { AppelOffresComponent } from './appel-offres/appel-offres.component';
import { OuvragesComponent } from './ouvrages/ouvrages.component';
import { OuvrageService } from './services/ouvrage.service';
import { AppelOffreService } from './services/appel-offre.service';
import { SoumissionComponent } from './soumission/soumission.component';
import { AddSoumissionComponent } from './soumission/add-soumission/add-soumission.component';
import { AddSoumissionsComponent } from './soumission/add-soumissions/add-soumissions.component';
import { SoService } from './services/so.service';
import { EtudePrixComponent } from './etude-prix/etude-prix.component';
import { EtudePrixService } from './services/etude-prix.service';
import { EnginService } from './services/engin.service';
import { MaterielService } from './services/materiel.service';
import { AddEtudePrixComponent } from './etude-prix/add-etude-prix/add-etude-prix.component';
import { EnginComponent } from './engin/engin.component';
import { MaterialsComponent } from './materials/materials.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ChantiersComponent } from './chantiers/chantiers.component';
import { ChantierComponent } from './chantiers/chantier/chantier.component';
import { PersonnelService } from './services/personnel.service';
import { DecomptesComponent } from './chantiers/chantier/decomptes/decomptes.component';
import { MessageService } from 'primeng/api';
import { AddDecomptesComponent } from './chantiers/chantier/decomptes/add-decomptes/add-decomptes.component';
import { ListComponent } from './chantiers/chantier/personnels/list/list.component';
import { AffectationComponent } from './chantiers/chantier/personnels/affectation/affectation.component';
import { AjouterComponent } from './chantiers/chantier/engin/ajouter/ajouter.component';
import { ListEnginComponent } from './chantiers/chantier/engin/list-engin/list-engin.component';
import { ListAchatComponent } from './chantiers/chantier/achats/list-achat/list-achat.component';
import { SelectAchatComponent } from './chantiers/chantier/achats/select-achat/select-achat.component';
import { AvancementComponent } from './chantiers/chantier/avancement/avancement.component';
import { BesoinTransversesComponent } from './chantiers/chantier/besoin-transverses/besoin-transverses.component';
import { AddBtComponent } from './chantiers/chantier/besoinTransverses/add-bt/add-bt.component';
import { EntretienAjoutComponent } from './chantiers/chantier/maintenance/entertien-ajout/entretien-ajout.component';
import { ReparationAjoutComponent } from './chantiers/chantier/maintenance/reparation-ajout/reparation-ajout.component';
import { ListMaintenanceComponent } from './chantiers/chantier/maintenance/list-maintenance/list-maintenance.component';
import { DepencesComponent } from './chantiers/chantier/depences/depences.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './login/user/user.component';
import { SeComponent } from './chantiers/chantier/se/se.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ErrorComponent,
    AppelOffreComponent,
    AppelOffresComponent,
    OuvragesComponent,
    SoumissionComponent,
    AddSoumissionComponent,
    AddSoumissionsComponent,
    EtudePrixComponent,
    AddEtudePrixComponent,
    EnginComponent,
    MaterialsComponent,
    PersonnelComponent,
    ChantiersComponent,
    ChantierComponent,
    DecomptesComponent,
    AddDecomptesComponent,
    ListComponent,
    AffectationComponent,
    AjouterComponent,
    ListEnginComponent,
    ListAchatComponent,
    SelectAchatComponent,
    AvancementComponent,
    BesoinTransversesComponent,
    AddBtComponent,
    EntretienAjoutComponent,
    ReparationAjoutComponent,
    ListMaintenanceComponent,
    DepencesComponent,
    LoginComponent,
    UserComponent,
    SeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppelOffreService, 
    SoService, 
    EtudePrixService, 
    EnginService, 
    MaterielService,
    PersonnelService,
    MessageService,
    OuvrageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
