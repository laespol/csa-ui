import { Tphora } from "./tphora";
import { Unidade } from "./unidade";
import { Usuario } from "./usuario";

export interface Hora {
    idhora?: number;
    funcionario: string;
    chapa: string;
    datainicio: Date;
    datafinal: Date;
    motivo: string;
    qthoras: number;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    idunidade?: number;
    centrocusto: string;
    departamento: string;
    usuario?: Usuario;
    unidade?: Unidade;
    dtcompfim?: Date;
    dtcompini?: Date;
    hrcomp?: number;
    idtphora?: number;
    tphora?: Tphora;
}