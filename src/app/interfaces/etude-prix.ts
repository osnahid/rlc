import { Ouvrage } from './ouvrage';
import { AchatMateriel } from './achat-materiel';
import { LocationEp } from './locationEp';
import { Engin } from './engin';

export class EtudePrix {
    idET: number;
	rendement: number;
	foisonnement: number;
    distance: number;
    ouvrageE: Ouvrage;
    locations: LocationEp[];
    materiels: AchatMateriel[];
    salaireChefEquipe: number;
	salaireOuvrier: number;
    nbrOuvrier: number=0;
    enginCamion: Engin;
}
