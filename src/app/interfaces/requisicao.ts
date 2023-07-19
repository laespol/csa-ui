import { Unidade } from "./unidade";
import { Usuario } from "./usuario";
import { Custo } from "./custo";

export interface Requisicao {
    idrequisicao: number;
    descricao : string;
    idunidade : number;
    correcao    : string;
    valorproposta? : number;
    idusercreateAt?: number;
    createdAt?: Date;
    iduserupdatedAt?: number;
    updatedAt?: Date;
    status: string;
    statusrequisicao: string;
    aditivo: boolean;
    aprovado?: boolean;
    periodo? : number;
    tipopagamento? : string;
    numeroparcelas? : number;
    idcusto?: number;
    renovauto?: boolean;
    justificativa
    vigencia: string;
    outros: string;
    prazo : string;

    unidade? : Unidade;
    usuario? : Usuario;
    custo?: Custo;

}