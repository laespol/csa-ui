import { Usuario } from "./usuario";

export interface Gestor {
    idunidadegestor?: number;
    idunidade?: number;
    idusuario?: number;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status?: string;
    usuario: Usuario;
}
