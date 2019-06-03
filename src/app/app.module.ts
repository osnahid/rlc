import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module'
import { MaterialModule } from "./material/material.module";
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { AppelOffresComponent } from './appel-offres/appel-offres.component';
import { OuvragesComponent } from './ouvrages/ouvrages.component';

import { CategorieService } from './Services/categorie.service';
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
import { TestComponent } from './test/test.component';
import { TComponent } from './test/t/t.component';

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
    TestComponent,
    TComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CategorieService, OuvrageService, AppelOffreService, SoService, EtudePrixService, EnginService, MaterielService],
  bootstrap: [AppComponent]
})
export class AppModule { }
