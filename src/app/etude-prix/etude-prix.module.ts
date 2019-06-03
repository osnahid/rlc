
import { Ouvrage } from '../interfaces/ouvrage';
import { Engin } from '../interfaces/engin';
import { Materiel } from '../interfaces/materiel';
import { EtudePrix } from '../interfaces/etude-prix';
import { LocationEp } from '../interfaces/locationEp';
import { AchatMateriel } from '../interfaces/achat-materiel';

export class EtudePrixModule { 
  idET: number;
	rendement: number;
	foisonnement: number;
  distance: number;
  ouvrageE: Ouvrage;
  locations: {
    idLEP: number,
    prixGaz: number,
    nbrHeure: number,
    engin: Engin,
    totalGo: number,
    totalM: number,
    salaireChauffeur: number,
    salaireJournalier:number,
    debours:number
  }[] = [];
  materiels: {
    idAM: number,
    qte: number,
    prix: number,
    date: Date,
    material: Materiel,
    debours:number,
  }[] = [];
  enginCamion: Engin;
  deboursCamion: number;
  salaireChefEquipe: number;
  deboursSalaireChefEquipe: number;
  salaireOuvrier: number;
  deboursSalaireOuvrier: number;
  nbrOuvrier: number;
  total:number
  totalJour:number;
   constructor(et: EtudePrix){
    
      this.idET=et.idET;
      if(et.foisonnement) this.foisonnement=et.foisonnement;
      if(et.distance) this.distance=et.distance;
      this.rendement = et.rendement;
      this.ouvrageE = et.ouvrageE;
      this.salaireChefEquipe = et.salaireChefEquipe;
      this.deboursSalaireChefEquipe = et.salaireChefEquipe/24;
      if(et.salaireOuvrier){
      this.nbrOuvrier= et.nbrOuvrier;
      this.salaireOuvrier = et.salaireOuvrier * et.nbrOuvrier;
      this.deboursSalaireOuvrier = (et.salaireOuvrier * et.nbrOuvrier)/24;
    }
      if(et.enginCamion) {
      this.enginCamion = et.enginCamion;
    }
      if(et.foisonnement !== undefined){
        if(et.enginCamion){
         this.deboursCamion = et.rendement * et.distance * et.enginCamion.prixLocation;
        }
      et.locations.forEach(
        (value:LocationEp)=> {
          this.locations.push({
            idLEP: value.idLEP,
            prixGaz: value.prixGaz ,
            nbrHeure: value.nbrHeure ,
            engin: value.engin ,
            totalGo: (value.engin.consommationH) * value.prixGaz * value.nbrHeure ,
            totalM:  ((value.engin.consommationH) * value.prixGaz * value.nbrHeure)+value.engin.prixLocation,
            salaireChauffeur: value.salaireChauffeur ,
            salaireJournalier: value.salaireChauffeur/24,
            debours:  (value.salaireChauffeur/24)+(((value.engin.consommationH) * value.prixGaz * value.nbrHeure)+value.engin.prixLocation)
          });
        }
      );
      et.materiels.forEach(
        (value:AchatMateriel)=>{
          this.materiels.push(
            {
              idAM: value.idAM,
          qte: value.qte,
          prix: value.prix,
          date: value.date,
          material: value.materiel,
          debours: value.qte * this.rendement * value.prix
            }
          );
        }
      );
    }else{
      if(et.enginCamion) {this.deboursCamion = et.foisonnement * et.rendement * et.distance * et.enginCamion.prixLocation;}
      et.locations.forEach(
        (value:LocationEp)=> {
          this.locations.push({
            idLEP: value.idLEP,
            prixGaz: value.prixGaz ,
            nbrHeure: value.nbrHeure ,
            engin: value.engin ,
            totalGo: (value.engin.consommationH) * value.prixGaz * value.nbrHeure ,
            totalM:  ((value.engin.consommationH) * value.prixGaz * value.nbrHeure)+value.engin.prixLocation,
            salaireChauffeur: value.salaireChauffeur ,
            salaireJournalier: value.salaireChauffeur/24,
            debours:  (value.salaireChauffeur/24)+(((value.engin.consommationH) * value.prixGaz * value.nbrHeure)+value.engin.prixLocation)
          });
        }
      );
      et.materiels.forEach(
        (value:AchatMateriel)=>{
          this.materiels.push(
            {
              idAM: value.idAM,
              qte: value.qte,
              prix: value.prix,
              date: value.date,
              material: value.materiel,
              debours: value.qte * this.rendement * value.prix * this.foisonnement
        }
          );
        }
      );
    }
      let total=0;
      total += this.deboursSalaireChefEquipe;
      total += this.deboursSalaireOuvrier*this.nbrOuvrier;
      if(et.enginCamion) total += this.deboursCamion;
      this.locations.forEach(
        (value)=>{
          total += value.debours;
        }
      );
      this.materiels.forEach(
        (value)=>{
          total += value.debours;
        }
      );
      this.total = total;
      this.totalJour = total/this.rendement;
   }
  
 }
