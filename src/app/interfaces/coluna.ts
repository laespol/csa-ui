export interface Coluna {
    idcoluna?: number;
    programa : string;
    field: string;
    header: string;
    style : string;
    type : string;
    agregado1?: string;
    agregado2?: string;
    ordena: string;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status : string;
    filtra? : boolean;
}
