import { Contrato } from "./contrato";

export interface Documento {
    iddocumento?: number;
    idcontrato: number;
    documentopdf : string;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    nome?: string;
    mimetype?: string;
    encoding?: string;
    size?: number;
    Contrato?: Contrato;

}