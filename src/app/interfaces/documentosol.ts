import { Solicitacao } from "./solicitacao";

export interface Documentosol {
    iddocumentosol?: number;
    idsolicitacao: number;
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
    Solicitacao?: Solicitacao;

}