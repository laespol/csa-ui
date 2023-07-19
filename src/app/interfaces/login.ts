export interface Registro {
    idusuario: number;
    nome: string;
    email: string;
    idnivel: number;
    nivel: {
        idnivel: number;
        nome: string;
    },
    senha: number;
    ti:boolean;
    contratost:boolean;
    contrato:boolean;
    vtodoscontratos:boolean;
    vtodoshoraextra:boolean;
    ccontratos:boolean;
    choraextra :boolean;
    trocasenha: string;
    menu: {
        idmenu: number;
        nome: string;
        Menuitem: [{
            idmenuitem: number;
            idmenu: number;
            seq: number;
            titulo: string;
            url: string;
            icon: string;

        }]
    },
    unidade: {
        idunidade: number;
        nome: string;
    }
}

