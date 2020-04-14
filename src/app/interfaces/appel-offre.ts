import { Soumission } from './soumission';
import { EtudePrix } from './etude-prix';
import { InstallationChantier } from './installation-chantier';
import { Chantier } from './chantier';

export class AppelOffre {
    numAO: string;
	dateAO: Date;
	objet: string;
	localisation: string;
	soumission: Soumission = new Soumission();
	etudePrix: EtudePrix[] = [];
	estimation: number;
	ic: InstallationChantier[] = [];
	ch: Chantier;
}
