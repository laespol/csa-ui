import { Tpsolicitacao } from "./tpsolicitacao";

export interface Solicitacao {
    idsolicitacao?: number;
    descricao: string;
    email?: string;
    nome?: string;
    sigilo?: number;
    telefone?: string;
    idusercreateAt?: number,
    createdAt?: Date,
    iduserupdatedAt?: number,
    updatedAt?: Date,
    status: string;
    resposta?:string;
    statussolicitacao? : string;
    idtpsolicitacao: number;
    tpsolicitacao?: Tpsolicitacao;
}
