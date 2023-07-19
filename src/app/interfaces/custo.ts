import { Imovel } from "./imovel";

export interface Custo {
    idcusto?: number;
    idimovel: number;
    nome: string;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    imovel?: Imovel;
    

}
