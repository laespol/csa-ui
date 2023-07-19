import { Nivel } from "./nivel";
import { Unidade } from "./unidade";
import { Menu } from "./menu";

export interface Usuario {
    idusuario?: number;
    nome: string;
    email: string;
    cpf?: string;
    dtnascimento?: string;
    sexo?: string;
    status: string;
    idnivel: number;
    trocasenha: boolean;
    senha: string;
    ramaln: string;
    idunidade?: number;
    celular: string;
    idmenu : number;
    chatid: string;
    ti: boolean;
    vtodoscontratos:boolean;
    vtodoshoraextra:boolean;
    ccontratos:boolean;
    choraextra :boolean;
    contratost: boolean;
    nivel?: Nivel;
    unidade?: Unidade;
    menu?: Menu;

}
