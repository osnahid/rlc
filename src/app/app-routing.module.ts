import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { OuvragesComponent } from './ouvrages/ouvrages.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { AppelOffresComponent } from './appel-offres/appel-offres.component';
import { EnginComponent } from './engin/engin.component';
import { MaterialsComponent } from './materials/materials.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ChantierComponent } from './chantiers/chantier/chantier.component';
import { ChantiersComponent } from './chantiers/chantiers.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'Ouvrages', component: OuvragesComponent },
  {path: 'AppelOffres/:id', component: AppelOffreComponent},
  {path: 'AppelOffres', component: AppelOffresComponent},
  {path: 'Chantiers/:id', component: ChantierComponent},
  {path: 'Chantiers', component: ChantiersComponent},
  {path: 'Engins', component: EnginComponent },
  {path: 'Materials', component: MaterialsComponent },
  {path: 'Personnels', component: PersonnelComponent },
  {path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
