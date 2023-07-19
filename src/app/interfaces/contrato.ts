import { Unidade } from "./unidade";
import { Usuario } from "./usuario";
import { Documento } from "./documento";
import { Custo } from "./custo";

export interface Contrato {
    idcontrato: number;
    razaosocial : string;
    cnpj?: string;
    descricao : string;
    dtviginicio?: Date;
    dtvigfinal? : Date;
    idunidade : number;
    correcao    : string;
    valorproposta? : number;
    localizacao    : string;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    statuscontrato: string;
    aditivo: boolean;
    dtasscont? : Date;
    dtrecdoc? : Date;
    aprovado?: boolean;
    periodo? : string;
    tipopagamento? : string;
    numeroparcelas? : number;
    idcusto?: number;
    renovauto?: boolean;

    unidade? : Unidade;
    usuario? : Usuario;
    Documento? : Documento;
    custo?: Custo;

}