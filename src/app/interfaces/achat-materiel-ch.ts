import { Materiel } from './materiel';

export class AchatMaterielCh {
    idAM: number;
    qte: number;
    prix: number;
    date: Date;
    materiel: Materiel;
    type:string;
    setMat(mat: Materiel){
        this.materiel = mat;
        this.prix = mat.prix;
    }
}
