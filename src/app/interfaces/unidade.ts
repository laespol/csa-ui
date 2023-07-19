import { Imovel } from "./imovel";

export interface Unidade {
    idunidade?: number;
    nome: string;
    idusercreateAt?: number,
    createdAt?: Date,
    iduserupdatedAt?: number,
    updatedAt?: Date,
    status: string;
    idimovel: number;
    imovel: Imovel;
    imagem1 : Blob;
    imagem2 : Blob;
    centrocusto?: string;
    administrativo?: Boolean;
}