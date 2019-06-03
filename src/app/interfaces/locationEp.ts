import { Engin } from './engin';
import { EtudePrix } from './etude-prix';

export class LocationEp {
    idLEP: number;
    prixGaz: number;
    nbrHeure: number;
    engin: Engin;
    EPL: EtudePrix;
    salaireChauffeur: number;
}
