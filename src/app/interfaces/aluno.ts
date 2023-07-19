import { Histaluno } from "./histaluno";

export interface Aluno {
    idaluno?: number;
    ra: number;
    nome: string;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    Histaluno?: Histaluno[];
}