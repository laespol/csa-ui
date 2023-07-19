import { Usuario } from "./usuario";

export interface Funcionario {
    idfuncionario?: number;
    chapa: string;
    nome: string;
    departamento: string;
    centrocusto: string;
    idusercreateAt?: number;
    createdAt: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    usuario?: Usuario;
}